import { useState } from "react";
import Task from "./Task";
import TaskBox from "./TaskBox";

export default function Todos(){
    var [items , setItem] =useState([
        {
            title : "go to school at 9:00 AM",
            statu : true
        }
        ,
        {
            title : "go to the gym at 7:00 PM",
            statu : false
        }
    
    ])

    var [inputValue , setInputValue] = useState("")
    
    const clickHandler = (event) => {
        if(event.key == 'Enter'){
            setItem([
                ...items,
                {
                    title : inputValue,
                    statu : true
                }
            ])
            setInputValue('')
        }

    }

    return(
        <div>
                <div className="flex items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
            </div>
            <div className="relative">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={clickHandler} placeholder="What needs to be done today?"
                className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
            </div>
            <TaskBox>
              {items.map((item , index) =>
              (<Task title = {item?.title} statu = {item.statu} key = {index} />))}
            </TaskBox>
            
        </div>
    </div>
        </div>


    )

}