import TaskList from "./TaskList";

function EmployeeDashboard() {
  return (
    <div>
      <h1>Employee Dashboard</h1>

      <TaskList role= "employee" />
    </div>
  );
}

export default EmployeeDashboard;