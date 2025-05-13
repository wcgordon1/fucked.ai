import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AboutPage from './pages/About';
import BlogPage from './pages/Blog';
import BlogPost from './components/BlogPost';

export function App() {
  useEffect(() => {
    // Load fonts
    const dmSerifDisplay = document.createElement('link');
    dmSerifDisplay.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap';
    dmSerifDisplay.rel = 'stylesheet';
    document.head.appendChild(dmSerifDisplay);

    const inter = document.createElement('link');
    inter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    inter.rel = 'stylesheet';
    document.head.appendChild(inter);

    // Clean up
    return () => {
      document.head.removeChild(dmSerifDisplay);
      document.head.removeChild(inter);
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <About />
                <Newsletter />
              </>
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
          <Footer />
        </motion.div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
