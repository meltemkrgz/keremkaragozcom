import React, { useEffect, useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Send, // Form gönderme butonu için
  ChevronsUp, // ScrollToTop
  Menu, // Mobil Menü
  X, // Mobil Menü Kapatma
  Calendar, // Navbar Randevu Butonu (İletişim sayfasında farklı amaçla kullanılabilir)
  MessageSquare, // Hero ikon
  Clock, // Çalışma saatleri ikonu (opsiyonel)
} from "lucide-react";
import "./Iletisim.css";

const useIntersectionObserver = (options) => {
  const [entry, setEntry] = React.useState(null);
  const [node, setNode] = React.useState(null);
  const observer = React.useRef(null);

  React.useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    );
    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};

const AnimatedSection = ({
  children,
  animationClass = "animate-fadeInUp",
  threshold = 0.1,
  className = "",
  delayClass = "",
}) => {
  const [ref, entry] = useIntersectionObserver({ threshold });
  const isVisible = entry?.isIntersecting;
  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? `${animationClass} ${delayClass}` : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) setIsVisible(true);
    else setIsVisible(false);
  };
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="scroll-to-top-btn"
        aria-label="Sayfanın başına dön"
      >
        <ChevronsUp size={24} />
      </button>
    )
  );
};
// --- Yardımcı Bileşenlerin Sonu ---

const Iletisim = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(""); // '', 'loading', 'success', 'error'

  const counselorName = "Kerem Karagöz";
  const clinicName = "Kerem Karagöz Psikolojik Danışmanlık Merkezi";
  const clinicAddress =
    "Kemaliye Mh. Cumhuriyet Meydanı. No:7 Kat:1, 1 No'lu İşyeri Hendek/SAKARYA";
  const clinicPhone = "+90 506 164 4741";
  const clinicEmail = "danismapsikolojisi@gmail.com";
  const instagramLink = "https://www.instagram.com/danismapsikolojisi";
  const linkedinLink =
    "https://www.linkedin.com/in/kerem-karag%C3%B6z-463951181/";
  const workingHours = {
    weekdays: "Hafta içi: 09:30 - 22:00 ",
    saturday: "Cumartesi: 09:30 - 22:00 ",
    sunday: "Online seanslar için iletişime geçiniz ",
  };
  const mapEmbedUrlApiKey = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
    clinicAddress
  )}`;
  const mapEmbedUrlNoApi = `https://maps.google.com/maps?q=${encodeURIComponent(
    clinicAddress
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapEmbedUrl = mapEmbedUrlNoApi;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navLinks = [
    { path: "/", text: "Anasayfa" },
    { path: "/hakkimda", text: "Hakkımda" },
    { path: "/hizmetlerim", text: "Hizmetlerim" },
    { path: "/blog", text: "Blog" },
    { path: "/iletisim", text: "İletişim" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    console.log("Form verileri:", formData);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setFormStatus(""), 5000);
    } catch (error) {
      console.error("Form gönderme hatası:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 5000);
    }
  };

  return (
    <div className="iletisim-page">
      {" "}
      {/* Sayfaya özel CSS hedeflemesi için */}
      <nav
        className={`navbar ${
          typeof window !== "undefined" && window.scrollY > 50 ? "scrolled" : ""
        }`}
      >
        <div className="nav-container container">
          <a href="/" className="nav-logo">
            <img src="/logo.png" alt={`${clinicName} logo`} />
            <span>{counselorName}</span>
          </a>
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`nav-link ${
                  typeof window !== "undefined" &&
                  window.location.pathname === link.path
                    ? "active"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}
            {isMenuOpen && (
              <a
                href="#iletisim-formu" // Sayfa içi link
                className="appointment-btn btn btn-primary nav-link-mobile-cta"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar size={18} />
                Hemen Ulaşın
              </a>
            )}
          </div>
          <div className="nav-actions">
            <a
              href="#iletisim-formu"
              className="appointment-btn btn btn-primary"
            >
              <Calendar size={18} />
              Formu Doldur
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="hero-iletisim">
        <div className="hero-background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container">
          <AnimatedSection animationClass="animate-fadeInUp">
            <MessageSquare
              size={64}
              className="mb-2"
              style={{ color: "var(--accent-primary)" }}
            />
            <h1 className="iletisim-main-title">Bize Ulaşın</h1>
            <p className="iletisim-subtitle">
              Sorularınız, randevu talepleriniz veya herhangi bir konuda bilgi
              almak için aşağıdaki formu doldurabilir veya doğrudan iletişim
              bilgilerimizden bize ulaşabilirsiniz. Size yardımcı olmaktan
              mutluluk duyarız.
            </p>
            <a href="#iletisim-formu" className="btn btn-primary hero-btn">
              <Send size={20} /> Formu Gönderin
            </a>
          </AnimatedSection>
        </div>
      </section>
      {/* İletişim İçerik Alanı (Form ve Bilgiler) */}
      <section className="iletisim-content-section" id="iletisim-formu">
        <div className="container">
          <div className="iletisim-grid">
            {/* İletişim Formu */}
            <AnimatedSection
              className="contact-form-wrapper"
              animationClass="animate-slideInLeft"
            >
              <h3>Mesajınızı Bırakın</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Adınız Soyadınız</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Örn: Ayşe Yılmaz"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta Adresiniz</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Örn: ayse@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefon Numaranız (Opsiyonel)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Örn: 0555 123 4567"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Konu</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    aria-required="true"
                  >
                    <option value="">İlgilendiğiniz Hizmeti Seçiniz...</option>
                    <option value="Bireysel Danışmanlık Randevusu">
                      Bireysel Danışmanlık Randevusu
                    </option>
                    <option value="EMDR Terapisi Randevusu">
                      EMDR Terapisi Randevusu
                    </option>
                    <option value="Aile ve Çift Danışmanlığı Randevusu">
                      Aile ve Çift Danışmanlığı Randevusu
                    </option>
                    <option value="Attentioner / MOXO Bilgi">
                      Attentioner / MOXO Randevusu
                    </option>
                    <option value="Genel Bilgi Alma">Genel Bilgi Alma</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mesajınız</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Mesajınızı buraya yazınız..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                  disabled={formStatus === "loading"}
                >
                  {formStatus === "loading" ? (
                    "Gönderiliyor..."
                  ) : (
                    <>
                      <Send size={18} /> Formu Gönder
                    </>
                  )}
                </button>
                {formStatus === "success" && (
                  <p
                    className="mt-2"
                    style={{ color: "var(--accent-primary-dark)" }}
                  >
                    Mesajınız başarıyla gönderildi! En kısa sürede size dönüş
                    yapacağız.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="mt-2" style={{ color: "red" }}>
                    Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra
                    tekrar deneyin veya doğrudan bizimle iletişime geçin.
                  </p>
                )}
              </form>
            </AnimatedSection>

            {/* İletişim Bilgileri */}
            <AnimatedSection
              className="iletisim-details-wrapper"
              animationClass="animate-slideInRight"
              delayClass="delay-1"
            >
              <h3>İletişim Bilgilerimiz</h3>
              <p className="intro">
                Merkezimize telefon, e-posta veya sosyal medya üzerinden
                ulaşabilir, randevu alabilir veya sorularınızı iletebilirsiniz.
              </p>

              <div className="iletisim-bilgi-item">
                <div className="icon-wrapper">
                  <MapPin />
                </div>
                <div className="info-content">
                  <strong>Adresimiz</strong>
                  <span>{clinicAddress}</span>
                </div>
              </div>

              <div className="iletisim-bilgi-item">
                <div className="icon-wrapper">
                  <Phone />
                </div>
                <div className="info-content">
                  <strong>Telefon</strong>
                  <a href={`tel:${clinicPhone.replace(/\s/g, "")}`}>
                    {clinicPhone}
                  </a>
                </div>
              </div>

              <div className="iletisim-bilgi-item">
                <div className="icon-wrapper">
                  <Mail />
                </div>
                <div className="info-content">
                  <strong>E-posta</strong>
                  <a href={`mailto:${clinicEmail}`}>{clinicEmail}</a>
                </div>
              </div>

              <div className="iletisim-bilgi-item">
                <div className="icon-wrapper">
                  <Clock />
                </div>
                <div className="info-content">
                  <strong>Çalışma Saatleri</strong>
                  <span>{workingHours.weekdays}</span>
                  <br />
                  <span>{workingHours.saturday}</span>
                  <br />
                  <span>{workingHours.sunday}</span>
                </div>
              </div>

              <div className="iletisim-social-links">
                <a>
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/3d-fluency/100/instagram-new.png"
                    alt="instagram-new"
                  />
                </a>
                <a>
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/3d-fluency/94/linkedin--v2.png"
                    alt="linkedin--v2"
                  />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      {/* Harita Bölümü */}
      <section className="map-section">
        <div className="container">
          <AnimatedSection
            className="section-header"
            animationClass="animate-fadeInUp"
          >
            <h2 style={{ color: "var(--accent-secondary)" }}>Konumumuz</h2>
            <p className="subtitle">
              Merkezimize kolayca ulaşım sağlayabilirsiniz.
            </p>
          </AnimatedSection>
          <AnimatedSection
            className="map-container"
            animationClass="animate-zoomIn"
          >
            <iframe
              src={mapEmbedUrl}
              style={{ border: 0 }} // style prop'u doğrudan kullanılabilir
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${clinicName} Konumu`}
            ></iframe>
          </AnimatedSection>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <a href="/" className="footer-logo">
                <img
                  src="/logo.png"
                  alt={`${clinicName} logo`}
                  style={{ width: "36px", height: "auto" }}
                />
                {counselorName}
              </a>
              <p>
                Ruh sağlığınızı desteklemek ve yaşam kalitenizi artırmak için
                buradayım. Gizlilik ve etik ilkelere bağlı kalarak profesyonel
                danışmanlık hizmeti sunmaktayım.
              </p>
              <div className="footer-socials">
                <a>
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/3d-fluency/100/instagram-new.png"
                    alt="instagram-new"
                  />
                </a>
                <a>
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/3d-fluency/94/linkedin--v2.png"
                    alt="linkedin--v2"
                  />
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Hızlı Erişim</h4>
              <ul>
                {navLinks.map((link) => (
                  <li key={`footer-${link.path}`}>
                    <a href={link.path}>{link.text}</a>
                  </li>
                ))}
                <li>
                  <a href="/kvkk">KVKK & Aydınlatma Metni</a>
                </li>
              </ul>
            </div>
            <div className="footer-section footer-contact-info-footer">
              <h4>İletişim Bilgileri</h4>
              <address>
                <p>
                  <MapPin
                    size={16}
                    style={{ marginRight: "0.5rem", verticalAlign: "sub" }}
                  />{" "}
                  {clinicAddress}
                </p>
                <p>
                  <Mail
                    size={16}
                    style={{ marginRight: "0.5rem", verticalAlign: "sub" }}
                  />{" "}
                  <a href={`mailto:${clinicEmail}`}>{clinicEmail}</a>
                </p>
                <p>
                  <Phone
                    size={16}
                    style={{ marginRight: "0.5rem", verticalAlign: "sub" }}
                  />{" "}
                  <a href={`tel:${clinicPhone.replace(/\s/g, "")}`}>
                    {clinicPhone}
                  </a>
                </p>
              </address>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {clinicName}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default Iletisim;
