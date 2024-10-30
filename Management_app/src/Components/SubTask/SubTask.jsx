import "./SubTask.css";
import { Dropdown, Space, Button, message, Popconfirm } from "antd";
import { HiDotsVertical } from "react-icons/hi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { deleteTask } from "../../Services/TaskServices";

const SubTask = ({
  task,
  index,
  openEditModal,
  setTasks,
  setTasksFilter,
  openDetailModal,
}) => {
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      setTasks((prevTasks) =>
        prevTasks.filter((currentId) => currentId.id !== task.id)
      );
      setTasksFilter((prevTasksFilter) =>
        prevTasksFilter.filter((currentId) => currentId.id !== task.id)
      );
      message.success("Task deleted successfully!");
    } catch (error) {
      message.error("Error deleting task");
    }
  };

  const confirm = () => {
    handleDelete();
  };

  const cancel = (e) => {
    console.log(e);
  };

  const items = [
    {
      label: (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>
            <AiTwotoneDelete />
          </Button>
        </Popconfirm>
      ),
      key: "0",
    },
    {
      label: (
        <Button onClick={() => openEditModal(task)}>
          <FaRegEdit />
        </Button>
      ),
      key: "1",
    },
    {
      label: <Button onClick={() => openDetailModal(task)}>Detail</Button>,
      key: "2",
    },
  ];

  return (
    <div key={task.id} className="sub_task">
      <div class="sub_task_content">
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <div
          className={`status ${
            task.status === "Pending"
              ? "status-pending"
              : task.status === "Progress"
              ? "status-in-progress"
              : task.status === "Completed"
              ? "status-completed"
              : ""
          }  block`}
        >
          {task.status}
        </div>

        <div class="task_deadline">
          <strong>{task.deadline}</strong>
        </div>
      </div>

      <Dropdown menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <HiDotsVertical />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default SubTask;
