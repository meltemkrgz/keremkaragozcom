import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Menu, X, Brain, Shield, Phone, Mail, MapPin, Calendar, ChevronRight, Star, Quote, 
  UserCheck, ArrowRight, TrendingUp, Award, SmilePlus, Target, Eye, Users2, BookMarked, GitFork, Lightbulb,
  Instagram, Linkedin, ChevronsUp // Added ChevronsUp for scroll to top
} from 'lucide-react';
import "./Anasayfa.css"; 

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options) => {
  const [entry, setEntry] = useState(null);
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => setEntry(entry), options);

    const { current: currentObserver } = observer;
    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node, options]);

  return [setNode, entry];
};

// AnimatedSection Component
const AnimatedSection = ({ children, animationClass = "animate-fadeInUp", threshold = 0.1, className = "", delayClass = "" }) => {
  const [ref, entry] = useIntersectionObserver({ threshold });
  const isVisible = entry?.isIntersecting;

  return (
    <div ref={ref} className={`${className} ${isVisible ? `${animationClass} ${delayClass}` : 'opacity-0'}`}>
      {children}
    </div>
  );
};

// Stats Counter Component
const StatsCounter = ({ end, duration = 2000, label, icon: IconComponent, className = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, entry] = useIntersectionObserver({ threshold: 0.5 });
  const isVisible = entry?.isIntersecting;
  const hasAnimated = useRef(false);
  const elementRef = useRef();

  // Ref'i hem intersection observer'a hem de kendi referansımıza bağla
  const setCombinedRef = useCallback((node) => {
    ref(node);
    elementRef.current = node;
  }, [ref]);

  // Sayaç animasyonunu başlatan fonksiyon
  const startCount = useCallback(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const range = end - start;
      const incrementTime = 20;
      const numIncrements = duration / incrementTime;
      const increment = range / numIncrements;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [end, duration]);

  // Intersection Observer ile görünürlük kontrolü
  useEffect(() => {
    if (isVisible) {
      startCount();
    }
  }, [isVisible, startCount]);

  // İlk render'da section görünürse animasyonu başlat
  useEffect(() => {
    if (!hasAnimated.current && elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        startCount();
      }
    }
  }, [startCount]);

  return (
    <div ref={setCombinedRef} className={`stat-item ${className} ${isVisible && !hasAnimated.current ? 'animate-fadeInUp' : isVisible && hasAnimated.current ? '' : 'opacity-0'}`}>
      {IconComponent && <IconComponent className="stat-icon" size={48} strokeWidth={1.5} />}
      <div className="stat-number">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// Scroll To Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisible && (
      <button onClick={scrollToTop} className="scroll-to-top-btn" aria-label="Sayfanın başına dön">
        <ChevronsUp size={24} />
      </button>
    )
  );
};


const Anasayfa = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('anasayfa');

  const clinicName = "Kerem Karagöz";
  const counselorName = "Kerem Karagöz";

  const sectionRefs = useRef({
    anasayfa: null,
    yaklasimim: null,
    istatistikler: null,
    hakkimda: null,
    hizmetlerim: null,
    // blog: null, 
    iletisim: null,
  });

  const setSectionRef = (sectionName) => (el) => {
    sectionRefs.current[sectionName] = el;
  };
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback(() => {
    const pageYOffset = window.pageYOffset;
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
    let newActiveSection = 'anasayfa';

    const sectionsArray = Object.entries(sectionRefs.current);

    for (const [sectionName, refElement] of sectionsArray) {
        if (refElement && refElement.offsetTop <= pageYOffset + navbarHeight + 50) {
            newActiveSection = sectionName;
        }
    }
    setActiveSection(newActiveSection);

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
  }, []); 

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
        document.body.classList.remove('menu-open');
    }
  }, [isMenuOpen]);

  const navLinks = [
    { id: 'anasayfa', text: 'Anasayfa' },
    { id: 'hakkimda', text: 'Hakkımda' },
    { id: 'hizmetlerim', text: 'Hizmetlerim' },
    { id: 'blog', text: 'Blog' },
    { id: 'iletisim', text: 'İletişim' },
  ];

  if (isLoading) {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <svg viewBox="0 0 100 100" className="preloader-svg-icon">
            <path d="M50,15 C20,15 20,50 50,50 C80,50 80,15 50,15 M50,50 C20,50 20,85 50,85 C80,85 80,50 50,50" 
                  stroke="currentColor" strokeWidth="5" fill="none"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p>İçsel Yolculuğunuza Hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false); 
    const element = sectionRefs.current[sectionId] || document.getElementById(sectionId);
    if (element) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    setActiveSection(sectionId); 
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="nav-container container">
          <a href="#anasayfa" className="nav-logo" onClick={(e) => scrollToSection(e, 'anasayfa')}>
            <img src="/logo.png" alt={`${clinicName} logo`} />
            <span>{clinicName}</span>
          </a>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map(link => (
              <a 
                key={link.id}
                href={`#${link.id}`} 
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => scrollToSection(e, link.id)}
              >
                {link.text}
              </a>
            ))}
             {isMenuOpen && ( // Mobil menüdeyken randevu al butonu
                <a href="#iletisim" className="appointment-btn btn btn-primary nav-link-mobile-cta" onClick={(e) => scrollToSection(e, 'iletisim')}>
                    <Calendar size={18} />
                    Randevu Al
                </a>
             )}
          </div>
          
          <div className="nav-actions">
            <a href="#iletisim" className="appointment-btn btn btn-primary" onClick={(e) => scrollToSection(e, 'iletisim')}>
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

      <section id="anasayfa" ref={setSectionRef('anasayfa')} className="hero">
        <div className="hero-background-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
        </div>
        <div className="hero-content container">
          <div className="hero-text">
            <AnimatedSection>
              <h1 className="hero-title">
                Gelecek Hayal Etmekle Başlar...
                <span className="highlight">İçsel Potansiyelinizi Keşfedin</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delayClass="delay-1">
              <p className="hero-description">
                <b>Ben Kerem Karagöz. </b>
                Daha dengeli, huzurlu ve anlamlı bir yaşam için size destek oluyorum. Her bireyin ihtiyacı farklıdır; bu nedenle size en uygun yöntemlerle, güvenli ve destekleyici bir süreç sunuyorum. Kendinize bir adım atmak isterseniz, tanışmaktan memnuniyet duyarım.
              </p>
            </AnimatedSection>
            <AnimatedSection delayClass="delay-2">
              <div className="hero-actions">
                <a href="#hizmetlerim" className="cta-primary btn btn-primary" onClick={(e) => scrollToSection(e, 'hizmetlerim')}>
                  Hizmetlerim
                  <ArrowRight size={20} />
                </a>
                <a href="#iletisim" className="cta-secondary btn btn-secondary" onClick={(e) => scrollToSection(e, 'iletisim')}>
                  İletişime Geç
                  <Phone size={20} />
                </a>
              </div>
            </AnimatedSection>
          </div>
          <div className="hero-visual">
            <AnimatedSection animationClass="animate-zoomIn" delayClass="delay-1">
                <img src="/keremkaragoz.png" alt={`${counselorName} - Psikolojik Danışman`} className="hero-main-image"/>
                <div className="hero-visual-accent accent-1">
                    <Lightbulb size={24}/>
                </div>
                <div className="hero-visual-accent accent-2">
                    <Brain size={28}/>
                </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="yaklasimim" ref={setSectionRef('yaklasimim')} className="features-section-wrapper">
        <div className="container">
            <AnimatedSection className="section-header">
                <h2>Yaklaşımım ve Değerlerim</h2>
                <p className="subtitle">Size özel, bilimsel temelli ve empatik bir destek.</p>
            </AnimatedSection>
            <AnimatedSection>
              <div className="features-grid">
                {[
                  { icon: GitFork, title: "Eklektik & Bütüncül Yaklaşım", desc: "Düşünce, duygu, davranış ve bedensel (somatik) deneyimlerinizi bir bütün olarak ele alarak, size en uygun terapi yöntemlerini birleştiriyorum." },
                  { icon: Shield, title: "Gizlilik & Güven Esaslı", desc: "Tüm görüşmelerimiz etik ilkeler çerçevesinde, %100 gizlilik ve karşılıklı güven ilişkisi üzerine kuruludur." },
                  { icon: UserCheck, title: "Uzmanlık & Sürekli Gelişim", desc: "EMDR, Aile Danışmanlığı, Attentioner gibi alanlarda uzmanlık eğitimlerimi tamamladım ve en güncel yaklaşımları takip ediyorum." }
                ].map((feature, index) => (
                  <div className={`feature-card ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`} key={feature.title}>
                    <div className="feature-icon-wrapper">
                      <feature.icon className="feature-icon" />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
        </div>
      </section>

      <section id="istatistikler" ref={setSectionRef('istatistikler')} className="stats-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>Deneyimlerim ve Başarılarım</h2>
            <p className="subtitle">Rakamlarla mesleki yolculuğum ve danışanlarıma katkılarım.</p>
          </AnimatedSection>
          <div className="stats-grid">
            <StatsCounter end={5000} duration={2500} label="Gerçekleşen Danışma Seansı (Nisan 2025 itibarıyla)" icon={TrendingUp} suffix="+" className="delay-0" />
            <StatsCounter end={new Date().getFullYear() - 2019} duration={2000} label="Yıllık Mesleki Deneyim" icon={Award} suffix="+" className="delay-1" />
            <StatsCounter end={5} duration={2000} label="Tamamlanmış Uzmanlık Eğitimi" icon={BookMarked} suffix="+" className="delay-2" /> 
            <StatsCounter end={98} duration={3000} label="Danışan Odaklı Memnuniyet Hedefi (%)" icon={SmilePlus} suffix="%" className="delay-3" />
          </div>
        </div>
      </section>
      
      <section id="hakkimda" ref={setSectionRef('hakkimda')} className="about-short-section">
        <div className="container">
            <AnimatedSection className="section-header">
                <h2>{counselorName} Kimdir?</h2>
                <p className="subtitle">Eğitimim, deneyimlerim ve psikolojiye olan tutkum.</p>
            </AnimatedSection>
            <AnimatedSection className="about-short-text" animationClass="animate-slideInRight">
                <h3>Merhaba, Ben Kerem Karagöz</h3>
                <p>
                    Yıldız Teknik Üniversitesi Psikolojik Danışmanlık ve Rehberlik bölümünden mezun oldum ve aynı üniversitede yüksek lisans eğitimime devam etmekteyim. İnsanın karmaşık iç dünyasına duyduğum derin merak ve yardım etme isteğiyle bu anlamlı yolculuğa çıktım.
                </p>
                <p>
                    Kariyerim boyunca okul psikolojik danışmanlığı, özel eğitim, askeri birliklerde rehberlik ve danışma merkezi amirliği gibi çeşitli alanlarda deneyim kazandım. 2022 yılından beri Hendek, Sakarya'da kendi kurduğum {clinicName}'nde danışanlarıma hizmet vermekteyim.
                </p>
                 <p>
                    <strong>Aldığım Bazı Uzmanlık Eğitimleri:</strong> EMDR Terapisi (2. Düzey), Aile ve Çift Danışmanlığı (MEB Onaylı), Attentioner Dikkat Programı Uygulayıcılığı, MOXO Dikkat Testi Uygulayıcılığı.
                </p>
                <a href="#iletisim" className="btn btn-outline" onClick={(e) => scrollToSection(e, 'iletisim')}>
                    Daha Fazla Bilgi İçin Ulaşın
                    <ChevronRight size={18}/>
                </a>
            </AnimatedSection>
        </div>
      </section>

      <section id="hizmetlerim" ref={setSectionRef('hizmetlerim')} className="services-preview">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>Sunduğum Hizmet Alanları</h2>
            <p className="subtitle">İhtiyaçlarınıza yönelik profesyonel psikolojik destek.</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="services-grid">
              {[
                { id: "bireysel-terapi", title: "Bireysel Danışmanlık", desc: "Kaygı, depresyon, stres, travma, fobi, yas, özgüven sorunları ve kişisel gelişim hedefleriniz için birebir destek.", icon: <UserCheck size={32}/>, image: "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBzeWNob2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"},
                { id: "emdr-terapisi", title: "EMDR Terapisi", desc: "Travmatik yaşantıların (TSSB), fobilerin, kaygı bozukluklarının ve olumsuz yaşam deneyimlerinin etkilerini azaltmaya yönelik bilimsel bir yöntem.", icon: <Eye size={32}/>, image: "https://images.unsplash.com/photo-1604881988758-f76ad2f78c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1kciUyMHRoZXJhcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"},
                { id: "aile-cift-terapisi", title: "Aile ve Çift Danışmanlığı", desc: "İlişkilerdeki iletişim sorunları, çatışmalar, uyum problemleri ve boşanma süreçleri gibi konularda destek.", icon: <Users2 size={32}/>, image: "https://images.unsplash.com/photo-1543269705-75c663507951?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y291cGxlJTIwdGhlcmFweXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"},
                { id: "attentioner-moxo", title: "Dikkat Programları ve Testleri", desc: "Çocuk ve ergenlerde dikkat eksikliği ve hiperaktivite (DEHB) belirtilerine yönelik Attentioner programı ve MOXO dikkat testi uygulaması.", icon: <Target size={32}/>, image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF0dGVudGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"}
              ].map((service, index) => (
                <div className={`service-card ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : index === 3 ? 'delay-3' : ''}`} key={service.id}>
                  <div className="service-image-container">
                    <img src={service.image} alt={service.title} className="service-image-bg" loading="lazy"/>
                    <div className="service-icon-overlay">{service.icon}</div>
                  </div>
                  <div className="service-content">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                    <a href="#iletisim" className="service-link" onClick={(e) => {
                        e.preventDefault();
                        const contactFormSubject = document.getElementById('subject');
                        if(contactFormSubject) contactFormSubject.value = service.title + " Hakkında Bilgi/Randevu";
                        scrollToSection(e, 'iletisim');
                    }}>
                      Randevu Al / Bilgi Al <ChevronRight size={18}/>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>Danışan Deneyimleri</h2>
            <p className="subtitle">Paylaşılan geri bildirimler (Gizlilik esastır, isimler temsilidir).</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="testimonials-grid">
              {[
                { name: "A. Y.", text: "Kerem Bey ile EMDR terapisi sayesinde yıllardır taşıdığım yüklerden kurtuldum. Kendimi hiç olmadığım kadar hafif ve özgür hissediyorum. Minnettarım.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
                { name: "M. K. & E. K.", text: "Evliliğimizde yaşadığımız sorunlar için çift danışmanlığı aldık. Kerem Bey'in rehberliğinde birbirimizi yeniden anlamayı öğrendik. Teşekkür ederiz.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
                { name: "Z. T. (Veli)", text: "Oğlumun dikkat sorunları için Attentioner programına katıldık. Okul başarısında ve odaklanmasında gözle görülür bir artış oldu. Emeğiniz için teşekkürler.", avatar: "https://randomuser.me/api/portraits/women/33.jpg" }
              ].map((testimonial, index) => (
                <div className={`testimonial-card ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`} key={index}>
                  <div className="testimonial-card-header">
                    <img src={testimonial.avatar} alt={`${testimonial.name} avatar`} className="testimonial-avatar" loading="lazy"/>
                    <div className="testimonial-author-info">
                      <span className="author-name">{testimonial.name}</span>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" strokeWidth={0}/>
                        ))}
                      </div>
                    </div>
                    <Quote className="quote-icon" />
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

       {/* 
       <section id="blog" ref={setSectionRef('blog')} className="blog-preview-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <h2>Güncel Yazılarım</h2>
            <p className="subtitle">Psikoloji, kişisel gelişim ve ruh sağlığı üzerine.</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="blog-preview-grid">
              {blogPostsData.map((post, index) => (
                <div key={post.id} className={`blog-post-card ${index === 1 ? 'delay-1' : index === 2 ? 'delay-2' : ''}`}>
                  <a href="#" className="blog-post-image-link" onClick={(e) => e.preventDefault()}>
                    <img src={post.image} alt={post.title} className="blog-post-image" loading="lazy"/>
                    <span className="blog-post-category">{post.category}</span>
                  </a>
                  <div className="blog-post-content">
                    <span className="blog-post-date">{post.date}</span>
                    <h3 className="blog-post-title">
                      <a href="#" onClick={(e) => e.preventDefault()}>{post.title}</a>
                    </h3>
                    <p className="blog-post-excerpt">{post.excerpt}</p>
                    <a href="#" className="btn btn-text" onClick={(e) => e.preventDefault()}>
                      Devamını Oku <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="text-center mt-4">
            <a href="#" className="btn btn-primary-outline" onClick={(e) => e.preventDefault()}>Tüm Yazıları Gör</a>
          </AnimatedSection>
        </div>
      </section>
      */}

      <section id="iletisim" ref={setSectionRef('iletisim')} className="contact-preview">
        <div className="container">
        <AnimatedSection className="section-header">
            <h2>İletişime Geçin</h2>
            <p className="subtitle">Randevu almak, soru sormak veya bilgi almak için buradayım.</p>
        </AnimatedSection>
          <AnimatedSection>
            <div className="contact-content">
              <div className="contact-info animate-slideInLeft">
                <h3>İletişim Bilgilerim</h3>
                <p>{clinicName} <br /> Psikolojik Danışman {counselorName}</p>
                <div className="contact-details">
                  <a href="tel:+905061644741" className="contact-item">
                    <Phone size={24} />
                    <span>0 (506) 164 47 41</span>
                  </a>
                  <a href="mailto:danismapsikolojisi@gmail.com" className="contact-item">
                    <Mail size={24} />
                    <span>danismapsikolojisi@gmail.com</span>
                  </a>
                  <a href="https://www.google.com/maps/search/?api=1&query=Kemaliye+Mh.+Cumhuriyet+Meydanı.+No:7+Kat:1,+1+No'lu+İşyeri+Hendek+Sakarya" target="_blank" rel="noopener noreferrer" className="contact-item">
                    <MapPin size={24} />
                    <span>Kemaliye Mh. Cumhuriyet Meydanı. No:7 Kat:1, <br/>1 No'lu İşyeri Hendek/SAKARYA</span>
                  </a>
                </div>
                <div className="social-links">
                    <a href="https://www.instagram.com/danismapsikolojisi" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
                    <a href="https://www.linkedin.com/in/kerem-karag%C3%B6z-463951181/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
                </div>
              </div>
              <div className="contact-form-wrapper animate-slideInRight delay-1">
                <h4>Randevu veya Bilgi Formu</h4>
                <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Mesajınız tarafıma ulaştı. En kısa sürede sizinle iletişime geçeceğim.'); e.target.reset(); }}>
                  <div className="form-group">
                    <label htmlFor="name">Adınız Soyadınız</label>
                    <input id="name" name="name" type="text" placeholder="Örn: Ayşe Yılmaz" required aria-required="true"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-posta Adresiniz</label>
                    <input id="email" name="email" type="email" placeholder="Örn: ayse@ornek.com" required aria-required="true"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone_contact">Telefon Numaranız</label>
                    <input id="phone_contact" name="phone_contact" type="tel" placeholder="Örn: 555 123 4567 (Opsiyonel)" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Konu</label>
                    <select id="subject" name="subject" required aria-required="true">
                        <option value="">İlgilendiğiniz Hizmeti Seçiniz...</option>
                        <option value="Bireysel Danışmanlık Randevusu">Bireysel Danışmanlık Randevusu</option>
                        <option value="EMDR Terapisi Randevusu">EMDR Terapisi Randevusu</option>
                        <option value="Aile ve Çift Danışmanlığı Randevusu">Aile ve Çift Danışmanlığı Randevusu</option>
                        <option value="Attentioner / MOXO Bilgi">Attentioner / MOXO Bilgi</option>
                        <option value="Genel Bilgi Alma">Genel Bilgi Alma</option>
                        <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Mesajınız</label>
                    <textarea id="message" name="message" placeholder="Kısaca mesajınızı veya sorunuzu buraya yazabilirsiniz..." rows={5} required aria-required="true"></textarea>
                  </div>
                  <button type="submit" className="submit-btn btn btn-primary">
                    Mesajı Gönder <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section about">
              <a href="#anasayfa" className="footer-logo" onClick={(e) => scrollToSection(e, 'anasayfa')}>
                <img src="/logo.png" alt={`${clinicName} logo footer`} style={{width: '28px', height: 'auto', filter: 'brightness(0) invert(1)'}} /> {/* Simple inline style for white logo in dark footer */}
                <span>{clinicName}</span>
              </a>
              <p>Psikolojik Danışman {counselorName} | İçsel yolculuğunuzda size rehberlik etmek için buradayım. Gelecek hayal etmekle başlar...</p>
              <div className="footer-socials">
                 <a href="https://www.instagram.com/danismapsikolojisi" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
                 <a href="https://www.linkedin.com/in/kerem-karag%C3%B6z-463951181/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              </div>
            </div>
            <div className="footer-section links">
              <h4>Site Haritası</h4>
              <ul>
                {navLinks.map(link => (
                    <li key={`footer-${link.id}`}><a href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)}>{link.text}</a></li>
                ))}
                <li><a href="/gizlilik-politikasi" onClick={(e) => {e.preventDefault(); alert("Gizlilik Politikası sayfası henüz hazır değil.");}}>Gizlilik Politikası</a></li>
                <li><a href="/kullanim-sartlari" onClick={(e) => {e.preventDefault(); alert("Kullanım Şartları sayfası henüz hazır değil.");}}>Kullanım Şartları</a></li>
              </ul>
            </div>
            <div className="footer-section services-links">
              <h4>Başlıca Hizmetler</h4>
              <ul>
                <li><a href="#hizmetlerim" onClick={(e)=> scrollToSection(e, 'hizmetlerim')}>Bireysel Danışmanlık</a></li>
                <li><a href="#hizmetlerim" onClick={(e)=> scrollToSection(e, 'hizmetlerim')}>EMDR Terapisi</a></li>
                <li><a href="#hizmetlerim" onClick={(e)=> scrollToSection(e, 'hizmetlerim')}>Aile ve Çift Danışmanlığı</a></li>
                <li><a href="#hizmetlerim" onClick={(e)=> scrollToSection(e, 'hizmetlerim')}>Attentioner & MOXO</a></li>
              </ul>
            </div>
            <div className="footer-section contact-info-footer">
              <h4>İletişimde Kalın</h4>
              <address>
                Kemaliye Mh. Cumhuriyet Meydanı. No:7 Kat:1, <br/>1 No'lu İşyeri Hendek/SAKARYA
              </address>
              <p><a href="tel:+905061644741">0 (506) 164 47 41</a></p>
              <p><a href="mailto:danismapsikolojisi@gmail.com">danismapsikolojisi@gmail.com</a></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} {clinicName} - {counselorName}. Tüm hakları saklıdır.</p>
            <p>Bu web sitesi tanıtım amaçlıdır, tıbbi tavsiye niteliği taşımaz.</p>
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default Anasayfa;