export interface SavedDesign {
  id: string;
  name: string;
  style: string;
  rooms: {
    bedrooms: number;
    bathrooms: number;
  };
  smartFeatures: string[];
  materials: string[];
  estimatedCost: number;
  currency: string;
  completionPercent: number;
  thumbnail: string;
  lastModified: Date;
  squareMeters: number;
}

export interface UserSession {
  visitorId: string;
  sessionStart: Date;
  lastActive: Date;
  savedDesigns: SavedDesign[];
  interactionLog: {
    smartHomeTests: string[];
    materialsViewed: string[];
    pagesVisited: string[];
    totalTimeSpent: number;
    chatMessages: number;
  };
  preferences: {
    budgetRange: string;
    timeline: string;
    priorityFeatures: string[];
  };
}

export interface DreamScore {
  total: number;
  breakdown: {
    designCompletion: number;
    materialsSelected: number;
    budgetEntered: number;
    timelineSet: number;
    profileComplete: number;
    consultationBooked: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'design' | 'material' | 'project' | 'booking';
  message: string;
  timestamp: Date;
  icon: string;
}

export interface NextStep {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

export interface WhatIfOption {
  id: string;
  title: string;
  description: string;
  costImpact: string;
  timelineImpact: string;
  icon: string;
}

export type UserTier = 'visitor' | 'prospect' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  avatar?: string;
  createdAt: Date;
}

// ============= CLIENT DASHBOARD (TIER 3) TYPES =============

export interface ConstructionPhase {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  progress: number;
  startDate?: Date;
  endDate?: Date;
  estimatedEnd?: Date;
}

export interface ConstructionPhoto {
  id: string;
  url: string;
  caption: string;
  date: Date;
  phase: string;
}

export interface ProjectProgress {
  projectName: string;
  location: string;
  startDate: Date;
  overallProgress: number;
  currentPhase: string;
  nextMilestone: string;
  estimatedMilestoneDate: Date;
  isOnSchedule: boolean;
  daysAheadOrBehind: number;
  phases: ConstructionPhase[];
  recentPhotos: ConstructionPhoto[];
}

export interface BudgetItem {
  id: string;
  category: string;
  amount: number;
  status: 'paid' | 'due' | 'upcoming';
}

export interface BudgetOverview {
  totalContract: number;
  spentToDate: number;
  remaining: number;
  percentSpent: number;
  items: BudgetItem[];
  nextPaymentDue?: Date;
  nextPaymentAmount?: number;
  currency: string;
}

export interface QualityInspection {
  id: string;
  type: string;
  status: 'passed' | 'scheduled' | 'in_review';
  inspector?: string;
  date: Date;
  score?: number;
  notes?: string;
}

export interface ProjectMessage {
  id: string;
  sender: string;
  role: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  icon: string;
}

export interface ClientProject {
  id: string;
  progress: ProjectProgress;
  budget: BudgetOverview;
  inspections: QualityInspection[];
  messages: ProjectMessage[];
}
