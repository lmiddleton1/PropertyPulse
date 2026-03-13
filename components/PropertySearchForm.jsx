'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';




const PropertySearchForm = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All');

    const router = useRouter();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (location === '' && propertyType === 'All') {
            router.push('/properties');
        } else {
            const query = `?location=${location}&propertyType=${propertyType}`;
            router.push(`/properties/search-results${query}`);

        }
    }


    return (

    <form onSubmit={ handleSubmit} className="mt-2 w-full max-w-3xl bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-3 flex flex-col md:flex-row items-center gap-3"
        >
          <div className="w-full md:flex-1">
            <label htmlFor="location" className="sr-only">Location</label>
            <input
              type="text"
              id="location"
              placeholder="City, County, Postcode..."
              className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              value ={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <label htmlFor="property-type" className="sr-only">Property Type</label>
            <select
              id="property-type"
              className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                value ={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Flat">Flat</option>
              <option value="Terraced House">Terraced House</option>
              <option value="Semi-Detached House">Semi-Detached House</option>
              <option value="Detached House">Detached House</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Cottage">Cottage</option>
              <option value="Chalet">Chalet</option>
              <option value="Studio">Studio</option>
              <option value="Room">Room</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shrink-0"
          >
            Search
          </button>
        </form> );
}
 
export default PropertySearchForm;