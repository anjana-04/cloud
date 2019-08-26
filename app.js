var express=require('express')
var path=require("path")

var app=express();
var multer=require("multer")
var upload=multer({dest:"uploads/"})
var type=upload.single("file1")
var mongoose=require("mongoose")

app.use(express.static(path.join(__dirname,"/public")))
var bodyparser=require("body-parser")
var url="mongodb://127.0.0.1:27017/img"
var auth=require("./model/user")
app.use(bodyparser.urlencoded({extended:true}))
mongoose.connect(url,function(err){
    if(err) throw err
    else{
        console.log("database connected")
    }
})
app.post("/reg",type ,function(req,res){
    
    var u=new auth();
    u.text=req.body.text;
    
    u.file1=req.file.filename;
    
    u.save(function(err){
        if(err) throw err
        else{
           res.redirect("/")
        }
    })
    console.log()
    })

app.get("/",function(req,res){
    res.render("home")
})

app.get("/newbook",function(req,res){
    res.render("newbook")})
app.get("/update",function(req,res){
   
        auth.find({},(err,result)=>{
            if (err) throw err;
            else{
                console.log(result)
            res.render("update",{res:result})}
        })
    })

app.post("/upd",type ,function(req,res){
    
    auth.updateOne({text:req.body.title} ,{$set:{
        text:req.body.title,
        file1 : req.file.filename
    }}, (err,result)=>{
        if (err) throw err;
        else{
            auth.find({},(err,result)=>{
                if (err) throw err;
                else
                res.render("home",{res:result})
            })
        }
    }) 
})

app.get("/delete",function(req,res){
    auth.find({},function(err,result){
       if(err) throw err
       else{
    res.render("delete",{res:result})  
       }
    })
})

app.post("/del/:id",function(req,res){
    console.log(req.params.id)

    auth.deleteOne({text:req.params.id},function(err,result){
       if(err) throw err
       else{
          auth.find({},function(err,result){
    res.render("delete",{res:result})
           })
       }
    })
})
app.get("/viewbook",function(req,res){
    auth.find({},function(err,result){
        
        if(err) throw err
        else{
    res.render("viewbook",{arr:result})
        }
    })
})


app.get("/view/:image",function(req,res){
    res.sendFile(__dirname+"/images/"+req.params.image)
})
app.get("/views/:img",function(req,res){
    
    res.sendFile(__dirname+"/uploads/"+req.params.img)
    
})


app.set("view engine","ejs")
app.set("views","./src/views")


   
app.listen(3000,function(req,res){
    console.log("started")
})
