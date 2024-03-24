<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    /**
     * Update the roles and permissions of a user.
     */
    public function updateRolesPermissions(FormRequest $request)
    {
        if (!auth()->user()->hasRole('Admin')) {
            abort(403); // Forbidden for non-admins
        }

        $user = User::find($request->user);

        $validated = $request->validate([
            'roles' => 'required|array',
        ]);

        $user->syncRoles($validated['roles']);

        // Retrieve the updated user with the roles
        $user = User::with('roles')->find($user->id);

        return response()->json([
            'user' => $user,
            'message' => 'User roles have been updated successfully.'
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!auth()->user()->hasRole('Admin')) {
            abort(403); // Forbidden for non-admins
        }

        $roles = Role::all(); // Get all available roles
        $users = User::with('roles')->get(); // Get all users and their roles

        return Inertia::render('ManageUsers', [
            'usersData' => $users,
            'roles' => $roles,
        ]);
    }
}
