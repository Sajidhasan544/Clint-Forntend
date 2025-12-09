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
      
      if (response.data?.success) {
        setData(response.data.data || []);
      } else if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch company data");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const goToDetails = (id) => {
    if (!id) return;
    navigate(`/details/${id}`);
  };

  // ✅ শুধু MEANINGFUL additional fields থাকলে true return করবে
  const hasMeaningfulAdditionalFields = (item) => {
    if (!item) return false;
    
    // Check only these 4 fields for meaningful data
    const checkMeaningfulData = () => {
      // 1. Check facebookPage - শুধু valid URL থাকলে
      if (item.facebookPage && item.facebookPage.trim() !== "") {
        const fb = item.facebookPage.trim().toLowerCase();
        const invalidFbValues = ["n/a", "na", "none", "null", "-", "", "no", "not available"];
        if (!invalidFbValues.includes(fb) && fb.length > 5) {
          // Check if it looks like a URL
          if (fb.includes('http') || fb.includes('facebook.com') || fb.includes('fb.com') || fb.includes('www.')) {
            return true;
          }
        }
      }
      
      // 2. Check linkedin - শুধু valid URL থাকলে
      if (item.linkedin && item.linkedin.trim() !== "") {
        const li = item.linkedin.trim().toLowerCase();
        const invalidLiValues = ["n/a", "na", "none", "null", "-", "", "no", "not available"];
        if (!invalidLiValues.includes(li) && li.length > 5) {
          // Check if it looks like a URL
          if (li.includes('http') || li.includes('linkedin.com') || li.includes('www.')) {
            return true;
          }
        }
      }
      
      // 3. Check websiteExists - শুধু true হলে
      if (item.websiteExists === true) {
        return true;
      }
      
      // 4. Check successRate - শুধু 0 এর বেশি হলে
      if (item.successRate && Number(item.successRate) > 0) {
        return true;
      }
      
      return false;
    };
    
    return checkMeaningfulData();
  };

  // Function to get status color and text
  const getStatusInfo = (item) => {
    const hasExtra = hasMeaningfulAdditionalFields(item);
    return {
      text: hasExtra ? "✓ Edited" : "Basic",
      colorClass: hasExtra ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800",
      borderClass: hasExtra ? "border-green-200" : "border-gray-300"
    };
  };

  // Function to display field value properly
  const displayField = (value, fieldName) => {
    if (!value && value !== 0 && value !== false) return "—";
    
    const strValue = value.toString().trim();
    
    // Check for common "empty" values
    const emptyValues = ["", "n/a", "na", "none", "null", "undefined", "-", "not available", "no"];
    if (emptyValues.includes(strValue.toLowerCase())) {
      return "—";
    }
    
    // Special handling for booleans
    if (fieldName === "websiteExists") {
      return value === true ? "✅ Yes" : "❌ No";
    }
    
    // Special handling for successRate
    if (fieldName === "successRate") {
      return value > 0 ? `${value}%` : "—";
    }
    
    return value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-gray-600 text-lg font-medium">Fetching company data...</p>
            <p className="text-gray-400 text-sm mt-2">Connecting to database</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
              <span className="text-3xl text-red-600">⚠️</span>
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 text-center md:text-left">
            Company Data Dashboard
          </h1>
          <p className="text-gray-600 text-lg text-center md:text-left">
            Manage and analyze all company information in real-time
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
            >
              ← Back to Home
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition flex items-center gap-2"
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-10">
          
          {/* Table Header with Gradient */}
          <div className="px-6 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Company Directory</h2>
                <p className="text-blue-100 mt-1">
                  {data.length} companies registered • 
                  <span className="ml-2">
                    {data.filter(item => hasMeaningfulAdditionalFields(item)).length} with additional info
                  </span>
                </p>
              </div>
              <div className="text-sm text-white/90">
                Updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="hidden sm:table-cell px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Manager
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="hidden md:table-cell px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 sm:px-6 py-16 text-center">
                      <div className="text-4xl text-gray-300 mb-4">📭</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Company Data Found</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        The database is currently empty or no data is available.
                      </p>
                      <button
                        onClick={fetchData}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition"
                      >
                        Check Again
                      </button>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => {
                    const status = getStatusInfo(item);
                    
                    return (
                      <tr
                        key={item._id || index}
                        onClick={() => goToDetails(item._id)}
                        className={`
                          cursor-pointer transition-all duration-200 
                          hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50
                          ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        `}
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full mx-auto sm:mx-0">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-col">
                            <div className="text-sm font-semibold text-gray-900">
                              {displayField(item.Company_Name, "Company_Name")}
                            </div>
                            {item.websiteExists === true && (
                              <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                <span>🌐</span> Has Website
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="text-sm text-gray-900">
                            {displayField(item.Contact_Person, "Contact_Person")}
                          </div>
                          {item.linkedin && item.linkedin.trim() !== "" && 
                           !["n/a", "na", "none", "-", ""].includes(item.linkedin.trim().toLowerCase()) && (
                            <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                              <span>🔗</span> LinkedIn
                            </div>
                          )}
                        </td>
                        <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {displayField(item.Support_Person, "Support_Person")}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <a 
                              href={`tel:${item.Contact_Number}`}
                              className="hover:text-blue-600 transition-colors flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>📞</span> {displayField(item.Contact_Number, "Contact_Number")}
                            </a>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <a 
                              href={`mailto:${item.Mail}`}
                              className="hover:text-blue-600 transition-colors flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>✉️</span> {displayField(item.Mail, "Mail")}
                            </a>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex justify-center sm:justify-start">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status.colorClass} border ${status.borderClass}`}>
                              {status.text}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
              <div className="mb-2 sm:mb-0">
                Showing <span className="font-semibold">{data.length}</span> companies • 
                <span className="ml-2 text-green-600 font-medium">
                  {data.filter(item => hasMeaningfulAdditionalFields(item)).length} with additional info
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Online • API Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Legend */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-300">
                Basic
              </span>
              <div>
                <p className="text-sm text-gray-600 mb-1">Only basic company information</p>
                <p className="text-xs text-gray-500">(Name, Contact, Phone, Email, Address)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                ✓ Edited
              </span>
              <div>
                <p className="text-sm text-gray-600 mb-1">Additional meaningful information</p>
                <p className="text-xs text-gray-500">(Valid Facebook/LinkedIn URL, Website = Yes, Success Rate &gt; 0%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm mt-8 pb-8">
          <p>Click any row to view detailed information • Company Management System</p>
        </div>

      </div>
    </div>
  );
}

export default CTable;