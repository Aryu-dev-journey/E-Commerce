import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import api from "../api/axios";
export default function ShopPage() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  // ----------------------------------------------------
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [activeTag, setActiveTag] = useState("all");
  const [perPage] = useState(12);
  const [page, setPage] = useState(1);

  //  --------------------------------------------------------------------
  useEffect(() => {
    api
      .get("/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(` If Error Getting Products: ${error}`));
  }, []);

  //  -------------------------------------------------------------------------
  const tags = useMemo(
    () => ["all", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  // const handleAdd = {

  //   const product = {

  //   }

  // }

  // Filtering + sorting
  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        String(p.price).includes(query)
    );
    if (activeTag !== "all")
      list = list.filter((p) => p.category === activeTag);

    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, activeTag, sort]);

  // Pagination
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);
  // ----------------------------------------------------------------------------
  const totalPages = Math.max(2, Math.ceil(filtered.length / perPage));

  return (
    <>
      <div className="min-h-screen bg-black text-white antialiased">
        <header className="max-w-7xl mx-auto p-6 flex items-center justify-between"></header>

        <main className="max-w-7xl mx-auto px-6 pb-12">
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar / Controls */}

            <aside className="md:col-span-1 order-2 md:order-1">
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
                    className="w-full bg-black/5 text-black placeholder-black/60 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/40"
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
                              : "bg-white/80 text-black border-white/20"
                          }`}>
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
                      className="w-full rounded-md px-3 py-2 bg-black/5 text-black focus:outline-none focus:ring-2 focus:ring-black/40">
                      <option value="recommended">Recommended</option>
                      <option value="price-asc">Price: Low → High</option>
                      <option value="price-desc">Price: High → Low</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-gray-300">
                  <h3 className="text-sm font-semibold mb-2">
                    About this shop
                  </h3>
                  <p className="text-sm text-gray-400">
                    A minimal black & white storefront focused on clarity and
                    accessibility.
                  </p>
                </div>
              </div>
            </aside>

            {/* -------------------------------------------------------------------------- */}
            {/* Products Area */}
            <section className="md:col-span-3 order-1 md:order-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">All Products</h2>
                  <p className="text-sm text-gray-400">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Display fetched products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((p) => (
                  <Link key={p.id} to={`/Shop/${p.id}`}>
                    <article
                      key={p.id}
                      className="bg-white text-black rounded-2xl shadow-md overflow-hidden">
                      <div className="aspect-[4/3]">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium text-lg">{p.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {p.category}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <div className="text-xl font-semibold">
                              ₹{p.price}
                            </div>
                            <div className="text-xs text-gray-500">
                              Inclusive of taxes
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button className="px-3 py-2 rounded-lg border border-black bg-black text-white font-medium hover:opacity-95">
                              Add
                            </button>

                            <button className="px-3 py-2 rounded-lg bg-white text-black border border-white/10 hover:opacity-95">
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-md bg-white/5 disabled:opacity-40">
                  Prev
                </button>

                <span className="text-sm text-gray-400">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-md bg-white/5 disabled:opacity-40">
                  Next
                </button>
              </div>
            </section>
          </section>
        </main>

        <footer className="border-item border-white/6 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} B&W Atelier — Crafted with restraint.
          </div>
        </footer>
      </div>
    </>
  );
}
