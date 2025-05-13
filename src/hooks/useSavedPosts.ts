import { useState, useEffect } from 'react';

export const SAVED_POSTS_KEY = 'fuckedai_saved_posts';

export const useSavedPosts = (postId: number) => {
  const [isSaved, setIsSaved] = useState(false);
  
  // Check if post is saved on initial load
  useEffect(() => {
    const savedPosts = getSavedPosts();
    setIsSaved(savedPosts.includes(postId));
  }, [postId]);
  
  // Get all saved posts from localStorage
  const getSavedPosts = (): number[] => {
    const savedPostsJson = localStorage.getItem(SAVED_POSTS_KEY);
    return savedPostsJson ? JSON.parse(savedPostsJson) : [];
  };
  
  // Toggle saved status
  const toggleSaved = () => {
    const savedPosts = getSavedPosts();
    
    if (isSaved) {
      // Remove from saved posts
      const updatedPosts = savedPosts.filter((id: number) => id !== postId);
      localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(updatedPosts));
      setIsSaved(false);
    } else {
      // Add to saved posts
      const updatedPosts = [...savedPosts, postId];
      localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(updatedPosts));
      setIsSaved(true);
    }
  };
  
  return { isSaved, toggleSaved };
};

export default useSavedPosts;
