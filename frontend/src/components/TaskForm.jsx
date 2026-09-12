import { useEffect, useState } from "react";

function TaskForm() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium"
  });

  // Get employees for the dropdown
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data.filter((user) => user.role === "employee"));
      })
      .catch((err) => console.error(err));
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("Task created:", data);

      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        priority: "medium"
      });
    } catch (error) {
      console.error(error);
    }
  }
return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Task Title
      </label>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter task title"
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        required
      />
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Description
      </label>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Describe the task..."
        rows="4"
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Assign To
      </label>

      <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        required
      >
        <option value="">Select employee</option>

        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.name}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Priority
      </label>

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
    >
      Create Task
    </button>
  </form>
);
}

export default TaskForm;