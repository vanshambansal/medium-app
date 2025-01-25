import axios from "axios"
import { Appbar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish=()=>{
    const[title,setTitle]=useState("")
    const[description,setDescription]=useState("")
    const navigate = useNavigate()
    return <div>
            <Appbar/>
    <div className="flex justify-center w-full pt-8">
       
       
        <div className="max-w-screen-lg w-full">
        
            <input onChange={(e)=>{
                setTitle(e.target.value)
            }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title"/>
            <TextArea onChange={(e)=>{
                    setDescription(e.target.value)
            }}/>
            <button onClick={async()=>{
                console.log("Token:", localStorage.getItem("token"));

                   const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title,
                        content: description
                    },{
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            
                        },
                        
                    })
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-700">
                Publish post
                </button>
        </div>
        </div>
    </div>
}

function TextArea( {onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>) =>void}){
        return <div>
               <textarea onChange={onChange} className="mt-5 block p-2.5 w-full h-40 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 overflow-hidden"placeholder="Write your thoughts here..."></textarea>
                
                </div>
}