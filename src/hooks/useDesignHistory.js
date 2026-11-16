import { useState, useEffect } from 'react';

const STORAGE_KEY = 'design_md_generator_history';

export const useDesignHistory = () => {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse history from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  const saveItem = (item) => {
    setHistory((prev) => {
      // Remove any duplicate by URL/id, then prepend
      const filtered = prev.filter((i) => i.id !== item.id && i.url !== item.url);
      return [item, ...filtered].slice(0, 20); // Keep last 20
    });
  };

  const removeItem = (id) => {
    setHistory((prev) => prev.filter((i) => i.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    saveItem,
    removeItem,
    clearHistory,
  };
};
