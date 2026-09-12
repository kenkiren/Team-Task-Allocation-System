import TaskList from "./TaskList";

function EmployeeDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Employee Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          View and manage your assigned tasks.
        </p>
      </header>

      <main>
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            My Tasks
          </h2>

          <TaskList role="employee" />
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;