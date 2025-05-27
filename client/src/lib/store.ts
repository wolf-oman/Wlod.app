import { create } from 'zustand';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  technology: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  joinedAt: Date;
}

interface AppState {
  // Chat state
  messages: Message[];
  isTyping: boolean;
  
  // Projects state
  projects: Project[];
  activeProject: Project | null;
  
  // Team state
  teamMembers: TeamMember[];
  
  // UI state
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  
  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setIsTyping: (typing: boolean) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  setActiveProject: (project: Project | null) => void;
  addTeamMember: (member: Omit<TeamMember, 'id' | 'joinedAt'>) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  messages: [
    {
      id: '1',
      type: 'ai',
      content: 'مرحباً! أنا مساعدك الذكي في WolfOmanAI. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ],
  isTyping: false,
  projects: [],
  activeProject: null,
  teamMembers: [],
  sidebarOpen: false,
  theme: 'dark',

  // Actions
  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    set((state) => ({
      messages: [...state.messages, newMessage]
    }));
  },

  setIsTyping: (typing) => set({ isTyping: typing }),

  addProject: (project) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    set((state) => ({
      projects: [...state.projects, newProject]
    }));
  },

  updateProject: (id, updates) => {
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      )
    }));
  },

  setActiveProject: (project) => set({ activeProject: project }),

  addTeamMember: (member) => {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
      joinedAt: new Date()
    };
    set((state) => ({
      teamMembers: [...state.teamMembers, newMember]
    }));
  },

  updateTeamMember: (id, updates) => {
    set((state) => ({
      teamMembers: state.teamMembers.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      )
    }));
  },

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setTheme: (theme) => set({ theme })
}));
