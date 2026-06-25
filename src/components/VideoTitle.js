const VideoTitle = ({ title, overview }) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end pb-24 px-12 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">
                {title}
            </h1>
            <p className="hidden md:block text-white text-sm w-2/5 mb-6 line-clamp-3 drop-shadow">
                {overview}
            </p>
            <div className="flex gap-3 pointer-events-auto">
                <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2 rounded-lg text-lg hover:bg-opacity-80 transition">
                    ▶ Play
                </button>
                <button className="flex items-center gap-2 bg-gray-500 bg-opacity-70 text-white font-bold px-6 py-2 rounded-lg text-lg hover:bg-opacity-90 transition">
                    ℹ More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;