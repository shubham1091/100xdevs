import { useEffect, useState } from "react";

export function useIsonline() {
    const [isonline, setIsonline] = useState(false);

    useEffect(() => {
        // setInterval(() => {
        //     if (navigator.onLine) {
        //         setIsonline(true);
        //     } else {
        //         setIsonline(false);
        //     }
        // }, 5000);
        function onine() {
            setIsonline(true);
        }
        function offline() {
            setIsonline(false);
        }
        window.addEventListener("offline", offline);
        window.addEventListener("online", onine);

        return () => {
            window.addEventListener("offline", offline);
            window.addEventListener("online", onine);
        };
    }, []);

    return isonline;
}
