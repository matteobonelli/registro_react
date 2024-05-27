import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

interface ProfileProps {
}

interface User {
  id: string;
  name: string;
  lastname: string;

}


const Profile: React.FC<ProfileProps> = () => {

  const { username } = useParams();
  const [data, setData] = useState<User>()

  const getUser = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/profile/${username}`).then((res: any) => 
      {        
        setData(res)
      }
    )
  }

  useEffect(() => {
   username && getUser();
    
  }, [])
  

  return (
    <>
    <div>Profile  </div>
      {
        data && data?.name
      }
    </>
  )
}

export default Profile