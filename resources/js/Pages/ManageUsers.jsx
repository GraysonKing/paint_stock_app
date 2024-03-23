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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Roles
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {displayRoles(user)}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap cursor-pointer hover:text-blue-500"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {showModal && (
                            <EditRolesModal
                                visible={showModal}
                                onClose={handleModalClose}
                                onRolesUpdated={handleRolesUpdated}
                                user={selectedUser}
                                roles={roles}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
