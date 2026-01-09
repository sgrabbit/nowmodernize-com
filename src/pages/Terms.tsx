import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Terms of Use
            </h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Website:</strong> nowmodernize.com<br />
                <strong>Company:</strong> Now Modernize Technology Pvt Ltd ("we", "us")
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">1) Acceptance of terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing or using this website, you agree to these Terms of Use. If you do not agree, do not use the website.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">2) Website purpose</h2>
              <p className="text-muted-foreground mb-6">
                This website provides information about our services and allows you to request resources, request a free health check, and schedule time with us.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">3) No professional advice</h2>
              <p className="text-muted-foreground mb-6">
                Content on this website is for general information only and is not legal, financial, or professional advice.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">4) Intellectual property</h2>
              <p className="text-muted-foreground mb-6">
                All content on this website (text, design, graphics, logos, downloads, and materials) is owned by Now Modernize Technology Pvt Ltd or its licensors and protected by applicable IP laws. You may not copy, modify, distribute, or create derivative works without written permission, except for personal/internal business evaluation.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">5) Permitted use</h2>
              <p className="text-muted-foreground mb-6">
                You may use the website for lawful purposes and to evaluate NowModernize services for your organization.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">6) Prohibited conduct</h2>
              <p className="text-muted-foreground mb-6">
                You agree not to: submit false information or misuse forms, interfere with site security or functionality, scrape/crawl the site in a way that disrupts service, attempt unauthorized access to any systems, upload malicious code or harmful content.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">7) Resources and downloads</h2>
              <p className="text-muted-foreground mb-6">
                Resources are provided "as is" for informational purposes. We may change, remove, or restrict access to resources at any time.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">8) Scheduling</h2>
              <p className="text-muted-foreground mb-6">
                If you schedule a meeting through our site (including embedded booking), you agree to provide accurate information and to use the scheduling tools responsibly. Booking availability and meeting types may change.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">9) Third-party links and tools</h2>
              <p className="text-muted-foreground mb-6">
                The website may include links or embeds from third-party services. We are not responsible for third-party sites or services.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">10) Disclaimers</h2>
              <p className="text-muted-foreground mb-6">
                The website and content are provided "as is" and "as available." To the maximum extent permitted by law, we disclaim warranties of any kind, including merchantability, fitness for a particular purpose, and non-infringement.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">11) Limitation of liability</h2>
              <p className="text-muted-foreground mb-6">
                To the maximum extent permitted by law, Now Modernize Technology Pvt Ltd will not be liable for indirect, incidental, special, consequential, or punitive damages, or any loss of profits/data, arising from your use of (or inability to use) the website.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">12) Indemnity</h2>
              <p className="text-muted-foreground mb-6">
                You agree to indemnify and hold harmless Now Modernize Technology Pvt Ltd from claims arising out of your misuse of the website or violation of these Terms.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">13) Changes</h2>
              <p className="text-muted-foreground mb-6">
                We may update these Terms at any time by posting an updated version on this page and changing the "Last updated" date.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">14) Governing law and jurisdiction</h2>
              <p className="text-muted-foreground mb-6">
                These Terms are governed by the laws of India. Courts at New Delhi will have exclusive jurisdiction.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">15) Contact</h2>
              <p className="text-muted-foreground">
                Questions about these Terms: legal@nowmodernize.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
