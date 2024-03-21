"use client";

import clsx from "clsx";
import { Menu, XSquare } from "lucide-react";
import { useState } from "react";
import React, { createContext, useContext } from "react";

type NavigationContextValue = {
  setShowNav: (showNav: boolean) => void;
};
const NavigationContext = createContext<NavigationContextValue>({
  setShowNav: () => {},
});

export const useNavigationContext = () => useContext(NavigationContext);

export const MobileNav = ({ children }: { children: React.ReactNode }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="flex flex-row justify-end bg-dark-gray">
      <div
        onClick={() => setShowNav(true)}
        className="p-8 cursor-pointer flex flex-row items-center"
      >
        <span className="text-xs pr-2">MENU</span> <Menu size={32} />
      </div>

      <div
        className={clsx("absolute top-0 left-0 w-full h-screen z-50", {
          hidden: !showNav,
        })}
      >
        <div
          className="absolute top-0 right-0 p-8 cursor-pointer"
          onClick={() => setShowNav(false)}
        >
          <XSquare size={32} />
        </div>
        <NavigationContext.Provider value={{ setShowNav }}>
          {children}
        </NavigationContext.Provider>
      </div>
    </div>
  );
};
