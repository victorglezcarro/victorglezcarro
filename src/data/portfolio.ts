/**
 * Contenido del CV de Víctor González Carro, actualizado en septiembre de 2026.
 * Los enlaces de proyectos y centros apuntan a sus webs oficiales.
 */

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  specialty: string;
  location: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  cv: string;
  intro: string;
  bio: string[];
}

export interface Experience {
  id: string;
  company: string;
  client?: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string | null;
  location?: string;
  note?: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  title: string;
  institution: string;
  period: string;
  location: string;
  ongoing: boolean;
  href: string;
}

export interface TechnologyGroup {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  technologies: string[];
  period: string;
  /** Experience entry whose highlights appear as "Mi contribución". */
  experienceId?: string;
  /** Accessible description of the project illustration. */
  imageAlt: string;
  href?: string;
  linkLabel?: string;
}

export const profile: Profile = {
  name: 'Víctor González Carro',
  firstName: 'Víctor',
  lastName: 'González Carro',
  role: 'Frontend Engineer',
  specialty: 'Angular & arquitectura modular',
  location: 'Sevilla, España',
  email: 'victor.glez.0422@gmail.com',
  website: 'https://victorglezcarro.dev',
  github: 'https://github.com/victorglezcarro',
  linkedin: 'https://www.linkedin.com/in/victorglezcarro/',
  cv: '/CV_Victor_Gonzalez_Carro.pdf',
  intro:
    'Desarrollo experiencias web con Angular, una arquitectura cuidada y visión de producto. Del primer componente al despliegue.',
  bio: [
    'Soy frontend engineer con más de 3 años de experiencia desarrollando aplicaciones Angular escalables y mantenibles. He trabajado en infraestructuras críticas como la navegación aérea de ENAIRE y la red eléctrica de REDEIA.',
    'Mi especialidad es la arquitectura modular, la definición de estándares técnicos y la optimización del rendimiento. Mi base full-stack con Java y Spring Boot me permite entender el producto de extremo a extremo y colaborar de cerca con los equipos de backend.',
    'Actualmente desarrollo TopClubs, mi proyecto propio, con Angular, NestJS y PostgreSQL, y continúo mi formación en Ingeniería Informática en la UOC.',
  ],
};

export const experience: Experience[] = [
  {
    id: 'topclubs',
    company: 'TopClubs',
    role: 'Full-Stack Developer',
    period: 'Mar 2026 — Actualidad',
    startDate: '2026-03',
    endDate: null,
    note: 'Proyecto propio · Autónomo',
    description: 'Diseño y desarrollo integral de una plataforma con un stack unificado en TypeScript.',
    highlights: [
      'Frontend con Angular, backend con NestJS y base de datos PostgreSQL.',
      'Diseño de la arquitectura de extremo a extremo: modelo de datos, servicios y automatización del despliegue.',
      'Despliegue en contenedores Docker sobre Microsoft Azure, con integración y entrega continuas.',
    ],
    technologies: ['Angular', 'TypeScript', 'NestJS', 'PostgreSQL', 'Docker', 'Azure'],
  },
  {
    id: 'ayesa',
    company: 'Ayesa',
    client: 'REDEIA',
    role: 'Software Engineer · Full-Stack',
    period: 'Nov 2025 — Mar 2026',
    startDate: '2025-11',
    endDate: '2026-03',
    location: 'Sevilla, España',
    description: 'Mantenimiento y evolución de aplicaciones críticas para el operador del sistema eléctrico español.',
    highlights: [
      'Desarrollo full-stack con Java 8 y tecnologías legacy en un entorno de infraestructura crítica.',
      'Optimización de consultas y gestión de bases de datos Oracle en producción.',
    ],
    technologies: ['Java 8', 'Oracle', 'SQL'],
  },
  {
    id: 'babel',
    company: 'Babel',
    client: 'ENAIRE',
    role: 'Frontend Engineer · Angular',
    period: 'Nov 2023 — Nov 2025',
    startDate: '2023-11',
    endDate: '2025-11',
    location: 'Sevilla, España',
    description: 'Desarrollo de aplicaciones críticas para el gestor de la navegación aérea en España.',
    highlights: [
      'Frontend con Angular 17+ y diseño de una arquitectura modular reutilizable.',
      'Optimización del rendimiento: determinadas tareas pasaron de unos 30 minutos a pocos minutos.',
      'Testing automatizado unitario y e2e e integración continua para mejorar la fiabilidad de las entregas.',
    ],
    technologies: ['Angular 17+', 'TypeScript', 'Arquitectura modular', 'Testing e2e', 'CI/CD'],
  },
  {
    id: 'sharing-group',
    company: 'Sharing Group',
    role: 'Frontend Developer · Referente técnico',
    period: 'Sep 2023 — May 2024',
    startDate: '2023-09',
    endDate: '2024-05',
    location: 'Sevilla, España',
    note: 'Startup · En paralelo con Babel',
    description: 'Liderazgo técnico del frontend de una startup orientada a universidades de Estados Unidos.',
    highlights: [
      'Definición de la estructura del proyecto Angular y de los estándares de código del equipo.',
      'Coordinación con el equipo de backend, basado en Spring Boot, para el diseño de las APIs.',
    ],
    technologies: ['Angular', 'TypeScript', 'APIs REST', 'Spring Boot'],
  },
  {
    id: 'elephant-hive',
    company: 'Elephant Hive',
    role: 'Software Developer',
    period: 'Mar 2023 — Jun 2023',
    startDate: '2023-03',
    endDate: '2023-06',
    location: 'Dublín, Irlanda',
    description: 'Desarrollo de una extensión de Chrome con inteligencia artificial y extracción automatizada de datos.',
    highlights: [
      'Integración de la API de OpenAI en una extensión de Google Chrome.',
      'Web scraping con Python y BeautifulSoup para extraer datos automáticamente.',
    ],
    technologies: ['JavaScript', 'Python', 'BeautifulSoup', 'OpenAI API'],
  },
];

export const education: Education[] = [
  {
    id: 'uoc',
    title: 'Grado en Ingeniería Informática',
    institution: 'Universitat Oberta de Catalunya',
    period: '2025 — Actualidad',
    location: 'UOC · Online',
    ongoing: true,
    href: 'https://www.uoc.edu/es/estudios/grados/grado-ingenieria-informatica',
  },
  {
    id: 'ceu',
    title: 'Máster en Ciberseguridad',
    institution: 'Universidad CEU San Pablo',
    period: '2023 — 2024',
    location: 'Sevilla, España',
    ongoing: false,
    href: 'https://www.ceuandalucia.es/master-reglado-fp/curso-de-especializacion-en-ciberseguridad-entornos-las-tecnologias-la-informacion/',
  },
  {
    id: 'dam',
    title: 'Desarrollo de Aplicaciones Multiplataforma',
    institution: 'Salesianos de San Pedro',
    period: '2021 — 2023',
    location: 'Sevilla, España',
    ongoing: false,
    href: 'https://triana.salesianos.edu/colegio/cfgs-desarrollo-de-aplicaciones-multiplataforma/',
  },
];

export const technologyGroups: TechnologyGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces con estructura, rendimiento y atención al detalle.',
    technologies: ['Angular 17+', 'TypeScript', 'JavaScript ES6+', 'RxJS', 'Angular Material', 'HTML5', 'SCSS / CSS3', 'Arquitectura modular', 'Guards & Interceptors'],
  },
  {
    id: 'backend',
    title: 'Backend & datos',
    description: 'Una visión completa de los servicios y los datos que sostienen el producto.',
    technologies: ['Java 8+', 'Spring Boot', 'Node.js', 'NestJS', 'APIs REST', 'PostgreSQL', 'Oracle', 'Diseño de bases de datos'],
  },
  {
    id: 'delivery',
    title: 'Calidad & despliegue',
    description: 'De un código mantenible a entregas fiables.',
    technologies: ['Git', 'GitHub', 'Docker', 'Microsoft Azure', 'CI/CD', 'Testing unitario', 'Testing e2e'],
  },
];

export const projects: Project[] = [
  {
    id: 'topclubs',
    title: 'TopClubs',
    category: 'Proyecto propio · Full-stack',
    summary: 'Reservar campo y completar el partido, desde el móvil.',
    description: 'Plataforma para reservar campos de fútbol y organizar partidos: disponibilidad y precios por formato, partidos abiertos para completar plazas, equipos y pagos compartidos con Stripe. Diseño y desarrollo integral con Angular, NestJS y PostgreSQL, desplegado con Docker en Microsoft Azure.',
    technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Docker', 'Azure'],
    period: '2026 — Actualidad',
    experienceId: 'topclubs',
    imageAlt: 'Ilustración de la app de TopClubs: reserva de un campo de fútbol 7 desde el móvil, un partido abierto con plazas libres y una reserva confirmada.',
    href: 'https://topclubs.es/',
    linkLabel: 'Visitar TopClubs',
  },
  {
    id: 'redeia',
    title: 'REDEIA',
    category: 'Ayesa · Sistema eléctrico',
    summary: 'Aplicaciones críticas para la red eléctrica española.',
    description: 'Mantenimiento y evolución de aplicaciones críticas para REDEIA, el grupo de Red Eléctrica, operador del sistema eléctrico español que equilibra en tiempo real la generación y la demanda. Desarrollo full-stack con Java 8 y tecnologías legacy, y optimización de consultas sobre bases de datos Oracle en producción.',
    technologies: ['Java 8', 'Oracle', 'SQL'],
    period: '2025 — 2026',
    experienceId: 'ayesa',
    imageAlt: 'Ilustración de un panel de operación del sistema eléctrico con la curva de demanda del día y una consulta SQL optimizada.',
    href: 'https://www.redeia.com/es',
    linkLabel: 'Conocer REDEIA',
  },
  {
    id: 'enaire',
    title: 'ENAIRE',
    category: 'Babel · Navegación aérea',
    summary: 'Arquitectura Angular para aplicaciones críticas.',
    description: 'Frontend Angular 17+ para aplicaciones de navegación aérea, con módulos reutilizables, optimización de rendimiento y pruebas automatizadas. Determinadas tareas pasaron de unos 30 minutos a pocos minutos.',
    technologies: ['Angular 17+', 'TypeScript', 'Testing e2e', 'CI/CD'],
    period: '2023 — 2025',
    experienceId: 'babel',
    imageAlt: 'Ilustración de una aplicación de navegación aérea con sectores del espacio aéreo, aeronaves en ruta y un panel de rendimiento.',
    href: 'https://www.enaire.es/home',
    linkLabel: 'Conocer ENAIRE',
  },
  {
    id: 'sharing',
    title: 'Sharing Group',
    category: 'Startup · Marketplace',
    summary: 'Tecnología para una comunidad más circular.',
    description: 'Marketplace sostenible para que estudiantes de universidades de Estados Unidos vendan o alquilen entre compañeros lo que ya no usan. La app principal se construyó con low-code; la plataforma de administración, en Angular, con estructura, estándares y APIs definidos junto al equipo de backend.',
    technologies: ['Angular', 'TypeScript', 'Spring Boot', 'APIs REST'],
    period: '2023 — 2024',
    experienceId: 'sharing-group',
    imageAlt: 'Ilustración del panel de administración de Sharing con anuncios de venta y alquiler entre estudiantes, junto a la app móvil del marketplace.',
    href: 'https://www.linkedin.com/company/sharing-llc/about/',
    linkLabel: 'Conocer Sharing Group',
  },
  {
    id: 'elephant',
    title: 'Elephant Hive',
    category: 'Dublín · Inteligencia artificial',
    summary: 'Aprender más y olvidar menos, con IA.',
    description: 'Extensión de Google Chrome para Elephant Hive, plataforma de aprendizaje de Dublín que crea resúmenes breves con IA para recordar lo estudiado. Extrae el contenido de la página con Python y BeautifulSoup y genera el resumen con la API de OpenAI.',
    technologies: ['JavaScript', 'Python', 'BeautifulSoup', 'OpenAI API'],
    period: '2023',
    experienceId: 'elephant-hive',
    imageAlt: 'Ilustración de la extensión de Chrome de Elephant Hive resumiendo una página de apuntes en tres ideas breves.',
    href: 'https://www.theelephanthive.com/',
    linkLabel: 'Conocer Elephant Hive',
  },
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'B2 · Conversación profesional' },
] satisfies { name: string; level: string }[];
