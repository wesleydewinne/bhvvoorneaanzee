import { motion } from "framer-motion";

/**
 * Reusable animated section component
 */
export default function MotionSection({
                                          title,
                                          icon: Icon,
                                          children,
                                          highlight = false
                                      }) {
    return (
        <motion.section
            className={`overons-section ${highlight ? "overons-highlight" : ""}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {(title || Icon) && (
                <div className="section-title">
                    {Icon && <Icon size={28} />}
                    {title && <h2>{title}</h2>}
                </div>
            )}

            {children}
        </motion.section>
    );
}
