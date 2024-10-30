import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TaskChart = ({ tasks }) => {
  const statusCount = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: ["Pending", "Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [
          statusCount["Pending"] || 0,
          statusCount["Progress"] || 0,
          statusCount["Completed"] || 0,
        ],
        backgroundColor: ["#f39c12", "#3498db", "#2ecc71"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tasks by Status",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TaskChart;
