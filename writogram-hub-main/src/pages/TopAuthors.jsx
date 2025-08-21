import React from "react";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";

const TopAuthors = () => {
  const topAuthors = [
    { id: 1, name: "Sarah Johnson", rank: "1st Place", image: "https://i.pravatar.cc/60?img=1" },
    { id: 2, name: "Michael Chen", rank: "2nd", image: "https://i.pravatar.cc/60?img=2" },
    { id: 3, name: "Emma Rodriguez", rank: "3rd", image: "https://i.pravatar.cc/60?img=3" },
    { id: 4, name: "David Kim", rank: "4th", image: "https://i.pravatar.cc/60?img=4" },
    { id: 5, name: "Lisa Thompson", rank: "5th", image: "https://i.pravatar.cc/60?img=5" },
    { id: 6, name: "Alex Morgan", rank: "6th", image: "https://i.pravatar.cc/60?img=6" },
    { id: 7, name: "Zara Williams", rank: "7th", image: "https://i.pravatar.cc/60?img=7" },
    { id: 8, name: "James Wilson", rank: "8th", image: "https://i.pravatar.cc/60?img=8" },
    { id: 9, name: "Maria Garcia", rank: "9th", image: "https://i.pravatar.cc/60?img=9" },
    { id: 10, name: "Robert Lee", rank: "10th", image: "https://i.pravatar.cc/60?img=10" },
  ];

  const genreAuthors = {
    horror: [
      { name: "Stephen King", image: "https://i.pravatar.cc/60?img=11" },
      { name: "Shirley Jackson", image: "https://i.pravatar.cc/60?img=12" },
      { name: "Clive Barker", image: "https://i.pravatar.cc/60?img=13" },
    ],
    scifi: [
      { name: "Isaac Asimov", image: "https://i.pravatar.cc/60?img=14" },
      { name: "Ursula K. Le Guin", image: "https://i.pravatar.cc/60?img=15" },
      { name: "Arthur C. Clarke", image: "https://i.pravatar.cc/60?img=16" },
    ],
    adventure: [
      { name: "Jules Verne", image: "https://i.pravatar.cc/60?img=17" },
      { name: "Jack London", image: "https://i.pravatar.cc/60?img=18" },
      { name: "H. Rider Haggard", image: "https://i.pravatar.cc/60?img=19" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Top 10 Authors of the Week
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ranked by Ratings & Popularity
          </p>
        </div>

        {/* Animated Circle Layout */}
        <div className="flex justify-center mb-16">
          <div className="relative w-96 h-96 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 shadow-lg">
            {/* Ring Borders */}
            <div className="absolute inset-0 border-2 border-orange-200 rounded-full"></div>
            <div className="absolute inset-4 border border-orange-200 rounded-full"></div>
            <div className="absolute inset-8 border border-orange-200 rounded-full"></div>
            <div className="absolute inset-12 border border-orange-200 rounded-full"></div>

            {/* Outer Ring (10th, 9th, 8th) */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <img 
                    src={topAuthors[9].image} 
                    alt={topAuthors[9].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[9].rank}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="relative">
                  <img 
                    src={topAuthors[8].image} 
                    alt={topAuthors[8].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[8].rank}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="relative">
                  <img 
                    src={topAuthors[7].image} 
                    alt={topAuthors[7].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[7].rank}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Ring (7th, 6th, 5th) */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
              <div className="absolute top-8 right-8">
                <div className="relative">
                  <img 
                    src={topAuthors[6].image} 
                    alt={topAuthors[6].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[6].rank}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 right-12">
                <div className="relative">
                  <img 
                    src={topAuthors[5].image} 
                    alt={topAuthors[5].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[5].rank}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-12 left-8">
                <div className="relative">
                  <img 
                    src={topAuthors[4].image} 
                    alt={topAuthors[4].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[4].rank}
                  </div>
                </div>
              </div>
            </div>

            {/* Inner Ring (4th, 3rd, 2nd) */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-16 right-16">
                <div className="relative">
                  <img 
                    src={topAuthors[3].image} 
                    alt={topAuthors[3].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[3].rank}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-16 right-16">
                <div className="relative">
                  <img 
                    src={topAuthors[2].image} 
                    alt={topAuthors[2].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[2].rank}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-16 left-16">
                <div className="relative">
                  <img 
                    src={topAuthors[1].image} 
                    alt={topAuthors[1].name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                    {topAuthors[1].rank}
                  </div>
                </div>
              </div>
            </div>

            {/* Center - 1st Place */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <img 
                  src={topAuthors[0].image} 
                  alt={topAuthors[0].name}
                  className="w-16 h-16 rounded-full border-4 border-orange-300 shadow-lg"
                />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-orange-600">
                  {topAuthors[0].rank}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Genre Sections */}
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Horror Authors */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-2xl">👻</span>
                Top Horror Authors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {genreAuthors.horror.map((author, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <span className="font-medium text-gray-800">{author.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sci-Fi Authors */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                Top Sci-Fi Authors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {genreAuthors.scifi.map((author, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <span className="font-medium text-gray-800">{author.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Adventure Authors */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-2xl">🗺️</span>
                Top Adventure Authors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {genreAuthors.adventure.map((author, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className="w-10 h-10 rounded-full border-2 border-gray-200"
                    />
                    <span className="font-medium text-gray-800">{author.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="bg-white hover:bg-orange-50 border-orange-200 text-orange-700"
            onClick={() => window.history.back()}
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopAuthors; 