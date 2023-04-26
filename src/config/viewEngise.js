import express from 'express'

let configViewEngise=(app)=>{
    app.use(express.static("./src/public"))
    app.set("view engise","ejs")
    app.set("views","./src/views")
    
}
module.exports=configViewEngise

//view nơi render ra giao diện người dùng
//Controller tầng điều hướng
//web.js serve gọi đến homeController