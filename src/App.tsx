import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useEffect, lazy, Suspense } from "react";

// Lazy load all route-level components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const BlogCategory = lazy(() => import("./pages/BlogCategory"));
const Videos = lazy(() => import("./pages/Videos"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Listing = lazy(() => import("./pages/Listing"));
const BudgetPlanner = lazy(() => import("./pages/BudgetPlanner"));
const TourDetail = lazy(() => import("./pages/TourDetail"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

// Helper components for parameterized redirects
const NavigateBlogSlug = () => {
  const slug = window.location.pathname.split('/blogs/')[1];
  return <Navigate to={`/blog/${slug}`} replace />;
};
const NavigateTourSlug = () => {
  const slug = window.location.pathname.split('/tours/')[1];
  return <Navigate to={`/tour/${slug}`} replace />;
};
const NavigateListingSlug = () => {
  const slug = window.location.pathname.split('/listings/')[1];
  return <Navigate to={`/listing/${slug}`} replace />;
};

const AppContent = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/category/:category" element={<BlogCategory />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/tour/:slug" element={<TourDetail />} />
          <Route path="/listing/:slug" element={<Listing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          {/* 301-style client-side redirects */}
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/blogs/:slug" element={<NavigateBlogSlug />} />
          <Route path="/tours/:slug" element={<NavigateTourSlug />} />
          <Route path="/listings/:slug" element={<NavigateListingSlug />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
          <Route path="/cookies" element={<Navigate to="/cookie-policy" replace />} />
          <Route path="/budget" element={<Navigate to="/budget-planner" replace />} />
          <Route path="/video" element={<Navigate to="/videos" replace />} />
          <Route path="/photos" element={<Navigate to="/gallery" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
