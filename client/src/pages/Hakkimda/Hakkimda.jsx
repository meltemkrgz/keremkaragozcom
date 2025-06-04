import React, { useEffect, useRef } from 'react';
import { 
  UserCircle, GraduationCap, Briefcase, Award, Languages, Target, CalendarDays, ShieldCheck, CheckCircle2, Info,
  Mail, Phone, MapPin, Instagram, Linkedin, ChevronsUp, School, Users // Anasayfa'dan ScrollToTop için
} from 'lucide-react';
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
    observer.current = new IntersectionObserver(([entry]) => setEntry(entry), options);
    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};

const AnimatedSection = ({ children, animationClass = "animate-fadeInUp", threshold = 0.1, className = "", delayClass = "" }) => {
  const [ref, entry] = useIntersectionObserver({ threshold });
  const isVisible = entry?.isIntersecting;
  return (
    <div ref={ref} className={`${className} ${isVisible ? `${animationClass} ${delayClass}` : 'opacity-0'}`}>
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
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return isVisible && (
    <button onClick={scrollToTop} className="scroll-to-top-btn" aria-label="Sayfanın başına dön">
      <ChevronsUp size={24} />
    </button>
  );
};
// --- Yardımcı Bileşenlerin Sonu ---


const Hakkimda = () => {
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
    age: 28, // Bu dinamik hesaplanabilir
    nationality: "T.C.",
    drivingLicense: "B Sınıfı",
    militaryService: "Yapıldı (Yedek Subay)",
    chronicIllness: "Yok",
    smoking: "Hayır",
    record: "Temiz"
  };

  const careerGoal = "Modern ve klasik kuramlardan düşünce-duygu-davranış-somatik kanalların her birinin üstün yönlerini kullanarak eklektik bir kuram yazmak ve bu kuram ile psikolojik sorunlara çare olunan bir psikoloji okulu kurmak. Gelecek hayal etmekle başlar...";

  const educationData = [
    {
      degree: "PDR Yüksek Lisans (Aktif)",
      institution: "Yıldız Teknik Üniversitesi",
      duration: "2024 Şubat - Devam Ediyor",
      icon: <GraduationCap />
    },
    {
      degree: "PDR Lisans",
      institution: "Yıldız Teknik Üniversitesi",
      duration: "2015 - 2019",
      details: "AGNO: 3,35. 4 Yıllık Sınıf, 2 Yıllık Bölüm Temsilciliği.",
      icon: <GraduationCap />
    },
    {
      degree: "Lise",
      institution: "Ali Fuat Başgil Sosyal Bilimler Lisesi",
      duration: "2010 - 2015",
      details: "Eşit Ağırlık",
      icon: <School /> // School ikonu yoksa GraduationCap alternatifi
    }
  ];
  
  const certificationsData = [
    { name: "EMDR Terapisi (2. Düzey)", provider: "Davranış Bilimleri Enstitüsü", icon: <Award /> },
    { name: "Aile ve Çift Danışmanlığı (MEB Onaylı, 464 Saat)", provider: "T.C. MEB", icon: <Award /> },
    { name: "Attentioner Dikkat Programı Uygulayıcılığı", provider: "APAMER", icon: <Award /> },
    { name: "MOXO Dikkat Testi Uygulayıcılığı", provider: "MOXO Derneği", icon: <Award /> },
  ];

  const experienceData = [
    {
      role: "Sahibi-Kurucu Psikolojik Danışman",
      company: clinicName,
      duration: "Ocak 2022 - Halen",
      icon: <Briefcase />
    },
    {
      role: "Rehberlik ve Danışma Merkezi Amiri",
      company: "Türk Silahlı Kuvvetleri K.K.K. 19'uncu Mot.P.Tug.K.'lığı",
      duration: "Ocak 2021 - Ocak 2022",
      icon: <Briefcase />
    },
    {
      role: "Özel Eğitim Öğretmeni",
      company: "MEB Hendek Özel Eğitim ve Uygulama Okulu I,II ve III. Kademe",
      duration: "Ekim 2019 - Şubat 2020",
      icon: <Briefcase />
    },
    {
      role: "Psikolojik Danışman",
      company: "Özel Çokşen Özel Eğitim ve Rehabilitasyon Merkezi",
      duration: "Ağustos 2019 - Ekim 2019",
      icon: <Briefcase />
    },
    {
      role: "Okul Psikolojik Danışmanı",
      company: "MEB İstanbul-Yenibosna Ortaokulu / Güngören-Özel Final Okulları",
      duration: "Ocak 2019 - Haziran 2019 (Dönemsel)",
      icon: <Briefcase />
    },
     {
      role: "Stajyer Psikolojik Danışman",
      company: "Mizmer Psikolojik Danışma Merkezi",
      duration: "Ocak 2019 - Haziran 2019",
      icon: <Briefcase />
    },
    {
      role: "Satış Danışmanı",
      company: "Serdivan Agora AVM LC Waikiki",
      duration: "Haziran 2018 - Ağustos 2018",
      icon: <Briefcase />
    }
  ];

  const languagesData = [
    { lang: "İngilizce", level: "B2", icon: <Languages /> },
    { lang: "Fransızca", level: "A2", icon: <Languages /> },
    { lang: "Osmanlıca", level: "Okur-Yazar", icon: <Languages /> }
  ];

  const referencesData = [
    "Prof. Dr. Mehmet Engin Deniz - Yıldız Teknik Üniversitesi",
    "Prof. Dr. Fulya Yüksel-Şahin - Yıldız Teknik Üniversitesi",
    "Doç. Dr. Hanife Akgül - Onsekiz Mart Üniversitesi",
    "Doç. Dr. Şerife Gonca Zeren - Onsekiz Mart Üniversitesi",
    "Tuğgeneral Fuat Kara - T.C. K.K.K. Ankara",
    "Prof. Dr. Seydi Ahmet Satıcı - Yıldız Teknik Üniversitesi"
  ];

  const totalSessionsNote = "Nisan 2025 itibariyle yapılan toplam danışma sayısı 4000'dir.";

  return (
    <div className="hakkimda-page"> {/* Genel sayfa sarmalayıcı */}
      {/* Hero Section - Kişisel Özet */}
      <section className="hero-hakkimda" style={{paddingTop: '120px', background: 'var(--bg-accent)', paddingBottom: '4rem'}}>
        <div className="container">
          <AnimatedSection className="text-center">
            <img 
              src="/keremkaragoz.png" // Anasayfa'dakiyle aynı veya farklı bir profil fotoğrafı
              alt={`${counselorName} - Psikolojik Danışman`} 
              className="hakkimda-profile-img"
              style={{
                width: '200px', 
                height: '200px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                margin: '0 auto 2rem', 
                border: '5px solid var(--accent-primary)',
                boxShadow: 'var(--shadow-lg)'
              }} 
            />
            <h1 className="hakkimda-main-title" style={{color: 'var(--accent-secondary)', fontSize: '2.8rem'}}>
              {counselorName}
            </h1>
            <p className="hakkimda-subtitle" style={{fontSize: '1.3rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 1rem'}}>
              Psikolojik Danışman & {clinicName} Kurucusu
            </p>
            <p className="hakkimda-intro-text" style={{fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto'}}>
              Yıldız Teknik Üniversitesi Psikolojik Danışmanlık ve Rehberlik bölümü mezuniyetimin ardından, insanın karmaşık ve büyüleyici iç dünyasına duyduğum derin merak ve yardım etme isteğiyle profesyonel yolculuğuma başladım. Sizlere daha dengeli, huzurlu ve anlamlı bir yaşam yolunda eşlik etmekten mutluluk duyarım.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Kariyer Hedefi */}
      <section className="section-hakkimda career-goal-section" style={{backgroundColor: 'var(--bg-secondary)'}}>
        <div className="container">
          <AnimatedSection className="section-header">
            <Target size={48} className="section-icon" style={{color: 'var(--accent-primary)', marginBottom: '1rem'}}/>
            <h2 style={{color: 'var(--accent-secondary)'}}>Kariyer Hedefim</h2>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-center" style={{fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontStyle: 'italic'}}>
              "{careerGoal}"
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Eğitim Bilgileri */}
      <section className="section-hakkimda education-section">
        <div className="container">
          <AnimatedSection className="section-header">
             <GraduationCap size={48} className="section-icon" style={{color: 'var(--accent-primary)', marginBottom: '1rem'}}/>
            <h2 style={{color: 'var(--accent-secondary)'}}>Eğitim Geçmişim</h2>
          </AnimatedSection>
          <div className="hakkimda-grid two-cols"> {/* CSS'te tanımlanacak */}
            {educationData.map((edu, index) => (
              <AnimatedSection key={index} className={`hakkimda-card edu-card delay-${index % 2}`} animationClass="animate-zoomIn">
                <div className="hakkimda-card-icon">{React.cloneElement(edu.icon, { size: 36, color: 'var(--accent-primary)' })}</div>
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
      <section className="section-hakkimda certifications-section" style={{backgroundColor: 'var(--bg-accent)'}}>
        <div className="container">
          <AnimatedSection className="section-header">
            <Award size={48} className="section-icon" style={{color: 'var(--accent-primary)', marginBottom: '1rem'}}/>
            <h2 style={{color: 'var(--accent-secondary)'}}>Uzmanlık Alanlarım ve Sertifikalarım</h2>
            <p className="subtitle">Danışanlarıma en iyi desteği sunabilmek adına sürekli gelişim içindeyim.</p>
          </AnimatedSection>
          <div className="hakkimda-grid two-cols">
             {certificationsData.map((cert, index) => (
              <AnimatedSection key={index} className={`hakkimda-card cert-card delay-${index % 2}`} animationClass="animate-slideInLeft">
                <div className="hakkimda-card-icon">{React.cloneElement(cert.icon, { size: 36, color: 'var(--accent-primary)' })}</div>
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
            <Briefcase size={48} className="section-icon" style={{color: 'var(--accent-primary)', marginBottom: '1rem'}}/>
            <h2 style={{color: 'var(--accent-secondary)'}}>İş ve Staj Deneyimleri</h2>
            <p className="subtitle">Farklı alanlarda edindiğim tecrübelerle zenginleşen bir kariyer.</p>
          </AnimatedSection>
          <div className="timeline"> {/* CSS'te timeline stili oluşturulacak */}
            {experienceData.map((exp, index) => (
              <AnimatedSection key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} animationClass={index % 2 === 0 ? "animate-slideInLeft" : "animate-slideInRight"}>
                <div className="timeline-content hakkimda-card">
                  <div className="hakkimda-card-icon" style={{position: 'absolute', top: '1.5rem', left: '1.5rem'}}>
                    {React.cloneElement(exp.icon, { size: 28, color: 'var(--accent-primary)'})}
                  </div>
                  <h4 style={{marginLeft: '40px'}}>{exp.role}</h4>
                  <p className="company" style={{marginLeft: '40px'}}>{exp.company}</p>
                  <p className="duration" style={{marginLeft: '40px'}}>{exp.duration}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
           <AnimatedSection className="text-center mt-3">
              <div className="hakkimda-card" style={{display: 'inline-block', padding: '1.5rem 2rem', background: 'var(--bg-stats-section)'}}>
                <Info size={28} style={{color: 'var(--accent-primary-dark)', marginRight: '0.5rem', verticalAlign: 'middle'}}/>
                <span style={{fontWeight: 600, color: 'var(--text-primary)'}}>{totalSessionsNote}</span>
              </div>
           </AnimatedSection>
        </div>
      </section>

      {/* Kişisel Bilgiler ve Diller */}
      <section className="section-hakkimda personal-details-section" style={{backgroundColor: 'var(--bg-secondary)'}}>
        <div className="container">
          <div className="hakkimda-grid two-even-cols"> {/* CSS'te tanımlanacak */}
            <AnimatedSection animationClass="animate-fadeInUp">
              <div className="section-header" style={{textAlign: 'left', marginBottom: '1.5rem'}}>
                 <UserCircle size={40} className="section-icon" style={{color: 'var(--accent-primary)', marginBottom: '0.5rem'}}/>
                <h3 style={{color: 'var(--accent-secondary)', fontSize: '1.8rem'}}>Kişisel Bilgiler</h3>
              </div>
              <ul className="hakkimda-list">
                <li><CalendarDays size={18}/> <strong>Doğum Tarihi:</strong> {personalInfo.birthDate} (Yaş: {personalInfo.age})</li>
                <li><Info size={18}/> <strong>Uyruk:</strong> {personalInfo.nationality}</li>
                <li><Info size={18}/> <strong>Ehliyet:</strong> {personalInfo.drivingLicense}</li>
                <li><ShieldCheck size={18}/> <strong>Askerlik:</strong> {personalInfo.militaryService}</li>
                <li><CheckCircle2 size={18}/> <strong>Kronik Hastalık:</strong> {personalInfo.chronicIllness}</li>
                <li><CheckCircle2 size={18}/> <strong>Sigara Kullanımı:</strong> {personalInfo.smoking}</li>
                <li><CheckCircle2 size={18}/> <strong>Sicil Kaydı:</strong> {personalInfo.record}</li>
              </ul>
            </AnimatedSection>
            <AnimatedSection animationClass="animate-fadeInUp" delayClass="delay-1">
              <div className="section-header" style={{textAlign: 'left', marginBottom: '1.5rem'}}>
                <Languages size={40} className="section-icon" style={{color: 'var(--accent-primary)', marginBottom: '0.5rem'}}/>
                <h3 style={{color: 'var(--accent-secondary)', fontSize: '1.8rem'}}>Yabancı Dil Bilgisi</h3>
              </div>
              <ul className="hakkimda-list">
                {languagesData.map((lang, index) => (
                  <li key={index}>
                    {React.cloneElement(lang.icon, { size: 18 })} <strong>{lang.lang}:</strong> {lang.level}
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
             <Users size={48} className="section-icon" style={{color: 'var(--accent-primary)', marginBottom: '1rem'}}/> {/* Users2 lucide'da yoksa Users kullan */}
            <h2 style={{color: 'var(--accent-secondary)'}}>Referanslar</h2>
            <p className="subtitle">Mesleki ve akademik referanslarım (Detaylı bilgi talep üzerine sunulabilir).</p>
          </AnimatedSection>
          <div className="hakkimda-grid three-cols"> {/* CSS'te tanımlanacak */}
            {referencesData.map((ref, index) => (
              <AnimatedSection key={index} className={`hakkimda-card ref-card delay-${index % 3}`} animationClass="animate-zoomIn">
                <p style={{textAlign: 'center', fontWeight: 500}}>{ref}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim CTA */}
      <section className="section-hakkimda cta-hakkimda-section" style={{backgroundColor: 'var(--accent-primary-dark)', color: 'var(--text-on-dark)'}}>
        <div className="container text-center">
          <AnimatedSection>
            <h2 style={{color: 'var(--white)', marginBottom: '1rem'}}>Benimle İletişime Geçin</h2>
            <p style={{color: 'var(--bg-accent)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem'}}>
              Hizmetlerim hakkında daha fazla bilgi almak, randevu oluşturmak veya aklınızdaki soruları sormak için çekinmeyin.
            </p>
            <a href="/#iletisim" className="btn btn-secondary" style={{borderColor: 'var(--white)', color: 'var(--white)'}}> {/* Anasayfa'daki iletişim bölümüne link */}
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