import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Calendar, Users, ArrowRight, Snowflake } from 'lucide-react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import ReservationDialog from '../camps/ReservationDialog';

export default function UpcomingCampsPreview() {
  const [selectedCamp, setSelectedCamp] = useState(null);

  const { data: camps = [] } = useQuery({
    queryKey: ['camps-preview'],
    queryFn: async () => {
      const { data } = await supabase.from('camps').select('*').eq('status', 'upcoming').order('start_date').limit(3);
      return data || [];
    },
    initialData: [],
  });

  if (camps.length === 0) return null;

  return (
    <section className="py-24 bg-background" id="soustreden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Termíny</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3">
              Nadcházející soustředění
            </h2>
          </div>
          <Link to="/camps">
            <Button variant="outline" className="font-semibold shrink-0">
              Všechny termíny
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {camps.map((camp, index) => {
            const spotsLeft = camp.capacity - (camp.spots_taken || 0);
            const isFull = spotsLeft <= 0;
            return (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/50 overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img
                    src={camp.image_url || 'https://velzztwnhpchyojopzkv.supabase.co/storage/v1/object/public/images/gallery-7.jpg'}
                    alt={camp.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {!isFull && (
                    <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {spotsLeft} volných míst
                    </div>
                  )}
                  {isFull && (
                    <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full">
                      Obsazeno
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-bold text-lg mb-3">{camp.title}</h3>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{camp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>{format(new Date(camp.start_date), 'd. M.', { locale: cs })} – {format(new Date(camp.end_date), 'd. M. yyyy', { locale: cs })}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="font-heading font-bold text-xl text-primary">
                      {camp.price?.toLocaleString('cs-CZ')} Kč
                    </span>
                    <Button
                      size="sm"
                      onClick={() => setSelectedCamp(camp)}
                      disabled={isFull}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                    >
                      Rezervovat
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ReservationDialog
        camp={selectedCamp}
        open={!!selectedCamp}
        onClose={() => setSelectedCamp(null)}
      />
    </section>
  );
}