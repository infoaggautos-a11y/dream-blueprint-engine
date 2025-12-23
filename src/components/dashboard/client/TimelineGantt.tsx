import { motion } from 'framer-motion';
import { CalendarDays, Zap } from 'lucide-react';
import type { ConstructionPhase } from '@/types/dashboard';

interface TimelineGanttProps {
  phases: ConstructionPhase[];
  projectedCompletion: Date;
  daysAheadOrBehind: number;
}

const TimelineGantt = ({ phases, projectedCompletion, daysAheadOrBehind }: TimelineGanttProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const formatFullDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status: ConstructionPhase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-primary';
      case 'upcoming':
        return 'bg-muted-foreground/30';
    }
  };

  const getStatusText = (status: ConstructionPhase['status']) => {
    switch (status) {
      case 'completed':
        return 'DONE';
      case 'in_progress':
        return 'IN PROGRESS';
      case 'upcoming':
        return 'UPCOMING';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-border/30 bg-card p-6"
    >
      <div className="mb-6 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Construction Timeline</h3>
      </div>

      {/* Timeline Chart */}
      <div className="mb-6 space-y-3">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-4"
          >
            <div className="w-28 text-right text-sm text-muted-foreground">
              {phase.name}
            </div>
            <div className="relative flex-1">
              <div className="h-6 overflow-hidden rounded bg-muted/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${phase.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full rounded ${getStatusColor(phase.status)}`}
                />
              </div>
            </div>
            <div
              className={`w-24 text-xs font-medium ${
                phase.status === 'completed'
                  ? 'text-green-400'
                  : phase.status === 'in_progress'
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {getStatusText(phase.status)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Months (simplified) */}
      <div className="mb-6 flex justify-between border-t border-border/20 pt-3 text-xs text-muted-foreground">
        {['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>

      {/* Projected Completion */}
      <div className="flex items-center justify-between rounded-xl bg-muted/20 p-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🎯</span>
          <div>
            <p className="text-sm text-muted-foreground">Projected Completion</p>
            <p className="font-semibold text-foreground">{formatFullDate(projectedCompletion)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">
            {daysAheadOrBehind > 0
              ? `${daysAheadOrBehind} days ahead`
              : daysAheadOrBehind < 0
              ? `${Math.abs(daysAheadOrBehind)} days behind`
              : 'On schedule'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineGantt;
