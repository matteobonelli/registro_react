import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useBlocker, useNavigate } from 'react-router-dom';
import Counter from '../../components/counter/counter';

const Dashboard: React.FC = () => {
  
  const navigate = useNavigate();
  const [showButton, setshowButton] = useState<boolean>(false)

  const { t } = useTranslation();

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
       nextLocation.pathname === "/users"
  );

  useEffect(() => {
    console.log(blocker);
    
        if(blocker.state === "blocked") {
          setshowButton(true);
        } else {
          setshowButton(false);
        }
  }, [blocker])
  
  
  const handleClick = (path: string) => {
   
    navigate(path, {
      state: {
        data: {
          id: 1,
          name: 'Lorenzo',
          lastname: 'De Angelis'
        }
      }
    });
  }
  
  return (
    <>
    <h1>{t('Welcome to React')}</h1>
   {/*  <Button className="mt-5" onClick={() => handleClick('/users')}>Vai a utenti</Button>
    <Button className="mt-5" onClick={() => handleClick('/subjects')}>Vai a subjects</Button>
    {showButton && <Button className="mt-5" onClick={() => blocker.proceed}>Vai avanti</Button>} */}
    <Counter />

</>
  )
}

export default Dashboard