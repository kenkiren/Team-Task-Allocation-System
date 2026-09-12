import { useEffect, useState } from "react";


function TaskList({role}) {
    
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(
      role==="manager" ? 
      "http://localhost:5000/api/tasks" 
      : "http://localhost:5000/api/tasks/my", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
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
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ status })
      }
    );

    const updatedTask = await response.json();
    console.log("Updated task:", updatedTask);

    setTasks((prevTasks) =>
  prevTasks.map((task) =>
    task._id === id
      ? { ...task, status: updatedTask.status }
      : task
  )
);
  } catch (error) {
    console.error(error);
  }
}
return (
  <div>
    <h2 className="mb-4 text-lg font-semibold text-gray-800">
      Tasks
    </h2>

    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {task.description || "No description provided"}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                task.priority === "high"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.priority}
            </span>
          </div>

          <div className="mb-4 text-sm text-gray-600">
            <p>
              <span className="font-medium">Assigned to:</span>{" "}
              {task.assignedTo?.name || "Unknown"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Status
            </span>

            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task._id, e.target.value)
              }
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default TaskList