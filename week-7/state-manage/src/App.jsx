import { useRecoilState, useRecoilValue } from "recoil";
import {
    jobsAtom,
    messagingAtom,
    networkAtom,
    notifactionAtom,
    totalNotifications,
    notificationsWeb,
    allNotifications,
} from "./atoms";

function App() {
    return (
        <div>
            <AnotherApp />
        </div>
    );
}

export default App;

function BasicApp() {
    const network = useRecoilValue(networkAtom);
    const job = useRecoilValue(jobsAtom);
    const messaes = useRecoilValue(messagingAtom);
    const notification = useRecoilValue(notifactionAtom);

    const totalNotifications = useRecoilValue(totalNotifications);

    function tunc(val) {
        console.log(val);
        return val > 100 ? "99+" : val.toString();
    }
    return (
        <div>
            <button>Home</button>

            <button>My network {tunc(network)}</button>
            <button>Jobs {tunc(job)}</button>
            <button>Messaging {tunc(messaes)}</button>
            <button>Notifactions {tunc(notification)}</button>

            <button>Me {totalNotifications}</button>
        </div>
    );
}
function AnotherApp() {
    const noti = useRecoilValue(notificationsWeb);
    const totalNotifications = useRecoilValue(allNotifications)
    return (
        <div>
            <button>Home</button>
            {Object.entries(noti).map(([key, val]) => (
                <button key={key}>
                    {key} ({val})
                </button>
            ))}
            <button>Me {totalNotifications}</button>
        </div>
    );
}
