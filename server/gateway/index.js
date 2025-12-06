import express from 'express'
import expressProxy from 'express-http-proxy'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const app=express()
const PORT=process.env.PORT
const IP=process.env.IP
const USER=process.env.USER_PORT
const ADOPTION=process.env.ADOPTION_PORT
const TRANSPORT=process.env.TRANSPORT_PORT

const logFilePath = 'ip-log.json';
let ipLog = [];
if (fs.existsSync(logFilePath)) {
  ipLog = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
}
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Middleware to log unique IPs with timestamp
app.use('/user',expressProxy(`http://${IP}:${USER}`,{limit:'50mb'}),);


// app.use('/user',(req,res,next)=>{console.log(req.ip);next()},expressProxy(`http://${IP}:${USER}`))
app.use('/adoption',expressProxy(`http://${IP}:${ADOPTION}`,{limit:'50mb'}),)

app.listen(PORT,IP,()=>{
    console.log(`Gateway server is runnin on http://${IP}:${PORT}`)
})