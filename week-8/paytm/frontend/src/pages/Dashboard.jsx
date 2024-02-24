import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import axios from "axios";
import Users from "../components/Users";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((res) => {
                setBalance(res.data.balance);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};
