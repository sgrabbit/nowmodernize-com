import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

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
              ServiceNow modernization for mid-tier B2B SaaS—stable now, AI-ready next.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-primary-foreground">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="/services#modernization" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  ServiceNow Modernization
                </a>
              </li>
              <li>
                <a href="/services#upgrade-factory" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Upgrade Factory
                </a>
              </li>
              <li>
                <a href="/services#ams" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  AMS
                </a>
              </li>
              <li>
                <a href="/services#ai-automation" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  AI & Automation Readiness
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-primary-foreground">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-sm mb-4 text-primary-foreground">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Now Modernize Technology Pvt Ltd. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60">
            hello@nowmodernize.com
          </p>
        </div>
      </div>
    </footer>
  );
}
