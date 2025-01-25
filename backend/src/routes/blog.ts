import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput , updateBlogInput } from "@vansham/medium-common";

export const blogrouter =new Hono<{
	Bindings: {
		DATABASE_URL: string;
        JWT_SECRET :string;
    
	},
    Variables:{
        userId:string;
    }
}>()



blogrouter.use('/*',async(c ,next)=>{
    const header= c.req.header('Authorization') || "";
    const token = header.split(" ")[1]
  try{
    
    const user = await verify(token,c.env.JWT_SECRET)
    if(user){
        // @ts-ignore
        c.set("userId",user.id)
        await next()
    } else{
      c.status(403);
      return c.json({message:"you are not logged in"})
    }
  } 
  catch(e){
    c.status(403);
      return c.json({message:"oops you are not logged in"})
  }
  
  })
  

blogrouter.post('/',async(c)=>{
    const body= await c.req.json()
        const {success}=createBlogInput.safeParse(body)
        if(!success){
            c.status(411)
            return c.json({
                message:"Inputs are incorrect"
            })
        }
    const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      

      
      const authorId =  c.get("userId")

      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content:body.content,
            authorId: authorId
        }
      })

    return c.json({
        id:blog.id
    })
  })
  
blogrouter.put('/',async (c)=>{

    const body= await c.req.json()
        const {success}=updateBlogInput.safeParse(body)
        if(!success){
            c.status(411)
            return c.json({
                message:"Inputs are incorrect"
            })
        }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    

    const blog = await prisma.post.update({
        where:{
            id:body.id
        },
      data:{
          title: body.title,
          content:body.content,
      }
    })

  return c.json({
      id:blog.id
  })
  })


  //add pagination

  blogrouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })

    return c.json({
        blogs
    })
  })
  

blogrouter.get('/:id',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const id = c.req.param("id");

    try{
        const blog = await prisma.post.findFirst({
            where:{
                id:id
            },
            select:{
                id:true,
                content:true,
                title:true,
                author:{
                select:{
                    name:true,
                    }
            }
         
        }})
    
      return c.json({
          id:blog
      })
    }catch(e){
        c.status(411)
        return c.json({
            message:"Error while fetching the blog"
        })
    }
    
  })

  
