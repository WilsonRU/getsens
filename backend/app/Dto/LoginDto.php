<?php

declare(strict_types=1);

namespace App\Dto;

class LoginDto
{
    private function __construct(
        public readonly string $email,
        public readonly string $password
    ) {}

    public static function fromArray(array $validated): self
    {
        return new self(
            email: (string) $validated['email'],
            password: (string) $validated['password']
        );
    }
}
