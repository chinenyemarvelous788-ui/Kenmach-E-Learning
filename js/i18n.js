/**
 * Chigos E-Learning — Internationalization (i18n) Engine
 * Multi-language switcher supporting:
 * - 🇳🇬 English (NG) [Default]
 * - 🇬🇧 English (UK)
 * - 🇫🇷 Français
 * - 🇪🇸 Español
 * - 🇸🇦 العربية (with full RTL layout support)
 * - 🇳🇬 Yorùbá
 * - 🇳🇬 Igbo
 * - 🇳🇬 Hausa
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'chigos_lang';

  // Comprehensive Multi-Language Dictionary
  const TRANSLATIONS = {
    // ==================== FRENCH ====================
    'fr': {
      // Navigation
      'Home': 'Accueil',
      'Courses': 'Cours',
      'About': 'À propos',
      'Contact': 'Contact',
      'Log in': 'Connexion',
      'Get Started': 'Commencer',
      'Search courses...': 'Rechercher des cours...',
      'Find a course': 'Trouver un cours',

      // Hero Section
      'YOUR NEXT CHAPTER STARTS HERE': 'VOTRE PROCHAIN CHAPITRE COMMENCE ICI',
      'Learn something': 'Apprenez quelque chose',
      'extraordinary.': 'd’extraordinaire.',
      'Become unstoppable.': 'Devenez imparable.',
      'Discover practical skills from passionate instructors. Explore courses, learn at your own pace, and turn what you know into what you can achieve.':
        'Découvrez des compétences pratiques auprès d’instructeurs passionnés. Explorez des cours, apprenez à votre rythme et transformez vos connaissances en réalisations concrètes.',
      'Explore Courses': 'Explorer les cours',
      'Become an Instructor': 'Devenir instructeur',
      'What would you like to learn? (e.g. Web Dev, Python, Design)': 'Que souhaitez-vous apprendre ? (ex. Dév Web, Python, Design)',
      'Learn on your terms': 'Apprenez selon vos conditions',
      'Explore skills. Build your future.': 'Développez des compétences. Bâtissez votre avenir.',
      'LEARN WITHOUT LIMITS': 'APPRENDRE SANS LIMITES',
      'Your potential has no ceiling.': 'Votre potentiel n’a aucune limite.',
      'YOUR NEXT SKILL': 'VOTRE PROCHAINE COMPÉTENCE',
      'Design & Creativity': 'Design & Créativité',
      'Learn something new today': 'Apprenez du nouveau aujourd’hui',
      'Learn in real time': 'Apprenez en temps réel',
      'Connect with instructors': 'Échangez avec les instructeurs',
      'Keep learning': 'Continuez d’apprendre',
      'You\'re almost there': 'Vous y êtes presque',
      'Trusted by teams & featured in': 'Reconnu par les équipes et présenté dans',

      // Headings with accents/spans
      'Learn from the': 'Apprenez des',
      'most-loved': 'cours les plus aimés',
      'courses this month.': 'ce mois-ci.',
      'Structured tracks to take you from': 'Des parcours structurés pour passer de',
      'beginner to hired.': 'débutant à embauché.',
      'Not just another': 'Bien plus qu’une simple',
      'course library.': 'bibliothèque de cours.',
      'Three steps from': 'Trois étapes de',
      'curious to certified.': 'curieux à certifié.',
      'Open your channel': 'Ouvrez votre chaîne',
      'for': 'pour',

      // Featured Courses
      'Featured Courses': 'Cours en vedette',
      'Hand-picked by our team. Built by instructors who ship real work — not just slides.':
        'Sélectionnés par notre équipe. Conçus par des instructeurs qui créent de vrais projets — pas juste des diapositives.',
      'View all 340 courses': 'Voir les 340 cours',
      'Beginner': 'Débutant',
      'Intermediate': 'Intermédiaire',
      'Advanced': 'Avancé',
      'Bestseller': 'Meilleure vente',
      'Trending': 'Tendance',
      'Free': 'Gratuit',
      'Preview': 'Aperçu',
      'Enroll now': 'S’inscrire',
      'Web Development': 'Développement Web',
      'UI / UX Design': 'Design UI / UX',
      'Data & Analytics': 'Données & Analytique',
      'Business': 'Entrepreneuriat',
      'Marketing': 'Marketing',
      'AI & Automation': 'IA & Automatisation',
      'Full-Stack JavaScript: From Zero to Deploy': 'JavaScript Full-Stack : De Zéro au Déploiement',
      'Design Systems That Scale With Your Product': 'Design Systems qui Évoluent avec Votre Produit',
      'Python for Data Science & Machine Learning': 'Python pour la Data Science et le Machine Learning',
      'Product Management: From Idea to Launch': 'Gestion de Produit : De l’Idée au Lancement',
      'Growth Marketing for Modern Startups': 'Growth Marketing pour les Startups Modernes',
      'Building AI-Powered Apps with LLMs': 'Créer des Applications IA avec des LLM',

      // Learning Paths
      'Learning Paths': 'Parcours d’apprentissage',
      'Multi-course programs with a clear roadmap, real projects, and a certificate at the finish line.':
        'Des programmes complets avec feuille de route claire, projets pratiques et certificat officiel.',
      'See all 12 paths': 'Voir les 12 parcours',

      // Why Chigos
      'Why Chigos': 'Pourquoi Chigos',
      'We built Chigos for people who want to actually finish, actually learn, and actually get hired — not just collect certificates.':
        'Nous avons créé Chigos pour ceux qui veulent vraiment apprendre, terminer et être embauchés — pas seulement collectionner des certificats.',
      'Learn at your own pace': 'Apprenez à votre rythme',
      'No deadlines, no pressure. Watch lessons on your schedule, on any device — and pick up exactly where you left off.':
        'Sans contrainte ni date limite. Regardez les leçons à votre rythme sur n’importe quel appareil et reprenez là où vous vous étiez arrêté.',
      'See how it works': 'Voir comment ça marche',
      'Taught by expert instructors': 'Enseigné par des experts du secteur',
      'Every course is created by people who actually build, ship, and hire. Real-world lessons — not recycled textbook theory.':
        'Chaque cours est conçu par des professionnels actifs qui conçoivent, déploient et recrutent. Des leçons pratiques — pas de la théorie recyclée.',
      'Meet the instructors': 'Rencontrer les instructeurs',
      'Build real projects': 'Construisez de vrais projets',
      'You learn by doing. Every path ships with portfolio-ready projects you can show employers or clients from day one.':
        'On apprend en pratiquant. Chaque parcours inclut des projets prêts pour votre portfolio, à présenter immédiatement aux recruteurs.',
      'See sample projects': 'Voir des exemples de projets',
      'Earn recognized certificates': 'Obtenez des certificats reconnus',
      'Finish a path and get a verifiable certificate you can add to LinkedIn, your CV, and your portfolio in one click.':
        'Terminez un parcours et recevez un certificat vérifiable à ajouter en un clic sur LinkedIn, votre CV et votre portfolio.',
      'View sample certificate': 'Voir un exemple de certificat',

      // How it Works
      'How It Works': 'Comment ça marche',
      'No confusion, no dead ends. Just a clear path from your first click to your certificate — built for first-timers and pros alike.':
        'Aucune confusion, aucune impasse. Un chemin clair dès votre premier clic jusqu’à l’obtention de votre diplôme.',
      'Pick a course': 'Choisissez un cours',
      'Browse 340+ courses or follow a curated learning path. Filter by level, price, and outcome — no guesswork.':
        'Parcourez plus de 340 cours ou suivez un parcours guidé. Filtrez par niveau, tarif et objectif.',
      'Learn & practice': 'Apprenez et pratiquez',
      'Watch lessons, build real projects, and test yourself with quizzes. Learn at your own pace, on any device.':
        'Suivez les cours vidéo, réalisez des projets concrets et testez-vous avec des quiz adaptés.',
      'Earn a certificate': 'Obtenez votre certificat',
      'Finish the course and unlock a verifiable certificate you can share on LinkedIn, your CV, and your portfolio.':
        'Validez votre cours et débloquez un certificat numérique officiel à partager sur vos réseaux professionnels.',
      'Start your first lesson': 'Commencer votre première leçon',

      // For Teachers
      'For Teachers': 'Pour les Enseignants',
      'Set your own prices. Keep the rest.': 'Fixez vos propres tarifs. Gardez le reste.',
      'One-time registration. Lifetime access to your dashboard. Every sale, ₦100 goes to the platform and the rest lands in your balance — instantly visible, always honest.':
        'Inscription unique. Accès à vie à votre tableau de bord. À chaque vente, ₦100 reviennent à la plateforme et tout le reste est directement versé sur votre solde.',
      'Monthly fees': 'Frais mensuels',
      'Instant': 'Instantané',
      'Payouts': 'Versements',
      'You own it': 'Vous êtes propriétaire',
      'Start your channel': 'Lancer votre chaîne',
      'Teacher earnings calculator': 'Simulateur de revenus instructeur',
      'Live breakdown': 'Détail en direct',
      'Course price': 'Prix du cours',
      'Platform fee': 'Frais de plateforme',
      'You receive': 'Vous recevez',

      // Instructors & Testimonials
      'Instructors': 'Instructeurs',
      'Learn from people who\'ve actually shipped the work.': 'Apprenez auprès de ceux qui ont déjà accompli ce travail.',
      'Our instructors aren\'t full-time theorists. They\'re engineering leads, staff designers, and product heads who build software every single day.':
        'Nos formateurs ne sont pas des théoriciens. Ce sont des ingénieurs en chef, des designers seniors et des directeurs de produits en activité.',
      'View profile': 'Voir le profil',
      'Stories': 'Témoignages',
      'Real stories from people who actually finished.': 'De vrais retours d’expérience d’étudiants qui ont réussi.',

      // CTA Section
      'Ready to transform your career?': 'Prêt à transformer votre carrière ?',
      'The best time to learn was yesterday. The next best is right now.': 'Le meilleur moment pour apprendre était hier. Le deuxième meilleur est maintenant.',
      'Join 18,000+ ambitious learners building real-world skills on Chigos.':
        'Rejoignez plus de 18 000 apprenants ambitieux qui développent des compétences concrètes sur Chigos.',
      'Find your course': 'Trouver votre cours',
      'Teach on Chigos': 'Enseigner sur Chigos',

      // Footer
      'Real skills, real teachers, real outcomes. Learn from practitioners who\'ve shipped the work they teach.':
        'De vraies compétences, de vrais formateurs, de vrais résultats. Apprenez auprès de praticiens reconnus.',
      'Platform': 'Plateforme',
      'Company': 'Entreprise',
      'Support': 'Support',
      'Legal': 'Légal',
      'Learning Paths': 'Parcours d’apprentissage',
      'Certificates': 'Certificats',
      'Pricing': 'Tarifs',
      'Mobile App': 'Application Mobile',
      'Careers': 'Carrières',
      'Hiring': 'Recrutement',
      'Blog': 'Blog',
      'Press': 'Presse',
      'Partners': 'Partenaires',
      'Help Center': 'Centre d’aide',
      'Contact Us': 'Contactez-nous',
      'FAQ': 'FAQ',
      'System Status': 'État du système',
      'Accessibility': 'Accessibilité',
      'Terms of Service': 'Conditions d’utilisation',
      'Privacy Policy': 'Politique de confidentialité',
      'Cookie Settings': 'Gestion des cookies',
      'Refund Policy': 'Politique de remboursement',
      'Security': 'Sécurité',
      'Terms': 'Conditions',
      'Privacy': 'Confidentialité',
      'Cookies': 'Cookies',
      'System operational': 'Système opérationnel',
      'All rights reserved.': 'Tous droits réservés.'
    },

    // ==================== SPANISH ====================
    'es': {
      // Navigation
      'Home': 'Inicio',
      'Courses': 'Cursos',
      'About': 'Acerca de',
      'Contact': 'Contacto',
      'Log in': 'Iniciar sesión',
      'Get Started': 'Comenzar',
      'Search courses...': 'Buscar cursos...',
      'Find a course': 'Buscar un curso',

      // Hero Section
      'YOUR NEXT CHAPTER STARTS HERE': 'TU PRÓXIMO CAPÍTULO COMIENZA AQUÍ',
      'Learn something': 'Aprende algo',
      'extraordinary.': 'extraordinario.',
      'Become unstoppable.': 'Sé imparable.',
      'Discover practical skills from passionate instructors. Explore courses, learn at your own pace, and turn what you know into what you can achieve.':
        'Descubre habilidades prácticas con instructores apasionados. Explora cursos, aprende a tu propio ritmo y convierte tus conocimientos en grandes logros.',
      'Explore Courses': 'Explorar cursos',
      'Become an Instructor': 'Ser instructor',
      'What would you like to learn? (e.g. Web Dev, Python, Design)': '¿Qué te gustaría aprender? (ej. Des. Web, Python, Diseño)',
      'Learn on your terms': 'Aprende a tu manera',
      'Explore skills. Build your future.': 'Desarrolla habilidades. Construye tu futuro.',
      'LEARN WITHOUT LIMITS': 'APRENDE SIN LÍMITES',
      'Your potential has no ceiling.': 'Tu potencial no tiene límites.',
      'YOUR NEXT SKILL': 'TU PRÓXIMA HABILIDAD',
      'Design & Creativity': 'Diseño y Creatividad',
      'Learn something new today': 'Aprende algo nuevo hoy',
      'Learn in real time': 'Aprende en tiempo real',
      'Connect with instructors': 'Conéctate con instructores',
      'Keep learning': 'Sigue aprendiendo',
      'You\'re almost there': 'Ya casi llegas',
      'Trusted by teams & featured in': 'Confiado por equipos y destacado en',

      // Headings with accents/spans
      'Learn from the': 'Aprende de los',
      'most-loved': 'más populares',
      'courses this month.': 'este mes.',
      'Structured tracks to take you from': 'Rutas estructuradas para llevarte de',
      'beginner to hired.': 'principiante a contratado.',
      'Not just another': 'Mucho más que otra',
      'course library.': 'biblioteca de cursos.',
      'Three steps from': 'Tres pasos de',
      'curious to certified.': 'curioso a certificado.',
      'Open your channel': 'Abre tu canal',
      'for': 'por',

      // Featured Courses
      'Featured Courses': 'Cursos destacados',
      'Hand-picked by our team. Built by instructors who ship real work — not just slides.':
        'Seleccionados por nuestro equipo. Creados por profesionales que construyen proyectos reales, no solo diapositivas.',
      'View all 340 courses': 'Ver los 340 cursos',
      'Beginner': 'Principiante',
      'Intermediate': 'Intermedio',
      'Advanced': 'Avanzado',
      'Bestseller': 'Más vendido',
      'Trending': 'Tendencia',
      'Free': 'Gratis',
      'Preview': 'Vista previa',
      'Enroll now': 'Inscribirse',
      'Web Development': 'Desarrollo Web',
      'UI / UX Design': 'Diseño UI / UX',
      'Data & Analytics': 'Datos y Analítica',
      'Business': 'Negocios',
      'Marketing': 'Marketing',
      'AI & Automation': 'IA y Automatización',
      'Full-Stack JavaScript: From Zero to Deploy': 'JavaScript Full-Stack: De Cero al Despliegue',
      'Design Systems That Scale With Your Product': 'Sistemas de Diseño que Escalan con tu Producto',
      'Python for Data Science & Machine Learning': 'Python para Ciencia de Datos y Machine Learning',
      'Product Management: From Idea to Launch': 'Gestión de Producto: De la Idea al Lanzamiento',
      'Growth Marketing for Modern Startups': 'Growth Marketing para Startups Modernas',
      'Building AI-Powered Apps with LLMs': 'Creación de Apps con IA y Modelos LLM',

      // Learning Paths
      'Learning Paths': 'Rutas de aprendizaje',
      'Multi-course programs with a clear roadmap, real projects, and a certificate at the finish line.':
        'Programas completos con hoja de ruta definida, proyectos reales y certificado oficial.',
      'See all 12 paths': 'Ver las 12 rutas',

      // Why Chigos
      'Why Chigos': 'Por qué Chigos',
      'We built Chigos for people who want to actually finish, actually learn, and actually get hired — not just collect certificates.':
        'Creamos Chigos para quienes desean aprender de verdad, terminar sus proyectos y ser contratados, no solo acumular certificados.',
      'Learn at your own pace': 'Aprende a tu propio ritmo',
      'No deadlines, no pressure. Watch lessons on your schedule, on any device — and pick up exactly where you left off.':
        'Sin plazos ni presiones. Mira las clases según tu horario, en cualquier dispositivo, y retoma donde lo dejaste.',
      'See how it works': 'Mira cómo funciona',
      'Taught by expert instructors': 'Enseñado por instructores expertos',
      'Every course is created by people who actually build, ship, and hire. Real-world lessons — not recycled textbook theory.':
        'Cada curso está creado por profesionales en activo que crean, despliegan y contratan. Lecciones del mundo real, no teoría de libros.',
      'Meet the instructors': 'Conoce a los instructores',
      'Build real projects': 'Construye proyectos reales',
      'You learn by doing. Every path ships with portfolio-ready projects you can show employers or clients from day one.':
        'Aprendes haciendo. Cada programa incluye proyectos listos para tu portafolio que puedes mostrar a empresas y clientes.',
      'See sample projects': 'Ver proyectos de muestra',
      'Earn recognized certificates': 'Obtén certificados reconocidos',
      'Finish a path and get a verifiable certificate you can add to LinkedIn, your CV, and your portfolio in one click.':
        'Completa una ruta y recibe un certificado verificable para compartir en LinkedIn, tu CV y tu portafolio.',
      'View sample certificate': 'Ver certificado de muestra',

      // How it Works
      'How It Works': 'Cómo funciona',
      'No confusion, no dead ends. Just a clear path from your first click to your certificate — built for first-timers and pros alike.':
        'Sin confusiones ni rodeos. Un camino claro desde tu primer clic hasta tu título profesional.',
      'Pick a course': 'Elige un curso',
      'Browse 340+ courses or follow a curated learning path. Filter by level, price, and outcome — no guesswork.':
        'Explora más de 340 cursos o sigue una ruta formativa. Filtra por nivel, precio y objetivos.',
      'Learn & practice': 'Aprende y practica',
      'Watch lessons, build real projects, and test yourself with quizzes. Learn at your own pace, on any device.':
        'Mira las lecciones, desarrolla proyectos reales y ponte a prueba con cuestionarios interactivos.',
      'Earn a certificate': 'Obtén tu certificado',
      'Finish the course and unlock a verifiable certificate you can share on LinkedIn, your CV, and your portfolio.':
        'Termina el curso y desbloquea un certificado digital verificable para compartir en tus redes profesionales.',
      'Start your first lesson': 'Comienza tu primera lección',

      // For Teachers
      'For Teachers': 'Para Profesores',
      'Set your own prices. Keep the rest.': 'Define tus precios. Quédate con el resto.',
      'One-time registration. Lifetime access to your dashboard. Every sale, ₦100 goes to the platform and the rest lands in your balance — instantly visible, always honest.':
        'Registro único. Acceso vitalicio a tu panel. Por cada venta, ₦100 van a la plataforma y el resto a tu cuenta al instante.',
      'Monthly fees': 'Tarifas mensuales',
      'Instant': 'Instantáneo',
      'Payouts': 'Pagos',
      'You own it': 'Es 100% tuyo',
      'Start your channel': 'Crear mi canal',
      'Teacher earnings calculator': 'Calculadora de ganancias para profesores',
      'Live breakdown': 'Cálculo en vivo',
      'Course price': 'Precio del curso',
      'Platform fee': 'Comisión de plataforma',
      'You receive': 'Tú recibes',

      // Instructors & Testimonials
      'Instructors': 'Instructores',
      'Learn from people who\'ve actually shipped the work.': 'Aprende de personas que han construido soluciones reales.',
      'Our instructors aren\'t full-time theorists. They\'re engineering leads, staff designers, and product heads who build software every single day.':
        'Nuestros instructores no son teóricos. Son líderes de ingeniería, diseñadores y directores de producto que crean software todos los días.',
      'View profile': 'Ver perfil',
      'Stories': 'Historias',
      'Real stories from people who actually finished.': 'Historias reales de personas que completaron sus metas.',

      // CTA Section
      'Ready to transform your career?': '¿Listo para transformar tu carrera profesional?',
      'The best time to learn was yesterday. The next best is right now.': 'El mejor momento para aprender fue ayer. El segundo mejor es ahora.',
      'Join 18,000+ ambitious learners building real-world skills on Chigos.':
        'Únete a más de 18,000 estudiantes ambiciosos que desarrollan habilidades reales con Chigos.',
      'Find your course': 'Encontrar mi curso',
      'Teach on Chigos': 'Enseñar en Chigos',

      // Footer
      'Real skills, real teachers, real outcomes. Learn from practitioners who\'ve shipped the work they teach.':
        'Habilidades reales, instructores reales, resultados auténticos. Aprende de expertos que construyen lo que enseñan.',
      'Platform': 'Plataforma',
      'Company': 'Compañía',
      'Support': 'Soporte',
      'Legal': 'Legal',
      'Learning Paths': 'Rutas de aprendizaje',
      'Certificates': 'Certificados',
      'Pricing': 'Precios',
      'Mobile App': 'Aplicación Móvil',
      'Careers': 'Carreras',
      'Hiring': 'Contratando',
      'Blog': 'Blog',
      'Press': 'Prensa',
      'Partners': 'Socios',
      'Help Center': 'Centro de ayuda',
      'Contact Us': 'Contáctanos',
      'FAQ': 'Preguntas frecuentes',
      'System Status': 'Estado del sistema',
      'Accessibility': 'Accesibilidad',
      'Terms of Service': 'Términos de servicio',
      'Privacy Policy': 'Política de privacidad',
      'Cookie Settings': 'Ajustes de cookies',
      'Refund Policy': 'Política de reembolsos',
      'Security': 'Seguridad',
      'Terms': 'Términos',
      'Privacy': 'Privacidad',
      'Cookies': 'Cookies',
      'System operational': 'Sistema operativo',
      'All rights reserved.': 'Todos los derechos reservados.'
    },

    // ==================== ARABIC (RTL) ====================
    'ar': {
      // Navigation
      'Home': 'الرئيسية',
      'Courses': 'الدورات',
      'About': 'من نحن',
      'Contact': 'اتصل بنا',
      'Log in': 'تسجيل الدخول',
      'Get Started': 'ابدأ الآن',
      'Search courses...': 'ابحث عن الدورات...',
      'Find a course': 'ابحث عن دورة',

      // Hero Section
      'YOUR NEXT CHAPTER STARTS HERE': 'فصلك الجديد يبدأ هنا',
      'Learn something': 'تعلم شيئاً',
      'extraordinary.': 'استثنائياً.',
      'Become unstoppable.': 'كن غير قابل للإيقاف.',
      'Discover practical skills from passionate instructors. Explore courses, learn at your own pace, and turn what you know into what you can achieve.':
        'اكتشف مهارات عملية من مدربين شغوفين. استكشف الدورات، وتعلم بالسرعة التي تناسبك، وحوّل ما تعرفه إلى إنجازات واقعية.',
      'Explore Courses': 'استكشف الدورات',
      'Become an Instructor': 'كن معلماً',
      'What would you like to learn? (e.g. Web Dev, Python, Design)': 'ماذا ترغب في تعلمه؟ (مثل: تطوير الويب، بايثون، تصميم)',
      'Learn on your terms': 'تعلم وفق شروطك الخاصة',
      'Explore skills. Build your future.': 'استكشف المهارات. ابنِ مستقبلك.',
      'LEARN WITHOUT LIMITS': 'تعلم بلا حدود',
      'Your potential has no ceiling.': 'إمكاناتك ليس لها حدود.',
      'YOUR NEXT SKILL': 'مهارتك القادمة',
      'Design & Creativity': 'التصميم والإبداع',
      'Learn something new today': 'تعلم شيئاً جديداً اليوم',
      'Learn in real time': 'تعلم في الوقت الفعلي',
      'Connect with instructors': 'تواصل مع المدربين',
      'Keep learning': 'واصل التعلم',
      'You\'re almost there': 'أنت على وشك الوصول',
      'Trusted by teams & featured in': 'موثوق به من فرق العمل وتميز في',

      // Headings with accents/spans
      'Learn from the': 'تعلم من',
      'most-loved': 'الأكثر شعبية',
      'courses this month.': 'هذا الشهر.',
      'Structured tracks to take you from': 'مسارات تعليمية تنقلك من',
      'beginner to hired.': 'المبتدئ إلى التوظيف.',
      'Not just another': 'لسنا مجرد',
      'course library.': 'مكتبة دورات عادية.',
      'Three steps from': 'ثلاث خطوات من',
      'curious to certified.': 'الفضول إلى الاعتماد.',
      'Open your channel': 'افتح قناتك',
      'for': 'مقابل',

      // Featured Courses
      'Featured Courses': 'الدورات المميزة',
      'Hand-picked by our team. Built by instructors who ship real work — not just slides.':
        'مختارة بعناية من فريقنا. أعدها خبراء يبتكرون مشاريع حقيقية وليس مجرد عروض تقديمية.',
      'View all 340 courses': 'عرض كافة الدورات (340)',
      'Beginner': 'مبتدئ',
      'Intermediate': 'متوسط',
      'Advanced': 'متقدم',
      'Bestseller': 'الأكثر مبيعاً',
      'Trending': 'رائج الآن',
      'Free': 'مجاناً',
      'Preview': 'معاينة',
      'Enroll now': 'سجل الآن',
      'Web Development': 'تطوير الويب',
      'UI / UX Design': 'تصميم واجهات المستخدم',
      'Data & Analytics': 'البيانات والتحليلات',
      'Business': 'ريادة الأعمال',
      'Marketing': 'التسويق الرقمي',
      'AI & Automation': 'الذكاء الاصطناعي والأتمتة',
      'Full-Stack JavaScript: From Zero to Deploy': 'جافاسكريبت فول ستاك: من الصفر حتى النشر',
      'Design Systems That Scale With Your Product': 'أنظمة التصميم القابلة للتوسع مع منتجك',
      'Python for Data Science & Machine Learning': 'بايثون لعلوم البيانات وتعلم الآلة',
      'Product Management: From Idea to Launch': 'إدارة المنتجات: من الفكرة إلى الإطلاق',
      'Growth Marketing for Modern Startups': 'تسويق النمو للشركات الناشئة',
      'Building AI-Powered Apps with LLMs': 'بناء تطبيقات مدعومة بالذكاء الاصطناعي',

      // Learning Paths
      'Learning Paths': 'مسارات التعلم',
      'Multi-course programs with a clear roadmap, real projects, and a certificate at the finish line.':
        'برامج متعددة الدورات بخريطة طريق واضحة ومشاريع حقيقية مع شهادة معتمدة عند الإكمال.',
      'See all 12 paths': 'شاهد جميع المسارات الـ 12',

      // Why Chigos
      'Why Chigos': 'لماذا تشيغوس؟',
      'We built Chigos for people who want to actually finish, actually learn, and actually get hired — not just collect certificates.':
        'صممنا منصة تشيغوس للأشخاص الذين يريدون التعلم الحقيقي والإنجاز والتوظيف، وليس مجرد جمع الشهادات.',
      'Learn at your own pace': 'تعلم وفق وتيرتك الخاصة',
      'No deadlines, no pressure. Watch lessons on your schedule, on any device — and pick up exactly where you left off.':
        'بدون مواعيد نهائية أو ضغوط. شاهد الدروس في الوقت المناسب لك على أي جهاز وتابع من حيث توقفت.',
      'See how it works': 'شاهد كيف تسير الأمور',
      'Taught by expert instructors': 'يقدمها نخبة من المحترفين',
      'Every course is created by people who actually build, ship, and hire. Real-world lessons — not recycled textbook theory.':
        'كل دورة من إعداد ممارسين يطورون البرمجيات ويوظفون الكفاءات، لتقديم خبرة ميدانية حقيقية.',
      'Meet the instructors': 'تعرف على المدربين',
      'Build real projects': 'ابنِ مشاريع واقعية',
      'You learn by doing. Every path ships with portfolio-ready projects you can show employers or clients from day one.':
        'التعلم بالممارسة هو الأساس. يتضمن كل مسار مشاريع جاهزة لملفك المهني لعرضها على الشركات والعملاء.',
      'See sample projects': 'نماذج المشاريع',
      'Earn recognized certificates': 'احصل على شهادات معتمدة',
      'Finish a path and get a verifiable certificate you can add to LinkedIn, your CV, and your portfolio in one click.':
        'أكمل المسار واحصل على شهادة موثقة يمكنك إضافتها بنقرة واحدة إلى لينكد إن وسيرتك الذاتية.',
      'View sample certificate': 'معاينة الشهادة',

      // How it Works
      'How It Works': 'طريقة العمل',
      'No confusion, no dead ends. Just a clear path from your first click to your certificate — built for first-timers and pros alike.':
        'مسار واضح المعالم وبسيط يقودك من أول نقرة إلى شهادتك المعتمدة دون أي تعقيد.',
      'Pick a course': 'اختر الدورة المناسبة',
      'Browse 340+ courses or follow a curated learning path. Filter by level, price, and outcome — no guesswork.':
        'تصفح أكثر من 340 دورة أو اتبع مساراً تعليمياً مخصصاً حسب مستواك واهتماماتك.',
      'Learn & practice': 'تعلم وطبق عملياً',
      'Watch lessons, build real projects, and test yourself with quizzes. Learn at your own pace, on any device.':
        'شاهد الدروس، ونفّذ مشاريع حقيقية، واختبر معلوماتك عبر الاختبارات التفاعلية.',
      'Earn a certificate': 'نل شهادتك المعتمدة',
      'Finish the course and unlock a verifiable certificate you can share on LinkedIn, your CV, and your portfolio.':
        'أكمل الدورة واحصل على شهادة رقمية معتمدة يمكنك مشاركتها في ملفك الاحترافي.',
      'Start your first lesson': 'ابدأ درسك الأول الآن',

      // For Teachers
      'For Teachers': 'للمعلمين والمحاضرين',
      'Set your own prices. Keep the rest.': 'حدد أسعار دوراتك بنفسك واحتفظ بالأرباح.',
      'One-time registration. Lifetime access to your dashboard. Every sale, ₦100 goes to the platform and the rest lands in your balance — instantly visible, always honest.':
        'تسجيل لمرة واحدة مع وصول دائم للوحة التحكم. عند كل عملية بيع تقتطع المنصة ₦100 فقط ويصل الباقي فوراً لحسابك.',
      'Monthly fees': 'رسوم شهرية',
      'Instant': 'فوري',
      'Payouts': 'تحويلات الأرباح',
      'You own it': 'ملكيتك الكاملة',
      'Start your channel': 'ابدأ قناتك التعليمية',
      'Teacher earnings calculator': 'حاسبة أرباح المدرس',
      'Live breakdown': 'توزيع فوري للأرباح',
      'Course price': 'سعر الدورة',
      'Platform fee': 'رسوم المنصة',
      'You receive': 'أرباحك الصافية',

      // Instructors & Testimonials
      'Instructors': 'فريق التدريب',
      'Learn from people who\'ve actually shipped the work.': 'تعلم من المتخصصين الذين بنوا كبرى المنتجات التقنية.',
      'Our instructors aren\'t full-time theorists. They\'re engineering leads, staff designers, and product heads who build software every single day.':
        'مدربونا ليسوا مجرد منظرين؛ بل هم قادة فرق ومصممون ومديرو منتجات في كبرى الشركات العالمية.',
      'View profile': 'عرض الملف',
      'Stories': 'قصص النجاح',
      'Real stories from people who actually finished.': 'قصص واقعية وتجارب حية من طلابنا الناجحين.',

      // CTA Section
      'Ready to transform your career?': 'هل أنت مستعد لنقلة نوعية في مسيرتك المهنية؟',
      'The best time to learn was yesterday. The next best is right now.': 'أفضل وقت للتعلم كان بالأمس، والوقت الأفضل التالي هو الآن.',
      'Join 18,000+ ambitious learners building real-world skills on Chigos.':
        'انضم إلى أكثر من 18,000 طالب وطالبة يكتسبون مهارات حقيقية على تشيغوس.',
      'Find your course': 'ابحث عن دورتك',
      'Teach on Chigos': 'درّس معنا في تشيغوس',

      // Footer
      'Real skills, real teachers, real outcomes. Learn from practitioners who\'ve shipped the work they teach.':
        'مهارات حقيقية، مدربون محترفون، ونتائج ملموسة تفتح لك آفاق المستقبل.',
      'Platform': 'المنصة',
      'Company': 'الشركة',
      'Support': 'المساعدة والدعم',
      'Legal': 'الشروط القانونية',
      'Learning Paths': 'مسارات التعلم',
      'Certificates': 'الشهادات',
      'Pricing': 'الأسعار',
      'Mobile App': 'تطبيق الهاتف',
      'Careers': 'فرص العمل',
      'Hiring': 'توظيف نشط',
      'Blog': 'المدونة',
      'Press': 'الصحافة والإعلام',
      'Partners': 'الشركاء',
      'Help Center': 'مركز المساعدة',
      'Contact Us': 'تواصل معنا',
      'FAQ': 'الأسئلة الشائعة',
      'System Status': 'حالة النظام',
      'Accessibility': 'إمكانية الوصول',
      'Terms of Service': 'شروط الخدمة',
      'Privacy Policy': 'سياسة الخصوصية',
      'Cookie Settings': 'إعدادات الكوكيز',
      'Refund Policy': 'سياسة الاسترداد',
      'Security': 'الأمان والحماية',
      'Terms': 'الشروط',
      'Privacy': 'الخصوصية',
      'Cookies': 'الكوكيز',
      'System operational': 'النظام يعمل بشكل كامل',
      'All rights reserved.': 'جميع الحقوق محفوظة.'
    },

    // ==================== YORUBA ====================
    'yo': {
      'Home': 'Ilé',
      'Courses': 'Àwọn Ẹ̀kọ́',
      'About': 'Nípa Wa',
      'Contact': 'Kàn sí Wa',
      'Log in': 'Wọlé',
      'Get Started': 'Bẹ̀rẹ̀ Nígbà Yìí',
      'Search courses...': 'Wa àwọn ẹ̀kọ́...',
      'Find a course': 'Wa ẹ̀kọ́ kan',
      'YOUR NEXT CHAPTER STARTS HERE': 'ORÍ TUNTUN RẸ BẸ̀RẸ̀ NÍBÍ',
      'Learn something': 'Kọ́ ohun kan',
      'extraordinary.': 'tó jẹ́ àrà ọ̀tọ̀.',
      'Become unstoppable.': 'Di ẹni tí kò ṣeé dá dúró.',
      'Discover practical skills from passionate instructors. Explore courses, learn at your own pace, and turn what you know into what you can achieve.':
        'Ṣe àwárí àwọn ọgbọ́n iṣẹ́ láti ọwọ́ àwọn olùkọ́ tó nífẹ̀ẹ́ sí i. Kọ́ ní ìwọ̀ntúnwọ̀nsì ti ara rẹ, kí o sì yí ìmọ̀ rẹ padà sí àṣeyọrí.',
      'Explore Courses': 'Ṣe Àwárí Àwọn Ẹ̀kọ́',
      'Become an Instructor': 'Di Olùkọ́',
      'Learn on your terms': 'Kọ́ lórí àwọn àdéhùn rẹ',
      'Explore skills. Build your future.': 'Ṣe àwárí àwọn ọgbọ́n. Kọ́ ọjọ́ ọ̀la rẹ.',
      'Featured Courses': 'Àwọn Ẹ̀kọ́ Tí A Yàn',
      'View all 340 courses': 'Wo gbogbo àwọn ẹ̀kọ́ 340',
      'Beginner': 'Akọ́bẹ̀rẹ̀',
      'Intermediate': 'Aláàárín',
      'Advanced': 'Onípele Gíga',
      'Bestseller': 'Tí Ó Tà Jù',
      'Trending': 'Tí Ó Gbajúmọ̀',
      'Free': 'Ọ̀fẹ́',
      'Enroll now': 'Forúkọ sílẹ̀ báyìí',
      'Why Chigos': 'Èé Ṣe Tí O Fi Yan Chigos',
      'How It Works': 'Bí Ó Ṣe Ń Ṣiṣẹ́',
      'For Teachers': 'Fún Àwọn Olùkọ́',
      'Instructors': 'Àwọn Olùkọ́ Wa',
      'Ready to transform your career?': 'Ṣé o ti ṣetán láti yí iṣẹ́ rẹ padà?',
      'Start your channel': 'Bẹ̀rẹ̀ ikanni rẹ',
      'Platform': 'Pẹpẹ',
      'Company': 'Ilé-iṣẹ́',
      'Support': 'Ìrànwọ́',
      'Legal': 'Ti Òfin',
      'Terms of Service': 'Àwọn Àdéhùn Iṣẹ́',
      'Privacy Policy': 'Ètò Àdáni',
      'All rights reserved.': 'Gbogbo ẹ̀tọ́ ni a daabò bò.'
    },

    // ==================== IGBO ====================
    'ig': {
      'Home': 'Ụlọ',
      'Courses': 'Ihe Ọmụmụ',
      'About': 'Banyere Anyị',
      'Contact': 'Kpọtụrụ Anyị',
      'Log in': 'Banye',
      'Get Started': 'Bido Ugbu A',
      'Search courses...': 'Chọọ ihe ọmụmụ...',
      'Find a course': 'Chọta ihe ọmụmụ',
      'YOUR NEXT CHAPTER STARTS HERE': 'ISI NKE ỌHỤRỤ GỊ NA-EBI N’EBE A',
      'Learn something': 'Mụta ihe',
      'extraordinary.': 'pụrụ iche.',
      'Become unstoppable.': 'Nwee ike na-enweghị nkwụsị.',
      'Discover practical skills from passionate instructors. Explore courses, learn at your own pace, and turn what you know into what you can achieve.':
        'Chọpụta nka bara uru site n’aka ndị nkuzi nwere mmasị. Nyochaa ihe ọmụmụ, mụta na usoro nke gị, ma mee ka ìmò gị baa uru.',
      'Explore Courses': 'Nyochaa Ihe Ọmụmụ',
      'Become an Instructor': 'Bụrụ Onye Nkuzi',
      'Learn on your terms': 'Mụta n’ụzọ nke gị',
      'Explore skills. Build your future.': 'Nyochaa nka. Wulite ọdịnihu gị.',
      'Featured Courses': 'Ihe Ọmụmụ Pụrụ Iche',
      'View all 340 courses': 'Hụ ihe ọmụmụ 340 niile',
      'Beginner': 'Onye Mbido',
      'Intermediate': 'Etiti',
      'Advanced': 'Nke dị elu',
      'Bestseller': 'Kacha ree',
      'Trending': 'Na-ewu ewu',
      'Free': 'N’efu',
      'Enroll now': 'Debanye aha ugbu a',
      'Why Chigos': 'Gịnị Mere Chigos',
      'How It Works': 'Otú O Si Na-arụ Ọrụ',
      'For Teachers': 'Maka Ndị Nkuzi',
      'Instructors': 'Ndị Nkuzi Anyị',
      'Ready to transform your career?': 'Ị dịla njikere ịgbanwe ọrụ gị?',
      'Start your channel': 'Bido ọwa nke gị',
      'Platform': 'Ikpo Okwu',
      'Company': 'Ụlọ Ọrụ',
      'Support': 'Nkwado',
      'Legal': 'Iwu',
      'Terms of Service': 'Usoro Ọrụ',
      'Privacy Policy': 'Iwu Nzuzo',
      'All rights reserved.': 'Echekwara ikike niile.'
    },

    // ==================== HAUSA ====================
    'ha': {
      'Home': 'Gida',
      'Courses': 'Darussa',
      'About': 'Game da Mu',
      'Contact': 'Tuntube Mu',
      'Log in': 'Shiga',
      'Get Started': 'Fara Yanzu',
      'Search courses...': 'Bincika darussa...',
      'Find a course': 'Nemo darasi',
      'YOUR NEXT CHAPTER STARTS HERE': 'SABON BABINKA YANA FARAWA A NAN',
      'Learn something': 'Koyi wani abu',
      'extraordinary.': 'mai ban mamaki.',
      'Become unstoppable.': 'Zama marar tsayawa.',
      'Discover practical skills from passionate instructors. Explore courses, learn at your own pace, and turn what you know into what you can achieve.':
        'Gano dabarun aiki daga kwararrun malamai. Bincika darussa, koyi da kanka, kuma mayar da abin da ka sani zuwa ga nasara.',
      'Explore Courses': 'Bincika Darussa',
      'Become an Instructor': 'Zama Malami',
      'Learn on your terms': 'Koyi bisa sharuɗɗanku',
      'Explore skills. Build your future.': 'Bincika fasaha. Gina makomarku.',
      'Featured Courses': 'Zaɓaɓɓun Darussa',
      'View all 340 courses': 'Duba duk darussa 340',
      'Beginner': 'Mai farawa',
      'Intermediate': 'Matsakaici',
      'Advanced': 'Mai zurfi',
      'Bestseller': 'Wanda ya fi sayuwa',
      'Trending': 'Wanda ya fi fice',
      'Free': 'Kyauta',
      'Enroll now': 'Yi rijista yanzu',
      'Why Chigos': 'Me ya sa Chigos',
      'How It Works': 'Yadda Yake Aiki',
      'For Teachers': 'Don Malamai',
      'Instructors': 'Malamai',
      'Ready to transform your career?': 'Shirye don canza aikinku?',
      'Start your channel': 'Fara tasharka',
      'Platform': 'Dandamali',
      'Company': 'Kamfani',
      'Support': 'Tallafi',
      'Legal': 'Shari\'a',
      'Terms of Service': 'Sharuɗɗan Sabis',
      'Privacy Policy': 'Manufar Sirri',
      'All rights reserved.': 'Duk haƙƙoƙi an kiyaye su.'
    }
  };

  // Toast confirmation messages
  const TOAST_MESSAGES = {
    'en-NG': 'Language set to English (NG) 🇳🇬',
    'en-UK': 'Language set to English (UK) 🇬🇧',
    'fr': 'Langue changée en Français 🇫🇷',
    'es': 'Idioma cambiado a Español 🇪🇸',
    'ar': 'تم تغيير اللغة إلى العربية 🇸🇦',
    'yo': 'Èdè ti yípadà sí Yorùbá 🇳🇬',
    'ig': 'Asụsụ agbanweela gaa Igbo 🇳🇬',
    'ha': 'An canza yare zuwa Hausa 🇳🇬'
  };

  // Cache original text for zero-loss bidirectional switching
  const originalNodeTexts = new WeakMap();
  const originalPlaceholders = new WeakMap();

  function normalizeCode(labelOrCode) {
    if (!labelOrCode) return 'en-NG';
    const s = labelOrCode.trim().toLowerCase();
    if (s.includes('franç') || s === 'fr' || s.includes('french')) return 'fr';
    if (s.includes('españ') || s === 'es' || s.includes('spanish')) return 'es';
    if (s.includes('عرب') || s === 'ar' || s.includes('arabic')) return 'ar';
    if (s.includes('yorù') || s.includes('yoru') || s === 'yo') return 'yo';
    if (s.includes('igbo') || s === 'ig') return 'ig';
    if (s.includes('hausa') || s === 'ha') return 'ha';
    if (s.includes('(uk)') || s === 'en-uk' || s === 'en-gb') return 'en-UK';
    return 'en-NG';
  }

  function getLanguageInfo(code) {
    switch (code) {
      case 'fr': return { code: 'fr', label: 'Français', flag: '🇫🇷', dir: 'ltr' };
      case 'es': return { code: 'es', label: 'Español', flag: '🇪🇸', dir: 'ltr' };
      case 'ar': return { code: 'ar', label: 'العربية', flag: '🇸🇦', dir: 'rtl' };
      case 'yo': return { code: 'yo', label: 'Yorùbá', flag: '🇳🇬', dir: 'ltr' };
      case 'ig': return { code: 'ig', label: 'Igbo', flag: '🇳🇬', dir: 'ltr' };
      case 'ha': return { code: 'ha', label: 'Hausa', flag: '🇳🇬', dir: 'ltr' };
      case 'en-UK': return { code: 'en-UK', label: 'English (UK)', flag: '🇬🇧', dir: 'ltr' };
      default: return { code: 'en-NG', label: 'English (NG)', flag: '🇳🇬', dir: 'ltr' };
    }
  }

  function showToast(message) {
    let toast = document.getElementById('chigosI18nToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'chigosI18nToast';
      toast.style.cssText =
        'position:fixed;bottom:24px;left:24px;z-index:99999;padding:12px 20px;border-radius:12px;' +
        'background:#1F1A17;color:#ffffff;font-size:13.5px;font-weight:700;display:flex;align-items:center;' +
        'gap:10px;box-shadow:0 12px 32px rgba(0,0,0,0.28);border:1px solid rgba(232,89,12,0.3);' +
        'transition:all 0.35s cubic-bezier(0.16,1,0.3,1);opacity:0;transform:translateY(16px);pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast.__timer);
    toast.__timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(16px)';
    }, 3200);
  }

  function translateDom(root, lang) {
    const dict = TRANSLATIONS[lang] || {};

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const raw = node.nodeValue;
        const text = raw.trim();
        if (!text) return;

        if (!originalNodeTexts.has(node)) {
          originalNodeTexts.set(node, raw);
        }
        const originalRaw = originalNodeTexts.get(node);
        const originalTrimmed = originalRaw.trim();

        if (lang === 'en-NG' || lang === 'en-UK' || !dict[originalTrimmed]) {
          if (lang === 'en-NG' || lang === 'en-UK') {
            node.nodeValue = originalRaw;
          }
        } else if (dict[originalTrimmed]) {
          const leading = originalRaw.match(/^\s*/)[0];
          const trailing = originalRaw.match(/\s*$/)[0];
          node.nodeValue = leading + dict[originalTrimmed] + trailing;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'code' || tag === 'svg' || tag === 'noscript') {
          return;
        }

        // Handle placeholder
        if (node.placeholder) {
          if (!originalPlaceholders.has(node)) {
            originalPlaceholders.set(node, node.placeholder);
          }
          const origP = originalPlaceholders.get(node);
          if (lang === 'en-NG' || lang === 'en-UK' || !dict[origP.trim()]) {
            if (lang === 'en-NG' || lang === 'en-UK') node.placeholder = origP;
          } else if (dict[origP.trim()]) {
            node.placeholder = dict[origP.trim()];
          }
        }

        for (let child = node.firstChild; child; child = child.nextSibling) {
          walk(child);
        }
      }
    }

    walk(root);
  }

  function setLanguage(labelOrCode, isUserTriggered = false) {
    const code = normalizeCode(labelOrCode);
    const info = getLanguageInfo(code);

    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {}

    // Set document lang & text direction
    document.documentElement.lang = info.code;
    document.documentElement.dir = info.dir;

    if (info.dir === 'rtl') {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }

    // Update Language Button in Footer
    const flagEl = document.getElementById('currentFlag');
    const labelEl = document.getElementById('currentLang');
    if (flagEl) flagEl.textContent = info.flag;
    if (labelEl) labelEl.textContent = info.label;

    // Update active state in menu
    document.querySelectorAll('.lang-menu button').forEach(btn => {
      const btnCode = normalizeCode(btn.dataset.lang || btn.dataset.label);
      const isMatch = btnCode === code;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });

    // Translate all visible page content
    translateDom(document.body, code);

    // Toast feedback
    if (isUserTriggered) {
      showToast(TOAST_MESSAGES[code] || `Language set to ${info.label}`);
    }
  }

  function init() {
    // Check stored language
    let saved = 'en-NG';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || 'en-NG';
    } catch (e) {}

    // Wire all language switchers
    const switchers = document.querySelectorAll('.lang-switcher');
    switchers.forEach(switcher => {
      if (switcher.dataset.i18nBound === 'true') return;
      switcher.dataset.i18nBound = 'true';
      const btn = switcher.querySelector('.lang-btn');
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = switcher.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });

      const options = switcher.querySelectorAll('.lang-menu button');
      options.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const target = opt.dataset.lang || opt.dataset.label || opt.textContent;
          setLanguage(target, true);
          switcher.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    });

    document.addEventListener('click', (e) => {
      switchers.forEach(s => {
        if (!s.contains(e.target)) {
          s.classList.remove('open');
          const b = s.querySelector('.lang-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        switchers.forEach(s => {
          s.classList.remove('open');
          const b = s.querySelector('.lang-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Apply saved language immediately
    if (saved !== 'en-NG') {
      setLanguage(saved, false);
    }
  }

  // Expose API
  window.ChigosI18n = {
    setLanguage: setLanguage,
    getLanguage: () => {
      try {
        return localStorage.getItem(STORAGE_KEY) || 'en-NG';
      } catch (e) {
        return 'en-NG';
      }
    },
    translate: () => {
      const lang = window.ChigosI18n.getLanguage();
      translateDom(document.body, lang);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
