import { Card, CardContent } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { BookOpen, Clock, Star, Eye } from "lucide-react";

export const BookCard = ({ book, onOpenBook }) => {
  const getGenreColor = (genre) => {
    const colors = {
      'Sci-Fi': 'bg-blue-100 text-blue-800',
      'Fantasy': 'bg-purple-100 text-purple-800',
      'Mystery': 'bg-gray-100 text-gray-800',
      'Romance': 'bg-pink-100 text-pink-800',
      'Thriller': 'bg-red-100 text-red-800',
      'Drama': 'bg-orange-100 text-orange-800',
      'Adventure': 'bg-green-100 text-green-800'
    };
    return colors[genre] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-orange-200">
      <CardContent className="p-6">
        {/* Book Cover */}
        <div className="relative mb-4">
          <div className={`w-full h-48 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-500 shadow-lg group-hover:shadow-xl ${
            book.genre === 'Sci-Fi' ? 'bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600' :
            book.genre === 'Fantasy' ? 'bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600' :
            book.genre === 'Mystery' ? 'bg-gradient-to-br from-gray-600 via-slate-700 to-zinc-800' :
            book.genre === 'Romance' ? 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-600' :
            book.genre === 'Thriller' ? 'bg-gradient-to-br from-red-600 via-orange-500 to-amber-600' :
            book.genre === 'Drama' ? 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500' :
            'bg-gradient-to-br from-amber-100 via-orange-100 to-red-100'
          }`}>
            <div className="text-center relative">
              {/* Genre-specific icons */}
              <span className={`text-6xl mb-2 block drop-shadow-lg ${
                book.genre === 'Sci-Fi' ? 'animate-pulse' :
                book.genre === 'Fantasy' ? 'animate-bounce' :
                book.genre === 'Mystery' ? 'animate-ping' :
                book.genre === 'Romance' ? 'animate-pulse' :
                book.genre === 'Thriller' ? 'animate-pulse' :
                'animate-none'
              }`}>
                {book.genre === 'Sci-Fi' ? '🚀' :
                 book.genre === 'Fantasy' ? '🐉' :
                 book.genre === 'Mystery' ? '🔍' :
                 book.genre === 'Romance' ? '💕' :
                 book.genre === 'Thriller' ? '⚡' :
                 book.genre === 'Drama' ? '🎭' : '📚'}
              </span>
              <div className="w-16 h-1 bg-white/30 rounded-full mx-auto backdrop-blur-sm"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-2 left-2 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm"></div>
              <div className="absolute top-4 right-4 w-4 h-4 bg-white/30 rounded-full backdrop-blur-sm"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>
          
          {/* Status Badge */}
          <Badge 
            className={`absolute top-2 right-2 ${getGenreColor(book.genre)}`}
          >
            {book.genre}
          </Badge>
          
          {/* Progress Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
              style={{ width: `${book.progress}%` }}
            />
          </div>
        </div>

        {/* Book Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
            {book.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {book.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{book.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{book.rating}</span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">
                {book.author.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-600">{book.author}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onOpenBook(book);
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read Now
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
