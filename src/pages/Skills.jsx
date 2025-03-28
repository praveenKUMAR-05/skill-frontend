import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "", level: 50, id: null });

  const navigate = useNavigate(); // Navigation Hook
  const token = localStorage.getItem("authToken"); // Retrieve token

  // 🔹 Logout Function
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication token
    sessionStorage.removeItem("userData"); // Clear session data
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // 🔹 Fetch Skills with Authentication
  const fetchSkills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        headers: { Authorization: `Bearer ${token}` }, // Include Token
      });
      if (!response.ok) throw new Error("Failed to fetch skills");
      const data = await response.json();
      setSkills(Array.isArray(data) ? data : []); // Ensure it's an array
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // 🔹 Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Open Modal for Add/Edit Skill
  const openModal = (skill = null) => {
    setFormData(skill ? { ...skill, id: skill._id } : { name: "", category: "", level: 50, id: null });
    setShowModal(true);
  };

  // 🔹 Handle Form Submit for Add/Update Skill
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:5000/api/update-skill/${formData.id}`
      : "http://localhost:5000/api/add-skill";

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Include Token
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchSkills();
        setShowModal(false);
      } else {
        console.error("Failed to save skill");
      }
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  // 🔹 Delete Skill
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/delete-skill/${id}`, { 
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }, // Include Token
      });

      if (response.ok) {
        setSkills(skills.filter((skill) => skill._id !== id));
      } else {
        console.error("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // 🔹 Filter Skills based on Search
  const filteredSkills = skills.filter((skill) => skill.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* 🔷 Header Section */}
      <nav className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold">SkillTracker</h1>
        <div className="flex space-x-6">
          <a href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</a>
          <a href="/skills" className="text-gray-600 hover:text-black">Skills</a>
          <a href="/progress" className="text-black font-semibold">Progress</a>
          <a href="/settings" className="text-gray-600 hover:text-black">Settings</a>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Logout</button>
      </nav>

      {/* 🔷 Page Header & Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-gray-500">Manage your skills and track your progress.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate("/dashboard")} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
            ← Back to Dashboard
          </button>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={() => openModal()}>+ Add Skill</button>
        </div>
      </div>

      {/* 🔷 Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search skills..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔷 Skills Table */}
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Level</th>
            <th className="p-3 text-left">Last Updated</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <tr key={skill._id} className="border-b">
                <td className="p-3">{skill.name}</td>
                <td className="p-3">
                  <span className="bg-gray-200 px-2 py-1 rounded text-sm">{skill.category}</span>
                </td>
                <td className="p-3">
                  <span className="font-semibold">{skill.level}%</span>
                </td>
                <td className="p-3">{skill.lastUpdated ? new Date(skill.lastUpdated).toISOString().split("T")[0] : "N/A"}</td>
                <td className="p-3">
                  <button onClick={() => openModal(skill)} className="px-2 py-1 border rounded hover:bg-gray-100">Edit</button>
                  <button onClick={() => handleDelete(skill._id)} className="px-2 py-1 ml-2 border rounded hover:bg-gray-100">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td className="p-3 text-center" colSpan="5">No skills found.</td></tr>
          )}
        </tbody>
      </table>

      {/* 🔷 Modal for Add/Edit Skill */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{formData.id ? "Edit Skill" : "Add Skill"}</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Skill Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">{formData.id ? "Update" : "Add"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillsPage;
