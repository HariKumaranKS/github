import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button.jsx";
import { X, ChevronLeft, ChevronRight, RotateCcw, BookOpen } from "lucide-react";

export const InteractiveBook = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
  const [flipProgress, setFlipProgress] = useState(0);
  const [cornerHover, setCornerHover] = useState(null);
  const bookRef = useRef(null);
  const animationRef = useRef(null);

  // Sample book content with dynamic content
  const getBookContent = (bookTitle) => {
    const bookContents = {
      "The Quantum Café": [
        {
          page: 1,
          type: "title",
          content: {
            title: "The Quantum Café",
            subtitle: "A Sci-Fi Adventure",
            author: "Sarah Johnson",
            image: "🚀"
          }
        },
        {
          page: 2,
          type: "content",
          content: {
            text: "The neon lights of the café flickered like distant stars, casting an otherworldly glow across the polished chrome countertops. Sarah adjusted her quantum goggles and took a deep breath of the artificially oxygenated air.",
            image: "☕"
          }
        },
        {
          page: 3,
          type: "content",
          content: {
            text: '"One quantum coffee, please," she said to the android barista, whose holographic face shimmered with a practiced smile. The machine whirred to life, processing her request through layers of probability matrices.',
            image: "🤖"
          }
        },
        {
          page: 4,
          type: "content",
          content: {
            text: "The coffee arrived in a glass orb that seemed to contain its own miniature galaxy. Swirls of cream danced through the dark liquid like cosmic clouds, and when Sarah took her first sip, she felt a strange tingling sensation spread through her mind.",
            image: "🌌"
          }
        },
        {
          page: 5,
          type: "content",
          content: {
            text: '"This isn\'t just coffee," she whispered, her voice barely audible over the ambient hum of the café\'s quantum processors. The android barista nodded knowingly, its holographic eyes twinkling with ancient wisdom.',
            image: "✨"
          }
        },
        {
          page: 6,
          type: "content",
          content: {
            text: '"It\'s a memory extractor," the android explained. "Each sip reveals a forgotten moment from your past, or perhaps from a past that never was. The choice is yours."',
            image: "🧠"
          }
        }
      ],
      "Midnight Detective": [
        {
          page: 1,
          type: "title",
          content: {
            title: "Midnight Detective",
            subtitle: "A Cyberpunk Mystery",
            author: "Michael Chen",
            image: "🔍"
          }
        },
        {
          page: 2,
          type: "content",
          content: {
            text: "Rain fell like liquid shadows on the neon-lit streets of Neo-Tokyo. Detective Alex Chen pulled his trench coat tighter around his shoulders as he stepped into the dimly lit alleyway.",
            image: "🌧️"
          }
        },
        {
          page: 3,
          type: "content",
          content: {
            text: "His neural implant buzzed with an incoming message. It was from the precinct—another case, another mystery in this city that never slept. But this one felt different.",
            image: "💻"
          }
        },
        {
          page: 4,
          type: "content",
          content: {
            text: "The victim's memories had been completely erased, leaving behind only fragments of digital consciousness. 'Welcome to the future of crime,' Alex muttered to himself.",
            image: "⚡"
          }
        },
        {
          page: 5,
          type: "content",
          content: {
            text: "He activated his cybernetic eye scanner. The world around him transformed into a web of data streams, each one a potential clue in this digital nightmare.",
            image: "👁️"
          }
        },
        {
          page: 6,
          type: "content",
          content: {
            text: "The crime scene was a high-tech apartment in the upper levels of the city. The victim, a renowned AI researcher, lay motionless on her bed, her neural interface still glowing with residual energy.",
            image: "🏢"
          }
        }
      ]
    };
    
    return bookContents[bookTitle] || bookContents["The Quantum Café"];
  };

  const bookContent = getBookContent(book?.title);
  const totalPages = bookContent.length;

  // Page turn with smooth animation
  const turnPage = useCallback((direction) => {
    if (isFlipping) return;
    
    const newPage = direction === 'next' 
      ? Math.min(currentPage + 2, totalPages - 2)
      : Math.max(currentPage - 2, 0);
    
    if (newPage === currentPage) return;
    
    setIsFlipping(true);
    setFlipDirection(direction);
    setFlipProgress(0);
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Smooth animation using requestAnimationFrame
    const animate = () => {
      setFlipProgress(prev => {
        const newProgress = prev + 0.03;
        if (newProgress >= 1) {
          setCurrentPage(newPage);
          setIsFlipping(false);
          setFlipDirection(null);
          setFlipProgress(0);
          return 0;
        }
        return newProgress;
      });
      
      if (flipProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [currentPage, totalPages, isFlipping, flipProgress]);

  // Drag handlers
  const handleDragStart = useCallback((e) => {
    if (isFlipping) return;
    
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
  }, [isFlipping]);

  const handleDragMove = useCallback((e) => {
    if (!isDragging || isFlipping) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
  }, [isDragging, isFlipping, dragStartX]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || isFlipping) return;
    
    setIsDragging(false);
    const threshold = 80;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentPage > 0) {
        turnPage('prev');
      } else if (dragOffset < 0 && currentPage < totalPages - 2) {
        turnPage('next');
      }
    }
    
    setDragOffset(0);
  }, [isDragging, isFlipping, dragOffset, currentPage, totalPages, turnPage]);

  // Corner click handlers
  const handleCornerClick = useCallback((direction) => {
    turnPage(direction);
  }, [turnPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isFlipping) {
        if (event.key === 'ArrowRight' || event.key === ' ') {
          event.preventDefault();
          turnPage('next');
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          turnPage('prev');
        } else if (event.key === 'Escape') {
          event.preventDefault();
          handleClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFlipping, turnPage]);

  // Drag event listeners
  useEffect(() => {
    const bookElement = bookRef.current;
    if (!bookElement) return;

    bookElement.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    bookElement.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);

    return () => {
      bookElement.removeEventListener('mousedown', handleDragStart);
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchstart', handleDragStart);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDragStart, handleDragMove, handleDragEnd]);

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Book opening animation
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300);
  };

  const renderPageContent = (pageData) => {
    if (pageData.type === 'title') {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="text-6xl mb-6 animate-pulse">{pageData.content.image}</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{pageData.content.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{pageData.content.subtitle}</p>
          <p className="text-lg text-gray-500">by {pageData.content.author}</p>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="text-4xl mb-6 animate-bounce">{pageData.content.image}</div>
        <p className="text-lg leading-relaxed text-gray-700 text-center max-w-md">
          {pageData.content.text}
        </p>
      </div>
    );
  };

  const currentPageData = bookContent[currentPage];
  const nextPageData = bookContent[currentPage + 1];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={bookRef}
        className={`relative w-full max-w-5xl h-[85vh] bg-white rounded-lg shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing book-draggable ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${isDragging ? 'cursor-grabbing dragging' : ''}`}
        style={{
          transform: isDragging ? `translateX(${dragOffset * 0.1}px) rotateY(${dragOffset * 0.02}deg)` : 'none'
        }}
      >
        {/* Book Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-t-lg border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">{book?.title}</h1>
              <p className="text-sm text-gray-600">Pages {currentPage + 1}-{Math.min(currentPage + 2, totalPages)} of {totalPages}</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="inline-flex items-center gap-1">
                  <span className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></span>
                  Drag pages, click corners, or use ← → arrows
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(0)}
                disabled={currentPage === 0}
                title="Go to first page"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                title="Close book"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700">
                {currentPage + 1} / {totalPages}
              </span>
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Book Content */}
        <div className="absolute top-20 left-0 right-0 bottom-16 overflow-hidden">
          <div className="h-full flex relative">
            {/* Book Spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-400 to-gray-600 transform -translate-x-1/2 z-10 shadow-lg"></div>
            
            {/* Left Page */}
            <div className="w-1/2 h-full bg-gradient-to-r from-amber-50 via-orange-50 to-white p-8 border-r border-gray-200 relative">
              <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-200/50 to-transparent"></div>
              <div className="h-full overflow-y-auto">
                {renderPageContent(currentPageData)}
              </div>
              <div className="absolute bottom-4 left-8 text-sm text-gray-500 font-serif">
                {currentPage + 1}
              </div>
            </div>

            {/* Right Page */}
            <div className="w-1/2 h-full bg-gradient-to-l from-amber-50 via-orange-50 to-white p-8 relative">
              <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-200/50 to-transparent"></div>
              <div className="h-full overflow-y-auto">
                {nextPageData ? (
                  renderPageContent(nextPageData)
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-4xl animate-pulse">📖</span>
                      </div>
                      <p className="text-lg font-medium font-serif">The End</p>
                      <p className="text-sm mt-2 text-gray-500">Thank you for reading</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 right-8 text-sm text-gray-500 font-serif">
                {currentPage + 2}
              </div>
            </div>

            {/* Page Corner Turn Indicators */}
            {currentPage > 0 && (
              <div 
                className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-bl-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
                onClick={() => handleCornerClick('prev')}
                onMouseEnter={() => setCornerHover('prev')}
                onMouseLeave={() => setCornerHover(null)}
                style={{
                  transform: cornerHover === 'prev' ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                  boxShadow: cornerHover === 'prev' ? '0 8px 25px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.2)'
                }}
                title="Previous page"
              >
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  ←
                </div>
              </div>
            )}

            {currentPage < totalPages - 2 && (
              <div 
                className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-br-full cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg z-20"
                onClick={() => handleCornerClick('next')}
                onMouseEnter={() => setCornerHover('next')}
                onMouseLeave={() => setCornerHover(null)}
                style={{
                  transform: cornerHover === 'next' ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                  boxShadow: cornerHover === 'next' ? '0 8px 25px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.2)'
                }}
                title="Next page"
              >
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  →
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Realistic Page Flip Animation */}
        {isFlipping && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-amber-50 via-orange-50 to-white rounded-lg ${
                flipDirection === 'next' ? 'origin-right left-1/2' : 'origin-left left-0'
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${
                  flipDirection === 'next' 
                    ? `${-flipProgress * 180}deg` 
                    : `${flipProgress * 180}deg`
                })`,
                transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
                zIndex: 20,
                boxShadow: `${
                  flipDirection === 'next' 
                    ? `${-flipProgress * 20}px 0 ${flipProgress * 30}px rgba(0,0,0,0.3)` 
                    : `${flipProgress * 20}px 0 ${flipProgress * 30}px rgba(0,0,0,0.3)`
                }`
              }}
            >
              <div className="h-full p-8 flex items-center justify-center">
                <div className="text-center">
                  <div 
                    className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center shadow-lg"
                    style={{
                      transform: `translateY(${-flipProgress * 10}px) scale(${1 + flipProgress * 0.1})`,
                      boxShadow: `0 ${flipProgress * 10}px ${flipProgress * 20}px rgba(0,0,0,0.3)`
                    }}
                  >
                    <span className="text-3xl">📄</span>
                  </div>
                  <p className="text-lg font-medium text-gray-600">
                    {flipDirection === 'next' ? 'Turning page...' : 'Going back...'}
                  </p>
                  <div className="mt-2 text-sm text-gray-500">
                    {Math.round(flipProgress * 100)}% complete
                  </div>
                </div>
              </div>
            </div>
            
            {/* Page shadow and curl effects */}
            <div 
              className={`absolute top-0 h-full w-1/2 bg-black/20 rounded-lg ${
                flipDirection === 'next' ? 'left-1/2' : 'left-0'
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${
                  flipDirection === 'next' 
                    ? `${-flipProgress * 180}deg` 
                    : `${flipProgress * 180}deg`
                })`,
                transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
                zIndex: 19,
                opacity: flipProgress * 0.5
              }}
            />
            
            <div 
              className={`absolute top-0 h-full w-8 bg-gradient-to-r from-gray-300/50 to-transparent ${
                flipDirection === 'next' ? 'left-0 left-1/2' : 'right-0 left-0'
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${
                  flipDirection === 'next' 
                    ? `${-flipProgress * 90}deg` 
                    : `${flipProgress * 90}deg`
                }) translateZ(${flipProgress * 2}px)`,
                transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
                zIndex: 21,
                opacity: 1 - flipProgress
              }}
            />
          </div>
        )}

        {/* Drag Feedback */}
        {isDragging && (
          <div className="absolute inset-0 pointer-events-none">
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              dragOffset > 50 ? 'opacity-100' : dragOffset < -50 ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                dragOffset > 50 ? 'bg-blue-500/20' : 'bg-orange-500/20'
              }`}>
                <span className="text-2xl">
                  {dragOffset > 50 ? '←' : '→'}
                </span>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-200 ${
                  dragOffset > 0 ? 'bg-blue-500' : 'bg-orange-500'
                }`}
                style={{ 
                  width: `${Math.min(Math.abs(dragOffset) / 2, 100)}%`,
                  transform: dragOffset > 0 ? 'translateX(0)' : 'translateX(100%)'
                }}
              />
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-b-lg border-t">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => turnPage('prev')}
              disabled={currentPage === 0 || isFlipping}
              className="flex items-center gap-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(totalPages / 2) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index * 2)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentPage / 2) === index 
                      ? 'bg-orange-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={`Go to page ${index * 2 + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => turnPage('next')}
              disabled={currentPage >= totalPages - 2 || isFlipping}
              className="flex items-center gap-2 bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
