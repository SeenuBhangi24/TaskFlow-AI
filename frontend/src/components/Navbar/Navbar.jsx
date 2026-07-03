import "./Navbar.css";

function Navbar() {

    return (

        <header className="navbar">

            {/* Left Section */}

            <div>

                <h2>Dashboard</h2>

                <p>Manage your work efficiently.</p>

            </div>

            {/* Right Section */}

            <div className="user-info">

                <span>👋 Welcome</span>

            </div>

        </header>

    );

}

export default Navbar;