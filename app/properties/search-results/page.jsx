import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/ConvertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
    await connectDB();

    const locationPattern = new RegExp(location, 'i');

    let query = {
        $or: [
            { name: locationPattern },
            { description: locationPattern },
            { 'location.street': locationPattern },
            { 'location.city': locationPattern },
            { 'location.state': locationPattern },
            { 'location.zipcode': locationPattern },
        ]
    };

    if (propertyType && propertyType !== 'All') {
        const typePattern = new RegExp(propertyType, 'i');
        query.type = typePattern;
    }

    const propertiesQueryResults = await Property.find(query).lean();
    const properties = convertToSerializableObject(propertiesQueryResults);

    return (
        <>
        <section className="bg-gray-900 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <PropertySearchForm />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href='/properties'
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-6"
            >
              <FaArrowAltCircleLeft className='text-xs' /> Back to Properties
            </Link>

            <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Results</h1>
            {properties.length === 0 ? (
                <p className="text-gray-500">No properties found matching your search.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            )}
        </section>
        </>
    );
};

export default SearchResultsPage;
