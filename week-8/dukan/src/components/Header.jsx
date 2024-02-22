export default function Header() {
    return (
        <nav className="bg-white border-gray-200 shadow-md">
            <div className="flex items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-2xl font-semibold">Payments</span>
                    <span className="self-center whitespace-nowrap">
                        Flowbite
                    </span>
                </div>
                <div className="relative">
                    {" "}
                    {/* Added flex-1 to take available space */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {" "}
                        {/* Adjusted positioning */}
                        <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        <span className="sr-only">Search icon</span>
                    </div>
                    <input
                        type="text"
                        id="search-navbar"
                        className="block w-80 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" // Adjusted width
                        placeholder="Search features, tutorials, etc."
                    />
                </div>

                <div className=" flex w-auto order-1">
                    <ul className="flex  p-4  font-medium border-gray-100 rounded-lg  space-x-8 mt-0 border-0 ">
                        <li>
                            <div
                                className="block rounded bg-transparent text-blue-700 p-0"
                                aria-current="page"
                            >
                                Home
                            </div>
                        </li>
                        <li>
                            <div className="block  text-gray-900 rounded hover:bg-transparent hover:text-blue-700 p-0 ">
                                About
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
