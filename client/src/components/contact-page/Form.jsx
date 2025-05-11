import React, { useState } from 'react';

const inputStyles = `focus:border border-gray-100 px-4 py-2`;

function Form() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!fullName || !email || !selectedClass) {
      setError('Please fill in all required fields.');
      return;
    }

    // Reset error message
    setError('');

    // Simulate form submission
    console.log({ fullName, email, selectedClass, comment });
    setIsSubmitted(true);

    // Reset form fields
    setFullName('');
    setEmail('');
    setSelectedClass('');
    setComment('');

    // Automatically hide the popup after 1 second
    setTimeout(() => {
      setIsSubmitted(false);
    }, 1000);
  };

  return (
    <div>
      <form className="bg-gray-50 px-5 py-8" onSubmit={handleSubmit}>
        <h4 className="relative mb-4 mt-6 pb-2 text-2xl font-bold capitalize before:absolute before:bottom-0 before:h-1 before:w-16 before:bg-red">
          Leave Us Your Info
        </h4>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name*"
            className={inputStyles}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail Address*"
            className={inputStyles}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            className={inputStyles}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="" disabled>
              Select Class
            </option>
            <option value="body building">Body Building</option>
            <option value="cycling">Cycling</option>
            <option value="meditation">Meditation</option>
            <option value="workout">Workout</option>
            <option value="karate">Karate</option>
          </select>
          <textarea
            placeholder="Comment"
            className={`${inputStyles} h-32 max-h-44`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="self-center bg-red px-8 py-4 font-semibold uppercase text-white">
            Submit now
          </button>
        </div>
      </form>

      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold">Success!</h2>
            <p>Your details have been successfully submitted.</p>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsSubmitted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;