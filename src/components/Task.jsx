import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function Task(props){




    return(
        
            <li className="relative flex items-center justify-between px-2 py-6 border-b">
                <div>
                    <input type="checkbox"  checked = {props.statu} onChange={() => {props.togglestatu(props.id)}} className="" />
                    
                    <p className={`inline-block mt-1 ml-2 text-gray-600 ${props.statu ? "inline-block mt-1 ml-2 text-gray-600 line-through" : ""}`}>{props.title}</p>
                </div>
                <button type="button" className="absolute right-0 flex items-center space-x-1">
                <EditIcon onClick = {() => props.Edit(props.id)} />
                <DeleteIcon  onClick = {() => props.deleteTask(props.id)}/>
                </button>
            </li>
            
        


    )

}