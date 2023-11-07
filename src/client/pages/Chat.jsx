import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createChat from '@wasp/actions/createChat';

export function Chat() {
  const { userId, driverId } = useParams();
  const createChatFn = useAction(createChat);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    createChatFn({ userId, driverId, message });
    setMessage('');
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Message'
          className='px-1 py-2 border rounded text-lg'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Send
        </button>
      </div>
      <div>
        <Link to={`/user/${userId}/bookings`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Book Driver</Link>
      </div>
    </div>
  );
}