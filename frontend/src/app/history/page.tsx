"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { Label } from "@/components/ui/label";

interface Analysis {
  history_id: number;
  resume_title: string;
  created_at: string;
  ai_score: number;
  job_description: string;
  keywords?: {
    missing?: string[];
  };
}

export default function App() {
  const [darkMode] = useState<boolean>(true);
  const [analysisHistory, setAnalysisHistory] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const res = await axios.get(`${apiUrl}/history`, {
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

  // Delete handler function
  const handleDelete = async (id: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/history/delete`, {
        method: "DELETE",
        credentials: "include", // or use "DELETE" based on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ historyId: id }),
      });
      if (!response.ok) throw new Error("Failed to delete history");
      console.log(response);
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

  return (
    <div
      className={`min-h-screen  ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      } font-sans flex flex-col`}
    >
      <h2 className="md:ml-20 ml-10 mt-10 text-2xl md:text-3xl font-bold mb-6">
        Analysis History
      </h2>
      <motion.div
        className="md:ml-20 ml-10 mb-10 mr-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                  darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
                }`}
              >
                <CardTitle
                  className={`text-lg font-semibold ${
                    darkMode ? "text-blue-500" : "text-gray-800"
                  }`}
                >
                  {analysis.resume_title}
                </CardTitle>
                <CardContent
                  className={`text-sm font-semibold  ${
                    darkMode ? "text-gray-50" : "text-gray-800"
                  }`}
                >
                  <Label className="mb-1.5 text-lg text-purple-500 ">
                    1) Job Description
                  </Label>
                  {analysis.job_description}
                  <Label className="mb-1.5 text-lg text-purple-600 mt-2">
                    2)Missing KeyWords
                  </Label>
                  <ul className="list-disc ml-6 space-y-1">
                    {Array.isArray(analysis.keywords?.missing) &&
                      analysis.keywords!.missing.map(
                        (word: string, i: number) => <li key={i}>{word}</li>
                      )}
                  </ul>

                  <Label className="mb-1.5 text-lg text-purple-600 mt-2">
                    3) Resume Score
                  </Label>
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
                </CardContent>
                <div className="flex space-x-2 mt-auto">
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
    </div>
  );
}
