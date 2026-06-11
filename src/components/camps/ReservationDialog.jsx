import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

export default function ReservationDialog({ camp, open, onClose }) {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    child_name: '',
    child_age: '',
    parent_name: '',
    parent_email: '',
    parent_phone: '',
    notes: '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await base44.entities.Reservation.create({
        ...form,
        child_age: Number(form.child_age),
        camp_id: camp.id,
        camp_title: camp.title,
        status: 'pending',
      });
      await base44.entities.Camp.update(camp.id, {
        spots_taken: (camp.spots_taken || 0) + 1,
      });
    },
    onSuccess: () => {
      setSuccess(true);
      toast.success('Rezervace odeslána!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleClose = () => {
    setSuccess(false);
    setForm({ child_name: '', child_age: '', parent_name: '', parent_email: '', parent_phone: '', notes: '' });
    onClose();
  };

  if (!camp) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Rezervace odeslána!</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Děkujeme za rezervaci na {camp.title}. Ozveme se vám co nejdříve na zadaný email.
            </p>
            <Button onClick={handleClose} className="bg-primary hover:bg-primary/90">
              Zavřít
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">Rezervace místa</DialogTitle>
              <DialogDescription>
                {camp.title} · {format(new Date(camp.start_date), 'd. MMM', { locale: cs })} – {format(new Date(camp.end_date), 'd. MMM yyyy', { locale: cs })}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="child_name">Jméno dítěte *</Label>
                  <Input id="child_name" value={form.child_name} onChange={handleChange('child_name')} required placeholder="Jan Novák" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="child_age">Věk dítěte *</Label>
                  <Input id="child_age" type="number" min="10" max="15" value={form.child_age} onChange={handleChange('child_age')} required placeholder="12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parent_name">Jméno rodiče *</Label>
                <Input id="parent_name" value={form.parent_name} onChange={handleChange('parent_name')} required placeholder="Karel Novák" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parent_email">Email rodiče *</Label>
                  <Input id="parent_email" type="email" value={form.parent_email} onChange={handleChange('parent_email')} required placeholder="rodic@email.cz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent_phone">Telefon rodiče *</Label>
                  <Input id="parent_phone" type="tel" value={form.parent_phone} onChange={handleChange('parent_phone')} required placeholder="+420 123 456 789" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Poznámky (alergie, zdravotní omezení apod.)</Label>
                <Textarea id="notes" value={form.notes} onChange={handleChange('notes')} placeholder="Napište nám, pokud máte jakékoli speciální požadavky..." rows={3} />
              </div>

              <div className="bg-muted rounded-xl p-4 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Cena soustředění</span>
                  <span className="font-semibold">{camp.price?.toLocaleString('cs-CZ')} Kč</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Po odeslání rezervace vás budeme kontaktovat s dalšími informacemi o platbě.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Odesílám...</>
                ) : (
                  'Odeslat rezervaci'
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}