import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import Family from "./Family.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <RecoilRoot>
        {/* <App /> */}
        <Family/>
    </RecoilRoot>
);
