"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  delay?: number;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  delay = 0,
  innerClassName = "py-16 md:py-24",
}: SectionWrapperProps & { innerClassName?: string }) {
  return (
    <section id={id} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        className={`${innerClassName} px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto`}
      >
        {children}
      </motion.div>
    </section>
  );
}
