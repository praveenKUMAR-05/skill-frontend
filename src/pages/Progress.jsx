import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line, Radar,Bar } from "react-chartjs-2";
import "chart.js/auto";

function Progress() {
  const [selectedRange, setSelectedRange] = useState("Last 6 Months");
  const [selectedChart, setSelectedChart] = useState("line"); // Track active chart
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    navigate("/login");
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "JavaScript",
        data: [45, 48, 52, 55, 60, 68],
        borderColor: "#6366F1",
        backgroundColor: "transparent",
      },
      {
        label: "React",
        data: [30, 35, 40, 45, 50, 58],
        borderColor: "#34D399",
        backgroundColor: "transparent",
      },
      {
        label: "Node.js",
        data: [20, 22, 28, 33, 38, 44],
        borderColor: "#FBBF24",
        backgroundColor: "transparent",
      },
    ],
  };

  const radarChartData = {
    labels: ["JavaScript", "React", "Node.js", "UI Design", "Spanish", "Public Speaking"],
    datasets: [
      {
        label: "Your Skills",
        data: [80, 70, 50, 40, 30, 45],
        backgroundColor: "rgba(99, 102, 241, 0.4)",
        borderColor: "#6366F1",
        borderWidth: 2,
      },
    ],
  };

  const comparisonData = {
    labels: ["Jan", "Jun"],
    datasets: [
      {
        label: "JavaScript",
        data: [45, 68],
        backgroundColor: "#6366F1",
      },
      {
        label: "React",
        data: [30, 55],
        backgroundColor: "#34D399",
      },
      {
        label: "Node.js",
        data: [20, 40],
        backgroundColor: "#FBBF24",
      },
    ],
  };

  const handleExport = () => {
    alert("Exporting progress data...");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold">SkillTracker</h1>
        <div className="flex space-x-6">
          <a href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</a>
          <a href="/skills" className="text-gray-600 hover:text-black">Skills</a>
          <a href="/progress" className="text-black font-semibold">Progress</a>
          <a href="/settings" className="text-gray-600 hover:text-black">Settings</a>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Logout
        </button>
      </nav>

      {/* Progress Tracking Header */}
      <div className="flex justify-between items-center mb-6">
      <div>
          <h2 className="text-3xl font-bold">Progress Tracking</h2>
          <p className="text-gray-500">Visualize and analyze your skill development over time.</p>
        </div>

        {/* Dropdown & Export Button (aligned to the right) */}
        <div className="flex space-x-3">
          <select
            className="border px-4 py-2 rounded"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
          <button className="border px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={handleExport}>
            Export
          </button>
        </div>
        </div>
        <div>

        {/* Chart Type Buttons */}
        <div className="flex space-x-3 mt-6">
          <button 
            className={`px-4 py-2 border rounded ${selectedChart === "line" ? "bg-black text-white" : ""}`}
            onClick={() => setSelectedChart("line")}
          >
            Line Chart
          </button>
          <button 
            className={`px-4 py-2 border rounded ${selectedChart === "radar" ? "bg-black text-white" : ""}`}
            onClick={() => setSelectedChart("radar")}
          >
            Radar Chart
          </button>
          <button
          className={`px-4 py-2 border rounded ${selectedChart === "heatmap" ? "bg-black text-white" : ""}`}
          onClick={() => setSelectedChart("heatmap")}
        >
            Heatmap
          </button>
          <button 
            className={`px-4 py-2 border rounded ${selectedChart === "comparison" ? "bg-black text-white" : ""}`}
            onClick={() => setSelectedChart("comparison")}
          >
            Comparison
          </button>
        </div>
      </div>

      {/* Chart Rendering */}
      <div className="bg-white shadow rounded p-6 mb-6">
        {selectedChart === "line" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Skill Progress Over Time</h3>
            <Line data={lineChartData} />
          </>


        )}
        
        {selectedChart === "radar" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Skill Balance</h3>
            <p className="text-gray-500">Visualize the balance of your skills across different categories</p>
            <Radar data={radarChartData} />
          </>
        )}
         
      </div>

      {/* Chart Rendering */}
      <div className="bg-white shadow rounded p-6 mb-6">
        {selectedChart === "heatmap" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Activity Heatmap</h3>
            <p className="text-gray-500 mb-4">View your skill development activity over time.</p>

            {/* Heatmap Grid */}
            <div className="flex flex-col space-y-2">
              {[...Array(7)].map((_, row) => (
                <div key={row} className="flex space-x-1">
                  {[...Array(52)].map((_, col) => (
                    <div
                      key={col}
                      className={`w-6 h-6 rounded ${
                        Math.random() > 0.7 ? "bg-green-500" : Math.random() > 0.4 ? "bg-green-300" : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>

            {/* Activity Summary */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-100 p-4 rounded text-center">
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm">Total activities</p>
              </div>
              <div className="bg-gray-100 p-4 rounded text-center">
                <p className="text-2xl font-bold">14</p>
                <p className="text-sm">Current streak</p>
              </div>
              <div className="bg-gray-100 p-4 rounded text-center">
                <p className="text-2xl font-bold">21</p>
                <p className="text-sm">Longest streak</p>
              </div>
              <div className="bg-gray-100 p-4 rounded text-center">
                <p className="text-2xl font-bold">4.2</p>
                <p className="text-sm">Weekly average</p>
              </div>
            </div>
          </>
        )}

        {selectedChart === "comparison" && (
            <div className="bg-white shadow rounded p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Skill Comparison</h3>
            <p className="text-gray-500 mb-4">Compare your progress across different skills</p>
            <Bar data={comparisonData} />
          
    
          {/* Skill Growth Analysis */}
          <div className="bg-white shadow rounded p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Skill Growth Analysis</h3>
            
            {/* JavaScript */}
            <div className="mb-3">
              <div className="flex justify-between">
                <span>JavaScript</span>
                <span className="text-green-500">+30%</span>
              </div>
              <div className="bg-gray-200 h-2 rounded">
                <div className="bg-indigo-500 h-2 rounded" style={{ width: "80%" }}></div>
              </div>
              <p className="text-gray-500 text-sm">30% growth</p>
            </div>
    
            {/* React */}
            <div className="mb-3">
              <div className="flex justify-between">
                <span>React</span>
                <span className="text-green-500">+30%</span>
              </div>
              <div className="bg-gray-200 h-2 rounded">
                <div className="bg-green-500 h-2 rounded" style={{ width: "80%" }}></div>
              </div>
              <p className="text-gray-500 text-sm">30% growth</p>
            </div>
    
            {/* Node.js */}
            <div className="mb-3">
              <div className="flex justify-between">
                <span>Node.js</span>
                <span className="text-green-500">+25%</span>
              </div>
              <div className="bg-gray-200 h-2 rounded">
                <div className="bg-yellow-400 h-2 rounded" style={{ width: "70%" }}></div>
              </div>
              <p className="text-gray-500 text-sm">25% growth</p>
            </div>
            </div>
            </div>
        )}
      </div>
      {selectedChart === "line" && (
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Most Improved Skills */}
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4">Most Improved Skills</h3>
            <div className="mb-3">
              <p className="flex justify-between text-sm">
                <span>JavaScript</span> <span>+30%</span>
              </p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div className="mb-3">
              <p className="flex justify-between text-sm">
                <span>React</span> <span>+25%</span>
              </p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: "25%" }}></div>
              </div>
            </div>
            <div>
              <p className="flex justify-between text-sm">
                <span>Node.js</span> <span>+20%</span>
              </p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>

          {/* Learning Streaks */}
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4">Learning Streaks</h3>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(28)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded ${i % 4 === 0 ? "bg-green-500" : i % 3 === 0 ? "bg-green-300" : "bg-gray-200"}`}
                ></div>
              ))}
            </div>
            <p className="mt-3 text-sm">Current streak: <b>5 days</b></p>
            <p className="text-sm">Longest streak: <b>14 days</b></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Progress;
