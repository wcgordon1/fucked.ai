import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 gradient-circle"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-navy text-center">
                  <div className="font-serif text-6xl">91%</div>
                  <div className="text-lg font-medium mt-2">OF AI PROJECTS FAIL*</div>
                  <div className="text-xs italic mt-4">*we completely made up this statistic</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 lg:pl-16"
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-olive font-medium mb-4">ABOUT THIS ABSURDITY</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Why We Celebrate <br /><span className="text-yellow">AI Failures</span>
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              We created Fucked.ai because behind all the hype and promises of artificial intelligence, there's a treasure trove of hilarious failures that deserve the spotlight.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              As companies rush to implement AI without understanding it, and as users place blind faith in systems that sometimes have the intelligence of a particularly dim goldfish, we're here to document the chaos.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Consider us digital anthropologists, preserving these algorithmic blunders for future generations to enjoy - and hopefully learn from.
            </p>
            <div className="mt-8">
              <Link to="/about">
                <motion.button 
                  className="cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn Our Story
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
