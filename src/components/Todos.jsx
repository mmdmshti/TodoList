import { useState } from "react";
import Task from "./Task";
import TaskBox from "./TaskBox";
import { v4 as uuidv4 } from 'uuid';

export default function Todos(){
    var [items , setItem] =useState([
        {
            title : "go to school at 9:00 AM",
            statu : true,
            id : uuidv4()
            
        
            
        }
        ,
        {
            title : "go to the gym at 7:00 PM",
            statu : false,
            id : uuidv4()
        }
    
    ])

      

    var [inputValue , setInputValue] = useState("")
    
    const clickHandler = (event) => {
        if(event.key == 'Enter' && inputValue != ""){
            setItem([
                ...items,
                {
                    title : inputValue,
                    statu : false,
                    id : uuidv4()
                }
            ])
            setInputValue('')
        }

    }

    const deleteitemsHandler = (id) => {
        let newItems = items.filter((item) => {
            return id != item.id

        })

        setItem(newItems)
    }

    const togglestatuhandler = (id) => {

        let newitems = items.map( (item) => {
            if(id == item.id){
                item.statu = ! item.statu
            }
            
            return item
        })

        setItem(newitems)
    }

    const EditorHandler = (id) => {
        console.log("Edit");
        let edetingItem = items.filter((item) => {
            return id == item.id
        })
        setInputValue(edetingItem)
        deleteitemsHandler(id)

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
              (<Task title = {item?.title} statu = {item.statu} key = {index} id = {item.id} deleteTask = {deleteitemsHandler} togglestatu = {togglestatuhandler} Edit = {EditorHandler} />))}
            </TaskBox>
            
        </div>
    </div>
        </div>


    )

}