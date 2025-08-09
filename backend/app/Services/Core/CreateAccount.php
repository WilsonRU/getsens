<?php

declare(strict_types=1);

namespace App\Services\Core;

use App\Dto\CreateAccountDto;
use App\Models\User;
use DateTime;
use Illuminate\Support\Facades\Hash;

class CreateAccount
{
    public function create(CreateAccountDto $createAccountDto): void
    {
        User::create([
            'name' => $createAccountDto->name,
            'email' => $createAccountDto->email,
            'password' => Hash::make($createAccountDto->password),
            'email_verified_at' => new DateTime('now'),
        ]);
    }
}
