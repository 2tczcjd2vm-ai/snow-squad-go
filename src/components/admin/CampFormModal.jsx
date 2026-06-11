import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EMPTY = {
  title: '', location: '', country: '', start_date: '', end_date: '',
  price: '', capacity: '', spots_taken: 0, description: '', image_url: '', status: 'upcoming',
};

export default function CampFormModal({ camp, onClose, onSaved }) {
  const isEdit = !!camp;
  const [form, setForm] = useState(
    camp
      ? { ...camp, price: String(camp.price ?? ''), capacity: String(camp.capacity ?? ''), spots_taken: camp.spots_taken ?? 0 }
      : { ...EMPTY }
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const data = {
        ...form,
        price: Number(form.price),
        capacity: Number(form.capacity),
        spots_taken: Number(form.spots_taken),
      };
      if (isEdit) {
        await base44.entities.Camp.update(camp.id, data);
      } else {
        await base44.entities.Camp.create(data);
      }
    },
    onSuccess: () => {
      toast.success(isEdit ? 'Soustředění uloženo' : 'Soustředění vytvořeno');
      onSaved();
    },
    onError: (e) => toast.error(e.message),
  });

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: typeof e === 'string' ? e : e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 shadow-2xl"
        style={{ background: 'rgba(13, 27, 42, 0.95)', backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2 className="font-heading font-bold text-white text-lg">
            {isEdit ? 'Upravit soustředění' : 'Nové soustředění'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
          className="p-6 space-y-5"
        >
          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-white/70 text-sm">Název soustředění *</Label>
            <Input
              value={form.title}
              onChange={set('title')}
              required
              placeholder="např. Hintertux Opening"
              className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
            />
          </div>

          {/* Location + Country */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">Místo *</Label>
              <Input
                value={form.location}
                onChange={set('location')}
                required
                placeholder="Hintertux, Rakousko"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">Země</Label>
              <Input
                value={form.country}
                onChange={set('country')}
                placeholder="Rakousko"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">Datum začátku *</Label>
              <Input
                type="date"
                value={form.start_date}
                onChange={set('start_date')}
                required
                className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">Datum konce *</Label>
              <Input
                type="date"
                value={form.end_date}
                onChange={set('end_date')}
                required
                className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
              />
            </div>
          </div>

          {/* Price + Capacity + Spots */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">Cena (Kč) *</Label>
              <Input
                type="number"
                value={form.price}
                onChange={set('price')}
                required
                placeholder="18500"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">Kapacita *</Label>
              <Input
                type="number"
                value={form.capacity}
                onChange={set('capacity')}
                required
                placeholder="15"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">Obsazeno</Label>
              <Input
                type="number"
                value={form.spots_taken}
                onChange={set('spots_taken')}
                min="0"
                className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-white/70 text-sm">Status</Label>
            <Select value={form.status} onValueChange={set('status')}>
              <SelectTrigger className="bg-white/5 border-white/15 text-white focus:ring-primary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Dostupné</SelectItem>
                <SelectItem value="full">Obsazené</SelectItem>
                <SelectItem value="completed">Dokončené</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label className="text-white/70 text-sm">URL obrázku</Label>
            <Input
              value={form.image_url}
              onChange={set('image_url')}
              placeholder="https://..."
              className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50"
            />
            {form.image_url && (
              <img src={form.image_url} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg opacity-70" />
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-white/70 text-sm">Popis</Label>
            <Textarea
              value={form.description}
              onChange={set('description')}
              rows={3}
              placeholder="Krátký popis soustředění..."
              className="bg-white/5 border-white/15 text-white placeholder:text-white/25 focus-visible:ring-primary/50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-white/60 hover:text-white hover:bg-white/10"
            >
              Zrušit
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Ukládám...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" />{isEdit ? 'Uložit změny' : 'Vytvořit'}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}