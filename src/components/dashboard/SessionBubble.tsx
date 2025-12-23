import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, Home, Sparkles, Eye, Clock, Check, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserSession, SavedDesign } from '@/types/dashboard';

interface SessionBubbleProps {
  session: UserSession;
  onCreateAccount?: () => void;
}

const SessionBubble = ({ session, onCreateAccount }: SessionBubbleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  const design = session.savedDesigns[0];

  return (
    <>
      {/* Minimized Bubble */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg animate-pulse-glow"
          >
            <Save className="h-6 w-6 text-primary-foreground" />
            {session.savedDesigns.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-card text-xs font-bold text-foreground ring-2 ring-primary">
                {session.savedDesigns.length}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl border border-border/50 bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Save className="h-5 w-5 text-primary" />
                <span className="font-serif text-lg font-semibold text-foreground">Your Exploration Session</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Activity Summary */}
              <div className="rounded-lg bg-muted/30 p-3">
                <h4 className="text-sm font-medium text-muted-foreground">📊 Activity Summary</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Home className="h-4 w-4 text-primary" />
                    <span>{session.savedDesigns.length} design{session.savedDesigns.length !== 1 ? 's' : ''} saved</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>{session.interactionLog.smartHomeTests.length} smart features tested</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Eye className="h-4 w-4 text-primary" />
                    <span>{session.interactionLog.materialsViewed.length} materials viewed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{formatTime(session.interactionLog.totalTimeSpent)} exploring</span>
                  </div>
                </div>
              </div>

              {/* Saved Design Preview */}
              {design && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-muted-foreground">🏠 Your Saved Design</h4>
                  <div className="mt-2 rounded-lg border border-border/50 bg-muted/20 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                        <img src={design.thumbnail} alt={design.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{design.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {design.rooms.bedrooms}BR • ₦{design.estimatedCost / 1000000}M • {design.completionPercent}% done
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits List */}
              <div className="mt-4 rounded-lg bg-primary/5 p-3">
                <h4 className="text-sm font-medium text-foreground">💡 Create account to:</h4>
                <ul className="mt-2 space-y-1.5">
                  {['Save permanently', 'Get personalized timeline', 'Unlock budget breakdown', 'Compare multiple designs'].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-3 w-3 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="mt-4 space-y-2">
                <Button variant="gold" className="w-full" onClick={onCreateAccount}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Free Account
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setIsExpanded(false)}>
                  Continue Browsing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SessionBubble;
