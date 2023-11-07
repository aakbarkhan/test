import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserBookings from '@wasp/queries/getUserBookings';

export function DashboardPage() {
  const { data: bookings, isLoading, error } = useQuery(getUserBookings);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1>Welcome to the Dashboard!</h1>
      <ul>
        <li><Link to='/users'>Users</Link></li>
        <li><Link to='/drivers'>Drivers</Link></li>
        <li><Link to='/chats'>Chats</Link></li>
        <li><Link to='/bookings'>Bookings</Link></li>
      </ul>

      <h2>Your Bookings:</h2>
      {bookings.map((booking) => (
        <div key={booking.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <p>User: {booking.user.username}</p>
          <p>Driver: {booking.driver.username}</p>
        </div>
      ))}
    </div>
  );
}