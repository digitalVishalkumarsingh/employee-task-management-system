function Sidebar({
    activePage,
    onPageChange,
    isOpen,
    onClose
}) {
    function handleNavigation(page) {
        onPageChange(page);

        if (onClose) {
            onClose();
        }
    }

    return (
        <>
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                ></div>
            )}

            <aside
                className={`sidebar ${
                    isOpen
                        ? "sidebar-open"
                        : ""
                }`}
            >

                <div className="brand">

                    <div className="brand-mark">
                        T
                    </div>

                    <div className="brand-content">

                        <h1>
                            TaskFlow
                        </h1>

                        <span>
                            Employee Management
                        </span>

                    </div>

                    <button
                        className="sidebar-close"
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        ×
                    </button>

                </div>

                <nav className="sidebar-nav">

                    <p className="nav-label">
                        MAIN MENU
                    </p>

                    <button
                        type="button"
                        className={
                            activePage === "dashboard"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            handleNavigation(
                                "dashboard"
                            )
                        }
                    >
                        <span className="nav-icon">
                            ▦
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </button>

                    <button
                        type="button"
                        className={
                            activePage === "tasks"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            handleNavigation(
                                "tasks"
                            )
                        }
                    >
                        <span className="nav-icon">
                            ✓
                        </span>

                        <span>
                            Tasks
                        </span>
                    </button>

                    <p className="nav-label nav-label-space">
                        MANAGEMENT
                    </p>

                    <button
                        type="button"
                        className="nav-item"
                    >
                        <span className="nav-icon">
                            ♙
                        </span>

                        <span>
                            Employees
                        </span>

                        <span className="coming-soon">
                            Soon
                        </span>
                    </button>

                    <button
                        type="button"
                        className="nav-item"
                    >
                        <span className="nav-icon">
                            ⚙
                        </span>

                        <span>
                            Settings
                        </span>
                    </button>

                </nav>

                <div className="sidebar-footer">

                    <div className="user-avatar">
                        A
                    </div>

                    <div className="user-info">

                        <strong>
                            Admin User
                        </strong>

                        <span>
                            Administrator
                        </span>

                    </div>

                    <button
                        className="logout-button"
                        type="button"
                        title="Logout"
                    >
                        ↪
                    </button>

                </div>

            </aside>
        </>
    );
}

export default Sidebar;
