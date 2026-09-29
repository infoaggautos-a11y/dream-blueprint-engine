import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, Check, Circle, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { NextStep } from '@/types/dashboard';

const steps: NextStep[] = [
  { id: '1', title: 'Created account', completed: true, current: false },
  { id: '2', title: 'Started design', completed: true, current: false },
  { id: '3', title: 'Selected materials', completed: true, current: false },
  { id: '4', title: 'Finalize Budget', completed: false, current: true },
  { id: '5', title: 'Schedule site visit', completed: false, current: false },
  { id: '6', title: 'Book consultation', completed: false, current: false },
  { id: '7', title: 'Review contract', completed: false, current: false },
  { id: '8', title: 'Construction begins', completed: false, current: false },
];

const NextSteps = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl border border-border/50 bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-serif text-xl font-semibold text-foreground">Your Journey to Home</h3>
      </div>

      {/* Steps */}
      <div className="mt-6 space-y-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
              step.current
                ? 'bg-primary/10 border border-primary/30'
                : step.completed
                ? ''
                : 'opacity-50'
            }`}
          >
            {step.completed ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                <Check className="h-3.5 w-3.5 text-green-500" />
              </div>
            ) : step.current ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </div>
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground/50" />
            )}

            <span
              className={`text-sm ${
                step.current
                  ? 'font-medium text-primary'
                  : step.completed
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {step.title}
            </span>

            {step.current && (
              <Button
                variant="gold"
                size="sm"
                className="ml-auto text-xs"
                onClick={() => navigate('/estimate')}
              >
                Complete Now
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-border" />

      {/* Fast Track */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="rounded-lg bg-gradient-to-br from-primary/10 to-amber/10 p-4"
      >
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Fast Track Available</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Book this week, start March
        </p>
        <Button variant="gold" size="sm" className="mt-3 w-full">
          Schedule Now
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default NextSteps;
