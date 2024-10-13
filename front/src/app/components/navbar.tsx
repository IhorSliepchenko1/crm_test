import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@nextui-org/react";
import { useAuth } from "@/context/context";

export const Navbar = () => {
  const token = useAuth();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {!token ? (
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <div className="flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>
      ) : null}

      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />
        {!token && (
          <Button color="danger">
            Выйти
          </Button>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
