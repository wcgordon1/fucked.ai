import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Bookmark, Calendar, ChevronLeft, Clock, Tag } from 'lucide-react';
import ShareMenu from './ShareMenu';
import useSavedPosts from '../hooks/useSavedPosts';
import { getPostBySlug, getRelatedPosts } from '../data/blogData';
import TableOfContents from './TableOfContents';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const post = getPostBySlug(slug || '');
  const relatedPosts = post ? getRelatedPosts(post.id, 2) : [];
  const { isSaved, toggleSaved } = post ? useSavedPosts(post.id) : { isSaved: false, toggleSaved: () => {} };
  
  useEffect(() => {
    if (!post) {
      navigate('/blog');
      return;
    }
    
    // Process headings to add IDs for the table of contents
    setTimeout(() => {
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('h2, h3, h4');
        headings.forEach((heading) => {
          if (!heading.id) {
            const id = (heading.textContent || '')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            heading.id = id || `heading-${Math.random().toString(36).substring(2, 9)}`;
          }
        });
      }
    }, 0);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [post, navigate, slug]);
  
  if (!post) {
    return null;
  }

  // Format the content with proper HTML
  const formatContent = () => {
    let formattedContent = post.content;
    
    // Convert Markdown headings to HTML with IDs
    formattedContent = formattedContent.replace(/## (.*)/g, (_, title) => {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h2 id="${id}" class="text-3xl font-bold mt-8 mb-4 font-serif">${title}</h2>`;
    });
    
    formattedContent = formattedContent.replace(/### (.*)/g, (_, title) => {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h3 id="${id}" class="text-2xl font-bold mt-6 mb-3 font-serif">${title}</h3>`;
    });
    
    // Convert paragraphs
    formattedContent = formattedContent.replace(/^(?!<h[2-6]|<ol|<ul|<li|<div|<p)(.+)$/gm, '<p class="mb-4 text-lg text-gray-700">$1</p>');
    
    // Convert numbered lists
    formattedContent = formattedContent.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 mb-2 text-lg text-gray-700">$1</li>');
    
    // Wrap adjacent list items in <ol> tags
    formattedContent = formattedContent.replace(/(<li.*?>.*?<\/li>)(\s*)(<li.*?>)/g, '$1</ol>\n<ol class="list-decimal mb-6">$3');
    formattedContent = formattedContent.replace(/(<li.*?>.*?<\/li>)(?!\s*<\/ol>)/g, '$1</ol>');
    formattedContent = formattedContent.replace(/<li/g, '<ol class="list-decimal mb-6"><li');
    formattedContent = formattedContent.replace(/(<\/ol>)\s*(<ol.*?>)/g, '$2');
    
    return formattedContent;
  };

  // Schema.org structured data for SEO
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'image': post.image,
    'datePublished': post.date,
    'dateModified': post.date,
    'author': {
      '@type': 'Person',
      'name': post.author.name
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Fucked.ai',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mocha-cdn.com/favicon.ico'
      }
    },
    'description': post.excerpt,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://fucked.ai/blog/${post.slug}`
    }
  };

  return (
    <div className="pt-24 bg-cream">
      <Helmet>
        <title>{post.title} | Fucked.ai</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://fucked.ai/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-4">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-navy hover:text-yellow transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Blog
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-yellow text-navy text-xs font-bold px-3 py-1 rounded">
                {post.category}
              </span>
              <div className="flex items-center text-olive text-xs">
                <Calendar size={12} className="mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="mx-2 text-gray-300">•</div>
              <div className="flex items-center text-olive text-xs">
                <Clock size={12} className="mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-700 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex items-center mb-8">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-gray-500">Author</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Image */}
      <div className="w-full h-80 md:h-96 bg-cover bg-center mb-8" style={{ backgroundImage: `url(${post.image})` }}></div>
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Table of Contents - Desktop */}
            <div className="hidden md:block md:w-1/4">
              <TableOfContents contentRef={contentRef} />
            </div>
            
            <div className="md:w-3/4">
              {/* Table of Contents - Mobile */}
              <div className="md:hidden mb-6">
                <TableOfContents contentRef={contentRef} />
              </div>
              
              {/* Article Content */}
              <motion.div 
                ref={contentRef}
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: formatContent() }}
              />
              
              {/* Tags */}
              <div className="mt-12 mb-8">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag size={16} className="text-olive" />
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-cream text-olive text-xs px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Share and Save */}
              <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 mb-12">
                <ShareMenu 
                  url={window.location.href} 
                  title={post.title} 
                />
                <button 
                  className="flex items-center text-navy hover:text-yellow transition-colors"
                  onClick={toggleSaved}
                  aria-label={isSaved ? "Unsave this post" : "Save this post"}
                >
                  <Bookmark 
                    size={18} 
                    className={`mr-2 ${isSaved ? 'fill-yellow text-yellow' : ''}`} 
                  />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 font-serif">You Might Also Enjoy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <motion.div 
                        key={relatedPost.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md"
                        whileHover={{ y: -5 }}
                      >
                        <Link to={`/blog/${relatedPost.slug}`}>
                          <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${relatedPost.image})` }}></div>
                          <div className="p-4">
                            <h4 className="text-lg font-bold mb-2 font-serif">{relatedPost.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
