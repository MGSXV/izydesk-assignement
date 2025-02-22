<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    #[Route('', name: 'api_products_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): JsonResponse
    {
        $products = $productRepository->findAll();
        $data = array_map(fn(Product $product) => [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'category' => $product->getCategory() ? $product->getCategory()->getId() : null
        ], $products);

        return $this->json($data);
    }

    #[Route('/{id}', name: 'api_products_show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'category' => $product->getCategory() ? $product->getCategory()->getId() : null
        ]);
    }

    #[Route('', name: 'api_products_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, CategoryRepository $categoryRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!isset($data['name'], $data['price'], $data['category_id'])) {
            return $this->json(['error' => 'Name, price, and category id are required'], 400);
        }

		$category = $categoryRepository->find($data['category_id']);
		if (!$category) {
			return $this->json(['error' => 'Category not found'], 404);
		}

        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description'] ?? null);
        $product->setPrice($data['price']);

        if (!empty($data['category_id'])) {
            $category = $entityManager->getRepository(Category::class)->find($data['category_id']);
            if ($category) {
                $product->setCategory($category);
            }
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json(['message' => 'Product created successfully', 'id' => $product->getId()], 201);
    }

    #[Route('/{id}', name: 'api_products_update', methods: ['PUT', 'PATCH'])]
    public function update(Request $request, Product $product, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $product->setPrice($data['price']);
        }

        if (!empty($data['category_id'])) {
            $category = $entityManager->getRepository(Category::class)->find($data['category_id']);
            if ($category) {
                $product->setCategory($category);
            }
        }

        $entityManager->flush();

        return $this->json(['message' => 'Product updated successfully']);
    }

    #[Route('/{id}', name: 'api_products_delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($product);
        $entityManager->flush();

        return $this->json(['message' => 'Product deleted successfully']);
    }
}
