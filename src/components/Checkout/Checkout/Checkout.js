import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Checkout = () => {
    const { name, img } = useLoaderData();
    const { user } = useContext(AuthContext)

    const handleConfirmService = (event) => {
        event.preventDefault();
        const form = event.target;
        const customerName = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;
        const order = {
            img: img,
            serviceName: name,
            customerName: customerName,
            email: email,
            phone: phone,
            message: message
        };
        //method
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('your service confirm for serve')
                    form.reset();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (

        <form onSubmit={handleConfirmService} className='my-8'>
            <div className="card-title justify-center">
                <div className="card w-96 glass  mb-8">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-cyan-800">Your are interested in</h2>
                        <h1 className='card-title justify-center font-bold text-orange-600'>{name}</h1>
                    </div>
                    <figure>
                        <img src={img} alt="" />
                    </figure>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input name='firstName' type="text" placeholder="first name" className="input input-bordered w-full" />
                <input name='lastName' type="text" placeholder="last name" className="input input-bordered w-full" />
                <input name='phone' type="text" placeholder="your phone" className="input input-bordered w-full" required />
                <input name="email" type="text" placeholder="your email" defaultValue={user?.email} readOnly className="input input-bordered w-full" />
            </div>

            <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="your message" required></textarea>

            <input className='btn' type="submit" value="confirm for service" />
        </form>

    );
};

export default Checkout;