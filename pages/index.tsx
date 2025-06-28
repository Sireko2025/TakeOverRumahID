import Head from "next/head";

export default function Home() {
  return (
    <div className="p-6">
      <Head>
        <title>TakeOverRumah.id</title>
        <meta name="description" content="Website properti profesional take over rumah" />
      </Head>
      <h1 className="text-2xl font-bold">Selamat Datang di TakeOverRumah.id</h1>
      <p className="text-muted">Website properti profesional & terpercaya.</p>
    </div>
  );
}
