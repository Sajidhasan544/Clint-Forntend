import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddClintInfo = () => {
  const [formData, setFormData] = useState({
    Company_Name: "",
    Support_Person: "",
    Contact_Person: "",
    Contact_Number: "",
    Mail: "",
  });

  const API_URL = "https://clint-site.vercel.app";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/data`, formData);

      Swal.fire({
        title: "Success!",
        text: "Client data added successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      // Clear form
      setFormData({
        Company_Name: "",
        Support_Person: "",
        Contact_Person: "",
        Contact_Number: "",
        Mail: "",
      });

      console.log("Inserted:", response.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add client data.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-start  p-24">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Add Client Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="Company_Name"
              value={formData.Company_Name}
              onChange={handleChange}
              placeholder="Union Label and Accessories Ltd"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Support Person
            </label>
            <input
              type="text"
              name="Support_Person"
              value={formData.Support_Person}
              onChange={handleChange}
              placeholder="MD Sir"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Contact Person
            </label>
            <input
              type="text"
              name="Contact_Person"
              value={formData.Contact_Person}
              onChange={handleChange}
              placeholder="Contact Person Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Contact Number
            </label>
            <input
              type="text"
              name="Contact_Number"
              value={formData.Contact_Number}
              onChange={handleChange}
              placeholder="01700000000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-1">
              Mail
            </label>
            <input
              type="email"
              name="Mail"
              value={formData.Mail}
              onChange={handleChange}
              placeholder="accounts@uniongroupbd.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold text-lg py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClintInfo;
