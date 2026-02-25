import { useParams, Link } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ViatorBanner from '@/components/ViatorBanner';
import ViatorArticleBanner from '@/components/ViatorArticleBanner';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Facebook, Twitter, Share2 } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { blogPosts, relatedPosts } from '@/data/blogPostsData';
import { blogComponentMap, blogAppendComponents } from '@/data/blogComponentMap';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts[slug || 'default'] || blogPosts['default'];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  // Structured Data for SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "image": post.imageUrl,
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
      "datePublished": post.date,
      "description": post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://experiencedoha.com/blog/${slug}`
      }
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [post, slug]);

  // Render content with component injections
  const renderContent = () => {
    const config = slug ? blogComponentMap[slug] : undefined;

    if (!config) {
      // Default: split content at midpoint and inject Viator banner
      const content = post.content;
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
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      );
    }

    // Render with component injections
    const { injections, sequential } = config;
    const appendComponents = slug ? blogAppendComponents[slug] : undefined;

    if (sequential && injections.length > 1) {
      // Sequential splitting: split content at each injection point
      const parts: JSX.Element[] = [];
      let remainingContent = post.content;

      injections.forEach((injection, idx) => {
        const splitTag = `<h2 id="${injection.splitAtId}">`;
        const splitParts = remainingContent.split(splitTag);

        if (splitParts.length >= 2) {
          parts.push(
            <div key={`content-${idx}`} dangerouslySetInnerHTML={{ __html: splitParts[0] }} />
          );
          parts.push(
            <div key={`component-${idx}`} className="not-prose my-12">
              <Suspense fallback={<div className="animate-pulse h-48 bg-muted rounded-lg" />}>
                <injection.Component />
              </Suspense>
            </div>
          );
          remainingContent = splitTag + splitParts.slice(1).join(splitTag);
        }
      });

      // Render remaining content
      parts.push(
        <div key="content-final" dangerouslySetInnerHTML={{ __html: remainingContent }} />
      );

      // Append extra components
      if (appendComponents) {
        appendComponents.forEach((AppendComponent, idx) => {
          parts.push(
            <div key={`append-${idx}`} className="not-prose my-12">
              <Suspense fallback={<div className="animate-pulse h-48 bg-muted rounded-lg" />}>
                <AppendComponent />
              </Suspense>
            </div>
          );
        });
      }

      return <div className="prose prose-lg max-w-none space-y-8">{parts}</div>;
    }

    // Single injection point
    const injection = injections[0];
    const splitTag = `<h2 id="${injection.splitAtId}">`;
    const splitParts = post.content.split(splitTag);

    return (
      <div className="prose prose-lg max-w-none space-y-8">
        <div dangerouslySetInnerHTML={{ __html: splitParts[0] }} />
        <div className="not-prose my-12">
          <Suspense fallback={<div className="animate-pulse h-48 bg-muted rounded-lg" />}>
            <injection.Component />
          </Suspense>
        </div>
        {splitParts.length >= 2 && (
          <div dangerouslySetInnerHTML={{ __html: splitTag + splitParts.slice(1).join(splitTag) }} />
        )}
        {appendComponents?.map((AppendComponent, idx) => (
          <div key={`append-${idx}`} className="not-prose my-12">
            <Suspense fallback={<div className="animate-pulse h-48 bg-muted rounded-lg" />}>
              <AppendComponent />
            </Suspense>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${post.title} - Experience Doha`}
        description={post.metaDescription || post.excerpt}
        image={typeof post.imageUrl === 'string' ? post.imageUrl : undefined}
        type="article"
        publishedTime={post.date}
      />
      <NavBar />

      <main className="flex-1">
        {/* Hero Section */}
        <article>
          <div className="relative h-[400px] w-full">
            <img
              src={post.imageUrl}
              alt={`${post.title} - ${post.category} guide for Doha, Qatar`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 content-container pb-8">
              <Badge className="mb-4 bg-qatar-gold text-qatar-maroon hover:bg-qatar-gold">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
                          className="block text-sm text-gray-900 hover:text-qatar-gold transition-colors py-1 hover:translate-x-1 transform duration-200 font-medium"
                          onClick={(e) => {
                            e.preventDefault();
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
                <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                  <span className="text-sm font-medium text-gray-600">Share this article:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Copy Link
                  </Button>
                </div>

                {/* Article Content */}
                {renderContent()}

                {/* Tags */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
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
                {/* Newsletter Signup */}
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
          <div className="bg-gray-50 py-16">
            <div className="content-container">
              <h2 className="section-title">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} {...relatedPost} />
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <Newsletter />
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
