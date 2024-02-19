import {
    RecoilRoot,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/Count";

export default function State() {
    return (
        <div>
            <RecoilRoot>
                <Count />
            </RecoilRoot>
        </div>
    );
}

function Count() {
    return (
        <div>
            <div>
                <CountRenderer />
                {" "}
                <EvenCountRenderer />
            </div>
            <Button />
        </div>
    );
}

function CountRenderer() {
    const count = useRecoilValue(countAtom);
    return <b>{count}</b>;
}

function EvenCountRenderer() {
    const isEven = useRecoilValue(evenSelector);

    return <span>{isEven ? "it is even" : "it is odd"}</span>;
}

function Button() {
    const setCount = useSetRecoilState(countAtom);
    return (
        <div>
            <button
                onClick={() => {
                    setCount((count) => count + 1);
                }}
            >
                Increse
            </button>
            <button
                onClick={() => {
                    setCount((count) => count - 1);
                }}
            >
                Decrese
            </button>
        </div>
    );
}
