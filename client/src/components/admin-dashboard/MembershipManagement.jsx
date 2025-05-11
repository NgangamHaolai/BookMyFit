
import { useState, useEffect } from 'react';
import axios from 'axios';

function MembershipManagement() 
{
  const [membershipPlans, setMembershipPlans] = useState([
    { id: 1, name: 'Basic', price: '5,000', duration: '1 Month', features: ['Access to gym', 'Basic equipment'] },
    { id: 2, name: 'Standard', price: '8,000', duration: '3 Months', features: ['Access to gym', 'All equipment', 'One trainer session'] },
    { id: 3, name: 'Premium', price: '10,000', duration: '6 Months', features: ['24/7 Access', 'All equipment', 'Personal trainer', 'Nutrition plan'] },
  ]);

  const [members, setMembers] = useState([
    // { id: 1, name: 'John Doe', plan: 'Premium', status: 'Active', joinDate: '2024-01-15', expiryDate: '2024-07-15', email: 'john@example.com' },
    // { id: 2, name: 'Jane Smith', plan: 'Basic', status: 'Expired', joinDate: '2023-12-10', expiryDate: '2024-01-10', email: 'jane@example.com' },
  ]);

  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    duration: '',
    features: ''
  });


  useEffect(()=>
  {
    getMembers();
  }, []);

  const getMembers = async()=>
  {
    console.log("fsdf");
    
    try
    {
      console.log('sdf');
      
      const result = await axios.get("http://localhost:3000/api/adminDashboard/membersData");
      console.log('fds',result.data);
      setMembers(result.data.combineBookingAndUserData);
      
    }
    catch(err)
    {
      console.log(err);
    }
  }

  const handleAddPlan = (e) => {
    e.preventDefault();
    const planToAdd = {
      id: membershipPlans.length + 1,
      ...newPlan,
      features: newPlan.features.split(',').map(f => f.trim())
    };
    setMembershipPlans([...membershipPlans, planToAdd]);
    setShowAddPlanModal(false);
    setNewPlan({ name: '', price: '', duration: '', features: '' });
  };

  const handleEditPlan = (plan) => {
    setEditingPlan({
      ...plan,
      features: plan.features.join(', ')
    });
    setShowAddPlanModal(true);
  };

  const handleUpdatePlan = (e) => {
    e.preventDefault();
    const updatedPlans = membershipPlans.map(plan => 
      plan.id === editingPlan.id 
        ? {...editingPlan, features: editingPlan.features.split(',').map(f => f.trim())}
        : plan
    );
    setMembershipPlans(updatedPlans);
    setShowAddPlanModal(false);
    setEditingPlan(null);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const handleDeletePlan = (id) => {
    setPlanToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setMembershipPlans(membershipPlans.filter(plan => plan.id !== planToDelete));
    setShowDeleteModal(false);
    setPlanToDelete(null);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Membership Plans</h2>
          <button 
            onClick={() => setShowAddPlanModal(true)}
            className="rounded bg-red px-4 py-2 text-white"
          >
            Add New Plan
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {membershipPlans.map((plan) => (
            <div key={plan.id} className="rounded-lg border p-4 shadow">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="text-2xl font-bold text-red">₹{plan.price}</p>
              <p className="text-gray-600">{plan.duration}</p>
              <ul className="my-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-end space-x-2">
                <button 
                  onClick={() => handleEditPlan(plan)}
                  className="rounded bg-blue-500 px-3 py-1 text-white"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePlan(plan.id)}
                  className="rounded bg-red px-3 py-1 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">Members</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Plan</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Join Date</th>
                <th className="p-2 text-left">Expiry Date</th>
              </tr>
            </thead>
            <tbody>
            {members.map((member, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{member.userName}</td>
                  <td className="p-2">{member.userEmail}</td>
                  <td className="p-2">{member.plan}</td>
                  <td className="p-2">
                    <span className={`rounded px-2 py-1 text-sm ${
                      member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-2">{new Date(member.joinDate).toLocaleDateString().split('T')[0]}</td>
                  <td className="p-2">{new Date(member.expiryDate).toLocaleDateString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">
              {editingPlan ? 'Edit Plan' : 'Add New Plan'}
            </h3>
            <form onSubmit={editingPlan ? handleUpdatePlan : handleAddPlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Plan Name</label>
                <input
                  type="text"
                  value={editingPlan ? editingPlan.name : newPlan.name}
                  onChange={(e) => editingPlan 
                    ? setEditingPlan({...editingPlan, name: e.target.value})
                    : setNewPlan({...newPlan, name: e.target.value})
                  }
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price (₹)</label>
                <input
                  type="text"
                  value={editingPlan ? editingPlan.price : newPlan.price}
                  onChange={(e) => editingPlan
                    ? setEditingPlan({...editingPlan, price: e.target.value})
                    : setNewPlan({...newPlan, price: e.target.value})
                  }
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Duration</label>
                <input
                  type="text"
                  value={editingPlan ? editingPlan.duration : newPlan.duration}
                  onChange={(e) => editingPlan
                    ? setEditingPlan({...editingPlan, duration: e.target.value})
                    : setNewPlan({...newPlan, duration: e.target.value})
                  }
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Features (comma-separated)</label>
                <textarea
                  value={editingPlan ? editingPlan.features : newPlan.features}
                  onChange={(e) => editingPlan
                    ? setEditingPlan({...editingPlan, features: e.target.value})
                    : setNewPlan({...newPlan, features: e.target.value})
                  }
                  className="mt-1 w-full rounded border p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPlanModal(false);
                    setEditingPlan(null);
                  }}
                  className="rounded bg-gray-300 px-4 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-red px-4 py-2 text-white"
                >
                  {editingPlan ? 'Update Plan' : 'Add Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this membership plan?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded bg-gray-300 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded bg-red px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembershipManagement;