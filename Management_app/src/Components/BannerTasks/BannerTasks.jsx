import { Input } from "antd";
import { BsPersonCircle } from "react-icons/bs";
import "./BannerTask.css";
const BannerTasks = () => {
  return (
    <div class="header">
      <div>
        <Input placeholder="Search for anything" className="header_input" />
      </div>
      <div class="header_person">
        <div>
          <strong>Anima Agrawal</strong>
          <p class="header_text">U.P, India</p>
        </div>
        <BsPersonCircle class="person_circle" />
      </div>
    </div>
  );
};

export default BannerTasks;
