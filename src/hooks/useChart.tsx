import React, { useEffect, useMemo, useState } from 'react';
import {
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    ChartType,
    ChartTypeRegistry,
    registerables
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(...registerables);

interface useChartProps<T extends ChartType> {
    type: T;
    options: ChartOptions<T>;
    data: ChartData<T>;
}

const useChart = <T extends ChartType>({ type, data, options }: useChartProps<T>) => {

    const [chartData, setChartData] = useState<ChartData<T>>(data)
    const [chartOptions, setChartOption] = useState<ChartOptions<T>>(options)

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
