import { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";

import { getProfile } from "../../services/profileService";

import { useAuth } from "../../context/useAuth";

import "./Profile.css";

function Profile() {

    // ==============================
    // State Variables
    // ==============================

    const [user, setUser] = useState({

        name: "",

        email: "",

    });

    const [loading, setLoading] = useState(true);

    const { logout } = useAuth();

    // ==============================
    // Load Profile
    // ==============================

    useEffect(() => {

        async function fetchProfile() {

            try {

                const data = await getProfile();

                setUser(data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        }

        fetchProfile();

    }, []);

    // ==============================
    // Handle Logout
    // ==============================

    function handleLogout() {

        logout();

        window.location.href = "/";

    }

    if (loading) {

        return (

            <Layout>

                <h2>Loading Profile...</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <h1>

                My Profile

            </h1>

            <p className="profile-subtitle">

                Manage your account

            </p>

            <div className="profile-card">

                <div className="profile-item">

                    <h3>

                        Name

                    </h3>

                    <p>

                        {user.name}

                    </p>

                </div>

                <div className="profile-item">

                    <h3>

                        Email

                    </h3>

                    <p>

                        {user.email}

                    </p>

                </div>

                <button

                    className="logout-btn"

                    onClick={handleLogout}

                >

                    Logout

                </button>

            </div>

        </Layout>

    );

}

export default Profile;