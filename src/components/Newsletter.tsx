import { motion } from 'framer-motion';

export const Newsletter = () => {
  return (
    <section className="py-20 bg-yellow">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-navy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Don't Miss Any AI Disasters
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 text-navy opacity-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Subscribe to our newsletter for a weekly roundup of fresh AI failures, plus exclusive content that's too ridiculous for the main site.
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
          
          <motion.p 
            className="text-sm mt-4 text-navy opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We promise not to let AI write our emails. That would be ironic.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
