const DEFAULT_DATA = {
  settings: {
    siteTitle: "Aaradhya Web Studio",
    heroHeading: "We design modern websites with premium motion and glass UI.",
    heroSub: "Aaradhya Web Studio is a next-level web presence template for portfolios, business pages, and creative studios. Clean structure, elegant gradients, and smooth interactions.",
    logoUrl: "logo.png",
    contactEmail: "yourmail@example.com",
    contactPhone: "+91 9561851358"
  },
  stats: [
    { label: "Projects", count: 42 },
    { label: "Clients", count: 18 },
    { label: "Quality", count: 99 }
  ],
  services: [
    { title: "Business websites", desc: "Clean, trustworthy, and conversion-focused websites for small businesses and studios.", icon: "01" },
    { title: "Portfolio websites", desc: "Elegant showcase pages with filters, animated cards, and a premium presentation style.", icon: "02" },
    { title: "Landing pages", desc: "High-impact landing pages built to guide attention and improve engagement.", icon: "03" }
  ],
  projects: [
    { type: "web", title: "Studio landing page", desc: "Hero-first layout with CTA, services, and conversion-ready structure.", meta: "Website" },
    { type: "ui", title: "Glass dashboard", desc: "Layered cards, subtle shadows, and motion-driven premium interface design.", meta: "UI" },
    { type: "brand", title: "Tech identity system", desc: "Logo-ready visual language for startup or creator brand presentation.", meta: "Brand" },
    { type: "web", title: "Multi-page business site", desc: "Home, services, pricing, FAQ, and contact sections arranged professionally.", meta: "Website" },
    { type: "ui", title: "Animated cards", desc: "Reveal animation and hover lift effects to create a premium feel.", meta: "UI" },
    { type: "brand", title: "AWS-inspired visual", desc: "Cloud-shaped badge for a more recognizable and technology-focused look.", meta: "Brand" }
  ],
  testimonials: [
    { text: "The website looks premium and feels like a real modern studio brand.", name: "Client A" },
    { text: "Fast, clean, and beautiful. The glass effect makes it stand out.", name: "Client B" },
    { text: "Very polished design. The scrolling and sections feel professional.", name: "Client C" }
  ]
};

function initData() {
  if (!localStorage.getItem("aw_data")) {
    localStorage.setItem("aw_data", JSON.stringify(DEFAULT_DATA));
  }
}

function getData() {
  initData();
  return JSON.parse(localStorage.getItem("aw_data"));
}

function saveData(data) {
  localStorage.setItem("aw_data", JSON.stringify(data));
}

// Ensure data is initialized
initData();
