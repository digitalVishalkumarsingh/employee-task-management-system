import Dashboard from "../components/Dashboard";
import useTasks from "../hooks/useTasks";

function DashboardPage() {
    const {
        tasks,
        loading,
        error,
    } = useTasks();

    if (loading) {
        return (
            <div className="page-loading">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-error">
                {error}
            </div>
        );
    }

    return (
        <Dashboard tasks={tasks} />
    );
}

export default DashboardPage;
