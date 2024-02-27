import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
// import { SendMoney } from "./pages/SendMoney";
import Home from "./pages/Home";
import { ProfilePage } from "./pages/Profile";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/send" element={<SendMoney />} /> */}
                    <Route path="/" element={<Home />} />
                    <Route path="/me" element={<ProfilePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;