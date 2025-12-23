import { motion } from 'framer-motion';
import { Star, Check, X, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DreamScore as DreamScoreType } from '@/types/dashboard';

interface DreamScoreProps {
  score: DreamScoreType;
}

const DreamScore = ({ score }: DreamScoreProps) => {
  const checklistItems = [
    { label: 'Design completed', points: score.breakdown.designCompletion, max: 30, done: score.breakdown.designCompletion >= 25 },
    { label: 'Materials selected', points: score.breakdown.materialsSelected, max: 15, done: score.breakdown.materialsSelected >= 12 },
    { label: 'Budget confirmed', points: score.breakdown.budgetEntered, max: 10, done: score.breakdown.budgetEntered >= 8 },
    { label: 'Timeline estimated', points: score.breakdown.timelineSet, max: 10, done: score.breakdown.timelineSet >= 8, pending: score.breakdown.timelineSet > 0 && score.breakdown.timelineSet < 8 },
    { label: 'Consultation booked', points: score.breakdown.consultationBooked, max: 25, done: score.breakdown.consultationBooked >= 20 },
  ];

  const circumference = 2 * Math.PI * 45;
  const progress = (score.total / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border/50 bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-primary" />
        <h3 className="font-serif text-xl font-semibold text-foreground">Your Dream Score</h3>
      </div>

      {/* Circular Progress */}
      <div className="mt-6 flex justify-center">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90 transform">
            {/* Background Circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="hsl(var(--soft-brown))"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="45"
              stroke="url(#goldGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(43, 70%, 52%)" />
                <stop offset="100%" stopColor="hsl(38, 75%, 55%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="font-serif text-4xl font-bold text-primary"
            >
              {score.total}
            </motion.span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Checklist */}
      <div className="space-y-3">
        {checklistItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            {item.done ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                <Check className="h-3 w-3 text-green-500" />
              </div>
            ) : item.pending ? (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20">
                <Clock className="h-3 w-3 text-amber-500" />
              </div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/20">
                <X className="h-3 w-3 text-destructive" />
              </div>
            )}
            <span className={`text-sm ${item.done ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Unlock Section */}
      <div className="rounded-lg bg-muted/50 p-4">
        <div className="flex items-center gap-2 text-primary">
          <Gift className="h-4 w-4" />
          <span className="text-sm font-medium">Reach 100 to unlock:</span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Complete Home Blueprint PDF</li>
          <li>• Priority Consultation</li>
          <li>• Exclusive Material Discounts</li>
        </ul>
      </div>

      {/* CTA */}
      <Button variant="gold" className="mt-6 w-full">
        Complete Your Profile
      </Button>
    </motion.div>
  );
};

export default DreamScore;
