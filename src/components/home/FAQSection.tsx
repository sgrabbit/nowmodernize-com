import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSectionTheme } from "@/lib/section-theme";

const faqs = [
  {
    question: "Do you do new implementations or migrations?",
    answer: "No — we focus on modernizing existing ServiceNow instances (stability, upgrades, debt reduction, AI readiness).",
  },
  {
    question: "How do you start and how long does it take to see impact?",
    answer: "We start with a 30-min consult, then a 7–10 day scorecard + roadmap. Stabilization improvements typically begin in the first few weeks.",
  },
  {
    question: "Will you touch production / how do you manage risk?",
    answer: "We use a stability-first approach: impact analysis, staged rollouts, and governance guardrails before changes hit production.",
  },
  {
    question: "What access do you need for the health check?",
    answer: "Read-only access to key areas plus stakeholder interviews; deeper access only if you move into execution.",
  },
  {
    question: "What ServiceNow areas do you cover?",
    answer: "Modernization of platform foundations and workflows across IT / Employee / Customer ops, plus upgrades, AMS, and AI automation readiness.",
  },
];

export function FAQSection() {
  const theme = getSectionTheme("faq");
  
  return (
    <section className={`${theme.padding} ${theme.background}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            Questions CIOs Ask Before They Reach Out
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:shadow-card"
              >
                <AccordionTrigger className={`${theme.cardTitle} text-left font-heading font-semibold text-foreground hover:text-primary py-5`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className={`${theme.cardDescription} text-muted-foreground pb-5`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
