// pages/index.tsx
import Head from "next/head";
import properties from "../lib/properties";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>TakeOverRumah.id</title>
        <meta name="description" content="Website properti profesional take over rumah" />
      </Head>

      <Navbar />

      <main className="p-4 space-y-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold">Take Over Rumah Termurah</h1>
        <p className="text-muted">Pilih rumah impianmu dengan cicilan takeover ringan.</p>

        <div className="grid md:grid-cols-2 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TakeOverRumah.id</title>
        <meta name="description" content="Platform properti take over rumah profesional & terpercaya" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700">TakeOverRumah.id</h1>
            <nav className="space-x-4 text-sm text-gray-700">
              <a href="/" className="hover:text-blue-600">Beranda</a>
              <a href="/listing" className="hover:text-blue-600">Properti</a>
              <a href="/simulasi" className="hover:text-blue-600">Simulasi</a>
              <a href="/admin/upload" className="hover:text-blue-600">Upload</a>
              <a href="https://wa.me/6281234567890" target="_blank" className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded">Konsultasi</a>
            </nav>
          </div>
        </header>

        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Solusi Properti Take Over Termudah</h2>
            <p className="mb-6 text-lg">Temukan rumah idaman, jual properti dengan cepat, dan konsultasikan langsung via WhatsApp.</p>
            <a href="/listing" className="bg-white text-blue-700 px-6 py-3 font-semibold rounded shadow hover:bg-gray-100 transition">Jelajahi Properti</a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold text-center mb-10">Kenapa TakeOverRumah.id?</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold text-lg mb-2">Profesional & Terpercaya</h4>
              <p className="text-gray-600 text-sm">Tim kami berpengalaman dalam transaksi properti dan legalitas aman.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold text-lg mb-2">Simulasi Angsuran</h4>
              <p className="text-gray-600 text-sm">Cek kemampuan bayar dan pilih cicilan terbaik untukmu.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <h4 className="font-semibold text-lg mb-2">Langsung Hubungi Penjual</h4>
              <p className="text-gray-600 text-sm">Tersedia tombol WhatsApp langsung ke pemilik atau agen properti.</p>
            </div>
          </div>
        </section>

        <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TakeOverRumah.id — Solusi Properti Aman & Terjangkau
        </footer>
      </div>
    </>
  );
}
import WhatsAppButton from "@/components/WhatsAppButton"; // Tambahkan di atas

export default function Home() {
  return (
    <div className="p-6">
      {/* ...konten homepage... */}
      <WhatsAppButton /> {/* ← Tambahkan ini */}
    </div>
  );
}
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from("properti")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!error && data) {
        setListings(data);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Selamat Datang di TakeOverRumah.id</h1>
      <p className="text-gray-600 mb-6">
        Temukan rumah impian Anda dengan mudah dan cepat.
      </p>

      <h2 className="text-xl font-semibold mb-3">Properti Terbaru</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listings.map((item) => (
          <Link href={`/detail/${item.id}`} key={item.id} className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={item.foto1 || "/placeholder.jpg"} alt={item.nama} className="w-full h-48 object-cover" />
            <div className="p-3">
              <h3 className="font-bold text-lg">{item.nama}</h3>
              <p className="text-sm text-gray-500">{item.lokasi}</p>
              <p className="text-green-600 font-semibold mt-1">Rp {Number(item.harga).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      <WhatsAppButton />
    </div>
  );
}
