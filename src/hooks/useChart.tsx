import React, { useEffect, useMemo, useState } from 'react';
import {
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    ChartType,
    ChartTypeRegistry,
    registerables
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';

ChartJS.register(...registerables);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data1: ChartData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [12, 34, 23, 52, 43],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [12, 34, 23, 52, 43],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

interface useChartProps {
    type: ChartType;
    options: ChartOptions;
    data: ChartData;
}

const useChart: React.FC<useChartProps> = ({ type, data, options }) => {

    const [chartData, setChartData] = useState<ChartData>(data)
    const [chartOptions, setChartOption] = useState<ChartOptions | undefined>(options)

    useEffect(() => {
        setChartData(data)
        setChartOption(options)        
    }, [])

    return (
        <div>
            <Chart type={type} options={chartOptions} data={chartData} />;
        </div>
    )
}

export default useChart
