import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const success = await login(email, password);
            
            if (success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Login successful. Redirecting...',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#f8fafc',
                    color: '#1e293b'
                });
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password.',
                    confirmButtonColor: '#3b82f6',
                    background: '#f8fafc',
                    color: '#1e293b'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again.',
                confirmButtonColor: '#3b82f6'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-4 shadow-lg">
                        <span className="text-3xl text-white">🔐</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to <span className="text-blue-600">CompanyHub</span>
                    </h1>
                    <p className="text-gray-600">Sign in to manage your companies</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Sign In
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">✉️</span>
                                </div>
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder="admin@companyhub.com"
                                    required
                                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500">🔒</span>
                                </div>
                                <input 
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <a 
                                href="#" 
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Forgot Password?',
                                        text: 'Please contact your system administrator.',
                                        icon: 'info',
                                        confirmButtonColor: '#3b82f6'
                                    });
                                }}
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-3.5 rounded-xl font-semibold text-lg transition-all duration-300
                                ${loading 
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                                }
                            `}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                    </form>

                    {/* Demo Credentials */}
                    

                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Company Management System • Secure Access
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;