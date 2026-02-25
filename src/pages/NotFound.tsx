import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEOHead from "@/components/SEOHead";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
          <p className="text-muted-foreground mb-8">{t('common.pageNotFoundDesc')}</p>
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
