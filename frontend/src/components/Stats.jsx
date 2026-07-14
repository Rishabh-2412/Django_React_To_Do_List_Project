function Stats({ totalTasks, completedTasks, pendingTasks }) {

    return (
        <div className="row mb-4">
            <div className="col-12 col-md-4 mb-3">
                <div className="card stats-card total-card">
                    <div className="card-body">
                        <h1><i className="bi bi-list-task display-6"></i></h1>
                        <p className="text-muted mb-1">Total Tasks</p>
                        <h2 className="fw-bold">
                            {totalTasks}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-4 mb-3">
                <div className="card stats-card completed-card">
                    <div className="card-body">
                        <h1><i className="bi bi-check-circle-fill display-6 text-success"></i></h1>
                        <p className="text-muted mb-1">Completed</p>
                        <h2 className="fw-bold text-success">
                            {completedTasks}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-4 mb-3">
                <div className="card stats-card pending-card">
                    <div className="card-body">
                        <h1><i className="bi bi-hourglass-split display-6 text-warning"></i></h1>
                        <p className="text-muted mb-1">Pending</p>
                        <h2 className="fw-bold text-warning">
                            {pendingTasks}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;