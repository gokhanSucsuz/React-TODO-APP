/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";

export default function TaskForm() {
  const emptyForm = {
    task: "",
    priority: false,
    isDone: false
  };
  const [formData, setFormData] = useState(emptyForm);
  const [tasks, setTasks] = useState([]);
  const [taskChangeCount, setTaskChangeCount] = useState(0)

  useEffect(()=>{
    const localStorageTasks = JSON.parse(localStorage.getItem("tasks"))
    setTasks(localStorageTasks ?? [])
  }, [])

  useEffect(()=>{
    if(taskChangeCount > 0)
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [taskChangeCount])

  const handleInputChange = (event) => {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      };
    });
  };
  const removeItem = (uuid) => {
    setTasks((prev) => prev.filter((item) => item.uuid !== uuid));
        setFormData(emptyForm);
        setTaskChangeCount(prev => prev + 1)    
  };
  const editItem = (uuid) => {
    const editedItem = tasks.find((item) => item.uuid === uuid);
    setFormData({ ...editedItem, isEdited: true });
    setTaskChangeCount(prev => prev + 1)
  };
  const doneItem = (uuid) => {
    const itemIndex = tasks.findIndex((item) => item.uuid === uuid);
      const task = tasks[itemIndex]
      task.isDone = !task.isDone
      const newTasks = tasks.slice();
      newTasks[itemIndex] = task
      setTasks(newTasks);
      setTaskChangeCount(prev => prev + 1)
  };
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formData.isEdited) {
      const itemIndex = tasks.findIndex((item) => item.uuid === formData.uuid);
      const newTasks = tasks.slice();
      newTasks[itemIndex] = { ...formData };
      setTasks(newTasks);
    } else if (formData.task.length > 3) {
      formData.uuid = uuidv4();
      setTasks((prev) => [formData, ...prev]);
    }
    setFormData(emptyForm);
    event.target.reset();
    setTaskChangeCount(prev => prev + 1)
  }
  return (
    <>
      <div className="col-sm-7 border rounded-3 shadow-lg py-3 my-3 mx-3  bg-white mx-auto">
        <h1 className="d-flex justify-content-center py-3 fw-bolder shadow-lg rounded-3 my-3 text-dark-emphasis">React TODO APP</h1>
        <form className="border border-3 p-3 rounded-3 shadow-sm" onSubmit={handleFormSubmit}>
          <div className="row mb-3">
            <label htmlFor="task" className="col-sm-2 col-form-label">
              Task
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="task"
                name="task"
                onChange={handleInputChange}
                value={formData.task}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="priority"
                  name="priority"
                  onChange={handleInputChange}
                  checked={formData.priority}
                />
                <label className="form-check-label" htmlFor="priority">
                  Priority
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Add Task
          </button>
        </form>
      </div>
      
        <TaskList tasks={tasks} removeItem={removeItem} editItem={editItem} doneItem={doneItem} />

    </>
  );
}
