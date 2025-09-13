// app/(dashboardLayout)/dashboard/students/result/page.tsx
import type { Metadata } from "next";
import Results from "@/components/Students/Result/Result";

export const metadata: Metadata = {
  title: "Student Results | MySchool",
  description: "View your academic results, grades, and performance details.",
};

const ResultPage = () => {
  return (
    <div>
      <Results />
    </div>
  );
};

export default ResultPage;
