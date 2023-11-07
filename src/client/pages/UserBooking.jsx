import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserBookings from '@wasp/queries/getUserBookings';
import createBooking from '@wasp/actions/createBooking';

export function UserBookingPage(props) {
  const userId = props.match.params.userId;

  const { data: bookings, isLoading, error } = useQuery(getUserBookings, { userId });
  const createBookingFn = useAction(createBooking);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateBooking = () => {
    createBookingFn({ userId });
  };

  return (
    <div className='p-4'>
      <button
        onClick={handleCreateBooking}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Booking
      </button>

      {bookings.map((booking) => (
        <div key={booking.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>Booking ID: {booking.id}</div>
          <div>User ID: {booking.userId}</div>
          <div>Driver ID: {booking.driverId}</div>
          <Link
            to={`/chat/${booking.userId}/${booking.driverId}`}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2'
          >
            Chat with Driver
          </Link>
        </div>
      ))}
    </div>
  );
}