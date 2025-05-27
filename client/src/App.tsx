import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import NewHome from "@/pages/new-home";
import Chat from "@/pages/chat";
import CodeGenerator from "@/pages/code-generator";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={NewHome} />
      <Route path="/chat" component={Chat} />
<Route path="/editor" component={EditorPage} />
      <Route path="/code-generator" component={CodeGenerator} />
      <Route path="/legacy" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
