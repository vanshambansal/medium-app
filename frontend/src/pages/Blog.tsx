import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog"
import { BlogSKeleton } from "../components/BlogSkeleton"
import { Appbar } from "../components/AppBar"

export const Blog=()=>{

    const {id} =useParams()

    const {loading,blog}=useBlog({
        id:id||""
    })
   if(loading){
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
   if (!blog) {
    return <div>Blog not found.</div>;
}

   return <div>
        <FullBlog blog={blog}/>
        
   </div>
}