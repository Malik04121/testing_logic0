const mongoose=require("mongoose")

const todoSchema=mongoose.Schema({
    name:String,
})

const TodoModel=mongoose.model("test",todoSchema)

module.exports={TodoModel}