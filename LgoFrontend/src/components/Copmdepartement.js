import React, { useState, useEffect } from 'react';
import DepartmentService from '../services/DepartmentService';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function Copmdepartement() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [departments, setDepartments] = useState([]);
    const [data1, setData1] = useState([]);

    useEffect(() => {
        // Este useEffect é executado apenas uma vez na montagem do componente
        const getData1 = () => {
            axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/diff').then((resp) => {
                const d1 = resp.data;
                setData1(d1.map(item => item.Diff)); // Extrai os valores de "Diff"
            });
        };
        getData1();
    }, []); // Adicione uma dependência vazia para garantir que seja executado apenas uma vez

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        DepartmentService.findAll().then((data) => {
            setDepartments(data);

            const departmentNames = data.map((dept) => dept.name);

            const updatedData = {
                labels: departmentNames,
                datasets: [
                    {
                        label: 'Difference',
                        data: data1, // Valores de "Diff"
                        fill: false,
                        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'), // Cor da borda
                        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'), // Cor do fundo (azul)
                        tension: 0.4
                    }
                ]
            };
            setChartData(updatedData);

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
        });
    }, [data1]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    );
}
