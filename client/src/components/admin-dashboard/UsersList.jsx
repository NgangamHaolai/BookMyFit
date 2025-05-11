
import React from 'react';

function UsersList() {
  const users = [
    { id: 1, name: "John Doe", plan: "Premium", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", plan: "Basic", joinDate: "2024-01-10" },
    { id: 3, name: "Mike Johnson", plan: "Premium", joinDate: "2024-01-05" },
  ];

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-bold">Recent Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Join Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.plan}</td>
                <td className="p-2">{user.joinDate}</td>
                <td className="p-2">
                  <button className="mr-2 rounded bg-red px-3 py-1 text-white">Edit</button>
                  <button className="rounded bg-gray-300 px-3 py-1 text-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersList;
