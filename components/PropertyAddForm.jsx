import addProperty from "@/app/actions/addProperty";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors text-sm";
const labelClass = "block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5";
const sectionClass = "bg-white rounded-2xl shadow-sm p-6 mb-5";

const PropertyAddForm = () => {
    return (
<form action={addProperty} className="space-y-0">

  {/* Basic Info */}
  <div className={sectionClass}>
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Basic Info</h2>
    <div className="space-y-4">
      <div>
        <label htmlFor="type" className={labelClass}>Property Type</label>
        <select id="type" name="type" className={inputClass} required>
          <option value="Flat">Flat</option>
          <option value="Terraced House">Terraced House</option>
          <option value="Semi-Detached House">Semi-Detached House</option>
          <option value="Detached House">Detached House</option>
          <option value="Bungalow">Bungalow</option>
          <option value="Cottage">Cottage</option>
          <option value="Chalet">Chalet</option>
          <option value="Studio">Studio</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="name" className={labelClass}>Listing Name</label>
        <input type="text" id="name" name="name" className={inputClass} placeholder="eg. Cosy Flat In Central London" required />
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" className={inputClass} rows="4" placeholder="Add an optional description of your property"></textarea>
      </div>
    </div>
  </div>

  {/* Location */}
  <div className={sectionClass}>
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Location</h2>
    <div className="space-y-3">
      <input type="text" id="street" name="location.street" className={inputClass} placeholder="Street" />
      <input type="text" id="city" name="location.city" className={inputClass} placeholder="City" required />
      <input type="text" id="state" name="location.state" className={inputClass} placeholder="County" required />
      <input type="text" id="zipcode" name="location.zipcode" className={inputClass} placeholder="Postcode" />
    </div>
  </div>

  {/* Property Details */}
  <div className={sectionClass}>
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Property Details</h2>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label htmlFor="beds" className={labelClass}>Beds</label>
        <input type="number" id="beds" name="beds" className={inputClass} required />
      </div>
      <div>
        <label htmlFor="baths" className={labelClass}>Baths</label>
        <input type="number" id="baths" name="baths" className={inputClass} required />
      </div>
      <div>
        <label htmlFor="square_feet" className={labelClass}>Sq Ft</label>
        <input type="number" id="square_feet" name="square_feet" className={inputClass} required />
      </div>
    </div>
  </div>

  {/* Amenities */}
  <div className={sectionClass}>
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Amenities</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
      {[
        ["amenity_24_7_security","24/7 Security"],
        ["amenity_air_conditioning","Air Conditioning"],
        ["amenity_balcony_patio","Balcony/Patio"],
        ["amenity_beach_access","Beach Access"],
        ["amenity_coffee_maker","Coffee Maker"],
        ["amenity_dishwasher","Dishwasher"],
        ["amenity_elevator_access","Elevator Access"],
        ["amenity_fireplace","Fireplace"],
        ["amenity_free_parking","Free Parking"],
        ["amenity_kitchen","Full kitchen"],
        ["amenity_gym_fitness_center","Gym/Fitness Center"],
        ["amenity_high_speed_internet","High-Speed Internet"],
        ["amenity_hiking_trails","Hiking Trails Access"],
        ["amenity_hot_tub","Hot Tub"],
        ["amenity_mountain_view","Mountain View"],
        ["amenity_outdoor_grill_bbq","Outdoor Grill/BBQ"],
        ["amenity_pet_friendly","Pet-Friendly"],
        ["amenity_ski_equipment_storage","Ski Equipment Storage"],
        ["amenity_smart_tv","Smart TV"],
        ["amenity_swimming_pool","Swimming Pool"],
        ["amenity_washer_dryer","Washer & Dryer"],
        ["amenity_wheelchair_accessible","Wheelchair Accessible"],
        ["amenity_wifi","Wifi"],
      ].map(([id, label]) => (
        <div key={id} className="flex items-center gap-2">
          <input type="checkbox" id={id} name="amenities" value={label} className="w-4 h-4 rounded border-gray-300 accent-gray-900" />
          <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
        </div>
      ))}
    </div>
  </div>

  {/* Rates */}
  <div className={sectionClass}>
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Rates</h2>
    <p className="text-xs text-gray-400 mb-5">Leave blank if not applicable</p>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label htmlFor="weekly_rate" className={labelClass}>Weekly (£)</label>
        <input type="number" id="weekly_rate" name="rates.weekly" className={inputClass} />
      </div>
      <div>
        <label htmlFor="monthly_rate" className={labelClass}>Monthly (£)</label>
        <input type="number" id="monthly_rate" name="rates.monthly" className={inputClass} />
      </div>
      <div>
        <label htmlFor="nightly_rate" className={labelClass}>Nightly (£)</label>
        <input type="number" id="nightly_rate" name="rates.nightly" className={inputClass} />
      </div>
    </div>
  </div>

  {/* Seller Info */}
  <div className={sectionClass}>
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-5">Contact Info</h2>
    <div className="space-y-4">
      <div>
        <label htmlFor="seller_name" className={labelClass}>Name</label>
        <input type="text" id="seller_name" name="seller_info.name" className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="seller_email" className={labelClass}>Email</label>
        <input type="email" id="seller_email" name="seller_info.email" className={inputClass} placeholder="Email address" required />
      </div>
      <div>
        <label htmlFor="seller_phone" className={labelClass}>Phone</label>
        <input type="tel" id="seller_phone" name="seller_info.phone" className={inputClass} placeholder="Phone number" />
      </div>
    </div>
  </div>

  {/* Images */}
  <div className={sectionClass}>
    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">Images</h2>
    <p className="text-xs text-gray-400 mb-5">Select up to 4 images</p>
    <input type="file" id="images" name="images" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-gray-700 transition-colors" accept="image/*" multiple required />
  </div>

  <button
    className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3.5 px-4 rounded-2xl transition-colors"
    type="submit"
  >
    Add Property
  </button>

</form>
    );
}

export default PropertyAddForm;
