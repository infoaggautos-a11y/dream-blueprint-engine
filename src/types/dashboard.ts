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
