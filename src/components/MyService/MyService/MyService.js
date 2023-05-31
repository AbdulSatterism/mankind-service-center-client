import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import ServiceList from '../../ServiceList/ServiceList/ServiceList';

const MyService = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [myservice, setMyservice] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('msc-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOutUser()
                }
                return res.json()
            })
            .then(data => {
                // console.log(data, "from email")
                setMyservice(data);

            })
    }, [user?.email, logOutUser]);

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
            <h2 className="mb-6 text-5xl">You have {myservice?.length} orders</h2>
            <div className="w-full overflow-x-auto">
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