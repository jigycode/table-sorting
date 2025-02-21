import { useState } from "react";

export default function Table() {
  const [searchTerm, setSearchTerm] = useState("");
  const data = [
    { name: "John Doe", email: "john@example.com", phone: "+1 123 456 7890" },
    { name: "Jane Smith", email: "jane@example.com", phone: "+1 987 654 3210" },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 555 666 7777",
    },
    {
      name: "utpal singh",
      email: "admin@example.com",
      phone: "+1 555 666 7776",
    },
    { name: "Bob Brown", email: "bob@example.com", phone: "+1 222 333 4444" },
    {
      name: "Charlie Black",
      email: "charlie@example.com",
      phone: "+1 111 111 1111",
    },
    {
      name: "Diana White",
      email: "diana@example.com",
      phone: "+1 222 222 2222",
    },
    { name: "Eric Green", email: "eric@example.com", phone: "+1 333 333 3333" },
    {
      name: "Fiona Blue",
      email: "fiona@example.com",
      phone: "+1 444 444 4444",
    },
    {
      name: "George Red",
      email: "george@example.com",
      phone: "+1 555 555 5555",
    },
    {
      name: "Helen Yellow",
      email: "helen@example.com",
      phone: "+1 666 666 6666",
    },
    { name: "Ian Purple", email: "ian@example.com", phone: "+1 777 777 7777" },
    {
      name: "Jane Silver",
      email: "janesilver@example.com",
      phone: "+1 888 888 8888",
    },
    {
      name: "Kevin Gold",
      email: "kevin@example.com",
      phone: "+1 999 999 9999",
    },
    {
      name: "Laura Bronze",
      email: "laura@example.com",
      phone: "+1 000 000 0000",
    },
    {
      name: "Mike Copper",
      email: "mike@example.com",
      phone: "+1 101 101 1010",
    },
    {
      name: "Nina Platinum",
      email: "nina@example.com",
      phone: "+1 202 202 2020",
    },
    {
      name: "Oscar Diamond",
      email: "oscar@example.com",
      phone: "+1 303 303 3030",
    },
    { name: "Pam Quartz", email: "pam@example.com", phone: "+1 404 404 4040" },
    {
      name: "Quincy Marble",
      email: "quincy@example.com",
      phone: "+1 505 505 5050",
    },
    {
      name: "Rachel Topaz",
      email: "rachel@example.com",
      phone: "+1 606 606 6060",
    },
  ];

  // Filter data based on search input
  const filteredData = data.filter((person) =>
    Object.values(person).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-lg">
        {/* Title Section */}
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-semibold tracking-wide shadow-sm">
            Our Employees
          </h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-3 pl-10 w-64 border border-gray-300 rounded-lg text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M10 17a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
        <table className="w-full text-left bg-white border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((person, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-100 transition duration-200`}
                >
                  <td className="px-6 py-4 border-b">{person.name}</td>
                  <td className="px-6 py-4 border-b">{person.email}</td>
                  <td className="px-6 py-4 border-b">{person.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
