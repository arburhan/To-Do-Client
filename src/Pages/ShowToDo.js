import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import ListCard from './ListCard';

const ShowToDo = () => {
    const [user] = useAuthState(auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { data: taskLists, isLoading, refetch } = useQuery(['available'], () =>
        fetch(`https://immense-caverns-91724.herokuapp.com/list/${user.email}`)
            .then(res => res.json())
    )
    if (isLoading) {
        return <p>Loading ...</p>
    }
    const onSubmit = data => {
        const newTask = {
            email: user.email,
            name: data.taskName,
            description: data.description
        }
        fetch(`https://immense-caverns-91724.herokuapp.com/list`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(res => res.json())
            .then(data => {
                // close modal
                reset();
                if (data.success) {
                    refetch();
                    toast.success(`task added successfully`);
                }
            })

    };




    return (
        <div className='container mx-auto text-center p-2'>
            <label htmlFor="addNewTask" className="btn modal-button">Add New</label>
            <p className="text-xl py-4">{taskLists.length === 0 ? `Add a task to see here \n Your task is secure` : `Your total task: ${taskLists.length}`}</p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="checkbox" id="addNewTask" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <label htmlFor="addNewTask" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg">Add New Task</h3>
                        <div className='form-control w-full max-w-xs mx-auto'>
                            <label className="label">
                                <span className="label-text">Task Name</span>
                            </label>
                            <input type="text" placeholder="Task Name" className="input input-bordered w-full max-w-xs my-3"  {...register("taskName", {
                                required: {
                                    value: true,
                                    message: 'Task Name is Required'
                                },
                            })} />
                            <label className="label">
                                {errors.taskName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.taskName.message}</span>}
                            </label>
                        </div>
                        <div className='form-control w-full max-w-xs mx-auto'>
                            <label className="label">
                                <span className="label-text">Task Description</span>
                            </label>
                            <textarea className="textarea textarea-bordered w-full max-w-xs" placeholder="Task details" {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is Required'
                                },
                            })}></textarea>
                            <label className="label">
                                {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                            </label>
                        </div>
                        <div className="modal-action justify-center">
                            <input htmlFor="addNewTask" type="submit" value="Add Task" className="btn w-full max-w-xs" />
                        </div>
                    </div>
                </div>
            </form>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    taskLists.map(taskList => <ListCard refetch={refetch} key={taskList._id} taskList={taskList} ></ListCard>)
                }
            </div>
        </div>
    );
};

export default ShowToDo;