import Link from "next/link";
import Image from "next/image";
import { FaBed, FaBath, FaRulerCombined, FaMapMarker } from 'react-icons/fa';

const FeaturedPropertyCard = ({ property }) => {

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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/properties/${property._id}`} className="relative md:w-2/5 h-56 md:h-auto shrink-0 block">
        <Image
          src={property.images[0]}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        {/* Featured badge */}
        <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          Featured
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 flex-1">
        <div>
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-xl font-bold text-gray-900 leading-snug">{property.name}</h3>
            <span className="shrink-0 bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap">
              {getRateDisplay()}
            </span>
          </div>
          <span className="inline-block text-gray-500 text-sm mb-4">{property.type}</span>

          <div className="flex items-center gap-1 text-gray-500 text-sm mb-5">
            <FaMapMarker className="text-blue-500 shrink-0" />
            <span className="truncate">{property.location.city}, {property.location.state}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 text-gray-600 text-sm border-t border-gray-100 pt-4 mb-5">
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
            className="inline-block bg-gray-900 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
    );
}

export default FeaturedPropertyCard;
