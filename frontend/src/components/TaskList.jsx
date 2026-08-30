import { useEffect, useState } from "react";



function TaskList() {
    
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);



  async function updateStatus(id, status) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tasks/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    );

    const updatedTask = await response.json();

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? updatedTask : task
      )
    );
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div>
      <h2>Tasks</h2>
      

      {tasks.map((task) => (
        
        <div key={task._id}>
            
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Assigned to: {task.assignedTo?.name}</p>
          <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>

            <select
            value={task.status}
            onChange={(e) => updateStatus(task._id, e.target.value)}
            >
          <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
         </select>
          
        </div>
      ))}
    </div>
  );
}

export default TaskList;