import { useState } from "react";

const EligibilityCheck = () => {
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const checkEligibility = () => {
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0) {
      setMessage("Please enter a valid age.");
    } else if (ageNum < 18) {
      setMessage("You should drink Milk.");
    } else if (ageNum >= 19 && ageNum <= 50) {
      setMessage("You should drink Alcohol.");
    } else {
      setMessage("You should drink Ganga Jal.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-max bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <h1 className="text-xl font-bold mb-4">Eligibility Checker</h1>
        <input
          type="number"
          placeholder="Enter your age"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={checkEligibility}
        >
          Check
        </button>
        {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default EligibilityCheck;
