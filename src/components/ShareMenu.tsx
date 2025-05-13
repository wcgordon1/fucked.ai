import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Facebook, Link2, Linkedin, Mail, Share2, Twitter } from 'lucide-react';

interface ShareMenuProps {
  url: string;
  title: string;
}

export const ShareMenu = ({ url, title }: ShareMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const shareOptions = [
    {
      name: 'Twitter',
      icon: <Twitter size={16} />,
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')
    },
    {
      name: 'Facebook',
      icon: <Facebook size={16} />,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={16} />,
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank')
    },
    {
      name: 'Email',
      icon: <Mail size={16} />,
      action: () => window.open(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`, '_blank')
    },
    {
      name: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? <Check size={16} /> : <Copy size={16} />,
      action: () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  ];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-navy hover:text-yellow transition-colors"
        aria-label="Share this post"
      >
        <Share2 size={18} className="mr-2" />
        Share
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-10 bg-white shadow-lg rounded-lg z-10 min-w-[180px] py-2"
          >
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.action();
                  if (option.name !== 'Copy Link') {
                    setIsOpen(false);
                  }
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-navy hover:bg-cream transition-colors"
              >
                <span className="mr-2 text-olive">{option.icon}</span>
                {option.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareMenu;
