import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function Copmmensuelles() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [data4, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);
    const [data7, setData7] = useState([]);
    const [data8, setData8] = useState([]);
    const [data9, setData9] = useState([]);
    const [data10, setData10] = useState([]);
    const [data11, setData11] = useState([]);
    const [data12, setData12] = useState([]);
    const [data13, setData13] = useState([]);
    const [data14, setData14] = useState([]);
    const [data15, setData15] = useState([]);
    const [data16, setData16] = useState([]);
    const [data17, setData17] = useState([]);
    const [data18, setData18] = useState([]);
    const [data19, setData19] = useState([]);
    const [data20, setData20] = useState([]);
    const [data21, setData21] = useState([]);
    const [data22, setData22] = useState([]);
    const [data23, setData23] = useState([]);
    const [data24, setData24] = useState([]);



    const getData1 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM12022').then(
            (resp) => {
                const d1 = resp.data;
                setData1(d1[0].Total);
            }
        )
    }

    const getData2 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM22022').then(
            (resp) => {
                const d2 = resp.data;
                setData2(d2[0].Total);
            }
        )
    }

    const getData3 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM32022').then(
            (resp) => {
                const d3 = resp.data;
                setData3(d3[0].Total);
            }
        )
    }

    const getData4 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM42022').then(
            (resp) => {
                const d4 = resp.data;
                setData4(d4[0].Total);
            }
        )
    }
    const getData5 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM52022').then(
            (resp) => {
                const d5 = resp.data;
                setData5(d5[0].Total);
            }
        )
    }

    const getData6 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM62022').then(
            (resp) => {
                const d6 = resp.data;
                setData6(d6[0].Total);
            }
        )
    }

    const getData7 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM72022').then(
            (resp) => {
                const d7 = resp.data;
                setData7(d7[0].Total);
            }
        )
    }

    const getData8 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM82022').then(
            (resp) => {
                const d8 = resp.data;
                setData8(d8[0].Total);
            }
        )
    }

    const getData9 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM92022').then(
            (resp) => {
                const d9 = resp.data;
                setData9(d9[0].Total);
            }
        )
    }

    const getData10 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM102022').then(
            (resp) => {
                const d10 = resp.data;
                setData10(d10[0].Total);
            }
        )
    }

    const getData11 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM112022').then(
            (resp) => {
                const d11 = resp.data;
                setData11(d11[0].Total);
            }
        )
    }
    const getData12 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM122022').then(
            (resp) => {
                const d12 = resp.data;
                setData12(d12[0].Total);
            }
        )
    }


    const getData13 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM12023').then(
            (resp) => {
                const d13 = resp.data;
                setData13(d13[0].Total);
            }
        )
    }

    const getData14 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM22023').then(
            (resp) => {
                const d14 = resp.data;
                setData14(d14[0].Total);
            }
        )
    }

    const getData15 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM32023').then(
            (resp) => {
                const d15 = resp.data;
                setData15(d15[0].Total);
            }
        )
    }

    const getData16 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM42023').then(
            (resp) => {
                const d16 = resp.data;
                setData16(d16[0].Total);
            }
        )
    }

    const getData17 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM52023').then(
            (resp) => {
                const d17 = resp.data;
                setData17(d17[0].Total);
            }
        )
    }

    const getData18 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM62023').then(
            (resp) => {
                const d18 = resp.data;
                setData18(d18[0].Total);
            }
        )
    }

    const getData19 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM72023').then(
            (resp) => {
                const d19 = resp.data;
                setData19(d19[0].Total);
            }
        )
    }

    const getData20 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM82023').then(
            (resp) => {
                const d20 = resp.data;
                setData20(d20[0].Total);
            }
        )
    }

    const getData21 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM92023').then(
            (resp) => {
                const d21 = resp.data;
                setData21(d21[0].Total);
            }
        )
    }

    const getData22 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM102023').then(
            (resp) => {
                const d22 = resp.data;
                setData22(d22[0].Total);
            }
        )
    }

    const getData23 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM112023').then(
            (resp) => {
                const d23 = resp.data;
                setData23(d23[0].Total);
            }
        )
    }

    const getData24 = () => {
        axios.get('http://lagrandeourse.institutgrassetinfo.com:4081/api/data/sumM122023').then(
            (resp) => {
                const d24 = resp.data;
                setData24(d24[0].Total);
            }
        )
    }



    useEffect(() => {

        getData1();
        getData2();
        getData3();
        getData4();
        getData5();
        getData6();
        getData7();
        getData8();
        getData9();
        getData10();
        getData11();
        getData12();
        getData13();
        getData14();
        getData15();
        getData16();
        getData17();
        getData18();
        getData19();
        getData20();
        getData21();
        getData22();
        getData23();
        getData24();

        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'],
            datasets: [
                {
                    label: previousYear,
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [data1, data2, data3, data4, data5, data6, data7,
                        data8, data9, data10, data11, data12]
                },
                {
                    label: currentYear,
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [data13, data14, data15, data16, data17, data18, data19,
                        data20, data21, data22, data23, data24]
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
    }, [data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11, data12, data13, data14, data15, data16, data17, data18, data19,
        data20, data21, data22, data23, data24]);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
