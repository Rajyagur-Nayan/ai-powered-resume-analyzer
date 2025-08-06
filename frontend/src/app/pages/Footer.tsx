import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <footer className="bg-gray-900 py-10 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-400">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            {/* Logo in Footer */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M4.93 19.07l1.41-1.41" />
              <path d="M17.66 6.34l1.41-1.41" />
              <circle cx="12" cy="12" r="7" />
            </svg>
            <span className="text-xl font-bold text-gray-50">logo</span>
          </div>
          {/* Footer Navigation */}
          <nav className="space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Company
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Legal
            </a>
          </nav>
          {/* Copyright Information */}
          <p className="text-sm">
            © 2024 AI Resume Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
