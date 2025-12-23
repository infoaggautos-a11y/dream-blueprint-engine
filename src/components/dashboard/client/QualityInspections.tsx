import { motion } from 'framer-motion';
import { CheckCircle2, Clock, FileText, Camera, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { QualityInspection } from '@/types/dashboard';

interface QualityInspectionsProps {
  inspections: QualityInspection[];
  overallScore: number;
}

const QualityInspections = ({ inspections, overallScore }: QualityInspectionsProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getStatusIcon = (status: QualityInspection['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case 'in_review':
        return <FileText className="h-5 w-5 text-amber-400" />;
    }
  };

  const getStatusLabel = (status: QualityInspection['status']) => {
    switch (status) {
      case 'passed':
        return 'PASSED';
      case 'scheduled':
        return 'SCHEDULED';
      case 'in_review':
        return 'IN REVIEW';
    }
  };

  const getStatusColor = (status: QualityInspection['status']) => {
    switch (status) {
      case 'passed':
        return 'text-green-400';
      case 'scheduled':
        return 'text-muted-foreground';
      case 'in_review':
        return 'text-amber-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl border border-border/30 bg-card p-6"
    >
      <div className="mb-6 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold text-foreground">Quality Inspections</h3>
      </div>

      {/* Inspections List */}
      <div className="mb-6 space-y-4">
        {inspections.map((inspection, index) => (
          <motion.div
            key={inspection.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl p-4 ${
              inspection.status === 'passed'
                ? 'bg-green-500/10'
                : inspection.status === 'scheduled'
                ? 'bg-muted/20'
                : 'bg-amber-500/10'
            }`}
          >
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(inspection.status)}
                <div>
                  <p className="font-medium text-foreground">{inspection.type}</p>
                  <p className={`text-xs ${getStatusColor(inspection.status)}`}>
                    {getStatusLabel(inspection.status)}
                  </p>
                </div>
              </div>
              {inspection.score && (
                <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1">
                  <span className="text-sm font-bold text-green-400">{inspection.score}/10</span>
                </div>
              )}
            </div>

            {inspection.inspector && (
              <p className="text-sm text-muted-foreground">
                Inspector: <span className="text-foreground">{inspection.inspector}</span>
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Date: <span className="text-foreground">{formatDate(inspection.date)}</span>
            </p>

            {inspection.notes && (
              <p className="mt-2 text-sm italic text-muted-foreground">
                "{inspection.notes}"
              </p>
            )}

            {inspection.status === 'passed' && (
              <div className="mt-3 flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  <FileText className="mr-1 h-3 w-3" />
                  View Full Report
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Camera className="mr-1 h-3 w-3" />
                  See Photos
                </Button>
              </div>
            )}

            {inspection.status === 'scheduled' && (
              <Button variant="ghost" size="sm" className="mt-3 text-xs">
                <Bell className="mr-1 h-3 w-3" />
                Set Reminder
              </Button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Overall Score */}
      <div className="flex items-center justify-between rounded-xl bg-muted/20 p-4">
        <span className="text-sm text-muted-foreground">Overall Project Quality Score:</span>
        <span className="text-lg font-bold text-green-400">{overallScore}/10</span>
      </div>

      <Button variant="ghost" className="mt-4 w-full text-muted-foreground hover:text-foreground">
        View All Inspections
      </Button>
    </motion.div>
  );
};

export default QualityInspections;
