import React from 'react';
import { Link } from 'react-router-dom';

const Services = ({ service }) => {
    const { name, _id, img } = service;

    return (
        <div className="card w-96 glass">
            <figure>
                <img className='w-96 h-64' src={img} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}</h2>
                <div className="card-actions justify-center">
                    <Link to={`/checkout/${_id}`}>
                        <button className="btn btn-ghost bg-slate-600">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;