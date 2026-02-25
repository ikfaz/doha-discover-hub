export interface TableOfContentsItem {
  title: string;
  id: string;
  level?: number;
}

export interface ArticleData {
  id: string;
  title: string;
  date: string;
  isoDate?: string;
  author: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
  content: string;
  excerpt?: string;
  metaDescription?: string;
  tableOfContents?: TableOfContentsItem[];
}

export interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  slug: string;
}
