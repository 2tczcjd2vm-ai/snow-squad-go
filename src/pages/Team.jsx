import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Snowflake, Award, Shield, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const values = [
  { icon: Award, title: 'Odbornost', description: 'Certifikovaní instruktoři s mezinárodní praxí a pravidelnými školeními.' },
  { icon: Heart, title: 'Vášeň', description: 'Milujeme snowboarding a předáváme tuto lásku dalším generacím.' },
  { icon: Shield, title: 'Odpovědnost', description: 'Bezpečnost a spokojenost svěřených dětí je naší nejvyšší prioritou.' },
];

export default function Team() {
  const { data: members = [], isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await supabase.from('team_members').select('*').order('order').limit(20);
      return data || [];
    },
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-16 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Kdo jsme</span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mt-3 mb-4">
              Náš tým
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Za Český Freestyle Klub stojí tým zkušených snowboardistů, trenérů a organizátorů, 
              kteří sdílejí stejnou vášeň — předávat lásku k horám dalším generacím.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team members */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl">Poznejte nás</h2>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Snowflake className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-20">
              <Snowflake className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Tým se připravuje</h3>
              <p className="text-muted-foreground">Informace o členech týmu budou brzy doplněny.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border/50 overflow-hidden text-center group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                        <span className="text-6xl font-heading font-bold text-primary/20">
                          {member.name?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-sm text-accent font-semibold mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join the team CTA */}
      <section className="py-16 bg-muted/40 border-t border-border/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
              Zajímá vás spolupráce?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hledáme certifikované instruktory se zkušeností s výukou mládeže. 
              Pokud sdílíte naše hodnoty a milujete snowboarding, ozvěte se nám.
            </p>
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 font-semibold">
                Kontaktovat klub
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}