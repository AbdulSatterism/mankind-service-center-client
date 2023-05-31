import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { signInUser, setLoading } = useContext(AuthContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                const currentUser = { email: user?.email };
                form.reset();
                setError('');

                //jwt get 
                fetch(`https://mankind-service-center-server.onrender.com/jwt`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data)
                        //local storage is the not best place for jwt
                        localStorage.setItem('msc-token', data.token);

                        if (user.emailVerified) {
                            navigate(from, { replace: true });
                        }
                        else {
                            alert("your email not verify yet!!! please verify your email")
                        }
                    })

            })
            .catch(err => {
                const errorMessage = err.message;
                setError(errorMessage)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <form onSubmit={handleLogin} className="min-h-screen hero lg:flex-row bg-base-200">
            <div className="flex-col hero-content ">
                <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
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
                                <a href="/" className="text-orange-600 label-text-alt link link-hover">{error}</a>
                            </label>
                        </div>
                        <div className="mt-6 form-control">
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