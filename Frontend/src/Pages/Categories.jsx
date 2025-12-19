import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

const allCategories = [
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
  {
    id: "6",
    name: "Electronics",
    items: 310,
    slug: "electronics",
    icon: "chip",
  },
  { id: "7", name: "Beauty", items: 156, slug: "beauty", icon: "sparkle" },
  { id: "8", name: "Sale", items: 63, slug: "sale", icon: "tag" },
];

function Icon({ name, className = "w-6 h-6" }) {
  const icons = {
    box: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M21 16V8a2 2 0 0 0-1-1.732L13 2.268a2 2 0 0 0-2 0L4 6.268A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.732l7 4.464a2 2 0 0 0 2 0l7-4.464A2 2 0 0 0 21 16z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    shirt: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 7l2-2h3l1 1 1-1h4l1 1 1-1h3l2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    shoe: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
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
    ),
    watch: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 8v4l2 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    home: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
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
    ),
    chip: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
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
    ),
    sparkle: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l1.5 3 3 1.5-3 1.5L12 12l-1.5-3-3-1.5 3-1.5L12 3z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    tag: (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
          d="M20 10v6a2 2 0 0 1-2 2h-6l-8-8 8-8h6a2 2 0 0 1 2 2v6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  };
  return icons[name] || null;
}

function SlideMenu({
  open,
  onClose,
  title,
  products,
  loading,
  addToCart,
  addToWishlist,
  wishlist,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-3/4 bg-neutral-900 border-l border-neutral-800 z-50 overflow-y-auto">
            <div className="sticky top-0 bg-neutral-900 border-b border-neutral-800 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Close">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-700 border-t-white"></div>
                  <span className="ml-3 text-neutral-400">
                    Loading products...
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product, index) => {
                    const inWishlist = wishlist.some(
                      (p) => p.id === product.id
                    );
                    return (
                      <motion.div
                        key={product.id} // unique key
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col gap-3 p-4 rounded-lg border border-neutral-800 hover:border-neutral-700 hover:bg-white/5 transition-colors">
                        <div className="flex-none w-full aspect-square bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden">
                          {product.image || product.images?.[0] ? (
                            <img
                              src={product.image || product.images[0]}
                              alt={product.name || product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium truncate">
                            {product.name || product.title || "Unnamed Product"}
                          </h3>
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                            {product.description || "No description available"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
                          <p className="text-sm font-semibold">
                            ${product.price || "0.00"}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {product.stock > 0 ? "In stock" : "Out of stock"}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => addToCart(product)}
                            className="flex-1 px-2 py-1 bg-white text-black rounded-md text-sm font-medium hover:bg-white/90 transition">
                            Add to Cart
                          </button>
                          <button
                            onClick={() => addToWishlist(product)}
                            className={`flex-1 px-2 py-1 rounded-md text-sm font-medium border border-white/20 transition ${
                              inWishlist
                                ? "bg-white text-black"
                                : "hover:bg-white/5 text-white"
                            }`}>
                            {inWishlist ? "Wishlisted" : "Wishlist"}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function CategoriesPage({ categories = allCategories }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  const [selectedFilters, setSelectedFilters] = useState({
    onSale: false,
    new: false,
    exclusive: false,
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/Categorised");
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.log(`Error Getting Products: ${error}`);
      }
    };
    fetchAllProducts();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = categories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.includes(q)
    );
    if (sort === "popular") list = list.sort((a, b) => b.items - a.items);
    if (sort === "alpha")
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [query, sort, categories]);

  const handleCategoryClick = (cat) => {
    setSelected(cat.id);
    setDrawerTitle(cat.name);
    setDrawerOpen(true);
    setLoadingProducts(true);
    setDisplayProducts([]);

    // Filter products immediately (removed setTimeout)
    const categoryName = cat.name.toLowerCase().replace(/[\s&]/g, "");
    const filteredProducts = allProducts.filter((product) => {
      const identifiers = [
        ...(product.category ? [product.category.toLowerCase()] : []),
        ...(product.categories
          ? product.categories.map((c) => c.toLowerCase())
          : []),
        ...(product.tags ? product.tags.map((t) => t.toLowerCase()) : []),
        ...(product.slug ? [product.slug.toLowerCase()] : []),
      ];
      const normalized = identifiers.map((id) => id.replace(/[\s&]/g, ""));
      const matchesCategory = normalized.some((id) =>
        id.includes(categoryName)
      );

      let matchesFilters = true;
      if (selectedFilters.onSale)
        matchesFilters = matchesFilters && product.onSale;
      if (selectedFilters.new) matchesFilters = matchesFilters && product.isNew;
      if (selectedFilters.exclusive)
        matchesFilters = matchesFilters && product.isExclusive;

      return matchesCategory && matchesFilters;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sort === "popular") return (b.sales || 0) - (a.sales || 0);
      if (sort === "alpha") return (a.name || "").localeCompare(b.name || "");
      if (sort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

    setDisplayProducts(sortedProducts);
    setLoadingProducts(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white antialiased p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
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
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
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
              {["onSale", "new", "exclusive"].map((filter) => (
                <label key={filter} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-neutral-400"
                    checked={selectedFilters[filter]}
                    onChange={() =>
                      setSelectedFilters((prev) => ({
                        ...prev,
                        [filter]: !prev[filter],
                      }))
                    }
                  />
                  <span>
                    {filter === "new"
                      ? "New"
                      : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </span>
                </label>
              ))}
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
                {allProducts.length > 0 && (
                  <span>{allProducts.length} total products loaded</span>
                )}
              </div>
            </section>

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
                    onClick={() => handleCategoryClick(cat)}
                    className={`w-full text-left p-4 rounded-xl border border-neutral-800 hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-colors flex items-center gap-4 ${
                      selected === cat.id ? "bg-white/4" : "bg-neutral-800"
                    }`}
                    aria-pressed={selected === cat.id}>
                    <div className="flex-none p-3 rounded-lg border border-neutral-700 bg-neutral-900/40">
                      <Icon name={cat.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium">{cat.name}</h3>
                        <span className="text-xs text-neutral-400">
                          {cat.items}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-neutral-400">
                        Browse curated selection of {cat.name.toLowerCase()}.
                      </p>
                    </div>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </main>
        </div>
      </div>

      {/* Slide-out drawer */}
      <SlideMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTitle}
        products={displayProducts}
        loading={loadingProducts}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
        wishlist={wishlist}
      />
    </div>
  );
}
