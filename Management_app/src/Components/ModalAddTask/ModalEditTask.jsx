import { Form, Modal, Input, Select, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

const ModalEditTask = ({
  isEditOpen,
  handleCancel,
  handleEditUser,
  editingTask,
}) => {
  const [form] = Form.useForm();
  const today = new Date().toLocaleDateString("en-CA");
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
      title="Edit Task"
      open={isEditOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          form="taskFormEdit"
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="taskFormEdit"
        name="edit"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Task name"
          name="name"
          rules={[{ required: true, message: "Please input your task" }]}
        >
          <Input placeholder="Add your task" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input a description" }]}
        >
          <TextArea placeholder="Add description" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select placeholder="Select a status" optionFilterProp="children">
            <Select.Option value="Pending">PENDING</Select.Option>
            <Select.Option value="Progress">PROGRESS</Select.Option>
            <Select.Option value="Completed">COMPLETED</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ required: true, message: "Please select a deadline" }]}
        >
          <Input type="date" placeholder="Add deadline" min={today} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditTask;
