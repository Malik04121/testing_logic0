// app.js
const express = require('express');
const { connection } = require('./db');
const { TodoModel } = require('./model');
// const { connection } = require('mongoose');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// GET route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// POST route
app.post('/api/users', async(req, res) => {
  // Handle the POST request here

  const user = req.body;
  const newDataList = req.body; // Assuming you send an array of data objects in the request body

  try {
    for (const newData of newDataList) {
        if (newData._id) {
          // Update existing document based on _id
          const query = { _id: newData._id };
          if(newData.task!==""){
          await TodoModel.updateOne(query, { task: newData.task });
          }
          else{
            await TodoModel.deleteOne(query)
          }
        } else {
          // Insert new document
          const newTask = new TodoModel({ task: newData.task });
          await newTask.save();
        }
      }
//   const newTask = new TodoModel({ task: req.body.task });

    // Save the task to the "test" collection in the database
    // const savedTask = await newTask.save();

  res.json(user);
}
catch (err) {
    console.log(err);
}
});

// PUT route
app.put('/api/update',async (req, res) => {
  // Handle the PUT request here
//   const userId = req.params.id;
try{


//   const newData = req.body;
  const updateddata=[]

  for(const taskData in req.body) {
    const newData = taskData;
    const filter = { task: newData.task }; // Specify the criteria to find the document
    const update = { ...newData };
    const options = { upsert: true, new: true };
    const updatedTask = await TodoModel.updateOne(filter, update, options);

//   const updatedTasks = await TodoModel.updateMany({}, { ...newData }, { new: true });

  if (!updatedTask) {
    return res.status(404).json({ error: 'No tasks found to update' });
  }
  updateddata.push(updatedTask);
  }

//   res.json(updatedTasks);
  res.json({ message: `Updated user ` });
}
catch(err){
    console.log(err)
}
});


app.listen(port, async() => {
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
  console.log(`Server is listening at http://localhost:${port}`);
});

module.exports = app;



// id
// 64f9e079ed1afcc438b24e2a
// task
// "day1"
// __v
// 0





// _id
// 64f9e093ed1afcc438b24e2c
// task
// "day2"
// __v
// 0