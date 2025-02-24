<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
	#[ORM\Id]
	#[ORM\GeneratedValue(strategy: "SEQUENCE")] 
	#[ORM\Column]
	private ?int $id = null;

	#[ORM\ManyToOne]
	#[ORM\JoinColumn(nullable: false)]
	private ?Customer $customer = null;

	/**
	 * @var Collection<int, Product>
	 */
	#[ORM\ManyToMany(targetEntity: Product::class)]
	private Collection $products;

	#[ORM\Column]
	private ?\DateTimeImmutable $createdAt = null;

	#[ORM\Column(length: 255)]
	private ?string $status = 'pending';

	#[ORM\Column(length: 255, nullable: true)]
	private ?string $paymentIntentId = null;

	#[ORM\Column(nullable: true)]
	private ?\DateTimeImmutable $completedAt = null;

	public function __construct()
	{
		$this->products = new ArrayCollection();
		$this->createdAt = new \DateTimeImmutable();
	}

	public function getId(): ?int
	{
		return $this->id;
	}

	public function getCustomer(): ?Customer
	{
		return $this->customer;
	}

	public function setCustomer(?Customer $customer): static
	{
		$this->customer = $customer;

		return $this;
	}

	/**
	 * @return Collection<int, Product>
	 */
	public function getProducts(): Collection
	{
		return $this->products;
	}

	public function addProduct(Product $product): static
	{
		if (!$this->products->contains($product)) {
			$this->products->add($product);
		}

		return $this;
	}

	public function removeProduct(Product $product): static
	{
		$this->products->removeElement($product);

		return $this;
	}

	public function getCreatedAt(): ?\DateTimeImmutable
	{
		return $this->createdAt;
	}

	public function setCreatedAt(\DateTimeImmutable $createdAt): static
	{
		$this->createdAt = $createdAt;

		return $this;
	}

	public function getStatus(): ?string
	{
		return $this->status;
	}

	public function setStatus(string $status): static
	{
		$this->status = $status;
		return $this;
	}

	public function getPaymentIntentId(): ?string
	{
		return $this->paymentIntentId;
	}

	public function setPaymentIntentId(?string $paymentIntentId): static
	{
		$this->paymentIntentId = $paymentIntentId;
		return $this;
	}

	public function getCompletedAt(): ?\DateTimeImmutable
	{
		return $this->completedAt;
	}

	public function setCompletedAt(?\DateTimeImmutable $completedAt): static
	{
		$this->completedAt = $completedAt;
		return $this;
	}

	public function calculateTotal(): float
	{
		return $this->products->reduce(function (float $total, Product $product) {
			return $total + $product->getPrice();
		}, 0.0);
	}
}