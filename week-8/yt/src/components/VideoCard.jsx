const VideoCard = ({
    title,
    thumbnailUrl,
    duration,
    views,
    channelName,
    channelAvatar,
    uploaded,
}) => {
    return (
        <div className="m-3 shadow-md rounded-xl">
            {/* Thumbnail */}
            <a href="" className="block relative">
                <img src={thumbnailUrl} alt={title} className="rounded-t-xl" />
                <div className="absolute bottom-0 right-0 m-2 bg-black text-white px-2 py-1 rounded">
                    {duration}
                </div>
            </a>

            {/* Content */}
            <div className="grid grid-cols-12 p-4">
                <div className="flex justify-center items-center col-span-2">
                    <img
                        src={channelAvatar}
                        alt={channelName}
                        className="rounded-full w-12 h-12 object-cover"
                    />
                </div>
                <div className="col-span-10 pl-3">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-gray-700">{channelName}</p>
                    <p className="text-gray-600">
                        {views} | {uploaded}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
