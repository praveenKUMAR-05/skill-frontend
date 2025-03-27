import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [name, setName] = useState("example");
  const [email, setEmail] = useState("example@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [goalReminders, setGoalReminders] = useState(true);
  const navigate = useNavigate();

  const handleSaveChanges = () => {
    alert("Profile Updated Successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    navigate("/login");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password Updated Successfully!");
  };

  const handleSavePreferences = () => {
    alert("Notification Preferences Saved!");
  };

  const handleExportData = () => {
    alert("Your data export is being prepared. You will receive an email once it's ready.");
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmation) {
      alert("Your account has been permanently deleted.");
      // Here, add API call for account deletion.
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold">SkillTracker</h1>
        <div className="flex space-x-6">
          <a href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</a>
          <a href="/skills" className="text-gray-600 hover:text-black">Skills</a>
          <a href="/progress" className="text-gray-600 hover:text-black">Progress</a>
          <a href="/settings" className="text-black font-semibold">Settings</a>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Logout
        </button>
      </nav>

      {/* Settings Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-gray-500">Manage your account settings and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 border-b pb-3">
        {["Profile", "Password", "Notifications", "Data & Privacy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-gray-200" : "text-gray-600 hover:bg-gray-100"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Form */}
      {activeTab === "Profile" && (
        <div className="bg-white shadow rounded p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
          <p className="text-gray-500 mb-4">Update your personal information and profile settings.</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      )}

     {/* Password Change Form */}
     {activeTab === "Password" && (
        <div className="bg-white shadow rounded p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>
          <p className="text-gray-500 mb-4">Update your password to keep your account secure.</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-4 py-2 rounded mt-1"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-4 py-2 rounded mt-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border px-4 py-2 rounded mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            onClick={handlePasswordChange}
          >
            Update Password
          </button>
        </div>
      )}
      {/* Notification Preferences */}
      {activeTab === "Notifications" && (
        <div className="bg-white shadow rounded p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
          <p className="text-gray-500 mb-4">Configure how and when you receive notifications.</p>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-gray-500 text-sm">Receive notifications via email</p>
            </div>
            <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} className="cursor-pointer" />
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h4 className="font-medium">Weekly Progress Reports</h4>
              <p className="text-gray-500 text-sm">Receive weekly summaries of your skill progress</p>
            </div>
            <input type="checkbox" checked={weeklyReports} onChange={() => setWeeklyReports(!weeklyReports)} className="cursor-pointer" />
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <h4 className="font-medium">Goal Reminders</h4>
              <p className="text-gray-500 text-sm">Get reminders about upcoming skill goals</p>
            </div>
            <input type="checkbox" checked={goalReminders} onChange={() => setGoalReminders(!goalReminders)} className="cursor-pointer" />
          </div>

          <button
            className="px-4 py-2 mt-4 bg-black text-white rounded hover:bg-gray-800"
            onClick={handleSavePreferences}
          >
            Save Preferences
          </button>
        </div>
      )}
    

      {/* Data & Privacy Tab */}
      {activeTab === "Data & Privacy" && (
        <div className="bg-white shadow rounded p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
          <p className="text-gray-500 mb-4">Manage your data and privacy settings.</p>

          {/* Export Data */}
          <div className="mb-6">
            <h4 className="font-medium">Export Your Data</h4>
            <p className="text-gray-500 text-sm mb-2">
              Download a copy of all your skill data and progress history.
            </p>
            <button
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
              onClick={handleExportData}
            >
              Export Data
            </button>
          </div>

          <hr />

          {/* Delete Account */}
          <div className="mt-6">
            <h4 className="font-medium text-red-600">Delete Account</h4>
            <p className="text-gray-500 text-sm mb-2">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Settings;
