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

// Main App Component
const Analysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const maxJobDescriptionLength = 2000;

  // Handle file selection from input
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
      // Here you would typically upload the file or process it
    }
  };

  // Handle drag over event for the drop zone
  const handleDragOver = (event: any) => {
    event.preventDefault(); // Prevent default to allow drop
    event.stopPropagation();
  };

  // Handle file drop event for the drop zone
  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Dropped file:", file.name);
    }
  };

  // Function to trigger the hidden file input click
  const triggerFileInput = () => {
    const input = document.getElementById("file-upload-input");
    if (input) {
      input.click();
    }
  };

  return (
    // The main container for the application, setting dark mode and Inter font
    <div className="min-h-screen bg-gray-950 text-gray-50 font-inter dark">
      {/* Main Content Area */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Upload Your Resume Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-50">
              Upload Your Resume
            </h2>
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
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

          {/* Paste Job Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-50">
              Paste Job Description
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Enter the full job description to get a precise analysis.
            </p>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e: any) => setJobDescription(e.target.value)}
              maxLength={maxJobDescriptionLength}
              className="w-full bg-gray-800 border border-gray-700 text-gray-50 rounded-md p-3 min-h-[150px] focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-right text-sm text-gray-500 mt-2">
              {jobDescription.length}/{maxJobDescriptionLength} characters
            </p>
          </motion.div>

          {/* Analyze Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg shadow-lg transition-all duration-300 w-full md:w-auto">
              Analyze Resume
            </Button>
          </motion.div>
        </div>

        {/* Right Column (Analysis Results) */}
        <div className="space-y-8">
          {/* AI Matching Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gray-900 border-gray-800 text-gray-50 rounded-xl shadow-lg">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold mb-2">
                  AI Matching Score
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your resume&apos;s compatibility with the job description.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6 text-6xl font-bold text-blue-400">
                0%
              </CardContent>
            </Card>
          </motion.div>

          {/* Keyword Analysis Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-900 border-gray-800 text-gray-50 rounded-xl shadow-lg">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold mb-2">
                  Keyword Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Key terms identified in your resume and the job description.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-gray-300 min-h-[100px]">
                {/* Placeholder for keyword analysis results */}
                <p>Keywords will appear here after analysis...</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personalized Suggestions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-gray-900 border-gray-800 text-gray-50 rounded-xl shadow-lg">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold mb-2">
                  Personalized Suggestions
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Actionable tips to improve your resume&apos;s impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-gray-300 min-h-[150px]">
                {/* Placeholder for suggestions */}
                <p>Suggestions for improvement will be displayed here...</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Download Suggestions as PDF Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <Button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 w-full md:w-auto">
              Download Suggestions as PDF
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
