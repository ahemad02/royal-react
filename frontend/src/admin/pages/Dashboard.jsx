import React, { useEffect, useState } from "react";
import {
  getDashboardStats,
  getLatestProducts,
  getProductsByCategory,
  getProductsBySize,
  getProductsBySurface,
} from "../api/dashboardApi";
import StatCard from "../components/StatCard";
import Section from "../components/Section";
import DataList from "../components/DataList";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [latest, setLatest] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [surfaceData, setSurfaceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [
          statsRes,
          latestRes,
          categoryRes,
          sizeRes,
          surfaceRes,
        ] = await Promise.all([
          getDashboardStats(),
          getLatestProducts(),
          getProductsByCategory(),
          getProductsBySize(),
          getProductsBySurface(),
        ]);

        setStats(statsRes.data);
        setLatest(latestRes.data);
        setCategoryData(categoryRes.data);
        setSizeData(sizeRes.data);
        setSurfaceData(surfaceRes.data);
      } catch (err) {
        console.error("Dashboard error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard title="Products" value={stats.products} />
        <StatCard title="Sizes" value={stats.sizes} />
        <StatCard title="Surfaces" value={stats.surfaces} />
        <StatCard title="Categories" value={stats.categories} />
        <StatCard title="Admins" value={stats.admins} />
      </div>

      {/* LATEST PRODUCTS */}
      <Section title="Latest Products">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {latest.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.category?.name}</td>
                <td className="p-3">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* SIMPLE DATA TABLES (Charts later) */}
      <div className="grid md:grid-cols-3 gap-6">
        <DataList title="Products by Category" data={categoryData} />
        <DataList title="Products by Size" data={sizeData} />
        <DataList title="Products by Surface" data={surfaceData} />
      </div>
    </div>
  );
};

export default Dashboard;
