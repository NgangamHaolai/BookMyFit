
import React from 'react';

function AdminStats({ title, count, icon }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-2xl font-bold">{title}</h3>
          <p className="text-3xl font-bold text-red">{count}</p>
        </div>
        <div className="text-4xl text-gray-300">{icon}</div>
      </div>
    </div>
  );
}

export default AdminStats;
