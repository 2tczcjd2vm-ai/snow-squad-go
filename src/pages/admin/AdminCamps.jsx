import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Snowflake, X, Save, Loader2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CampFormModal from '../../components/admin/CampFormModal';
import CampTable from '../../components/admin/CampTable';

export default function AdminCamps() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState(null);
  const queryClient = useQueryClient();

  const { data: camps = [], isLoading } = useQuery({
    queryKey: ['admin-camps'],
    queryFn: async () => {
      const { data } = await supabase.from('camps').select('*').order('start_date').limit(50);
      return data || [];
    },
    initialData: [],
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => supabase.from('camps').delete().eq('id', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-camps'] });
      toast.success('Soustředění smazáno');
    },
  });

  const handleEdit = (camp) => {
    setEditingCamp(camp);
    setModalOpen(true);
  };

  const handleNew = () => {
    setEditingCamp(null);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditingCamp(null);
  };

  const handleDelete = (camp) => {
    if (confirm(`Opravdu smazat "${camp.title}"?`)) {
      deleteMutation.mutate(camp.id);
    }
  };

  const handleSaved = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-camps'] });
    queryClient.invalidateQueries({ queryKey: ['camps'] });
    queryClient.invalidateQueries({ queryKey: ['camps-preview'] });
    handleClose();
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('https://velzztwnhpchyojopzkv.supabase.co/storage/v1/object/public/images/hero.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0D1B2A]/80 backdrop-blur-[1px]" />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 gap-1">
                <ChevronLeft className="w-4 h-4" />
                Web
              </Button>
            </Link>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                <Snowflake className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-white text-xl">SnowSquad Admin</h1>
                <p className="text-white/40 text-xs">Správa soustředění</p>
              </div>
            </div>
          </div>
          <Button
            onClick={handleNew}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg shadow-accent/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nové soustředění
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Celkem', value: camps.length },
            { label: 'Dostupné', value: camps.filter(c => c.status === 'upcoming').length },
            { label: 'Obsazené', value: camps.filter(c => c.status === 'full').length },
            { label: 'Dokončené', value: camps.filter(c => c.status === 'completed').length },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <p className="text-white/50 text-xs font-medium mb-1">{s.label}</p>
              <p className="text-white font-heading font-bold text-2xl">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-white">Všechna soustředění</h2>
            <span className="text-white/40 text-sm">{camps.length} záznamů</span>
          </div>
          <CampTable
            camps={camps}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {modalOpen && (
        <CampFormModal
          camp={editingCamp}
          onClose={handleClose}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}