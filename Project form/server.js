const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const morgan=require("morgan");
const fs=require("node:fs");
const path=require("node:path")


let app=express();
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cors());
app.use(morgan("combined"));

let employeeSchema=new mongoose.Schema({
id: Number,
firstName: String,
lastName: String,
email: String,
gender: String,
age: Number,
country: String,
department: String,
profilePic: String
});
let Employee=new mongoose.model("employees",employeeSchema)

app.get("/countriesList",async(req,res)=>{
   let countriesList= await Employee.find().distinct("country");
   res.json(countriesList);
})

app.get("/departmentsList",async(req,res)=>{
    let departmentsList= await Employee.find().distinct("department");
    res.json(departmentsList);
 })

 app.get("/gendersList",async(req,res)=>{
    let gendersList= await Employee.find().distinct("gender");
    res.json(gendersList);
 })

 
let MWF1=(req,res,next)=>{
    console.log("Inside express MWF1");
    next();
 };
 let MWF2=(req,res,next)=>{
    console.log("Inside express MWF2");
    next();
 };

 let MWF3=(req,res,next)=>{
    console.log("Inside express MWF3");
    next();
 };
app.use(MWF1);

app.get("/employees",async(req,res)=>{
    console.log(req.query);
   let employeesArr=await Employee.find().and([
    {country:req.query.country},
    {department:req.query.department},
    {gender:req.query.gender},
   ]);
   res.json(employeesArr);
   
});
app.listen(1405,()=>{
    console.log("Listening to port 1405");
});
let connectToMDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://akhilchinnamsetti:akhilch1405@batch2403.derqdcc.mongodb.net/Amazone?retryWrites=true&w=majority&appName=batch2403");

        console.log("Successfully connected to MDB");
    }
    catch(err){
        console.log("Unable to connected to MDB");
    }
}
connectToMDB();
