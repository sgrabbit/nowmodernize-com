import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function ThankYou() {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background min-h-[70vh] flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              You're all set.
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Pick a time for your 30-min Health Check Intro below.
            </p>

            {/* Google Calendar Appointment Scheduling Embed */}
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
              <iframe 
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0YdsuOedFmOzfLj1BN93zKVI4IEbrHWuXPOmO0YD-2467o5nmiGCuk-qdvIXBmxKm93Kiw-v7r?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule a 30-min Health Check Intro with NowModernize"
                className="w-full"
              />
              <p className="text-xs text-muted-foreground p-4 text-center border-t border-border/50">
                Schedule a 30-min Health Check Intro with NowModernize
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-8">
              We'll reach out via email within 2 business day to confirm next steps.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
