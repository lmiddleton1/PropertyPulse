import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
    return (

    <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Add Property</h1>
                <p className="text-gray-500 mt-1">Fill in the details below to list your property</p>
            </div>
            <PropertyAddForm />
        </div>
    </section>

    );
}

export default AddPropertyPage;
