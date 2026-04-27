type Experience = {
  date: string;
  title: string;
  description: string;
  outcome?: string;
  actual: boolean;
};

export const EXPERIENCES_ES: Experience[] = [
  {
    date: "Octubre 2024",
    title: "Yuno - Sr Frontend Developer",
    description:
      "Construyo el módulo de conciliación como microfrontend (single-spa) dentro del dashboard. Stack: React, TypeScript y Material UI en frontend; Kotlin en backend. Foco en escalar el módulo sin acoplarlo al monolito y reducir el tiempo de entrega de cada release.",
    actual: true,
  },
  {
    date: "Agosto 2021 - Septiembre 2024",
    title: "Conekta - Sr Frontend Developer",
    description:
      "Mantuve y evolucioné el backoffice durante tres años: nuevas funcionalidades, mejoras de UX y de DX. Stack: React, TypeScript, Material UI y Chakra UI en frontend; Go y Node.js en backend.",
    actual: false,
  },
  {
    date: "Marzo 2021 - Agosto 2021",
    title: "Mercado Libre - Software Development SSr Analyst",
    description:
      "Migré la aplicación de seguros desde la plataforma anterior a TypeScript y React, en colaboración con equipos de producto, diseño y backend.",
    actual: false,
  },
  {
    date: "Octubre 2018 - Marzo 2021",
    title: "Bancolombia - Ingeniero de software",
    description:
      "Lideré la automatización de pruebas web, móvil y de servicios con Selenium, Appium, Rest Assured, Screenplay y Cucumber. También trabajé en procesos batch en Java/AS400 y definí la estrategia de pruebas para varios equipos.",
    actual: false,
  },
  {
    date: "Noviembre 2017 - Septiembre 2018",
    title: "Accenture - Analista",
    description:
      "Automaticé pruebas web, móvil y de servicios con Selenium, Appium, Rest Assured, Screenplay y Cucumber para clientes de la práctica de testing.",
    actual: false,
  },
  {
    date: "Agosto 2016 - Noviembre 2017",
    title: "Tenebit - Desarrollador de Frontend",
    description:
      "Construí aplicaciones web con Ionic y AngularJS para administrar y personalizar la experiencia de clientes dentro de un CRM.",
    actual: false,
  },
];

export const EXPERIENCES_EN: Experience[] = [
  {
    date: "October 2024",
    title: "Yuno - Sr Frontend Developer",
    description:
      "I build the reconciliation module as a microfrontend (single-spa) inside the dashboard. Stack: React, TypeScript, and Material UI on the frontend; Kotlin on the backend. Focus on scaling the module without coupling it to the monolith and shortening release cycles.",
    actual: true,
  },
  {
    date: "August 2021 - September 2024",
    title: "Conekta - Sr Frontend Developer",
    description:
      "I maintained and evolved the back-office over three years: new features, UX improvements, DX improvements. Stack: React, TypeScript, Material UI and Chakra UI on the frontend; Go and Node.js on the backend.",
    actual: false,
  },
  {
    date: "March 2021 - August 2021",
    title: "Mercado Libre - Software Development SSr Analyst",
    description:
      "I migrated the insurance application from the legacy platform to TypeScript and React, working with product, design, and backend teams.",
    actual: false,
  },
  {
    date: "October 2018 - March 2021",
    title: "Bancolombia - Software Engineer",
    description:
      "I led web, mobile, and service test automation with Selenium, Appium, Rest Assured, Screenplay, and Cucumber. I also worked on batch processes in Java/AS400 and defined the testing strategy for several teams.",
    actual: false,
  },
  {
    date: "November 2017 - September 2018",
    title: "Accenture - Analyst",
    description:
      "I automated web, mobile, and service tests with Selenium, Appium, Rest Assured, Screenplay, and Cucumber for clients of the testing practice.",
    actual: false,
  },
  {
    date: "August 2016 - November 2017",
    title: "Tenebit - Frontend Developer",
    description:
      "I built web applications with Ionic and AngularJS to manage and customize the customer experience inside a CRM.",
    actual: false,
  },
];

export const EXPERIENCES = {
  en: [...EXPERIENCES_EN],
  es: [...EXPERIENCES_ES],
};
