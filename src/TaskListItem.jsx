import TaskListItemSvg from "./TaskListItemSvg";

/* eslint-disable react/prop-types */
export default function TaskListItem({task, removeItem, editItem, doneItem}){

    return (
        <>
            <li className={`list-group-item mx-2 ${task.isDone && "bg-success"}`}>
                {task.priority && <span className="badge text-bg-danger mx-2">
                <TaskListItemSvg />
                </span>}
                {task.task}  
                <div className="btn-group float-end" role="group">
                 <button className="btn btn-success bg-gradient btn-sm" onClick={()=> doneItem(task.uuid)}>Done</button>
                 <button className="btn btn-danger bg-gradient btn-sm" onClick={()=> removeItem(task.uuid)}>Remove</button>
                 <button className="btn btn-info bg-gradient btn-sm" onClick={()=> editItem(task.uuid)}>Edit</button>
                </div>
            </li>
        </>
    )
}