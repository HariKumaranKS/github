import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ContentCard } from "@/components/ContentCard.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { Link } from "react-router-dom";

export const MainContent = ({ activeSection }) => {
  const { toast } = useToast();

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome back, John! 👋
              </h1>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                + Create New
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">📚</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Books</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-warm rounded-lg flex items-center justify-center">
                    <span className="text-foreground font-bold">🎬</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Films</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-cool rounded-lg flex items-center justify-center">
                    <span className="text-foreground font-bold">👥</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Followers</p>
                    <p className="text-2xl font-bold">1.2k</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Authors Section */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Top Authors of the Week
                </h2>
                <Link to="/top-authors">
                  <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                    View All
                  </Button>
                </Link>
              </div>
              <p className="text-gray-600 mb-4">Discover the most popular authors ranked by ratings and popularity</p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/60?img=1" alt="1st" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                  <img src="https://i.pravatar.cc/60?img=2" alt="2nd" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                  <img src="https://i.pravatar.cc/60?img=3" alt="3rd" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                  <img src="https://i.pravatar.cc/60?img=4" alt="4th" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                  <img src="https://i.pravatar.cc/60?img=5" alt="5th" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">Sarah Johnson</p>
                  <p>1st Place Winner</p>
                </div>
              </div>
            </div>

            {/* Recent Content */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ContentCard
                  title="The Quantum Café"
                  type="book"
                  progress={75}
                  status="In Progress"
                  lastModified="2 days ago"
                />
                <ContentCard
                  title="Midnight Detective"
                  type="film"
                  progress={45}
                  status="In Progress"
                  lastModified="1 week ago"
                />
                <ContentCard
                  title="Garden of Memories"
                  type="book"
                  progress={90}
                  status="Review"
                  lastModified="3 days ago"
                />
              </div>
            </div>
          </div>
        );

      case "books":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Books</h1>
            <p className="text-muted-foreground">Manage your book projects here.</p>
          </div>
        );

      case "films":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Films</h1>
            <p className="text-muted-foreground">Manage your film projects here.</p>
          </div>
        );

      case "community":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Community</h1>
            <p className="text-muted-foreground">Connect with other creators.</p>
          </div>
        );

      case "analytics":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Analytics</h1>
            <p className="text-muted-foreground">View your content performance.</p>
          </div>
        );

      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings.</p>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome to Writogram</h1>
            <p className="text-muted-foreground">Select a section from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 bg-background overflow-auto">
      {renderContent()}
    </main>
  );
}; 