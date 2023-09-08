const mongoose=require("mongoose")

// require('dotenv').config()

const connection=mongoose.connect("mongodb+srv://shehzadmalik123sm:Malmon0412@cluster0.wsy5wl3.mongodb.net/?retryWrites=true&w=majority")


module.exports={connection}