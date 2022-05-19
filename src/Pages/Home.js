import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import AddToDo from './AddToDo';
import ShowToDo from './ShowToDo';

const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
    }
    return (
        <div>
            <div className='flex justify-center items-center'>
                <h2 className='text-3xl py-4'>Welcome to Todo App</h2>
                {
                    user && <button onClick={handleSignOut} className='btn mx-5'>Sign Out</button>
                }
            </div>
            <ShowToDo></ShowToDo>
            <AddToDo></AddToDo>
        </div>
    );
};

export default Home;