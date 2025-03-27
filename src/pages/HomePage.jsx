import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-between px-10 py-5 shadow-md">
        <h1 className="text-xl font-bold">SkillTracker</h1>
        <div>
          <button className="mr-4" onClick={() => navigate("/login")}>
            Login
          </button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold mb-4">
            Track Your Skills, Visualize Your Growth
          </h1>
          <p className="text-gray-600 mb-6">
            SkillTracker helps you monitor your progress, set goals, and
            visualize your skill development over time.
          </p>
          <button
            className="bg-black text-white px-6 py-2 rounded mr-4"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
          <button
            className="border border-black px-6 py-2 rounded"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
        <div className="bg-gray-200 w-96 h-60 flex items-center justify-center rounded-lg shadow-md">
          {/* Skill Progress Bar */}
          <div className="bg-white p-5 rounded shadow-lg w-72">
            <h3 className="text-lg font-semibold mb-2">Your Skill Progress</h3>
            <div className="mb-2">
              <p>JavaScript</p>
              <div className="bg-gray-300 w-full h-2 rounded">
                <div className="bg-black h-2 w-3/4 rounded"></div>
              </div>
            </div>
            <div className="mb-2">
              <p>React</p>
              <div className="bg-gray-300 w-full h-2 rounded">
                <div className="bg-black h-2 w-3/5 rounded"></div>
              </div>
            </div>
            <div className="mb-2">
              <p>Node.js</p>
              <div className="bg-gray-300 w-full h-2 rounded">
                <div className="bg-black h-2 w-2/5 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-center text-3xl font-bold mb-4">Features</h2>
        <p className="text-center text-gray-600 mb-10">
          Everything you need to track and improve your skills
        </p>
        <div className="flex justify-center gap-6">
          <div className="bg-white p-6 rounded shadow-md w-64 text-center">
            <span className="text-2xl">✏️</span>
            <h3 className="font-bold mt-2">Track Skills</h3>
            <p className="text-gray-600 text-sm">
              Add, update, and categorize your skills to keep track of your
              learning.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-md w-64 text-center">
            <span className="text-2xl">📈</span>
            <h3 className="font-bold mt-2">Visualize Progress</h3>
            <p className="text-gray-600 text-sm">
              See your skill development over time with interactive charts.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow-md w-64 text-center">
            <span className="text-2xl">🔔</span>
            <h3 className="font-bold mt-2">Set Goals</h3>
            <p className="text-gray-600 text-sm">
              Define skill improvement goals and track your progress.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t mt-10 text-gray-600">
        © 2025 SkillTracker. All rights reserved. 
        <span className="mx-2">|</span> 
        <a href="/terms" className="text-blue-500 hover:underline">Terms of Service</a>
        <span className="mx-2">|</span> 
        <a href="/privacy" className="text-blue-500 hover:underline">Privacy</a>
      </footer>
    </div>
  );
}

export default HomePage;
