import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Bed, Sun, Sparkles, Leaf, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WhatIfOption } from '@/types/dashboard';

const whatIfOptions: WhatIfOption[] = [
  {
    id: '1',
    title: '+ 4th Bedroom',
    description: 'Extra guest or office space',
    costImpact: '+₦8M',
    timelineImpact: '+2 months',
    icon: 'bed',
  },
  {
    id: '2',
    title: '+ Solar Power',
    description: 'Full solar installation',
    costImpact: '+₦4M',
    timelineImpact: 'Saves ₦200k/year',
    icon: 'sun',
  },
  {
    id: '3',
    title: '+ Premium Materials',
    description: 'Italian marble & teak',
    costImpact: '+₦12M',
    timelineImpact: 'Same timeline',
    icon: 'sparkles',
  },
];

const additionalOptions = [
  { label: 'Local Materials', icon: Leaf },
  { label: 'Smaller Footprint', icon: Ruler },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'bed':
      return Bed;
    case 'sun':
      return Sun;
    case 'sparkles':
      return Sparkles;
    default:
      return Lightbulb;
  }
};

const WhatIfSimulator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl border border-border/50 bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="font-serif text-xl font-semibold text-foreground">What If You...</h3>
      </div>

      {/* Options Grid */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {whatIfOptions.map((option, index) => {
          const IconComponent = getIcon(option.icon);
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group cursor-pointer rounded-xl border border-border/50 bg-muted/30 p-5 transition-all hover:border-primary/50 hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <IconComponent className="h-5 w-5 text-primary" />
              </div>

              <h4 className="mt-4 font-serif text-lg font-semibold text-foreground">{option.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>

              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-primary">{option.costImpact}</span>
                </div>
                <div className="text-xs text-muted-foreground">{option.timelineImpact}</div>
              </div>

              <Button variant="ghost" size="sm" className="mt-4 w-full group-hover:text-primary">
                Explore
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Options */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Or try:</span>
        {additionalOptions.map((option) => (
          <Button key={option.label} variant="subtle" size="sm" className="gap-2">
            <option.icon className="h-3 w-3" />
            {option.label}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default WhatIfSimulator;
