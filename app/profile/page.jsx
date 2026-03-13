import Image from 'next/image';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png';
import ProfileProperties from '@/components/ProfileProperties';
import { convertToSerializableObject } from '@/utils/ConvertToObject';

const ProfilePage = async () => {

    await connectDB();

    const sessionUser = await getSessionUser();

    const { userId } = sessionUser;

    if (!userId) {
        throw new Error('User ID is required');
    }

    const propertiesDocs = await Property.find({ owner: userId}).lean();
    const properties = propertiesDocs.map(convertToSerializableObject);

    return (
      <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar */}
          <div className="md:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden md:sticky md:top-6">
              {/* Banner */}
              <div className="bg-gray-900 h-28 relative">
                <Image
                  className="h-20 w-20 rounded-full mx-auto absolute -bottom-10 left-1/2 -translate-x-1/2 border-4 border-white object-cover"
                  src={sessionUser.user.image || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <div className="pt-12 pb-6 px-6 text-center">
                <p className="text-lg font-bold text-gray-900">{sessionUser.user.name}</p>
                <p className="text-sm text-gray-500 mt-1 break-all">{sessionUser.user.email}</p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Your Listings</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your property listings</p>
              </div>
              <a
                href="/properties/add"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                + Add Property
              </a>
            </div>
            <ProfileProperties properties={properties} />
          </div>

        </div>
      </div>
    </section>
    );
}

export default ProfilePage;
