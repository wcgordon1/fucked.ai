import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export const TableOfContents = ({ contentRef }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!contentRef.current) return;
    
    // Extract all heading elements and ensure they have IDs
    const headingElements = Array.from(contentRef.current.querySelectorAll('h2, h3, h4'));
    
    // First, ensure all headings have IDs
    headingElements.forEach((element) => {
      if (!element.id) {
        // Generate ID from text content
        element.id = (element.textContent || '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    });
    
    // Then map headings to our data structure
    const elements = headingElements.map(element => ({
      id: element.id,
      text: element.textContent || '',
      level: parseInt(element.tagName.substring(1)),
    }));
    
    setHeadings(elements);
    
    // Set up intersection observer to highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );
    
    // Observe heading elements
    Array.from(contentRef.current.querySelectorAll('h2, h3, h4')).forEach(
      (element) => observer.observe(element)
    );
    
    return () => observer.disconnect();
  }, [contentRef]);
  
  if (headings.length === 0) return null;

  return (
    <motion.div 
      className="sticky top-32 w-full mb-6 rounded-lg bg-cream p-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-3 font-serif">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            className={`toc-item ${heading.level > 2 ? 'ml-4' : ''}`}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-1 text-sm transition-colors ${
                activeId === heading.id
                  ? 'text-yellow font-medium'
                  : 'text-navy text-opacity-70 hover:text-yellow'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TableOfContents;
