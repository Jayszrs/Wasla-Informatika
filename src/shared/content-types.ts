// Content records owned by Wasla Studio. Legacy content IDs remain stable.
export interface User {
  id: number;
  name: string;
  role: 'admin' | 'editor';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  resetPasswordRequestedAt?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
  collection: 'users';
}

export interface Media {
  id: number;
  alt: string;
  caption?: string | null;
  prefix?: string | null;
  _objectKey?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  illustration?: (number | null) | Media;
  image?: (number | null) | Media;
  category: 'Pengembangan' | 'Desain' | 'Infrastruktur' | 'Konsultasi' | 'Fotografi' | 'Produksi Kreatif';
  deliverables?:
    | {
        item: string;
        id?: string | null;
      }[]
    | null;
  order?: number | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  client?: string | null;
  excerpt: string;
  challenge: string;
  solution: string;
  results?: string | null;
  /**
   * Aktifkan untuk demonstrasi; jangan tampilkan sebagai proyek klien.
   */
  isConcept?: boolean | null;
  visual?: ('commerce' | 'platform' | 'editorial') | null;
  technologies?:
    | {
        name: string;
        id?: string | null;
      }[]
    | null;
  thumbnail?: (number | null) | Media;
  /**
   * Tambahkan beberapa gambar dari Media, atur urutannya, dan isi caption. Semua gambar tampil pada galeri detail dan dapat diperbesar.
   */
  gallery?:
    | {
        image?: (number | null) | Media;
        caption?: string | null;
        id?: string | null;
      }[]
    | null;
  externalLink?: string | null;
  featured?: boolean | null;
  order?: number | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  image?: (number | null) | Media;
  author?: (number | null) | Team;
  category: string;
  tags?:
    | {
        tag: string;
        id?: string | null;
      }[]
    | null;
  publishedAt: string;
  seo?: {
    title?: string | null;
    description?: string | null;
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}

export interface Team {
  id: number;
  name: string;
  role: string;
  biography: string;
  photo?: (number | null) | Media;
  order?: number | null;
  socials?:
    | {
        label: string;
        url?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  clientName: string;
  position?: string | null;
  company: string;
  quote: string;
  photo?: (number | null) | Media;
  approved?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  category?: string | null;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service: string;
  message: string;
  consent: boolean;
  status?: ('baru' | 'dihubungi' | 'selesai') | null;
  updatedAt: string;
  createdAt: string;
}

export interface SiteSetting {
  websitePackages?: import('./website-packages').WebsitePackage[] | null;
  id: number;
  name: string;
  logoWhite?: (number | null) | Media;
  logoNavy?: (number | null) | Media;
  favicon?: (number | null) | Media;
  /**
   * Unggah mockup atau foto proyek. Gambar contoh dapat diganti di sini.
   */
  heroImage?: (number | null) | Media;
  /**
   * Gambar perangkat atau produk di bagian keahlian dan proses.
   */
  featureImage?: (number | null) | Media;
  description: string;
  heroTitle: string;
  heroCopy: string;
  statement: string;
  email?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  socials?:
    | {
        label: string;
        url: string;
        id?: string | null;
      }[]
    | null;
  footerNote?: string | null;
  seoDescription?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

export interface Navigation {
  id: number;
  links?:
    | {
        label: string;
        href: string;
        order?: number | null;
        enabled?: boolean | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}

