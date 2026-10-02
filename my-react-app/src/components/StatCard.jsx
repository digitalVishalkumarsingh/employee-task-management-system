function StatCard({
    title,
    value,
    icon,
    color,
}) {
    return (
        <div className="stat-card">

            <div>
                <p className="stat-title">
                    {title}
                </p>

                <h2 className="stat-value">
                    {value}
                </h2>
            </div>

            <div
                className="stat-icon"
                style={{
                    color: color,
                    backgroundColor: `${color}15`,
                }}
            >
                {icon}
            </div>

        </div>
    );
}

export default StatCard;
