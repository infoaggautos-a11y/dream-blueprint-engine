import { motion } from 'framer-motion';
import { Users, ArrowRight, Quote, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuildTwinData {
  name: string;
  location: string;
  style: string;
  cost: string;
  estimatedMonths: number;
  actualMonths: number;
  testimonial: string;
  avatar: string;
}

const mockTwin: BuildTwinData = {
  name: 'James O.',
  location: 'Lagos',
  style: '3BR Modern',
  cost: '₦48M',
  estimatedMonths: 8,
  actualMonths: 7.5,
  testimonial: 'TVICL exceeded expectations. The smart home features are incredible.',
  avatar: '/placeholder.svg',
};

const BuildTwin = () => {
  const estimateProgress = (mockTwin.estimatedMonths / 12) * 100;
  const actualProgress = (mockTwin.actualMonths / 12) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-2xl border border-border/50 bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="font-serif text-xl font-semibold text-foreground">Meet Your Build Twin</h3>
      </div>

      {/* Twin Profile */}
      <div className="mt-6 flex items-start gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full bg-muted">
          <img
            src={mockTwin.avatar}
            alt={mockTwin.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-foreground">
            <span className="font-semibold">{mockTwin.name}</span> built something similar
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {mockTwin.location} • {mockTwin.style} • {mockTwin.cost}
          </p>
        </div>
      </div>

      {/* Timeline Comparison */}
      <div className="mt-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>Timeline Comparison</span>
        </div>
        
        <div className="mt-4 space-y-4">
          {/* Your Estimate */}
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your estimate:</span>
              <span className="font-medium text-foreground">{mockTwin.estimatedMonths} months</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${estimateProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full bg-muted-foreground/50"
              />
            </div>
          </div>

          {/* James's Actual */}
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{mockTwin.name.split(' ')[0]}'s actual:</span>
              <span className="font-medium text-green-500">{mockTwin.actualMonths} months</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${actualProgress}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="mt-6 rounded-lg bg-muted/30 p-4">
        <Quote className="h-5 w-5 text-primary/50" />
        <p className="mt-2 text-sm italic text-muted-foreground">"{mockTwin.testimonial}"</p>
      </div>

      {/* CTAs */}
      <div className="mt-6 flex gap-3">
        <Button variant="goldOutline" size="sm" className="flex-1">
          View {mockTwin.name.split(' ')[0]}'s Journey
        </Button>
        <Button variant="subtle" size="sm" className="flex-1">
          Find More Twins
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default BuildTwin;
