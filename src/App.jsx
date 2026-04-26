import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Package,
  ShoppingBag,
  Box,
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Menu, 
  X, 
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// --- Custom Social Icons (Removed in Lucide v1.0) ---

const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Twitter = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// --- Components ---



const SectionTag = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-6"
  >
    <div className="h-[1px] w-8 bg-ice-primary" />
    <span className="text-ice-primary text-[10px] font-black tracking-[0.4em] uppercase">{children}</span>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none"
      >
        <div className="max-w-5xl w-full flex justify-between items-center bg-white/80 backdrop-blur-md border border-white/40 rounded-full px-6 md:px-8 py-3 shadow-xl pointer-events-auto">
          <img src="/logo.png" alt="EMILO" className="h-10 w-auto" />
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-bold text-slate-500 hover:text-ice-primary transition-colors tracking-widest uppercase"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="ice-button !py-3 !px-6 !text-[10px]">
              GET IN TOUCH
            </a>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-lg z-[60] flex flex-col p-12 text-white"
          >
            <button onClick={() => setIsOpen(false)} className="self-end mb-12"><X size={32} /></button>
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black hover:text-ice-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <SectionTag>KOCHI'S TRUSTED DISTRIBUTOR</SectionTag>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8 uppercase">
            PREMIUM <br /> <span className="text-ice-primary">DISTRIBUTION</span> <br /> FOR KOCHI.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
            Kochi's leading distributor of premium FMCG products, high-quality ice, and refreshing beverages. Excellence in every delivery, every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#products" className="ice-button">Explore Products</a>
            <a href="#about" className="bg-slate-50 px-8 py-4 rounded-full border border-slate-200 text-slate-900 font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer">
              Our Story
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-ice-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

const About = () => {
  const stats = [
    { label: "Established", val: "2025" },
    { label: "Based In", val: "Kochi" },
    { label: "Focus", val: "Purity" },
  ];

  return (
    <section id="about" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-1 gap-6 order-2 md:order-1">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#F8FAFC] p-10 rounded-[40px] flex justify-between items-center group hover:bg-ice-primary transition-all duration-500"
              >
                <div>
                  <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2 group-hover:text-white/50">{stat.label}</p>
                  <p className="text-4xl font-black text-slate-900 group-hover:text-white">{stat.val}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-ice-primary/10 flex items-center justify-center text-ice-primary group-hover:bg-white group-hover:text-ice-primary">
                  <ChevronRight size={20} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="order-1 md:order-2">
            <SectionTag>ABOUT US</SectionTag>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight uppercase">
              DRIVEN BY QUALITY. <br /> DEFINED BY SERVICE.
            </h2>
            <div className="space-y-6 text-slate-500 text-lg leading-relaxed font-medium">
              <p>
                EMILO ENTERPRISES PRIVATE LIMITED is a registered distribution company based in Kochi, specialized in the supply of premium FMCG products, ice, and beverages.
              </p>
              <p>
                Our mission is to bridge the gap between production and accessibility, ensuring that every household, retailer, and event in Kochi has access to high-quality goods whenever they need them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const products = [
    { name: "FMCG Goods", desc: "High-quality consumer products from leading brands.", icon: <Package size={40} />, tag: "Essential" },
    { name: "Premium Ice", desc: "Crystal clear, food-grade ice cubes for any occasion.", icon: <Box size={40} />, tag: "Ice" },
    { name: "Beverages", desc: "Refreshing bottled drinks to beat the heat.", icon: <ShoppingBag size={40} />, tag: "Drinks" },
  ];

  return (
    <section id="products" className="py-32 px-6 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <SectionTag>OUR PRODUCTS</SectionTag>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase">Quality Products.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 rounded-[50px] shadow-xl hover:shadow-2xl transition-all group cursor-pointer"
            >
              <div className="w-20 h-20 bg-ice-primary/10 rounded-[30px] flex items-center justify-center text-ice-primary mb-8 group-hover:bg-ice-primary group-hover:text-white transition-all duration-500">
                {p.icon}
              </div>
              <p className="text-[10px] font-black tracking-widest text-ice-primary uppercase mb-3">{p.tag}</p>
              <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase">{p.name}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { src: "/warehouse.png", span: "md:col-span-2 md:row-span-2", text: "Local distribution across Kochi and nearby areas." },
    { src: "/truck.png", span: "md:col-span-2 md:row-span-1", text: "Fast and reliable delivery." },
    { src: "/inventory.png", span: "md:col-span-1 md:row-span-1", text: "Bulk supply for shops and retailers." },
    { src: "/map.png", span: "md:col-span-1 md:row-span-1", text: "Event supply (water and ice)." },
  ];

  return (
    <section id="gallery" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionTag>GALLERY</SectionTag>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-16 uppercase">Our Facility.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`relative rounded-[40px] overflow-hidden group ${img.span} border-8 border-[#F8FAFC] shadow-lg`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              <div className="absolute inset-0 bg-ice-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8 text-center">
                <p className="text-white font-black text-xl md:text-2xl uppercase leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 rounded-[80px] p-12 md:p-24 overflow-hidden relative shadow-3xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-ice-primary/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-20 relative z-10">
            <div className="text-white">
              <SectionTag>CONTACT US</SectionTag>
              <h2 className="text-5xl md:text-8xl font-black leading-[0.9] mb-12 uppercase">
                LET'S <br /> CONNECT.
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-center group">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-ice-accent group-hover:bg-ice-primary transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Office</p>
                    <p className="text-xl font-bold">Edakochi, Ernakulam, Kochi - 682010</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center group">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-ice-accent group-hover:bg-ice-primary transition-colors">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                    <p className="text-3xl font-black">+91 90487 77764</p>
                  </div>
                </div>
                <div className="flex gap-6 items-center group">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-ice-accent group-hover:bg-ice-primary transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-xl font-bold">info@emilenterprises.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[40px] text-slate-900 shadow-2xl lg:max-w-md ml-auto">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tighter">Send a Message</h3>
              <form className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="YOUR NAME" className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-ice-primary outline-none font-bold text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input type="tel" placeholder="YOUR PHONE" className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-ice-primary outline-none font-bold text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                  <textarea placeholder="HOW CAN WE HELP?" rows="2" className="w-full bg-slate-50 border-none rounded-xl py-3 px-5 focus:ring-2 focus:ring-ice-primary outline-none font-bold text-sm resize-none" />
                </div>
                <button className="w-full bg-ice-primary text-white py-4 rounded-full font-black text-xs tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-ice-primary/20 mt-2">
                  SEND REQUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 bg-[#F8FAFC] text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div>
          <img src="/logo.png" alt="EMILO" className="h-12 w-auto mb-8 grayscale opacity-50" />
          <p className="text-[10px] font-black tracking-widest uppercase">
            © 2025 EMILO ENTERPRISES (OPC) PVT LTD. <br /> ALL RIGHTS RESERVED.
          </p>
        </div>
        <div className="flex gap-8">
          <Instagram size={20} className="hover:text-ice-primary cursor-pointer transition-colors" />
          <Twitter size={20} className="hover:text-ice-primary cursor-pointer transition-colors" />
          <Linkedin size={20} className="hover:text-ice-primary cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="bg-white text-slate-900 selection:bg-ice-primary selection:text-white min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
