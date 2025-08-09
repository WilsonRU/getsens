<?php

declare(strict_types=1);

namespace App\Services\Core;

use App\Dto\ForgotPasswordDto;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class ForgotPassword
{
    public function forgotUserPassword(ForgotPasswordDto $forgotPasswordDto): void
    {
        $user = User::where('email', $forgotPasswordDto->email)->whereNull('deleted_at')->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['No account found with this email. Please check or sign up.'],
            ]);
        }
    }
}
