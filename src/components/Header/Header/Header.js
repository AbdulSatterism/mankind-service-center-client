import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Assets/Logo/logo.png'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const Header = () => {
    const { user, logOutUser } = useContext(AuthContext);


    const handleLogOut = () => {
        logOutUser()
            .then(() => { })
            .catch(() => { })
    }

    const navItems = <>
        <li className='font-semibold '><Link to='/'>Home</Link></li>
        <li className='font-semibold '><Link to='/'>Events</Link></li>
        <li className='font-semibold '><Link to='/'>Blog</Link></li>
        <li className='font-semibold '><Link to='/'>About</Link></li>
        {
            user?.uid ?
                <>
                    <li onClick={handleLogOut} className='font-semibold '><Link >Logout</Link></li>
                </>
                :
                <>
                    <li className='font-semibold '><Link to='/login'>Login</Link></li>
                    <li className='font-semibold '><Link to='/signup'>Signup</Link></li>
                </>
        }
    </>


    return (
        <div>
            <div data-theme="light" className="navbar h-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Link to='/'>
                        <img src={logo} className='w-32 h-16 rounded' alt="" />
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end ">
                    <Link to='/user' className='font-bold mr-2'>{user?.displayName}</Link>
                    <Link to='/admin' className='btn'>Admin</Link>

                </div>
            </div>
        </div>
    );
};

export default Header;