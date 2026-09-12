import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manager Dashboard
        </h1>
        <p className="mt-1 text-gray-500">
          Manage your team's tasks and progress.
        </p>
      </header>

      <main className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Create New Task
          </h2>

          <TaskForm />
        </section>

        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Team Tasks
          </h2>

          <TaskList role="manager" />
        </section>
      </main>
    </div>
  );
}

export default ManagerDashboard;