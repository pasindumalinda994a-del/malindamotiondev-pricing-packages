import { INSTAGRAM_PROFILE, waHref } from "../lib/contact";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 3.809v.4c0 2.43-.013 2.785-.06 3.808-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-3.809.06h-.4c-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.4c0-2.43.013-2.785.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.451 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 12.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      />
    </svg>
  );
}

type Feat = { text: string; included: boolean };

const plans: {
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  featured?: boolean;
  badge?: string;
  features: Feat[];
  cta: string;
  waMessage: string;
}[] = [
  {
    name: "Starter",
    tagline: "Clean, fast business presence",
    price: "Rs. 65,000",
    priceNote: "one-time",
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Next.js + Tailwind CSS", included: true },
      { text: "Fully responsive", included: true },
      { text: "GSAP micro-animations", included: true },
      { text: "Next.js speed optimization", included: true },
      { text: "Basic on-page SEO setup", included: true },
      { text: "Contact form", included: true },
      { text: "2 revision rounds", included: true },
      { text: "3D / WebGL", included: false },
      { text: "CMS / blog", included: false },
    ],
    cta: "Get a quote",
    waMessage:
      "Hi Malinda — I'm interested in the Starter plan for malinda.motiondev. Can we discuss?",
  },
  {
    name: "Signature",
    tagline: "Premium interactive experience",
    price: "Rs. 175,000",
    priceNote: "one-time",
    featured: true,
    badge: "Most popular",
    features: [
      { text: "Up to 10 pages", included: true },
      { text: "Next.js + Tailwind + GSAP", included: true },
      { text: "Advanced scroll animations", included: true },
      { text: "Custom transitions & UI effects", included: true },
      { text: "Next.js speed + SEO optimization", included: true },
      { text: "Keyword research + SEO content brief", included: true },
      { text: "MongoDB integration if needed", included: true },
      { text: "CMS", included: true },
      { text: "4 revision rounds", included: true },
      { text: "Awwwards-level design quality", included: true },
      { text: "3D / WebGL (add-on available)", included: false },
    ],
    cta: "Get a quote",
    waMessage:
      "Hi Malinda — I'm interested in the Signature plan for malinda.motiondev. Can we discuss?",
  },
  {
    name: "Immersive",
    tagline: "Full 3D / WebGL experience",
    price: "Rs. 300,000+",
    priceNote: "one-time, custom scope",
    features: [
      { text: "Everything in Signature", included: true },
      { text: "Three.js / WebGL scenes", included: true },
      { text: "Custom 3D interactions", included: true },
      { text: "Shader effects if needed", included: true },
      { text: "Advanced performance tuning", included: true },
      { text: "Unlimited revisions", included: true },
      { text: "Discovery call + strategy session", included: true },
      { text: "Priority delivery", included: true },
    ],
    cta: "Let's talk",
    waMessage:
      "Hi Malinda — I'd like to explore the Immersive / custom 3D plan for malinda.motiondev.",
  },
];

const addons: { name: string; price: string }[] = [
  { name: "Three.js / WebGL scene (to any plan)", price: "+ Rs. 45,000" },
  { name: "Keyword research + SEO content brief", price: "+ Rs. 25,000" },
  { name: "Extra pages (per page)", price: "+ Rs. 12,000" },
  { name: "Extra revision round", price: "+ Rs. 8,000" },
];

const ongoing: { label: string; price: string; desc: string }[] = [
  {
    label: "Hosting & maintenance",
    price: "Rs. 39,000–44,000/yr",
    desc: "Rough total per year: maintenance at Rs. 3,000/month (Rs. 36,000/year) for security updates, dependency upgrades, and small content changes, plus hosting usually Rs. 3,000–8,000/year.",
  },
  {
    label: "Domain renewal",
    price: "Rs. 3,000–5,000",
    desc: "per year for .com or .lk domain. If you already have a domain or you plan to buy one, this is not included in the package.",
  },
  {
    label: "Blog & SEO (monthly)",
    price: "Rs. 25,000",
    desc: "Optional retainer if you want search traffic to keep growing: new or updated blog posts, which keywords you rank for, and small on-page fixes (titles, headings, copy) so Google clearly understands each page.",
  },
  {
    label: "Minor feature updates",
    price: "Rs. 8,000–20,000",
    desc: "per task. New section, new page, animation tweak, etc.",
  },
];

export function PricingSection() {
  return (
    <section className="w-full bg-zinc-50 py-20 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:px-10 lg:px-16">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
  
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Premium web development pricing
          </h1>
          <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Next.js, motion, and immersive experiences — transparent tiers and
            optional add-ons.
          </p>
        </header>

        <div>
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 md:text-left">
            Pricing plans
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:bg-zinc-900/90 ${
                  plan.featured
                    ? "border-2 border-sky-500 ring-1 ring-sky-100 dark:border-sky-400 dark:ring-sky-900/40 md:-mt-1 md:mb-1"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {plan.badge ? (
                  <span className="mb-3 inline-flex w-fit rounded-md bg-sky-100 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-sky-800 dark:bg-sky-950 dark:text-sky-200">
                    {plan.badge}
                  </span>
                ) : null}
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {plan.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {plan.tagline}
                </p>
                <p className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {plan.price}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {plan.priceNote}
                </p>
                <hr className="my-4 border-zinc-200 dark:border-zinc-800" />
                <ul className="flex flex-1 flex-col gap-1.5 text-sm">
                  {plan.features.map((f) => (
                    <li
                      key={f.text}
                      className={`flex items-start gap-2 leading-snug ${
                        f.included
                          ? "text-zinc-700 dark:text-zinc-300"
                          : "text-zinc-400 line-through dark:text-zinc-500"
                      }`}
                    >
                      <span
                        className={`mt-0.5 shrink-0 ${
                          f.included
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-zinc-300 dark:text-zinc-600"
                        }`}
                      >
                        {f.included ? (
                          <CheckIcon className="block" />
                        ) : (
                          <MinusIcon className="block" />
                        )}
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>
                <a
                  href={waHref(plan.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition ${
                    plan.featured
                      ? "bg-[#185FA5] text-[#E6F1FB] hover:bg-[#378ADD]"
                      : "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {plan.cta} ↗
                </a>
              </article>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
            All plans include mobile responsiveness, SSL-ready deployment, and a
            handover call. 50% upfront, 50% on launch.
          </p>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        <div>
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 md:text-left">
            Add-ons (optional upgrades)
          </p>
          <div className="rounded-2xl border border-zinc-200 bg-white/90 px-5 py-1 dark:border-zinc-800 dark:bg-zinc-900/90">
            {addons.map((row, i) => (
              <div
                key={row.name}
                className={`flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
                  i < addons.length - 1
                    ? "border-b border-zinc-200 dark:border-zinc-800"
                    : ""
                }`}
              >
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {row.name}
                </span>
                <span className="shrink-0 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {row.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        <div>
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 md:text-left">
            Ongoing costs after launch
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ongoing.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-zinc-100/80 p-4 dark:bg-zinc-900"
              >
                <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {item.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.price}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
            Maintenance and SEO are completely optional. You can manage content
            yourself if you prefer.
          </p>
        </div>

        <div className="mx-auto flex flex-col items-center gap-4 border-t border-zinc-200 pt-10 text-center dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Questions about scope or timelines? WhatsApp or Instagram.
          </p>
          <div className="flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a
              href={waHref(
                "Hi Malinda — I'd like to chat about a project on malinda.motiondev."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#185FA5] px-6 py-3 text-sm font-semibold text-[#E6F1FB] shadow-md transition hover:bg-[#378ADD] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 sm:flex-initial"
            >
              <svg
                className="h-5 w-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp — 075 886 8067
            </a>
            <a
              href={INSTAGRAM_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 sm:flex-initial"
              aria-label="Open Malinda MotionDev on Instagram"
            >
              <InstagramIcon className="h-5 w-5 shrink-0" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
