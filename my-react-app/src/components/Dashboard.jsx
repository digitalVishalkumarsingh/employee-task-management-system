import StatCard from "./StatCard";

function Dashboard({ tasks = [] }) {
    const total = tasks.length;

    const pending = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgress = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    return (
        <div className="dashboard-page">

            <div className="page-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Employee task management overview
                    </p>
                </div>
            </div>

            <div className="stats-grid">

                <StatCard
                    title="Total Tasks"
                    value={total}
                    icon="▦"
                    color="#1f3a5f"
                />

                <StatCard
                    title="Pending"
                    value={pending}
                    icon="◷"
                    color="#c58a17"
                />

                <StatCard
                    title="In Progress"
                    value={inProgress}
                    icon="↻"
                    color="#2563eb"
                />

                <StatCard
                    title="Completed"
                    value={completed}
                    icon="✓"
                    color="#16835b"
                />

            </div>

        </div>
    );
}

export default Dashboard;
