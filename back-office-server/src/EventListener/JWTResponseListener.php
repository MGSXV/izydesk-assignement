<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use App\Entity\User;

class JWTResponseListener
{
	public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event): void
	{
		$data = $event->getData();
		$user = $event->getUser();

		if (!$user instanceof User) {
			return;
		}

		$data['user'] = [
			'id' => $user->getId(),
			'username' => $user->getUserIdentifier(),
			'roles' => $user->getRoles(),
		];

		$event->setData($data);
	}
}
