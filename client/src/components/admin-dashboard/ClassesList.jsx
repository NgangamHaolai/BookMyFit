
import React from 'react';

function ClassesList() {
  const classes = [
    { id: 1, name: "Yoga", instructor: "Sarah Lee", time: "09:00 AM", capacity: 20 },
    { id: 2, name: "CrossFit", instructor: "Mike Brown", time: "10:30 AM", capacity: 15 },
    { id: 3, name: "Zumba", instructor: "Lisa Wong", time: "02:00 PM", capacity: 25 },
  ];

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-bold">Active Classes</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Class Name</th>
              <th className="p-2">Instructor</th>
              <th className="p-2">Time</th>
              <th className="p-2">Capacity</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((class_) => (
              <tr key={class_.id} className="border-b">
                <td className="p-2">{class_.name}</td>
                <td className="p-2">{class_.instructor}</td>
                <td className="p-2">{class_.time}</td>
                <td className="p-2">{class_.capacity}</td>
                <td className="p-2">
                  <button className="mr-2 rounded bg-red px-3 py-1 text-white">Edit</button>
                  <button className="rounded bg-gray-300 px-3 py-1 text-white">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassesList;
