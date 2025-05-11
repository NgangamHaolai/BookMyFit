import { useState } from 'react';
import { FiCreditCard, FiCheck } from 'react-icons/fi';

export default function Payment() {
  const [paymentHistory] = useState([
    { id: 1, date: '2024-01-15', amount: 8000, plan: 'Standard', status: 'Completed' },
    { id: 2, date: '2023-12-15', amount: 5000, plan: 'Basic', status: 'Completed' }
  ]);

  const [availablePlans] = useState([
    { id: 1, name: 'Basic', price: 5000, duration: '1 Month', features: ['Access to gym', 'Basic equipment'] },
    { id: 2, name: 'Standard', price: 8000, duration: '3 Months', features: ['Access to gym', 'All equipment', 'One trainer session'] },
    { id: 3, name: 'Premium', price: 12000, duration: '6 Months', features: ['Access to gym', 'All equipment', 'Three trainer sessions', 'Nutrition plan'] }
  ]);

  const handlePayment = (plan) => {
    // This would connect to payment gateway in real implementation
    console.log('Selected plan:', plan);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Payment History Section */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Plan</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="p-2">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="p-2">₹{payment.amount}</td>
                  <td className="p-2">{payment.plan}</td>
                  <td className="p-2">
                    <span className="flex items-center text-green-600">
                      <FiCheck className="mr-1" />
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Membership Plans Section */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Renew Membership</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availablePlans.map((plan) => (
            <div key={plan.id} className="rounded-lg border p-6 shadow-sm hover:border-red transition-all">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-red">₹{plan.price}</p>
              <p className="text-gray-600">{plan.duration}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheck className="mr-2 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePayment(plan)}
                className="mt-6 w-full rounded bg-red px-4 py-2 text-white hover:bg-red-600 transition-colors"
              >
                <FiCreditCard className="mr-2 inline" />
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
