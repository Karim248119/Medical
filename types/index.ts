export interface Doctor {
  _id?: string;
  name: string;
  img: string;
  resume: string;
  contacts: {
    phone: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  sp_id: {
    _id: string;
    title: string;
  };
}

export interface Speciality {
  _id?: string;
  title: string;
  img: any;
  description: string;
}

export interface Service extends Speciality {
  videoSrc: string;
  icon: string;
  webIcon: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
}

// export interface News {
//   _id?: string;
//   title: string;
//   img: string;
//   date: string;
//   category: string;
//   content: string;
// }

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Appointment {
  _id?: string;
  name: string;
  gender: "male" | "female";
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
  doctor: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    name: string;
  };
  speciality?: {
    _id: string;
    title: string;
  };
}

export interface News {
  article_id: string;
  title: string;
  link: string;
  keywords: string[];
  creator: string[];
  video_url: string | null;
  description: string;
  content: string;
  pubDate: string;
  pubDateTZ: string;
  image_url: string;
  source: {
    id: string;
    priority: number;
    name: string;
    url: string;
    icon: string;
  };
  language: string;
  country: string[];
  category: string[];
  ai_tag: string;
  sentiment: string;
  sentiment_stats: string;
  ai_region: string;
  ai_org: string;
  duplicate: boolean;
}
