import React from 'react';
import { useQuery } from 'react-query';
import ListCard from './ListCard';

const ShowToDo = () => {
    const { data: taskLists, isLoading, refetch } = useQuery(['available'], () =>
        fetch(`https://immense-caverns-91724.herokuapp.com/list`)
            .then(res => res.json())
    )
    if (isLoading) {
        return <p>Loading ...</p>
    }
    const handleTaskSubmit = e => {
        e.preventDefault();
        const taskName = e.target.name.value;
        const taskDescription = e.target.description.value;
        const newTask = {
            name: taskName,
            description: taskDescription
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
                console.log(data);
                if (data.success) {
                    refetch();
                    // toast(``);
                }
            })
    }


    return (
        <div className='container mx-auto text-center'>
            <h2 className="text-xl">Your task lists: </h2>
            <label for="addNewTask" class="btn modal-button">Add New</label>
            <form onSubmit={handleTaskSubmit} >
                <input type="checkbox" id="addNewTask" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <label for="addNewTask" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 class="font-bold text-lg">Add New Task</h3>
                        <div className='form-control w-full max-w-xs mx-auto'>
                            <label class="label">
                                <span class="label-text">Task Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Task Name" required className="input input-bordered w-full max-w-xs my-3" />
                        </div>
                        <div className='form-control w-full max-w-xs mx-auto'>
                            <label class="label">
                                <span class="label-text">Task Description</span>
                            </label>
                            <textarea name='description' class="textarea textarea-bordered w-full max-w-xs" placeholder="Task details"></textarea>
                        </div>
                        <div class="modal-action justify-center">
                            <input for="addNewTask" type="submit" value="Add Task" class="btn w-full max-w-xs" />
                            {/* <input type='submit' value='Add Task' for="addNewTask" class="btn w-full max-w-xs"></input> */}
                        </div>
                    </div>
                </div>
            </form>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    taskLists.map(taskList => <ListCard key={taskList._id} taskList={taskList} ></ListCard>)
                }
            </div>
        </div>
    );
};

export default ShowToDo;