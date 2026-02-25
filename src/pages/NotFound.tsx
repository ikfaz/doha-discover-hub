import { useLocation, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SEOHead from "@/components/SEOHead";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Page Not Found - Experience Doha" description="The page you're looking for doesn't exist." noindex />
      <NavBar />
      <div className="flex-grow flex items-center justify-center bg-muted/30">
        <div className="text-center px-4">
          <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl text-foreground mb-2 font-heading">{t('common.pageNotFound')}</p>
          <p className="text-muted-foreground mb-6">{t('common.pageNotFoundDesc')}</p>
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-3">Were you looking for one of these?</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="inline-flex items-center bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-accent/80 transition-colors"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/" className="inline-flex items-center bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-medium hover:bg-secondary/90 transition-colors">
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
