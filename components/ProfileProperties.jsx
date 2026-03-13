'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import deleteProperty from '@/app/actions/deleteProperty';

const ProfileProperties = ({ properties:initialProperties }) => {
    const [properties, setProperties] = useState(initialProperties);

    const handleDeleteProperty = async (propertyId) => {
      const confirmed = window.confirm('Are you sure you want to delete this property?');
      if (!confirmed) return;
      await deleteProperty(propertyId);
      setProperties(properties.filter((p) => p._id !== propertyId));
      toast.success('Property Deleted Successfully');
    }

    if (properties.length === 0) {
      return (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">You have no listings yet.</p>
          <Link
            href="/properties/add"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            + Add your first property
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {properties.map((property) => (
          <div key={property._id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/properties/${property._id}`} className="block relative h-44">
              <Image
                className="object-cover"
                src={property.images[0]}
                alt={property.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                {property.type}
              </span>
            </Link>
            <div className="p-4">
              <p className="font-bold text-gray-900 truncate">{property.name}</p>
              <p className="text-sm text-gray-500 mt-0.5 truncate">
                {property.location.street}, {property.location.city}
              </p>
              {(property.rates?.nightly || property.rates?.weekly || property.rates?.monthly) && (
                <p className="text-gray-900 font-semibold text-sm mt-2">
                  {property.rates.nightly
                    ? `£${property.rates.nightly.toLocaleString()}/night`
                    : property.rates.weekly
                    ? `£${property.rates.weekly.toLocaleString()}/week`
                    : `£${property.rates.monthly.toLocaleString()}/month`}
                </p>
              )}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/properties/${property._id}/edit`}
                  className="flex-1 text-center bg-gray-900 hover:bg-gray-700 text-white px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Edit
                </Link>
                <button
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl text-sm font-medium transition-colors border border-red-100"
                  type="button"
                  onClick={() => handleDeleteProperty(property._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default ProfileProperties;
