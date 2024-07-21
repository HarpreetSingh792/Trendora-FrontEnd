import {
    Chart as ChartJS, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js"
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import { getMonthData } from "../assets/getSixMonthsData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);




export const BarChart = ({ data1, data2, title1, title2, color1, color2, viewWidth, axis = true }) => {

    const barOptions = {
        indexAxis: axis ? "x" : "y",
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },

            x: {
                grid: {
                    display: false,
                },
            },

        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },

    };
    return (
        <Bar className="w-full max-h-72" options={barOptions} data={{
            labels:getMonthData,
            datasets: [
                {
                    label: title1,
                    data: data1,
                    backgroundColor: color1,
                    barThickness: viewWidth <= 556 ? 5 : 20,
                    barPercentage: 1,
                    categoryPercentage: 0.4,
                },
                data2 ? {
                    label: title2,
                    data: data2,
                    backgroundColor: color2,
                    barThickness: viewWidth <= 556 ? 5 : 20,
                    barPercentage: 1,
                    categoryPercentage: 0.4
                } : ""
            ]
        }} />
    )
}



export const DoughnutChart = ({ dataArray, title, color, cutout, legendDisplay = true, offset }) => {
    return (
        <Doughnut className=" max-h-72" options={{

            responsive: true,
            offset: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        padding: 15
                    },
                    display: legendDisplay
                },
            },
            cutout
        }
        } data={{
            labels: title,
            datasets: [
                {
                    data: dataArray,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 0,
                    borderAlign: "inner",
                    offset
                },
            ]
        }} />
    )
}


export const LineChart = ({ data1, borderColor, backgroundColor }) => {
    const data = {
        labels: getMonthData,
        datasets: [
            {
                data: data1,
                borderColor,
                backgroundColor,
                fill: true
            },
        ],
    };
    return (
        <Line data={data} options={
            {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        } />
    )
}


export const PieChart = ({ label, data, title, color, offset }) => {
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },

    };
    return (
        <Pie className="max-h-72" options={pieOptions} data={{
            labels: label,
            datasets: [
                {
                    label: title,
                    data: data,
                    backgroundColor: color,
                    barThickness: 10,
                    barPercentage: 1,
                    categoryPercentage: 0.4,
                    offset
                }
            ]
        }} />
    )
}
