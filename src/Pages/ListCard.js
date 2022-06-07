import React from 'react';
import { toast } from 'react-toastify';

const ListCard = ({ taskList, refetch }) => {
    const { _id, name, description, complete } = taskList;
    const completeTask = _id => {
        console.log(_id)
        const complete = {
            complete: true
        }
        fetch(`https://immense-caverns-91724.herokuapp.com/list/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(complete)
        })
            .then(res => res.json())
            .then(result => {
                refetch();
                toast.success('congratulations! you have completed')
            })

    }
    const deleteItem = id => {
        const procced = window.confirm('Are you sure delete this item? ');
        if (procced) {
            const url = `https://immense-caverns-91724.herokuapp.com/list/${id}`;
            toast.success('Item Delete Successfully.')
            fetch(url, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                })
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title"> {complete === true ? <strike> {name} </strike> : `${name}`} </h2>
                <p>{complete === true ? <strike> {description} </strike> : `${description}`}</p>
                <div className="card-actions">
                    <button disabled={complete === true} onClick={() => { completeTask(_id) }} id='complete' className="btn btn-primary">Complete</button>
                    <button onClick={() => { deleteItem(_id) }} className="btn bg-red-600">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ListCard;