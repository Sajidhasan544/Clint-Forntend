import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    facebookPage: "",
    facebookFollowers: "",
    linkedin: "",
    successRate: "",
    problems: "",
    solutions: "",
    websiteExists: ""
  });

  useEffect(() => {
    axios.get(`https://clint-site.vercel.app/data/${id}`)
      .then(res => {
        setInfo(res.data);
        setForm({
          facebookPage: res.data.facebookPage || "",
          facebookFollowers: res.data.facebookFollowers || "",
          linkedin: res.data.linkedin || "",
          successRate: res.data.successRate || "",
          problems: res.data.problems || "",
          solutions: res.data.solutions || "",
          websiteExists: res.data.websiteExists || ""
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // ===========================
  // Save with SweetAlert2
  // ===========================
  const handleSave = () => {
    axios.put(`https://clint-site.vercel.app/data/update/${id}`, form)
      .then(() => {
        Swal.fire({
          title: "Updated!",
          text: "Data updated successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb"
        });
        setEditMode(false);
      })
      .catch(err => {
        Swal.fire({
          title: "Error!",
          text: "Failed to update. Try again.",
          icon: "error",
          confirmButtonColor: "#dc2626"
        });
        console.error(err);
      });
  };

  // ===========================
  // Delete with SweetAlert2
  // ===========================
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
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Client data has been deleted.",
              icon: "success",
              confirmButtonColor: "#2563eb"
            });
            navigate("/table"); // Redirect back to table after deletion
          })
          .catch(err => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete data.",
              icon: "error",
              confirmButtonColor: "#dc2626"
            });
            console.error(err);
          });
      }
    });
  };

  // ===========================
  // Copy Company Name
  // ===========================
  const copyCompanyName = () => {
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
  };

  if (!info) return <div className="w-screen h-screen flex items-center justify-center">
    <span className="loading loading-bars loading-xl"></span>
  </div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-10 pt-24">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">

        {/* Company Name + Copy + Delete */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-600">{info.Company_Name}</h1>
          <div className="flex gap-2">
            <button
              onClick={copyCompanyName}
              className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded text-gray-900 font-semibold"
            >
              Copy Name
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white font-semibold"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-2 mb-6 text-gray-800">
          <p><strong>Contact Person:</strong> {info.Contact_Person}</p>
          <p><strong>Manager:</strong> {info.Support_Person}</p>
          <p><strong>Phone:</strong> {info.Contact_Number}</p>
          <p><strong>Email:</strong> {info.Mail}</p>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setEditMode(!editMode)}
          className="mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          {editMode ? "Cancel Edit" : "Edit Info"}
        </button>

        {/* Edit Form */}
        {editMode && (
          <div className="space-y-4">
            {/* Form fields */}
            <div>
              <label className="block text-sm mb-1">Facebook Page Exists?</label>
              <select
                name="facebookPage"
                value={form.facebookPage}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Facebook Followers</label>
              <input
                name="facebookFollowers"
                value={form.facebookFollowers}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                placeholder="10k - 50k"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">LinkedIn Page?</label>
              <select
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Website Exists?</label>
              <select
                name="websiteExists"
                value={form.websiteExists}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Success Rate (%)</label>
              <input
                name="successRate"
                value={form.successRate}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                placeholder="80%"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Problems</label>
              <textarea
                name="problems"
                value={form.problems}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Solutions</label>
              <textarea
                name="solutions"
                value={form.solutions}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-100 border border-gray-300"
                rows="3"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg mt-2"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Display Section */}
        {!editMode && (
          <div className="mt-6 space-y-2 text-gray-800">
            <h2 className="text-xl font-semibold text-blue-600">Digital Insights</h2>
            <p><strong>Facebook Page:</strong> {info.facebookPage || "N/A"}</p>
            <p><strong>Followers:</strong> {info.facebookFollowers || "N/A"}</p>
            <p><strong>LinkedIn:</strong> {info.linkedin || "N/A"}</p>
            <p><strong>Website Exists:</strong> {info.websiteExists || "N/A"}</p>
            <p><strong>Success Rate:</strong> {info.successRate || "N/A"}</p>
            <p>
              <strong>Problems:</strong> <span className="whitespace-pre-wrap">{info.problems || "N/A"}</span>
            </p>
            <p>
              <strong>Solutions:</strong> <span className="whitespace-pre-wrap">{info.solutions || "N/A"}</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Details;
