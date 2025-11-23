export type Category = 'Wszystkie' | 'Wideo' | 'Grafika' | 'Dev' | 'Produktywność' | 'Audio';

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  categories: Category[]; // Changed from single Category to array for better filtering
  tags: string[];
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Subscription';
  rating: number; // 1-10
  tutorialStep: string;
  ctaLink: string;
  icon: string; // Emoji or simple visual representative
  isHot?: boolean;
  isNew?: boolean; // Added for visual flair
}

export interface FilterState {
  category: Category;
  search: string;
}