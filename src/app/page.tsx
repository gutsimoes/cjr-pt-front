import Head from "next/head";
import { HeadMetaType } from "../types/headMetaType";
import FeedDeslogado from "../pages/feed-deslogado";

export const metadata: HeadMetaType = {
  title: "Avaliação de Professores",
  description: "Avaliação de professores da Universidade de Brasília",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main>
        <FeedDeslogado/>
      </main>
  </>
  );
}
