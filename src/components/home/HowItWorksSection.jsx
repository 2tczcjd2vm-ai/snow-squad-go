import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, CalendarCheck, Plane, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Vyplňte přihlášku',
    description: 'Vyplňte jednoduchý online formulář s informacemi o vašem dítěti a vyberte vhodný termín soustředění.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Potvrdíme rezervaci',
    description: 'Do 48 hodin vás kontaktujeme, potvrdíme místo a zašleme vám všechny potřebné informace a dokumenty.',
  },
  {
    icon: Plane,
    step: '03',
    title: 'Odletíme na hory',
    description: 'V den odjezdu se setkáme na domluvené adrese. O vše ostatní — dopravu, ubytování, stravu i vybavení — se postaráme my.',
  },
  {
    icon: Star,
    step: '04',
    title: 'Zážitky na celý život',
    description: 'Vaše dítě se vrátí s novými dovednostmi, kamarády a vzpomínkami, které mu zůstanou navždy.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-muted/30" id="jak-to-funguje">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Jak to funguje</span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-4">
            Přihlášení je jednoduché
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Celý proces od přihlášky po návrat z hor jsme zjednodušili na minimum kroků.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%_-_12px)] w-full h-px bg-border z-0" />
              )}
              <div className="bg-card rounded-2xl p-6 border border-border/50 relative z-10 h-full hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-heading font-bold text-3xl text-primary/10">{step.step}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 h-12">
              Přihlásit dítě nyní
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}