import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskChart from '../Components/ChartTask/TaskChart';
import '../App.css';
const apiUrl = process.env.REACT_APP_API_URL;

const TaskChartPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  return (
    <div className="task-chart-page">
      <h2>Task Chart</h2>
      <TaskChart tasks={tasks} />
    </div>
  );
};

export default TaskChartPage;
