<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[Route('/api/auth')]
class AuthController extends AbstractController
{
    #[Route('/register', name: 'api_auth_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['username']) || !isset($data['password'])) {
            return $this->json([
                'error' => 'Username and password are required'
            ], 400);
        }

        $user = new User();
        $user->setUsername($data['username']);
        $user->setPassword(
            $passwordHasher->hashPassword($user, $data['password'])
        );
        
        $user->setRoles(['ROLE_USER']);

        try {
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Username already exists'
            ], 409);
        }

        return $this->json([
            'message' => 'User registered successfully',
            'id' => $user->getId()
        ], 201);
    }

    #[Route('/login', name: 'api_auth_login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        // This route is handled by the JWT bundle
        // The actual authentication is handled by the security system
        return $this->json([
            'error' => 'Invalid credentials'
        ], 401);
    }

    #[Route('/test-protected', name: 'api_auth_test', methods: ['GET'])]
    public function testProtected(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        
        return $this->json([
            'message' => 'If you see this, you are authenticated',
            'user' => [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }

	#[Route('/logout', name: 'api_auth_logout', methods: ['POST'])]
	public function logout(
		Request $request,
		TokenStorageInterface $tokenStorage,
		EntityManagerInterface $entityManager
	): JsonResponse {
		try {
			/** @var User $user */
			$user = $this->getUser();
			
			if (!$user) {
				throw new AccessDeniedException('Not authenticated');
			}

			// Extract token from Authorization header
			$authHeader = $request->headers->get('Authorization');
			if (!$authHeader) {
				throw new AccessDeniedException('No authorization token provided');
			}

			$token = str_replace('Bearer ', '', $authHeader);

			$entityManager->persist($user);
			$entityManager->flush();

			$tokenStorage->setToken(null);

			return $this->json([
				'message' => 'Logged out successfully',
				'user' => [
					'id' => $user->getId(),
					'username' => $user->getUsername()
				]
			]);

		} catch (AccessDeniedException $e) {
			return $this->json([
				'error' => $e->getMessage()
			], 401);
		} catch (\Exception $e) {
			return $this->json([
				'error' => 'An error occurred during logout'
			], 500);
		}
	}
}