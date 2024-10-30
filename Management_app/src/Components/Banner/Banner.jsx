import { FaHome } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./Banner.css";
import { CiLogout } from "react-icons/ci";

const Banner = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="banner">
      <ul>
        <li>
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/task-chart">
            <IoPeopleOutline /> Task Chart
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FiSettings /> Settings
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>
            <CiLogout />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Banner;
