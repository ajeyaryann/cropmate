import { useState } from "react";

function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menu = ["Dashboard", "Crops", "Weather", "Soil", "AI Advisor"];

  return (
    <div className="sidebar">
      <h2 className="logo">🌱 CropMate</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;