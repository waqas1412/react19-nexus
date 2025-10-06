/**
 * React 19 introduces built-in support for document metadata
 * You can now render <title>, <meta>, and <link> tags directly in components
 * React will hoist them to the document <head>
 */

interface DocumentMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export function DocumentMeta({ title, description, keywords, ogImage }: DocumentMetaProps) {
  const fullTitle = `${title} | React 19 Showcase`;
  const defaultImage = 'https://react19-showcase.example.com/og-image.png';

  return (
    <>
      {/* Title tag - React 19 automatically hoists to <head> */}
      <title>{fullTitle}</title>

      {/* Meta tags */}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      
      {/* Theme color */}
      <meta name="theme-color" content="#0ea5e9" />
    </>
  );
}
