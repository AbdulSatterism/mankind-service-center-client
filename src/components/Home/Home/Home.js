import React, { useEffect, useState } from 'react';
import Services from '../../Services/Services/Services';


const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch(`https://mankind-service-center-server.onrender.com/services`)
            .then(res => res.json())
            .then(data => {
                setServices(data);

            })
    }, [])
    return (
        <div>
            <div className=' p-10'>
                <h1 className='text-3xl font-bold text-center'>MANKIND SERVICE CENTER</h1>
                <div className="form-control mt-5">
                    <div className="input-group justify-center">
                        <input type="text" name='search' placeholder="Search…" className="input input-bordered" />
                        <button className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-full p-5 ml-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto gap-3'>
                {
                    services.map(service => <Services
                        key={service._id}
                        service={service}
                    ></Services>)
                }
            </div>
        </div>
    );
};

export default Home;