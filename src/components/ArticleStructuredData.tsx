import { useEffect } from "react";

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  image?: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
}

const ArticleStructuredData = ({
  title,
  description,
  image,
  author,
  publishedTime,
  modifiedTime,
  url,
}: ArticleStructuredDataProps) => {
  useEffect(() => {
    const siteUrl = "https://terasdakwah.com";
    const fullUrl = `${siteUrl}${url}`;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: description,
      image: image || `${siteUrl}/favicon.png`,
      author: {
        "@type": "Organization",
        name: author || "Teras Dakwah",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "Yayasan Teras Dakwah Indonesia",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/favicon.png`,
        },
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": fullUrl,
      },
      url: fullUrl,
    };

    // Create or update script tag
    const scriptId = "article-structured-data";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement;

    if (scriptTag) {
      scriptTag.textContent = JSON.stringify(structuredData);
    } else {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      scriptTag.textContent = JSON.stringify(structuredData);
      document.head.appendChild(scriptTag);
    }

    // Cleanup on unmount
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, image, author, publishedTime, modifiedTime, url]);

  return null;
};

export default ArticleStructuredData;
