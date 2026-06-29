import React from 'react';
import { Link } from 'react-router-dom';
import { Snowflake, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg">Český Freestyle Klub</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Mládežnický snowboardový klub pro pražské děti ve věku 10–15 let. 
              Jezdíme na soustředění do zahraničí od podzimu do jara.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/freestyleklub_prague"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-background/90">Navigace</h4>
            <div className="space-y-2.5">
              <Link to="/" className="block text-sm text-background/60 hover:text-background transition-colors">Domů</Link>
              <Link to="/camps" className="block text-sm text-background/60 hover:text-background transition-colors">Soustředění</Link>
              <Link to="/team" className="block text-sm text-background/60 hover:text-background transition-colors">Náš tým</Link>
              <Link to="/faq" className="block text-sm text-background/60 hover:text-background transition-colors">FAQ</Link>
              <Link to="/contact" className="block text-sm text-background/60 hover:text-background transition-colors">Kontakt</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-background/90">Kontakt</h4>
            <div className="space-y-3">
              <a href="mailto:tomas.tuzar@seznam.cz" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                tomas.tuzar@seznam.cz
              </a>
              <a href="tel:+420737778316" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +420 737 778 316
              </a>
              <div className="flex items-center gap-2 text-sm text-background/60">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Praha, Česká republika
              </div>
              <a href="https://instagram.com/freestyleklub_prague" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
                <Instagram className="w-4 h-4 flex-shrink-0" />
                @freestyleklub_prague
              </a>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-background/90">Zájem o klub?</h4>
            <p className="text-sm text-background/60 mb-4 leading-relaxed">
              Přihlaste své dítě ještě dnes. Místa na soustředění jsou omezená.
            </p>
            <Link to="/contact">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Přihlásit dítě
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} Český Freestyle Klub Praha. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">Ochrana osobních údajů</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">Podmínky použití</a>
          </div>
        </div>
      </div>
    </footer>
  );
}