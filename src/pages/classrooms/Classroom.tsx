import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {ClassroomProps} from './Classrooms';

const Classroom: React.FC = () => {

  const { id } = useParams();
  const [data, setData] = useState<ClassroomProps>();
  const {t} =  useTranslation();
  
   const getClassroom = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/classrooms/${id}`).then((res: any) => 
      {        
        setData(res);
      }
    )
  }

  useEffect(() => {
    getClassroom();
  }, [])  
  

  return (
    <h1>
      { data && 
        t('titoloAula', {aula: data.name}) + ' ' +  t('sizeWithCount', {count: parseInt(data.size)})
      }
 

    </h1>
  )
}

export default Classroom