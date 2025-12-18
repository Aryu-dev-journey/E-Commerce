import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ShopPage() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters & pagination
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [activeTag, setActiveTag] = useState("all");
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);

  // ✅ API BASE URL FROM ENV
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ----------------------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);

        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_BASE_URL]);

  // ----------------------------------------------------
  const tags = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  // Filtering + sorting
  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        String(p.price).includes(query)
    );

    if (activeTag !== "all") {
      list = list.filter((p) => p.category === activeTag);
    }

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, query, activeTag, sort]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  // ----------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="p-4 rounded-2xl bg-white text-black shadow-lg">
                <label className="block text-sm font-medium mb-2">
                  Search
                </label>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search name or price"
                  className="w-full bg-black/5 rounded-md px-3 py-2"
                />

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setActiveTag(item);
                          setPage(1);
                        }}
                        className={`text-sm px-3 py-1 rounded-full border ${
                          activeTag === item
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Sort
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-md px-3 py-2 bg-black/5"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <section className="md:col-span-3">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">All Products</h2>
              <p className="text-sm text-gray-400">
                {filtered.length} result
                {filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            {paginated.length === 0 ? (
              <p className="text-gray-400">No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((p) => (
                  <Link key={p._id || p.id} to={`/Shop/${p._id || p.id}`}>
                    <article className="bg-white text-black rounded-2xl shadow-md overflow-hidden">
                      <div className="aspect-[4/3]">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium text-lg">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.category}</p>

                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-xl font-semibold">
                            ₹{p.price}
                          </span>
                          <button className="px-3 py-2 bg-black text-white rounded-lg">
                            Add
                          </button>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-2 bg-white/5 rounded-md"
              >
                Prev
              </button>

              <span className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-2 bg-white/5 rounded-md"
              >
                Next
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
