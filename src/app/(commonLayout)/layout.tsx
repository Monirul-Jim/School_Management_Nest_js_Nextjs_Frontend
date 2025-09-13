import React from "react";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Home/Footer/Footer";

interface CommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 ">{children}</main>

      {/* Optional Footer */}
      <Footer />
    </div>
  );
};

export default CommonLayout;
