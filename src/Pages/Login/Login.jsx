import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';  // Optional: for nicer alerts

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const success = await login(email, password);
        
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'Login successful.',
                timer: 1500,
                showConfirmButton: false
            });
            navigate("/"); // সফল হলে home এ পাঠাবে
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email or password!',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-6">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-10">
                <h1 className="text-5xl font-bold text-center text-blue-600 mb-8 drop-shadow-lg">
                    Login Now!
                </h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">Email</label>
                        <input 
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <a className="text-blue-600 hover:text-blue-800 font-medium" href="#">
                            Forgot password?
                        </a>
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition duration-300 shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;
