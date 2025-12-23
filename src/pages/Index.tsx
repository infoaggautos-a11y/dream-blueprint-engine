import Header from '@/components/dashboard/Header';
import WelcomeHero from '@/components/dashboard/WelcomeHero';
import DreamScore from '@/components/dashboard/DreamScore';
import SavedDesigns from '@/components/dashboard/SavedDesigns';
import WhatIfSimulator from '@/components/dashboard/WhatIfSimulator';
import BuildTwin from '@/components/dashboard/BuildTwin';
import LiveActivityFeed from '@/components/dashboard/LiveActivityFeed';
import NextSteps from '@/components/dashboard/NextSteps';
import SessionBubble from '@/components/dashboard/SessionBubble';
import AIAssistant from '@/components/dashboard/AIAssistant';
import type { SavedDesign, DreamScore as DreamScoreType, UserSession } from '@/types/dashboard';

// Import generated images
import designThumb1 from '@/assets/design-thumbnail-1.jpg';
import designThumb2 from '@/assets/design-thumbnail-2.jpg';
import designThumb3 from '@/assets/design-thumbnail-3.jpg';

const mockDesigns: SavedDesign[] = [
  {
    id: '1',
    name: 'Modern Minimalist Dream',
    style: 'Contemporary',
    rooms: { bedrooms: 3, bathrooms: 2 },
    smartFeatures: ['automated_lighting', 'security_system', 'climate_control'],
    materials: ['italian_marble', 'teak_wood', 'bronze_fixtures'],
    estimatedCost: 45000000,
    currency: 'NGN',
    completionPercent: 85,
    thumbnail: designThumb1,
    lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
    squareMeters: 280,
  },
  {
    id: '2',
    name: 'African Luxury Villa',
    style: 'Contemporary African',
    rooms: { bedrooms: 4, bathrooms: 3 },
    smartFeatures: ['automated_lighting', 'security_system'],
    materials: ['local_stone', 'mahogany', 'brass_fixtures'],
    estimatedCost: 62000000,
    currency: 'NGN',
    completionPercent: 45,
    thumbnail: designThumb2,
    lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000),
    squareMeters: 350,
  },
  {
    id: '3',
    name: 'Smart Urban Retreat',
    style: 'Modern Urban',
    rooms: { bedrooms: 2, bathrooms: 2 },
    smartFeatures: ['full_automation', 'solar_integration'],
    materials: ['concrete', 'glass', 'steel'],
    estimatedCost: 35000000,
    currency: 'NGN',
    completionPercent: 20,
    thumbnail: designThumb3,
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    squareMeters: 180,
  },
];

const mockDreamScore: DreamScoreType = {
  total: 87,
  breakdown: {
    designCompletion: 25,
    materialsSelected: 15,
    budgetEntered: 10,
    timelineSet: 5,
    profileComplete: 10,
    consultationBooked: 22,
  },
};

const mockSession: UserSession = {
  visitorId: 'anon_abc123xyz',
  sessionStart: new Date(Date.now() - 30 * 60 * 1000),
  lastActive: new Date(),
  savedDesigns: mockDesigns.slice(0, 1),
  interactionLog: {
    smartHomeTests: ['lighting', 'curtains', 'security'],
    materialsViewed: ['italian_marble', 'teak_wood', 'bronze_fixtures', 'local_stone', 'mahogany'],
    pagesVisited: ['home', 'builder', 'materials', 'smart-home'],
    totalTimeSpent: 514,
    chatMessages: 3,
  },
  preferences: {
    budgetRange: '40M-50M',
    timeline: 'flexible',
    priorityFeatures: ['smart_home', 'luxury_materials'],
  },
};

const Index = () => {
  const userName = 'Adebayo';
  const userTier = 'prospect' as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header userName={userName} userTier={userTier} />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24 pt-28">
        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Primary Feed - 70% width on desktop */}
          <div className="space-y-8">
            {/* Module 1: Welcome Hero */}
            <WelcomeHero userName={userName} currentDesign={mockDesigns[0]} />
            
            {/* Module 3: Saved Designs Gallery */}
            <SavedDesigns designs={mockDesigns} />
            
            {/* Module 4: What-If Simulator */}
            <WhatIfSimulator />
            
            {/* Module 5: Build Twin Social Proof */}
            <BuildTwin />
          </div>

          {/* Sidebar - 30% width on desktop */}
          <div className="space-y-6">
            {/* Module 2: Dream Score Widget */}
            <DreamScore score={mockDreamScore} />
            
            {/* Module 6: Next Steps Checklist */}
            <NextSteps />
            
            {/* Module 7: Live Activity Feed */}
            <LiveActivityFeed />
          </div>
        </div>
      </main>

      {/* Floating Elements */}
      {/* Module 8: AI Assistant */}
      <AIAssistant />
      
      {/* Tier 1: Session Bubble for Visitors */}
      <SessionBubble session={mockSession} />
    </div>
  );
};

export default Index;
