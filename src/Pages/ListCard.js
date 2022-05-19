import React from 'react';

const ListCard = ({ taskList }) => {
    const { name, description } = taskList;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ListCard;