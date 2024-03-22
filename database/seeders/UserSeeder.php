<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'manager1@paint.com',
                'password' => Hash::make('password'),
                'role_id' => 1, // Assign Manager role ID
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'manager2@paint.com',
                'password' => Hash::make('password'),
                'role_id' => 1, // Assign Manager role ID
            ],
            [
                'name' => 'Adam Admin',
                'email' => 'admin@paint.com',
                'password' => Hash::make('password'),
                'role_id' => 2, // Assign Admin role ID
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
