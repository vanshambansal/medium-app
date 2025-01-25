import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSKeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

interface Blog{
    "content":string;
    "title":string;
    "id":string;



}

export const Blogs=()=>{
    const {loading,blogs} = useBlogs()

    if (loading){
        return <div>
            <Appbar/>
            <div className="flex justify-center">
                <div>
            <BlogSKeleton/>
            <BlogSKeleton/>
            <BlogSKeleton/>
            <BlogSKeleton/>
            </div>
            </div>
        </div>
    }

    return <div>
        <Appbar/>
    <div className="flex justify-center">
    <div>
        {blogs.map(blog=><BlogCard 
        id={blog.id}
        authorName={blog.author.name || "Anonymous"}
        title={blog.title}
        content ={blog.content}
        publishedDate={"2nd feb 2024"}
        /> )}
    
    
    </div>
    </div>
    </div>
}
