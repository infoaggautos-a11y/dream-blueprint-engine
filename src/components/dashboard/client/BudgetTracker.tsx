import { motion } from 'framer-motion';
import { Wallet, AlertTriangle, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BudgetOverview } from '@/types/dashboard';

interface BudgetTrackerProps {
  budget: BudgetOverview;
}

const BudgetTracker = ({ budget }: BudgetTrackerProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: budget.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusColor = (status: 'paid' | 'due' | 'upcoming') => {
    switch (status) {
      case 'paid':
        return 'text-green-400';
      case 'due':
        return 'text-amber-400';
      case 'upcoming':
        return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status: 'paid' | 'due' | 'upcoming') => {
    switch (status) {
      case 'paid':
        return '(PAID)';
      case 'due':
        return '(DUE)';
      case 'upcoming':
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-border/30 bg-card p-6"
    >
      <div className="mb-6 flex items-center gap-2">
        <Wallet className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Budget Overview</h3>
      </div>

      {/* Main Amounts */}
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Contract:</span>
          <span className="font-semibold text-foreground">{formatCurrency(budget.totalContract)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Spent to Date:</span>
          <span className="font-semibold text-primary">{formatCurrency(budget.spentToDate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Remaining:</span>
          <span className="font-semibold text-foreground">{formatCurrency(budget.remaining)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 overflow-hidden rounded-full bg-muted/30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${budget.percentSpent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
          />
        </div>
        <p className="mt-1 text-right text-sm text-muted-foreground">{budget.percentSpent}%</p>
      </div>

      {/* Breakdown */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-muted-foreground">📊 Breakdown:</p>
        <div className="space-y-2">
          {budget.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">• {item.category}:</span>
              <span className={getStatusColor(item.status)}>
                {formatCurrency(item.amount).replace('NGN', '₦')} {getStatusLabel(item.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Payment Alert */}
      {budget.nextPaymentDue && budget.nextPaymentAmount && (
        <div className="mb-6 flex items-start gap-3 rounded-xl bg-amber-500/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-400" />
          <div>
            <p className="text-sm font-medium text-amber-400">
              Next Payment Due: {formatDate(budget.nextPaymentDue)}
            </p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(budget.nextPaymentAmount)}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-foreground">
          View Full Breakdown
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className="w-full justify-between text-muted-foreground hover:text-foreground">
          <span className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default BudgetTracker;
