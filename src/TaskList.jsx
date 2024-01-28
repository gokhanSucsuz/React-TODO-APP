/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useState } from "react"
import TaskListItem from "./TaskListItem"

export default function TaskList({tasks, removeItem, editItem, doneItem}){
    const [priority, setPriority] = useState(false)
    const [filteredTasks, setFilteredTasks] = useState(tasks)
    
        function handleFilterTask(){
            const newPriority = !priority
            newPriority ? setFilteredTasks(tasks.filter(item => item.priority === newPriority)) : setFilteredTasks(tasks)
            setPriority(newPriority)
            //setPriority(prev=> !prev)
        }
        useEffect(()=>{
            setFilteredTasks(tasks)
        }, [tasks])
        // useEffect(()=>{
        //     priority ? setFilteredTasks(tasks.filter(item => item.priority === priority)) : setFilteredTasks(tasks)
        // }, [priority])

if(tasks.length === 0) 
    return (
         <>
         </>
        )
    return (
        <>
        <div className="col-sm-7 border rounded-3 shadow-lg py-3 my-3 bg-white mx-auto">
        <div className="row mb-3">
            <ul className="list-group">
            <h3 className=" fw-bolder p-2 text-success rounded-4 my-2 mx-3">
                TASK LIST
                <button className={`btn ${!priority ? "btn-danger": "btn-success"} btn-sm float-end  bg-gradient`} onClick={handleFilterTask}>{!priority ? "Get Priority" : "Get All"}</button>
            </h3>
            {filteredTasks.map((task) => 
            
                <TaskListItem key={task.uuid} task={task} removeItem={removeItem} editItem={editItem} doneItem={doneItem}/>
                )}
          </ul>
          
        </div>
    </div>
        </>
    )
}