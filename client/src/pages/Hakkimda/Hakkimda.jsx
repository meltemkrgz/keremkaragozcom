import React, { useEffect, useState, useRef } from "react";
import {
  UserCircle,
  GraduationCap,
  Briefcase,
  Award,
  Languages,
  Target,
  Calendar,
  CalendarDays,
  ShieldCheck,
  CheckCircle2,
  Info,
  Mail,
  Menu,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  ChevronsUp,
  School,
  Users, // Anasayfa'dan ScrollToTop için
} from "lucide-react";
// Anasayfa.css'in import edildiğini varsayıyorum (genellikle App.js veya Layout.js içinde olur)
// import "./Anasayfa.css"; // Eğer bu component kendi CSS'ine sahip olacaksa
import "./Hakkimda.css";

// Anasayfa'dan kopyalanan yardımcı bileşenler
// Gerçek uygulamada bunlar ayrı bir utils veya components dosyasında olurdu
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
const scrollToSection = (e, sectionId) => {
  e.preventDefault();
  setIsMenuOpen(false);
  const element =
    sectionRefs.current[sectionId] || document.getElementById(sectionId);
  if (element) {
    const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  }
  setActiveSection(sectionId);
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

const Hakkimda = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const counselorName = "Kerem Karagöz";
  const clinicName = "Kerem Karagöz Psikolojik Danışmanlık Merkezi"; // PDF'ten veya genel bilgiden

  // Navbar ve Footer'ın Anasayfa'daki gibi global olduğunu varsayıyorum.
  // Bu bileşen sadece sayfa içeriğini render edecek.
  // Sayfa içi navigasyon için Anasayfa'daki scrollToSection mantığı burada da kullanılabilir eğer alt başlıklar varsa.

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa yüklendiğinde en üste git
  }, []);

  const personalInfo = {
    birthDate: "01.12.1995",
    age: 29, // Bu dinamik hesaplanabilir
    nationality: "T.C.",
    drivingLicense: "B Sınıfı",
    militaryService: "Yapıldı (Yedek Subay)",
  };

  const careerGoal =
    "Travma ve dikkat alanlarında uzmanlaşarak bireylerin ruh sağlığını desteklemek ve danışmanlık merkezini alanında öncü bir kuruma dönüştürmek.";

  const educationData = [
    {
      degree: "PDR Yüksek Lisans (Aktif)",
      institution: "Yıldız Teknik Üniversitesi",
      duration: "2024 Şubat - Devam Ediyor",
      icon: <GraduationCap />,
    },
    {
      degree: "PDR Lisans",
      institution: "Yıldız Teknik Üniversitesi",
      duration: "2015 - 2019",
      details: "AGNO: 3,35. 4 Yıllık Sınıf, 2 Yıllık Bölüm Temsilciliği.",
      icon: <GraduationCap />,
    },
    {
      degree: "Lise",
      institution: "Ali Fuat Başgil Sosyal Bilimler Lisesi",
      duration: "2010 - 2015",
      details: "Eşit Ağırlık",
      icon: <School />, // School ikonu yoksa GraduationCap alternatifi
    },
  ];

  const certificationsData = [
    {
      name: "EMDR Terapisi (2. Düzey)",
      provider: "Davranış Bilimleri Enstitüsü",
      icon: <Award />,
    },
    {
      name: "Aile ve Çift Danışmanlığı (MEB Onaylı, 464 Saat)",
      provider: "T.C. MEB",
      icon: <Award />,
    },
    {
      name: "Attentioner Dikkat Programı Uygulayıcılığı",
      provider: "APAMER",
      icon: <Award />,
    },
    {
      name: "MOXO Dikkat Testi Uygulayıcılığı",
      provider: "MOXO Derneği",
      icon: <Award />,
    },
  ];

  const experienceData = [
    {
      role: "Sahibi-Kurucu Psikolojik Danışman",
      company: clinicName,
      duration: "Ocak 2022 - Halen",
      icon: <Briefcase />,
    },
    {
      role: "Rehberlik ve Danışma Merkezi Amiri - Yedek Subay",
      company: "Türk Silahlı Kuvvetleri K.K.K. 19'uncu Mot.P.Tug.K.'lığı",
      duration: "Ocak 2021 - Ocak 2022",
      icon: <Briefcase />,
    },
    {
      role: "Özel Eğitim Öğretmeni",
      company: "MEB Hendek Özel Eğitim ve Uygulama Okulu I,II ve III. Kademe",
      duration: "Ekim 2019 - Şubat 2020",
      icon: <Briefcase />,
    },
    {
      role: "Psikolojik Danışman",
      company: "Özel Çokşen Özel Eğitim ve Rehabilitasyon Merkezi",
      duration: "Ağustos 2019 - Ekim 2019",
      icon: <Briefcase />,
    },
    {
      role: "Okul Psikolojik Danışmanı",
      company:
        "MEB İstanbul-Yenibosna Ortaokulu / Güngören-Özel Final Okulları",
      duration: "Ocak 2019 - Haziran 2019 (Dönemsel)",
      icon: <Briefcase />,
    },
    {
      role: "Stajyer Psikolojik Danışman",
      company: "Mizmer Psikolojik Danışma Merkezi",
      duration: "Ocak 2019 - Haziran 2019",
      icon: <Briefcase />,
    },
  ];

  const languagesData = [
    { lang: "İngilizce", level: "B2", icon: <Languages /> },
    { lang: "Fransızca", level: "A2", icon: <Languages /> },
    { lang: "Osmanlıca", level: "Okur-Yazar", icon: <Languages /> },
  ];

  const referencesData = [
    "Prof. Dr. Mehmet Engin Deniz - Yıldız Teknik Üniversitesi",
    "Prof. Dr. Fulya Yüksel Şahin - Yıldız Teknik Üniversitesi",
    "Doç. Dr. Hanife Akgül - Onsekiz Mart Üniversitesi",
    "Doç. Dr. Şerife Gonca Zeren - Onsekiz Mart Üniversitesi",
    "Tuğgeneral Fuat Kara - T.C. K.K.K. Ankara",
    "Prof. Dr. Seydi Ahmet Satıcı - Yıldız Teknik Üniversitesi",
  ];

  const totalSessionsNote =
    "Haziran 2025 itibariyle yapılan toplam danışma sayısı 5000'dir.";

  const navLinks = [
    { id: "/", text: "Anasayfa" },
    { id: "hakkimda", text: "Hakkımda" },
    { id: "hizmetlerim", text: "Hizmetlerim" },
    { id: "blog", text: "Blog" },
    { id: "iletisim", text: "İletişim" },
  ];
  return (
    <div className="hakkimda-page">
      {" "}
      {/* Genel sayfa sarmalayıcı */}
      <nav className="navbar">
        <div className="nav-container container">
          <a
            href="#anasayfa"
            className="nav-logo"
            onClick={(e) => scrollToSection(e, "anasayfa")}
          >
            <img src="/logo.png" alt={`${clinicName} logo`} />
            <span>{counselorName}</span>
          </a>

          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.id} // Artık doğrudan sayfa yönlendirmesi
                className={`nav-link ${
                  window.location.pathname === link.id ? "active" : ""
                }`}
              >
                {link.text}
              </a>
            ))}

            {isMenuOpen && (
              <a
                href="/Iletisim"
                className="appointment-btn btn btn-primary nav-link-mobile-cta"
              >
                <Calendar size={18} />
                Randevu Al
              </a>
            )}
          </div>

          <div className="nav-actions">
            <a
              href="/Iletisim"
              className="appointment-btn btn btn-primary"
              onClick={(e) => scrollToSection(e, "iletisim")}
            >
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
      {/* Hero Section - Kişisel Özet */}
      <section
        className="hero-hakkimda"
        style={{
          paddingTop: "120px",
          background: "var(--bg-accent)",
          paddingBottom: "4rem",
        }}
      >
        <div className="container">
          <AnimatedSection className="text-center">
            <img
              src="/keremkaragoz.png" // Anasayfa'dakiyle aynı veya farklı bir profil fotoğrafı
              alt={`${counselorName} - Psikolojik Danışman`}
              className="hakkimda-profile-img"
            />
            <h1
              className="hakkimda-main-title"
              style={{ color: "var(--accent-secondary)", fontSize: "2.8rem" }}
            >
              {counselorName} kimdir?
            </h1>
            <p
              className="hakkimda-intro-text"
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "var(--text-secondary)",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              2015 yılında Kocaeli Ali Fuat Başgil Sosyal Bilimler Lisesi'nden
              bir sosyal bilimci olarak mezun olduktan sonra İstanbul, Yıldız
              Teknik Üniversitesi Psikolojik Danışmanlık ve Rehberlik Anabilim
              Dalını 2019'da başarıyla tamamlamıştır. Mezun olduktan sonra hemen
              danışan kabulüne başlayarak ruh sağlığı alanına profesyonel
              anlamda adım atmıştır. 1 yıl Türk Silahlı Kuvvetleri'nde Yedek
              Subay-Rehberlik Danışma Merkezi Amiri olarak askerliğini
              tamamladıktan 2 gün sonra kendi psikolojik danışmanlık merkezini
              açarak Kurucu Psikolojik Danışman olmuştur. Sunduğu bireyle
              psikolojik danışma hizmeti için Bilişsel Davranışçı Terapi
              merkezli EMDR (Göz Hareketleriyle Duyarsızlaştırma ve Yeniden
              İşleme Terapisi) ana ekolüdür. Travmatik deneyimler başta olmak
              üzere birçok psikolojik sorunun çözümünde kullanılmaktadır.
              Haziran 2025'e dek yapılan danışma tecrübesi 5000'dir. Ayrıca Moxo
              D-CPT Dikkat Testi Testörü olan Kerem Karagöz; bu testin sonucuna
              göre Attentioner ile Dikkatimi Topluyorum (Hülya Bingöl-Çağlayan)
              uygulayıcısıdır. Çocuk, ergen veya yetişkinlerde dikkat geliştirme
              programları ve ölçümleri yapmaktadır. Milli Eğitim Bakanlığı
              onaylı 464 saatlik Aile Danışmanlığı Eğitimini de başarıyla
              tamamlayarak Aile Danışmanlığı hizmeti de sunmaktadır.
            </p>
          </AnimatedSection>
        </div>
      </section>
      {/* Kariyer Hedefi */}
      <section
        className="section-hakkimda career-goal-section"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container">
          <AnimatedSection className="section-header">
            <Target
              size={48}
              className="section-icon"
              style={{ color: "var(--accent-primary)", marginBottom: "1rem" }}
            />
            <h2 style={{ color: "var(--accent-secondary)" }}>
              Kariyer Hedefim
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <p
              className="text-center"
              style={{
                fontSize: "1.15rem",
                lineHeight: "1.9",
                color: "var(--text-secondary)",
                maxWidth: "800px",
                margin: "0 auto",
                fontStyle: "italic",
              }}
            >
              "{careerGoal}"
            </p>
          </AnimatedSection>
        </div>
      </section>
      {/* Eğitim Bilgileri */}
      <section className="section-hakkimda education-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <GraduationCap
              size={48}
              className="section-icon"
              style={{ color: "var(--accent-primary)", marginBottom: "1rem" }}
            />
            <h2 style={{ color: "var(--accent-secondary)" }}>
              Eğitim Geçmişim
            </h2>
          </AnimatedSection>
          <div className="hakkimda-grid two-cols">
            {" "}
            {/* CSS'te tanımlanacak */}
            {educationData.map((edu, index) => (
              <AnimatedSection
                key={index}
                className={`hakkimda-card edu-card delay-${index % 2}`}
                animationClass="animate-zoomIn"
              >
                <div className="hakkimda-card-icon">
                  {React.cloneElement(edu.icon, {
                    size: 36,
                    color: "var(--accent-primary)",
                  })}
                </div>
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                <p className="duration">{edu.duration}</p>
                {edu.details && <p className="details">{edu.details}</p>}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* Uzmanlık ve Sertifikalar */}
      <section
        className="section-hakkimda certifications-section"
        style={{ backgroundColor: "var(--bg-accent)" }}
      >
        <div className="container">
          <AnimatedSection className="section-header">
            <Award
              size={48}
              className="section-icon"
              style={{ color: "var(--accent-primary)", marginBottom: "1rem" }}
            />
            <h2 style={{ color: "var(--accent-secondary)" }}>
              Uzmanlık Alanlarım ve Sertifikalarım
            </h2>
            <p className="subtitle">
              Danışanlarıma en iyi desteği sunabilmek adına sürekli gelişim
              içindeyim.
            </p>
          </AnimatedSection>
          <div className="hakkimda-grid two-cols">
            {certificationsData.map((cert, index) => (
              <AnimatedSection
                key={index}
                className={`hakkimda-card cert-card delay-${index % 2}`}
                animationClass="animate-slideInLeft"
              >
                <div className="hakkimda-card-icon">
                  {React.cloneElement(cert.icon, {
                    size: 36,
                    color: "var(--accent-primary)",
                  })}
                </div>
                <h4>{cert.name}</h4>
                <p className="provider">{cert.provider}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* İş Deneyimleri */}
      <section className="section-hakkimda experience-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <Briefcase
              size={48}
              className="section-icon"
              style={{ color: "var(--accent-primary)", marginBottom: "1rem" }}
            />
            <h2 style={{ color: "var(--accent-secondary)" }}>
              İş ve Staj Deneyimleri
            </h2>
            <p className="subtitle">
              Farklı alanlarda edindiğim tecrübelerle zenginleşen bir kariyer.
            </p>
          </AnimatedSection>
          <div className="timeline">
            {" "}
            {/* CSS'te timeline stili oluşturulacak */}
            {experienceData.map((exp, index) => (
              <AnimatedSection
                key={index}
                className={`timeline-item ${
                  index % 2 === 0 ? "left" : "right"
                }`}
                animationClass={
                  index % 2 === 0
                    ? "animate-slideInLeft"
                    : "animate-slideInRight"
                }
              >
                <div className="timeline-content hakkimda-card">
                  <div
                    className="hakkimda-card-icon"
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      left: "1.5rem",
                    }}
                  >
                    {React.cloneElement(exp.icon, {
                      size: 28,
                      color: "var(--accent-primary)",
                    })}
                  </div>
                  <h4 style={{ marginLeft: "40px" }}>{exp.role}</h4>
                  <p className="company" style={{ marginLeft: "40px" }}>
                    {exp.company}
                  </p>
                  <p className="duration" style={{ marginLeft: "40px" }}>
                    {exp.duration}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="text-center mt-3">
            <div
              className="hakkimda-card"
              style={{
                display: "inline-block",
                padding: "1.5rem 2rem",
                background: "var(--bg-stats-section)",
              }}
            >
              <Info
                size={28}
                style={{
                  color: "var(--accent-primary-dark)",
                  marginRight: "0.5rem",
                  verticalAlign: "middle",
                }}
              />
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                {totalSessionsNote}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Kişisel Bilgiler ve Diller */}
      <section
        className="section-hakkimda personal-details-section"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="container">
          <div className="hakkimda-grid two-even-cols">
            {" "}
            {/* CSS'te tanımlanacak */}
            <AnimatedSection animationClass="animate-fadeInUp">
              <div
                className="section-header"
                style={{ textAlign: "left", marginBottom: "1.5rem" }}
              >
                <UserCircle
                  size={40}
                  className="section-icon"
                  style={{
                    color: "var(--accent-primary)",
                    marginBottom: "0.5rem",
                  }}
                />
                <h3
                  style={{
                    color: "var(--accent-secondary)",
                    fontSize: "1.8rem",
                  }}
                >
                  Kişisel Bilgiler
                </h3>
              </div>
              <ul className="hakkimda-list">
                <li>
                  <CalendarDays size={18} /> <strong>Doğum Tarihi:</strong>{" "}
                  {personalInfo.birthDate} (Yaş: {personalInfo.age})
                </li>
                <li>
                  <Info size={18} /> <strong>Uyruk:</strong>{" "}
                  {personalInfo.nationality}
                </li>
                <li>
                  <Info size={18} /> <strong>Ehliyet:</strong>{" "}
                  {personalInfo.drivingLicense}
                </li>
                <li>
                  <ShieldCheck size={18} /> <strong>Askerlik:</strong>{" "}
                  {personalInfo.militaryService}
                </li>
              </ul>
            </AnimatedSection>
            <AnimatedSection
              animationClass="animate-fadeInUp"
              delayClass="delay-1"
            >
              <div
                className="section-header"
                style={{ textAlign: "left", marginBottom: "1.5rem" }}
              >
                <Languages
                  size={40}
                  className="section-icon"
                  style={{
                    color: "var(--accent-primary)",
                    marginBottom: "0.5rem",
                  }}
                />
                <h3
                  style={{
                    color: "var(--accent-secondary)",
                    fontSize: "1.8rem",
                  }}
                >
                  Yabancı Dil Bilgisi
                </h3>
              </div>
              <ul className="hakkimda-list">
                {languagesData.map((lang, index) => (
                  <li key={index}>
                    {React.cloneElement(lang.icon, { size: 18 })}{" "}
                    <strong>{lang.lang}:</strong> {lang.level}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>
      {/* Referanslar */}
      <section className="section-hakkimda references-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <Users
              size={48}
              className="section-icon"
              style={{ color: "var(--accent-primary)", marginBottom: "1rem" }}
            />{" "}
            {/* Users2 lucide'da yoksa Users kullan */}
            <h2 style={{ color: "var(--accent-secondary)" }}>Referanslar</h2>
            <p className="subtitle">
              Mesleki ve akademik referanslarım (Detaylı bilgi talep üzerine
              sunulabilir).
            </p>
          </AnimatedSection>
          <div className="hakkimda-grid three-cols">
            {" "}
            {/* CSS'te tanımlanacak */}
            {referencesData.map((ref, index) => (
              <AnimatedSection
                key={index}
                className={`hakkimda-card ref-card delay-${index % 3}`}
                animationClass="animate-zoomIn"
              >
                <p style={{ textAlign: "center", fontWeight: 500 }}>{ref}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* İletişim CTA */}
      <section
        className="section-hakkimda cta-hakkimda-section"
        style={{
          backgroundColor: "var(--accent-primary-dark)",
          color: "var(--text-on-dark)",
        }}
      >
        <div className="container text-center">
          <AnimatedSection>
            <h2 style={{ color: "var(--white)", marginBottom: "1rem" }}>
              Benimle İletişime Geçin
            </h2>
            <p
              style={{
                color: "var(--bg-accent)",
                fontSize: "1.1rem",
                maxWidth: "600px",
                margin: "0 auto 2rem",
              }}
            >
              Hizmetlerim hakkında daha fazla bilgi almak, randevu oluşturmak
              veya aklınızdaki soruları sormak için çekinmeyin.
            </p>
            <a
              href="/Iletisim"
              className="btn btn-secondary"
            >
              {" "}
              {/* Anasayfa'daki iletişim bölümüne link */}
              İletişim Formu ve Detaylar
            </a>
          </AnimatedSection>
        </div>
      </section>
      <ScrollToTopButton />
    </div>
  );
};

export default Hakkimda;
