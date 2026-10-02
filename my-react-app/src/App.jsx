import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";

import "./App.css";

function App() {
    const [activePage, setActivePage] =
        useState("dashboard");

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <div className="app">

            <Sidebar
                activePage={activePage}
                onPageChange={setActivePage}
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <main className="main">

                <Header
                    activePage={activePage}
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                {activePage === "dashboard" ? (
                    <DashboardPage />
                ) : (
                    <TasksPage />
                )}

            </main>

        </div>
    );
}

export default App;
