import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div className="flex h-screen">
            {/* Left Section: Image */}
            <div className="w-1/2 bg-gradient-to-b from-purple-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
                    <p className="text-lg">Start your journey with us.</p>
                </div>
            </div>

            {/* Right Section: Sign Up / Sign In */}
            <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100">
                <div className="p-8 bg-white rounded-lg shadow-lg max-w-sm">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        New Here
                    </h2>
                    <p className="text-lg mb-6 text-gray-700 text-center">
                        Sign up to create an account
                    </p>
                    <Link to="/signup">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full transform hover:scale-105 mb-6">
                            Sign Up
                        </button>
                    </Link>
                    <p className="text-lg mb-4 text-gray-700 text-center">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="text-blue-500 hover:underline"
                        >
                            Sign in here
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
