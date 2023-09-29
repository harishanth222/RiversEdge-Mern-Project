import React from "react";
import logo from '../img/logo.png'


export default function Navigation() {
    //get user name from currentUser
    const userString = localStorage.getItem('currentUser');
    const user = userString ? JSON.parse(userString) : {}; // Check if userString is not null
    // Ensure user.isAdmin is a boolean
    const isAdmin = user.isAdmin || false

    function logout() {
        // Remove user from local storage 
        localStorage.removeItem('currentUser');
        // Redirect to login page
        window.location.href = '/login';
    }

    let content

    if (isAdmin) {
        content = <a class="dropdown-item" href="/admin">Admin access</a>
    }


    return (
        <div>

            <nav className="navbar navbar-expand-lg  ">
                <div className="container-fluid ">

                    <a className="navbar-brand " href="/" >
                        <img className="logo" src={logo} alt="" />
                        RIVER'S EDGE
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>


                    <div class="collapse navbar-collapse" id="navbarNav" >
                        <ul class="navbar-nav">

                            <li className="nav-item mr-4 ">
                                <a className="nav-link" href="/"><span className="navBarDown">Home</span></a>
                            </li>
                            <li className="nav-item mr-4 ">
                                <a className="nav-link" href="/"><span className="navBarDown">Rooms</span></a>
                            </li>
                            <li className="nav-item mr-4 ">
                                <a className="nav-link" href="/packages"><span className="navBarDown">Packages</span></a>
                            </li>
                            <li className="nav-item mr-4 ">
                                <a className="nav-link" href="#"><span className="navBarDown">Events</span></a>
                            </li>
                            <li className="nav-item mr-4 ">
                                <a className="nav-link" href="/payment"><span className="navBarDown">Payment</span></a>
                            </li>
                            <li className="nav-item mr-4 ">
                                <a className="nav-link" href="#"><span className="navBarDown">Services</span></a>
                            </li>

                            {/*if user is logged display user name exept register and login buttons*/}
                            {user ? (<>
                                <div class="dropdown mr-5">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-user"></i> {user.name}
                                    </button>
                                    <div class="dropdown-menu " aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="/profile">Profile</a>
                                        {content}
                                        <a class="dropdown-item" href="#" onClick={logout}>Logout</a>
                                    </div>
                                </div>

                            </>) :

                                (<>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/register">
                                            Register
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/login">
                                            Login
                                        </a>
                                    </li>
                                </>)}

                        </ul>
                    </div>
                </div>
            </nav>

            <nav class="navbar navbar-expand-lg navbar-light bg-light">

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav" style={{ marginRight: '150px' }}>
                    <ul class="navbar-nav">

                    </ul>
                </div>
            </nav>

        </div>
    );
}


