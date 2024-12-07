import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from "axios";
export default function RoleSelectionForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        clg_email: '',
        type_of_job: '',
        date_of_joining: '',
        department: '',
        role: '',
        yearOfjoining: '',
        current_designation: ''}); 
    const [role, setRole] = useState('')
  
    const years = Array.from({length: 36}, (_, index) => 1990 + index);
    
 
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
console.log(formData)

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if (formData.role === '' || formData.yearOfjoining === '' || formData.clg_email === '' || formData.type_of_job === '' || formData.date_of_joining === '' || formData.department === '' || formData.current_designation === ''){

        toast.warning("Please fill all the fields");
        return 
        }

        const userId = localStorage.getItem('userId');
      const response = await axios.post(`https://alumni-site.onrender.com/api/auth/update/${userId}`, formData);
      if (response.status === 200) {
      toast.success(response.data.message);
        console.log('User added successfully:', response.data);
        navigate("/directory"); 
      } else {
        throw new Error('Failed to add details');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  return (
 <>
   <header className="h-fit
     w-full flex flex-col md:flex-row md:px-8 items-center justify-center md:items-center md:justify-between p-2 gap-8">
        <img src={logo} alt="Logo" className="w-full max-w-sm"/>
        <button className="w-fit border rounded-md px-4 py-1 flex gap-1 items-center text-xs font-semibold" ><span className="h-6  w-6 bg-slate-400 rounded-full"></span> Logout</button>
    </header>
    <div className=" w-full h-20 bg-[#122254]"></div>
    <div className="-mt-16 flex justify-center items-center w-full px-2 py-8">
        <form className="md:w-[80%] w-full space-y-4  max-w-[800px]  h-fit bg-white shadow-md p-4 md:p-8 border border-[#dddddd]  rounded-[6px] custom-shadow">
            <h2 className="text-base md:text-2xl my-2">Add your role details in - IPS ACADEMY</h2>
            <p className="text-sm my-2"> Fields marked <span className="required"><span className="text-red-600">*</span></span> are necessary</p>
            <div className="bg-[#f1f1f1] p-4 space-y-6  h-full rounded-[8px] px-4 py-8 ">
                <div className="flex gap-6 flex-col md:flex-row mb-4">
                    <div className=" flex flex-col flex-1">
                        <label className='text-xs sm:text-sm text-neutral-700' htmlFor="role">Role <span className="text-red-600">*</span></label>
                        <select  onChange={handleChange} id="role" name="role"  className="text-xs sm:text-sm py-1 border-b-2 border-[#ccc] transition-all duration-300 focus-visible:border-blue-600 bg-transparent outline-none">
                        <option value="" disabled  hidden>Select your Option</option>
                            <option value="current-student">Current Student</option>
                            <option value="alumni_past_student">Alumni (Past student)</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                    {
                        formData !== null && (
                          <div className="flex flex-col flex-1">
                        <label className='text-xs sm:text-sm text-neutral-700' htmlFor="yearOfjoining">Year of Joining <span className="text-red-600">*</span></label>
                        
                            <select  onChange={handleChange} id="yearOfjoining" name="yearOfjoining" className="text-xs sm:text-sm py-1 border-b-2 border-[#ccc] transition-all duration-300 focus-visible:border-blue-600 bg-transparent outline-none">
                                <option value="" disabled selected hidden>Enter your Year of Joining</option>
                               {
years.map((year) => <option key={year} value={year}>{year}</option>)
                               }
                            </select>
                       
                    </div>   
                        )
                    }
                    
                   
                    
                </div>
               {
                formData !== null && (
                    <>
                     <div className="flex gap-5 flex-col md:flex-row mb-4">
                    <div className=" flex flex-col flex-1">
                        <label className='text-xs sm:text-sm text-neutral-700' htmlFor="clg_email">Enter your College Email <span className="text-red-600">*</span></label>
                        <input type="text"  onChange={handleChange}  id="clg_email" name="clg_email" className="text-xs sm:text-sm py-1 border-b-2 border-[#ccc] transition-all duration-300  focus-visible:border-blue-600 bg-transparent outline-none" placeholder="Enter your College Email"/>
                    </div>
                </div>
                <div className="flex gap-5 flex-col md:flex-row mb-4">
                    <div className=" flex flex-col flex-1">
                        <label className='text-xs sm:text-sm text-neutral-700' htmlFor="type_of_job">Type of Job <span className="text-red-600">*</span></label>
                        <select   onChange={handleChange} id="type_of_job" name="type_of_job" className="text-xs sm:text-sm py-1 border-b-2 border-[#ccc] transition-all duration-300 focus-visible:border-blue-600 bg-transparent outline-none">
                            <option value="" disabled selected hidden>Select your Option</option>
                            <option value="option1">Faculty on Contract</option>
                            <option value="option2">Faculty on Regular</option>
                            
                        </select>
                    </div>
                    
                    
                </div>
                <div className="flex gap-5 flex-col md:flex-row mb-4">
                    <div className=" flex flex-col flex-1">
                        <label className='text-xs sm:text-sm text-neutral-700' htmlFor="date_of_joining">Date of Joining <span className="text-red-600">*</span></label>
                        <input type="text"  onChange={handleChange} id="date_of_joining" name="date_of_joining" className="text-xs sm:text-sm py-1 border-b-2 border-[#ccc] transition-all duration-300 focus-visible:border-blue-600 bg-transparent outline-none" placeholder="Date of Joining"/>
                    </div>
                </div>
                <div className="flex gap-5 flex-col md:flex-row mb-4">
                    <div className=" flex flex-col flex-1">
                        <label className='text-xs sm:text-sm text-neutral-700' htmlFor="department">In Which Department (Applicable For Faculty on Regular)</label>
                        <input   onChange={handleChange} type="text" id="department" name="department" className="text-xs sm:text-sm py-1 border-b-2 border-[#ccc] transition-all duration-300 focus-visible:border-blue-600 bg-transparent outline-none" placeholder="In Which Department (Applicable For Faculty on Regular)"/>
                    </div>
                </div>
                <div className="flex gap-5 flex-col md:flex-row mb-4">
                    <div className=" flex flex-col">
                        <label    className='text-xs sm:text-sm text-neutral-700' htmlFor="current_designation">Current Designation (Applicable For Faculty on Regular)</label>
                        <input type="text" onChange={handleChange}  id="current_designation" name="current_designation" className="text-xs sm:text-sm py-1 border-b-2 border-[#ccc] transition-all duration-300 focus-visible:border-blue-600 bg-transparent outline-none" placeholder="Current Designation (Applicable For Faculty on Regular)"/>
                    </div>
                </div>
                    </>
                )
               }
            </div>
            <button  onClick={(e) => handleSubmit(e)}  type="submit" className="px-6 py-2 bg-blue-600 hover:shadow-xl hover:bg-blue-700 transition-all duration-200 rounded-md text-white w-fit self-end">Join Alumni Network</button>
            <p className="text-xs text-center">By clicking on “Join Alumni Network” button, you agree to our <a className="text-blue-600 font-semibold" href="#">privacy policy</a> & <a className="text-blue-600 font-semibold"  href="#">terms & conditions</a>.</p>
        </form>
    </div>
    </>
  )
}
