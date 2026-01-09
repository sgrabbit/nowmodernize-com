import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground mb-6">
                <strong>Company:</strong> Now Modernize Technology Pvt Ltd ("NowModernize", "we", "us")<br />
                <strong>Website:</strong> nowmodernize.com<br />
                <strong>Contact:</strong> legal@nowmodernize.com
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">1) Scope</h2>
              <p className="text-muted-foreground mb-6">
                This Privacy Policy explains how we collect, use, disclose, and protect information when you visit our website, request a free health check, access resources, or book time with us.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">2) Information we collect</h2>
              <p className="text-muted-foreground mb-4"><strong>A) Information you provide</strong></p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Contact / inquiry information: name, work email, company, and message (via contact forms).</li>
                <li>Resource access: email submitted to access gated resources.</li>
                <li>Scheduling: information you submit when booking a meeting through our embedded scheduling/booking experience.</li>
              </ul>
              <p className="text-muted-foreground mb-4"><strong>B) Information collected automatically</strong></p>
              <p className="text-muted-foreground mb-6">
                We may automatically collect: device and browser information, pages viewed, clicks, referring/exit pages, approximate location (derived from IP), cookies or similar technologies (see Cookies section).
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">3) How we use information</h2>
              <p className="text-muted-foreground mb-6">
                We use your information to: respond to inquiries and provide requested information, deliver gated resources (including emailing the resource to you), schedule meetings and communicate about those meetings, operate, secure, and improve our website, analyze website usage and performance, comply with legal obligations and enforce our terms.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">4) How we share information</h2>
              <p className="text-muted-foreground mb-6">
                We may share information with: service providers who help run the website, forms, email delivery, analytics, and scheduling (for example, Google services used for booking embeds and email tools), professional advisors (legal/accounting) as needed, law enforcement / regulators if required by law. We do not sell your personal information.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">5) Cookies and analytics</h2>
              <p className="text-muted-foreground mb-6">
                We may use cookies and similar technologies for website functionality, performance, and analytics. You can control cookies via your browser settings.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">6) Scheduling and embedded booking</h2>
              <p className="text-muted-foreground mb-6">
                We may provide an embedded booking experience (e.g., Google Calendar booking/appointment pages). Information you submit there is used to schedule the meeting and communicate with you about it.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">7) Data retention</h2>
              <p className="text-muted-foreground mb-6">
                We retain personal information only as long as necessary for the purposes described above, including to respond to your requests, deliver resources, meet operational needs, and comply with legal/security obligations.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">8) Security</h2>
              <p className="text-muted-foreground mb-6">
                We use reasonable safeguards designed to protect information. No method of transmission or storage is 100% secure.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">9) Your rights</h2>
              <p className="text-muted-foreground mb-6">
                Depending on your location, you may have rights to access, correct, or delete personal information, and object to or restrict certain processing. To make a request, email legal@nowmodernize.com.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">10) International data transfers</h2>
              <p className="text-muted-foreground mb-6">
                Your information may be processed in countries other than where you live, depending on the location of our service providers.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">11) Children's privacy</h2>
              <p className="text-muted-foreground mb-6">
                Our website is not intended for children, and we do not knowingly collect information from children.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">12) Changes to this policy</h2>
              <p className="text-muted-foreground mb-6">
                We may update this Privacy Policy from time to time. We'll revise the "Last updated" date above.
              </p>

              <h2 className="font-heading text-xl font-semibold text-foreground mt-8 mb-4">13) Contact us</h2>
              <p className="text-muted-foreground">
                For privacy questions or requests, email: legal@nowmodernize.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
