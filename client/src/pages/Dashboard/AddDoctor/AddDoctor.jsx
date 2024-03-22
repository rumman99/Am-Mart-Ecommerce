import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './addDoctor.css';

const AddDoctor = () => {
    const [doctor, setDoctor]= useState({ name: '', email: '' });
    const [file, setFile]= useState('');

    const handleBlur=(e)=>{
        e.preventDefault();
        const oldData= {...doctor};
        oldData[e.target.name] =e.target.value
        setDoctor(oldData);
    }

    const handleFile=e=>{
        setFile(e.target.files[0])
    }

    const handleSubmit=async(e)=>{
        // e.preventDefault();
        const formData= new FormData();
        formData.append('file', file);
        formData.append('name', doctor.name);
        formData.append('email', doctor.email);

        const data= await fetch('http://localhost:3333/addDoctor', {
            method: 'POST',
            body: formData
        })
        const result = await data.json();
        console.log(result);
        alert("Doctor Added Successfully")

        // Clear input fields after submission
        setDoctor({ name: '', email: '' });
        setFile('');
    }

    return (
        <>
        <div className='row'>
            <div className='col-md-4'><Sidebar/></div>

            <div className='col-md-4 mt-5 pt-5'><h2 className=' text-center text-success'>Add Doctor</h2>
                <div>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label" >Name</label>
                        <div className="col-sm-10">
                        <input name='name' onBlur={handleBlur} type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                        <input onBlur={handleBlur} name='email' type="email" className="form-control" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">File Upload</label>
                        <div className="col-sm-10">
                        <input name='file' onChange={handleFile} type="file" className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                </div>
            </div>

        </div>
        </>
    );
};

export default AddDoctor;