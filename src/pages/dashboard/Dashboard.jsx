import './Dashboard.css';

function Dashboard() {

    // Later kun je deze data uit context, props of backend halen
    const name = "Wesley";
    const username = "wesley123";

    return (
        <div className="dashboard-container">
            <h2>Welkom terug, {name}!</h2>
            <p className="username">Ingelogd als: {username}</p>
        </div>
    );
}

export default Dashboard;