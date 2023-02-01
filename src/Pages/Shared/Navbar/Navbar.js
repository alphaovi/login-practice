import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import "./Navbar.css"

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);


    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(err => { console.log(err.message); })
    }
    return (
        <div>
            <Link className="link" to="/signup">Sign Up</Link>
            {
                user?.uid ?
                    <>
                        <Link className="link" to="/about">About</Link>
                        <button onClick={handleSignOut} className="link">Sign out</button>
                    </>
                    :
                    <Link className="link" to="/login">Login</Link>
            }

        </div>
    );
};

export default Navbar;