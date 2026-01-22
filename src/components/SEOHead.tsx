import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

const SEOHead = ({
  title = "Yayasan Teras Dakwah Indonesia - Manfaat untuk Ummat",
  description = "Yayasan Teras Dakwah Indonesia adalah wadah dakwah yang mengusung konsep terbuka, sederhana, dan merangkul semua kalangan. Fokus pada dakwah, pendidikan Islam, dan kegiatan sosial.",
  keywords = "dakwah, yayasan islam, kajian islam, pendidikan islam, sosial kemanusiaan, yogyakarta, teras dakwah",
  image = "https://geijbsqbxetxoplrjmro.supabase.co/storage/v1/object/public/media/og-image.jpg",
  url,
  type = "website",
  author = "Yayasan Teras Dakwah Indonesia",
  publishedTime,
  modifiedTime,
  section,
}: SEOHeadProps) => {
  const siteUrl = "https://terasdakwah.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullTitle = title.includes("Teras Dakwah") ? title : `${title} | Teras Dakwah`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (element) {
        element.content = content;
      } else {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", name);
        } else {
          element.name = name;
        }
        element.content = content;
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    setMetaTag("author", author);

    // Open Graph tags
    setMetaTag("og:title", fullTitle, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:image", image, true);
    setMetaTag("og:url", fullUrl, true);
    setMetaTag("og:type", type, true);
    setMetaTag("og:site_name", "Teras Dakwah", true);
    setMetaTag("og:locale", "id_ID", true);

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", fullTitle);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);
    setMetaTag("twitter:site", "@terasdakwah");

    // Article specific tags
    if (type === "article") {
      if (publishedTime) {
        setMetaTag("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        setMetaTag("article:modified_time", modifiedTime, true);
      }
      if (author) {
        setMetaTag("article:author", author, true);
      }
      if (section) {
        setMetaTag("article:section", section, true);
      }
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = fullUrl;
    } else {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      canonicalLink.href = fullUrl;
      document.head.appendChild(canonicalLink);
    }

    // Cleanup function not needed as we're just updating existing tags
  }, [fullTitle, description, keywords, image, fullUrl, type, author, publishedTime, modifiedTime, section]);

  return null; // This component doesn't render anything visible
};

export default SEOHead;
