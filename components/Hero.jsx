import PropertySearchForm from "./PropertySearchForm";

const Hero  = () => {
    return ( 

            <section className="relative bg-gray-900 py-28 mb-4 overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-gray-900 to-gray-900 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            UK Property Rentals
          </span>
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight"
          >
            Find The Perfect<br className="hidden sm:block" /> Rental Property
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
            Discover thousands of properties across the UK. Search by location, type, and budget.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>




     );
}
 
export default Hero ;