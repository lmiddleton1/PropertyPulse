const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load .env manually
const envPath = path.join(__dirname, '..', '.env');
const envVars = fs.readFileSync(envPath, 'utf-8').split('\n');
envVars.forEach((line) => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
});

const MONGODB_URI = process.env.MONGODB_URI;

const PropertySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.Mixed },
    name: String,
    type: String,
    description: String,
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: Number,
    baths: Number,
    square_feet: Number,
    amenities: [String],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [String],
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);

  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'properties2.json'), 'utf-8')
  );

  await Property.deleteMany({});
  console.log('Cleared existing properties');

  await Property.insertMany(data);
  console.log(`Seeded ${data.length} properties`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
