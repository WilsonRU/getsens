<?php

declare(strict_types=1);

namespace App\Dto;

class ForgotPasswordDto
{
    private function __construct(
        public readonly string $email
    ) {}

    public static function fromArray(array $validated): self
    {
        return new self(
            email: (string) $validated['email']
        );
    }
}
