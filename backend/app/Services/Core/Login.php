<?php

declare(strict_types=1);

namespace App\Services\Core;

use App\Dto\LoginDto;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class Login
{
    public function login(LoginDto $loginDto): array
    {
        $user = User::where('email', $loginDto->email)->whereNull('deleted_at')->first();

        if (! $user || ! Hash::check($loginDto->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect'],
            ]);
        }

        return [
            'token' => $user->createToken('user-token', [])->plainTextToken,
            'user' => $user,
        ];
    }
}
