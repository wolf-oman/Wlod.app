import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertMessageSchema, insertProjectSchema, insertTeamMemberSchema, insertActivitySchema, insertDeploymentSchema } from "@shared/schema";
import { z } from "zod";

interface WebSocketClient extends WebSocket {
  userId?: number;
  projectId?: number;
  room?: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time collaboration
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  const clients = new Set<WebSocketClient>();

  wss.on('connection', (ws: WebSocketClient) => {
    clients.add(ws);
    console.log('WebSocket client connected');

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        switch (message.type) {
          case 'join':
            ws.room = message.room;
            ws.userId = message.userId;
            ws.projectId = message.projectId;
            break;

          case 'chat_message':
            if (ws.userId) {
              // Save message to database
              const newMessage = await storage.createMessage({
                content: message.message,
                type: 'user',
                userId: ws.userId,
                projectId: ws.projectId || null,
                metadata: message.metadata || null
              });

              // Simulate AI response
              setTimeout(async () => {
                const aiResponse = await storage.createMessage({
                  content: await generateAIResponse(message.message),
                  type: 'ai',
                  userId: null,
                  projectId: ws.projectId || null,
                  metadata: { aiModel: 'gemini' }
                });

                // Broadcast AI response to all clients in the same room
                broadcastToRoom(ws.room!, {
                  type: 'chat_message',
                  message: aiResponse
                });
              }, 1000 + Math.random() * 2000);

              // Broadcast user message to all clients in the same room
              broadcastToRoom(ws.room!, {
                type: 'chat_message',
                message: newMessage
              });
            }
            break;

          case 'team_update':
            if (message.memberId && message.updates) {
              await storage.updateTeamMember(parseInt(message.memberId), message.updates);
              broadcastToRoom(ws.room!, {
                type: 'team_update',
                memberId: message.memberId,
                updates: message.updates
              });
            }
            break;

          case 'project_update':
            if (message.projectId && message.updates) {
              await storage.updateProject(parseInt(message.projectId), message.updates);
              broadcastToRoom(ws.room!, {
                type: 'project_update',
                projectId: message.projectId,
                updates: message.updates
              });
            }
            break;

          case 'collaboration':
            // Handle real-time collaboration events (cursor position, code changes, etc.)
            broadcastToRoom(ws.room!, {
              type: 'collaboration',
              action: message.action,
              data: message.data,
              userId: ws.userId
            });
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
      console.log('WebSocket client disconnected');
    });
  });

  function broadcastToRoom(room: string, data: any) {
    const message = JSON.stringify(data);
    clients.forEach((client) => {
      if (client.room === room && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  // AI Response generator (simulated - in production this would call Gemini API)
  async function generateAIResponse(userMessage: string): Promise<string> {
    const responses = [
      "ممتاز! دعني أساعدك في تطوير هذه الفكرة. يمكننا البدء بإنشاء هيكل المشروع الأساسي.",
      "فكرة رائعة! سأقوم بتوليد الكود المطلوب مع أفضل الممارسات في البرمجة.",
      "بالطبع! يمكنني مساعدتك في تطوير هذا التطبيق باستخدام أحدث التقنيات.",
      "رائع! دعنا نبدأ بتصميم قاعدة البيانات والهيكل العام للمشروع.",
      "سأساعدك في تطوير هذا المشروع خطوة بخطوة مع شرح كل جزء."
    ];
    
    // Simple keyword-based response selection
    if (userMessage.includes('تطبيق') || userMessage.includes('مشروع')) {
      return responses[0];
    } else if (userMessage.includes('كود') || userMessage.includes('برمجة')) {
      return responses[1];
    } else if (userMessage.includes('تصميم') || userMessage.includes('واجهة')) {
      return responses[3];
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Update user status to online
      await storage.updateUser(user.id, { status: "online" });
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      const { userId } = req.body;
      if (userId) {
        await storage.updateUser(parseInt(userId), { status: "offline" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Logout failed" });
    }
  });

  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users.map(user => ({ ...user, password: undefined })));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(parseInt(req.params.id), req.body);
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const { userId } = req.query;
      if (userId) {
        const projects = await storage.getProjectsByOwner(parseInt(userId as string));
        res.json(projects);
      } else {
        const projects = await storage.getAllProjects();
        res.json(projects);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      
      // Log activity
      await storage.createActivity({
        userId: projectData.ownerId,
        projectId: project.id,
        action: "project_created",
        description: `Created project: ${project.name}`
      });
      
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid project data" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.updateProject(parseInt(req.params.id), req.body);
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      await storage.deleteProject(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // Message routes
  app.get("/api/messages", async (req, res) => {
    try {
      const { projectId, userId, limit = 50 } = req.query;
      let messages;
      
      if (projectId) {
        messages = await storage.getMessagesByProject(parseInt(projectId as string), parseInt(limit as string));
      } else if (userId) {
        messages = await storage.getMessagesByUser(parseInt(userId as string), parseInt(limit as string));
      } else {
        messages = await storage.getAllMessages(parseInt(limit as string));
      }
      
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid message data" });
    }
  });

  // Team management routes
  app.get("/api/teams/:projectId", async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembersByProject(parseInt(req.params.projectId));
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team members" });
    }
  });

  app.post("/api/teams", async (req, res) => {
    try {
      const teamMemberData = insertTeamMemberSchema.parse(req.body);
      const teamMember = await storage.createTeamMember(teamMemberData);
      
      // Log activity
      await storage.createActivity({
        userId: teamMemberData.userId,
        projectId: teamMemberData.projectId,
        action: "team_member_added",
        description: `Added to project team`
      });
      
      res.json(teamMember);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid team member data" });
    }
  });

  app.put("/api/teams/:id", async (req, res) => {
    try {
      const teamMember = await storage.updateTeamMember(parseInt(req.params.id), req.body);
      res.json(teamMember);
    } catch (error) {
      res.status(500).json({ error: "Failed to update team member" });
    }
  });

  app.delete("/api/teams/:id", async (req, res) => {
    try {
      await storage.deleteTeamMember(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove team member" });
    }
  });

  // Deployment routes
  app.get("/api/deployments", async (req, res) => {
    try {
      const { projectId } = req.query;
      if (projectId) {
        const deployments = await storage.getDeploymentsByProject(parseInt(projectId as string));
        res.json(deployments);
      } else {
        const deployments = await storage.getAllDeployments();
        res.json(deployments);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deployments" });
    }
  });

  app.post("/api/deployments", async (req, res) => {
    try {
      const deploymentData = insertDeploymentSchema.parse(req.body);
      const deployment = await storage.createDeployment(deploymentData);
      
      // Log activity
      const project = await storage.getProject(deploymentData.projectId);
      if (project) {
        await storage.createActivity({
          userId: project.ownerId,
          projectId: project.id,
          action: "deployment_created",
          description: `Deployed ${deployment.version} to ${deployment.environment}`
        });
      }
      
      res.json(deployment);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid deployment data" });
    }
  });

  app.put("/api/deployments/:id", async (req, res) => {
    try {
      const deployment = await storage.updateDeployment(parseInt(req.params.id), req.body);
      res.json(deployment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update deployment" });
    }
  });

  // Activity routes
  app.get("/api/activities", async (req, res) => {
    try {
      const { projectId, userId, limit = 20 } = req.query;
      let activities;
      
      if (projectId) {
        activities = await storage.getActivitiesByProject(parseInt(projectId as string), parseInt(limit as string));
      } else if (userId) {
        activities = await storage.getActivitiesByUser(parseInt(userId as string), parseInt(limit as string));
      } else {
        activities = await storage.getAllActivities(parseInt(limit as string));
      }
      
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  // Analytics and dashboard routes
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const { userId } = req.query;
      
      const stats = {
        totalProjects: await storage.getProjectCount(userId ? parseInt(userId as string) : undefined),
        activeProjects: await storage.getActiveProjectCount(userId ? parseInt(userId as string) : undefined),
        totalMessages: await storage.getMessageCount(userId ? parseInt(userId as string) : undefined),
        totalTeamMembers: await storage.getTeamMemberCount(userId ? parseInt(userId as string) : undefined),
        recentActivities: await storage.getRecentActivities(userId ? parseInt(userId as string) : undefined, 10)
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
  });

  app.get("/api/analytics/project-progress", async (req, res) => {
    try {
      const { projectId } = req.query;
      if (!projectId) {
        return res.status(400).json({ error: "Project ID is required" });
      }
      
      const project = await storage.getProject(parseInt(projectId as string));
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      const activities = await storage.getActivitiesByProject(parseInt(projectId as string), 100);
      const teamMembers = await storage.getTeamMembersByProject(parseInt(projectId as string));
      const deployments = await storage.getDeploymentsByProject(parseInt(projectId as string));
      
      res.json({
        project,
        activities,
        teamMembers,
        deployments,
        progress: project.progress
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project progress" });
    }
  });

  // AI Integration routes (Google Studio/Gemini)
  app.post("/api/ai/generate-code", async (req, res) => {
    try {
      const { prompt, language = "javascript", context } = req.body;
      
      // In production, this would call the actual Gemini API
      // For now, we'll return a structured response
      const response = {
        code: generateMockCode(prompt, language),
        explanation: `Generated ${language} code based on the prompt: "${prompt}"`,
        suggestions: [
          "Consider adding error handling",
          "Add unit tests for better coverage",
          "Optimize for performance"
        ]
      };
      
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Failed to generate code" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, context, projectId } = req.body;
      
      const response = await generateAIResponse(message);
      
      // Save the conversation
      if (context?.userId) {
        await storage.createMessage({
          content: message,
          type: "user",
          userId: context.userId,
          projectId: projectId || null,
          metadata: context
        });
        
        await storage.createMessage({
          content: response,
          type: "ai",
          userId: null,
          projectId: projectId || null,
          metadata: { aiModel: "gemini" }
        });
      }
      
      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: "Failed to process AI chat" });
    }
  });

  // AI Chat endpoint with model selection
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, model = "gpt-4" } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const { aiModelsService } = await import('./ai-models');
      const response = await aiModelsService.generateChatResponse(message, model);
      
      res.json({ response });
    } catch (error) {
      console.error('Chat API Error:', error);
      res.status(500).json({ 
        error: "فشل في إنشاء الاستجابة", 
        details: error instanceof Error ? error.message : "خطأ غير معروف" 
      });
    }
  });

  // AI Code Generation endpoint with model selection
  app.post("/api/generate-code", async (req, res) => {
    try {
      const { prompt, language, model = "mistral" } = req.body;
      
      if (!prompt || !language) {
        return res.status(400).json({ error: "Prompt and language are required" });
      }

      const { aiModelsService } = await import('./ai-models');
      const code = await aiModelsService.generateCode(prompt, language, model);
      
      res.json({ code });
    } catch (error) {
      console.error('Code Generation API Error:', error);
      res.status(500).json({ 
        error: "فشل في إنشاء الكود", 
        details: error instanceof Error ? error.message : "خطأ غير معروف" 
      });
    }
  });

  // Check AI Models status
  app.get("/api/ai-status", async (req, res) => {
    try {
      const { aiModelsService } = await import('./ai-models');
      res.json({
        configured: aiModelsService.isConfigured(),
        availableModels: aiModelsService.getAvailableModels()
      });
    } catch (error) {
      res.json({ configured: false, availableModels: [] });
    }
  });

  function generateMockCode(prompt: string, language: string): string {
    const templates: Record<string, string> = {
      javascript: `// Generated JavaScript code for: ${prompt}
function handleTask() {
  try {
    // Implementation here
    console.log('Task completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error };
  }
}

export default handleTask;`,
      
      python: `# Generated Python code for: ${prompt}
def handle_task():
    """
    Implementation for the requested task
    """
    try:
        # Implementation here
        print("Task completed successfully")
        return {"success": True}
    except Exception as error:
        print(f"Error: {error}")
        return {"success": False, "error": str(error)}`,
      
      typescript: `// Generated TypeScript code for: ${prompt}
interface TaskResult {
  success: boolean;
  error?: string;
}

function handleTask(): TaskResult {
  try {
    // Implementation here
    console.log('Task completed successfully');
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export default handleTask;`
    };
    
    return templates[language] || templates.javascript;
  }

  return httpServer;
}
