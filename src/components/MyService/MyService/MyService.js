import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import ServiceList from '../../ServiceList/ServiceList/ServiceList';

const MyService = () => {
    const { user } = useContext(AuthContext);
    const [myservice, setMyservice] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyservice(data);
                // console.log(data, "from email")
            })
    }, [user?.email]);

    const handleDelete = (_id) => {
        const agree = window.confirm(`You want to delete ${_id}`);
        if (agree) {
            fetch(`http://localhost:5000/orders/${_id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Your service deleted successfully');
                        const remaining = myservice.filter(ser => ser._id !== _id);
                        setMyservice(remaining)
                    }
                })
        }
        // console.log(agree)
    }

    return (
        <div className='my-24'>
            <h2 className="text-5xl mb-6">You have {myservice?.length} orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <tbody>

                        {
                            myservice.map(service => <ServiceList
                                key={service._id}
                                service={service}
                                handleDelete={handleDelete}
                            ></ServiceList>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyService;