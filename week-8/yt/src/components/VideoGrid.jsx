import VideoCard from "./VideoCard";

const data = [
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
    {
        duration: "4:05",
        channelAvatar:
            "https://cdn.shopify.com/s/files/1/0469/3927/5428/t/21/assets/bildschirmfoto-20221123-um-134000-1669207710899.png",

        thumbnailUrl: "https://i.ytimg.com/vi/CuklIb9d3fI/maxresdefault.jpg",
        title: "Dynamite",
        views: "4M",
        channelName: "Big Hit Labels",
        uploaded: "2020-08-21",
        artist: "BTS",
    },
];
export function VideoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {data.map((video) => (
                <VideoCard
                    duration={video.duration}
                    channelAvatar={video.channelAvatar}
                    thumbnailUrl={video.thumbnailUrl}
                    title={video.title}
                    views={video.views}
                    channelName={video.channelName}
                    uploaded={video.uploaded}
                />
            ))}
        </div>
    );
}
