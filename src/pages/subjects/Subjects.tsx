import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Checkbox, Table } from "flowbite-react";
"use client";


export interface Subject {
  id: number
  description: string
  name: string
}

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>()

  const getSubjects = () => {
    axios.get<Subject[]>(`${import.meta.env.VITE_BASE_URL}/subjects`).then((res : any) =>{
      setSubjects(res);
      console.log(res)
    })
  }

  // const user = false;

  // useAuthGuard(user)

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
    <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>Materia</Table.HeadCell>
            <Table.HeadCell>Acronimo</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Modifica</span>
            </Table.HeadCell>
          </Table.Head>
          {
            subjects?.map((subject : Subject, index: number) => {
              return <Table.Body key={index} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {subject.description}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{subject.name}</Table.Cell>
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

export default Subjects