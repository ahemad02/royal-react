import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <button
        onClick={logout}
        className="text-sm border px-4 py-2 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
