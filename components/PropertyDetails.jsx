import {
  FaTimes,
  FaCheck,
  FaMapMarker,
} from 'react-icons/fa';
import PropertyMap from './PropertyMap';

const PropertyDetails = ({ property }) => {
  return (
    <main className="space-y-6">

      {/* Name / Type / Location */}
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <span className="inline-block bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          {property.type}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{property.name}</h1>
        <div className="flex items-center text-gray-500">
          <FaMapMarker className="text-gray-400 mr-2 shrink-0" />
          <span>{property.location.street}, {property.location.city}, {property.location.zipcode}</span>
        </div>
      </div>

      {/* Rates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`bg-white rounded-2xl p-5 shadow-sm text-center ${!property.rates.nightly && 'opacity-40'}`}>
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Nightly</div>
          <div className="text-2xl font-bold text-gray-900">
            {property.rates.nightly ? `£${property.rates.nightly.toLocaleString()}` : <FaTimes className="inline text-red-400" />}
          </div>
        </div>
        <div className={`bg-white rounded-2xl p-5 shadow-sm text-center ${!property.rates.weekly && 'opacity-40'}`}>
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Weekly</div>
          <div className="text-2xl font-bold text-gray-900">
            {property.rates.weekly ? `£${property.rates.weekly.toLocaleString()}` : <FaTimes className="inline text-red-400" />}
          </div>
        </div>
        <div className={`bg-white rounded-2xl p-5 shadow-sm text-center ${!property.rates.monthly && 'opacity-40'}`}>
          <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Monthly</div>
          <div className="text-2xl font-bold text-gray-900">
            {property.rates.monthly ? `£${property.rates.monthly.toLocaleString()}` : <FaTimes className="inline text-red-400" />}
          </div>
        </div>
      </div>

      {/* Description + Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            Property Description
          </h3>
          <p className="text-gray-500 leading-relaxed">{property.description}</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            Property Details
          </h3>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-50">
              <tr className="py-2">
                <td className="py-3 text-gray-400 uppercase tracking-wide text-xs w-1/2">Type</td>
                <td className="py-3 text-gray-800 font-medium">{property.type}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-400 uppercase tracking-wide text-xs">Bedrooms</td>
                <td className="py-3 text-gray-800 font-medium">{property.beds}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-400 uppercase tracking-wide text-xs">Bathrooms</td>
                <td className="py-3 text-gray-800 font-medium">{property.baths}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-400 uppercase tracking-wide text-xs">Floor Area</td>
                <td className="py-3 text-gray-800 font-medium">{property.square_feet} sqft</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-400 uppercase tracking-wide text-xs">City</td>
                <td className="py-3 text-gray-800 font-medium">{property.location.city}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-400 uppercase tracking-wide text-xs">County</td>
                <td className="py-3 text-gray-800 font-medium">{property.location.state}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-400 uppercase tracking-wide text-xs">Postcode</td>
                <td className="py-3 text-gray-800 font-medium">{property.location.zipcode}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Amenities - dark section */}
      <div className="bg-gray-900 rounded-2xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-6">Amenities</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {property.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <span className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center mr-3 shrink-0">
                <FaCheck className="text-white text-xs" />
              </span>
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
        <PropertyMap property={property} />
      </div>

    </main>
  );
};

export default PropertyDetails;
