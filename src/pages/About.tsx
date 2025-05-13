import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BrainCircuit, Code, MessageSquareText, Zap } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="pt-24 bg-cream">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
              About <span className="text-yellow">F.AI</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We're digital archaeologists documenting the hilarious ruins of artificial intelligence gone wrong.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-8 font-serif">Our Mission Statement</h2>
              <p className="text-lg mb-6 text-gray-700">
                Fucked.ai was born from a collective eye-roll at the endless cycle of AI hype and disappointment. 
                While tech companies promise robot assistants that can practically read your mind, the reality 
                often involves AI hallucinating Abraham Lincoln's favorite pizza toppings or recommending chainsaw 
                accessories to people shopping for baby clothes.
              </p>
              <p className="text-lg mb-10 text-gray-700">
                We believe these magnificent failures deserve celebration, documentation, and most importantly, 
                to be laughed at heartily. Consider us the "America's Funniest Home Videos" of the AI world, 
                except instead of people falling over, it's billion-dollar algorithms tripping over their own code.
              </p>

              <div className="border-l-4 border-yellow pl-6 mb-10">
                <h3 className="text-xl font-bold mb-2 font-serif">Why We Do This</h3>
                <p className="text-gray-700">
                  "Behind every AI failure is a human decision that someone probably regrets. 
                  Our job is to make sure they regret it publicly, for the entertainment of all."
                </p>
                <p className="italic text-sm mt-2 text-gray-500">— Founder, Probably</p>
              </div>

              <h2 className="text-3xl font-bold mt-12 mb-8 font-serif">The Team Behind F.AI</h2>
              <p className="text-lg mb-10 text-gray-700">
                We're a ragtag group of tech optimists, cynics, and comedians who believe that the 
                best way to understand technology is to document when it goes spectacularly wrong. 
                Our team includes former AI researchers, UX designers, and at least one person who 
                once had their entire thesis deleted by an autocorrect feature.
              </p>
            </motion.div>

            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            >
              <div className="bg-cream p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center text-navy mr-4">
                    <BrainCircuit size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-serif">Education</h3>
                </div>
                <p className="text-gray-700">
                  We believe that humor is the best teacher. By highlighting AI failures, 
                  we educate people about the real capabilities and limitations of artificial intelligence.
                </p>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center text-navy mr-4">
                    <MessageSquareText size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-serif">Community</h3>
                </div>
                <p className="text-gray-700">
                  F.AI is building a community of people who appreciate the humor in technological mishaps 
                  and who want to discuss the implications of our growing reliance on AI.
                </p>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center text-navy mr-4">
                    <Code size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-serif">Documentation</h3>
                </div>
                <p className="text-gray-700">
                  We meticulously document AI failures so that future generations can learn from our mistakes, 
                  or at least have something to laugh about when the robots eventually take over.
                </p>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow rounded-full flex items-center justify-center text-navy mr-4">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-bold font-serif">Innovation</h3>
                </div>
                <p className="text-gray-700">
                  By highlighting what goes wrong, we hope to inspire developers and companies 
                  to create more reliable, ethical, and less unintentionally hilarious AI systems.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Help us document the funniest AI failures by submitting your own experiences
              or joining our newsletter for weekly roundups of algorithmic absurdity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-yellow text-navy py-3 px-6 rounded-md font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit an AI Fail
              </motion.button>
              <motion.button 
                className="border-2 border-white py-3 px-6 rounded-md font-semibold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Newsletter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
