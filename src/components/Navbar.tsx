import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Schedule", href: "/schedule" },
  {
    label: "Registration & Help",
    submenu: [
      { label: "Info & Help", href: "/register/info" },
      { label: "Register", href: "/register" },
    ],
  },
  {
    label: "About SRYFC",
    submenu: [
      { label: "About Conference", href: "/about/conference" },
      { label: "Meet the Board", href: "/about/board" },
      { label: "About Merch", href: "/about/merch" },
    ],
  },
  { label: "Speakers", href: "/speakers" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ocean-dark/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Home Icon - Left */}
          <Link
            to="/"
            className="text-sand-light hover:text-white transition-colors"
            aria-label="Home"
          >
            <Home size={20} />
          </Link>

          {/* Desktop Navigation - Right */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sand-light hover:text-white transition-colors font-display text-xs tracking-wide outline-none">
                      {item.label}
                      <ChevronDown size={14} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-ocean-dark border-ocean/30 min-w-[160px]"
                    >
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <Link
                            to={subItem.href}
                            className="text-sand-light hover:text-white hover:bg-ocean/30 font-display text-xs tracking-wide cursor-pointer px-3 py-1.5"
                          >
                            {subItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center text-sand-light hover:text-white transition-colors font-display text-xs tracking-wide"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sand-light hover:text-white p-1.5"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-ocean-dark/95 border-t border-ocean/30">
            <ul className="py-2 space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                        className="flex items-center justify-between w-full px-4 py-1.5 text-sand-light hover:text-white hover:bg-ocean/30 transition-colors font-display text-xs tracking-wide"
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${mobileSubmenuOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileSubmenuOpen && (
                        <ul className="pl-4 space-y-1">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.label}>
                              <Link
                                to={subItem.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-1.5 text-sand-light/80 hover:text-white hover:bg-ocean/30 transition-colors font-display text-xs tracking-wide"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-1.5 text-sand-light hover:text-white hover:bg-ocean/30 transition-colors font-display text-xs tracking-wide"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
