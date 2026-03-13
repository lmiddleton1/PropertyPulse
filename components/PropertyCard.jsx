import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined, FaMapMarker } from 'react-icons/fa'

const PropertyCard = ({ property }) => {

    const getRateDisplay = () => {
        const { rates } = property;
        if (rates.monthly) {
            return `£${rates.monthly.toLocaleString()}/mo`
        } else if (rates.weekly) {
            return `£${rates.weekly.toLocaleString()}/wk`
        } else if (rates.nightly) {
            return `£${rates.nightly.toLocaleString()}/night`
        }
    };

    return (
    <div className='rounded-2xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow'>

      <Link href={`/properties/${property._id}`} className="block relative h-52">
        <Image
          src={property.images[0]}
          alt=''
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover'
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Rate badge */}
        <span className="absolute top-3 right-3 bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {getRateDisplay()}
        </span>
        {/* Type badge */}
        <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
          {property.type}
        </span>
      </Link>

      <div className="p-5">
        <h3 className="text-gray-900 font-bold text-lg mb-1 leading-snug">{property.name}</h3>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <FaMapMarker className="text-gray-400 shrink-0" />
          <span className="truncate">{property.location.city}, {property.location.state}</span>
        </div>

        <div className="flex items-center gap-4 text-gray-600 text-sm border-t border-gray-100 pt-4">
          <span className="flex items-center gap-1.5">
            <FaBed className="text-gray-400" /> {property.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <FaBath className="text-gray-400" /> {property.baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <FaRulerCombined className="text-gray-400" /> {property.square_feet} sqft
          </span>
        </div>

        <Link
          href={`/properties/${property._id}`}
          className="mt-4 block text-center bg-gray-900 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
    );
}

export default PropertyCard;
