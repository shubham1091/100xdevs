import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Appbar = () => {
    const [name, setName] = useState("");
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/user/me", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                // Set initial values for updating user data
                setName(response.data.firstName);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        // Navigate to the profile page
        navigate("/me");
    };

    return (
        <div className="shadow h-16 bg-blue-500 text-white flex justify-between items-center px-4">
            <div className="text-xl font-bold">PayTM App</div>
            <div className="flex items-center">
                <div
                    className="mr-4 text-lg cursor-pointer"
                    onClick={handleProfileClick}
                >
                    Hello, {name}
                </div>
                <div
                    className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl cursor-pointer"
                    onClick={handleProfileClick}
                >
                    {name[0]}
                </div>
            </div>
        </div>
    );
};
