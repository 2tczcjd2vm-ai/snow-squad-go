import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-6">
            Připraveni na největší<br />dobrodružství sezóny?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
            Zbývají poslední volná místa na soustředění sezóny 2025/2026. 
            Zarezervujte svému dítěti místo ještě dnes a dejte mu zážitek na celý život.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/camps">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-10 h-13 shadow-xl shadow-accent/20">
                Zobrazit volné termíny
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+420123456789">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8 h-12">
                <Phone className="w-4 h-4 mr-2" />
                Zavolejte nám
              </Button>
            </a>
          </div>
          <p className="text-primary-foreground/50 text-sm">
            Nebo nás kontaktujte na <a href="mailto:info@snowriders.cz" className="text-primary-foreground/80 hover:text-primary-foreground underline transition-colors">info@snowriders.cz</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}