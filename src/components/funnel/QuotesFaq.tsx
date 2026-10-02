"use client";

import { useState } from "react";
import { quoteFaqs } from "@/lib/quote-faqs";

const QUOTES_PHONE = "321-234-0510";
const QUOTES_PHONE_TEL = "tel:+13212340510";

function PlusIcon() {
  return (
    <svg
      className="ic"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default function QuotesFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="band band-dark faq-c" id="faq">
      <div className="container faq-layout">
        <div className="faq-side">
          <div className="sec-title">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2">
              Straight answers<span className="dot">.</span>
            </h2>
          </div>
          <p className="faq-c-note">
            Still unsure? Call{" "}
            <a href={QUOTES_PHONE_TEL} data-track="phone">
              {QUOTES_PHONE}
            </a>
            . A real person picks up.
          </p>
        </div>
        <div className="faq faq-dark">
          {quoteFaqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                className={isOpen ? "faq-item is-open" : "faq-item"}
                key={item.q}
              >
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  {item.q}
                  <span className="faq-ic">
                    <PlusIcon />
                  </span>
                </button>
                <div className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
