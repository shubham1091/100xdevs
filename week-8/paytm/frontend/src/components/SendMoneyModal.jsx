import { useState } from "react";
import axios from "axios";

export const SendMoneyModal = ({ id, name, onClose }) => {
    const [amount, setAmount] = useState(0);

    const handleTransfer = async () => {
        try {
            await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                    to: id,
                    amount,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            // Handle success or UI update upon successful transfer
            onClose(); // Close the modal after successful transfer
        } catch (error) {
            console.error("Error transferring money:", error);
            // Handle error or display error message to the user
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Send Money
                </h2>
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 flex items-center justify-center text-2xl text-white bg-green-500 rounded-full">
                        {name[0].toUpperCase()}
                    </div>
                    <h3 className="text-2xl font-semibold ml-4 text-gray-800">
                        {name}
                    </h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-800"
                        >
                            Amount (in Rs)
                        </label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            id="amount"
                            className="w-full h-10 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter amount"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleTransfer}
                            className="w-2/5 h-10 px-4 py-2 rounded-md bg-green-500 text-white font-medium text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Initiate Transfer
                        </button>
                        <button
                            onClick={onClose}
                            className="w-2/5 h-10 px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-medium text-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
