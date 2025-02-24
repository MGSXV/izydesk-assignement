<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Entity\Order;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api')]
final class OrderController extends AbstractController
{
	public function __construct(
		private readonly EntityManagerInterface $entityManager,
		private readonly string $stripeSecretKey
	) {
		Stripe::setApiKey($this->stripeSecretKey);
	}

	#[Route('/order/create-payment', name: 'app_order_create_payment', methods: ['POST'])]
	public function createPayment(Request $request): JsonResponse
	{
		try {
			$data = json_decode($request->getContent(), true);

			// error_log(print_r($data, true));
			
			
			if (!isset($data['products']) || !isset($data['email']) || !is_array($data['products'])) {
				return $this->json(['error' => 'Missing required data'], Response::HTTP_BAD_REQUEST);
			}
			
			$customer = $this->entityManager->getRepository(Customer::class)->findOneBy(['email' => $data['email']]);
			if (!$customer) {
				$customer = new Customer();
				$customer->setName($data['name']);
				$customer->setEmail($data['email']);
				$customer->setAddress($data['address']);
				$this->entityManager->persist($customer);
				$this->entityManager->flush();
			}
			
			$order = new Order();
			$order->setCustomer($customer);
			$productRepository = $this->entityManager->getRepository(Product::class);
			foreach ($data['products'] as $productId) {
				$product = $productRepository->find($productId);
				if (!$product) {
					return $this->json([
						'error' => sprintf('Product with ID %d not found', $productId)
					], Response::HTTP_NOT_FOUND);
				}
				$order->addProduct($product);
			}

			$totalAmount = $order->calculateTotal();
			error_log("------------------------------> Total Amount: " . $totalAmount);
			error_log("------------------------------> BEFOOOOORE: ");
			error_log("----------------------> Customer ID: " . $customer->getId());
			error_log("----------------------> Order ID: " . $order->getId());
			// Persist & flush order BEFORE calling Stripe
			error_log("------------------------------> Flushing Order Now...");
			echo print_r($order, true);
			$this->entityManager->persist($order);
			$this->entityManager->flush();
			error_log("------------------------------> Order Successfully Flushed!");

			
			$paymentIntent = PaymentIntent::create([
				'amount' => (int)($totalAmount * 100), // Convert to cents
				'currency' => 'usd',
				'metadata' => [
					'customer_id' => $customer->getId(),
					'order_id' => $order->getId()
				],
				'automatic_payment_methods' => [
					'enabled' => true,
				],
			]);
			error_log("------------------------------> AFTOOOOOOR: ");

			$order->setPaymentIntentId($paymentIntent->id);
			$this->entityManager->persist($order);
			$this->entityManager->flush();

			return $this->json([
				'clientSecret' => $paymentIntent->client_secret,
				'orderId' => $order->getId(),
				'amount' => $totalAmount
			]);

		} catch (\Exception $e) {
			return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	#[Route('/order/confirm-payment', name: 'app_order_confirm_payment', methods: ['POST'])]
	public function confirmPayment(Request $request): JsonResponse
	{
		try {
			$data = json_decode($request->getContent(), true);
			
			if (!isset($data['paymentIntentId'])) {
				return $this->json(['error' => 'Payment intent ID is required'], Response::HTTP_BAD_REQUEST);
			}

			$paymentIntent = PaymentIntent::retrieve($data['paymentIntentId']);
			$order = $this->entityManager->getRepository(Order::class)
				->findOneBy(['paymentIntentId' => $data['paymentIntentId']]);

			if (!$order) {
				return $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
			}

			if ($paymentIntent->status === 'succeeded') {
				$order->setStatus('completed');
				$order->setCompletedAt(new \DateTimeImmutable());
			} else if ($paymentIntent->status === 'canceled') {
				$order->setStatus('canceled');
			}

			$this->entityManager->flush();

			return $this->json([
				'status' => 'success',
				'orderStatus' => $order->getStatus()
			]);

		} catch (\Exception $e) {
			return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
		}
	}

	#[Route('/order/{id}', name: 'app_order_get', methods: ['GET'])]
	public function getOrder(int $id): JsonResponse
	{
		$order = $this->entityManager->getRepository(Order::class)->find($id);

		if (!$order) {
			return $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
		}

		return $this->json([
			'id' => $order->getId(),
			'status' => $order->getStatus(),
			'amount' => $order->calculateTotal(),
			'customer' => [
				'id' => $order->getCustomer()->getId(),
				'name' => $order->getCustomer()->getName(),
			],
			'products' => $order->getProducts()->map(function(Product $product) {
				return [
					'id' => $product->getId(),
					'name' => $product->getName(),
					'price' => $product->getPrice(),
				];
			})->toArray(),
			'createdAt' => $order->getCreatedAt()->format('Y-m-d H:i:s'),
			'completedAt' => $order->getCompletedAt()?->format('Y-m-d H:i:s'),
		]);
	}
}