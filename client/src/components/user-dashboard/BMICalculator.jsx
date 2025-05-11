import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function BMICalculator() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [bmiHistory, setBmiHistory] = useState([]);

  useEffect(() => {
    // Load BMI history from localStorage on component mount
    const savedHistory = localStorage.getItem('bmiHistory');
    if (savedHistory) {
      setBmiHistory(JSON.parse(savedHistory));
    }
  }, []);

  const calculateBMI = () => {
    const heightInMeters = Number(height) / 100;
    const bmi = Number(weight) / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  };

  const getBMIStatus = () => {
    const bmi = Number(calculateBMI());
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const handleSaveBMI = () => {
    const newBMI = {
      date: new Date().toISOString().split('T')[0],
      bmi: Number(calculateBMI())
    };
    const updatedHistory = [...bmiHistory, newBMI];
    setBmiHistory(updatedHistory);
    localStorage.setItem('bmiHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">BMI Calculator</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-2xl font-semibold">Your BMI: {calculateBMI()}</p>
          <p className="text-lg text-gray-600">{getBMIStatus()}</p>
        </div>

        <button
          onClick={handleSaveBMI}
          className="bg-red text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Save BMI Record
        </button>
      </div>

      {bmiHistory.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">BMI History</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bmiHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[15, 35]} />
                <Tooltip 
                  formatter={(value) => [`BMI: ${value}`, '']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line type="monotone" dataKey="bmi" stroke="#FF0336" strokeWidth={2} />
                <ReferenceLine y={18.5} stroke="#FFA500" strokeDasharray="3 3" label="Underweight" />
                <ReferenceLine y={24.9} stroke="#00FF00" strokeDasharray="3 3" label="Normal" />
                <ReferenceLine y={29.9} stroke="#FF0000" strokeDasharray="3 3" label="Overweight" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}