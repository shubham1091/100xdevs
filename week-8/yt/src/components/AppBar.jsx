import { SearchBar } from "./SearchBar";

export function AppBar() {
    return (
        <div className="flex justify-between px-2 py-1 items-center">
            <div>
                <img
                    src="https://www.gstatic.com/youtube/img/branding/favicon/favicon_144x144.png"
                    alt=""
                    className="w-12 h-12"
                />
            </div>
            <div>
                <SearchBar />
            </div>
            <div>sign in</div>
        </div>
    );
}
