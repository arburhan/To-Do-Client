import React from 'react';
import { toast } from 'react-toastify';

const ListCard = ({ taskList, refetch }) => {
    const { _id, name, description } = taskList;
    const deleteItem = id => {
        const procced = window.confirm('Are you sure delete this item? ');
        console.log(id)
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
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Complete</button>
                    <button onClick={() => { deleteItem(_id) }} className="btn bg-red-600">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ListCard;