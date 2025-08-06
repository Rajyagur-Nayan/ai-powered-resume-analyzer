"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, FileText, ArrowRight, Trash2, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

// Define interfaces for type safety
interface Activity {
  type: string;
  title: string;
  details: string;
  icon: JSX.Element;
}

interface Analysis {
  id: number;
  title: string;
  date: string;
  time: string;
  score: number;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Initial recent activity data
const recentActivity: Activity[] = [
  {
    type: "Resume",
    title: "Resume for Senior Dev Role",
    details: "Last analyzed: 2 days ago, Score: 85%",
    icon: <FileText className="h-5 w-5 text-gray-400" />,
  },
  {
    type: "Job Description",
    title: "Job Description: Data Scientist",
    details: "Viewed 1 week ago",
    icon: <FileText className="h-5 w-5 text-gray-400" />,
  },
];

// Initial analysis history data
const initialAnalysisHistory: Analysis[] = [
  {
    id: 1,
    title: "Software Engineer Resume v3",
    date: "2024-07-20",
    time: "14:30",
    score: 88,
  },
  {
    id: 2,
    title: "Product Manager Resume",
    date: "2024-07-18",
    time: "10:15",
    score: 75,
  },
  {
    id: 3,
    title: "Marketing Specialist Portfolio",
    date: "2024-07-15",
    time: "09:00",
    score: 92,
  },
  {
    id: 4,
    title: "Data Analyst Resume v2",
    date: "2024-07-12",
    time: "16:45",
    score: 68,
  },
  {
    id: 5,
    title: "UI/UX Designer Resume",
    date: "2024-07-10",
    time: "11:00",
    score: 81,
  },
  {
    id: 6,
    title: "Cybersecurity Analyst Resume",
    date: "2024-07-08",
    time: "13:20",
    score: 79,
  },
  {
    id: 7,
    title: "Sales Lead Resume",
    date: "2024-07-05",
    time: "17:00",
    score: 91,
  },
  {
    id: 8,
    title: "Financial Advisor Resume",
    date: "2024-07-03",
    time: "10:40",
    score: 83,
  },
];

// Mock user data (replace with real user data from your auth system)
const user: User = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
};

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [analysisHistory, setAnalysisHistory] =
    useState<Analysis[]>(initialAnalysisHistory);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Delete handler function
  const handleDelete = (id: number) => {
    setAnalysisHistory(analysisHistory.filter((analysis) => analysis.id !== id));
  };

  // Logout handler (placeholder, implement your logout logic here)
  const handleLogout = () => {
    console.log("User logged out");
    // Add your logout logic here, e.g., clear auth tokens, redirect to login page
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Generate avatar fallback from first letters of first and last name
  const avatarFallback = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } font-sans flex flex-col`}
    >
      {/* Top Header */}
      <header
        className={`sticky top-0 z-50 ${
          darkMode ? "bg-gray-800 shadow-xl" : "bg-white shadow-sm"
        }`}
      >
        <nav className="mx-auto flex flex-col sm:flex-row max-w-full items-center justify-between p-4 px-4 sm:px-8">
          <div className="flex items-center space-x-2 text-xl font-bold mb-2 sm:mb-0">
            <span className="text-blue-500">::</span>
            <span>logo</span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-4 sm:space-x-6">
            <a
              href="#"
              className={`text-sm font-medium ${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </a>
            <a
              href="#"
              className={`text-sm font-medium ${
                darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Analysis
            </a>
            <a
              href="#"
              className={`text-sm font-medium ${
                darkMode
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : "text-blue-500 border-b-2 border-blue-500"
              }`}
            >
              Profile/History
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={`${
                darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar className="ml-2">
              <AvatarImage
                src="https://placehold.co/40x40/e2e8f0/64748b?text=JD"
                alt="User Profile"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Profile & History</h1>

          {/* User Information Section */}
          <motion.div
            className="mb-8"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5 }}
          >
            <Card
              className={`rounded-xl shadow-md p-4 md:p-6 ${
                darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
              }`}
            >
              <CardTitle
                className={`text-lg md:text-xl font-bold mb-2 ${
                  darkMode ? "text-gray-50" : "text-gray-800"
                }`}
              >
                Profile Information
              </CardTitle>
              <p
                className={`text-sm mb-6 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Update your personal details and avatar.
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="https://placehold.co/80x80/e2e8f0/64748b?text=AJ"
                    alt="Alex Johnson"
                  />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <p className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p
                    className={`text-base ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Product Manager
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`sm:ml-auto ${
                        darkMode
                          ? "text-gray-400 hover:bg-gray-700"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={`${
                      darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
                    }`}
                  >
                    <DialogHeader>
                      <DialogTitle>User Settings</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src="https://placehold.co/80x80/e2e8f0/64748b?text=AJ"
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-lg font-semibold">
                          {user.firstName} {user.lastName}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {user.email}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="w-full max-w-xs bg-red-500 text-white hover:bg-red-600"
                      >
                        Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity Section */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Recent Activity</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {recentActivity.map((activity, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card
                  className={`rounded-xl shadow-md p-4 md:p-6 flex items-center space-x-4 ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${
                        darkMode ? "text-gray-50" : "text-gray-800"
                      }`}
                    >
                      {activity.title}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {activity.details}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${
                      darkMode
                        ? "text-gray-400 hover:bg-gray-700"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Analysis History Section */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Analysis History</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {analysisHistory.map((analysis) => (
              <motion.div key={analysis.id} variants={cardVariants}>
                <Card
                  className={`rounded-xl shadow-md p-4 md:p-6 flex flex-col h-full ${
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                  }`}
                >
                  <CardTitle
                    className={`text-lg font-semibold mb-2 ${
                      darkMode ? "text-gray-50" : "text-gray-800"
                    }`}
                  >
                    {analysis.title}
                  </CardTitle>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } mb-4`}
                  >
                    {analysis.date} {analysis.time}
                  </div>
                  <div className="flex items-center mb-4">
                    <Progress
                      value={analysis.score}
                      className={`h-2 flex-1 ${
                        darkMode
                          ? "bg-gray-700 [&>*]:bg-blue-500"
                          : "bg-gray-200 [&>*]:bg-blue-500"
                      }`}
                    />
                    <span
                      className={`ml-3 text-sm font-semibold ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {analysis.score}%
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-auto">
                    <Button
                      variant="outline"
                      className={`flex-1 ${
                        darkMode
                          ? "bg-gray-700 text-gray-50 border-gray-600 hover:bg-gray-600"
                          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Reanalyze
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDelete(analysis.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}