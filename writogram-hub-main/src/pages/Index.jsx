import { useState } from "react";
import { Header } from "@/components/Header.jsx";
import { Sidebar } from "@/components/Sidebar.jsx";
import { MainContent } from "@/components/MainContent.jsx";
import { useToast } from "@/hooks/use-toast.js";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { toast } = useToast();

  const handleRollDice = () => {
    const suggestions = [
      "The Quantum Café - A sci-fi romance",
      "Midnight Detective - A noir thriller",
      "Garden of Memories - A fantasy drama",
      "City of Shadows - An urban mystery",
      "The Last Bookstore - A dystopian tale"
    ];

    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    toast({
      title: "🎲 Random Discovery!",
      description: randomSuggestion,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onRollDice={handleRollDice}
        />
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default Index;