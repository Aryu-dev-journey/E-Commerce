import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sampleCategories = [
  {
    id: "1",
    name: "New Arrivals",
    items: 124,
    slug: "new-arrivals",
    icon: "box",
  },
  { id: "2", name: "Clothing", items: 842, slug: "clothing", icon: "shirt" },
  { id: "3", name: "Footwear", items: 412, slug: "footwear", icon: "shoe" },
  {
    id: "4",
    name: "Accessories",
    items: 277,
    slug: "accessories",
    icon: "watch",
  },
  {
    id: "5",
    name: "Home & Living",
    items: 198,
    slug: "home-living",
    icon: "home",
  },
  { id: "6", name: "Tech & Gadgets", items: 310, slug: "tech", icon: "chip" },
  { id: "7", name: "Beauty", items: 156, slug: "beauty", icon: "sparkle" },
  { id: "8", name: "Sale", items: 63, slug: "sale", icon: "tag" },
];

function Icon({ name, className = "w-6 h-6" }) {
  switch (name) {
    case "box":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <path
            d="M21 16V8a2 2 0 0 0-1-1.732L13 2.268a2 2 0 0 0-2 0L4 6.268A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.732l7 4.464a2 2 0 0 0 2 0l7-4.464A2 2 0 0 0 21 16z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shirt":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <path
            d="M3 7l2-2h3l1 1 1-1h4l1 1 1-1h3l2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "shoe":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <path
            d="M2 16s2-4 8-4 8 4 8 4v2H2v-2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12V6l3-2 3 2v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "watch":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <circle
            cx="12"
            cy="12"
            r="6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 8v4l2 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "home":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <path
            d="M3 11l9-7 9 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 11v8a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1v-8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chip":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="8"
            y="8"
            width="8"
            height="8"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <path
            d="M12 3l1.5 3 3 1.5-3 1.5L12 12l-1.5-3-3-1.5 3-1.5L12 3z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tag":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden>
          <path
            d="M20 10v6a2 2 0 0 1-2 2h-6l-8-8 8-8h6a2 2 0 0 1 2 2v6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="9" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CategoriesPage({ categories = sampleCategories }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.includes(q)
    );
    if (sort === "popular") list = list.sort((a, b) => b.items - a.items);
    if (sort === "alpha")
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") list = list; // Placeholder if backend provides dates
    return list;
  }, [query, sort, categories]);

  return (
    <>
      <div className="min-h-screen bg-neutral-900 text-white antialiased p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Categories
              </h1>
              <p className="mt-1 text-sm text-neutral-400">
                Explore our catalog — monochrome, minimal and modern.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative block">
                <span className="sr-only">Search categories</span>
                <input
                  aria-label="Search categories"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="placeholder:text-neutral-500 bg-neutral-800 border border-neutral-700 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Search categories..."
                />
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden>
                    <path
                      d="M21 21l-4.35-4.35"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="11"
                      cy="11"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </label>

              <select
                aria-label="Sort categories"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 text-sm rounded-md py-2 px-3 focus:outline-none">
                <option value="popular">Most Items</option>
                <option value="alpha">A–Z</option>
                <option value="newest">Newest</option>
              </select>

              <button
                onClick={() => {
                  setQuery("");
                  setSort("popular");
                }}
                className="hidden sm:inline-block text-sm py-2 px-3 border border-neutral-700 rounded-md hover:bg-white/5">
                Reset
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Sidebar / Filters */}
            <aside className="lg:col-span-1 bg-neutral-850 border border-neutral-800 p-4 rounded-xl h-fit">
              <h3 className="text-sm font-medium mb-3">Filters</h3>
              <div className="space-y-2 text-sm text-neutral-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-neutral-400" />
                  <span>On sale</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-neutral-400" />
                  <span>New</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-neutral-400" />
                  <span>Exclusive</span>
                </label>
              </div>

              <div className="mt-4 border-t border-neutral-800 pt-4">
                <h4 className="text-xs text-neutral-400">Quick pick</h4>
                <div className="mt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setQuery("")}
                    className="text-left text-sm py-2 px-3 rounded-md hover:bg-white/5">
                    All Categories
                  </button>
                  <button
                    onClick={() => setQuery("sale")}
                    className="text-left text-sm py-2 px-3 rounded-md hover:bg-white/5">
                    Sale
                  </button>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="lg:col-span-4">
              <section className="mb-4 flex items-center justify-between">
                <p className="text-sm text-neutral-400">
                  Showing{" "}
                  <span className="text-white font-medium">
                    {filtered.length}
                  </span>{" "}
                  categories
                </p>
                <div className="text-sm text-neutral-400">
                  Select a category to explore products
                </div>
              </section>

              <AnimatePresence>
                <motion.ul
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {filtered.map((cat) => (
                    <motion.li
                      key={cat.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="list-none">
                      <button
                        onClick={() =>
                          setSelected(cat.id === selected ? null : cat.id)
                        }
                        className={`w-full text-left p-4 rounded-xl border border-neutral-800 hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors flex items-center gap-4 ${
                          selected === cat.id ? "bg-white/4" : "bg-neutral-800"
                        }`}
                        aria-pressed={selected === cat.id}>
                        <div className="flex-none p-3 rounded-lg border border-neutral-700 bg-neutral-900/40">
                          <Icon
                            name={cat.icon}
                            className="w-6 h-6 text-white"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm font-medium">{cat.name}</h3>
                            <span className="text-xs text-neutral-400">
                              {cat.items}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-neutral-400">
                            Browse curated selection of {cat.name.toLowerCase()}
                            .
                          </p>
                        </div>
                      </button>

                      {/* Expanded preview */}

                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="mt-8 p-6 rounded-lg border border-neutral-800 text-neutral-400 bg-neutral-900/30">
                  <h4 className="text-white font-medium">
                    No categories match your search
                  </h4>
                  <p className="mt-2 text-sm">
                    Try different keywords or reset filters.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
