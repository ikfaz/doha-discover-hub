import { Navigate, useLocation, useParams } from "react-router-dom";
import { getTourBySlug } from "@/data/tours";

const LegacyListingRedirect = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const location = useLocation();
  const suffix = `${location.search}${location.hash}`;
  const target = slug && getTourBySlug(slug) ? `/tour/${slug}` : "/blog";

  return <Navigate to={`${target}${suffix}`} replace />;
};

export default LegacyListingRedirect;
