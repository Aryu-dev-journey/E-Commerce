import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [activeTag, setActiveTag] = useState("all");
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);

  // ----------------------------------------------------
  // FETCH PRODUCTS
  // ----------------------------------------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products");

        const list = res.data.products || res.data.data || res.data || [];

        // normalize MongoDB _id -> id
        const normalized = list.map((p) => ({
          ...p,
          id: p._id || p.id,
        }));

        setProducts(normalized);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // ----------------------------------------------------
  // TAGS
  // ----------------------------------------------------
  const tags = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  // ----------------------------------------------------
  // FILTER + SORT
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // PAGINATION
  // ----------------------------------------------------
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <main className="max-w-7xl mx-auto px-6 pb-12">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <aside className="md:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="p-4 rounded-2xl bg-white text-black shadow-lg">
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search name or price"
                  className="w-full rounded-md px-3 py-2 bg-black/5"
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
                            ? "bg-black text-white border-black"
                            : "bg-white text-black"
                        }`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Sort</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full rounded-md px-3 py-2 bg-black/5">
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <section className="md:col-span-3">
            <h2 className="text-xl font-semibold mb-4">All Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((p) => (
                <Link key={p.id} to={`/Shop/${p.id}`}>
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
                        <div>
                          <div className="text-xl font-semibold">
                            ₹{p.price}
                          </div>
                          <div className="text-xs text-gray-500">
                            Inclusive of taxes
                          </div>
                        </div>

                        <span className="text-sm underline">View</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}>
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}>
                Next
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
