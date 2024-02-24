import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SendMoneyModal } from "./SendMoneyModal";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const openSendMoneyModal = (user) => {
        setSelectedUser(user);
        setShowSendMoneyModal(true);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setUsers(response.data.users);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, [filter]);

    return (
        <div className="mx-auto px-4">
            <div className="font-bold text-2xl text-gray-800 mt-6 mb-4">Users</div>
            <input
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            />
            {users.map((user) => (
                <div key={user._id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="rounded-full h-12 w-12 flex items-center justify-center text-xl bg-gray-200 text-gray-600">{user.firstName[0]}</div>
                        <div className="ml-4 text-lg text-gray-800">{user.firstName} {user.lastName}</div>
                    </div>
                    <button
                        onClick={() => openSendMoneyModal(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        Send Money
                    </button>
                </div>
            ))}
            {showSendMoneyModal && (
                <SendMoneyModal
                    id={selectedUser._id}
                    name={`${selectedUser.firstName} ${selectedUser.lastName}`}
                    onClose={() => setShowSendMoneyModal(false)}
                />
            )}
        </div>
    );
};

export default Users;
