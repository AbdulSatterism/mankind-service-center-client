import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const [error, setError] = useState('')

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('')
            })
            .catch(err => {
                const errorMessage = err.message;
                setError(errorMessage)
            })
    }

    return (
        <form onSubmit={handleLogin} className="hero min-h-screen lg:flex-row bg-base-200">
            <div className="hero-content flex-col ">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' required placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' required placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>

                            {/* error message */}
                            <label className="label">
                                <a href="/" className="label-text-alt link link-hover text-orange-600">{error}</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                        <p>New user? <Link to='/signup' className='text-orange-600'>please sign up</Link> </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;