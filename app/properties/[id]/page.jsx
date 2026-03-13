import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { convertToSerializableObject } from '@/utils/ConvertToObject';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import DeletePropertyButton from "@/components/DeletePropertyButton";

const PropertyPage = async ({ params }) => {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    await connectDB();
    const propertyDoc = await Property.findById(id).lean();
    const property = convertToSerializableObject(propertyDoc);
    const isOwner = session?.user?.id && property?.owner && session.user.id === property.owner.toString();

    if (!property) {
      return (
        <h1 className='text-center text-2xl font-bold mt-10'>Property Not Found</h1>
      )
    }

    return (
        <>
        {/* Lightbox image gallery */}
        <PropertyImages images={property.images} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

          {/* Back link */}
          <Link href="/properties" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors mb-8">
            <FaArrowLeft className="text-xs" /> Back to Properties
          </Link>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 pb-12">

            {/* Main content */}
            <PropertyDetails property={property} />

            {/* Sidebar */}
            <aside className="space-y-4">

              {isOwner && (
                <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Manage Listing</p>
                  <Link
                    href={`/properties/${id}/edit`}
                    className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-medium w-full py-2.5 px-4 rounded-xl transition-colors text-sm"
                  >
                    <FaEdit /> Edit Property
                  </Link>
                  <DeletePropertyButton propertyId={id} />
                </div>
              )}

              <PropertyContactForm property={property} />

              <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
                <BookmarkButton property={property} />
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Share</p>
                  <ShareButtons property={property} />
                </div>
              </div>

            </aside>

          </div>
        </div>
        </>
    );
};

export default PropertyPage;
