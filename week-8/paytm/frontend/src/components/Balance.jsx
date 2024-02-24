export const Balance = ({ value }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 my-4 flex justify-between">
            <h2 className="text-lg font-bold mb-2">Your Balance</h2>
            <div className="flex items-center">
                <span className="text-gray-700 text-lg font-semibold">Rs</span>
                <span className="text-2xl ml-2">{value.toFixed(2)}</span>
            </div>
        </div>
    );
};
