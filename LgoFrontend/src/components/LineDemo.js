import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import DepartmentService from '../services/DepartmentService';
import axios from 'axios';

export default function LineDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [departments, setDepartments] = useState([]);
    const [data1, setData1] = useState([]); // Inicialize como um array vazio
    const [data2, setData2] = useState([]); // Inicialize como um array vazio

    const getData1 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/2022').then((resp) => {
            const d1 = resp.data;
            setData1(d1);
        });
    }

    const getData2 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/2023').then((resp) => {
            const d2 = resp.data;
            setData2(d2);
        });
    }

    useEffect(() => {
        getData1();
        getData2();
    }, []); // Este array vazio indica que o efeito só será executado uma vez, após a montagem do componente

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        DepartmentService.findAll().then((data) => {
            setDepartments(data);

            const departmentNames = data.map((dept) => dept.name);

            const data2022 = data1.map((item) => item.Totalization);
            const data2023 = data2.map((item) => item.Totalization);

            const updatedData = {
                labels: departmentNames,
                datasets: [
                    {
                        label: '2022',
                        data: data2022,
                        fill: false,
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
                        tension: 0.4
                    },
                    {
                        label: '2023',
                        data: data2023,
                        fill: false,
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--pink-500'),
                        tension: 0.4
                    }
                ]
            };
            setChartData(updatedData);
        });

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartOptions(options);
    }, [data1, data2]);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
}
