import { Form, Modal, Input, Select, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

const ModalDetailTask = ({
  isDetailOpen,
  handleCancel,
  handleEditUser,
  editingTask,
}) => {
  const [form] = Form.useForm();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        name: editingTask.name,
        description: editingTask.description,
        status: editingTask.status,
        deadline: editingTask.deadline,
      });
    }
  }, [editingTask, form]);

  const onFinish = (values) => {
    handleEditUser({ ...values, id: editingTask.id });
  };

  return (
    <Modal
      title="Detail Task"
      open={isDetailOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="taskForm"
        name="detail"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Task name"
          name="name"
          rules={[{ message: "Please input your task" }]}
        >
          <Input placeholder="Add your task" disabled={"true"} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ message: "Please input a description" }]}
        >
          <TextArea placeholder="Add description" disabled={"true"} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ message: "Please select a status" }]}
        >
          <Select
            placeholder="Select a status"
            optionFilterProp="children"
            disabled={"true"}
          >
            <Select.Option value="Pending">PENDING</Select.Option>
            <Select.Option value="Progress">PROGRESS</Select.Option>
            <Select.Option value="Completed">COMPLETED</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ message: "Please select a deadline" }]}
        >
          <Input
            type="date"
            placeholder="Add deadline"
            min={today}
            disabled={"true"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetailTask;
