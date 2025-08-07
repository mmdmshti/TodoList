import React, { useState, useEffect } from "react";
import Task from "./Task";
import TaskBox from "./TaskBox";
// import { v4 as uuidv4 } from 'uuid';
import { addTodo } from "../api";
import { deleteTodo } from "../api";
import { updateTodo } from "../api";
import { getTodos} from "../api";



  




export default function Todos(){
    useEffect(() => {
        getTodos()
          .then(res => setItem(res.data))
          .catch(console.error);
      }, []);

      
    var [items , setItem] =useState([])

    var [state , setState] = useState(false)

    var [inputValue , setInputValue] = useState("")



    
    // const clickHandler = (event) => {
        
    //     if(event.key == 'Enter' && inputValue != ""){
    //         setItem([
    //             ...items,
    //             {
    //                 title : inputValue,
    //                 statu : false,
    //                 id : uuidv4()
    //             }
    //         ])
    //         setInputValue('')
    //     }

    // }
    const clickHandler = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            const newTodo = { title: inputValue, statu: false };
            addTodo(newTodo)
              .then(res => {
                  setItem([...items, res.data]);
                  setInputValue("");
              })
              .catch(err => console.error(err));
        }
    };

    // const deleteitemsHandler = (id) => {
    //     let newItems = items.filter((item) => {
    //         return id != item.id

    //     })

    //     setItem(newItems)
    // }
    const deleteitemsHandler = (id) => {
        deleteTodo(id)
          .then(() => {
            // وقتی حذف توی بک‌اند موفق بود، حذف رو تو استیت انجام بده
            setItem(items.filter(item => item.id !== id));
          })
          .catch(err => {
            console.error("Failed to delete:", err);
          });
      };

      const togglestatuhandler = (id) => {
        const todo = items.find(i => i.id === id);
        updateTodo(id, { statu: !todo.statu })
          .then(res => {
            setItem(items.map(item =>
              item.id === id ? res.data : item
            ));
          })
          .catch(console.error);
      };
    // const togglestatuhandler = (id) => {

    //     let newitems = items.map( (item) => {
    //         if(id == item.id){
    //             item.statu = ! item.statu
    //         }
            
    //         return item
    //     })

    //     setItem(newitems)
    // }
    // const EditorHandler = (id , newvalue) => {
    //     let newitems = items.map( (item) => {
    //         if(id == item.id){
    //             item.title = newvalue
    //         }
            
    //         return item
    //     })

    //     setItem(newitems)

    // }
    const EditorHandler = (id, newTitle) => {
        // Return promise so Task can await
        return updateTodo(id, { title: newTitle })
          .then(res => {
            setItem(items.map(item =>
              item.id === id ? { ...item, title: res.data.title } : item
            ));
          });
      };

    const ChangeState = (bool) => {
        setState(bool)
    }
    
    return(
        <div>
                <div className="flex items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600"> {state ? "EDITING..."  : "TO DO APP"}</h1>
            </div>
            <div className="relative">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={clickHandler} placeholder="What needs to be done today?"
                className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
            </div>
            <TaskBox>
              {items.map((item , index) =>
              (<Task title = {item?.title} statu = {item.statu} key = {index} id = {item.id} deleteTask = {deleteitemsHandler} togglestatu = {togglestatuhandler} Edit = {EditorHandler} State = {ChangeState}/>))}
            </TaskBox>
            
        </div>
    </div>
        </div>


    )

}