import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Admin Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Nested Route Example: Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/1"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            User Profile (User 1)
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/2"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            User Profile (User 2)
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/3"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            User Profile (User 3)
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/4"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            User Profile (User 4)
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/5"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            User Profile (User 5)
          </NavLink>
        </li>
        {/* Test Query String */}
        {/* Example 0 : Have ID and Category as keys, with respective values*/}
          <li>
            <NavLink
              to="/user-profile?id=123&category=tech"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              User Profile (ID 123, Tech)
            </NavLink>
          </li>
          {/* Example 1: Different ID and Category */}
          <li>
            <NavLink
              to="/user-profile?id=456&category=sports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              User Profile (ID 456, Sports)
            </NavLink>
          </li>
          {/* Example 2: Another user and category */}
          <li>
            <NavLink
              to="/user-profile?id=789&category=news"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              User Profile (ID 789, News)
            </NavLink>
          </li>
          {/* Example 3: Only an ID (category will be 'category' by default) */}
          <li>
            <NavLink
              to="/user-profile?id=999"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              User Profile (ID 999)
            </NavLink>
          </li>
          {/* Example 4: Only a category (id will be undefined) */}
          <li>
            <NavLink
              to="/user-profile?category=gaming"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              User Profile (Gaming)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-profile?id=1"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              User Profile (ID 1)
            </NavLink>
          </li>
      </ul>
    </nav>
  );
}

export default Navigation;