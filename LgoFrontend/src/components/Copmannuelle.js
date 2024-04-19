import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function Copmannuelle() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});

    const getData1 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sum2022').then(
            (resp) => {
                const d1 = resp.data;
                //console.log(d1);
                setData1(d1[0].Total);
            }
        )
    }

    const getData2 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sum2023').then(
            (resp) => {
                const d2 = resp.data;
                //console.log(d1);
                setData2(d2[0].Total);
            }
        )
    }
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    useEffect(() => {
        getData1();
        getData2();

        const data = {
            labels: ['2023', '2022'],
            datasets: [
                {
                    label: '2022',
                    data: [0, data1], //[540, 0], // ici on met la donnée de 2022 pour l'étiquette 2022 et 0 pour 2023
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 1
                },
                {
                    label: '2023',
                    data: [data2, 0], // ici on met 0 pour l'étiquette 2022 et la donnée de 2023 pour l'étiquette 2023
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [data1, data2]);

    return (
        <div className="card1">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}