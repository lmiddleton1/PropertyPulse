'use client';
import { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spinner';

const PropertyMap = ({ property }) => {
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);
    const [coords, setCoords] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        setDefaults({
            key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
            language: 'en',
            region: 'us'
        });

        const fetchCoords = async () => {
            try {
                const res = await fromAddress(
                    `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
                );

                if (res.results.length === 0) {
                    setGeocodeError(true);
                    return;
                }

                const { lat, lng } = res.results[0].geometry.location;
                setCoords({ lat, lng });
            } catch (error) {
                console.log(error);
                setGeocodeError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCoords();
    }, []);

    if (loading) return <Spinner />;
    if (geocodeError) return <div className='text-xl'>No location data found</div>;

    return (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude: coords.lng,
                latitude: coords.lat,
                zoom: 15
            }}
            style={{ width: '100%', height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={coords.lng} latitude={coords.lat} anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40} />
            </Marker>
        </Map>
    );
};

export default PropertyMap;
