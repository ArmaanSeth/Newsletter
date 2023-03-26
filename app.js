const express=require("express")
const app=express()
const favicon=require("serve-favicon")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https")
const { send } = require("process")

app.use(bodyParser.urlencoded({extended:true}))
app.use(favicon(__dirname+"/public/images/icon.ico"))
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    var firstName=req.body.fName
    var lastName=req.body.lName
    var email=req.body.email


    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                    }
            }
        ]
    }

    const jsonData=JSON.stringify(data)
    
    const url="https://us21.api.mailchimp.com/3.0/lists/71437748c9" 

    const options={
        method:"POST",
        auth:"armaan:b5233d171745e3063655359fd4a7bedf-us21"
    }

    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }

        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    // request.write(jsonData)
    request.end()
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at port 3000")
})


// apikey-
// b5233d171745e3063655359fd4a7bedf-us21

// listid-
// 71437748c9