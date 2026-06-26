import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Star, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://velzztwnhpchyojopzkv.supabase.co/storage/v1/object/public/images/hero.jpg"
          alt="Profesionální freestyle snowboardista"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-accent/25 backdrop-blur-sm border border-accent/40 rounded-full px-4 py-1.5 mb-6"
          >
            <Mountain className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">Sezóna 2025/2026 — registrace otevřeny</span>
          </motion.div>

          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Freestyle snowboardový klub
            <span className="block text-accent">pro mladé talenty</span>
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
            Přidej se k naší partě! Soustředění v zahraničí, skvělí trenéři a nezapomenutelné 
            zážitky pro děti ve věku 10–15 let. Od podzimu do jara.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/camps">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 h-12 shadow-lg shadow-accent/25">
                Zobrazit soustředění
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/15 font-semibold text-base px-8 h-12 backdrop-blur-sm">
                Přihlásit dítě
              </Button>
            </Link>
          </div>

        </motion.div>
      </div>


      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
}