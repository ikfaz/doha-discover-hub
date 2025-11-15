import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Listing = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="content-container">
          <h1 className="section-title">
            {slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
          <div className="mt-8">
            <p className="text-muted-foreground">Listing details coming soon...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Listing;
