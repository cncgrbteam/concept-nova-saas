import Head from "next/head";
import { MetaProps } from "./Meta.type";

const keywords = "FMA, fashion, etc ";

export const Meta = ({
  title = "About FMA",
  description = "FMA is a ...",
}: MetaProps) => {
  const name = "FMA";
  const metaContent = description || keywords;

  return (
    <Head>
      <meta data-charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content={name} />
      <meta name="author" content={name} />
      <meta name="theme-color" content="#b8c1ec" />
      <meta name="pagename" content={metaContent} />
      <meta itemProp="name" content={name} />
      <meta property="og:site_name" content={name} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={name} />
      <meta property="og:description" content={metaContent} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={name} />
      <meta property="twitter:description" content={name} />
      <meta property="twitter:image:alt" content={`A picture of ${name}`} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};
