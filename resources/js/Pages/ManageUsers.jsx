import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import EditRolesModal from "@/Components/EditRolesModal";
import axios from "axios";

export default function ManageUsers({ auth, usersData, roles }) {
    const [users, setUsers] = useState(usersData);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const displayRoles = (user) => {
        return user.roles.map((role) => role.name).join(", ");
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleRolesUpdated = async (user, updatedRoles) => {
        try {
            const response = await axios.post(
                route("users.roles.permissions", { user: user.id }), // Include user ID in route
                {
                    roles: updatedRoles,
                }
            );

            const updatedUser = response.data.user;

            // Update the users state to reflect the changes
            setUsers(
                users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manage Users
                </h2>
            }
        >
            <Head title="Manage Users" />

            <div className="py-4 px-2 sm:py-12">
                <div className="max-w-full overflow-x-auto">
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Roles
                                        </th>
                                        <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                                                {displayRoles(user)}
                                            </td>
                                            <td
                                                className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap cursor-pointer hover:text-blue-500"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Edit
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <EditRolesModal
                    visible={showModal}
                    onClose={handleModalClose}
                    onRolesUpdated={handleRolesUpdated}
                    user={selectedUser}
                    roles={roles}
                />
            )}
        </AuthenticatedLayout>
    );
}
