import { Metadata } from "next";
import React from "react";
import AiBot from "../pages/Bot";

export const metadata: Metadata = {
  title: "Kendra Bot",
};
function page() {
  return (
    <div className="h-full max-w-5xl mx-auto border-2 rounded-lg">
      <AiBot />
    </div>
  );
}

export default page;
