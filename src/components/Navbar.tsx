import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-6 absolute w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div 
              className="text-2xl font-bold font-serif mr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/">Fucked.AI</Link>
            </motion.div>
            <motion.div 
              className="text-xs bg-yellow text-navy px-2 py-1 rounded font-bold tracking-wider"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              BETA
            </motion.div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link to="/" className="text-navy font-medium hover:text-yellow transition">
                Home
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link to="/about" className="text-navy font-medium hover:text-yellow transition">
                About
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link to="/blog" className="text-navy font-medium hover:text-yellow transition">
                Blog
              </Link>
            </motion.div>
            <motion.a 
              href="https://x.com/helloIamWilly"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy text-white py-2 px-4 rounded font-medium inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://x.com/helloIamWilly', '_blank')}
            >
              Buy this Domain
            </motion.a>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-navy">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-navy z-50 flex flex-col p-8 pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-4 text-white"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col space-y-6 text-center">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-white text-xl font-medium">
                Home
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="text-white text-xl font-medium">
                About
              </Link>
              <a 
                href="https://x.com/helloIamWilly"
                target="_blank"
                rel="noopener noreferrer" 
                onClick={() => setIsOpen(false)} 
                className="text-white text-xl font-medium"
              >
                Buy this Domain Name
              </a>
              <Link to="/blog" onClick={() => setIsOpen(false)} className="text-white text-xl font-medium">
                Blog
              </Link>
              <button className="bg-yellow text-navy py-3 px-6 rounded-md font-bold mt-4">
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
