import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/api/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Loader2, CheckCircle2, Send } from 'lucide-react';

const TABS = [
  { id: 'register', label: 'Přihlásit dítě do klubu' },
  { id: 'contact', label: 'Obecný dotaz' },
];

function RegisterForm() {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    child_age: '',
    skill_level: '',
  });

  const mutation = useMutation({
    mutationFn: (data) => supabase.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: `PŘIHLÁŠKA DO KLUBU\nVěk jezdce: ${data.child_age} let\nÚroveň ježdění: ${data.skill_level}\n\n${data.message}`,
    }),
    onSuccess: () => {
      setSuccess(true);
      toast.success('Přihláška odeslána!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: typeof e === 'string' ? e : e.target.value }));

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Přihláška odeslána!</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
          Děkujeme za zájem. Ozveme se vám do 48 hodin s dalšími informacemi a dostupnými termíny.
        </p>
        <Button
          onClick={() => {
            setSuccess(false);
            setForm({ name: '', email: '', phone: '', message: '', child_age: '', skill_level: '' });
          }}
          variant="outline"
        >
          Odeslat další přihlášku
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reg-name">Vaše jméno (rodič) *</Label>
          <Input id="reg-name" value={form.name} onChange={set('name')} required placeholder="Karel Novák" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-email">Email *</Label>
          <Input id="reg-email" type="email" value={form.email} onChange={set('email')} required placeholder="vas@email.cz" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reg-phone">Telefon *</Label>
          <Input id="reg-phone" type="tel" value={form.phone} onChange={set('phone')} required placeholder="+420 123 456 789" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-age">Věk dítěte / jezdce *</Label>
          <Input id="reg-age" type="number" min="10" max="15" value={form.child_age} onChange={set('child_age')} required placeholder="12" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Úroveň ježdění *</Label>
        <Select value={form.skill_level} onValueChange={set('skill_level')} required>
          <SelectTrigger>
            <SelectValue placeholder="Vyberte úroveň..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="intermediate">Pokročilý začátečník — zvládne základní sjezd</SelectItem>
            <SelectItem value="advanced">Pokročilý — jezdí jistě, zkouší park</SelectItem>
            <SelectItem value="expert">Expert — freestyle, carving, freeride</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-message">Zpráva / dotazy</Label>
        <Textarea
          id="reg-message"
          value={form.message}
          onChange={set('message')}
          placeholder="Napište nám cokoliv — o dítěti, zdravotních omezeních, preferencích termínů..."
          rows={4}
        />
      </div>

      <div className="bg-primary/5 rounded-xl p-4 text-sm text-muted-foreground border border-primary/10">
        Po odeslání přihlášky vás budeme kontaktovat do 48 hodin s dostupnými termíny a platebními informacemi.
      </div>

      <Button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12"
        disabled={mutation.isPending || !form.skill_level}
      >
        {mutation.isPending ? (
          <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Odesílám...</>
        ) : (
          <><Send className="w-4 h-4 mr-2" /> Odeslat přihlášku</>
        )}
      </Button>
    </form>
  );
}

function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const mutation = useMutation({
    mutationFn: (data) => supabase.from('contact_messages').insert(data),
    onSuccess: () => {
      setSuccess(true);
      toast.success('Zpráva odeslána!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Zpráva odeslána!</h3>
        <p className="text-muted-foreground text-sm mb-6">Děkujeme. Odpovíme vám co nejdříve.</p>
        <Button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', message: '' }); }} variant="outline">
          Odeslat další zprávu
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Jméno *</Label>
          <Input id="name" value={form.name} onChange={set('name')} required placeholder="Vaše jméno" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={form.email} onChange={set('email')} required placeholder="vas@email.cz" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Telefon</Label>
        <Input id="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+420 123 456 789" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Zpráva *</Label>
        <Textarea id="message" value={form.message} onChange={set('message')} required placeholder="Napište nám vaši zprávu..." rows={5} />
      </div>
      <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12" disabled={mutation.isPending}>
        {mutation.isPending ? (
          <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Odesílám...</>
        ) : (
          <><Send className="w-4 h-4 mr-2" /> Odeslat zprávu</>
        )}
      </Button>
    </form>
  );
}

export default function Contact() {
  const [tab, setTab] = useState('register');

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
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Kontakt</span>
            <h1 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl mt-3 mb-4">
              Ozvěte se nám
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Zajímá vás přihláška do klubu nebo máte otázky? Jsme tu pro vás.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-heading font-bold text-xl mb-6">Kontaktní údaje</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Email', value: 'info@Český Freestyle Klub.cz', href: 'mailto:info@Český Freestyle Klub.cz' },
                    { icon: Phone, label: 'Telefon', value: '+420 123 456 789', href: 'tel:+420123456789' },
                    { icon: MapPin, label: 'Město', value: 'Praha, Česká republika', href: null },
                    { icon: Instagram, label: 'Instagram', value: '@Český Freestyle Klub_prague', href: 'https://instagram.com' },
                  ].map(({ icon: ContactIcon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <ContactIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{value}</a>
                        ) : (
                          <p className="text-sm text-muted-foreground">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border/50 p-5">
                <h3 className="font-heading font-semibold mb-3">Provozní hodiny</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Po–Pá</span>
                    <span className="font-medium">9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sobota</span>
                    <span className="font-medium">10:00 – 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Neděle</span>
                    <span className="font-medium text-muted-foreground">Zavřeno</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 rounded-2xl border border-accent/20 p-5">
                <p className="text-sm font-semibold text-accent mb-2">⚡ Rychlá odpověď</p>
                <p className="text-sm text-muted-foreground">
                  Na přihlášky a dotazy odpovídáme zpravidla do 48 hodin v pracovní dny.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8">
                {/* Tabs */}
                <div className="flex gap-2 p-1 bg-muted rounded-xl mb-6">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        tab === t.id
                          ? 'bg-card shadow-sm text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {tab === 'register' ? <RegisterForm /> : <ContactForm />}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}