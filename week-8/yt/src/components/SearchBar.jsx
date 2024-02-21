export function SearchBar() {
    return (
        <div className="w-2/4">
            <form action="">
                <div className="w-96 flex text-gray-900 border border-gray-500 rounded-3xl p-1 pl-3 text-sm pr-2">
                    <input
                        type="text"
                        className="w-full text-lg border-none outline-none"
                        placeholder="Search"
                        required
                    />
                    <button className=" text-gray-400 font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
