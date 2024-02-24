import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        username: "",
    });
    const [updatedUserData, setUpdatedUserData] = useState({
        firstName: "",
        lastName: "",
    });
    const [updatedPassword, setUpdatedPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [activeTab, setActiveTab] = useState("display");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from the API (replace with your actual endpoint)
        axios
            .get("http://localhost:3000/api/v1/user/me", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response.data);
                setUserData(response.data);
                // Set initial values for updating user data
                setUpdatedUserData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                });
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateUserInfo = () => {
        // Send updated user data to the backend for update
        axios
            .put("http://localhost:3000/api/v1/user/", updatedUserData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                // Optionally, handle success response
                console.log(
                    "User information updated successfully:",
                    response.data
                );
                // Update userData state to reflect changes
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error updating user information:", error);
            });
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPassword((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdatePassword = () => {
        // Send updated password data to the backend for update
        if (
            updatedPassword.confirmPassword !== "" &&
            updatedPassword.confirmPassword === updatedPassword.newPassword
        ) {
            console.log("Updated pass")
            axios
                .put(
                    "http://localhost:3000/api/v1/user/",
                    { password: updatedPassword.newPassword },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    // Optionally, handle success response
                    console.log("Password updated successfully");
                    // Clear password fields after successful update
                    setUpdatedPassword({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                })
                .catch((error) => {
                    console.error("Error updating password:", error);
                });
        }
    };

    const handleBackToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-gradient-to-b from-purple-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-3xl font-bold mb-4">
                        Welcome, {userData.firstName}!
                    </h1>
                    <p className="text-lg">
                        Manage your profile information here.
                    </p>
                </div>
            </div>

            <div className="w-1/2 bg-gray-100 p-8">
                <div className="flex justify-between  mb-6">
                    <h1 className="text-3xl font-bold  text-gray-800">
                        User Profile
                    </h1>
                    <button
                        className="py-2 px-4 bg-red-400 text-gray-800 rounded focus:outline-none focus:ring focus:ring-red-500 "
                        onClick={handleBackToDashboard}
                    >
                        Back to Dashboard
                    </button>
                </div>

                <div className="flex mb-6 space-x-4">
                    <button
                        className={`py-2 px-4 ${
                            activeTab === "display"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        } rounded focus:outline-none focus:ring focus:ring-blue-500 flex-grow`}
                        onClick={() => setActiveTab("display")}
                    >
                        Display Information
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            activeTab === "update"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        } rounded focus:outline-none focus:ring focus:ring-blue-500 flex-grow`}
                        onClick={() => setActiveTab("update")}
                    >
                        Update Information
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            activeTab === "password"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                        } rounded focus:outline-none focus:ring focus:ring-blue-500 flex-grow`}
                        onClick={() => setActiveTab("password")}
                    >
                        Change Password
                    </button>
                </div>
                <div className="bg-white shadow-md p-8 rounded-lg">
                    {activeTab === "display" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Your Information
                            </h2>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700">
                                    Email:
                                </span>{" "}
                                <span className="text-gray-600">
                                    {userData.username}
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700">
                                    First Name:
                                </span>{" "}
                                <span className="text-gray-600">
                                    {userData.firstName}
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700">
                                    Last Name:
                                </span>{" "}
                                <span className="text-gray-600">
                                    {userData.lastName}
                                </span>
                            </div>
                        </div>
                    )}
                    {activeTab === "update" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Update Information
                            </h2>
                            {/* Add form for updating information */}
                            <form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        // value={updatedUserData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="lastName"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        // value={updatedUserData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <button
                                    // type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                    onClick={handleUpdateUserInfo}
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    )}
                    {activeTab === "password" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Change Password
                            </h2>
                            {/* Add form for changing password */}
                            <form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="newPassword"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={updatedPassword.newPassword}
                                        onChange={handlePasswordInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={updatedPassword.confirmPassword}
                                        onChange={handlePasswordInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <button
                                    // type="submit"
                                    onClick={handleUpdatePassword}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    Change Password
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
