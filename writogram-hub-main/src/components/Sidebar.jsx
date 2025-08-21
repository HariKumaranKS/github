import { cn } from "@/lib/utils.js";
import { Button } from "@/components/ui/button.jsx";

export const Sidebar = ({ activeSection, onSectionChange, onRollDice }) => {
  const sections = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "books", label: "My Books", icon: "📚" },
    { id: "films", label: "My Films", icon: "🎬" },
    { id: "community", label: "Community", icon: "👥" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border min-h-screen p-4">
      <div className="space-y-6">
        {/* User Profile */}
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">JD</span>
          </div>
          <h3 className="font-semibold text-sidebar-foreground">John Doe</h3>
          <p className="text-sm text-sidebar-foreground/70">Author & Filmmaker</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                activeSection === section.id && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              onClick={() => onSectionChange(section.id)}
            >
              <span className="text-lg">{section.icon}</span>
              {section.label}
            </Button>
          ))}
        </nav>

        {/* Random Dice Button */}
        <div className="pt-4 border-t border-sidebar-border">
          <Button
            onClick={onRollDice}
            variant="outline"
            className="w-full gap-2 bg-gradient-warm hover:bg-gradient-warm/90 text-foreground"
          >
            🎲 Roll the Dice
          </Button>
        </div>
      </div>
    </aside>
  );
}; 