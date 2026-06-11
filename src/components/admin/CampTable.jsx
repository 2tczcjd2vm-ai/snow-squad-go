import React from 'react';
import { Pencil, Trash2, Snowflake, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';

const STATUS_LABELS = {
  upcoming: { label: 'Dostupné', cls: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  full: { label: 'Obsazené', cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
  completed: { label: 'Dokončené', cls: 'bg-white/10 text-white/50 border-white/20' },
};

export default function CampTable({ camps, isLoading, onEdit, onDelete }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Snowflake className="w-6 h-6 animate-spin text-white/30" />
      </div>
    );
  }

  if (camps.length === 0) {
    return (
      <div className="text-center py-16 text-white/30">
        <Snowflake className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">Žádná soustředění</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {['Název', 'Místo', 'Termín', 'Kapacita', 'Cena', 'Status', ''].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {camps.map((camp) => {
            const spotsLeft = camp.capacity - (camp.spots_taken || 0);
            const status = STATUS_LABELS[camp.status] || STATUS_LABELS.upcoming;
            return (
              <tr key={camp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {camp.image_url ? (
                      <img src={camp.image_url} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Snowflake className="w-4 h-4 text-primary/60" />
                      </div>
                    )}
                    <span className="font-medium text-white text-sm">{camp.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {camp.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(camp.start_date), 'd.M.', { locale: cs })} – {format(new Date(camp.end_date), 'd.M.yy', { locale: cs })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <span className="text-white font-medium">{camp.spots_taken || 0}</span>
                    <span className="text-white/40">/{camp.capacity}</span>
                    <div className="w-16 h-1 bg-white/10 rounded-full mt-1">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.min(100, ((camp.spots_taken || 0) / camp.capacity) * 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white font-medium text-sm">
                    {camp.price?.toLocaleString('cs-CZ')} Kč
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${status.cls}`}>
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => onEdit(camp)}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white/60 hover:text-red-400 hover:bg-red-500/10"
                      onClick={() => onDelete(camp)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}