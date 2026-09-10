"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { Loader2, Send } from "lucide-react";

const SERVICE_OPTIONS = [
  "Home Purchase",
  "Refinance",
  "Investment Property",
  "Conventional Loan",
  "FHA",
  "Reverse Mortgage",
  "Non-QM",
  "Private Lending",
  "Other",
];

interface ContactFormProps {
  showConsent?: boolean;
  dark?: boolean;
}

export default function ContactForm({ showConsent = true, dark = false }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (showConsent && !consent) {
      toast.error("Please confirm consent to be contacted.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message, consent }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      toast.success("Thank you! We'll be in touch shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setService("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const labelClass = `mb-1.5 block text-sm font-medium ${dark ? "text-white" : "text-[#102A43]"}`;
  const inputClass = `w-full rounded-md border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#078BE7] focus:ring-2 focus:ring-[#078BE7]/30 ${
    dark
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/50"
      : "border-[#DCE8F0] bg-white text-[#102A43] placeholder:text-[#627D98]"
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label htmlFor="contact-service" className={labelClass}>
            Financing Interest
          </label>
          <select
            id="contact-service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            <option value="">Select an option</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder="Tell us about your financing goals..."
        />
      </div>

      {showConsent && (
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 rounded border-[#DCE8F0] text-[#078BE7] focus:ring-[#078BE7]"
          />
          <label
            htmlFor="contact-consent"
            className={`text-sm ${dark ? "text-white/80" : "text-[#627D98]"}`}
          >
            I consent to being contacted by Pro-Vision Team Funding Inc. regarding my inquiry.
          </label>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        Send Message
      </button>
    </form>
  );
}
