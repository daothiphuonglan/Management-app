import { Form, Modal, Input, Select, Button } from "antd";
import { useEffect } from "react";
import InputText from "../InputChange/InputText";
import TextArea from "antd/es/input/TextArea";

const ModalAddTask = ({ isModalOpen, handleCancel, handleOk }) => {
  const [form] = Form.useForm();
  const today = new Date().toLocaleDateString("en-CA");
  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen, form]);

  return (
    <Modal
      title="Add Modal"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          form="taskFormAdd"
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="taskFormAdd"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleOk}
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
          <InputText placeholder="Add description" type={TextArea} />
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

export default ModalAddTask;
