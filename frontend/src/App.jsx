import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import InactiveFiles from './pages/InactiveFiles';

export default function App() {
  // 1. GLOBAL SCAN STATE
  const [folderPath, setFolderPath] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // 2. GLOBAL UI STATE (Lifted from Home to persist across page navigations)
  const [activeTab, setActiveTab] = useState('organize');
  const [duplicateCount, setDuplicateCount] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [expandedClusters, setExpandedClusters] = useState(new Set());

  return (
    <Router>
      {/* Global Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="text-xl font-extrabold text-blue-600 tracking-tight">SmartFile AI</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              folderPath={folderPath} 
              setFolderPath={setFolderPath}
              isScanning={isScanning}
              setIsScanning={setIsScanning}
              scanResult={scanResult}
              setScanResult={setScanResult}
              // Pass down the lifted UI state
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              duplicateCount={duplicateCount}
              setDuplicateCount={setDuplicateCount}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              expandedClusters={expandedClusters}
              setExpandedClusters={setExpandedClusters}
            />
          } 
        />
        <Route path="/search" element={<SearchResults />} />
       <Route 
          path="/inactive-files" 
          element={
            <InactiveFiles 
              folderPath={folderPath} 
              scanResult={scanResult} 
              setScanResult={setScanResult} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}