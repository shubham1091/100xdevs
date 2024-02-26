import { useEffect, useState } from "react";

export const useDebounce = (val, ms) => {
    const [bounce, setBounce] = useState(val);

    useEffect(() => {
        console.log(val);
        const rf = setTimeout(() => {
            setBounce(val);
        }, ms);
        return () => clearTimeout(rf);
    }, [val]);

    return bounce;
};
