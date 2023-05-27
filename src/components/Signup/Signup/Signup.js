import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState('')

    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('')
            })
            .catch((err) => {
                const errorMessage = err.message;
                setError(errorMessage)
            });
    }

    return (
        <form onSubmit={handleSignup} className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row ">
                <div className="card shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Signup now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' required placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" required placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" required placeholder="password" className="input input-bordered" />

                            {/* set error message */}
                            <label className="label">
                                <a href="/" className="label-text-alt link link-hover text-orange-600">
                                    {error}
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Signup</button>
                        </div>
                        <p>All ready have an account? <Link to='/login' className='text-orange-600'>please login</Link> </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Signup;