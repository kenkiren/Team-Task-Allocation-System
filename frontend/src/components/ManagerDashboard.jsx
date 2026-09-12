import TaskForm from "./TaskForm";
import TaskList from "/src/components/TaskList";
function ManagerDashboard() {
  return (
    <div>
      <h1>Manager Dashboard</h1>

      <TaskForm />
      <TaskList />
    </div>
  );
}

export default ManagerDashboard;