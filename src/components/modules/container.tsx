import { ReactNode } from "react";
import Topbar from "./topbar";
import Navbar from "./navbar";
import Footer from "./footer";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Topbar />
      <div className="px-3 sm:!px-8 xl:!px-40">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Container;