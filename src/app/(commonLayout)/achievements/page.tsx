import Achievements from "@/components/Home/Achievements/Achievements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Achievements | Our Awards & Milestones",
  description: "Explore our school’s awards, student achievements, and milestones.",
};

const AchievementsPage = () => {
  return (
    <>
      <Achievements />
    </>
  );
};

export default AchievementsPage;
