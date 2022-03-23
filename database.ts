import mongoose from "mongoose";

mongoose.connect("mongodb://root:example@localhost:27017/myCompany?authSource=admin").then(() =>{

            console.log("connected to mongodb");
}).catch(e => {

    console.log("could not connect to database ",2);
});