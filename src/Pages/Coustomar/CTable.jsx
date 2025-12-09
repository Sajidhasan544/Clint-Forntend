import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function CTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "https://clint-site.vercel.app";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/data`);
      console.log("✅ API Response:", response.data);
      
      // ✅ নতুন Backend Structure: {success: true, data: [], count: X}
      if (response.data && response.data.success) {
        const items = response.data.data || [];
        console.log("📊 Items received:", items.length);
        setData(items);
      } 
      // ✅ পুরানো Structure: সরাসরি array
      else if (Array.isArray(response.data)) {
        console.log("📦 Direct array received:", response.data.length);
        setData(response.data);
      }
      // ❌ কোনো data না পেলে
      else {
        console.warn("⚠️ Unexpected data format:", response.data);
        setData([]);
      }
    } catch (err) {
      console.error("❌ API fetch error:", err);
      setError(err.message || "Failed to fetch data");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const goToDetails = (id) => {
    if (!id) {
      console.warn("No ID provided for details");
      return;
    }
    console.log("📍 Navigating to details for ID:", id);
    navigate(`/details/${id}`);
  };

  const isEdited = (item) => {
    if (!item) return false;
    
    const keys = [
      "facebookPage",
      "linkedin", 
      "websiteExists",
      "successRate",
      "problems",
      "solutions",
    ];
    
    const edited = keys.some((key) => {
      const value = item[key];
      return value !== undefined && value !== null && value !== "";
    });
    
    return edited;
  };

  const renderTableRow = (item, index) => {
    if (!item || typeof item !== 'object') {
      return null;
    }

    // ✅ তোমার Database এর ফিল্ডগুলো
    const companyName = item.facebookPage || item.Company_Name || "-";
    const contactPerson = item.Contact_Person || item.linkedin || "-";
    const manager = item.Support_Person || "-";
    const phone = item.Contact_Number || "-";
    const email = item.Mail || "-";
    const id = item._id || index;

    return (
      <tr
        key={id}
        onClick={() => goToDetails(id)}
        className={`
          cursor-pointer 
          transition-all duration-300 
          hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50
          hover:shadow-md
          ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          border-b border-gray-200
        `}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900 bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full">
              {index + 1}
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm font-semibold text-gray-900">{companyName}</div>
          {item.websiteExists && (
            <div className="text-xs text-green-600 mt-1">🌐 Website Available</div>
          )}
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900">{contactPerson}</div>
          {item.linkedin && (
            <a 
              href={item.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 mt-1 block"
              onClick={(e) => e.stopPropagation()}
            >
              🔗 LinkedIn
            </a>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">{manager}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            <a href={`tel:${phone}`} className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
              📞 {phone}
            </a>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900">
            <a href={`mailto:${email}`} className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
              ✉️ {email}
            </a>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex justify-center">
            {isEdited(item) ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                ✓ Edited
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-300">
                Pending
              </span>
            )}
          </div>
        </td>
      </tr>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Fetching company data...</p>
          <p className="text-gray-400 text-sm mt-2">Connecting to database</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Connection Error</h3>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              🔄 Retry Connection
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
            >
              🔃 Reload Page
            </button>
          </div>
        </div>
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <span className="text-3xl">📭</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">No Company Data Found</h3>
          <p className="text-gray-600 mb-6">
            The database is currently empty or no data is available.
          </p>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition"
          >
            Check Again
          </button>
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-gray-300 shadow-2xl bg-white">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Company Directory</h2>
              <p className="text-blue-100 mt-1">Total {data.length} companies registered</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition flex items-center gap-2"
              >
                <span>🔄</span> Refresh
              </button>
              <div className="px-4 py-2 bg-black/20 backdrop-blur-sm text-white rounded-lg text-sm">
                API Connected ✓
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  #
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Company / Facebook Page
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact / LinkedIn
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Support Person
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact Number
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => renderTableRow(item, index))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-700 mb-2 sm:mb-0">
              <span className="font-semibold">{data.length}</span> records found • 
              <span className="ml-2 text-green-600 font-medium">
                {data.filter(item => isEdited(item)).length} edited
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online • Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto pt-16">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Company Data Dashboard
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Manage and analyze all company information in real-time. 
            Click on any row to view detailed information.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:shadow-sm transition inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Backend Connected</span>
            </div>
            <div className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-sm">
              API Endpoint: {API_URL}
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-10">
          {renderContent()}
        </div>

        {/* Quick Stats */}
        {Array.isArray(data) && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Total Companies</div>
              <div className="text-3xl font-bold text-gray-900">{data.length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Edited Profiles</div>
              <div className="text-3xl font-bold text-green-600">{data.filter(item => isEdited(item)).length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">With Website</div>
              <div className="text-3xl font-bold text-blue-600">
                {data.filter(item => item.websiteExists).length}
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Success Rate Avg</div>
              <div className="text-3xl font-bold text-purple-600">
                {Math.round(data.reduce((acc, item) => acc + (item.successRate || 0), 0) / data.length)}%
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-12 pb-8">
          <p>Company Management System • Data fetched from {API_URL}</p>
          <p className="mt-1">Click any row to view detailed information</p>
        </div>
      </div>
    </div>
  );
}

export default CTable;