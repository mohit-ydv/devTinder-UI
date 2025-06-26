import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log("feed ", feed);

  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true
      });
      dispatch(addFeed(res.data));
    }
    catch (error) {
      // console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return feed && (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed
