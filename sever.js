import express from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const app=express()

const port=process.env.port||1000

app.use(express.json())

const books=[
    {
        id:"01",
        name:"A",
        author:"A"
    }
]

app.get("/books",authenToken,(req,res)=>{
    res.json({status:"Success",data:books})
})

function authenToken(req,res,next){
    const authorizationHeader=req.headers['authorization']
    const token =authorizationHeader.split(' ')[1]
    if(!token)res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,data)=>{
        console.log(err,data);
        if(err) res.sendStatus(402)
        })
    next();
}

app.listen(port,()=>{
    console.log(`sever is running on http://localhost:${port}`);
})