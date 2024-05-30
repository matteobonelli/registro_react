import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { httpGet } from '../../services/httpService';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export interface UsersByYearsResult {
    year: number,
    count: number
  }

  export interface LabelsData {
    usersByYears: UsersByYearsResult[];
    usersByCity: { city: string, count: number}[];
    usersBySchoolClasses: { classroom: string, count: number}[];
  }

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };

const BarChart : React.FC = () => {

  const [labels, setLabels] = useState<LabelsData | undefined>();
  const [dataReady, setDataReady] = useState(false);

  const currentYear = new Date().getFullYear();

  const dataYears = {
    labels: labels?.usersByYears.map((item : UsersByYearsResult) => item.year),
    datasets: [
      {
        label: 'Utenti',
        data: labels?.usersByYears.map((item : UsersByYearsResult) => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const dataCity = {
    labels: labels?.usersByCity.map((item : any) => item.city),
    datasets: [
      {
        label: 'Utenti',
        data: labels?.usersByCity.map((item : any) => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const dataClassRoom = {
    labels: labels?.usersBySchoolClasses.map((item : any) => item.className),
    datasets: [
      {
        label: 'Utenti',
        data: labels?.usersBySchoolClasses.map((item : any) => item.count),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpGet("dashboard");
        console.log(res.data)
        // const fetchedData = res.data.usersByYears.map((item: any) => ({
        //   year: item.year,
        //   count: item.count
        // }));
        setLabels(res.data);
        setDataReady(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
    
  if (!dataReady) {
    return <div>Loading...</div>
  }

  return (
    <>
    <Bar options={options} data={dataYears} />
    <Bar options={options} data={dataCity} />
    <Bar options={options} data={dataClassRoom} />
    </>
  )
}

export default BarChart