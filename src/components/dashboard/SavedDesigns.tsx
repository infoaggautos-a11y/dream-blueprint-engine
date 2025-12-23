import { motion } from 'framer-motion';
import { Home, DollarSign, Clock, MoreHorizontal, Plus, Edit3, Copy, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SavedDesign } from '@/types/dashboard';

interface SavedDesignsProps {
  designs: SavedDesign[];
}

const formatCurrency = (amount: number, currency: string) => {
  if (currency === 'NGN') {
    const millions = amount / 1000000;
    return `₦${millions}M`;
  }
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount);
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}hrs ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const DesignCard = ({ design, index }: { design: SavedDesign; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -4 }}
    className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
  >
    {/* Thumbnail */}
    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
      <img
        src={design.thumbnail}
        alt={design.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      {/* Edit Badge */}
      <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-card/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity hover:bg-card group-hover:opacity-100">
        <Edit3 className="h-4 w-4" />
      </button>
    </div>

    {/* Content */}
    <div className="p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h4 className="font-serif text-lg font-semibold text-foreground">{design.name}</h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-muted-foreground hover:text-foreground">
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${design.completionPercent}%` }} />
        </div>
        <p className="mt-1 text-right text-xs text-muted-foreground">{design.completionPercent}% complete</p>
      </div>

      {/* Stats */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Home className="h-4 w-4 text-primary" />
          <span>{design.rooms.bedrooms}BR • {design.rooms.bathrooms}Bath • {design.squareMeters}m²</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="h-4 w-4 text-primary" />
          <span>{formatCurrency(design.estimatedCost, design.currency)} estimated</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>Last edited {formatTimeAgo(design.lastModified)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <Button variant="gold" className="flex-1">
          Continue Building
        </Button>
      </div>
      <div className="mt-2 flex gap-2">
        <Button variant="subtle" size="sm" className="flex-1 text-xs">
          Get Detailed Quote
        </Button>
        <Button variant="subtle" size="sm" className="flex-1 text-xs">
          Duplicate
        </Button>
      </div>
    </div>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-16 text-center"
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
      <Home className="h-8 w-8 text-primary" />
    </div>
    <h3 className="mt-6 font-serif text-xl font-semibold text-foreground">Start Your First Design</h3>
    <p className="mt-2 max-w-sm text-muted-foreground">
      Bring your dream home to life in minutes with our interactive builder
    </p>
    <Button variant="gold" className="mt-6">
      <Plus className="mr-2 h-4 w-4" />
      Open Builder
    </Button>
  </motion.div>
);

const SavedDesigns = ({ designs }: SavedDesignsProps) => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Saved Designs</h2>
        {designs.length > 0 && (
          <Button variant="goldOutline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Design
          </Button>
        )}
      </div>

      {designs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {designs.map((design, index) => (
            <DesignCard key={design.id} design={design} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default SavedDesigns;
