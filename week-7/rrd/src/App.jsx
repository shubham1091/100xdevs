import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));

function App() {
    return (
        <div>
            <BrowserRouter>
                <Bar />
                <Suspense fallback={<div>loding</div>}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;

function Bar() {
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => {
                    navigate("/dashboard");
                }}
            >
                Dashboard
            </button>
            <button
                onClick={() => {
                    navigate("/");
                }}
            >
                landing
            </button>
        </div>
    );
}
