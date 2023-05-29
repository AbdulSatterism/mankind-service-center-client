import React from 'react';

const ServiceList = ({ service, handleDelete }) => {
    const { img, serviceName, customerName, phone, _id } = service;


    return (
        <tr>

            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customerName}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {serviceName}
                <br />

            </td>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-ghost">Delete</button>
                <button className="btn btn-ghost">Update</button>
            </th>
        </tr>
    );
};

export default ServiceList;