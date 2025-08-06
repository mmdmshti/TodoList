import { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function Task(props){
    var [editMode , setEditMode] = useState(false)

    const editHandler = (event) => {
        if(event.key == 'Enter'){
            props.Edit(props.id,event.target.value)
            setEditMode(false)
            props.State(false)
        }
        
    }




    return(
        
    <li className="relative flex items-center justify-between px-2 py-6 border-b">

             {
                editMode 
                ?
                <div className="w-full flex items-center">
                <input className="w-full" type="text" defaultValue={props.title} onChange={()=>{} } onKeyDown={editHandler}/>
                <DeleteIcon  onClick = {() => {setEditMode(false)
                    props.State(false)
                }}/>
            
                </div>
                :
                <div className="flex items-center">
                <div>
                <input type="checkbox"  checked = {props.statu} onChange={() => {props.togglestatu(props.id)}} className="" />
                
                <p className={`inline-block mt-1 ml-2 text-gray-600 ${props.statu ? "inline-block mt-1 ml-2 text-gray-600 line-through" : ""}`}>{props.title}</p>
                </div>
                <button type="button" className="absolute right-0 flex items-center space-x-1">
                <EditIcon  onClick = {() => {setEditMode(true)
                    props.State(true)
                }} />
                <DeleteIcon  onClick = {() => props.deleteTask(props.id)}/>
                </button>
                </div>

            }
            
    </li>
        
    )

}