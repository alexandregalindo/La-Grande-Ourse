import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Copmtrimestrielle() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [data1, setData1] = useState({});
    const [data2, setData2] = useState({});
    const [data3, setData3] = useState({});
    const [data4, setData4] = useState({});
    const [data5, setData5] = useState({});
    const [data6, setData6] = useState({});
    const [data7, setData7] = useState({});
    const [data8, setData8] = useState({});
    const getData1 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ12022').then(
            (resp) => {
                const d1 = resp.data;
                setData1(d1[0].Total);
            }
        )
    }


    const getData2 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ22022').then(
            (resp) => {
                const d2 = resp.data;
                setData2(d2[0].Total);
            }
        )
    }


    const getData3 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ32022').then(
            (resp) => {
                const d3 = resp.data;
                setData3(d3[0].Total);
            }
        )
    }

    const getData4 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ42022').then(
            (resp) => {
                const d4 = resp.data;
                setData4(d4[0].Total);
            }
        )
    }

    const getData5 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ12023').then(
            (resp) => {
                const d5 = resp.data;
                setData5(d5[0].Total);
            }
        )
    }


    const getData6 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ22023').then(
            (resp) => {
                const d6 = resp.data;
                setData6(d6[0].Total);
            }
        )
    }


    const getData7 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ32023').then(
            (resp) => {
                const d7 = resp.data;
                setData7(d7[0].Total);
            }
        )
    }


    const getData8 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumQ42023').then(
            (resp) => {
                const d8 = resp.data;
                setData8(d8[0].Total);
            }
        )
    }

    useEffect(() => {


        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        getData1();
        getData2();
        getData3();
        getData4();
        getData5();
        getData6();
        getData7();
        getData8();
        const data = {
            labels: ['JFM', 'AMJ', 'JOS', 'OND'],
            datasets: [
                {
                    label: '2022',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [data1, data2, data3, data4]
                },
                {
                    label: '2023',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [data5, data6, data7, data8]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [data1, data2, data3, data4, data5, data6, data7, data8]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
