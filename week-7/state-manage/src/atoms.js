import axios from "axios";
import { atom, selector } from "recoil";

export const networkAtom = atom({
    key: "networkAtom",
    default: 104,
});
export const jobsAtom = atom({
    key: "jobsAtom",
    default: 0,
});
export const notifactionAtom = atom({
    key: "notifactionAtom",
    default: 4,
});
export const messagingAtom = atom({
    key: "messagingAtom",
    default: 10,
});

export const totalNotifications = selector({
    key: "totalNotifications",
    get: ({ get }) => {
        const notifaction = get(notifactionAtom);
        const messaging = get(messagingAtom);
        const jobs = get(jobsAtom);
        const network = get(networkAtom);
        return notifaction + messaging + jobs + network;
    },
});

export const notificationsWeb = atom({
    key: "notificationsWeb",
    default: selector({
        key: "networkAtomSelector",
        get: async () => {
            const res = await axios.get(
                "https://sum-server.100xdevs.com/notifications"
            );

            return res.data;
        },
    }),
});

export const allNotifications = selector({
    key: "notificationsSelector",
    get: ({ get }) => {
        const notifaction = get(notificationsWeb);

        return Object.values(notifaction).reduce((acc, val) => acc + val, 0);
    },
});
