import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '30+', label: 'Spokojených jezdců' },
  { value: '6+', label: 'Soustředění ročně' },
  { value: '15', label: 'Let zkušeností' },
  { value: '8', label: 'Destinací v Evropě' },
];

export default function StatsSection() {
  return (
    <section className="py-8" style={{ backgroundColor: '#1565C0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-heading font-bold text-4xl sm:text-5xl text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/70 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}