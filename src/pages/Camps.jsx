import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Snowflake, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CampCard from '../components/camps/CampCard';
import ReservationDialog from '../components/camps/ReservationDialog';

const FILTERS = [
  { label: 'Všechny', value: 'all' },
  { label: 'Dostupné', value: 'upcoming' },
  { label: 'Obsazené', value: 'full' },
];

export default function Camps() {
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [filter, setFilter] = useState('all');

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['camps'],
    queryFn: () => base44.entities.Camp.list('start_date', 20),
    initialData: [],
  });

  const filtered = camps.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'full') return c.status === 'full' || (c.capacity - (c.spots_taken || 0)) <= 0;
    if (filter === 'upcoming') return c.status === 'upcoming' && (c.capacity - (c.spots_taken || 0)) > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <section className="pt-16 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Sezóna 2025/2026</span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mt-3 mb-4">
              Snowboardová soustředění
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
              Vyberte si z nadcházejících soustředění v Rakousku, Itálii, Francii i jinde.
              Intenzivní výuka, skvělá parta a nezapomenutelné hory.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === f.value
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info banner */}
      <section className="bg-accent/5 border-b border-accent/20 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent" />
              <span>Soustředění probíhají říjen–duben</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Destinace: Rakousko, Itálie, Francie, Švýcarsko</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Snowflake className="w-4 h-4 text-accent" />
              <span>Věk 10–15 let, max 15 dětí na skupinu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Camp list */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Snowflake className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Snowflake className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Žádná soustředění v této kategorii</h3>
              <p className="text-muted-foreground mb-4">Zkuste jiný filtr nebo se podívejte na všechny termíny.</p>
              <Button variant="outline" onClick={() => setFilter('all')}>Zobrazit vše</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((camp, index) => (
                <CampCard
                  key={camp.id}
                  camp={camp}
                  index={index}
                  onReserve={(c) => setSelectedCamp(c)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-12 bg-muted/40 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-heading font-semibold text-xl mb-3">Máte otázky?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Odpovědi na nejčastější dotazy najdete v sekci FAQ nebo nás neváhejte kontaktovat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <a href="/faq">Přečíst FAQ</a>
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" asChild>
              <a href="/contact">Napsat nám</a>
            </Button>
          </div>
        </div>
      </section>

      <ReservationDialog
        camp={selectedCamp}
        open={!!selectedCamp}
        onClose={() => setSelectedCamp(null)}
      />
    </div>
  );
}