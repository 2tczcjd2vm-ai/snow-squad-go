import React from 'react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CampCard({ camp, onReserve, index }) {
  const spotsLeft = camp.capacity - (camp.spots_taken || 0);
  const isFull = spotsLeft <= 0 || camp.status === 'full';
  const isCompleted = camp.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={camp.image_url || 'https://media.base44.com/images/public/69de2e87ca4221fb80b44806/dbeb4e165_generated_36645ea2.png'}
          alt={camp.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          {isFull && <Badge className="bg-destructive text-destructive-foreground">Obsazeno</Badge>}
          {isCompleted && <Badge variant="secondary">Dokončeno</Badge>}
          {!isFull && !isCompleted && (
            <Badge className="bg-accent text-accent-foreground">
              Volno: {spotsLeft} míst
            </Badge>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-heading font-bold text-xl mb-3">{camp.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{camp.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>
              {format(new Date(camp.start_date), 'd. MMM', { locale: cs })} – {format(new Date(camp.end_date), 'd. MMM yyyy', { locale: cs })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{camp.spots_taken || 0} / {camp.capacity} míst obsazeno</span>
          </div>
        </div>

        {camp.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{camp.description}</p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <span className="text-2xl font-heading font-bold text-primary">
              {camp.price?.toLocaleString('cs-CZ')} Kč
            </span>
          </div>
          <Button
            onClick={() => onReserve(camp)}
            disabled={isFull || isCompleted}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            Rezervovat
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}