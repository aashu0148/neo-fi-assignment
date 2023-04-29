import React, { useState } from "react";

import logo from "assets/app-logo.svg";

import styles from "./Navbar.module.scss";

const navLinks = [
  {
    label: "Trade",
    value: "trade",
  },
  {
    label: "Earn",
    value: "earn",
  },
  {
    label: "Support",
    value: "support",
  },
  {
    label: "About",
    value: "about",
  },
];
function Navbar() {
  const [activeLink, setActiveLink] = useState(navLinks[0].value);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>

      <ul className={styles.links}>
        {navLinks.map((item) => (
          <li
            className={`${styles.link} ${
              item.value == activeLink ? styles.active : ""
            }`}
            key={item.value}
            onClick={() => setActiveLink(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <button className="button">Get Started</button>
    </div>
  );
}

export default Navbar;
