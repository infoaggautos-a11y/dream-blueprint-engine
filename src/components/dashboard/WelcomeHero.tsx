import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { SavedDesign } from '@/types/dashboard';

interface WelcomeHeroProps {
  userName: string;
  currentDesign?: SavedDesign;
}

const WelcomeHero = ({ userName, currentDesign }: WelcomeHeroProps) => {
  const navigate = useNavigate();

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const handleContinueBuilding = () => {
    navigate('/builder');
  };

  const handleViewEstimate = () => {
    navigate('/builder');
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-muted/30 p-8"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="heroGrid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#heroGrid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Greeting */}
        <div>
          <span className="text-lg">👋</span>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground">
            Welcome back, <span className="text-primary">{userName}</span>
          </h1>
        </div>

        {currentDesign ? (
          <div className="mt-6">
            <p className="text-lg text-secondary-foreground">
              Your <span className="font-medium text-foreground">{currentDesign.name}</span> design is{' '}
              <span className="font-semibold text-primary">{currentDesign.completionPercent}%</span> complete
            </p>
            
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {formatLastUpdated(currentDesign.lastModified)}</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 w-full max-w-md">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${currentDesign.completionPercent}%` }}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="gold" size="lg" className="group" onClick={handleContinueBuilding}>
                Continue Building
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="goldOutline" size="lg" onClick={handleViewEstimate}>
                View Estimate
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-lg text-secondary-foreground">
              Ready to design your dream home? Let's get started.
            </p>
            <div className="mt-8">
              <Button variant="hero" className="group">
                Start Your First Design
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeHero;
