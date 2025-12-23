import Header from '@/components/dashboard/Header';
import ConstructionProgress from '@/components/dashboard/client/ConstructionProgress';
import TimelineGantt from '@/components/dashboard/client/TimelineGantt';
import BudgetTracker from '@/components/dashboard/client/BudgetTracker';
import QualityInspections from '@/components/dashboard/client/QualityInspections';
import CommunicationHub from '@/components/dashboard/client/CommunicationHub';
import AIAssistant from '@/components/dashboard/AIAssistant';
import type { ClientProject, ConstructionPhase, BudgetItem, QualityInspection, ProjectMessage } from '@/types/dashboard';

// Import images for construction photos
import designThumb1 from '@/assets/design-thumbnail-1.jpg';
import designThumb2 from '@/assets/design-thumbnail-2.jpg';
import designThumb3 from '@/assets/design-thumbnail-3.jpg';

const mockPhases: ConstructionPhase[] = [
  { id: '1', name: 'Foundation', status: 'completed', progress: 100, startDate: new Date('2024-12-01'), endDate: new Date('2024-12-20') },
  { id: '2', name: 'Structure', status: 'in_progress', progress: 65, startDate: new Date('2024-12-21') },
  { id: '3', name: 'Roofing', status: 'upcoming', progress: 0, estimatedEnd: new Date('2025-02-15') },
  { id: '4', name: 'Electrical', status: 'upcoming', progress: 0 },
  { id: '5', name: 'Plumbing', status: 'upcoming', progress: 0 },
  { id: '6', name: 'Finishing', status: 'upcoming', progress: 0 },
  { id: '7', name: 'Smart Systems', status: 'upcoming', progress: 0 },
  { id: '8', name: 'Final Handover', status: 'upcoming', progress: 0 },
];

const mockBudgetItems: BudgetItem[] = [
  { id: '1', category: 'Foundation', amount: 8500000, status: 'paid' },
  { id: '2', category: 'Structure', amount: 6800000, status: 'paid' },
  { id: '3', category: 'Materials', amount: 12200000, status: 'due' },
  { id: '4', category: 'Labor', amount: 9500000, status: 'upcoming' },
  { id: '5', category: 'Smart Systems', amount: 8000000, status: 'upcoming' },
];

const mockInspections: QualityInspection[] = [
  {
    id: '1',
    type: 'Foundation Inspection',
    status: 'passed',
    inspector: 'Eng. Okonkwo',
    date: new Date('2024-12-18'),
    score: 9.5,
    notes: 'Excellent concrete work, no issues detected.',
  },
  {
    id: '2',
    type: 'Structural Steel',
    status: 'scheduled',
    date: new Date('2025-01-08'),
  },
  {
    id: '3',
    type: 'Electrical Rough-In',
    status: 'scheduled',
    date: new Date('2025-02-20'),
  },
];

const mockMessages: ProjectMessage[] = [
  {
    id: '1',
    sender: 'David Adebayo',
    role: 'Project Manager',
    message: 'Roofing materials arriving early, ahead of schedule! This is great news for the timeline.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    icon: 'hammer',
  },
  {
    id: '2',
    sender: 'Amara Eze',
    role: 'Interior Designer',
    message: 'Fixture selections ready for your review. Please check the attached catalog for options.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: false,
    icon: 'palette',
  },
  {
    id: '3',
    sender: 'Chidi Okoro',
    role: 'Site Engineer',
    message: 'Weather delay resolved, back on track. The structural work will continue tomorrow.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isRead: true,
    icon: 'clipboard',
  },
];

const mockProject: ClientProject = {
  id: 'proj_001',
  progress: {
    projectName: 'Modern Minimalist Dream',
    location: 'Lekki Phase 1, Lagos',
    startDate: new Date('2024-12-01'),
    overallProgress: 34,
    currentPhase: 'Foundation & Structure',
    nextMilestone: 'Roofing',
    estimatedMilestoneDate: new Date('2025-01-10'),
    isOnSchedule: true,
    daysAheadOrBehind: 2,
    phases: mockPhases,
    recentPhotos: [
      { id: '1', url: designThumb1, caption: 'Foundation complete', date: new Date(), phase: 'Foundation' },
      { id: '2', url: designThumb2, caption: 'Structure progress', date: new Date(), phase: 'Structure' },
      { id: '3', url: designThumb3, caption: 'Steel framework', date: new Date(), phase: 'Structure' },
      { id: '4', url: designThumb1, caption: 'Site overview', date: new Date(), phase: 'Structure' },
    ],
  },
  budget: {
    totalContract: 45000000,
    spentToDate: 15300000,
    remaining: 29700000,
    percentSpent: 34,
    items: mockBudgetItems,
    nextPaymentDue: new Date('2025-01-05'),
    nextPaymentAmount: 6000000,
    currency: 'NGN',
  },
  inspections: mockInspections,
  messages: mockMessages,
};

const ClientDashboard = () => {
  const userName = 'Adebayo';
  const userTier = 'client' as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header userName={userName} userTier={userTier} />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24 pt-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Primary Feed */}
          <div className="space-y-8">
            <ConstructionProgress progress={mockProject.progress} />
            <TimelineGantt
              phases={mockProject.progress.phases}
              projectedCompletion={new Date('2025-06-15')}
              daysAheadOrBehind={mockProject.progress.daysAheadOrBehind}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BudgetTracker budget={mockProject.budget} />
            <QualityInspections
              inspections={mockProject.inspections}
              overallScore={9.3}
            />
            <CommunicationHub messages={mockProject.messages} />
          </div>
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default ClientDashboard;
