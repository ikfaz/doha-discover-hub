import { useLocation, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SEOHead from "@/components/SEOHead";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Sun, Compass, Map, Home } from "lucide-react";

const KNOWN_PAGES = [
  { path: "/blog", label: "Blog" },
  { path: "/videos", label: "Videos" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/budget-planner", label: "Budget Planner" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-of-service", label: "Terms of Service" },
  { path: "/cookie-policy", label: "Cookie Policy" },
];

function getSuggestions(pathname: string) {
  const lower = pathname.toLowerCase();
  const segments = lower.split("/").filter(Boolean);
  const suggestions = KNOWN_PAGES.filter((page) => {
    const pageLower = page.path.toLowerCase();
    return segments.some(
      (seg) => pageLower.includes(seg) || seg.includes(pageLower.replace("/", ""))
    );
  });
  if (suggestions.length === 0) {
    return [KNOWN_PAGES[0], KNOWN_PAGES[3]]; // Blog & About as defaults
  }
  return suggestions.slice(0, 3);
}

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const suggestions = useMemo(() => getSuggestions(location.pathname), [location.pathname]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6E3]">
      <SEOHead title="Lost in the Desert - Page Not Found" description="It looks like you've wandered off the path." noindex />
      <NavBar />
      <div className="flex-grow flex items-center justify-center relative overflow-hidden py-20">
        {/* Decorative Sun */}
        <div className="absolute top-20 right-10 md:right-32 text-yellow-500/20 animate-pulse pointer-events-none">
            <Sun size={180} />
        </div>
        
        <div className="text-center px-4 z-10 max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="bg-orange-100 p-6 rounded-full border-4 border-orange-200 shadow-inner">
                <Compass size={64} className="text-orange-500" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-bold text-orange-900/20 mb-2 font-heading absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 select-none">404</h1>
          
          <h2 className="text-3xl md:text-4xl text-orange-900 mb-4 font-bold font-heading">Lost in the Desert?</h2>
          <p className="text-lg text-orange-800/70 mb-8 max-w-md mx-auto leading-relaxed">
            It seems you've wandered off the beaten path. The page you are looking for has been buried in the sands of time.
          </p>

          {/* Suggestions section */}
          <div className="mb-10">
            <p className="text-xs text-orange-600/60 mb-4 font-bold uppercase tracking-widest">Try these paths instead</p>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="inline-flex items-center gap-2 bg-white/60 hover:bg-white text-orange-900 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-orange-200/50 hover:border-orange-300 hover:shadow-md"
                >
                  <Map size={14} className="text-orange-500" />
                  {page.label}
                </Link>
              ))}
            </div>
          </div>

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-qatar-maroon text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-qatar-maroon/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Return to the Oasis
          </Link>
        </div>
        
        {/* Decorative Dunes */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-48 bg-gradient-to-t from-orange-200/30 to-transparent pointer-events-none"></div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
