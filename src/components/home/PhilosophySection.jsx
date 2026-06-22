import React from 'react';
import { motion } from 'framer-motion';

const BASE = 'https://velzztwnhpchyojopzkv.supabase.co/storage/v1/object/public/images';

export default function PhilosophySection() {
  return (
    <section className="py-24 bg-muted/30" id="filosofie">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={`${BASE}/gallery-6.jpg`}
                alt="Filosofie týmu"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Filosofie</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-6">
              Filosofie týmu
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Zde doplňte text filosofie týmu.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
