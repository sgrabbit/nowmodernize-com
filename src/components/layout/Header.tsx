import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const navLinks = [
  { href: "/services", label: "Services" },
  {
    label: "Resources",
    children: [
      { href: "/knowledge-base", label: "Knowledge Base" },
      { href: "/case-studies", label: "Case Studies" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type NavLink = (typeof navLinks)[number];

function isDropdown(link: NavLink): link is NavLink & { children: { href: string; label: string }[] } {
  return "children" in link && Array.isArray(link.children);
}

function DesktopDropdown({ link, pathname }: { link: NavLink & { children: { href: string; label: string }[] }; pathname: string }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = link.children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"));

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={`flex items-center gap-1 text-lg font-medium transition-colors duration-200 ${
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {link.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-lg border border-border/50 bg-background/95 backdrop-blur-md shadow-lg py-2"
          >
            {link.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  pathname === child.href || pathname.startsWith(child.href + "/")
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {child.label}
              </Link>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="NowModernize" className="h-8 md:h-10 w-auto" />
          <span className="font-heading font-bold text-lg md:text-xl text-foreground">
            NowModernize
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            isDropdown(link) ? (
              <DesktopDropdown
                key={link.label}
                link={link}
                pathname={location.pathname}
              />
            ) : (
              <Link
                key={link.href}
                to={link.href!}
                className={`text-lg font-medium transition-colors duration-200 ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:block">
          <Button variant="nav-cta" size="sm" asChild>
            <Link to="/contact">Get a Free Health Check</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) =>
                isDropdown(link) ? (
                  <div key={link.label}>
                    <button
                      onClick={() => setMobileResourcesOpen((prev) => !prev)}
                      className={`flex items-center justify-between w-full text-base font-medium py-2 ${
                        link.children.some((c) => location.pathname === c.href)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileResourcesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileResourcesOpen && (
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 flex flex-col gap-1 overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileResourcesOpen(false);
                              }}
                              className={`text-sm font-medium py-2 ${
                                location.pathname === child.href
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href!}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium py-2 ${
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Button variant="default" className="mt-2" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get a Free Health Check
                </Link>
              </Button>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
