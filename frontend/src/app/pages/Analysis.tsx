"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Analysis = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [MatchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const maxJobDescriptionLength = 2000;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const triggerFileInput = () => {
    const input = document.getElementById(
      "file-upload-input"
    ) as HTMLInputElement | null;
    input?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !jobDescription.trim()) {
      setError("Please upload a resume ");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("jobDescription", jobDescription);
      const res = await fetch("http://localhost:4000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to analyze resume.");
      }

      const data = await res.json();
      console.log(data.keywords);
      setMatchScore(data.ai_score || 0);
      setKeywords(data.keywords.missing || []);
      setMatchedKeywords(data.keywords.matched || []);
      setSuggestions(data.suggestions || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 font-inter dark">
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">Upload Your Resume</h2>
            <p className="text-gray-400 text-sm mb-4">
              Accepted formats: PDF, DOCX. Max file size: 5MB.
            </p>

            <div
              className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[180px]"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Input
                id="file-upload-input"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadCloud className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-400 mb-2">Drag & Drop your resume here</p>
              <p className="text-gray-500 mb-4">or</p>
              <Button
                onClick={triggerFileInput}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Browse
              </Button>
              {selectedFile && (
                <p className="mt-4 text-green-400">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">
              Paste Job Description
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Enter the full job description to get a precise analysis.
            </p>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              maxLength={maxJobDescriptionLength}
              className="w-full bg-gray-800 border border-gray-700 text-gray-50 rounded-md p-3 min-h-[150px]"
            />
            <p className="text-right text-sm text-gray-500 mt-2">
              {jobDescription.length}/{maxJobDescriptionLength} characters
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 w-full md:w-auto"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gray-900 border-gray-800 text-gray-50">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold">
                  AI Matching Score
                </CardTitle>
                <CardDescription>
                  Your resume’s compatibility with the job description.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center p-6 text-6xl font-bold text-blue-400">
                {matchScore !== null ? `${matchScore}%` : "0%"}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-900 border-gray-800 text-gray-50">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold">
                  Keyword Analysis
                </CardTitle>
                <CardDescription>
                  Matched keywords from your resume.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-gray-300">
                {keywords.length > 0 ? (
                  <div>
                    <Label className="mb-3">Matched key words</Label>
                    <ul className="list-disc ml-6 mb-10 space-y-1">
                      {MatchedKeywords.map((word, i) => (
                        <li key={i}>{word}</li>
                      ))}
                    </ul>
                    <Label className="mb-3">Missing key words</Label>
                    <ul className="list-disc ml-6 space-y-1">
                      {keywords.map((word, i) => (
                        <li key={i}>{word}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No keywords yet...</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-gray-900 border-gray-800 text-gray-50">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold">
                  Personalized Suggestions
                </CardTitle>
                <CardDescription>Tips to enhance your resume.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-gray-300">
                {suggestions.length > 0 ? (
                  <ul className="list-disc ml-6 space-y-1">
                    {suggestions.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No suggestions yet...</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <Button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 w-full md:w-auto">
              Download Suggestions as PDF
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
