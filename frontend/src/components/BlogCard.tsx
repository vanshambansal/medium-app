import { Link } from "react-router-dom";

interface BlogCardProps {
    id:string ;
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;

}

export const BlogCard=({
    id,
    authorName,
    title,
    content,
    publishedDate
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName}/>
            </div>
            <div className="font-normal pl-2">
                {authorName} 
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500">
                {publishedDate}
            </div>
                
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className="text-slate-600 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/500)} minute(s) read`}
        </div>
         
    </div>
    </Link> 
}


function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export function Avatar({name,size="small"}:{name:string,size? :"small"|"big"}){
    const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-medium ${size==="small"? "text-xs" : "text-lg"} text-gray-600 dark:text-gray-300`}>{initials}</span>
    </div>
    
}