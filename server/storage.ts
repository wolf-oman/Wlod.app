import { users, projects, messages, teamMembers, deployments, activities, type User, type InsertUser, type Project, type InsertProject, type Message, type InsertMessage, type TeamMember, type InsertTeamMember, type Deployment, type InsertDeployment, type Activity, type InsertActivity } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User>;
  deleteUser(id: number): Promise<void>;
  getAllUsers(): Promise<User[]>;

  // Project methods
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByOwner(ownerId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  getAllProjects(): Promise<Project[]>;
  getProjectCount(ownerId?: number): Promise<number>;
  getActiveProjectCount(ownerId?: number): Promise<number>;

  // Message methods
  getMessage(id: number): Promise<Message | undefined>;
  getMessagesByProject(projectId: number, limit?: number): Promise<Message[]>;
  getMessagesByUser(userId: number, limit?: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  deleteMessage(id: number): Promise<void>;
  getAllMessages(limit?: number): Promise<Message[]>;
  getMessageCount(userId?: number): Promise<number>;

  // Team member methods
  getTeamMember(id: number): Promise<TeamMember | undefined>;
  getTeamMembersByProject(projectId: number): Promise<TeamMember[]>;
  getTeamMembersByUser(userId: number): Promise<TeamMember[]>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, updates: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<void>;
  getTeamMemberCount(projectId?: number): Promise<number>;

  // Deployment methods
  getDeployment(id: number): Promise<Deployment | undefined>;
  getDeploymentsByProject(projectId: number): Promise<Deployment[]>;
  createDeployment(deployment: InsertDeployment): Promise<Deployment>;
  updateDeployment(id: number, updates: Partial<InsertDeployment>): Promise<Deployment>;
  deleteDeployment(id: number): Promise<void>;
  getAllDeployments(): Promise<Deployment[]>;

  // Activity methods
  getActivity(id: number): Promise<Activity | undefined>;
  getActivitiesByProject(projectId: number, limit?: number): Promise<Activity[]>;
  getActivitiesByUser(userId: number, limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  deleteActivity(id: number): Promise<void>;
  getAllActivities(limit?: number): Promise<Activity[]>;
  getRecentActivities(userId?: number, limit?: number): Promise<Activity[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private messages: Map<number, Message>;
  private teamMembers: Map<number, TeamMember>;
  private deployments: Map<number, Deployment>;
  private activities: Map<number, Activity>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.messages = new Map();
    this.teamMembers = new Map();
    this.deployments = new Map();
    this.activities = new Map();
    this.currentId = 1;

    // Initialize with some default data
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    // Create default admin user
    const adminUser = await this.createUser({
      username: "admin",
      email: "admin@wolfomanai.com",
      password: "admin123",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
      status: "online"
    });

    // Create some demo users
    const user1 = await this.createUser({
      username: "ahmed_dev",
      email: "ahmed@wolfomanai.com",
      password: "password123",
      role: "developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
      status: "online"
    });

    const user2 = await this.createUser({
      username: "sara_designer",
      email: "sara@wolfomanai.com",
      password: "password123",
      role: "designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
      status: "busy"
    });

    const user3 = await this.createUser({
      username: "khalid_backend",
      email: "khalid@wolfomanai.com",
      password: "password123",
      role: "developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=64&h=64",
      status: "offline"
    });

    // Create demo projects
    const project1 = await this.createProject({
      name: "تطبيق إدارة المهام",
      description: "تطبيق متقدم لإدارة المهام والمشاريع بتصميم cyberpunk",
      status: "active",
      progress: 75,
      technology: "React + TypeScript",
      ownerId: adminUser.id,
      config: {
        theme: "cyberpunk",
        features: ["authentication", "real-time", "analytics"]
      }
    });

    const project2 = await this.createProject({
      name: "تطبيق الطقس",
      description: "تطبيق للطقس مع واجهة مستخدم جذابة",
      status: "active",
      progress: 50,
      technology: "React Native",
      ownerId: adminUser.id,
      config: {
        platform: "mobile",
        apis: ["weather-api", "geolocation"]
      }
    });

    const project3 = await this.createProject({
      name: "API خدمات الويب",
      description: "واجهة برمجية متقدمة للخدمات السحابية",
      status: "completed",
      progress: 100,
      technology: "Node.js + Express",
      ownerId: adminUser.id,
      config: {
        deployment: "aws",
        database: "postgresql"
      }
    });

    // Add team members to projects
    await this.createTeamMember({
      projectId: project1.id,
      userId: user1.id,
      role: "developer",
      permissions: { read: true, write: true, deploy: false }
    });

    await this.createTeamMember({
      projectId: project1.id,
      userId: user2.id,
      role: "designer",
      permissions: { read: true, write: true, deploy: false }
    });

    await this.createTeamMember({
      projectId: project2.id,
      userId: user3.id,
      role: "developer",
      permissions: { read: true, write: true, deploy: true }
    });

    // Create deployments
    await this.createDeployment({
      projectId: project1.id,
      version: "v2.1.0",
      status: "live",
      environment: "production",
      config: {
        url: "https://task-manager.wolfomanai.com",
        server: "aws-ec2"
      }
    });

    await this.createDeployment({
      projectId: project2.id,
      version: "v1.3.0-beta",
      status: "pending",
      environment: "staging",
      config: {
        url: "https://staging-weather.wolfomanai.com",
        server: "aws-ec2"
      }
    });

    // Create some activities
    await this.createActivity({
      userId: user1.id,
      projectId: project1.id,
      action: "task_completed",
      description: "أكمل مهمة تطوير API المستخدمين",
      metadata: { taskId: "auth-001" }
    });

    await this.createActivity({
      userId: user2.id,
      projectId: project1.id,
      action: "design_uploaded",
      description: "رفعت تصاميم جديدة للمراجعة",
      metadata: { fileCount: 5, designType: "UI mockups" }
    });

    await this.createActivity({
      userId: user3.id,
      projectId: project2.id,
      action: "code_merged",
      description: "دمج تحديثات قاعدة البيانات",
      metadata: { branch: "feature/database-updates", commits: 3 }
    });
  }

  private getNextId(): number {
    return this.currentId++;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.getNextId();
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date()
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    this.users.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByOwner(ownerId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.ownerId === ownerId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.getNextId();
    const now = new Date();
    const project: Project = {
      ...insertProject,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project> {
    const project = this.projects.get(id);
    if (!project) {
      throw new Error("Project not found");
    }
    const updatedProject: Project = {
      ...project,
      ...updates,
      updatedAt: new Date()
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
    // Also delete related data
    Array.from(this.teamMembers.entries()).forEach(([tmId, tm]) => {
      if (tm.projectId === id) this.teamMembers.delete(tmId);
    });
    Array.from(this.deployments.entries()).forEach(([dId, d]) => {
      if (d.projectId === id) this.deployments.delete(dId);
    });
    Array.from(this.activities.entries()).forEach(([aId, a]) => {
      if (a.projectId === id) this.activities.delete(aId);
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectCount(ownerId?: number): Promise<number> {
    if (ownerId) {
      return Array.from(this.projects.values()).filter(p => p.ownerId === ownerId).length;
    }
    return this.projects.size;
  }

  async getActiveProjectCount(ownerId?: number): Promise<number> {
    const projects = Array.from(this.projects.values()).filter(p => 
      p.status === "active" && (!ownerId || p.ownerId === ownerId)
    );
    return projects.length;
  }

  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }

  async getMessagesByProject(projectId: number, limit = 50): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getMessagesByUser(userId: number, limit = 50): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.getNextId();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }

  async deleteMessage(id: number): Promise<void> {
    this.messages.delete(id);
  }

  async getAllMessages(limit = 50): Promise<Message[]> {
    return Array.from(this.messages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getMessageCount(userId?: number): Promise<number> {
    if (userId) {
      return Array.from(this.messages.values()).filter(m => m.userId === userId).length;
    }
    return this.messages.size;
  }

  // Team member methods
  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return this.teamMembers.get(id);
  }

  async getTeamMembersByProject(projectId: number): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(tm => tm.projectId === projectId);
  }

  async getTeamMembersByUser(userId: number): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(tm => tm.userId === userId);
  }

  async createTeamMember(insertTeamMember: InsertTeamMember): Promise<TeamMember> {
    const id = this.getNextId();
    const teamMember: TeamMember = {
      ...insertTeamMember,
      id,
      joinedAt: new Date()
    };
    this.teamMembers.set(id, teamMember);
    return teamMember;
  }

  async updateTeamMember(id: number, updates: Partial<InsertTeamMember>): Promise<TeamMember> {
    const teamMember = this.teamMembers.get(id);
    if (!teamMember) {
      throw new Error("Team member not found");
    }
    const updatedTeamMember: TeamMember = {
      ...teamMember,
      ...updates
    };
    this.teamMembers.set(id, updatedTeamMember);
    return updatedTeamMember;
  }

  async deleteTeamMember(id: number): Promise<void> {
    this.teamMembers.delete(id);
  }

  async getTeamMemberCount(projectId?: number): Promise<number> {
    if (projectId) {
      return Array.from(this.teamMembers.values()).filter(tm => tm.projectId === projectId).length;
    }
    return this.teamMembers.size;
  }

  // Deployment methods
  async getDeployment(id: number): Promise<Deployment | undefined> {
    return this.deployments.get(id);
  }

  async getDeploymentsByProject(projectId: number): Promise<Deployment[]> {
    return Array.from(this.deployments.values())
      .filter(d => d.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createDeployment(insertDeployment: InsertDeployment): Promise<Deployment> {
    const id = this.getNextId();
    const now = new Date();
    const deployment: Deployment = {
      ...insertDeployment,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.deployments.set(id, deployment);
    return deployment;
  }

  async updateDeployment(id: number, updates: Partial<InsertDeployment>): Promise<Deployment> {
    const deployment = this.deployments.get(id);
    if (!deployment) {
      throw new Error("Deployment not found");
    }
    const updatedDeployment: Deployment = {
      ...deployment,
      ...updates,
      updatedAt: new Date()
    };
    this.deployments.set(id, updatedDeployment);
    return updatedDeployment;
  }

  async deleteDeployment(id: number): Promise<void> {
    this.deployments.delete(id);
  }

  async getAllDeployments(): Promise<Deployment[]> {
    return Array.from(this.deployments.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Activity methods
  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async getActivitiesByProject(projectId: number, limit = 20): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(a => a.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getActivitiesByUser(userId: number, limit = 20): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(a => a.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.getNextId();
    const activity: Activity = {
      ...insertActivity,
      id,
      createdAt: new Date()
    };
    this.activities.set(id, activity);
    return activity;
  }

  async deleteActivity(id: number): Promise<void> {
    this.activities.delete(id);
  }

  async getAllActivities(limit = 20): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getRecentActivities(userId?: number, limit = 10): Promise<Activity[]> {
    let activities = Array.from(this.activities.values());
    
    if (userId) {
      // Get activities for projects owned by or involving the user
      const userProjects = Array.from(this.projects.values()).filter(p => p.ownerId === userId);
      const userTeamProjects = Array.from(this.teamMembers.values())
        .filter(tm => tm.userId === userId)
        .map(tm => tm.projectId);
      
      const relevantProjectIds = new Set([
        ...userProjects.map(p => p.id),
        ...userTeamProjects
      ]);
      
      activities = activities.filter(a => 
        a.userId === userId || (a.projectId && relevantProjectIds.has(a.projectId))
      );
    }
    
    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
