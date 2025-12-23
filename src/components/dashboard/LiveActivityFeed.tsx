import { motion } from 'framer-motion';
import { Flame, Home, Package, CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ActivityItem } from '@/types/dashboard';

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'design',
    message: 'Someone just finalized a Modern Minimalist design',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    icon: 'home',
  },
  {
    id: '2',
    type: 'material',
    message: 'Italian Marble now trending +40% this week',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    icon: 'package',
  },
  {
    id: '3',
    type: 'project',
    message: 'Project in Lekki completed ahead of schedule',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    icon: 'check',
  },
  {
    id: '4',
    type: 'booking',
    message: '3 consultations booked today',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: 'calendar',
  },
];

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'home':
      return Home;
    case 'package':
      return Package;
    case 'check':
      return CheckCircle;
    case 'calendar':
      return Calendar;
    default:
      return Flame;
  }
};

const getIconColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'design':
      return 'text-primary bg-primary/10';
    case 'material':
      return 'text-amber bg-amber/10';
    case 'project':
      return 'text-green-500 bg-green-500/10';
    case 'booking':
      return 'text-blue-500 bg-blue-500/10';
    default:
      return 'text-primary bg-primary/10';
  }
};

const LiveActivityFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-2xl border border-border/50 bg-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-orange-500" />
        <h3 className="font-serif text-xl font-semibold text-foreground">Live Activity</h3>
      </div>

      {/* Activity List */}
      <div className="mt-6 space-y-1">
        {activities.map((activity, index) => {
          const IconComponent = getIcon(activity.icon);
          const iconColorClass = getIconColor(activity.type);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group"
            >
              <div className="rounded-lg p-3 transition-colors hover:bg-muted/30">
                <div className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconColorClass}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">{activity.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </div>
              </div>
              {index < activities.length - 1 && <div className="ml-7 h-px bg-border/50" />}
            </motion.div>
          );
        })}
      </div>

      {/* View All */}
      <Button variant="ghost" className="mt-4 w-full text-muted-foreground hover:text-foreground">
        View All Activity
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default LiveActivityFeed;
