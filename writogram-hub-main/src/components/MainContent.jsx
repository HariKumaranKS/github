import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ContentCard } from "@/components/ContentCard.jsx";
import { BookCard } from "@/components/BookCard.jsx";
import { InteractiveBook } from "@/components/InteractiveBook.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { Link } from "react-router-dom";

export const MainContent = ({ activeSection }) => {
  const { toast } = useToast();
  const [selectedBook, setSelectedBook] = useState(null);

  // Sample books data
  const books = [
    {
      id: 1,
      title: "The Quantum Café",
      author: "Sarah Johnson",
      genre: "Sci-Fi",
      description: "A mysterious café where quantum coffee reveals forgotten memories and parallel realities.",
      progress: 75,
      rating: 4.8,
      readTime: "15 min",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Midnight Detective",
      author: "Michael Chen",
      genre: "Mystery",
      description: "A noir thriller set in a cyberpunk city where nothing is as it seems.",
      progress: 45,
      rating: 4.6,
      readTime: "12 min",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Garden of Memories",
      author: "Emma Rodriguez",
      genre: "Fantasy",
      description: "A magical garden where memories bloom as flowers and secrets grow in the shadows.",
      progress: 90,
      rating: 4.9,
      readTime: "20 min",
      status: "Review"
    },
    {
      id: 4,
      title: "City of Shadows",
      author: "David Kim",
      genre: "Thriller",
      description: "An urban mystery where the city's dark underbelly hides supernatural secrets.",
      progress: 30,
      rating: 4.4,
      readTime: "18 min",
      status: "In Progress"
    },
    {
      id: 5,
      title: "The Last Bookstore",
      author: "Lisa Thompson",
      genre: "Drama",
      description: "A dystopian tale about the last bookstore in a world where reading is forbidden.",
      progress: 60,
      rating: 4.7,
      readTime: "25 min",
      status: "In Progress"
    },
    {
      id: 6,
      title: "Starlight Serenade",
      author: "Alex Rivera",
      genre: "Romance",
      description: "A cosmic romance between two star-crossed lovers from different galaxies.",
      progress: 85,
      rating: 4.5,
      readTime: "14 min",
      status: "Review"
    }
  ];

  const handleOpenBook = (book) => {
    setSelectedBook(book);
  };

  const handleCloseBook = () => {
    setSelectedBook(null);
  };

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
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  My Books Library 📚
                </h1>
                <p className="text-muted-foreground mt-1">
                  Discover and read your collection of stories
                </p>
              </div>
              <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                + Add New Book
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">📖</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Books</p>
                    <p className="text-2xl font-bold">{books.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-warm rounded-lg flex items-center justify-center">
                    <span className="text-foreground font-bold">📚</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold">{books.filter(b => b.status === 'In Progress').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-cool rounded-lg flex items-center justify-center">
                    <span className="text-foreground font-bold">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold">4.7</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✅</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{books.filter(b => b.status === 'Review').length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Books</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">All Genres</Button>
                  <Button variant="outline" size="sm">Sort by: Recent</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onOpenBook={handleOpenBook}
                  />
                ))}
              </div>
            </div>
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
      
      {/* Interactive Book Modal */}
      {selectedBook && (
        <InteractiveBook 
          book={selectedBook} 
          onClose={handleCloseBook}
        />
      )}
    </main>
  );
}; 