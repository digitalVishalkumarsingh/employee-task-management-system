function ConfirmDialog({
    isOpen,
    title = "Delete Task?",
    message = "Are you sure you want to delete this task?",
    confirmText = "Delete Task",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="confirm-overlay"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onCancel();
                }
            }}
        >

            <div
                className="confirm-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
            >

                <div className="confirm-icon">
                    !
                </div>

                <div className="confirm-content">

                    <h3 id="confirm-title">
                        {title}
                    </h3>

                    <p>
                        {message}
                    </p>

                </div>

                <div className="confirm-actions">

                    <button
                        className="secondary-button"
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="danger-button"
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading
                            ? "Deleting..."
                            : confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmDialog;
