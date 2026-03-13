import PropertyCard from './PropertyCard';
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';

const HomeProperties = async () => {
    await connectDB();

    const recentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();


    return (
    
    <>
    
    <section className='px-4 py-8'>
    <div className='container-xl lg:container m-auto px-4 py-6'>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Recent Properties
        </h2>
        <p className="text-gray-500 text-center mb-8">The latest listings added to LM Lettings</p>
        {recentProperties.length === 0 ? (
            <p>No properties found</p>
        ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {recentProperties.map((property) => (
                    <PropertyCard key ={property._id} property={property} />
                ))}
                </div>
        )}
    </div>
    </section> 


<section className='flex justify-center my-8 px-6'>
    <Link href='/properties' className='inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-8 py-3.5 rounded-full font-medium transition-colors shadow-sm'>
      View All Properties
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
</section>


    </>


)};


export default HomeProperties;