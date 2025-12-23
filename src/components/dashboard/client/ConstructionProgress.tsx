import { motion } from 'framer-motion';
import { Camera, Play, Eye, CheckCircle2, Clock, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ProjectProgress } from '@/types/dashboard';

interface ConstructionProgressProps {
  progress: ProjectProgress;
}

const ConstructionProgress = ({ progress }: ConstructionProgressProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/30 bg-gradient-to-br from-card via-card/95 to-card/90 p-6 shadow-xl"
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <h2 className="text-xl font-semibold text-foreground">
              Your Home Is Being Built
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Project: <span className="text-foreground">{progress.projectName}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Location: <span className="text-foreground">{progress.location}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Started: <span className="text-foreground">{formatDate(progress.startDate)}</span>
          </p>
        </div>
        <Badge
          variant={progress.isOnSchedule ? 'default' : 'destructive'}
          className={progress.isOnSchedule ? 'bg-primary/20 text-primary' : ''}
        >
          {progress.isOnSchedule
            ? `${progress.daysAheadOrBehind > 0 ? `${progress.daysAheadOrBehind} days ahead` : 'On Schedule'} ✓`
            : `${Math.abs(progress.daysAheadOrBehind)} days behind`}
        </Badge>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <span className="text-lg font-bold text-primary">{progress.overallProgress}% Complete</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-muted/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress.overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
          />
        </div>
      </div>

      {/* Recent Photos Grid */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Latest Photos</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Updated {progress.recentPhotos[0] ? formatDate(progress.recentPhotos[0].date) : 'recently'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {progress.recentPhotos.slice(0, 4).map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.05 }}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <img
                src={photo.url}
                alt={photo.caption}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Eye className="h-6 w-6 text-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Play className="mr-2 h-4 w-4" />
            Watch Time-Lapse
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            360° Virtual Tour
          </Button>
        </div>
      </div>

      {/* Current Phase & Milestone */}
      <div className="space-y-3 rounded-xl bg-muted/20 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Phase</p>
            <p className="font-medium text-foreground">{progress.currentPhase}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
            <CalendarDays className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next Milestone</p>
            <p className="font-medium text-foreground">
              {progress.nextMilestone}{' '}
              <span className="text-sm text-muted-foreground">
                (Est. {formatDate(progress.estimatedMilestoneDate)})
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <Button className="flex-1">Contact Project Manager</Button>
        <Button variant="secondary" className="flex-1">
          <Clock className="mr-2 h-4 w-4" />
          Schedule Visit
        </Button>
      </div>
    </motion.div>
  );
};

export default ConstructionProgress;
