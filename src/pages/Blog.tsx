import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { blogPosts } from '../data/blogData';

const Blog = () => {
  return (
    <div className="pt-24 bg-cream">
      {/* Hero Section */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
              The F.AI <span className="text-yellow">Blog</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Chronicles of artificial unintelligence – where we document and laugh at the most spectacular AI failures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-navy text-white rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)` }}></div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="bg-yellow text-navy text-xs font-bold px-3 py-1 rounded inline-block mb-4 w-fit">
                  FEATURED
                </div>
                <h2 className="text-3xl font-bold font-serif mb-4">The Year of Living Algorithmically: Our Top 10 AI Fails of 2025</h2>
                <p className="text-gray-300 mb-6">
                  From the virtual assistant that kept ordering pizzas during conference calls to the translation app that turned business proposals into love letters, here are the most entertaining AI disasters of the year.
                </p>
                <div className="flex items-center text-sm mb-6">
                  <div className="flex items-center mr-4">
                    <Calendar size={14} className="mr-1" />
                    <span>May 20, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>12 min read</span>
                  </div>
                </div>
                <Link to="/blog/chatgpt-wedding-planning-fail" className="flex items-center text-yellow font-medium hover:underline">
                  Read the full article <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {blogPosts.map((post, index) => (
              <motion.div 
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
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
                  <h3 className="text-xl font-bold mb-3 font-serif">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs bg-cream text-olive px-2 py-1 rounded">
                      <Tag size={12} className="mr-1" />
                      <span>{post.category}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-navy font-medium text-sm hover:text-yellow transition-colors">
                      Read more →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="flex justify-center mt-12">
            <motion.button 
              className="border-2 border-navy py-3 px-6 rounded-md font-semibold text-navy flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load more articles
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-yellow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6 text-navy font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Never Miss an AI Facepalm Moment
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 text-navy opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join our newsletter for weekly roundups of fresh AI catastrophes and exclusive stories too bizarre for the main blog.
            </motion.p>
            
            <motion.div 
              className="bg-white p-2 rounded-lg flex flex-col sm:flex-row max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow p-3 rounded bg-transparent outline-none text-navy"
              />
              <motion.button 
                className="mt-2 sm:mt-0 bg-navy text-white font-medium py-3 px-6 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
