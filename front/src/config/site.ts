export type SiteConfig = typeof siteConfig;

export const siteConfig = {

  navItems: [
    {
      label: "Кассы",
      href: "/cash-register",
    },
    {
      label: "Расходы",
      href: "/expenses",
    },
  ],
};

export const siteConfigAuth = {

  navItems: [
    {
      label: "Войти",
      href: "/",
    },
  ],
};
