import React from 'react';

const Services = ({ service }) => {
    const { name, id, img } = service;
    return (
        <div className="card w-96 glass">
            <figure>
                <img src={img} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}</h2>
                <div className="card-actions justify-center">
                    <button className="btn btn-ghost bg-slate-600">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default Services;