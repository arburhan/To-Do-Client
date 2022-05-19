import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const Login = () => {
    const navigate = useNavigate();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password);
    }
    if (user || googleUser) {
        navigate('/home');
    }
    let errorMessage;
    if (error || googleError) {
        errorMessage = <p className='text-red-600 p-3'>Error: {error?.message || googleError?.message}</p>
    }
    const redirectSignup = () => {
        navigate('/signup');
    }

    return (
        <div className='w-full max-w-lg mx-auto shadow-2xl bg-base-100 p-12 my-10 rounded-xl'>
            <h2 className='text-3xl'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name='email' type="email" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input name='password' type="password" placeholder="password" className="input input-bordered" />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                {errorMessage}
                {
                    loading ? <button className='btn loading w-[300px] my-5'>Loading</button> : <input className='btn btn-active w-[300px] my-5' type="submit" value="Log in" />
                }
            </form>
            <div>
                <p>New on todo? <button onClick={redirectSignup} className='text-accent'>Please Sign up</button> </p>
            </div>
            <div className="divider">OR</div>
            <div>
                {
                    googleLoading ? <button className="btn loading w-full max-w-xs text-white">loading</button> : <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline">Continue with google</button>

                }
            </div>
        </div>
    );
};

export default Login;