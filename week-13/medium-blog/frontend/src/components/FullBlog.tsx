import Blog from "../pages/Blog";
import Appbar from "./Appbar";
import Avatar from "./Avatar";

function FullBlog({ blog }: { blog: Blog }) {
    return (
        <div className="w-full">
            <Appbar />
            <div className="flex px-5 lg:px-9 justify-center">
                <div className="grid gap-5 grid-cols-1 md:grid-cols-12 px-5 md:px-10 max-w-screen-xl mx-auto pt-10">
                    <div className="md:col-span-7">
                        <div className="text-3xl font-extrabold">
                            {blog.title}
                        </div>
                        <div
                            className="pt-4"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>
                    <div className="md:col-span-5">
                        <div className="text-slate-600 text-lg">Author</div>
                        <div className="flex items-center pt-2">
                            <div className="pr-3">
                                <Avatar name={blog.auther.name} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.auther.name || "Anonymous"}
                                </div>
                                <div className="text-slate-500">
                                    Random catch phrase about the author's
                                    ability to grab the user's attention.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullBlog;
