import Head from "next/head";
import React from "react";

export default function Title({ text }) {
  return (
    <Head>
      <title>{text}</title>
    </Head>
  );
}
