import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Homes</Link>
          </li>
          <li>
            <Link to="/Chat">Chat</Link>
          </li>
          <li>
            <Link to="/Rooms">Rooms</Link>
          </li>
        </ul>
      </nav>
  );
}
