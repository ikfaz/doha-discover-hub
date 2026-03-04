import { useParams, Link } from 'react-router-dom';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ViatorBanner from '@/components/ViatorBanner';
import ViatorArticleBanner from '@/components/ViatorArticleBanner';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Calendar, Clock, Facebook, Twitter, Share2, Home } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { loadBlogPostBySlug } from '@/data/articles/blog-post-loaders';
import { blogMetaPosts } from '@/data/articles/blog-meta';
import { categoryToSlug, getBlogList } from '@/lib/blog';
import { buildArticleInternalLinkBudget } from '@/lib/article-link-budget';
import { getPrimaryTopicMetaForPost } from '@/lib/topic-hubs';
import { toJsonLdAuthor } from '@/lib/structured-data';
import { fixMojibake } from '@/lib/text';
import { getHistoricalSlugCanonicalNote } from '@/lib/slug-strategy';
import NotFound from '@/pages/NotFound';
import type { ReactNode } from 'react';
import type { ArticleData } from '@/data/articles/types';

const BASE_URL = 'https://experiencedoha.com';

const SchoolComparisonTool = lazy(() => import('@/components/SchoolComparisonTool'));
const SchoolFeeCalculator = lazy(() => import('@/components/SchoolFeeCalculator'));
const VisaChecklistGenerator = lazy(() => import('@/components/VisaChecklistGenerator'));
const DrivingLicenseChecker = lazy(() => import('@/components/DrivingLicenseChecker'));
const MentalHealthDirectory = lazy(() => import('@/components/MentalHealthDirectory'));
const TherapyCostCalculator = lazy(() =>
  import('@/components/TherapyCostCalculator').then((module) => ({
    default: module.TherapyCostCalculator,
  })),
);
const BankComparison = lazy(() =>
  import('@/components/BankComparison').then((module) => ({
    default: module.BankComparison,
  })),
);
const MobilePlanComparison = lazy(() =>
  import('@/components/MobilePlanComparison').then((module) => ({
    default: module.MobilePlanComparison,
  })),
);
const RoamingCostComparison = lazy(() =>
  import('@/components/RoamingCostComparison').then((module) => ({
    default: module.RoamingCostComparison,
  })),
);
const GroceryPriceComparison = lazy(() =>
  import('@/components/GroceryPriceComparison').then((module) => ({
    default: module.GroceryPriceComparison,
  })),
);
const WeeklyMealPlanner = lazy(() =>
  import('@/components/WeeklyMealPlanner').then((module) => ({
    default: module.WeeklyMealPlanner,
  })),
);
const MetroFareCalculator = lazy(() =>
  import('@/components/MetroFareCalculator').then((module) => ({
    default: module.MetroFareCalculator,
  })),
);
const PetImportChecklist = lazy(() => import('@/components/PetImportChecklist'));
const VeterinaryCostEstimator = lazy(() => import('@/components/VeterinaryCostEstimator'));
const DomesticWorkerCostCalculator = lazy(() => import('@/components/DomesticWorkerCostCalculator'));
const GymMembershipComparison = lazy(() => import('@/components/GymMembershipComparison'));
const RemoteWorkCafeFinder = lazy(() => import('@/components/RemoteWorkCafeFinder'));
const QDCPermitCalculator = lazy(() => import('@/components/QDCPermitCalculator'));
const HotelBarFinder = lazy(() => import('@/components/HotelBarFinder'));
const CityCostComparison = lazy(() => import('@/components/CityCostComparison'));
const RentPriceComparison = lazy(() => import('@/components/RentPriceComparison'));
const JobSearchStrategyGuide = lazy(() => import('@/components/JobSearchStrategyGuide'));
const CVTemplateGenerator = lazy(() =>
  import('@/components/CVTemplateGenerator').then((module) => ({
    default: module.CVTemplateGenerator,
  })),
);
const SalaryCalculator = lazy(() =>
  import('@/components/SalaryCalculator').then((module) => ({
    default: module.SalaryCalculator,
  })),
);
const TaxSavingsCalculator = lazy(() =>
  import('@/components/TaxSavingsCalculator').then((module) => ({
    default: module.TaxSavingsCalculator,
  })),
);
const RentalPropertyROICalculator = lazy(() =>
  import('@/components/RentalPropertyROICalculator').then((module) => ({
    default: module.RentalPropertyROICalculator,
  })),
);
const VisaApplicationTracker = lazy(() =>
  import('@/components/VisaApplicationTracker').then((module) => ({
    default: module.VisaApplicationTracker,
  })),
);
const LaborRightsCalculator = lazy(() =>
  import('@/components/LaborRightsCalculator').then((module) => ({
    default: module.LaborRightsCalculator,
  })),
);
const EOSGCalculator = lazy(() =>
  import('@/components/EOSGCalculator').then((module) => ({
    default: module.EOSGCalculator,
  })),
);
const ContractNegotiationChecklist = lazy(() =>
  import('@/components/ContractNegotiationChecklist').then((module) => ({
    default: module.ContractNegotiationChecklist,
  })),
);

const InteractiveToolFallback = () => (
  <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
    Loading interactive tool...
  </div>
);

const withLazyTool = (component: ReactNode): ReactNode => (
  <Suspense fallback={<InteractiveToolFallback />}>{component}</Suspense>
);

// Slug-based component injection map
const slugComponents: Record<string, { splitAt: string; component: ReactNode; splitAt2?: string; component2?: ReactNode }[]> = {
  'end-of-service-gratuity-qatar-2025': [
    { splitAt: '<h2 id="calculation">', component: withLazyTool(<EOSGCalculator />) },
  ],
  'qatar-labor-law-reforms-2025': [
    { splitAt: '<h2 id="protection">', component: withLazyTool(<LaborRightsCalculator />) },
  ],
  'qatar-work-visa-guide-2025': [
    { splitAt: '<h2 id="phase-2">', component: withLazyTool(<VisaApplicationTracker />) },
  ],
  'qatar-tax-guide-2025': [
    {
      splitAt: '<h2 id="corporate-tax">',
      component: withLazyTool(<TaxSavingsCalculator />),
      splitAt2: '<h2 id="vat">',
      component2: withLazyTool(<RentalPropertyROICalculator />),
    },
  ],
  'expat-salaries-doha-2025': [
    {
      splitAt: '<h2 id="benchmarks">',
      component: withLazyTool(<TaxSavingsCalculator />),
      splitAt2: '<h2 id="package">',
      component2: withLazyTool(<SalaryCalculator />),
    },
  ],
  'job-market-qatar-2025': [
    {
      splitAt: '<h2 id="trends">',
      component: withLazyTool(
        <>
          <JobSearchStrategyGuide />
          <div className="not-prose my-12">
            <CVTemplateGenerator />
          </div>
        </>,
      ),
    },
  ],
  'housing-rent-doha-2025': [
    { splitAt: '<h2 id="legal">', component: withLazyTool(<RentPriceComparison />) },
  ],
  'cost-of-living-doha-dubai-riyadh': [
    { splitAt: '<h2 id="strategies">', component: withLazyTool(<CityCostComparison />) },
  ],
  'international-schools-qatar-2025': [
    { splitAt: '<h2 id="fees">', component: withLazyTool(<SchoolFeeCalculator />) },
    { splitAt: '<h2 id="budget">', component: withLazyTool(<SchoolComparisonTool />) },
  ],
  'qatar-visa-rules-expats-2025': [
    { splitAt: '<h2 id="family-visa">', component: withLazyTool(<VisaChecklistGenerator />) },
  ],
  'driving-doha-2025-guide': [
    { splitAt: '<h2 id="rules">', component: withLazyTool(<DrivingLicenseChecker />) },
  ],
  'lgbtq-experiences-qatar-2025': [
    {
      splitAt: '<h2 id="community">',
      component: withLazyTool(
        <>
          <MentalHealthDirectory />
          <div className="not-prose my-12">
            <TherapyCostCalculator />
          </div>
        </>,
      ),
    },
  ],
  'bank-account-qatar-guide': [
    { splitAt: '<h2 id="decision">', component: withLazyTool(<BankComparison />) },
  ],
  'mobile-plans-qatar-guide': [
    {
      splitAt: '<h2 id="internet">',
      component: withLazyTool(<MobilePlanComparison />),
      splitAt2: '<h2 id="5g">',
      component2: withLazyTool(<RoamingCostComparison />),
    },
  ],
  'grocery-shopping-doha-guide': [
    {
      splitAt: '<h2 id="others">',
      component: withLazyTool(<GroceryPriceComparison />),
      splitAt2: '<h2 id="delivery">',
      component2: withLazyTool(<WeeklyMealPlanner />),
    },
  ],
  'remote-work-cafes-doha-guide': [
    { splitAt: '<h2 id="coworking">', component: withLazyTool(<RemoteWorkCafeFinder />) },
  ],
  'alcohol-guide-doha': [
    {
      splitAt: '<h2 id="spending-limits">',
      component: withLazyTool(<QDCPermitCalculator />),
      splitAt2: '<h2 id="prohibited">',
      component2: withLazyTool(<HotelBarFinder />),
    },
  ],
  'gyms-fitness-doha-guide': [
    { splitAt: '<h2 id="ladies">', component: withLazyTool(<GymMembershipComparison />) },
  ],
  'hiring-maid-nanny-qatar-guide': [
    { splitAt: '<h2 id="contracts">', component: withLazyTool(<DomesticWorkerCostCalculator />) },
  ],
  'pet-import-qatar-guide': [
    {
      splitAt: '<h2 id="quarantine">',
      component: withLazyTool(<PetImportChecklist />),
      splitAt2: '<h2 id="living">',
      component2: withLazyTool(<VeterinaryCostEstimator />),
    },
  ],
  'doha-metro-2025-guide': [
    { splitAt: '<h2 id="hours">', component: withLazyTool(<MetroFareCalculator />) },
  ],
};

// Extra component for end-of-service article
const endOfServiceExtra = withLazyTool(<ContractNegotiationChecklist />);

function renderArticleContent(slug: string, content: string) {
  // Special case: end-of-service has an extra component at the end
  if (slug === 'end-of-service-gratuity-qatar-2025') {
    const injections = slugComponents[slug];
    if (injections && injections[0]) {
      const { splitAt } = injections[0];
      const parts = content.split(splitAt);
      return (
        <div className="prose prose-lg max-w-none space-y-8">
          <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
          <div className="not-prose my-12">{withLazyTool(<EOSGCalculator />)}</div>
          <div dangerouslySetInnerHTML={{ __html: splitAt + parts[1] }} />
          <div className="not-prose my-12">{endOfServiceExtra}</div>
        </div>
      );
    }
  }

  // Special case: international-schools has multiple separate injection points
  if (slug === 'international-schools-qatar-2025') {
    const feeParts = content.split('<h2 id="fees">');
    const waitlistParts = feeParts[1]?.split('<h2 id="waitlists">') || ['', ''];
    const budgetParts = (waitlistParts[1] || '').split('<h2 id="budget">');
    return (
      <div className="prose prose-lg max-w-none space-y-8">
        <div dangerouslySetInnerHTML={{ __html: feeParts[0] }} />
        <div className="not-prose my-12">{withLazyTool(<SchoolFeeCalculator />)}</div>
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="fees">' + waitlistParts[0] }} />
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="waitlists">' + budgetParts[0] }} />
        <div className="not-prose my-12">{withLazyTool(<SchoolComparisonTool />)}</div>
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="budget">' + budgetParts[1] }} />
      </div>
    );
  }

  // Special case: expat-salaries has two different split points with content between
  if (slug === 'expat-salaries-doha-2025') {
    const benchParts = content.split('<h2 id="benchmarks">');
    const pkgParts = (benchParts[1] || '').split('<h2 id="package">');
    return (
      <div className="prose prose-lg max-w-none space-y-8">
        <div dangerouslySetInnerHTML={{ __html: benchParts[0] }} />
        <div className="not-prose my-12">{withLazyTool(<TaxSavingsCalculator />)}</div>
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="benchmarks">' + pkgParts[0] }} />
        <div className="not-prose my-12">{withLazyTool(<SalaryCalculator />)}</div>
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="package">' + pkgParts[1] }} />
      </div>
    );
  }

  // Generic injection for slugs with components
  const injections = slugComponents[slug];
  if (injections && injections.length > 0) {
    const injection = injections[0];
    const { splitAt, component, splitAt2, component2 } = injection;
    
    if (splitAt2 && component2) {
      // Two injection points
      const parts1 = content.split(splitAt);
      const parts2 = (parts1[1] || '').split(splitAt2);
      return (
        <div className="prose prose-lg max-w-none space-y-8">
          <div dangerouslySetInnerHTML={{ __html: parts1[0] }} />
          <div className="not-prose my-12">{component}</div>
          <div dangerouslySetInnerHTML={{ __html: splitAt + parts2[0] }} />
          <div className="not-prose my-12">{component2}</div>
          <div dangerouslySetInnerHTML={{ __html: splitAt2 + parts2[1] }} />
        </div>
      );
    }
    
    // Single injection point
    const parts = content.split(splitAt);
    return (
      <div className="prose prose-lg max-w-none space-y-8">
        <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
        <div className="not-prose my-12">{component}</div>
        <div dangerouslySetInnerHTML={{ __html: splitAt + parts[1] }} />
      </div>
    );
  }

  // Default: split content at midpoint h2 and insert Viator banner
  const h2Matches = [...content.matchAll(/<h2[\s>]/gi)];
  if (h2Matches.length >= 2) {
    const midIndex = Math.floor(h2Matches.length / 2);
    const splitPos = h2Matches[midIndex].index!;
    return (
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content.substring(0, splitPos) }} />
        <ViatorArticleBanner />
        <div dangerouslySetInnerHTML={{ __html: content.substring(splitPos) }} />
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content.substring(0, Math.floor(content.length / 2)) }} />
      <ViatorArticleBanner />
      <div dangerouslySetInnerHTML={{ __html: content.substring(Math.floor(content.length / 2)) }} />
    </div>
  );
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const posts = useMemo(() => getBlogList(), []);
  const [post, setPost] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadPost = async () => {
      if (!slug) {
        if (!isCancelled) {
          setPost(null);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      const loadedPost = await loadBlogPostBySlug(slug);

      if (!isCancelled) {
        setPost(loadedPost);
        setIsLoading(false);
      }
    };

    loadPost();

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  const currentListPost = useMemo(() => {
    if (!post || !slug) {
      return null;
    }

    const existing = posts.find((candidate) => candidate.slug === slug);
    if (existing) {
      return existing;
    }

    return {
      id: post.id,
      slug,
      title: post.title,
      excerpt: post.excerpt || post.metaDescription || '',
      imageUrl: String(post.imageUrl || ''),
      category: post.category,
      date: post.date,
      isoDate: post.isoDate,
      tags: post.tags || [],
    };
  }, [post, posts, slug]);

  const internalLinkBudget = useMemo(() => {
    if (!currentListPost) {
      return null;
    }
    return buildArticleInternalLinkBudget(currentListPost, posts);
  }, [currentListPost, posts]);

  const dynamicRelated = internalLinkBudget?.siblingPosts ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const articleDescription = fixMojibake(post.metaDescription || post.excerpt || post.content.substring(0, 155).replace(/<[^>]*>/g, ''));
  const metadataPost = slug ? blogMetaPosts[slug] : undefined;
  const articlePublishedIsoDate = post.isoDate || metadataPost?.isoDate || post.date;
  const articleModifiedIsoDate = post.isoModifiedDate || metadataPost?.isoModifiedDate || articlePublishedIsoDate;
  const categorySlug = categoryToSlug(post.category);
  const safeTitle = fixMojibake(post.title);
  const safeCategory = fixMojibake(post.category);
  const safeDate = fixMojibake(post.date);
  const safeAuthor = fixMojibake(post.author);
  const safeContent = fixMojibake(post.content);
  const historicalSlugNote = slug ? getHistoricalSlugCanonicalNote(slug, safeTitle) : null;
  const primaryTopicMeta = slug ? getPrimaryTopicMetaForPost(slug) : undefined;
  const articleImageAbsolute =
    typeof post.imageUrl === 'string'
      ? post.imageUrl.startsWith('http')
        ? post.imageUrl
        : `${BASE_URL}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`
      : undefined;
  const canonicalArticleUrl = `${BASE_URL}/blog/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": safeTitle,
    "image": articleImageAbsolute,
    "author": toJsonLdAuthor(safeAuthor),
    "publisher": {
      "@type": "Organization",
      "name": "Experience Doha",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "datePublished": articlePublishedIsoDate,
    "dateModified": articleModifiedIsoDate,
    "description": articleDescription,
    "inLanguage": "en",
    "articleSection": safeCategory,
    "isAccessibleForFree": true,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalArticleUrl
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://experiencedoha.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://experiencedoha.com/blog" },
      { "@type": "ListItem", "position": 3, "name": safeCategory, "item": `https://experiencedoha.com/blog/category/${categorySlug}` },
      { "@type": "ListItem", "position": 4, "name": safeTitle }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${safeTitle} | Doha Guide`}
        description={articleDescription}
        image={articleImageAbsolute}
        type="article"
        publishedTime={articlePublishedIsoDate}
        modifiedTime={articleModifiedIsoDate}
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
      />
      <NavBar />
      
      <main className="flex-1">
        <article>
          {/* Breadcrumb Navigation */}
          <div className="content-container pt-4 pb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/"><Home className="h-4 w-4" /></Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/blog/category/${categorySlug}`}>{safeCategory}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-[400px]">{safeTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero Section */}
          <div className="relative h-[280px] sm:h-[350px] md:h-[400px] w-full">
            <img
              src={post.imageUrl}
              alt={`${safeTitle} - ${safeCategory} guide for Doha, Qatar`}
              className="w-full h-full object-cover"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              width={1600}
              height={900}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 content-container pb-8">
              <Badge className="mb-4 bg-qatar-gold text-qatar-maroon hover:bg-qatar-gold">
                {safeCategory}
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
                {safeTitle}
              </h1>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {safeDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <span>By {safeAuthor}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="content-container py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {historicalSlugNote && (
                  <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <strong>Canonical URL note:</strong> {historicalSlugNote}
                  </div>
                )}

                {/* Table of Contents */}
                {post.tableOfContents && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-qatar-maroon">
                    <h3 className="text-lg font-bold mb-4 text-qatar-maroon">Table of Contents</h3>
                    <nav className="space-y-2">
                      {post.tableOfContents.map((item: { title: string; id: string }) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm text-gray-900 hover:text-qatar-gold transition-colors py-2.5 hover:translate-x-1 transform duration-200 font-medium"
                          onClick={() => {
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {"->"} {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 pb-8 border-b">
                  <span className="text-sm font-medium text-gray-600">Share this article:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                  >
                    <Facebook className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${safeTitle}`, '_blank')}
                  >
                    <Twitter className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Twitter</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Share2 className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Copy Link</span>
                  </Button>
                </div>

                {/* Article Content with Component Injection */}
                {renderArticleContent(slug || 'default', safeContent)}

                {primaryTopicMeta && (
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-sm font-medium text-gray-600 mb-4">Topic:</h3>
                    <Link to={primaryTopicMeta.href}>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/60">
                        {primaryTopicMeta.name}
                      </Badge>
                    </Link>
                  </div>
                )}

                {internalLinkBudget?.parentHubLink && (
                  <div className="mt-8 rounded-lg border border-qatar-maroon/20 bg-qatar-maroon/5 p-6">
                    <h3 className="text-lg font-semibold text-qatar-maroon mb-2">Explore this topic hub</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Continue with the curated {internalLinkBudget.parentHubLink.name.toLowerCase()} cluster.
                    </p>
                    <Link
                      to={internalLinkBudget.parentHubLink.href}
                      className="inline-flex items-center rounded-md bg-qatar-maroon px-4 py-2 text-sm font-medium text-white hover:bg-qatar-maroon/90"
                    >
                      Go to {internalLinkBudget.parentHubLink.name}
                    </Link>
                  </div>
                )}

                {internalLinkBudget && (
                  <div className="mt-8 rounded-lg border bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold mb-4">Explore More</h3>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={internalLinkBudget.categoryLink.href}
                        className="px-4 py-2 rounded-full border border-qatar-maroon/20 text-qatar-maroon hover:bg-qatar-maroon hover:text-white transition-colors"
                      >
                        More in {safeCategory}
                      </Link>
                      {internalLinkBudget.parentHubLink && (
                        <Link
                          to={internalLinkBudget.parentHubLink.href}
                          className="px-4 py-2 rounded-full border border-qatar-maroon/20 text-qatar-maroon hover:bg-qatar-maroon hover:text-white transition-colors"
                        >
                          {internalLinkBudget.parentHubLink.name} Hub
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Author Box */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-xl mb-2">About the Author</h3>
                  <p className="text-gray-600">
                    The Experience Doha Team consists of local experts and passionate travelers dedicated to bringing you the most authentic and up-to-date information about Qatar's vibrant capital.
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div className="sticky top-8">
                  <div className="bg-qatar-maroon text-white p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                    <p className="text-sm mb-4 text-white/90">
                      Get the latest articles and travel tips delivered to your inbox.
                    </p>
                    <Link to="/#newsletter">
                      <Button className="w-full bg-qatar-gold text-qatar-maroon hover:bg-qatar-gold/90">
                        Subscribe Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Viator Banner */}
          <div className="max-w-4xl mx-auto px-4">
            <ViatorBanner />
          </div>

          {/* Related Articles */}
          {dynamicRelated.length > 0 && (
            <div className="bg-gray-50 py-16">
              <div className="content-container">
                <h2 className="section-title">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {dynamicRelated.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} {...relatedPost} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Newsletter Section */}
          <Newsletter />
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
