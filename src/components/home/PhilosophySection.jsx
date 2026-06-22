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
                src={`${BASE}/camp-hintertux2.jpg`}
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
              Naším hlavním cílem je poskytnout dětem fantastický a smysluplně strávený čas. Mnoho sportovních týmů a klubů se soustředí čistě na výkon a výsledky — často doprovázené nezdravou motivací ze strany rodičů.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              My bychom rádi naopak v dětech vzbudili jejich vlastní motivaci, ukázali jim možnosti i jejich talent. Pokud se budou chtít vydat cestou závodů a profesionálního snowboardingu, uděláme pro ně maximum.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pokud bude snowboarding sloužit jako prostředek k seberealizaci, zábavě, socializaci a poznávání sebe sama — bez ohledu na závodní výsledky — budeme tu pro ně taky.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
