import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    category: 'Základní informace',
    items: [
      {
        q: 'Pro koho jsou soustředění určena?',
        a: 'Soustředění jsou určena pro děti ve věku 10–15 let z Prahy a okolí. Přijímáme jak úplné začátečníky, tak pokročilé jezdce. Skupiny jsou rozděleny podle věku a úrovně dovedností.',
      },
      {
        q: 'Jak dlouho trvá typické soustředění?',
        a: 'Většina soustředění trvá 6–7 dní. Přesná délka závisí na konkrétním termínu — vždy ji najdete v detailu soustředění.',
      },
      {
        q: 'Kdy probíhají soustředění?',
        a: 'Soustředění pořádáme od října do dubna. Snažíme se pokrýt celou sezónu včetně podzimních prázdnin, Vánoc, pololetních prázdnin a jarních prázdnin.',
      },
      {
        q: 'Kam jezdíme?',
        a: 'Jezdíme do nejlepších alpských destinací — Hintertux a Stubai (ledovce v Rakousku), Livigno (Itálie), Chamonix (Francie), Mayrhofen a Kaprun (Rakousko). Každý rok přidáváme nové destinace.',
      },
    ],
  },
  {
    category: 'Přihlášení a platba',
    items: [
      {
        q: 'Jak se přihlásit na soustředění?',
        a: 'Přihlásit se můžete přímo zde na webu — buď přes formulář "Přihlásit dítě" na stránce Kontakt, nebo kliknutím na tlačítko Rezervovat u konkrétního soustředění. Po přihlášení vás kontaktujeme do 48 hodin.',
      },
      {
        q: 'Jak probíhá platba?',
        a: 'Po potvrzení rezervace zašleme fakturu na zálohu (50 % ceny), zbytek doplatíte nejpozději 30 dní před odjezdem. Přijímáme platbu bankovním převodem.',
      },
      {
        q: 'Co je v ceně zahrnuto?',
        a: 'Cena zahrnuje dopravu tam i zpět, ubytování se snídaní, skipas na všechny dny výuky a trénink s certifikovaným instruktorem. Stravu mimo snídani a osobní výdaje si děti hradí samy nebo přes přídělové kapesné.',
      },
      {
        q: 'Co není v ceně?',
        a: 'V ceně není zahrnuta půjčovna vybavení (snowboard, boty, přilba, chránič páteře). Doporučujeme si vybavení půjčit u nás za zvýhodněnou skupinovou cenu — informujte nás při přihlášení.',
      },
    ],
  },
  {
    category: 'Bezpečnost a organizace',
    items: [
      {
        q: 'Jak je zajištěna bezpečnost dětí?',
        a: 'Bezpečnost je naší naprostou prioritou. Každá skupina má max. 8 dětí na instruktora. Všichni vedoucí jsou certifikovaní instruktoři a proškolení v první pomoci. Pojištění odpovědnosti i úrazu je součástí pobytu.',
      },
      {
        q: 'Musí mít dítě vlastní vybavení?',
        a: 'Nikoliv. Pro děti, které nemají vlastní snowboard a boty, zajistíme půjčovnu přímo v destinaci za výhodnou skupinovou cenu. Přilba a chránič páteře jsou povinné — pokud dítě nemá vlastní, půjčíme.',
      },
      {
        q: 'Je pojištění zahrnuto?',
        a: 'Ano, součástí každého soustředění je skupinové cestovní pojištění a pojištění úrazu. Přesto doporučujeme mít sjednané individuální cestovní pojištění, které kryje i horské záchranné akce.',
      },
      {
        q: 'Mohu jako rodič jet také?',
        a: 'Soustředění jsou určena primárně pro děti bez rodičů — je to záměr, protože děti se pak snadněji začleňují do skupiny a rychleji pokračují. Výjimky pro rodiče dětí do 11 let řešíme individuálně.',
      },
    ],
  },
  {
    category: 'Výuka a pokrok',
    items: [
      {
        q: 'Jak jsou skupiny rozděleny?',
        a: 'Skupiny rozdělujeme podle věku a hlavně podle úrovně ježdění — začátečníci, mírně pokročilí, pokročilí a experti. Každé dítě tak trénuje s vrstevníky na stejné úrovni.',
      },
      {
        q: 'Jaký pokrok mohu čekat?',
        a: 'Díky intenzivní výuce (4–6 hodin denně na svahu) a opakovaným soustředěním za sezónu je pokrok výjimečně rychlý. Začátečníci se za jedno soustředění zpravidla naučí bezpečně sjet modrou trasu.',
      },
      {
        q: 'Jede se i v případě špatného počasí?',
        a: 'Ano, ve většině případů výuka probíhá i při horším počasí — lyžařky a snowparky jsou funkční i v mlze nebo při mírném sněžení. Výjimkou jsou extrémní podmínky (vichřice, uzavřené vleky), kdy program upravíme.',
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-sm sm:text-base leading-snug">{question}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-16 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">FAQ</span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mt-3 mb-4">
              Časté dotazy
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Odpovědi na nejčastější otázky rodičů a dětí. Nenašli jste odpověď? Napište nám.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {faqs.map((category, ci) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                <h2 className="font-heading font-bold text-xl mb-4 text-primary">{category.category}</h2>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <FAQItem key={item.q} question={item.q} answer={item.a} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary/5 rounded-2xl border border-primary/10 p-8 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-3">Nenašli jste odpověď?</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Neváhejte nás kontaktovat. Rádi odpovíme na jakoukoli vaši otázku.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:info@Český Freestyle Klub.cz">
                <Button variant="outline" className="font-semibold">
                  Napsat email
                </Button>
              </a>
              <Link to="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Kontaktní formulář
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}