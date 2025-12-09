import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddClintInfo = () => {
  const [formData, setFormData] = useState({
    Company_Name: "",
    Contact_Person: "",
    Contact_Number: "",
    Mail: "",
    Address: ""
  });

  const [loading, setLoading] = useState(false);

  const API_URL = "https://clint-site.vercel.app";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload for backend
    // Only include optional fields if user provided non-empty values.
    const payload = {
      Company_Name: formData.Company_Name.trim(),
      // keep defaults for backend-only fields (these exist even if optional fields omitted)
      facebookPage: "",
      linkedin: "",
      websiteExists: false,
      successRate: 0,
      problems: [],
      solutions: []
    };

    // Add optional fields only when they are non-empty (prevents sending empty strings)
    if (formData.Contact_Person && formData.Contact_Person.trim() !== "") {
      payload.Contact_Person = formData.Contact_Person.trim();
    }
    if (formData.Contact_Number && formData.Contact_Number.trim() !== "") {
      payload.Contact_Number = formData.Contact_Number.trim();
    }
    if (formData.Mail && formData.Mail.trim() !== "") {
      payload.Mail = formData.Mail.trim();
    }
    if (formData.Address && formData.Address.trim() !== "") {
      payload.Address = formData.Address.trim();
    }

    console.log("Submitting:", payload);

    try {
      const response = await axios.post(`${API_URL}/data`, payload);

      Swal.fire({
        title: "✅ Success!",
        text: "Company added successfully!",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false
      });

      // Clear form
      setFormData({
        Company_Name: "",
        Contact_Person: "",
        Contact_Number: "",
        Mail: "",
        Address: ""
      });

      console.log("Inserted:", response.data);

    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      Swal.fire({
        title: "❌ Error!",
        text: err.response?.data?.error || "Failed to add company. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-start p-4 md:p-20">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-2xl border border-gray-200">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            <span className="text-2xl text-white">🏢</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Company
          </h2>
          <p className="text-gray-600">
            Fill in the basic company information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">🏢</span>
              </div>
              <input
                type="text"
                name="Company_Name"
                value={formData.Company_Name}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"

              />
            </div>
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contact Person
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">👤</span>
              </div>
              <input
                type="text"
                name="Contact_Person"
                value={formData.Contact_Person}
                onChange={handleChange}
                placeholder="Enter contact person name"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"

              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">📞</span>
              </div>
              <input
                type="tel"
                name="Contact_Number"
                value={formData.Contact_Number}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"

              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">✉️</span>
              </div>
              <input
                type="email"
                name="Mail"
                value={formData.Mail}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                <span className="text-gray-500">📍</span>
              </div>
              <textarea
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                placeholder="Enter company address"
                rows="3"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"

              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`
    w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
    ${loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl transform hover:-translate-y-0.5"
                }
  `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Adding Company...
                </div>
              ) : (
                "➕ Add Company"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClintInfo;
