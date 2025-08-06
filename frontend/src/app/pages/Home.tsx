"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UploadCloud,
  ClipboardList,
  Lightbulb,
  CheckCircle,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Main App Component
export const Home = () => {
  return (
    // The main container for the application, setting dark mode and Inter font
    <div className="min-h-screen bg-gray-950 text-gray-50 font-inter dark">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-4 text-gray-50"
        >
          AI Resume Analyzer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-400 mb-8"
        >
          Get instant feedback on your resume to land your dream job.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/analysis"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>
        {/* Placeholder for the resume image */}
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          src="/img1.jpeg"
          alt="Resume illustration"
          className="mt-12 rounded-lg shadow-xl"
        />
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-900">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-50"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Upload Your Resume */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-gray-800 border-gray-700 text-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <UploadCloud className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle className="text-2xl font-semibold mb-2">
                  Upload Your Resume
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Securely upload your resume in PDF or DOCX format.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Card 2: Paste Job Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gray-800 border-gray-700 text-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <ClipboardList className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle className="text-2xl font-semibold mb-2">
                  Paste Job Description
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Input the job description for a targeted analysis.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Card 3: Get AI Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-gray-800 border-gray-700 text-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center text-center p-6">
                <Lightbulb className="w-12 h-12 text-blue-400 mb-4" />
                <CardTitle className="text-2xl font-semibold mb-2">
                  Get AI Feedback
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Receive instant matching score and personalized suggestions.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Extra Content: Features Section */}
      <section className="py-20 px-4 bg-gray-950">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-50"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-start space-x-4 bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-2">
                Precision Matching
              </h3>
              <p className="text-gray-400">
                Our AI algorithm precisely matches your resume to job
                descriptions, highlighting key areas for improvement to maximize
                your chances.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-start space-x-4 bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-2">
                Score & Ranking
              </h3>
              <p className="text-gray-400">
                Get an objective score for your resume&apos;s effectiveness and
                see how it ranks against industry standards and specific job
                requirements.
              </p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-start space-x-4 bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Users className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-2">
                Community Insights
              </h3>
              <p className="text-gray-400">
                Leverage insights from a vast community of successful job
                seekers and recruiters to refine your resume strategy.
              </p>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-start space-x-4 bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <Lightbulb className="w-8 h-8 text-orange-400 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-50 mb-2">
                Actionable Advice
              </h3>
              <p className="text-gray-400">
                Receive clear, actionable advice on how to improve your
                resume&apos;s keywords, formatting, and content for maximum
                impact.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
