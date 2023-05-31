import React from 'react';

const Admin = () => {

    const handleAddService = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const img = form.image.value;
        const details = form.details.value;
        const addService = {
            name: name,
            img: img,
            details: details
        };
        fetch(`https://mankind-service-center-server.onrender.com/services`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addService)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('your service added successfully');
                    form.reset()
                }
            })

    }

    return (

        <form onSubmit={handleAddService} className='my-8'>
            <h1 className='text-center mb-8 font-bold text-2xl text-cyan-600'>Add a service which need neglected people</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                <input name='name' type="text" placeholder="enter your service name" className="input input-bordered w-full" required />

                <input name="image" type="url" placeholder="enter your image url" className="input input-bordered w-full" required />

            </div>
            <br />
            <textarea name='details' className="textarea textarea-bordered h-24 w-full" placeholder="your message" ></textarea>

            <input className='btn' type="submit" value="Add Service" />
        </form>
    );
};

export default Admin;