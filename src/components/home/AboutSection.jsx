import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Trophy, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Users,
    title: 'Pro děti 10–15 let',
    description: 'Zaměřujeme se výhradně na mládež z Prahy a okolí. Malé skupiny zajišťují individuální přístup každému jezdci.',
  },
  {
    icon: MapPin,
    title: '6–10 soustředění ročně',
    description: 'Jezdíme do Rakouska, Itálie, Francie a Švýcarska. Každé soustředění má pečlivě vybranou destinaci s perfektními podmínkami.',
  },
  {
    icon: Trophy,
    title: 'Profesionální trenéři',
    description: 'Naši trenéři dlouhá léta závodili profesionálně na snowboardu. Předávají dětem zkušenosti přímo z vrcholového sportu.',
  },
  {
    icon: ShieldCheck,
    title: 'Bezpečnost na prvním místě',
    description: 'Komplexní pojištění, lékárnička na místě, přesné bezpečnostní protokoly a max. 5 dětí na trenéra.',
  },
  {
    icon: Heart,
    title: 'Skvělá parta',
    description: 'Každé soustředění je i společenská akce. Děti si nacházejí nové kamarády a zažívají dobrodružství.',
  },
  {
    icon: Zap,
    title: 'Rychlý pokrok',
    description: 'Díky intenzivní výuce a opakovaným soustředěním za sezónu jezdci dělají neuvěřitelný pokrok.',
  },
];

export default function AboutSection() {
  return (
    <section
      className="py-24 relative" id="o-nas"
      style={{
        backgroundImage: `url('https://velzztwnhpchyojopzkv.supabase.co/storage/v1/object/public/images/camp-hintertux.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">O nás</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-3 mb-6">
              Náš příběh
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Tomáš Tuzar a Filip Gutwirth se potkali v roce 2005 na závodech českého poháru. Od té chvíle je pojí nejen přátelství, ale hlavně sdílená vášeň pro snowboarding — společně objeli hory od Alp po Rocky Mountains a strávili na prkně víc dnů, než by sami spočítali.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              V roce 2018 se rozhodli své zkušenosti předávat dál a spolu s několika rodiči talentovaných jezdců založili klub SnowEagles. Za sedm let jeho vedení se jim podařilo něco výjimečného — většina jejich svěřenců dnes závodí v české reprezentaci.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Hory ale neopustili. Naopak — v roce 2025 otevřeli novou kapitolu a založili Český Freestyle Klub. Klub, kde předávají to nejlepší ze své kariéry dalším generacím jezdců. Budeme rádi, když se přidáte.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/camps">
                <Button className="bg-primary hover:bg-primary/90 font-semibold">
                  Prohlédnout soustředění
                </Button>
              </Link>
              <Link to="/team">
                <Button variant="outline" className="font-semibold">
                  Poznat náš tým
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://velzztwnhpchyojopzkv.supabase.co/storage/v1/object/public/images/nas-pribeh.jpg"
                alt="Náš příběh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border/50 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">Nejlepší klub roku</p>
                  <p className="text-xs text-muted-foreground">Praha Snowboard Awards 2024</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
