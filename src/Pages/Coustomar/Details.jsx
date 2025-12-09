import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    facebookPage: "",
    facebookFollowers: "",
    linkedin: "",
    successRate: "",
    problems: "",
    solutions: "",
    websiteExists: false,
    // New fields
    Company_Name: "",
    Contact_Person: "",
    Contact_Number: "",
    Mail: "",
    Address: "",
    Support_Person: ""
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://clint-site.vercel.app/data/${id}`);
      
      if (response.data.success) {
        const data = response.data.data;
        setInfo(data);
        
        setForm({
          facebookPage: data.facebookPage || "",
          facebookFollowers: data.facebookFollowers || "",
          linkedin: data.linkedin || "",
          successRate: data.successRate || "",
          problems: Array.isArray(data.problems) ? data.problems.join(", ") : (data.problems || ""),
          solutions: Array.isArray(data.solutions) ? data.solutions.join(", ") : (data.solutions || ""),
          websiteExists: data.websiteExists || false,
          // New fields
          Company_Name: data.Company_Name || "",
          Contact_Person: data.Contact_Person || "",
          Contact_Number: data.Contact_Number || "",
          Mail: data.Mail || "",
          Address: data.Address || "",
          Support_Person: data.Support_Person || ""
        });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to load company details.",
        icon: "error",
        confirmButtonColor: "#dc2626"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Prepare data for backend
    const updateData = {
      ...form,
      facebookFollowers: form.facebookFollowers ? parseInt(form.facebookFollowers) : 0,
      successRate: form.successRate ? parseInt(form.successRate) : 0,
      problems: form.problems ? form.problems.split(',').map(p => p.trim()).filter(p => p) : [],
      solutions: form.solutions ? form.solutions.split(',').map(s => s.trim()).filter(s => s) : []
    };

    axios.put(`https://clint-site.vercel.app/data/${id}`, updateData)  // ✅ URL fixed
      .then(response => {
        if (response.data.success) {
          Swal.fire({
            title: "Updated!",
            text: "Data updated successfully.",
            icon: "success",
            confirmButtonColor: "#2563eb",
            timer: 1500
          });
          setEditMode(false);
          fetchData(); // Refresh data
        }
      })
      .catch(err => {
        console.error("Update error:", err);
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.error || "Failed to update. Try again.",
          icon: "error",
          confirmButtonColor: "#dc2626"
        });
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://clint-site.vercel.app/data/${id}`)
          .then(response => {
            if (response.data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Company data has been deleted.",
                icon: "success",
                confirmButtonColor: "#2563eb",
                timer: 1500
              });
              navigate("/table");
            }
          })
          .catch(err => {
            console.error("Delete error:", err);
            Swal.fire({
              title: "Error!",
              text: err.response?.data?.error || "Failed to delete data.",
              icon: "error",
              confirmButtonColor: "#dc2626"
            });
          });
      }
    });
  };

  const copyCompanyName = () => {
    if (info?.Company_Name) {
      navigator.clipboard.writeText(info.Company_Name)
        .then(() => {
          Swal.fire({
            title: "Copied!",
            text: `${info.Company_Name} copied to clipboard.`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Failed!",
            text: "Could not copy the name.",
            icon: "error",
            confirmButtonColor: "#dc2626"
          });
        });
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Company Not Found</h2>
          <button
            onClick={() => navigate("/table")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8 pt-24 mt-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{info.Company_Name}</h1>
              
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={copyCompanyName}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg flex items-center gap-2 transition"
              >
                <span>📋</span> Copy Name
              </button>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2 transition"
              >
                <span>{editMode ? "✖️" : "✏️"}</span> {editMode ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition"
              >
                <span>🗑️</span> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          {/* Basic Info Card */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🏢</span> Company Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Contact Person</p>
                <p className="font-semibold">{info.Contact_Person || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Support Person</p>
                <p className="font-semibold">{info.Support_Person || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number</p>
                <p className="font-semibold">
                  <a href={`tel:${info.Contact_Number}`} className="text-blue-600 hover:text-blue-800">
                    {info.Contact_Number || "N/A"}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold">
                  <a href={`mailto:${info.Mail}`} className="text-blue-600 hover:text-blue-800">
                    {info.Mail || "N/A"}
                  </a>
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-600">Address</p>
                <p className="font-semibold">{info.Address || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          {editMode ? (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Company Details</h3>
              
              {/* Social Media Section */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-4">Social Media Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Page URL</label>
                    <input
                      type="url"
                      name="facebookPage"
                      value={form.facebookPage}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Followers</label>
                    <input
                      type="number"
                      name="facebookFollowers"
                      value={form.facebookFollowers}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website Exists?</label>
                    <select
                      name="websiteExists"
                      value={form.websiteExists}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <h4 className="font-bold text-purple-800 mb-4">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Success Rate (%)</label>
                    <input
                      type="number"
                      name="successRate"
                      value={form.successRate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="0-100"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Problems (comma separated)</label>
                    <textarea
                      name="problems"
                      value={form.problems}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      rows="2"
                      placeholder="Enter problems separated by commas"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Solutions (comma separated)</label>
                    <textarea
                      name="solutions"
                      value={form.solutions}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      rows="2"
                      placeholder="Enter solutions separated by commas"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            /* Display Mode */
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Digital Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-600">Facebook Page</p>
                    <p className="font-semibold">
                      {info.facebookPage ? (
                        <a href={info.facebookPage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {info.facebookPage}
                        </a>
                      ) : "N/A"}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-600">LinkedIn</p>
                    <p className="font-semibold">
                      {info.linkedin ? (
                        <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {info.linkedin}
                        </a>
                      ) : "N/A"}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-600">Website Exists</p>
                    <p className="font-semibold">
                      {info.websiteExists ? (
                        <span className="text-green-600">✅ Yes</span>
                      ) : (
                        <span className="text-red-600">❌ No</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-600">Facebook Followers</p>
                    <p className="font-semibold text-2xl">{info.facebookFollowers || "0"}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-600">Success Rate</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-600 h-2.5 rounded-full" 
                          style={{ width: `${info.successRate || 0}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-xl">{info.successRate || "0"}%</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-600">Problems</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {Array.isArray(info.problems) && info.problems.length > 0 ? (
                        info.problems.map((problem, index) => (
                          <li key={index} className="text-gray-700">{problem}</li>
                        ))
                      ) : (
                        <li className="text-gray-500">No problems listed</li>
                      )}
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="text-gray-600">Solutions</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {Array.isArray(info.solutions) && info.solutions.length > 0 ? (
                        info.solutions.map((solution, index) => (
                          <li key={index} className="text-gray-700">{solution}</li>
                        ))
                      ) : (
                        <li className="text-gray-500">No solutions listed</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Last updated: {info.updatedAt ? new Date(info.updatedAt).toLocaleDateString() : "N/A"}
            </p>
            <button
              onClick={() => navigate("/table")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              ← Back to Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;