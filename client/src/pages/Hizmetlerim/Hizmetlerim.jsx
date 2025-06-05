import React, { useEffect, useState, useRef } from "react";
import {
  UserCheck, // Bireysel Danışmanlık
  Brain, // EMDR
  Users, // Aile & Çift
  SmilePlus, // Çocuk & Ergen
  ScanSearch, // Dikkat Testleri
  Laptop2, // Online Terapi
  ChevronDown, // SSS için
  ArrowRight, // Daha fazla bilgi linki için
  Calendar, // Navbar Randevu Butonu
  Menu, // Mobil Menü
  X, // Mobil Menü Kapatma
  ChevronsUp, // ScrollToTop
  ClipboardList, // Hizmet Süreci Adım 1
  MessagesSquare, // Hizmet Süreci Adım 2
  Sparkles, // Hizmet Süreci Adım 3
  CircleCheck, // Hizmet Süreci Adım 4
  HelpCircle, // SSS İkonu
  Phone, // Footer
  Mail, // Footer
  MapPin, // Footer
  Instagram, // Footer
  Linkedin, // Footer
  Sparkle, // Genel Vurgu İkonu
} from "lucide-react";
import "./Hizmetlerim.css";
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

const Hizmetlerim = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSSS, setActiveSSS] = useState(null); // SSS için

  const counselorName = "Kerem Karagöz";
  const clinicName = "Kerem Karagöz Psikolojik Danışmanlık Merkezi";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navLinks = [
    { path: "/", text: "Anasayfa" },
    { path: "/hakkimda", text: "Hakkımda" },
    { path: "/hizmetlerim", text: "Hizmetlerim" },
    { path: "/blog", text: "Blog" },
    { path: "/Iletisim", text: "İletişim" },
  ];

  const hizmetlerData = [
    {
      id: "bireysel-danismanlik",
      title: "Bireysel Danışmanlık",
      icon: <UserCheck size={32} />,
      description:
        "Yetişkinlerin yaşadığı duygusal zorluklar, stres, kaygı, depresyon, ilişki sorunları, özgüven problemleri ve yaşam krizleri gibi konularda Bilişsel Davranışçı Terapi (BDT) ve EMDR ekolleriyle birebir destek sunulmaktadır.",
      image:
        "https://www.kucukagacpsikoloji.com/yuklemeler/bireysel-psikoloji2.jpg",
      detailsLink: "/Iletisim",
    },
    {
      id: "emdr-terapisi",
      title: "EMDR Terapisi",
      icon: <Brain size={32} />,
      description:
        "Travmatik yaşantıların (kaza, doğal afet, kayıp, istismar vb.) ve olumsuz deneyimlerin neden olduğu duygusal rahatsızlıkların (PTSD, anksiyete, fobi, yas) tedavisinde bilimsel olarak kanıtlanmış, etkili bir psikoterapi yöntemidir.",
      image:
        "https://www.psikoaktif.com/wp-content/uploads/2018/03/emdr-definition.jpg",
      detailsLink: "/Iletisim",
    },
    {
      id: "aile-cift-danismanligi",
      title: "Aile ve Çift Danışmanlığı",
      icon: <Users size={32} />,
      description:
        "Aile içi iletişim sorunları, çatışmalar, evlilik problemleri, boşanma süreçleri, ebeveynlik becerileri ve çiftler arası uyum gibi konularda MEB onaylı uzmanlıkla danışmanlık hizmeti sunulmaktadır.",
      image:
        "https://mahmudtas.com/wp-content/uploads/2024/02/Cift-Terapisi-Hizmeti-Mahmud-TAS-scaled.jpg",
      detailsLink: "/Iletisim",
    },
    {
      id: "cocuk-ergen-danismanligi",
      title: "Çocuk ve Ergen Danışmanlığı",
      icon: <SmilePlus size={32} />,
      description:
        "Çocuk ve ergenlerin gelişimsel, davranışsal ve duygusal sorunlarına (sınav kaygısı, dikkat eksikliği, davranış problemleri, akran zorbalığı, sosyal uyum) yönelik danışmanlık ve destek hizmetleri sunulur.",
      image:
        "https://www.optimumpsikoloji.com.tr/wp-content/uploads/2019/09/cocuk-ergen-psikolojik-danismanlik.jpg",
      detailsLink: "/Iletisim",
    },
    {
      id: "dikkat-testleri-gelistirme",
      title: "Dikkat Testleri ve Geliştirme",
      icon: <ScanSearch size={32} />,
      description:
        "MOXO d-CPT gibi geçerliliği ve güvenirliği kanıtlanmış dikkat testleri ile kapsamlı değerlendirme ve Attentioner gibi bilimsel temelli programlarla çocuk, ergen ve yetişkinlerde dikkat geliştirme çalışmaları yapılmaktadır.",
      image:
        "https://beyzabatirbek.com.tr/wp-content/uploads/2024/03/3-e1710239048410.png",
      detailsLink: "/Iletisim",
    },
    {
      id: "online-terapi",
      title: "Online Terapi",
      icon: <Laptop2 size={32} />,
      description:
        "Coğrafi engelleri ortadan kaldıran, zaman ve mekan esnekliği sunan, evinizin konforunda veya uygun gördüğünüz herhangi bir yerden güvenli ve etkili psikolojik destek almanızı sağlayan online seanslardır.",
      image:
        "https://semanuratici.com/wp-content/uploads/2024/07/online-terapi-1-1.png",
      detailsLink: "/Iletisim",
    },
  ];

  const hizmetSureciData = [
    {
      icon: <ClipboardList size={32} />,
      title: "İlk Değerlendirme",
      description:
        "Sorunlarınızı ve hedeflerinizi anlamak için kapsamlı bir ilk görüşme yapılır.",
    },
    {
      icon: <MessagesSquare size={32} />,
      title: "Kişiye Özel Planlama",
      description:
        "İhtiyaçlarınıza ve hedeflerinize uygun, size özel bir terapi planı oluşturulur.",
    },
    {
      icon: <Sparkles size={32} />,
      title: "Terapi Süreci",
      description:
        "Belirlenen hedeflere ulaşmak için kanıta dayalı yöntemlerle düzenli seanslar gerçekleştirilir.",
    },
    {
      icon: <CircleCheck size={32} />,
      title: "İlerleme ve Sonlandırma",
      description:
        "Süreç boyunca ilerlemeniz değerlendirilir ve hedeflere ulaşıldığında sağlıklı bir sonlandırma yapılır.",
    },
  ];

  const sssData = [
    {
      question:
        "Bir psikolojik danışmanla görüşmek için 'ciddi' bir sorunum olması mı gerekir?",
      answer:
        "Hayır, kesinlikle gerekmez. Psikolojik danışmanlık sadece 'ciddi' ruhsal sorunlar için değildir. Günlük yaşam stresi, ilişki zorlukları, karar verme süreçleri, kişisel gelişim isteği gibi pek çok konuda destek alabilirsiniz. Kendinizi daha iyi tanımak ve yaşam kalitenizi artırmak için de danışmanlık faydalı olabilir.",
    },
    {
      question: "Terapi süreci ne kadar sürer?",
      answer:
        "Terapi sürecinin uzunluğu, bireyin ihtiyaçlarına, hedeflerine, sorunun karmaşıklığına ve terapiye katılım düzeyine göre değişiklik gösterir. Bazı durumlarda birkaç seans yeterli olabilirken, bazı durumlarda daha uzun süreli bir çalışma gerekebilir. Bu konu ilk görüşmede danışmanınızla birlikte değerlendirilir.",
    },
    {
      question: "Seanslarda konuşulanlar gizli kalır mı?",
      answer:
        "Evet, gizlilik psikoterapinin en temel etik ilkelerinden biridir. Seanslarda paylaştığınız tüm bilgiler, yasal zorunluluklar (kendinize veya başkalarına zarar verme riski gibi durumlar) dışında kesinlikle gizli tutulur. Bu konu hakkında ilk seansta detaylı bilgilendirme yapılır.",
    },
    {
      question: "Online terapi yüz yüze terapi kadar etkili midir?",
      answer:
        "Araştırmalar, birçok durumda online terapinin yüz yüze terapi kadar etkili olabildiğini göstermektedir. Özellikle belirli sorun türleri ve danışan profilleri için online terapi oldukça verimli sonuçlar vermektedir. Sizin için uygun olup olmadığı danışmanınızla birlikte değerlendirilebilir.",
    },
    {
      question: "EMDR Terapisi nedir ve kimler için uygundur?",
      answer:
        "EMDR (Göz Hareketleriyle Duyarsızlaştırma ve Yeniden İşleme), özellikle travma sonrası stres bozukluğu (TSSB) tedavisinde etkili olan bir psikoterapi yaklaşımıdır. Aynı zamanda kaygı bozuklukları, fobiler, yas süreçleri gibi birçok psikolojik sorunun çözümünde de kullanılır. Danışmanınız, EMDR'nin sizin için uygun bir yöntem olup olmadığını değerlendirecektir.",
    },
  ];

  const toggleSSS = (index) => {
    setActiveSSS(activeSSS === index ? null : index);
  };

  return (
    <div className="hizmetlerim-page">
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
                href="/Iletisim"
                className="appointment-btn btn btn-primary nav-link-mobile-cta"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar size={18} />
                Randevu Al
              </a>
            )}
          </div>
          <div className="nav-actions">
            <a href="/Iletisim" className="appointment-btn btn btn-primary">
              <Calendar size={18} />
              Randevu Al
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
      <section className="hero-hizmetlerim">
        <div className="hero-background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="container">
          <AnimatedSection animationClass="animate-fadeInUp">
            <Sparkle
              size={64}
              className="mb-2"
              style={{ color: "var(--accent-primary)" }}
            />
            <h1 className="hizmetlerim-main-title">
              Ruh Sağlığınıza Değer Katın
            </h1>
            <p className="hizmetlerim-subtitle">
              Yaşam kalitenizi artırmak, zorluklarla başa çıkmak ve
              potansiyelinizi keşfetmek için sunduğum profesyonel psikolojik
              danışmanlık hizmetlerini keşfedin. Her bireyin yolculuğu özeldir
              ve size özel çözümlerle yanınızdayım.
            </p>
            <a href="/Iletisim" className="btn btn-primary hero-btn">
              <Calendar size={20} /> Randevu ve Bilgi Alın
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Hizmetler Grid Section (Hakkimda.css'teki .services-preview stilini kullanır) */}
      <section className="services-preview hizmetler-section-wrapper">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2 style={{ color: "var(--accent-secondary)" }}>
              Sunduğum Destek Alanları
            </h2>
            <p className="subtitle">
              Bireysel ihtiyaçlarınıza yönelik, kanıta dayalı ve güncel
              yaklaşımlarla psikolojik destek sağlıyorum.
            </p>
          </AnimatedSection>
          <div className="services-grid">
            {hizmetlerData.map((service, index) => (
              <AnimatedSection
                key={service.id}
                className={`service-card delay-${index % 3}`}
                animationClass="animate-zoomIn"
                threshold={0.2}
              >
                <div className="service-image-container">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-image-bg"
                    loading="lazy"
                  />
                  <div className="service-icon-overlay">
                    {React.cloneElement(service.icon, { size: 28 })}
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href={service.detailsLink} className="service-link">
                    Daha Fazla Bilgi <ArrowRight size={18} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmet Süreci Bölümü */}
      <section className="hizmet-sureci-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2 style={{ color: "var(--accent-secondary)" }}>
              Danışmanlık Sürecimiz Nasıl İşler?
            </h2>
            <p className="subtitle">
              Şeffaf, yapılandırılmış ve size özel bir yaklaşımla ilerliyoruz.
            </p>
          </AnimatedSection>
          <div className="hizmet-sureci-grid">
            {hizmetSureciData.map((item, index) => (
              <AnimatedSection
                key={index}
                className={`hizmet-sureci-item delay-${index}`}
                animationClass="animate-fadeInUp"
              >
                <div className="icon">
                  {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sıkça Sorulan Sorular Bölümü */}
      <section className="sss-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <HelpCircle
              size={48}
              className="section-icon"
              style={{ color: "var(--accent-primary)", marginBottom: "1rem" }}
            />
            <h2 style={{ color: "var(--accent-secondary)" }}>
              Sıkça Sorulan Sorular
            </h2>
            <p className="subtitle">
              Aklınızdaki sorulara yanıt bulabilirsiniz. Daha fazlası için
              iletişime geçmekten çekinmeyin.
            </p>
          </AnimatedSection>
          <AnimatedSection
            className="sss-container"
            animationClass="animate-fadeInUp"
          >
            {sssData.map((item, index) => (
              <div
                key={index}
                className={`sss-item ${activeSSS === index ? "active" : ""}`}
              >
                <div
                  className="sss-question"
                  onClick={() => toggleSSS(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && toggleSSS(index)
                  }
                  aria-expanded={activeSSS === index}
                  aria-controls={`sss-answer-${index}`}
                >
                  {item.question}
                  <ChevronDown size={24} className="arrow-icon" />
                </div>
                <div className="sss-answer" id={`sss-answer-${index}`}>
                  {item.answer}
                </div>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section about">
              <a
                href="#anasayfa"
                className="footer-logo"
                onClick={(e) => scrollToSection(e, "anasayfa")}
              >
                <img
                  src="/logo.png"
                  alt={`${clinicName} logo footer`}
                  style={{ width: "28px", height: "auto" }}
                />{" "}
                {/* Simple inline style for white logo in dark footer */}
                <span>{counselorName}</span>
              </a>
              <p>
                Psikolojik Danışman {counselorName} | İçsel yolculuğunuzda size
                rehberlik etmek için buradayım. Gelecek hayal etmekle başlar...
              </p>
              <div className="footer-socials">
                <a
                  href="https://www.instagram.com/danismapsikolojisi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/3d-fluency/100/instagram-new.png"
                    alt="instagram-new"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/kerem-karag%C3%B6z-463951181/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/3d-fluency/94/linkedin--v2.png"
                    alt="linkedin--v2"
                  />
                </a>
              </div>
            </div>
            <div className="footer-section links">
              <h4>Site Haritası</h4>
              <ul>
                {navLinks.map((link) => (
                  <li key={`footer-${link.id}`}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/gizlilik-politikasi"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Gizlilik Politikası sayfası henüz hazır değil.");
                    }}
                  >
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a
                    href="/kullanim-sartlari"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Kullanım Şartları sayfası henüz hazır değil.");
                    }}
                  >
                    Kullanım Şartları
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section services-links">
              <h4>Başlıca Hizmetler</h4>
              <ul>
                <li>
                  <a
                    href="#hizmetlerim"
                    onClick={(e) => scrollToSection(e, "hizmetlerim")}
                  >
                    Bireysel Danışmanlık
                  </a>
                </li>
                <li>
                  <a
                    href="#hizmetlerim"
                    onClick={(e) => scrollToSection(e, "hizmetlerim")}
                  >
                    EMDR Terapisi
                  </a>
                </li>
                <li>
                  <a
                    href="#hizmetlerim"
                    onClick={(e) => scrollToSection(e, "hizmetlerim")}
                  >
                    Aile ve Çift Danışmanlığı
                  </a>
                </li>
                <li>
                  <a
                    href="#hizmetlerim"
                    onClick={(e) => scrollToSection(e, "hizmetlerim")}
                  >
                    Attentioner & MOXO
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section contact-info-footer">
              <h4>İletişimde Kalın</h4>
              <address>
                Kemaliye Mh. Cumhuriyet Meydanı. No:7 Kat:1, <br />1 No'lu
                İşyeri Hendek/SAKARYA
              </address>
              <p>
                <a href="tel:+905061644741">0 (506) 164 47 41</a>
              </p>
              <p>
                <a href="mailto:danismapsikolojisi@gmail.com">
                  danismapsikolojisi@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {clinicName} - {counselorName}. Tüm
              hakları saklıdır.
            </p>
            <p>
              Bu web sitesi tanıtım amaçlıdır, tıbbi tavsiye niteliği taşımaz.
            </p>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default Hizmetlerim;
