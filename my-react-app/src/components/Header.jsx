function Header({ activePage, onMenuClick }) {
    return (
        <header className="topbar">

            <div className="topbar-left">

                <button
                    className="mobile-menu-button"
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                >
                    ☰
                </button>

                <div className="breadcrumb">
                    <span>TaskFlow</span>

                    <span className="breadcrumb-separator">
                        /
                    </span>

                    <strong>
                        {activePage === "dashboard"
                            ? "Dashboard"
                            : "Tasks"}
                    </strong>
                </div>

            </div>

            <div className="topbar-right">

                <div className="connection-status">
                    <span className="connection-dot"></span>
                    System Online
                </div>

                <button
                    className="notification-button"
                    type="button"
                    aria-label="Notifications"
                >
                    ♢
                </button>

                <div className="header-avatar">
                    A
                </div>

            </div>

        </header>
    );
}

export default Header;
