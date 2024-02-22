import { HomeOutlined, SelectOutlined } from '@ant-design/icons'
import Card from 'antd/es/card/Card'
import Statistic from 'antd/es/statistic/Statistic'
import React from 'react'
import { useChart } from '../../hooks'
import Cards from '../../components/cards/Card'

function Dashbord() {

  const Margin = useChart<"bar">({
    type: "bar",
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "November", "Desember"],
      datasets: [
        {
          label: "All",
          data: [23, 34, 53, 53, 24, 26, 53, 53, 24],
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: "Woman",
          data: [0, 3, 23, 23, 14, 16, 13, 13, 14],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: "Man",
          data: [13, 34, 51, 0, 21, 6, 3, 5, 4],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
        }
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const
        },
        title: {
          display: true,
          text: 'Penjulan paling banyak per tahun',
        }
      },
    }
  })

  const Popular = useChart<"pie">({
    type: "pie",
    data: {
      labels: ["All", "Man", "Woman"],
      datasets: [
        {
          label: "Popular",
          data: [12, 3, 54],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Penjualan paling banyak 20123',
        },
      },
    }
  })

  const MarginYear = useChart<'line'>({
    type: "line",
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "November", "Desember"],
      datasets: [
        {
          label: "2022",
          data: [23, 34, 53, 53, 24, 26, 53, 53, 24],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: "y"
        },
        {
          label: "2023",
          data: [0, 3, 23, 23, 14, 16, 13, 13, 14],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          yAxisID: "y1"
        }
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Multi Axis',
        },
      },
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    }
  })

  return (
    <div>
      <div
        className='grid grid-cols-4 gap-8'
      >
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
            title="Jumlah Unit"
            value={12}
            prefix={<HomeOutlined />}
          />
        </Card>
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
            title="Jumlah Unit"
            value={12}
            prefix={<HomeOutlined />}
          />
        </Card>
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
            title="Jumlah Unit"
            value={12}
            prefix={<HomeOutlined />}
          />
        </Card>
        <Card
          className='shadow-md flex flex-col justify-center items-center'
        >
          <Statistic
            title="Jumlah Unit"
            value={12}
            prefix={<HomeOutlined />}
          />
        </Card>
      </div>
      <div className='flex justify-center gap-6 m-6 p-6 border rounded-md'>
        <div className='w-[75%]'>
          {MarginYear}
        </div>
        <div className='border p-6 w-[25%] flex flex-col gap-4'>
          <Cards
            title='Total penjualan'
            value={132}
            prefix={<SelectOutlined />}
          />
          <Cards
            title='Keuntunan'
            value={132}
            prefix={<SelectOutlined />}
          />
          <Cards
            title='Kerugian'
            value={132}
            prefix={<SelectOutlined />}
          />
        </div>
      </div>
      <div className='flex justify-center gap-6'>
        <Card className='w-[70%] m-6'>
          {Margin}
        </Card>
        <Card className='w-[30%] m-6'>
          {Popular}
        </Card>
      </div>
    </div>
  )
}

export default Dashbord
