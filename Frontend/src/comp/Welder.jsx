import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify
import { AiOutlineDelete } from "react-icons/ai"; // Importing Delete Icon from react-icons

const WelderFormAndTable = () => {
  const [welderName, setWelderName] = useState("");
  const [welderCode, setWelderCode] = useState("");
  const [data, setData] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Number of records per page

  // Fetch existing data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/hydro/welders"
        ); // Adjust the endpoint as needed
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      }
    };
    fetchData();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit clicked");

    if (!welderName || !welderCode) {
      toast.warn("Please fill out all fields.");
      return;
    }

    const newRecord = { welderName, welderCode };
    console.log("Submitting: ", newRecord);

    try {
      // Post data to your backend API
      const response = await axios.post(
        "http://localhost:5000/api/hydro/welders",
        newRecord
      );

      // Update the local state with the new record
      setData([...data, response.data]);
      console.log("Response: ", response.data);

      // Show success notification
      toast.success("Welder information submitted successfully!");

      // Clear form fields
      setWelderName("");
      setWelderCode("");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit welder information.");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this welder?"
    );

    if (!isConfirmed) {
      return; // Exit if the user clicks "No"
    }

    try {
      await axios.delete(`http://localhost:5000/api/hydro/welders/${id}`); // Adjust the endpoint as needed

      // Update the local state by filtering out the deleted welder
      setData(data.filter((record) => record._id !== id));

      // Show success notification
      toast.success("Welder deleted successfully!");
    } catch (error) {
      console.error("Error deleting welder:", error);
      toast.error("Failed to delete welder.");
    }
  };

  // Sort the data array by welderName in ascending order
  const sortedData = [...data].sort((a, b) => {
    const nameA = a.welderName || ""; // Use empty string if welderName is undefined
    const nameB = b.welderName || ""; // Use empty string if welderName is undefined

    return nameA.localeCompare(nameB);
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-8 p-8 min-h-screen ">
      {/* Form Section */}
      <div className="w-full bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welder Information
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="block">
            <span className="text-gray-600 font-medium">Welder Name</span>
            <input
              type="text"
              value={welderName}
              onChange={(e) => setWelderName(e.target.value)}
              required
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter welder name"
            />
          </label>
          <label className="block">
            <span className="text-gray-600 font-medium">Welder Code</span>
            <input
              type="text"
              value={welderCode}
              onChange={(e) => setWelderCode(e.target.value)}
              required
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter welder code"
            />
          </label>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg p-3 transition duration-300 ease-in-out"
          >
            Add Welder
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="w-full bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welder Records
        </h2>
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border p-2 text-left font-semibold">S.No</th>
              <th className="border p-2 text-left font-semibold">
                Welder Name
              </th>
              <th className="border p-2 text-left font-semibold">
                Welder Code
              </th>
              <th className="border p-2 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentRecords) && currentRecords.length > 0 ? (
              currentRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {indexOfFirstRecord + index + 1}
                  </td>
                  <td className="border p-2">{record.welderName}</td>
                  <td className="border p-2">{record.welderCode}</td>
                  <td className="border p-2 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 transition duration-300"
                      onClick={() => handleDelete(record._id)}
                      title="Delete"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              currentPage === 1
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            }`}
          >
            Previous
          </button>
          <p className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default WelderFormAndTable;
