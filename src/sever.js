import express from 'express'
import bodyParser from 'body-parser'
import viewEngise from './config/viewEngise'
import initRouters from './routes/web'
import connectDB from './config/connectDB'
import cors from 'cors'
require('dotenv').config()

let app=express()
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//config app
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))


viewEngise(app);
initRouters(app);

connectDB();
let port=process.env.PORT || 8080
app.listen(port,()=>{
    console.log("Backend Nodejs is ruuning on the port",+port)
})