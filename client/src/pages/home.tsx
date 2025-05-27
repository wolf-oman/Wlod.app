import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { QuotesSection } from "@/components/sections/quotes-section";
import { ChatInterface } from "@/components/sections/chat-interface";
import { CodeEditor } from "@/components/sections/code-editor";
import { Dashboard } from "@/components/sections/dashboard";
import { TeamManagement } from "@/components/sections/team-management";
import { DeploymentSection } from "@/components/sections/deployment-section";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--cyber-dark))] via-[hsl(var(--cyber-navy))] to-[hsl(var(--cyber-slate))] text-white overflow-x-hidden">
      <LoadingScreen isVisible={isLoading} />
      
      {!isLoading && (
        <>
          <Navigation />
          <main className="pt-16">
            <HeroSection />
            <FeaturesSection />
            <QuotesSection />
            <ChatInterface />
            <CodeEditor />
            <Dashboard />
            <TeamManagement />
            <DeploymentSection />
          </main>
          <Footer />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}
