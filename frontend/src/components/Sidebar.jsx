import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const navigate = useNavigate();

  // Updated menu (Crops → Farming Methods)
  const menu = [
    "Dashboard",
    "Farming Methods",
    "Weather",
    "Soil",
    "AI Advisor"
  ];

  const handleClick = (item) => {
    setActive(item);

    if (item === "Dashboard") {
      navigate("/");
    }

    if (item === "AI Advisor") {
      navigate("/ai-advisor");
    }

    if (item === "Farming Methods") {
      navigate("/farming-methods");
    }
  };

  return (
    <div className="sidebar">
      <h2 className="logo">🌱 CropMate</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => handleClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;