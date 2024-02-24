import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                    username,
                    password,
                }
            );
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };
    return (
        <div className="flex h-screen">
            {/* Left Section: Image */}
            <div className="w-1/2 bg-gradient-to-b from-purple-400 to-blue-500 flex items-center justify-center">
                {/* <img src="https://via.placeholder.com/400" alt="Website" className="w-3/4 rounded-lg shadow-lg" /> */}
            </div>
            {/* Right Section: Sign In Form */}
            <div className="w-1/2 flex flex-col items-center justify-center bg-slate-300">
                <div className="p-8 bg-white rounded-lg shadow-lg max-w-sm">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Sign in
                    </h2>
                    <p className="text-lg mb-6 text-gray-700 text-center">
                        Enter your credentials to access your account
                    </p>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="123456"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <button
                            onClick={handleSignin}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        >
                            Sign in
                        </button>
                    </div>
                    <p className="text-lg mb-4 text-gray-700 text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-500 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
