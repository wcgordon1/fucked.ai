import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Squircle, BadgeAlert, BrainCircuit, MessageSquareText } from 'lucide-react';

const featureData = [
  {
    icon: <BrainCircuit size={24} />,
    title: "Hallucination Station",
    description: "AI confidently making up complete nonsense and presenting it as fact. From historical figures that never existed to scientific theories pulled from thin air."
  },
  {
    icon: <MessageSquareText size={24} />,
    title: "Lost in Translation",
    description: "Hilariously bad AI translations that turned business proposals into accidental marriage proposals and friendly greetings into mortal threats."
  },
  {
    icon: <Squircle size={24} />,
    title: "Algorithm Apocalypse",
    description: "When recommendation engines go wild, suggesting funeral services to newlyweds and baby products to corporate executives with no children."
  },
  {
    icon: <BadgeAlert size={24} />,
    title: "Robotic Rebellion",
    description: "Smart home devices turning against their owners - from thermostats cranked to 100°F to AI assistants ordering unwanted items at 3 AM."
  }
];

export const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.p 
            className="text-yellow font-medium mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            FEATURED FAILURES
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            AI's Greatest Mishaps
          </motion.h2>
          <motion.p 
            className="text-lg max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Because even artificial intelligence has its truly stupid moments. These categories showcase the finest examples of when algorithms go hilariously wrong.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {featureData.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card bg-opacity-10 bg-white p-6 rounded-lg"
              variants={itemVariants}
            >
              <div className="feature-icon text-navy">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
