import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    order: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("http://localhost:3000/api/ContactUs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Network response was not ok");
      setStatus("success");
      setForm({ name: "", email: "", order: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Contact form */}
        <section className="p-8 border border-white/10 rounded-2xl shadow-sm bg-white/5">
          <h1 className="text-3xl font-semibold mb-2">Contact Us</h1>
          <p className="text-sm text-gray-400 mb-6">
            Have a question about an order or our products? Leave us a message
            and we'll get back within 24–48 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: "Full name",
                  name: "name",
                  type: "text",
                  placeholder: "Jane Doe",
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  placeholder: "jane@example.com",
                },
              ].map((field) => (
                <label key={field.name} className="flex flex-col">
                  <span className="text-sm mb-1 text-gray-400">
                    {field.label}
                  </span>
                  <input
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    className="border border-white/10 bg-black/20 text-white rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                </label>
              ))}
            </div>

            {[
              {
                label: "Order number (optional)",
                name: "order",
                type: "text",
                placeholder: "#12345",
              },
              {
                label: "Subject",
                name: "subject",
                type: "text",
                placeholder: "What's this about?",
              },
            ].map((field) => (
              <label key={field.name} className="flex flex-col">
                <span className="text-sm mb-1 text-gray-400">
                  {field.label}
                </span>
                <input
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  type={field.type}
                  required={field.name !== "order"}
                  placeholder={field.placeholder}
                  className="border border-white/10 bg-black/20 text-white rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
              </label>
            ))}

            <label className="flex flex-col">
              <span className="text-sm mb-1 text-gray-400">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                required
                placeholder="Tell us the details..."
                className="border border-white/10 bg-black/20 text-white rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white/20 resize-y"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white text-black px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition disabled:opacity-60">
                {status === "sending" ? "Sending..." : "Send message"}
              </button>

              {status === "success" && (
                <span className="text-sm text-gray-400">
                  Thanks — we'll reply soon.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-red-400">
                  Something went wrong. Try again.
                </span>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-2">
              By sending this message, you agree to our{" "}
              <a className="underline" href="#">
                privacy policy
              </a>
              .
            </p>
          </form>
        </section>

        {/* Right: Contact info + map + FAQ */}
        <aside className="p-8 border border-white/10 rounded-2xl shadow-sm bg-white/5 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-medium mb-3 text-gray-300">
              Other ways to reach us
            </h2>

            <div className="space-y-4 text-sm text-gray-400">
              <ContactRow
                icon={<IconMail />}
                title="Email"
                text="support@yourecommercestore.com"
              />
              <ContactRow
                icon={<IconPhone />}
                title="Phone"
                text="+1 (555) 123-4567"
              />
              <ContactRow
                icon={<IconClock />}
                title="Support hours"
                text="Mon — Fri: 9:00 — 18:00 (UTC)"
              />
              <ContactRow
                icon={<IconLocation />}
                title="Address"
                text="123 Commerce St, Suite 101, Cityname, Country"
              />
            </div>

            <hr className="my-6 border-white/10" />

            <h3 className="text-sm font-semibold mb-3 text-gray-300">
              Quick answers
            </h3>
            <dl className="text-sm space-y-3 text-gray-400">
              <FAQ
                q="Where is my order?"
                a="Use the tracking link sent to your email, or paste your order number above and ask us to look it up."
              />
              <FAQ
                q="Returns & exchanges"
                a="We accept returns within 30 days — items must be unused. See our returns page for details."
              />
              <FAQ
                q="Bulk / wholesale"
                a="Email wholesale@yourecommercestore.com for pricing and availability."
              />
            </dl>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium mb-2 text-gray-300">
              Store location
            </div>
            <div className="w-full h-40 border border-white/10 rounded-lg overflow-hidden">
              <iframe
                title="Store location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3"
                className="w-full h-full"
                loading="lazy"></iframe>
            </div>

            <div className="mt-4 flex gap-3" aria-hidden>
              <SocialIcon label="Instagram">IG</SocialIcon>
              <SocialIcon label="Facebook">FB</SocialIcon>
              <SocialIcon label="X">X</SocialIcon>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

// Subcomponents
function ContactRow({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <div className="font-medium text-white">{title}</div>
        <div className="text-gray-400">{text}</div>
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div>
      <dt className="font-medium text-white">{q}</dt>
      <dd className="text-gray-400">{a}</dd>
    </div>
  );
}

function IconMail() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 8.5v7.5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.5" />
      <path d="M21 6H3v2.5l9 6 9-6V6z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.92.38 1.81.76 2.64a2 2 0 0 1-.45 2.11L9.91 10.09a16 16 0 0 0 6 6l1.62-1.62a2 2 0 0 1 2.11-.45c.83.38 1.72.64 2.64.76A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  );
}
function IconLocation() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function SocialIcon({ children, label }) {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 border border-white/10 rounded-md text-sm font-medium text-white"
      title={label}
      aria-label={label}>
      {children}
    </div>
  );
}
