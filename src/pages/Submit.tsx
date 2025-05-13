import { useState, useRef, useEffect } from 'react';
import { sendSubmissionEmail, setResendApiKey } from '../utils/email';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Check, Send, Squircle, Upload } from 'lucide-react';

const Submit = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    aiType: '',
    description: '',
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiKeySet, setApiKeySet] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Check for API key in environment
    const apiKey = import.meta.env.VITE_RESEND_API_KEY;
    if (apiKey) {
      setResendApiKey(apiKey);
      setApiKeySet(true);
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const validateForm = () => {
    if (!formState.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    if (!formState.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formState.aiType) {
      setErrorMessage('Please select the type of AI failure');
      return false;
    }
    if (!formState.description.trim()) {
      setErrorMessage('Description is required');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Create submission data
      const submissionData = {
        name: formState.name,
        email: formState.email,
        aiType: formState.aiType,
        description: formState.description,
        imageUrl: imagePreview // If we wanted to attach the image, we'd need to upload it first
      };
      
      // Send email
      const result = await sendSubmissionEmail(submissionData);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormState({
        name: '',
        email: '',
        aiType: '',
        description: ''
      });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
  };
  
  return (
    <div className="pt-24 bg-cream min-h-screen">
      <Helmet>
        <title>Submit an AI Failure | Fucked.ai</title>
        <meta name="description" content="Share your hilarious AI failure story with the world. Submit your experience of when artificial intelligence wasn't so intelligent." />
      </Helmet>
      
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
              Submit Your <span className="text-yellow">AI Failure</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Did AI completely mess up something for you? We want to hear about it! Share your story of when artificial intelligence wasn't quite so intelligent.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {submitStatus === 'success' ? (
              <motion.div 
                className="bg-navy text-white p-8 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Check size={64} className="mx-auto mb-6 text-yellow" />
                <h2 className="text-3xl font-bold mb-4 font-serif">Submission Received!</h2>
                <p className="text-lg mb-6">
                  Thank you for sharing your AI failure story with us. We'll review it and may feature it on our site soon!
                </p>
                <button
                  onClick={resetForm}
                  className="bg-yellow text-navy py-3 px-6 rounded-md font-bold"
                >
                  Submit Another Story
                </button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-cream p-8 rounded-lg shadow-sm"
              >
                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
                    <Squircle size={20} className="mr-2 mt-1 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <div className="mb-6">
                  <label htmlFor="name" className="block text-navy font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow focus:border-yellow outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-navy font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow focus:border-yellow outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="aiType" className="block text-navy font-medium mb-2">Type of AI Failure</label>
                  <select
                    id="aiType"
                    name="aiType"
                    value={formState.aiType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow focus:border-yellow outline-none transition"
                  >
                    <option value="">Select a category</option>
                    <option value="Hallucination">AI Hallucination</option>
                    <option value="Translation">Translation Fail</option>
                    <option value="Image Generation">Image Generation Disaster</option>
                    <option value="Chatbot">Chatbot Confusion</option>
                    <option value="Voice Assistant">Voice Assistant Mishap</option>
                    <option value="Recommendation">Recommendation Algorithm Fail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-navy font-medium mb-2">Describe What Happened</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-yellow focus:border-yellow outline-none transition min-h-[150px]"
                    placeholder="Tell us the full story of how AI failed in spectacular fashion..."
                  ></textarea>
                </div>
                
                <div className="mb-8">
                  <label className="block text-navy font-medium mb-2">Upload an Image (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-56 mx-auto rounded" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="mt-2 text-navy hover:text-yellow transition-colors"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 mb-2">Drag and drop an image, or click to browse</p>
                        <p className="text-xs text-gray-400">PNG, JPG or GIF up to 5MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <motion.button
                    type="submit"
                    className="bg-navy text-white py-3 px-8 rounded-md font-bold text-lg flex items-center justify-center mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Submit Your Story
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Submit;
