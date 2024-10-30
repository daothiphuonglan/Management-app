import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerTasks from "../BannerTasks/BannerTasks";
import SubTask from "../SubTask/SubTask";
import "./Tasks.css";
import { Button } from "antd";
import ModalAddTask from "../ModalAddTask/ModalAddTask";
import ModalEditTask from "../ModalAddTask/ModalEditTask";
import { postCreateTask, updateTask } from "../../Services/TaskServices";
import { toast } from "react-toastify";
import ModalDetailTask from "../ModalAddTask/ModalDetailTask";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [tasksFilter, setTasksFilter] = useState([]);
  const [sortTasks, setSortTasks] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/tasks`)
      .then((response) => {
        setTasks(response.data);
        setTasksFilter(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  useEffect(() => {
    let filteredTasks = tasks;
    if (statusFilter !== "All") {
      filteredTasks = tasks.filter((task) => task.status === statusFilter);
    }

    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (sortTasks === "name") {
        return (a["name"] || "").localeCompare(b["name"] || "");
      } else if (sortTasks === "deadline") {
        return new Date(b.deadline || 0) - new Date(a.deadline || 0);
      }
      return -1;
    });

    setTasksFilter(sortedTasks);
  }, [statusFilter, sortTasks, tasks]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortTasks(event.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditOpen(false);
    setEditingTask(null);
    setIsDetailOpen(false);
  };

  const handleEditUser = async (values) => {
    try {
      let res = await updateTask(
        values.id,
        values.name,
        values.description,
        values.status,
        values.deadline
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === values.id ? res.data : task))
      );
      setTasksFilter((prevTasksFilter) =>
        prevTasksFilter.map((task) => (task.id === values.id ? res.data : task))
      );
      setIsEditOpen(false);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const handleOk = async (values) => {
    try {
      let res = await postCreateTask(
        values.name,
        values.description,
        values.status,
        values.deadline
      );
      setTasks((prevTasks) => [res.data, ...prevTasks]);
      setTasksFilter((prevTasksFilter) => [res.data, ...prevTasksFilter]);
      setIsModalOpen(false);
      toast.success("Add new task successfully!");
    } catch (error) {
      toast.error("Error creating task");
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };
  const openDetailModal = (task) => {
    setEditingTask(task);
    setIsEditOpen(true);
    setIsDetailOpen(true);
  };

  return (
    <div class="tasks_content">
      <div className="tasks_block">
        <BannerTasks />
        <div class="btn_funtion">
          <div class="btn_filter">
            <label htmlFor="statusFilter">
              <FaFilter />
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Progress">Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="btn_sort">
            <label htmlFor="sortCriterion">
              <FaSortAlphaDown />
            </label>
            <select
              id="sortCriterion"
              value={sortTasks}
              onChange={handleSortChange}
            >
              <option value="deadline">Deadline</option>
              <option value="name">Task name</option>
            </select>
          </div>

          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            ADD TASKS
          </Button>
        </div>

        <div className="tasks_main">
          {tasksFilter?.map((task, index) => (
            <SubTask
              key={task.id}
              task={task}
              index={index}
              openEditModal={openEditModal}
              openDetailModal={openDetailModal}
              setTasks={setTasks}
              setTasksFilter={setTasksFilter}
            />
          ))}
        </div>

        <ModalAddTask
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />

        <ModalEditTask
          isEditOpen={isEditOpen}
          handleCancel={handleCancel}
          handleEditUser={handleEditUser}
          editingTask={editingTask}
        />

        <ModalDetailTask
          isDetailOpen={isDetailOpen}
          handleCancel={handleCancel}
          handleEditUser={handleEditUser}
          editingTask={editingTask}
        />
      </div>
    </div>
  );
};

export default Tasks;
