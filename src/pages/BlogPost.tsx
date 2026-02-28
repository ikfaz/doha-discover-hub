import { useParams, Link, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ViatorBanner from '@/components/ViatorBanner';
import ViatorArticleBanner from '@/components/ViatorArticleBanner';
import SEOHead from '@/components/SEOHead';
import SchoolComparisonTool from '@/components/SchoolComparisonTool';
import SchoolFeeCalculator from '@/components/SchoolFeeCalculator';
import VisaChecklistGenerator from '@/components/VisaChecklistGenerator';
import DrivingLicenseChecker from '@/components/DrivingLicenseChecker';
import MentalHealthDirectory from '@/components/MentalHealthDirectory';
import { TherapyCostCalculator } from '@/components/TherapyCostCalculator';
import { BankComparison } from '@/components/BankComparison';
import { MobilePlanComparison } from '@/components/MobilePlanComparison';
import { RoamingCostComparison } from '@/components/RoamingCostComparison';
import { GroceryPriceComparison } from '@/components/GroceryPriceComparison';
import { WeeklyMealPlanner } from '@/components/WeeklyMealPlanner';
import { MetroFareCalculator } from '@/components/MetroFareCalculator';
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
import PetImportChecklist from '@/components/PetImportChecklist';
import VeterinaryCostEstimator from '@/components/VeterinaryCostEstimator';
import DomesticWorkerCostCalculator from '@/components/DomesticWorkerCostCalculator';
import GymMembershipComparison from '@/components/GymMembershipComparison';
import RemoteWorkCafeFinder from '@/components/RemoteWorkCafeFinder';
import QDCPermitCalculator from '@/components/QDCPermitCalculator';
import HotelBarFinder from '@/components/HotelBarFinder';
import CityCostComparison from '@/components/CityCostComparison';
import RentPriceComparison from '@/components/RentPriceComparison';
import JobSearchStrategyGuide from '@/components/JobSearchStrategyGuide';
import { CVTemplateGenerator } from '@/components/CVTemplateGenerator';
import { SalaryCalculator } from '@/components/SalaryCalculator';
import { TaxSavingsCalculator } from '@/components/TaxSavingsCalculator';
import { RentalPropertyROICalculator } from '@/components/RentalPropertyROICalculator';
import { VisaApplicationTracker } from '@/components/VisaApplicationTracker';
import { LaborRightsCalculator } from '@/components/LaborRightsCalculator';
import { EOSGCalculator } from '@/components/EOSGCalculator';
import { ContractNegotiationChecklist } from '@/components/ContractNegotiationChecklist';
import { blogPosts } from '@/data/articles';
import type { ReactNode } from 'react';

// Slug-based component injection map
const slugComponents: Record<string, { splitAt: string; component: ReactNode; splitAt2?: string; component2?: ReactNode }[]> = {
  'end-of-service-gratuity-qatar-2025': [
    { splitAt: '<h2 id="calculation">', component: <EOSGCalculator /> },
  ],
  'qatar-labor-law-reforms-2025': [
    { splitAt: '<h2 id="protection">', component: <LaborRightsCalculator /> },
  ],
  'qatar-work-visa-guide-2025': [
    { splitAt: '<h2 id="phase-2">', component: <VisaApplicationTracker /> },
  ],
  'qatar-tax-guide-2025': [
    { splitAt: '<h2 id="corporate-tax">', component: <TaxSavingsCalculator />, splitAt2: '<h2 id="vat">', component2: <RentalPropertyROICalculator /> },
  ],
  'expat-salaries-doha-2025': [
    { splitAt: '<h2 id="benchmarks">', component: <TaxSavingsCalculator />, splitAt2: '<h2 id="package">', component2: <SalaryCalculator /> },
  ],
  'job-market-qatar-2025': [
    { splitAt: '<h2 id="trends">', component: <><JobSearchStrategyGuide /><div className="not-prose my-12"><CVTemplateGenerator /></div></> },
  ],
  'housing-rent-doha-2025': [
    { splitAt: '<h2 id="legal">', component: <RentPriceComparison /> },
  ],
  'cost-of-living-doha-dubai-riyadh': [
    { splitAt: '<h2 id="strategies">', component: <CityCostComparison /> },
  ],
  'international-schools-qatar-2025': [
    { splitAt: '<h2 id="fees">', component: <SchoolFeeCalculator /> },
    { splitAt: '<h2 id="budget">', component: <SchoolComparisonTool /> },
  ],
  'qatar-visa-rules-expats-2025': [
    { splitAt: '<h2 id="family-visa">', component: <VisaChecklistGenerator /> },
  ],
  'driving-doha-2025-guide': [
    { splitAt: '<h2 id="rules">', component: <DrivingLicenseChecker /> },
  ],
  'lgbtq-experiences-qatar-2025': [
    { splitAt: '<h2 id="community">', component: <><MentalHealthDirectory /><div className="not-prose my-12"><TherapyCostCalculator /></div></> },
  ],
  'bank-account-qatar-guide': [
    { splitAt: '<h2 id="decision">', component: <BankComparison /> },
  ],
  'mobile-plans-qatar-guide': [
    { splitAt: '<h2 id="internet">', component: <MobilePlanComparison />, splitAt2: '<h2 id="5g">', component2: <RoamingCostComparison /> },
  ],
  'grocery-shopping-doha-guide': [
    { splitAt: '<h2 id="others">', component: <GroceryPriceComparison />, splitAt2: '<h2 id="delivery">', component2: <WeeklyMealPlanner /> },
  ],
  'remote-work-cafes-doha-guide': [
    { splitAt: '<h2 id="coworking">', component: <RemoteWorkCafeFinder /> },
  ],
  'alcohol-guide-doha': [
    { splitAt: '<h2 id="spending-limits">', component: <QDCPermitCalculator />, splitAt2: '<h2 id="prohibited">', component2: <HotelBarFinder /> },
  ],
  'gyms-fitness-doha-guide': [
    { splitAt: '<h2 id="ladies">', component: <GymMembershipComparison /> },
  ],
  'hiring-maid-nanny-qatar-guide': [
    { splitAt: '<h2 id="contracts">', component: <DomesticWorkerCostCalculator /> },
  ],
  'pet-import-qatar-guide': [
    { splitAt: '<h2 id="quarantine">', component: <PetImportChecklist />, splitAt2: '<h2 id="living">', component2: <VeterinaryCostEstimator /> },
  ],
  'doha-metro-2025-guide': [
    { splitAt: '<h2 id="hours">', component: <MetroFareCalculator /> },
  ],
};

// Extra component for end-of-service article
const endOfServiceExtra = <ContractNegotiationChecklist />;

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
          <div className="not-prose my-12"><EOSGCalculator /></div>
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
        <div className="not-prose my-12"><SchoolFeeCalculator /></div>
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="fees">' + waitlistParts[0] }} />
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="waitlists">' + budgetParts[0] }} />
        <div className="not-prose my-12"><SchoolComparisonTool /></div>
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
        <div className="not-prose my-12"><TaxSavingsCalculator /></div>
        <div dangerouslySetInnerHTML={{ __html: '<h2 id="benchmarks">' + pkgParts[0] }} />
        <div className="not-prose my-12"><SalaryCalculator /></div>
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
  const post = slug ? blogPosts[slug] : undefined;

  // Dynamic related articles based on matching category and tags
  const dynamicRelated = useMemo(() => {
    if (!post || !slug) return [];
    const allSlugs = Object.keys(blogPosts);
    const scored = allSlugs
      .filter(s => s !== slug)
      .map(s => {
        const p = blogPosts[s];
        let score = 0;
        if (p.category === post.category) score += 3;
        if (post.tags && p.tags) {
          const overlap = post.tags.filter(t => p.tags.includes(t)).length;
          score += overlap;
        }
        return { slug: s, post: p, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    return scored.map(x => ({
      id: x.post.id,
      title: x.post.title,
      excerpt: x.post.excerpt || x.post.content.substring(0, 120).replace(/<[^>]*>/g, ''),
      imageUrl: x.post.imageUrl,
      category: x.post.category,
      date: x.post.date,
      slug: x.slug,
    }));
  }, [slug, post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const articleDescription = post.metaDescription || post.excerpt || post.content.substring(0, 155).replace(/<[^>]*>/g, '');
  const articleIsoDate = post.isoDate || post.date;
  const categorySlug = post.category.toLowerCase();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": typeof post.imageUrl === 'string' ? post.imageUrl : undefined,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ExperienceDoha.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://experiencedoha.com/logo.png"
      }
    },
    "datePublished": articleIsoDate,
    "dateModified": articleIsoDate,
    "description": articleDescription,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://experiencedoha.com/blog/${slug}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://experiencedoha.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://experiencedoha.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.category, "item": `https://experiencedoha.com/blog/category/${categorySlug}` },
      { "@type": "ListItem", "position": 4, "name": post.title }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${post.title} | Doha Guide`}
        description={articleDescription}
        image={typeof post.imageUrl === 'string' ? post.imageUrl : undefined}
        type="article"
        publishedTime={articleIsoDate}
        jsonLd={[articleJsonLd, breadcrumbJsonLd]}
        keywords={post.tags.join(', ')}
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
                    <Link to={`/blog/category/${categorySlug}`}>{post.category}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-[400px]">{post.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Hero Section */}
          <div className="relative h-[280px] sm:h-[350px] md:h-[400px] w-full">
            <img
              src={post.imageUrl}
              alt={`${post.title} - ${post.category} guide for Doha, Qatar`}
              className="w-full h-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 content-container pb-8">
              <Badge className="mb-4 bg-qatar-gold text-qatar-maroon hover:bg-qatar-gold">
                {post.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <span>By {post.author}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="content-container py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
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
                          → {item.title}
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
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
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
                {renderArticleContent(slug || 'default', post.content)}

                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Link key={tag} to={`/blog/category/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/60">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

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
