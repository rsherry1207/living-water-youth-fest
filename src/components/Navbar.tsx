import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Schedule", href: "#schedule" },
  { label: "Register & Help", href: "#registration" },
  { label: "Why Attend", href: "#about" },
  { label: "Speakers", href: "#speakers" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ocean-dark/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-16">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sand-light hover:text-white transition-colors font-display text-sm tracking-wide"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sand-light hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-ocean-dark/95 border-t border-ocean/30">
            <ul className="py-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block px-4 py-2 text-sand-light hover:text-white hover:bg-ocean/30 transition-colors font-display text-sm tracking-wide"
                  >
                    {item.label}
                  </a>
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
