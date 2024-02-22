import React, { useState } from "react";
import data from "../data";

function OrdersList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(5); // Number of orders per page
    const [orders, setOrders] = useState(data);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (sortBy) => {
        const sortedOrders = [...orders];
        sortedOrders.sort((a, b) => {
            if (sortBy === "orderAmount") {
                return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
            } else {
                return a[sortBy].localeCompare(b[sortBy]);
            }
        });
        setSortBy(sortBy);
        setOrders(sortedOrders);
        setCurrentPage(1); // Reset to first page after sorting
    };

    const filteredOrders = orders.filter((order) =>
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Logic for displaying current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    // Logic for pagination page numbers
    const pageNumbers = [];
    for (
        let i = 1;
        i <= Math.ceil(filteredOrders.length / ordersPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="w-full p-4">
            <div className="flex flex-col mb-4">
                <div className="flex items-center space-x-2 justify-between mb-1">
                    <input
                        type="text"
                        placeholder="Search by order ID..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
                    />
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleSort(sortBy)}
                            className="px-3 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-1"
                        >
                            Sort by
                        </button>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
                        >
                            <option value="">Select criteria</option>
                            <option value="orderId">Order ID</option>
                            <option value="orderDate">Order Date</option>
                            <option value="orderAmount">Order Amount</option>
                            <option value="transactionFees">
                                Transaction Fees
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <table className="table-fixed w-full divide-y divide-gray-200 rounded-md">
                <thead>
                    <tr className="bg-gray-50 text-xs font-medium uppercase tracking-wider">
                        <th className="p-4 text-start">Order ID</th>
                        <th className="p-4 text-center">Order date</th>
                        <th className="p-4 text-center">Order amount</th>
                        <th className="p-4 text-end">Transaction fees</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr
                            key={order.orderId}
                            className="bg-white text-gray-600"
                        >
                            <td className="p-4 text-start text-blue-400">
                                {order.orderId}
                            </td>
                            <td className="p-4 text-center">
                                {order.orderDate}
                            </td>
                            <td className="p-4 text-center">
                                ₹ {order.orderAmount}
                            </td>
                            <td className="p-4 text-end">
                                {order.transactionFees}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <ul className="flex justify-center mt-4">
                <li>
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 mx-1 rounded-md ${
                            currentPage === 1
                                ? "hidden"
                                : "bg-indigo-500 text-white"
                        } hover:bg-indigo-500 hover:text-white focus:outline-none`}
                    >
                        {"<"}
                    </button>
                </li>
                {pageNumbers.map((number) => {
                    if (
                        number === currentPage ||
                        number === currentPage - 1 ||
                        number === currentPage + 1 ||
                        number === 1 ||
                        number === pageNumbers.length
                    ) {
                        return (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number)}
                                    className={`px-3 py-1 mx-1 rounded-md ${
                                        currentPage === number
                                            ? "bg-indigo-500 text-white"
                                            : "bg-gray-200 text-gray-600"
                                    } hover:bg-indigo-500 hover:text-white focus:outline-none`}
                                >
                                    {number}
                                </button>
                            </li>
                        );
                    } else if (
                        (number === currentPage - 2 && currentPage !== 2) ||
                        (number === currentPage + 2 &&
                            currentPage !== pageNumbers.length - 2)
                    ) {
                        return (
                            <li key={number}>
                                <span>...</span>
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
                <li>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === pageNumbers.length}
                        className={`px-3 py-1 mx-1 rounded-md ${
                            currentPage === pageNumbers.length
                                ? "hidden"
                                : "bg-indigo-500 text-white"
                        } hover:bg-indigo-500 hover:text-white focus:outline-none`}
                    >
                        {">"}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default OrdersList;
