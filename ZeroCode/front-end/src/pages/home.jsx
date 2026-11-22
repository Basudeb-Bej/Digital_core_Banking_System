// front-end/src/pages/home.jsx  (Bootstrap classes only, no custom CSS)
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Carousel, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUniversity, FaEnvelope, FaPaperPlane, FaShieldAlt, FaClock,
  FaFilePdf, FaEye, FaEyeSlash, FaBell, FaArrowRight, FaPlay, FaPause,
} from "react-icons/fa";

import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";
import img4 from "../assets/img/image14.png";
import img8 from "../assets/img/image15.png";
import img5 from "../assets/img/image16.png";
import img6 from "../assets/img/image17.png";
import img7 from "../assets/img/image18.png";
import img9 from "../assets/img/image19.png";
import img10 from "../assets/img/image20.png";
import img11 from "../assets/img/image21.png";
import img12 from "../assets/img/image22.png";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const NAVBAR_OFFSET = 84; // px: height of the fixed navbar (pill + top margin)
const SLIDE_H = 340 + NAVBAR_OFFSET; // px: total hero height including the area behind the navbar
const HERO_ART_H = 290; // px: box the banking illustration must fit inside
/* Minimal keyframes (Bootstrap has no motion utilities). Disabled for reduced-motion users. */
const ANIM_CSS = `
@keyframes zb-in-right { from { opacity: 0; transform: translateX(90px); } to { opacity: 1; transform: none; } }
@keyframes zb-float { 50% { transform: translateY(-10px); } }
@keyframes zb-zoom { to { transform: scale(1.08); } }
@keyframes zb-marquee { to { transform: translateX(-50%); } }
.carousel-item.active .zb-in { animation: zb-in-right .85s cubic-bezier(.22,1,.36,1) both; }
.carousel-item.active .zb-d1 { animation-delay: .15s; }
.carousel-item.active .zb-d2 { animation-delay: .3s; }
.carousel-item.active .zb-d3 { animation-delay: .45s; }
.carousel-item.active .zb-zoom { animation: zb-zoom 8s ease-out both; }
@keyframes zb-gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes zb-blob { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(50px, -35px) scale(1.18); } }
.zb-bg-hero { background: linear-gradient(120deg, #ffffff, #e6eefd, #f7faff, #d9e6fc); background-size: 300% 300%; animation: zb-gradient 16s ease infinite; }
.zb-bg-soft { background: linear-gradient(120deg, #f8f9fa, #e9f0fd, #f8f9fa, #eef3fc); background-size: 300% 300%; animation: zb-gradient 24s ease infinite; }
.zb-blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .55; pointer-events: none; animation: zb-blob 14s ease-in-out infinite; }
@keyframes zb-grow { 0% { transform: scaleY(0); } 25%, 85% { transform: scaleY(1); } 100% { transform: scaleY(0); } }
@keyframes zb-draw { 0% { stroke-dashoffset: 400; } 40%, 85% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 400; } }
@keyframes zb-card { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-14px) rotate(-3deg); } }
@keyframes zb-pulse { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.7); opacity: 0; } }
@keyframes zb-coin { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 100% { transform: translateY(-130px); opacity: 0; } }
@keyframes zb-toast { 0%, 8% { transform: translateX(70px); opacity: 0; } 20%, 70% { transform: none; opacity: 1; } 85%, 100% { transform: translateX(70px); opacity: 0; } }
@keyframes zb-check { 0% { stroke-dashoffset: 60; } 30%, 100% { stroke-dashoffset: 0; } }
.zb-bar { transform-box: fill-box; transform-origin: bottom; animation: zb-grow 6s ease-in-out infinite; }
.zb-line { stroke-dasharray: 400; animation: zb-draw 6s ease-in-out infinite; }
.zb-card-f { transform-box: fill-box; transform-origin: center; animation: zb-card 5s ease-in-out infinite; }
.zb-pulse { transform-box: fill-box; transform-origin: center; animation: zb-pulse 2.4s ease-out infinite; }
.zb-coin { opacity: 0; animation: zb-coin 4s ease-in infinite; }
.zb-toast { animation: zb-toast 6s ease infinite; }
.zb-check { stroke-dasharray: 60; animation: zb-check 3s ease infinite; }
.zb-float { animation: zb-float 5s ease-in-out infinite; }
.zb-marquee { display: flex; width: max-content; animation: zb-marquee 40s linear infinite; }
.zb-marquee:hover { animation-play-state: paused; }
.zb-reveal { opacity: 0; transform: translateX(70px); transition: opacity .8s ease, transform .8s cubic-bezier(.22,1,.36,1); }
.zb-reveal.zb-left { transform: translateX(-70px); }
.zb-reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .zb-in, .zb-zoom, .zb-float, .zb-marquee, .zb-bg-hero, .zb-bg-soft, .zb-blob,
  .zb-bar, .zb-line, .zb-card-f, .zb-pulse, .zb-coin, .zb-toast, .zb-check { animation: none !important; }
  .zb-reveal { opacity: 1; transform: none; transition: none; }
}`;

/* Animated banking illustration: growing chart, floating card, rising coins, security shield */
function HeroBankingAnimation() {
  const bars = [[96, 42], [138, 62], [180, 52], [222, 80], [264, 66], [306, 94], [348, 112]];
  return (
    <svg viewBox="40 40 590 382" preserveAspectRatio="xMidYMid meet" style={{ height: "100%", width: "100%" }}
      role="img" aria-label="Animated banking dashboard with growing balance chart, bank card and security shield">
      <defs>
        <linearGradient id="zbh-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e3a8a" /><stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="zbh-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16a34a" /><stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <filter id="zbh-sh" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0b1f3a" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Dashboard panel */}
      <g filter="url(#zbh-sh)"><rect x="70" y="60" width="360" height="270" rx="16" fill="#fff" /></g>
      <rect x="70" y="60" width="360" height="46" rx="16" fill="#0b1f3a" />
      <rect x="70" y="90" width="360" height="16" fill="#0b1f3a" />
      <circle cx="94" cy="83" r="5" fill="#c9962b" />
      <text x="108" y="87" fontSize="12" fontWeight="600" fill="#fff">ZeroBank</text>
      <text x="92" y="134" fontSize="11" fill="#64748b">Account balance</text>
      <text x="92" y="164" fontSize="24" fontWeight="700" fill="#0b1f3a">₹ 4,82,500</text>
      <rect x="320" y="132" width="86" height="26" rx="13" fill="#dcfce7" />
      <text x="363" y="150" fontSize="12" fontWeight="700" fill="#16a34a" textAnchor="middle">▲ 8.4%</text>

      {/* Bars grow in sequence, then reset */}
      {bars.map(([x, h], i) => (
        <rect key={x} className="zb-bar" x={x} y={302 - h} width="28" height={h} rx="5"
          fill={i === 6 ? "#1e3a8a" : i % 2 ? "#2563eb" : "#bfd2fb"} style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
      <path className="zb-line" pathLength="400" d="M104 238 L152 222 L194 230 L236 200 L278 212 L320 184 L362 166"
        fill="none" stroke="#c9962b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="92" y1="306" x2="408" y2="306" stroke="#e2e8f0" strokeWidth="2" />

      {/* Coins rising from the card */}
      {[[400, 0], [450, 1.3], [500, 2.6]].map(([x, d]) => (
        <g key={x} className="zb-coin" style={{ animationDelay: `${d}s` }}>
          <circle cx={x} cy="250" r="14" fill="#e9c46a" stroke="#b7791f" strokeWidth="2" />
          <text x={x} y="255" fontSize="14" fontWeight="700" fill="#8a5a0b" textAnchor="middle">₹</text>
        </g>
      ))}

      {/* Floating bank card */}
      <g filter="url(#zbh-sh)">
        <g className="zb-card-f">
          <rect x="330" y="240" width="270" height="165" rx="16" fill="url(#zbh-card)" />
          <rect x="356" y="272" width="42" height="32" rx="6" fill="#e9c46a" />
          <path d="M356 288 H398 M377 272 V304" stroke="#b7791f" strokeWidth="1.5" />
          <g fill="#fff" opacity="0.9">
            {[356, 404, 452, 500].map((x) => <rect key={x} x={x} y="328" width="40" height="8" rx="4" />)}
          </g>
          <text x="356" y="372" fontSize="12" fill="#fff" opacity="0.8">ZEROBANK  •  DEBIT</text>
          <circle cx="552" cy="370" r="16" fill="#fff" opacity="0.28" />
          <circle cx="536" cy="370" r="16" fill="#fff" opacity="0.2" />
        </g>
      </g>

      {/* Credit notification */}
      <g className="zb-toast">
        <rect x="60" y="352" width="230" height="46" rx="12" fill="#fff" stroke="#dde3ec" />
        <circle cx="86" cy="375" r="12" fill="#dcfce7" />
        <path d="M80 375 l5 5 l9 -10" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="108" y="371" fontSize="12" fontWeight="700" fill="#0b1f3a">₹25,000 credited</text>
        <text x="108" y="387" fontSize="10" fill="#64748b">Salary • just now</text>
      </g>

      {/* Security shield with pulse ring */}
      <circle className="zb-pulse" cx="530" cy="132" r="48" fill="none" stroke="#16a34a" strokeWidth="3" />
      <g filter="url(#zbh-sh)">
        <path d="M530 70 L580 88 V132 C580 162 560 184 530 196 C500 184 480 162 480 132 V88 Z" fill="url(#zbh-shield)" />
      </g>
      <path className="zb-check" pathLength="60" d="M507 134 L525 152 L555 114" fill="none" stroke="#fff"
        strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Animated network of connected dots, drawn behind the first hero slide */
function HeroParticlesCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf;
    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      w = canvas.width = p.clientWidth;
      h = canvas.height = p.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random() * (w || 900), y: Math.random() * (h || 440),
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach((n, i) => {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 99, 235, 0.35)";
        ctx.fill();
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 * (1 - d / 140)})`;
            ctx.stroke();
          }
        }
      });
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} aria-hidden="true"
      className="position-absolute top-0 start-0 w-100 h-100" style={{ pointerEvents: "none" }} />
  );
}

/* Slides in (from the right by default) when scrolled into view */
function Reveal({ children, from = "right", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`zb-reveal ${from === "left" ? "zb-left" : ""} ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

const EMPTY_CONTACT = { name: "", email: "", phone: "", subject: "General Inquiry", message: "" };

/* ---------------- Hero ---------------- */
/* NOTE: call as a plain function, not as <ImageSlide/>. react-bootstrap's Carousel only
   works when its direct children are <Carousel.Item> elements. */
function ImageSlide({ src, alt, title, text, children }) {
  return (
    <Carousel.Item key={src}>
      <div className="position-relative bg-dark overflow-hidden" style={{ height: SLIDE_H }}>
        <img src={src} alt={alt} className="w-100 h-100 zb-zoom" style={{ objectFit: "cover" }} />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ paddingTop: NAVBAR_OFFSET }}>
          <div className="container px-5">
            <div className="col-lg-6 text-white">
              <h2 className="fw-bold display-6 zb-in">{title}</h2>
              <p className="lead mb-4 zb-in zb-d1">{text}</p>
              <div className="zb-in zb-d2">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </Carousel.Item>
  );
}

function HomeCarousel() {
  const [showKnowMore, setShowKnowMore] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactData, setContactData] = useState(EMPTY_CONTACT);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const scrollToOpenAccount = () =>
    document.getElementById("open-account-section")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const setField = (k) => (e) => setContactData({ ...contactData, [k]: e.target.value });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback({ type: "", text: "" });
    try {
      const res = await axios.post(`${BASE_URL}/api/users/contact`, contactData);
      setFeedback({ type: "success", text: res.data.message || "Message sent to ZeroBank Support." });
      setContactData(EMPTY_CONTACT);
    } catch (err) {
      setFeedback({ type: "danger", text: err.response?.data?.message || "Failed to send message. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="zb-bg-soft overflow-hidden">
      <style>{ANIM_CSS}</style>
      <Carousel interval={6000} pause={false} touch className="border-bottom border-warning border-3">
        <Carousel.Item>
          <div className="position-relative overflow-hidden d-flex align-items-start zb-bg-hero"
            style={{ minHeight: SLIDE_H, paddingTop: NAVBAR_OFFSET + 6, paddingBottom: 40 }}>
            <span className="zb-blob bg-primary" style={{ width: 280, height: 280, top: -80, right: "8%" }} aria-hidden="true" />
            <span className="zb-blob bg-info" style={{ width: 220, height: 220, bottom: -70, left: "30%", animationDelay: "-5s" }} aria-hidden="true" />
            <HeroParticlesCanvas />
            <div className="container position-relative">
              <div className="row align-items-center g-4">
                <div className="col-lg-6 text-center text-lg-start">
                  <h1 className="fw-bold display-5 text-dark zb-in">ZeroBank Digital Banking</h1>
                  <p className="lead text-secondary mb-4 zb-in zb-d1">
                    Savings, loans and business banking, available online around the clock.
                  </p>
                  <div className="zb-in zb-d2">
                    <Button size="lg" onClick={() => setShowKnowMore(true)}>
                      About ZeroBank <FaArrowRight size={13} className="ms-1" />
                    </Button>
                  </div>
                </div>
                <div className="col-lg-6 text-center zb-in zb-d3" style={{ height: HERO_ART_H }}>
                  <HeroBankingAnimation />
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>

        {ImageSlide({
          src: img1, alt: "Trusted banking", title: "Trusted banking since 1990",
          text: "Your security and trust are our top priorities.",
          children: <Button size="lg" onClick={scrollToOpenAccount}>Open an account</Button>,
        })}

        {ImageSlide({
          src: img2, alt: "Financial services", title: "Complete financial services",
          text: "Loans, savings and investment options tailored for you.",
          children: <Button size="lg" variant="success" href="/services">Explore services</Button>,
        })}

        {ImageSlide({
          src: img3, alt: "Support", title: "Bank anytime, anywhere",
          text: "24/7 support and seamless online banking.",
          children: (
            <Button size="lg" variant="light" onClick={() => { setFeedback({ type: "", text: "" }); setShowContact(true); }}>
              <FaEnvelope className="me-2" />Contact us
            </Button>
          ),
        })}
      </Carousel>

      {/* Announcement bar */}
      <div className="bg-dark text-white py-2 small d-flex align-items-center overflow-hidden">
        <FaBell className="text-warning flex-shrink-0 mx-3" />
        <div className="overflow-hidden flex-grow-1">
          <div className="zb-marquee">
            {[0, 1].map((g) => (
              <div key={g} className="d-flex flex-shrink-0" aria-hidden={g === 1}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="px-4 text-nowrap">
                    Welcome to ZeroBank, your trusted partner in financial services
                    <span className="text-warning mx-4">•</span>
                    Open a savings or current account online in minutes
                    <span className="text-warning mx-4">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-4 py-lg-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-5"><Reveal from="left" className="h-100"><NoticeBar /></Reveal></div>
          <div className="col-12 col-lg-7" id="open-account-section" style={{ scrollMarginTop: NAVBAR_OFFSET }}>
            <Reveal delay={150} className="h-100"><BankForm /></Reveal>
          </div>
        </div>
      </div>

      <CardSlider />

      {/* About modal */}
      <Modal show={showKnowMore} onHide={() => setShowKnowMore(false)} size="lg" centered scrollable>
        <Modal.Header closeButton className="bg-dark text-white" closeVariant="white">
          <Modal.Title className="fs-5 d-flex align-items-center gap-2"><FaUniversity /> About ZeroBank</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <h4 className="fw-bold">Welcome to ZeroBank</h4>
          <p className="text-secondary">
            Founded in 1990, ZeroBank provides secure deposit accounts, loans and personal service to individuals and businesses.
          </p>
          <div className="row g-3 mb-3">
            {[
              [FaShieldAlt, "text-primary", "Bank-grade security", "256-bit SSL, layered firewalls and active fraud detection protect every transaction."],
              [FaClock, "text-success", "24×7 banking", "Real-time transfers, bill payments and statements at any hour."],
            ].map(([Icon, color, title, text]) => (
              <div className="col-md-6" key={title}>
                <div className="border rounded-3 p-3 h-100 bg-light">
                  <h6 className={`fw-bold ${color} d-flex align-items-center gap-2`}><Icon /> {title}</h6>
                  <p className="small text-secondary mb-0">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <h6 className="fw-bold">What we offer</h6>
          <ul className="small text-secondary mb-0">
            <li>Savings and current accounts</li>
            <li>Small business, personal and gold loans</li>
            <li>Online approval and verified digital records</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowKnowMore(false)}>Close</Button>
          <Button onClick={() => { setShowKnowMore(false); scrollToOpenAccount(); }}>Open an account</Button>
        </Modal.Footer>
      </Modal>

      {/* Contact modal */}
      <Modal show={showContact} onHide={() => setShowContact(false)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 d-flex align-items-center gap-2"><FaEnvelope className="text-primary" /> Contact ZeroBank Support</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleContactSubmit}>
          <Modal.Body className="p-4">
            {feedback.text && (
              <Alert variant={feedback.type} dismissible onClose={() => setFeedback({ type: "", text: "" })}>
                {feedback.text}
              </Alert>
            )}
            <p className="text-secondary small">Your message goes straight to our support desk.</p>
            <Form.Group className="mb-3"><Form.Label>Name</Form.Label>
              <Form.Control value={contactData.name} onChange={setField("name")} placeholder="Full name" required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Email</Form.Label>
              <Form.Control type="email" value={contactData.email} onChange={setField("email")} placeholder="name@example.com" required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Mobile number</Form.Label>
              <Form.Control type="tel" value={contactData.phone} onChange={setField("phone")} placeholder="9876543210" required /></Form.Group>
            <Form.Group><Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} value={contactData.message} onChange={setField("message")} placeholder="How can we help?" required /></Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowContact(false)} disabled={sending}>Cancel</Button>
            <Button type="submit" disabled={sending} className="d-flex align-items-center gap-2">
              {sending ? <><Spinner size="sm" /> Sending…</> : <><FaPaperPlane /> Send message</>}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

/* ---------------- What's new ---------------- */
function NoticeBar() {
  const notices = [
    { date: "27 August 2025", text: "Highlight new digital services like mobile apps or UPI integration.", pdf: "/pdfs/abc.pdf" },
    { date: "09 June 2025", text: "Display latest interest rates, loan offers, and deposit schemes.", pdf: "/pdfs/Interest-Rates-Notice.pdf" },
    { date: "12 June 2025", text: "Announce important regulatory updates and compliance guidelines.", pdf: "/pdfs/Regulatory-Updates.pdf" },
    { date: "03 June 2025", text: "Share holiday schedules and working hours of branches.", pdf: "/pdfs/Holiday-Schedule.pdf" },
    { date: "06 June 2025", text: "Provide customer awareness messages on fraud prevention and security.", pdf: "/pdfs/Fraud-Prevention.pdf" },
  ];
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % notices.length), 3000);
    return () => clearInterval(t);
  }, [playing, notices.length]);

  const open = (i) => {
    setCurrent(i);
    window.open(notices[i].pdf, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card bg-dark text-white shadow-sm h-100 border-0">
      <div className="card-header border-secondary d-flex justify-content-between align-items-center py-3">
        <h5 className="mb-0 text-warning d-flex align-items-center gap-2"><FaBell size={16} /> What's new</h5>
        <button type="button" className="btn btn-outline-light btn-sm rounded-circle" style={{ width: 34, height: 34 }}
          onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <FaPause size={11} /> : <FaPlay size={11} />}
        </button>
      </div>
      <div className="list-group list-group-flush">
        {notices.map((n, i) => (
          <button key={n.pdf} type="button" onClick={() => open(i)}
            className={`list-group-item list-group-item-action bg-transparent text-white border-secondary text-start ${i === current ? "border-start border-warning border-4 bg-white bg-opacity-10" : ""}`}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-semibold small">{n.date}</span>
              <FaFilePdf className="text-warning" />
            </div>
            <span className="small text-white-50">{n.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Account form ---------------- */
const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
const EMPTY_FORM = {
  fullName: "", email: "", mobile: "", aadhaar: "", aadhaardoc: null, pan: "", pandoc: null,
  accountType: "", state: "", city: "", signature: null, photo: null,
  language: "", consent: false, password: "", confirmPassword: "", gender: "",
};

function BankForm() {
  const formRef = useRef(null);
  const [data, setData] = useState(EMPTY_FORM);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setData((p) => ({ ...p, [name]: type === "file" ? files?.[0] || null : type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v === null || v === "") return;
        fd.append(k, typeof v === "boolean" ? String(v) : v);
      });
      await axios.post(`${BASE_URL}/api/accounts`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setMessage({ type: "success", text: "Your account application was submitted successfully." });
      setData(EMPTY_FORM);
      formRef.current?.reset();
    } catch (err) {
      setMessage({ type: "danger", text: err?.response?.data?.message || err.message || "Failed to submit." });
    } finally {
      setSubmitting(false);
    }
  };

  const input = (label, name, props = {}) => (
    <div className="col-12 col-sm-6">
      <label className="form-label fw-semibold small" htmlFor={`f-${name}`}>{label}</label>
      <input id={`f-${name}`} name={name} className="form-control" required
        {...(props.type === "file" ? {} : { value: data[name] })} onChange={onChange} {...props} />
    </div>
  );
  const select = (label, name, options) => (
    <div className="col-12 col-sm-6">
      <label className="form-label fw-semibold small" htmlFor={`f-${name}`}>{label}</label>
      <select id={`f-${name}`} name={name} className="form-select" value={data[name]} onChange={onChange} required>
        <option value="">Select</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
  const password = (label, name, show, toggle) => (
    <div className="col-12 col-sm-6">
      <label className="form-label fw-semibold small" htmlFor={`f-${name}`}>{label}</label>
      <div className="input-group">
        <input id={`f-${name}`} name={name} type={show ? "text" : "password"} className="form-control"
          value={data[name]} onChange={onChange} required />
        <button type="button" className="btn btn-outline-secondary" onClick={toggle}
          aria-label={show ? "Hide password" : "Show password"}>
          {show ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
        </button>
      </div>
    </div>
  );
  const heading = (t) => <h6 className="col-12 fw-bold text-primary border-bottom pb-1 mb-0 mt-2">{t}</h6>;

  return (
    <form ref={formRef} onSubmit={onSubmit} className="card shadow-sm h-100 border-0">
      <div className="card-header bg-white py-3">
        <h4 className="mb-0 fw-bold">Open your account</h4>
        <div className="small text-secondary">Takes about five minutes. Fields marked required must be filled.</div>
      </div>
      <div className="card-body p-3 p-md-4">
        <div className="row g-3">
          {message.text && <div className="col-12"><div className={`alert alert-${message.type} mb-0 py-2 small`}>{message.text}</div></div>}

          {heading("Personal details")}
          {input("Full name", "fullName", { placeholder: "As on your ID" })}
          {input("Email address", "email", { type: "email", placeholder: "name@example.com" })}
          {input("Mobile number", "mobile", { type: "tel", placeholder: "10-digit number" })}
          {select("Gender", "gender", ["Male", "Female", "Other"])}
          {select("Preferred language", "language", ["English", "Hindi", "Bengali", "Other"])}
          {select("State", "state", STATES)}
          {input("City", "city", { placeholder: "City" })}

          {heading("Identity documents")}
          {input("Aadhaar number", "aadhaar", { placeholder: "12 digits", pattern: "^[0-9]{12}$", title: "Enter a valid 12-digit Aadhaar number" })}
          {input("Aadhaar document", "aadhaardoc", { type: "file" })}
          <div className="col-12 col-sm-6">
            <label className="form-label fw-semibold small" htmlFor="f-pan">PAN number</label>
            <input id="f-pan" name="pan" className="form-control" value={data.pan} required placeholder="ABCDE1234F"
              pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$" title="Enter a valid PAN, for example ABCDE1234F"
              onChange={(e) => setData({ ...data, pan: e.target.value.toUpperCase() })} />
          </div>
          {input("PAN document", "pandoc", { type: "file" })}
          {input("Photo", "photo", { type: "file" })}
          {input("Signature", "signature", { type: "file" })}

          {heading("Account and security")}
          {select("Account type", "accountType", ["Savings", "Current"])}
          <div className="col-sm-6 d-none d-sm-block" />
          {password("Password", "password", showPw, () => setShowPw((s) => !s))}
          {password("Confirm password", "confirmPassword", showPw2, () => setShowPw2((s) => !s))}

          <div className="col-12">
            <div className="form-check bg-light border rounded-3 p-3 ps-5">
              <input type="checkbox" className="form-check-input" id="zb-consent" name="consent"
                checked={data.consent} onChange={onChange} required />
              <label className="form-check-label small text-secondary" htmlFor="zb-consent">
                I authorize ZeroBank to contact me about this application.
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer bg-white text-end py-3">
        <button type="submit" className="btn btn-primary px-5" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}

/* ---------------- Products ---------------- */
function CardSlider() {
  const [selected, setSelected] = useState(null);
  const products = [
    { title: "Savings Account", image: img4, description: "Secure your money while earning attractive interest. Enjoy easy online access, digital banking features, and flexible deposits and withdrawals." },
    { title: "Current Account", image: img5, description: "Built for businesses, with seamless transactions, real-time banking and dedicated services to manage payments, receivables and cash flow." },
    { title: "Home Loan", image: img6, description: "Achieve your dream home with low-interest loans and flexible repayment options. Quick approvals and personalized plans." },
    { title: "Gold Loan", image: img7, description: "Unlock instant funds using your gold as collateral. Minimal documentation, competitive rates and quick disbursement." },
    { title: "Business Loan", image: img8, description: "Scale your business with customized loans, flexible repayment terms, fast approvals and competitive rates." },
    { title: "Agriculture Loan", image: img9, description: "Support farming with loans for seeds, equipment or irrigation. Easy access, timely disbursement and affordable rates." },
    { title: "Health Insurance", image: img10, description: "Protect yourself and your family with plans covering hospitalization and critical illnesses." },
    { title: "General Insurance", image: img11, description: "Safeguard your assets with reliable policies against unforeseen risks." },
    { title: "Life Insurance", image: img12, description: "Secure your family's future with comprehensive life insurance plans." },
  ];

  return (
    <section className="bg-white border-top py-5">
      <div className="container">
        <div className="text-center mx-auto mb-4" style={{ maxWidth: 560 }}>
          <h2 className="fw-bold">Products and services</h2>
          <p className="text-secondary mb-0">Accounts, loans and insurance for individuals, farmers and businesses.</p>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {products.map((p, idx) => (
            <div className="col" key={p.title}>
              <Reveal delay={(idx % 3) * 120} className="h-100">
              <div className="card h-100 border shadow-sm">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                      <img src={p.image} alt="" style={{ maxWidth: 38, maxHeight: 38 }} />
                    </div>
                    <h5 className="card-title fw-bold mb-0">{p.title}</h5>
                  </div>
                  <p className="card-text text-secondary small flex-grow-1">{p.description}</p>
                  <button type="button" className="btn btn-outline-primary btn-sm align-self-start" onClick={() => setSelected(p)}>
                    Learn more
                  </button>
                </div>
              </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <Modal show={Boolean(selected)} onHide={() => setSelected(null)} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title className="fs-5 d-flex align-items-center gap-2">
            {selected?.image && <img src={selected.image} alt="" style={{ width: 26, height: 26 }} />}
            {selected?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-secondary">{selected?.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setSelected(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export { NoticeBar, CardSlider, BankForm };
export default HomeCarousel;
