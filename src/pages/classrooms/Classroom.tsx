import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {ClassroomProps} from './Classrooms';
import { Checkbox, Table } from 'flowbite-react';

export interface UserClassroom {
  firstName: string
  lastName: string
  email: string
  className: string
}

const Classroom : React.FC = () => {

  const [usersClassroom, setUsersClassroom] = useState<UserClassroom[]>()

  const getUsersClassroom = () => {
    axios.get<UserClassroom[]>(`${import.meta.env.VITE_BASE_URL}/users/getUsersByClass/${name?.toUpperCase()}`).then((res : any) =>{
      setUsersClassroom(res);
      console.log(res)
    })
  }

  useEffect(() => {
    getUsersClassroom();
  }, []);

  const { name } = useParams();

  console.log(name?.toUpperCase());
  

  return(
     <>
    <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>Nome</Table.HeadCell>
            <Table.HeadCell>Cognome</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Classe</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Modifica</span>
            </Table.HeadCell>
          </Table.Head>
          {
            usersClassroom?.map((classroom : UserClassroom, index: number) => {
              return <Table.Body key={index} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {classroom.firstName}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{classroom.lastName}
                    </Table.Cell>
                    <Table.Cell >{classroom.email}
                    </Table.Cell>
                    <Table.Cell >{classroom.className}
                    </Table.Cell>
                    <Table.Cell>
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        Modifica
                      </a>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
            }) 
          }
        </Table>
    </div>
    </>
    )
}

export default Classroom