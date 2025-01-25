import { Blog } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCard";

export const FullBlog=({blog}:{blog:Blog})=>{
    console.log("FullBlog received:", blog);  // Check if blog data is passed correctly
    console.log("Author name:", blog.author.name);


    return <div>
        <Appbar/>
    <div className="flex justify-center">
    <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
        <div className="col-span-8">
            <div className="text-4xl font-extrabold">
               {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                Post on 4nd January 2024 
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
           
        </div>
        <div className="col-span-4">
            <div className="text-slate-600 text-lg">
                Author
            </div>
            <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"}></Avatar>
                </div>
                <div>
                    <div className="text-xl font-bold">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500">
                        Random catch phrase to grab user attention
                    </div>
                </div>

            </div>
        

        </div>
        
    </div>
    </div>
    </div>
}