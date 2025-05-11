
import { useState } from 'react';

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St'
  });

  const [workoutGoals, setWorkoutGoals] = useState({
    weeklyTarget: 3,
    calorieGoal: 500,
    currentStreak: 5
  });

  const [membership, setMembership] = useState({
    plan: 'Premium',
    status: 'Active',
    expiryDate: '2024-12-31',
    remainingDays: 120
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const updateWorkoutGoals = (e) => {
    e.preventDefault();
    setShowGoalModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Personal Details Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Personal Details</h2>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-red text-white rounded hover:bg-red-600"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">First Name</label>
              <input
                type="text"
                value={personalDetails.firstName}
                onChange={(e) => setPersonalDetails({...personalDetails, firstName: e.target.value})}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Last Name</label>
              <input
                type="text"
                value={personalDetails.lastName}
                onChange={(e) => setPersonalDetails({...personalDetails, lastName: e.target.value})}
                disabled={!isEditing}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={personalDetails.email}
              onChange={(e) => setPersonalDetails({...personalDetails, email: e.target.value})}
              disabled={!isEditing}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            <input
              type="tel"
              value={personalDetails.phone}
              onChange={(e) => setPersonalDetails({...personalDetails, phone: e.target.value})}
              disabled={!isEditing}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <textarea
              value={personalDetails.address}
              onChange={(e) => setPersonalDetails({...personalDetails, address: e.target.value})}
              disabled={!isEditing}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          {isEditing && (
            <button type="submit" className="w-full bg-red text-white py-2 rounded hover:bg-red-600">
              Save Changes
            </button>
          )}
        </form>
      </div>

      {/* Workout Goals Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Workout Goals</h2>
          <button 
            onClick={() => setShowGoalModal(true)}
            className="px-4 py-2 bg-red text-white rounded hover:bg-red-600"
          >
            Update Goals
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-600">Weekly Target</p>
            <p className="text-2xl font-bold">{workoutGoals.weeklyTarget} sessions</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Calorie Goal</p>
            <p className="text-2xl font-bold">{workoutGoals.calorieGoal} kcal</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Current Streak</p>
            <p className="text-2xl font-bold">{workoutGoals.currentStreak} days</p>
          </div>
        </div>
      </div>

      {/* Membership Status Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Membership Status</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Current Plan</p>
            <p className="text-2xl font-bold text-red">{membership.plan}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="inline-block px-3 py-1 rounded-full text-white bg-green-500">
              {membership.status}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Expiry Date</p>
            <p className="text-xl">{new Date(membership.expiryDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">{membership.remainingDays} days remaining</p>
          </div>
        </div>
      </div>

      {/* Goals Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Workout Goals</h3>
            <form onSubmit={updateWorkoutGoals} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Weekly Target (sessions)</label>
                <input
                  type="number"
                  value={workoutGoals.weeklyTarget}
                  onChange={(e) => setWorkoutGoals({...workoutGoals, weeklyTarget: parseInt(e.target.value)})}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Daily Calorie Goal</label>
                <input
                  type="number"
                  value={workoutGoals.calorieGoal}
                  onChange={(e) => setWorkoutGoals({...workoutGoals, calorieGoal: parseInt(e.target.value)})}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-red text-white py-2 rounded hover:bg-red-600">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
