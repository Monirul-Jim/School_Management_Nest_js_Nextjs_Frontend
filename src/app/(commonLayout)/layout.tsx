import Navbar from "@/components/Home/Navbar/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>
        <Navbar/>
        {children}</div>
    </>
  );
};

export default CommonLayout;