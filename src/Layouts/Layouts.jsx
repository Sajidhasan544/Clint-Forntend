import React from 'react';
import Navbar from '../Pages/Sheared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Sheared/Footer';

const Layouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layouts;