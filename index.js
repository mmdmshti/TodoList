const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const taskFile = './task.json';

app.use(express.json());


app.get('api/v1/tasks', (req,res) =>{
    if (!fs.existsSync(taskFile)){
        fs.writeFileSync(taskFile, '[]');}
    const tasks = JSON.parse(fs.readFileSync(taskFile,'utf-8'))
    res.json(tasks);
});


app.post('api/v1/tasks/save',(req, res)=>{
    const tasks=req.body;
    JSON.stringify(taskFile, null, 2);
    res.json({ message:"task saved!"});
});

app.patch('/api/v1/tasks/:id',(req, res)=>{

 //edit

});

app.delete('api/v1/tasks/delete',(req,res)=>{
    
    //delete

});


app.listen(port, ()=>{
    console.log(`app is running on por ${port}...`);
});