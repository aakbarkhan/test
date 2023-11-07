import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getDriverLocation from '@wasp/queries/getDriverLocation';

export function DriverLocation() {
  const { driverId } = useParams();
  const { data: location, isLoading, error } = useQuery(getDriverLocation, { driverId });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Driver Location</h1>
      <p className='text-lg'>Driver ID: {driverId}</p>
      <p className='text-lg'>Location: {location}</p>
      <Link to={`/chat/userId/driverId`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4'>Book Driver</Link>
    </div>
  );
}