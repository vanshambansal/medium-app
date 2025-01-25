import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"


export interface Blog{
    "content":string;
    "title":string;
    "id":string;
    "author":{
        "name":string
    }



}

export const useBlog = ({id}:{id:string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const token = localStorage.getItem("token");


        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        })
        .then(response => {
         //    console.log("if i do response.data",response.data); 
            
            setBlog(response.data.id);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, [id]);

    return {
        loading,
        blog,
    };
}



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");


        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
        })
        .then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs,
    };
};
