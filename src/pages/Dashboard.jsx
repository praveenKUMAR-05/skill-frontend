import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove user session
    navigate("/login"); // Redirect to login page
  };

  // Skill Progress Data (Ensure these are defined)
  const skillProgressData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "JavaScript",
        data: [30, 40, 50, 60, 70, 80],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "React",
        data: [20, 30, 40, 50, 60, 70],
        borderColor: "green",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Node.js",
        data: [10, 20, 30, 35, 40, 45],
        borderColor: "orange",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Skill Category Data
  const skillCategoryData = {
    labels: ["Programming", "Design", "Languages", "Soft Skills"],
    datasets: [
      {
        data: [42, 17, 25, 17],
        backgroundColor: ["blue", "green", "orange", "purple"],
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SkillTracker</h1>
        <nav className="hidden md:flex">
          <Link to="/dashboard" className="mx-2 hover:underline">Dashboard</Link>
          <Link to="/skills" className="mx-2 hover:underline">Skills</Link>
          <Link to="/progress" className="mx-2 hover:underline">Progress</Link>
          <Link to="/settings" className="mx-2 hover:underline">Settings</Link>
        </nav>
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Heading */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button 
          onClick={() => navigate("/add-skill")}
          className="px-4 py-2 bg-black text-white flex items-center rounded hover:bg-gray-800"
        >
          <FaPlus className="mr-2" /> Add Skill
        </button>
      </div>
      <p className="text-gray-600 mb-4">View your skill progress and set new goals.</p>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Skills", value: "12", change: "+2 since last month", color: "text-green-600" },
          { title: "Categories", value: "4", description: "Programming, Design, Languages, Soft Skills" },
          { title: "Active Goals", value: "5", description: "3 in progress, 2 nearly complete" },
          { title: "Average Progress", value: "+28%", change: "+4% from last month", color: "text-green-600" },
        ].map((stat, index) => (
          <div key={index} className="p-4 border rounded">
            <h3 className="text-lg font-bold">{stat.title}</h3>
            <p className="text-2xl">{stat.value}</p>
            {stat.change && <p className={stat.color}>{stat.change}</p>}
            {stat.description && <p className="text-gray-600">{stat.description}</p>}
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 border rounded">
          <h3 className="text-lg font-bold">Skill Progress</h3>
          <p className="text-gray-600">Your skill development over the last 6 months</p>
          {skillProgressData && <Line data={skillProgressData} />}
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-lg font-bold">Skills by Category</h3>
          <p className="text-gray-600">Distribution of your skills across categories</p>
          {skillCategoryData && <Pie data={skillCategoryData} />}
        </div>
      </div>

      {/* Recent Activities & Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Recent Activities */}
        <div className="p-4 border rounded">
          <h3 className="text-lg font-bold">Recent Activities</h3>
          <ul className="mt-4">
            {[
              { skill: "JavaScript", action: "Increased proficiency from 70% to 75%", time: "2 days ago" },
              { skill: "React", action: "Completed goal: Build a React dashboard", time: "5 days ago" },
              { skill: "Node.js", action: "Increased proficiency from 40% to 45%", time: "1 week ago" },
              { skill: "UI Design", action: "Completed goal: Design a mobile app interface", time: "2 weeks ago" },
            ].map((activity, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{activity.skill}:</span> {activity.action}
                <p className="text-gray-600 text-sm">{activity.time}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Skill Goals */}
        <div className="p-4 border rounded">
          <h3 className="text-lg font-bold">Skill Goals</h3>
          <ul className="mt-4">
            {[
              { skill: "JavaScript", goal: "Complete Advanced JS Course", progress: "w-3/4", due: "Jul 30, 2024" },
              { skill: "React", goal: "Build 3 React Projects", progress: "w-2/3", due: "Aug 15, 2024" },
              { skill: "Node.js", goal: "Create a REST API", progress: "w-2/5", due: "Sep 1, 2024" },
              { skill: "UI Design", goal: "Learn Figma Basics", progress: "w-4/5", due: "Jul 20, 2024" },
            ].map((goal, index) => (
              <li key={index} className="mb-2">
                <span className="font-semibold">{goal.skill}:</span> {goal.goal}
                <p className="text-gray-600 text-sm">Due: {goal.due}</p>
                <div className="h-2 bg-gray-200 rounded">
                  <div className={`h-2 bg-black ${goal.progress} rounded`}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
