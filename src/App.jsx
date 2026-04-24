import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { 
  Droplet, 
  IceCream, 
  Wine, 
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

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor hidden md:block"
      style={{
        left: x,
        top: y,
        background: '#0038FF',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

const SectionTag = ({ children }) => (
  <motion.span
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="text-ice-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block"
  >
    {children}
  </motion.span>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(248, 250, 252, 0)', 'rgba(255, 255, 255, 0.8)']
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(16px)']
  );
  const borderBottom = useTransform(
    scrollY,
    [0, 100],
    ['1px solid rgba(91, 233, 255, 0)', '1px solid rgba(91, 233, 255, 0.1)']
  );

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter, borderBottom }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <img src="/logo.png" alt="EMILO" className="h-12 w-auto object-contain" />
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-ice-muted hover:text-ice-primary transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-20 bg-ice-bg/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-heading font-bold text-slate-900 hover:text-ice-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const words = "Reliable Distribution of Water, Ice Cubes & Beverages".split(" ");

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-[-10%] w-[600px] h-[600px] bg-ice-primary/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div style={{ y, opacity }}>
          <div className="flex flex-wrap gap-x-3 mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", damping: 15 }}
                className="font-heading font-extrabold text-4xl md:text-7xl text-slate-900 tracking-tight leading-[1.1]"
              >
                {word === "EMIL" ? "EMILO" : word}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-lg md:text-xl text-ice-muted max-w-lg mb-10 leading-relaxed"
          >
            A registered and growing distribution company based in Kochi. Providing purity and reliability to your doorstep.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
          >
            <a href="#products" className="ice-button inline-flex items-center gap-2 group">
              Explore Products
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>

        {/* Abstract Orb */}
        <div className="relative h-[500px] hidden md:block">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Layered Water/Ice Visual */}
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-ice-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute inset-0 glass-card rounded-[40%] rotate-45 opacity-50" />
              <div className="absolute inset-4 glass-card rounded-[35%] -rotate-12 opacity-80" />
              <div className="absolute inset-8 glass-card rounded-[45%] rotate-12 flex items-center justify-center overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-br from-ice-primary/40 to-transparent" />
                <Droplet size={80} className="text-slate-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { label: "Est. 30 July", value: "2025" },
    { label: "Kochi", value: "Based" },
    { label: "Growing", value: "Network" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTag>Who We Are</SectionTag>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 20 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              Built on Quality.<br />Driven by Reliability.
            </h2>
            <div className="space-y-6 text-ice-muted text-lg leading-relaxed">
              <p>
                EMILO ENTERPRISES PRIVATE LIMITED is a registered and growing distribution company based in Kochi, Kerala. We specialize in the distribution of high-quality drinking water, ice cubes, and beverages.
              </p>
              <p>
                Our mission is to bridge the gap between premium production and end-user accessibility, ensuring that every household, retailer, and event in Kochi has access to pure, safe, and cold refreshments whenever they need it.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, type: "spring", damping: 20 }}
                className="glass-card p-8 rounded-2xl flex items-center justify-between group hover:border-ice-primary/40 transition-colors"
              >
                <div>
                  <p className="text-ice-muted text-sm tracking-widest uppercase mb-1">{stat.label}</p>
                  <p className="text-3xl font-heading font-extrabold text-slate-900">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-ice-primary/10 flex items-center justify-center text-ice-primary group-hover:bg-ice-primary group-hover:text-ice-bg transition-all duration-300">
                  <ChevronRight />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const products = [
    {
      icon: <Droplet size={48} className="text-ice-primary" />,
      name: "25L Drinking Water",
      description: "Purity in every drop. Sourced and filtered with the highest standards for your daily hydration needs.",
      tag: "Best Seller"
    },
    {
      icon: <IceCream size={48} className="text-ice-primary" />,
      name: "Premium Ice Cubes",
      description: "Crystal clear, long-lasting ice cubes for restaurants, bars, and special events. Food-grade and hygienic.",
      tag: "Pure Ice"
    },
    {
      icon: <Wine size={48} className="text-ice-primary" />,
      name: "Sip-ups & Beverages",
      description: "A refreshing range of sip-ups and bottled beverages to beat the Kerala heat. Perfect for shops and events.",
      tag: "Refreshing"
    }
  ];

  return (
    <section id="products" className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionTag>What We Distribute</SectionTag>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Our Product Range</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: "spring", damping: 20 }}
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-bold tracking-widest text-ice-primary uppercase py-1 px-3 border border-ice-primary/30 rounded-full">
                  {product.tag}
                </span>
              </div>
              <div className="mb-8 p-4 w-fit bg-ice-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                {product.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{product.name}</h3>
              <p className="text-ice-muted leading-relaxed">{product.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl border-dashed border-ice-primary/20 flex flex-col items-center justify-center text-center opacity-60"
        >
          <div className="w-16 h-16 rounded-full border border-dashed border-ice-primary/40 flex items-center justify-center mb-4">
            <CheckCircle2 className="text-ice-primary/40" />
          </div>
          <p className="text-ice-muted font-medium italic">More premium products coming soon to our distribution network.</p>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Local distribution across Kochi", desc: "Comprehensive coverage of Ernakulam and nearby areas." },
    { title: "Bulk supply for shops & retailers", desc: "Competitive pricing and reliable stock for your business." },
    { title: "Event supply (water and ice)", desc: "Timely delivery for weddings, parties, and corporate gatherings." },
    { title: "Fast and reliable delivery", desc: "Our fleet ensures your orders reach you within the promised window." },
  ];

  return (
    <section id="services" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTag>How We Serve Kochi</SectionTag>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8">
              Reliability is our <br /><span className="text-ice-primary">core promise.</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-12">
               <div className="p-6 glass-card rounded-2xl text-center">
                  <Truck className="mx-auto mb-3 text-ice-primary" size={32} />
                  <p className="text-slate-900 font-bold text-sm">Swift Delivery</p>
               </div>
               <div className="p-6 glass-card rounded-2xl text-center">
                  <CheckCircle2 className="mx-auto mb-3 text-ice-primary" size={32} />
                  <p className="text-slate-900 font-bold text-sm">Registered Co.</p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 group"
              >
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="absolute left-0 top-0 w-[2px] bg-ice-primary/30 group-hover:bg-ice-primary transition-colors"
                />
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-ice-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-ice-muted leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    { label: "Warehouse Operations", src: "/gallery_warehouse.png", span: "md:col-span-2 md:row-span-2" },
    { label: "Delivery Fleet", src: "/gallery_truck.png", span: "md:col-span-1 md:row-span-1" },
    { label: "Quality Assurance", src: "/gallery_ice.png", span: "md:col-span-1 md:row-span-1" },
    { label: "Bulk Inventory", src: "/gallery_inventory.png", span: "md:col-span-1 md:row-span-1" },
    { label: "Kochi Distribution", src: "/gallery_kochi.png", span: "md:col-span-1 md:row-span-1" },
    { label: "Retail Partners", src: "/gallery_retail.png", span: "md:col-span-4 md:row-span-1" },
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionTag>Our Operations</SectionTag>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Behind the Purity</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px] grid-flow-dense">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-[32px] overflow-hidden glass-card group cursor-pointer ${img.span} border-[6px] border-white shadow-xl shadow-ice-primary/5`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ice-primary/20 via-transparent to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-white to-transparent">
                <p className="text-slate-900 font-heading font-bold">{img.label}</p>
                <div className="flex items-center gap-2 text-ice-primary text-xs mt-1">
                  <span>View Details</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormState({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-ice-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <SectionTag>Get In Touch</SectionTag>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Connect with Us</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl text-center"
          >
            <div className="w-12 h-12 bg-ice-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-ice-primary">
              <MapPin size={24} />
            </div>
            <h4 className="text-slate-900 font-bold mb-4">Location</h4>
            <p className="text-ice-muted text-sm leading-relaxed">
              Building No. 16/1748, Kalathumkadavil House, Edakochi, Ernakulam, Kochi, Kerala - 682010
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-3xl text-center"
          >
            <div className="w-12 h-12 bg-ice-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-ice-primary">
              <Phone size={24} />
            </div>
            <h4 className="text-slate-900 font-bold mb-4">Phone</h4>
            <p className="text-ice-muted text-lg">+91 90487 77764</p>
            <p className="text-ice-muted text-xs mt-2 italic">Mon - Sat: 9am - 7pm</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 rounded-3xl text-center"
          >
            <div className="w-12 h-12 bg-ice-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-ice-primary">
              <Mail size={24} />
            </div>
            <h4 className="text-slate-900 font-bold mb-4">Email</h4>
            <p className="text-ice-muted">info@emilenterprises.com</p>
            <p className="text-ice-muted">sales@emilenterprises.com</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card p-10 md:p-16 rounded-[40px]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-ice-primary uppercase">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="w-full bg-ice-bg/50 border border-ice-primary/10 rounded-xl px-5 py-4 text-slate-900 focus:border-ice-primary/50 focus:ring-1 focus:ring-ice-primary/50 outline-none transition-all"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-ice-primary uppercase">Phone</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Your Number"
                  className="w-full bg-ice-bg/50 border border-ice-primary/10 rounded-xl px-5 py-4 text-slate-900 focus:border-ice-primary/50 focus:ring-1 focus:ring-ice-primary/50 outline-none transition-all"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-ice-primary uppercase">Message</label>
              <textarea 
                required
                rows="4"
                placeholder="How can we help you?"
                className="w-full bg-ice-bg/50 border border-ice-primary/10 rounded-xl px-5 py-4 text-slate-900 focus:border-ice-primary/50 focus:ring-1 focus:ring-ice-primary/50 outline-none transition-all resize-none"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>
            <button 
              type="submit" 
              className="ice-button w-full flex items-center justify-center gap-2 group"
            >
              {submitted ? (
                <span className="flex items-center gap-2"><CheckCircle2 size={20} /> Message Sent!</span>
              ) : (
                <span className="flex items-center gap-2">Send Message <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-ice-primary/10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="EMILO" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-ice-muted text-sm italic">Pure. Fast. Reliable.</p>
          </div>

          <div className="flex gap-8">
            <a href="#about" className="text-ice-muted hover:text-ice-primary transition-colors text-sm">About</a>
            <a href="#products" className="text-ice-muted hover:text-ice-primary transition-colors text-sm">Products</a>
            <a href="#contact" className="text-ice-muted hover:text-ice-primary transition-colors text-sm">Contact</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-ice-muted text-[10px] tracking-widest uppercase">
            © 2025 EMILO ENTERPRISES (OPC) PRIVATE LIMITED. All rights reserved.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-ice-primary/20 transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-ice-primary" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

function App() {
  return (
    <div className="bg-ice-bg text-white selection:bg-ice-primary/30 selection:text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
