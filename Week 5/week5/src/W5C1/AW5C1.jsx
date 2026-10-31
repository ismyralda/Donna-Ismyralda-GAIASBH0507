import { useState } from 'react';
import RealTimeClock from './RealTimeClock';
import WindowTracker from './WindowTracker';
import UserProfile from './UserProfile';
import UserProfileWrong from './UserProfileWrong';


export default function AW5C1(){
  const [userId, setUserId] = useState(null);

  return(
    <div>
      <RealTimeClock />
      <WindowTracker />
      <div className='card'>
        <UserProfile userId={userId} onSelectUser={setUserId} />
      </div>
    </div>
  );
}