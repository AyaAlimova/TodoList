import React, {useState} from 'react'

function ToDoList() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState("")
  const [editTaskId, setEditTaskId] = useState(null)
  //Handle input change
  function handleInputChange(event){
      setNewTask(event.target.value)
  }

  //Add a new task
  function addTask () {

      if(newTask.trim() !== ""){
        const newTaskObj = {
          id: Date.now(),
          task: newTask,
          completed:false
      };
      setTasks([newTaskObj, ...tasks]);
      setNewTask("");
    }
  }
// Delete a task
  function deleteTask (index){
    const updatedTask = tasks.filter((_, i) => i !== index);
    setTasks(updatedTask);
  }
// Handle a complete task
 const handleComplete = (id) => {
   setTasks(
    tasks.map((item) => {
    if (item.id === id){
        return { ...item, completed: !item.completed };
      } 
      return item;
 })
)
  }

  //Start editing task
  const startEditing = (id, task) =>{
    setEditTaskId(id);
    setEditTask(task)
  }
  //Handle editing input change
  const handleEditInputChange = (event) => {
    setEditTask(event.target.value)
  }
  //Save the edited task
  const saveTask = (id) => {
    setTasks(
      tasks.map(item => 
        item.id === id ? {...item, task: editTask} : item
      )
    );
    setEditTaskId(null)
    setEditTask('')
  }

  return (
    <div className='to-do-list'>
      <h1>Todo List</h1>

      <div>
        <input 
            type="text" 
            placeholder='Enter a task...'
            value={newTask}
            onChange={handleInputChange}/>

        <button
            className='add-btn'
            onClick={addTask}>
              Add
        </button>
      </div>

      <ol>
        {tasks.map((t, index) =>
          <li key = {t.id}>
            {editTaskId === t.id ? (
              <>
                <input type="text"
                        value={editTask}
                        onChange={handleEditInputChange} />
                <button onClick={() => saveTask(t.id)} className='save-btn'>Save</button>
              </>
            ):(
              <>
            <span className='text' style={{ textDecoration: t.completed ? 'line-through' : 'none'}} >
                {t.task}
             </span>
            <input 
            type='checkbox' 
            checked ={t.completed}
            onChange={() => handleComplete(t.id)}/>
        
            <button 
              className='edit-btn'
              onClick={() => startEditing(t.id, t.task)}>Edit
            </button>
            <button
              className='delete-btn'
              onClick={() => deleteTask(index)}
              disabled = {!t.completed}
              style={{backgroundColor: t.completed ? 'rgb(223, 70, 10)' : 'grey',
                      cursor: t.completed ? 'pointer' : 'not-allowed'
              }}>Delete
            </button>   
            </>
            )}
          </li>
        )}
      </ol>
    </div>
  )
}

export default ToDoList