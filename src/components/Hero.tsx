import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="geometric-shape w-96 h-96 gradient-circle opacity-25 -top-20 -right-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.25 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="geometric-shape w-40 h-40 gradient-circle opacity-15 bottom-10 left-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-olive font-medium mb-4 text-lg">AI Loves to F*ck Up</p>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                We're All <span className="text-yellow">F*cked</span> <br/>
                <span className="text-navy">by AI</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700 max-w-lg">
                This isn't a real website. So I'll tell you now. This is just a webpage I made to tell you the domain name Fucked.ai is for sale. DM me on X if interested. Asking 10K. 
                              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  onClick={() => window.open('https://x.com/helloIamWilly', '_blank')}
                  className="cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy this Domain
                </motion.button>
                <Link to="/blog">
                  <motion.button 
                    className="border-2 border-navy py-3 px-6 rounded-md font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Blog
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto gradient-circle flex items-center justify-center relative">
                <div className="absolute w-full h-full animate-spin-slow" style={{ animationDuration: '30s' }}>
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-navy rounded-full transform -translate-x-1/2" />
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-navy rounded-full transform -translate-y-1/2" />
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-navy rounded-full transform -translate-x-1/2" />
                  <div className="absolute top-1/2 left-0 w-2 h-2 bg-navy rounded-full transform -translate-y-1/2" />
                </div>
                <div className="text-navy text-center">
                  <div className="font-serif text-5xl">F.AI</div>
                  <div className="text-sm font-medium mt-2">PERFECTLY IMPERFECT</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
