import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import ProtectedRouter from "../../Router/ProctedRouter";

function CTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "https://clint-site.vercel.app";

  useEffect(() => {
    axios
      .get(`${API_URL}/data`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API fetch error: ", err);
        setLoading(false);
      });
  }, []);

  const goToDetails = (id) => {
    if (!id) return;
    navigate(`/details/${id}`);
  };

  const isEdited = (item) => {
    const keys = [
      "facebookPage",
      "linkedin",
      "websiteExists",
      "successRate",
      "problems",
      "solutions",
    ];
    return keys.some((key) => item[key] && item[key] !== "");
  };

  return (
    <ProtectedRouter>
      <div className="min-h-screen pt-24 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 text-gray-800 p-10">

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text 
        bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 drop-shadow-md mb-12">
          Company Data
        </h1>

        {loading ? (
          <div className="w-screen h-screen flex items-center justify-center">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden 
          shadow-xl border border-purple-200 bg-white">

            <table className="min-w-full">

              {/* Table Header */}
              <thead className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">#</th>
                  <th className="px-4 py-4 text-left font-semibold">Company</th>
                  <th className="px-4 py-4 text-left font-semibold">Contact Person</th>
                  <th className="px-4 py-4 text-left font-semibold">Manager</th>
                  <th className="px-4 py-4 text-left font-semibold">Phone</th>
                  <th className="px-4 py-4 text-left font-semibold">Email</th>
                  <th className="px-4 py-4 text-left font-semibold">Edited</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item._id || index}
                    onClick={() => goToDetails(item._id)}
                    className={`
                      cursor-pointer 
                      transition-colors duration-200 
                      hover:bg-gradient-to-r hover:from-orange-200/40 hover:via-pink-200/40 hover:to-purple-200/40
                      ${index % 2 === 0 ? "bg-white" : "bg-purple-50"}
                      text-gray-800
                    `}
                  >
                    <td className="px-4 py-3 border-b border-gray-200">{index + 1}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{item.Company_Name || "-"}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{item.Contact_Person || "-"}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{item.Support_Person || "-"}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{item.Contact_Number || "-"}</td>
                    <td className="px-4 py-3 border-b border-gray-200">{item.Mail || "-"}</td>
                    <td className="px-4 py-3 border-b border-gray-200 text-green-600 font-bold">
                      {isEdited(item) ? "✔️" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </ProtectedRouter>
  );
}

export default CTable;
