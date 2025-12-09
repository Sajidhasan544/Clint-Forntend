import React from 'react';
import { useNavigate } from 'react-router';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Main Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <span className="text-white">🏢</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">CompanyHub</h2>
                            <p className="text-sm text-gray-600">Company Management System</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-6">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-gray-600 hover:text-gray-900 text-sm transition"
                        >
                            Home
                        </button>
                        <button 
                            onClick={() => navigate('/table')}
                            className="text-gray-600 hover:text-gray-900 text-sm transition"
                        >
                            Companies
                        </button>
                        <button 
                            onClick={() => navigate('/add')}
                            className="text-gray-600 hover:text-gray-900 text-sm transition"
                        >
                            Add New
                        </button>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition">
                            Support
                        </a>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Connected</span>
                    </div>

                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-200"></div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div>
                        © {currentYear} CompanyHub • All rights reserved
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-700">Privacy</a>
                        <a href="#" className="hover:text-gray-700">Terms</a>
                        <a href="#" className="hover:text-gray-700">Cookies</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;