import Header from "./components/Header";
import NavBar from "./components/NavBar";
import OrdersList from "./components/OrderList";
import RevenueCard from "./components/RevenueCard";

function App() {
    return (
        <div className="flex ">
            <div className="">
                <NavBar />
            </div>
            <div className="basis-full ">
                <Header />
                <div className="flex justify-between items-center m-3">
                    <div className="text-xl font-semibold py-1">Overview</div>
                    <div className="shadow-sm py-1 px-5 flex justify-center items-center bg-gray-200 rounded-lg">
                        This Month
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4 ml-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 m-3">
                    <RevenueCard
                        title="Next Payout"
                        amount={2312.23}
                        orderCount={23}
                        main={true}
                        date={"Today, 4:00PM"}
                    />
                    <RevenueCard
                        title="Online Orders"
                        amount={92312.2}
                        orderCount={13}
                    />
                    <RevenueCard
                        title="Amount Received"
                        amount={92312.2}
                        side={true}
                    />
                </div>
                <div className="text-xl font-semibold py-5 m-3">
                    Transactions | This Month
                </div>
                <div className="flex space-x-4 m-3">
                    <div className="rounded-full bg-gray-300 px-4 py-1">
                        Payouts (22)
                    </div>
                    <div className="rounded-full bg-sky-700 px-4 py-1">
                        Refunds (8)
                    </div>
                </div>
                <div className="m-3 shadow-md">
                    <OrdersList/>
                </div>
            </div>
        </div>
    );
}

export default App;
