import React, { useState } from "react";

export default function EditRolesModal({ visible, onClose, onRolesUpdated, user, roles }) {
  const [selectedRoles, setSelectedRoles] = useState(
    user.roles.map((role) => role.id)
  );

  const handleRoleChange = (event) => {
    const roleId = parseInt(event.target.value);
    const isSelected = event.target.checked;

    if (isSelected) {
      setSelectedRoles([...selectedRoles, roleId]);
    } else {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    }
  };

  const handleSave = async () => {
    onRolesUpdated(user, selectedRoles);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg max-w-2xl">
        <div className="p-6">
          <h3 className="mb-5 text-lg font-medium leading-6 text-gray-900">
            Edit Roles for {user.name}
          </h3>

          <ul className="space-y-2">
            {roles.map((role) => (
              <li key={role.id}>
                <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  name={`role-${role.id}`}
                  value={role.id}
                  checked={selectedRoles.includes(role.id)}
                  onChange={handleRoleChange}
                />
                <label htmlFor={`role-${role.id}`} className="ml-2 text-sm font-medium text-gray-900">
                  {role.name}
                </label>
              </li>
            ))}
          </ul>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-4 py-2 mx-2 rounded-md text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 mx-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
