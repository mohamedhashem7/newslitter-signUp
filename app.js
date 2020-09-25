const express = require("express");
const bo = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.use(bo.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const Fname= req.body.fname;
    const lname= req.body.lname;
    const email= req.body.email;
    const data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:Fname,
                    LNAME:lname
                }
            }
        ]
    };
    const jdata = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/2142f2b062";
    const options = {
        method:"POST",
        auth:"mohamed7:df78aa12dee47965b637f84999f8a188-us2"
    }
    const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
            if (response.statusCode==200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        });
    });

    request.write(jdata);
    request.end();

   
});
app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT || 3000 ,function(){
    console.log("server is running on port 3000");
});

//df78aa12dee47965b637f84999f8a188-us2
//2142f2b062