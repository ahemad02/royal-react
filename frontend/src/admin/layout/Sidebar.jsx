import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded transition ${
      isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 text-xl font-bold">ROYAL ADMIN</div>

      <nav className="space-y-2 px-4">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/catalogues" className={linkClass}>
          Catalogues
        </NavLink>

        <NavLink to="/admin/catalogue-sizes" className={linkClass}>
          Catalogue Sizes
        </NavLink>

        <NavLink to="/admin/catalogue-surfaces" className={linkClass}>
          Catalogue Surfaces
        </NavLink>

        <NavLink to="/admin/sizes" className={linkClass}>
          Sizes
        </NavLink>
        <NavLink to="/admin/surfaces" className={linkClass}>
          Surfaces
        </NavLink>
        <NavLink to="/admin/categories" className={linkClass}>
          Categories
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
