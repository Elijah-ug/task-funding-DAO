import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="flex items-center justify-end gap-50 mr-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="task-form">Add Tasks</NavLink>
            <NavLink to="task-list">Tasks</NavLink>
        </div>
    );
}

export default Nav;
