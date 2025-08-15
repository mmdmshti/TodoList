//*** IMPORTS ***//
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const fs = require('fs');
//*** PORT***//
const port = 3000;
//*** CREATING AND READING tasks.json DATABASE FILE ***//
const taskFile = './tasks.json';
if (!fs.existsSync(taskFile)) fs.writeFileSync(taskFile, '[]');
let tasksList = JSON.parse(fs.readFileSync(taskFile, 'utf-8'));
//*** CONVERTING JSON TO JsOBJECT ***//
app.use(express.json());

//*** ROUTES ***//
app.get('/api/v1/tasks', (req,res) =>{
    const readedTasks = JSON.parse(fs.readFileSync(taskFile, 'utf-8'));
    res.json(readedTasks);
});

//***POST***//
app.post('/api/v1/tasks/save',(req, res)=>{
    const { title, status } = req.body;
    // ***Input Validation*** //
    if (!title || typeof title !== 'string') {
        return res.status(400).json({
            status: 'fail',
            message: 'Title is required and must be a string'
        });
    }
    if (status !== undefined && typeof status !== 'boolean') {
        return res.status(400).json({
            status: 'fail',
            message: 'Status must be a boolean'
        });
    }

    const newTask = {
        id: uuidv4(),
        title: title,
        status: status ?? false,
    };
    tasksList.push(newTask);
    fs.writeFileSync(taskFile,JSON.stringify(tasksList,null,2));
    res.status(201).json({
        status:"success",
        data:{task: newTask}
    });
    console.log(newTask.id);
});

//***PATCH***/
app.patch('/api/v1/tasks/:id',(req, res)=>{
    const taskId = req.params.id;
    const { title, status } = req.body;
    // ***Input Validation*** //
    if (title !== undefined && typeof title !== 'string') {
        return res.status(400).json({
            status: 'fail',
            message: 'Title must be a string'
        });
    }
    if (status !== undefined && typeof status !== 'boolean') {
        return res.status(400).json({
            status: 'fail',
            message: 'Status must be a boolean'
        });
    }

    const taskIndex = tasksList.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({
            status: 'fail',
            message: "Task not found."
        });
    }
    if (title !== undefined) tasksList[taskIndex].title = title;
    if (status !== undefined) tasksList[taskIndex].status = status;
    fs.writeFileSync(taskFile, JSON.stringify(tasksList, null, 2));
    res.json({ status: "success", data: { task: tasksList[taskIndex] } });
});

//***DELETE***
app.delete('/api/v1/tasks/:id',(req,res)=>{
    const taskId = req.params.id;
    const newTasksList = tasksList.filter(task => task.id !== taskId);
    if(newTasksList.length === tasksList.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Task not found!'
        });
    };
    tasksList = newTasksList;
    fs.writeFileSync(taskFile, JSON.stringify(tasksList, null, 2));
    res.json({
        status: 'success',
        message: 'Task deleted successfully',
    });
});

//*** PORT LISTEN ***//
app.listen(port, ()=>{
    console.log(`app is running on port ${port}...`);
});