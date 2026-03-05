import { m, type HTMLMotionProps } from "framer-motion";
import { themeConfig } from "@/lib/section-theme";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  trigger?: "inView" | "mount";
};

export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  trigger = "inView",
  ...props
}: RevealProps) {
  if (!themeConfig.enableAnimations) {
    const { style, className, id } = props as Record<string, unknown>;
    return (
      <div style={style as React.CSSProperties} className={className as string} id={id as string}>
        {children}
      </div>
    );
  }

  const initial = { opacity: 0, y: 16 };
  const visible = { opacity: 1, y: 0 };
  const transition = { duration, ease: "easeOut" as const, delay };

  if (trigger === "mount") {
    return (
      <m.div initial={initial} animate={visible} transition={transition} {...props}>
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      {...props}
    >
      {children}
    </m.div>
  );
}
