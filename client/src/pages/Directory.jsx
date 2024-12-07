import React, { useState, useEffect } from 'react';
import alumniData from '../assets/alumniData';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Navbar from '../components/Navbar';
import Header from "../components/Header";
const filterOptions = {
  graduationYear: ['2020', '2019', '2018', '2017'],
  joiningYear: ['2016', '2015', '2014', '2013'],
  degree: ['B.Tech', 'M.Tech', 'PhD'],
  role: ['Software Engineer', 'Product Manager', 'Data Scientist'],
  house: ['Red', 'Blue', 'Green', 'Yellow'],
  currentLocation: ['New York', 'San Francisco', 'Chicago', 'Los Angeles'],
  company: ['Google', 'Facebook', 'Amazon', 'Apple'],
  designation: ['Senior Engineer', 'Manager', 'Director'],
  workIndustry: ['Tech', 'Finance', 'Healthcare', 'Education'],
  otherInstitute: ['Stanford', 'MIT', 'Harvard'],
  otherDegree: ['MBA', 'MS', 'JD'],
  otherDepartment: ['Computer Science', 'Electrical Engineering'],
  skills: ['Python', 'JavaScript', 'React']
};

const Directory = () => {
  const [filteredAlumni, setFilteredAlumni] = useState(alumniData);
  const [filters, setFilters] = useState({
    name: '',
    graduationYear: '',
    joiningYear: '',
    degree: '',
    role: '',
    house: '',
    currentLocation: '',
    company: '',
    designation: '',
    workIndustry: '',
    otherInstitute: '',
    otherDegree: '',
    otherDepartment: '',
    skills: ''
  });

  const [showMore, setShowMore] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleFilters, setVisibleFilters] = useState({});

  useEffect(() => {
    let result = alumniData;

    Object.keys(filters).forEach(filterKey => {
      if (filters[filterKey]) {
        result = result.filter(alum => alum[filterKey]?.toString().toLowerCase().includes(filters[filterKey].toLowerCase()));
      }
    });

    setFilteredAlumni(result);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleDropdownChange = (e, key) => {
    setFilters({
      ...filters,
      [key]: e.target.value
    });
  };

  const handleShowMore = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const toggleFilterSection = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleFilterVisibility = (key) => {
    setVisibleFilters((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <>
    <Header/>
    <Navbar/>
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-4 bg-gray-100">
        <button
          className="block md:hidden mb-4"
          onClick={toggleFilterSection}
        >
          {isFilterOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
        <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
          <h2 className="text-xl mb-4">Filter Alumni</h2>
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
            className="mb-4 p-2 w-full border rounded"
            onChange={handleFilterChange}
          />
          {Object.keys(filterOptions).map((key) => (
            <div key={key} className="mb-4">
              <label
                className="block mb-2 bg-gray-200 p-3 capitalize cursor-pointer"
                onClick={() => toggleFilterVisibility(key)}
              >
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              {visibleFilters[key] && (
                <select
                  name={key}
                  className="p-2 w-full border rounded"
                  onChange={(e) => handleDropdownChange(e, key)}
                >
                  <option value="">Select {key.replace(/([A-Z])/g, ' $1')}</option>
                  {filterOptions[key].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-2/3 p-4">
        <h2 className="text-xl mb-4">Alumni Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAlumni.map(alum => (
            <div key={alum.id} className="p-4 border rounded-lg shadow-md bg-white">
              <div className="flex flex-col items-center">
                <img src={alum.photo} alt={alum.name} className="h-16 w-16 rounded-full mb-2" />
                <h3 className="text-lg font-bold text-center">{alum.name}</h3>
                <p className="text-center">Degree: {alum.degree}</p>
                {showMore[alum.id] && (
                  <div className="mt-2 text-center">
                    <p>Graduation Year: {alum.graduationYear}</p>
                    <p>Joining Year: {alum.joiningYear}</p>
                    <p>Role: {alum.role}</p>
                    <p>House: {alum.house}</p>
                    <p>Current Location: {alum.currentLocation}</p>
                    <p>Company: {alum.company}</p>
                    <p>Designation: {alum.designation}</p>
                    <p>Work Industry: {alum.workIndustry}</p>
                    <p>Other Institute: {alum.otherInstitute}</p>
                    <p>Other Degree: {alum.otherDegree}</p>
                    <p>Other Department: {alum.otherDepartment}</p>
                    <p>Skills: {alum.skills}</p>
                    <p>{alum.details}</p>
                  </div>
                )}
                <button
                  className="mt-2 text-blue-500"
                  onClick={() => handleShowMore(alum.id)}
                >
                  {showMore[alum.id] ? 'Show Less' : 'Show More'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Directory;
