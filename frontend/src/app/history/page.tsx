"use client";
import { useEffect, useState } from "react";
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
import { Settings, FileText, ArrowRight, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useAuth } from "../pages/auth/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";

// Define interfaces for type safety
interface Activity {
  type: string;
  title: string;
  details: string;
  icon: React.ReactNode;
}

interface Analysis {
  history_id: number;
  resume_title: string;
  created_at: string;
  ai_score: number;
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

// Mock user data (replace with real user data from your auth system)
const user: User = {
  firstName: "Alex",
  lastName: "Johnson",
  email: "alex.johnson@example.com",
};

export default function App() {
  const [darkMode] = useState<boolean>(true);
  const [analysisHistory, setAnalysisHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleUpdateProfile = async (updatedData: {
    name: string;
    email: string;
  }) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/profile",
        updatedData,
        {
          withCredentials: true, // Send cookies if auth uses sessions
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success (e.g., update UI or show toast)
      console.log("Profile updated:", response.data);
      setProfile(response.data); // Optionally update local state
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:4000/history", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        setAnalysisHistory(res.data); // assuming array of history items
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await fetch("http://localhost:4000/profile", {
  //         credentials: "include", // include cookies
  //       });
  //       if (!res.ok) throw new Error("Failed to load profile");
  //       const data = await res.json();
  //       console.log(res);
  //       setProfile(data); // assuming response = { name: 'John', email: 'john@example.com' }
  //     } catch (err) {
  //       console.error("Error fetching profile:", err);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  const { logout } = useAuth();

  // Delete handler function
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/history/delete`, {
        method: "DELETE",
        credentials: "include", // or use "DELETE" based on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ historyId: id }),
      });
      if (!response.ok) throw new Error("Failed to delete history");
      toast.success("History deleted successfully!");
      setAnalysisHistory((prev) =>
        prev.filter((analysis) => analysis.history_id !== id)
      );
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete history");
    }
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
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Profile & History
          </h1>

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
                  <p className="text-xl font-semibold">{profile?.name}</p>
                  <p
                    className={`text-base ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {profile?.email}
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
                      darkMode
                        ? "bg-gray-800 text-gray-100"
                        : "bg-white text-gray-800"
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
                      <div className="flex flex-col w-full max-w-sm space-y-2">
                        <Input
                          type="text"
                          value={profile?.name || ""}
                          onChange={(e) =>
                            setProfile((prev) =>
                              prev ? { ...prev, name: e.target.value } : prev
                            )
                          }
                          placeholder="Name"
                          className="px-3 py-2 rounded-md border border-gray-600 bg-transparent text-sm"
                        />
                        <Input
                          type="email"
                          value={profile?.email || ""}
                          onChange={(e) =>
                            setProfile((prev) =>
                              prev ? { ...prev, email: e.target.value } : prev
                            )
                          }
                          placeholder="Email"
                          className="px-3 py-2 rounded-md border border-gray-600 bg-transparent text-sm"
                        />
                      </div>
                      <Button
                        className="w-full max-w-xs bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() =>
                          profile &&
                          handleUpdateProfile({
                            name: profile.name,
                            email: profile.email,
                          })
                        }
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={logout}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Recent Activity
          </h2>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Analysis History
          </h2>
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
            {loading ? (
              <p className="text-gray-400">Loading history...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              analysisHistory.map((analysis) => (
                <motion.div key={analysis.history_id} variants={cardVariants}>
                  <Card
                    className={`rounded-xl shadow-md p-4 md:p-6 flex flex-col h-full ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700"
                        : "bg-white"
                    }`}
                  >
                    <CardTitle
                      className={`text-lg font-semibold mb-2 ${
                        darkMode ? "text-gray-50" : "text-gray-800"
                      }`}
                    >
                      {analysis.resume_title}
                    </CardTitle>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4`}
                    >
                      {analysis.created_at}
                    </div>
                    <div className="flex items-center mb-4">
                      <Progress
                        value={analysis.ai_score}
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
                        {analysis.ai_score}%
                      </span>
                    </div>
                    <div className="flex space-x-2 mt-auto">
                      <Link
                        href="/analysis"
                        className={`flex text-sm  md:px-4 md:py-2 px-5 py-2 rounded-xl items-center justify-center cursor-pointer ${
                          darkMode
                            ? "bg-gray-700 text-gray-50 border-gray-600 hover:bg-gray-600"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        Reanalyze
                      </Link>
                      <Button
                        variant="destructive"
                        className="flex-1 bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                        onClick={() => handleDelete(analysis.history_id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
