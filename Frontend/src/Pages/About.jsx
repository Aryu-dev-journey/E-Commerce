import React from "react";
import { motion } from "framer-motion";

export default function AboutPage({
  brandName = "Eclipse",
  tagline = "Minimal. Timeless. Designed to endure.",
}) {
  return (
    <>
      <div className="min-h-screen bg-black text-white antialiased">
        {/* Container */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Hero */}
          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-lg bg-white flex items-center justify-center">
                <span className="text-black font-semibold">{brandName[0]}</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {brandName}
                </h1>
                <p className="text-sm text-gray-400">{tagline}</p>
              </div>
            </div>

            <nav
              aria-label="breadcrumb"
              className="text-sm text-gray-500 uppercase tracking-wide"
            >
              <ol className="flex gap-2">
                <li className="hover:text-white transition">Home</li>
                <li className="opacity-50">/</li>
                <li className="font-medium text-white">About</li>
              </ol>
            </nav>
          </header>

          {/* Intro */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 space-y-8"
          >
            <h2 className="text-4xl font-bold leading-tight">
              We craft essentials that feel effortless.
            </h2>
            <p className="text-gray-400 max-w-3xl text-sm leading-relaxed">
              At Eclipse, design meets restraint. We believe true luxury lies in
              simplicity — in materials that last, and forms that feel familiar
              yet fresh. Every detail is stripped to its essence, leaving only
              what matters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="p-6 border border-white/10 rounded-lg">
                <h3 className="text-lg font-semibold">Our Mission</h3>
                <p className="mt-2 text-gray-400 text-sm">
                  To create meaningful essentials — crafted with intention,
                  built to last.
                </p>
              </div>
              <div className="p-6 border border-white/10 rounded-lg">
                <h3 className="text-lg font-semibold">Philosophy</h3>
                <p className="mt-2 text-gray-400 text-sm">
                  Minimal form, maximum function. We design around human
                  simplicity, not excess.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Story */}
          <section className="mt-20">
            <h3 className="text-2xl font-semibold">Our Journey</h3>
            <div className="mt-6 space-y-5">
              {[
                {
                  year: "2019",
                  title: "Eclipse Begins",
                  desc: "A vision born in a single-room studio — pure, functional design.",
                },
                {
                  year: "2021",
                  title: "The Expansion",
                  desc: "Our first capsule collection redefined modern minimalism.",
                },
                {
                  year: "2024",
                  title: "Sustainable Future",
                  desc: "We committed to 100% recycled materials and zero-waste packaging.",
                },
              ].map((item) => (
                <article key={item.year} className="flex items-start gap-5">
                  <div className="h-10 w-10 flex items-center justify-center border border-white/20 rounded-full text-sm font-semibold">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="mt-1 text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mt-20">
            <h3 className="text-2xl font-semibold">What Defines Us</h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Precision", blurb: "Every line has a purpose." },
                { title: "Integrity", blurb: "Designs built to last, not fade." },
                { title: "Simplicity", blurb: "Form follows function." },
                { title: "Balance", blurb: "Beauty meets clarity." },
              ].map((v) => (
                <div
                  key={v.title}
                  className="p-6 border border-white/10 rounded-lg hover:bg-white/5 transition"
                >
                  <h5 className="font-semibold">{v.title}</h5>
                  <p className="mt-2 text-gray-400 text-sm">{v.blurb}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing CTA */}
          <section className="mt-24 border border-white/10 rounded-lg p-10 text-center">
            <h4 className="text-xl font-semibold">Let's Collaborate</h4>
            <p className="mt-2 text-gray-400 text-sm">
              We work with creators, studios, and dreamers who believe in
              timeless design.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button className="py-2 px-5 border border-white rounded-md hover:bg-white hover:text-black transition">
                Get in Touch
              </button>
              <button className="py-2 px-5 bg-white text-black rounded-md hover:opacity-90 transition">
                View Catalog
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-20 text-sm text-gray-500 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Eclipse. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
