<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        // Call the seeders in the desired order:
        $this->call([
            RoleAndPermissionSeeder::class, // Roles and Permissions first
            UserSeeder::class,
            PaintSeeder::class,
        ]);
    }
}
