/* eslint-disable react/prop-types */
export default function TaskList({tasks, removeItem, editItem}){
    if(tasks.length === 0) return <></>
    return (
        <>
        <div className="col-sm-7 border rounded-3 shadow-lg py-3 my-3 bg-white mx-auto">
        <div className="row mb-3">
          <ul className="list-group">
            <h3 className="mx-auto fw-bolder p-2 text-success rounded-4 my-2">TASK LIST</h3>
            {tasks.map((item,index) => 
            <li key={item.uuid} className="list-group-item mx-4">
                <span className="me-2">{index+1}-</span>
                {item.task}
                {item.priority && <span className="badge text-bg-danger mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightning-charge" viewBox="0 0 16 16">
  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41z"/>
</svg>
                    </span>}
                
                <div className="btn-group float-end" role="group">
                 <button className="btn btn-danger btn-sm" onClick={()=> removeItem(item.uuid)}>Remove</button>
                 <button className="btn btn-info btn-sm" onClick={()=> editItem(item.uuid)}>Edit</button>
                </div>
                </li>)}
          </ul>
        </div>
    </div>
        </>
    )
}