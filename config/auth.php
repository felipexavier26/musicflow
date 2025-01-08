<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option defines the default authentication "guard" and password
    | reset "broker" for your application. You may change these values
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'), 
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Here you may define every authentication guard for your application.
    | Of course, a great default configuration has been defined for you
    | which uses session storage and the Eloquent user provider.
    |
    | You can define guards for multiple types of users, such as 'web' and 'admin'.
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',      
            'provider' => 'users',    
        ],

        'admin' => [
            'driver' => 'session',     
            'provider' => 'admins',     
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | Providers define como os usuários são recuperados do banco de dados.
    | Você pode configurar vários providers para diferentes modelos de usuários.
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',    
            'model' => env('AUTH_MODEL', App\Models\User::class), 
        ],

        'admins' => [
            'driver' => 'eloquent',    
            'model' => App\Models\Admin::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | These options specify the behavior of Laravel's password reset functionality.
    | You may define multiple password reset configurations for users and admins.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users', 
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,         
            'throttle' => 60,      
        ],

        'admins' => [
            'provider' => 'admins', 
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,         
            'throttle' => 60,       
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the amount of seconds before a password confirmation
    | window expires and users are asked to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
