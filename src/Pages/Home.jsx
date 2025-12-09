import React from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Company Directory",
      description: "View and manage all company information in one place",
      icon: "🏢",
      path: "/table",
      gradient: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      buttonText: "View Companies"
    },
    {
      title: "Add New Company",
      description: "Add new company details to the database",
      icon: "➕",
      path: "/add",
      gradient: "from-emerald-600 to-teal-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      iconColor: "text-emerald-600",
      buttonText: "Add Company"
    }
  ];

  const stats = [
    { value: "250+", label: "Companies", color: "text-blue-600", icon: "📊" },
    { value: "98%", label: "Accuracy", color: "text-emerald-600", icon: "✅" },
    { value: "24/7", label: "Uptime", color: "text-violet-600", icon: "⚡" },
    { value: "1.2s", label: "Response", color: "text-amber-600", icon: "🚀" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-6 shadow-lg">
            <span className="text-3xl text-white">🏢</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Company Management <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your business operations with our comprehensive company management system. 
            Everything you need in one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Gradient Top Bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${card.gradient}`}></div>
              
              <div className="p-8">
                <div className="flex items-start gap-6">
                  {/* Icon Container */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl ${card.bgColor} ${card.borderColor} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`text-3xl ${card.iconColor}`}>{card.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                    
                    <button
                      onClick={() => navigate(card.path)}
                      className={`px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${card.gradient} hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200`}
                    >
                      {card.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">System Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/table')}
              className="group bg-white hover:bg-blue-50 p-6 rounded-xl border border-gray-300 hover:border-blue-300 transition-all duration-200 flex items-center justify-between"
            >
              <div className="text-left">
                <div className="text-lg font-semibold text-gray-900 mb-1">Browse Companies</div>
                <div className="text-sm text-gray-600">View all in table format</div>
              </div>
              <div className="text-blue-600 text-2xl group-hover:scale-110 transition-transform">→</div>
            </button>
            
            <button
              onClick={() => navigate('/add')}
              className="group bg-white hover:bg-emerald-50 p-6 rounded-xl border border-gray-300 hover:border-emerald-300 transition-all duration-200 flex items-center justify-between"
            >
              <div className="text-left">
                <div className="text-lg font-semibold text-gray-900 mb-1">Add New Company</div>
                <div className="text-sm text-gray-600">Quick data entry</div>
              </div>
              <div className="text-emerald-600 text-2xl group-hover:scale-110 transition-transform">→</div>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Company Management System • Secure & Scalable
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;