<?php

declare(strict_types=1);

namespace App\Services\Core;

use App\Dto\CreateAccountDto;
use App\Repositories\Contracts\UserRepositoryInterface;
use DateTime;
use Illuminate\Support\Facades\Hash;

class CreateAccount
{
    private function __construct(
        private readonly UserRepositoryInterface $userRepository
    ) {}

    public function create(CreateAccountDto $createAccountDto): void
    {
        $this->userRepository->create([
            'name' => $createAccountDto->name,
            'email' => $createAccountDto->email,
            'password' => Hash::make($createAccountDto->password),
            'email_verified_at' => new DateTime('now'),
        ]);
    }
}
