<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    // Defina explicitamente a tabela se for diferente de 'admins'
    protected $table = 'admins';

    // Defina os campos que podem ser preenchidos
    protected $fillable = ['email', 'password'];

    // Defina as propriedades de segurança do modelo, como a senha
    protected $hidden = [
        'password', 'remember_token',
    ];

    // Defina os castings
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
