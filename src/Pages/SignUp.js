import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const SignUp = () => {
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const handleSignUp = e => {
        e.preventDefault();
        const userEmail = e.target.email.value;
        const userPass = e.target.password.value;
        createUserWithEmailAndPassword(userEmail, userPass);
        console.log(userEmail, userPass);
    };
    if (user || googleUser) {
        navigate('/home');
    }
    let errorMessage;
    if (error || googleError) {
        errorMessage = <p className='text-red-600 p-3'>Error: {error?.message || googleError?.message}</p>
    }
    const redirectLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <div className='w-full max-w-lg mx-auto shadow-2xl bg-base-100 p-12 my-10 rounded-xl'>
                <h2 className='text-3xl'>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name='name' type="name" placeholder="name" className="input input-bordered" />
                    </div>
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
                    </div>
                    {errorMessage}
                    {
                        loading ? <button className='btn loading w-[300px] my-5'>Loading</button> : <input className='btn btn-active w-[300px] my-5' type="submit" value="Sign UP" />
                    }
                </form>
                <div>
                    <p>Already have na account ? <button onClick={redirectLogin} className='text-accent'>Please log in</button> </p>
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

        </div>
    );
};

export default SignUp;