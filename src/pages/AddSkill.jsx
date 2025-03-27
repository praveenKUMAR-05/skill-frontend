import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddSkill() {
  const navigate = useNavigate();
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("");
  const [currentLevel, setCurrentLevel] = useState(50);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    // Validate required fields
    if (!skillName || !category) {
      setError("Skill name and category are required.");
      setLoading(false);
      return;
    }

    const newSkill = {
      name: skillName,
      category,
      level: currentLevel,
      description,
      lastUpdated: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/add-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });

      if (response.ok) {
        navigate("/skills"); // Redirect to skills page after adding skill
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to add skill.");
      }
    } catch (error) {
      setError("Error adding skill. Please try again later.");
      console.error("Error adding skill:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Skill</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Back
        </button>
      </div>

      <p className="text-gray-600 mb-6">Add a new skill to track your progress.</p>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Skill Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Skill Details</h2>

        {/* Skill Name */}
        <div className="mb-4">
          <label className="block font-semibold">Skill Name</label>
          <input
            type="text"
            placeholder="e.g. JavaScript, Public Speaking, Spanish"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-semibold">Category</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Languages">Languages</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>
        </div>

        {/* Current Level */}
        <div className="mb-4">
          <label className="block font-semibold">Current Level</label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
            className="w-full mt-2"
          />
          <p className="text-right text-gray-600">{currentLevel}%</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold">Description (Optional)</label>
          <textarea
            placeholder="Add notes about your skill, goals, or resources..."
            className="w-full p-2 border border-gray-300 rounded mt-1 h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-black text-white px-4 py-2 rounded transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Skill"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSkill;
