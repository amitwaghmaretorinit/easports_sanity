import Head from "next/head";
import React from "react";
interface HeaderProps {
  title: string;
  content?: string;
}

export default function Header(props: HeaderProps) {
  const { title, content } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Head>
  );
}
