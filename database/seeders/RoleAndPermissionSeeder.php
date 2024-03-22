<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Permissions
        $permissions = [
            'view paint',
            'update paint',
            'enable/disable permissions',
        ];

        // Create and assign permissions
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create Roles
        $roles = [
            [
                'name' => 'Admin',
                'permissions' => ['view paint', 'update paint', 'enable/disable permissions'],
            ],
            [
                'name' => 'Manager',
                'permissions' => ['view paint', 'update paint'],
            ],
            [
                'name' => 'Painter',
                'permissions' => ['view paint', 'update paint'],
            ],
        ];

        // Create roles and assign permissions
        foreach ($roles as $role) {
            $newRole = Role::create(['name' => $role['name']]);
            $newRole->syncPermissions($role['permissions']);
        }
    }
}
