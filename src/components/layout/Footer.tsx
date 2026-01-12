import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

const SERVICES_LINKS = [
  { href: "/services#modernization", label: "ServiceNow Modernization" },
  { href: "/services#posture-management", label: "Upgrade Posture Management" },
  { href: "/services#ams", label: "Application Management (AMS)" },
  { href: "/services#ai-automation", label: "AI & Automation Readiness" },
] as const;

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
] as const;

const FOOTER_SECTIONS = [
  {
    title: "Services",
    links: SERVICES_LINKS,
    type: "anchor" as const,
  },
  {
    title: "Company",
    links: COMPANY_LINKS,
    type: "router" as const,
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground/90">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="NowModernize" className="h-8 w-auto brightness-0 invert" />
              <span className="font-heading font-bold text-lg text-primary-foreground">
                NowModernize
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Stability now. Upgrade safety always. AI readiness next.
            </p>
          </div>

          {/* Dynamic Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-primary-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={'href' in link ? link.href : link.to}>
                    {section.type === "anchor" && 'href' in link ? (
                      <a
                        href={link.href}
                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : 'to' in link ? (
                      <Link
                        to={link.to}
                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Now Modernize Technology Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            {LEGAL_LINKS.map((link, index) => (
              <>
                <Link
                  key={link.to}
                  to={link.to}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
                {index < LEGAL_LINKS.length - 1 && (
                  <span className="text-primary-foreground/40">|</span>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
