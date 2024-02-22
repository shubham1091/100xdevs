import React from "react";

const RevenueCard = ({
    title = "hello",
    orderCount = 0,
    amount = 0,
    side = false,
    main = false,
    date,
}) => {
    const mainContainerClasses = main ? "shadow-lg" : "";
    const headerClasses = main
        ? "bg-sky-700 text-white rounded-t-md"
        : "bg-white rounded-md shadow-lg";
    const orderCountClasses = main ? "" : "text-sky-500";

    return (
        <div className={mainContainerClasses}>
            <div className={`p-5 ${headerClasses}`}>
                <div className="flex items-center font-light">
                    <div>{title}</div>
                    <div className="px-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="font-semibold text-2xl">₹ {amount}</div>
                    {!side && (
                        <div
                            className={`flex underline items-center font-medium ${orderCountClasses}`}
                        >
                            {orderCount} order(s)
                            <div className="">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {main && (
                <div className="bg-sky-900 text-white flex justify-between rounded-b-md px-5 py-2 text-xs">
                    <div>Next Payment Date:</div>
                    <div>{date}</div>
                </div>
            )}
        </div>
    );
};

export default RevenueCard;
