import Banner from "@/components/Home/Banner/Banner";
import Contact from "@/components/Home/Contact/Contact";
import FAQ from "@/components/Home/FAQ/FAQ";
import Features from "@/components/Home/Features/Features";
import TeacherCarousel from "@/components/Home/TeacherCarousel/TeacherCarousel";
import TeacherSpeeches from "@/components/Home/TeacherSpeeches/TeacherSpeeches";
import Testimonials from "@/components/Home/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Banner />
      <TeacherSpeeches />
      <TeacherCarousel/>
      <Features/>
      <Testimonials/>
      <Contact/>
      <FAQ/>
    </>
  );
}
