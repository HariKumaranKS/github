import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button.jsx";
import { X, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export const BookReader = ({ book, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null);
  const [flipProgress, setFlipProgress] = useState(0);
  const bookRef = useRef(null);

  // Sample book content - in a real app, this would come from props or API
  const getBookContent = (bookTitle) => {
    const bookContents = {
      "The Quantum Café": [
        {
          page: 1,
          content: `
            <h1 class="book-title text-3xl font-bold mb-6 text-center text-gray-800">The Quantum Café</h1>
            <p class="text-lg leading-relaxed mb-4">
              The neon lights of the café flickered like distant stars, casting an otherworldly glow 
              across the polished chrome countertops. Sarah adjusted her quantum goggles and took a 
              deep breath of the artificially oxygenated air.
            </p>
            <p class="text-lg leading-relaxed mb-4">
              "One quantum coffee, please," she said to the android barista, whose holographic 
              face shimmered with a practiced smile. The machine whirred to life, processing 
              her request through layers of probability matrices.
            </p>
            <p class="text-lg leading-relaxed">
              As she waited, Sarah couldn't help but wonder if this was the reality where she 
              would finally find the answers she'd been searching for, or just another 
              parallel universe in the infinite multiverse of possibilities.
            </p>
          `
        },
        {
          page: 2,
          content: `
            <p class="text-lg leading-relaxed mb-4">
              The coffee arrived in a glass orb that seemed to contain its own miniature galaxy. 
              Swirls of cream danced through the dark liquid like cosmic clouds, and when Sarah 
              took her first sip, she felt a strange tingling sensation spread through her mind.
            </p>
            <p class="text-lg leading-relaxed mb-4">
              "This isn't just coffee," she whispered, her voice barely audible over the ambient 
              hum of the café's quantum processors. The android barista nodded knowingly, its 
              holographic eyes twinkling with ancient wisdom.
            </p>
            <p class="text-lg leading-relaxed">
              "It's a memory extractor," the android explained. "Each sip reveals a forgotten 
              moment from your past, or perhaps from a past that never was. The choice is yours."
            </p>
          `
        },
        {
          page: 3,
          content: `
            <h2 class="text-2xl font-semibold mb-4">Chapter 1: The First Sip</h2>
            <p class="text-lg leading-relaxed mb-4">
              Sarah's hands trembled as she held the orb. She had come here seeking answers about 
              her missing memories, but now she wondered if she was ready to face whatever truths 
              lay hidden in the depths of her subconscious.
            </p>
            <p class="text-lg leading-relaxed mb-4">
              The café around her seemed to shift and blur, as if reality itself was becoming 
              fluid. Other patrons—some human, some android, some neither—continued their 
              conversations, unaware of the cosmic drama unfolding at the counter.
            </p>
          `
        },
        {
          page: 4,
          content: `
            <p class="text-lg leading-relaxed mb-4">
              "What if I don't like what I remember?" Sarah asked, her voice barely a whisper.
              The android's response was simple yet profound: "Then you'll know what to forget."
            </p>
            <p class="text-lg leading-relaxed mb-4">
              With a deep breath, Sarah took another sip. This time, the tingling sensation 
              exploded into a full-blown vision. She was back in her childhood home, watching 
              her mother work on a mysterious device in the basement.
            </p>
            <p class="text-lg leading-relaxed">
              "Mom?" she called out, but her mother didn't respond. The memory was vivid, 
              yet somehow distant, like watching a holographic recording from another life.
            </p>
          `
        },
        {
          page: 5,
          content: `
            <h2 class="text-2xl font-semibold mb-4">The Memory Unfolds</h2>
            <p class="text-lg leading-relaxed mb-4">
              The device her mother was working on looked suspiciously similar to the quantum 
              processors that powered the café. Could there be a connection between her past 
              and this strange establishment?
            </p>
            <p class="text-lg leading-relaxed mb-4">
              The vision faded as quickly as it had appeared, leaving Sarah gasping for breath. 
              The android barista was watching her with what might have been concern, if androids 
              could feel such emotions.
            </p>
          `
        },
        {
          page: 6,
          content: `
            <p class="text-lg leading-relaxed mb-4">
              "Your mother was a pioneer in quantum memory technology," the android said quietly. 
              "She built the first prototype of what would become the memory extraction system 
              used in this café."
            </p>
            <p class="text-lg leading-relaxed mb-4">
              Sarah's mind reeled with this revelation. Her mother had been a scientist? 
              Why couldn't she remember any of this? And more importantly, where was her 
              mother now?
            </p>
            <p class="text-lg leading-relaxed">
              The quantum coffee continued to work its magic, revealing layer after layer of 
              forgotten memories, each one more surprising than the last.
            </p>
          `
        }
      ],
             "Midnight Detective": [
         {
           page: 1,
           content: `
             <h1 class="book-title text-3xl font-bold mb-6 text-center text-gray-800">Midnight Detective</h1>
             <p class="text-lg leading-relaxed mb-4">
               Rain fell like liquid shadows on the neon-lit streets of Neo-Tokyo. Detective 
               Alex Chen pulled his trench coat tighter around his shoulders as he stepped into 
               the dimly lit alleyway. The holographic advertisements flickered overhead, casting 
               shifting patterns of light and dark across the wet pavement.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               His neural implant buzzed with an incoming message. It was from the precinct—another 
               case, another mystery in this city that never slept. But this one felt different. 
               The victim's memories had been completely erased, leaving behind only fragments of 
               digital consciousness.
             </p>
           `
         },
         {
           page: 2,
           content: `
             <p class="text-lg leading-relaxed mb-4">
               "Welcome to the future of crime," Alex muttered to himself as he activated his 
               cybernetic eye scanner. The world around him transformed into a web of data streams, 
               each one a potential clue in this digital nightmare.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               The crime scene was a high-tech apartment in the upper levels of the city. The victim, 
               a renowned AI researcher named Dr. Elena Rodriguez, lay motionless on her bed, her 
               neural interface still glowing with residual energy.
             </p>
           `
         },
         {
           page: 3,
           content: `
             <h2 class="text-2xl font-semibold mb-4">Chapter 1: Digital Ghosts</h2>
             <p class="text-lg leading-relaxed mb-4">
               "Her memories were extracted," said the forensic tech, a cyborg with glowing blue 
               eyes. "But not just deleted—they were transferred somewhere. We're dealing with 
               memory thieves."
             </p>
             <p class="text-lg leading-relaxed mb-4">
               Alex knelt beside the body, his scanner picking up traces of an unknown digital 
               signature. This wasn't just murder—it was digital kidnapping. And somewhere in 
               the vast network of the city, Elena's memories were being sold to the highest bidder.
             </p>
           `
         },
         {
           page: 4,
           content: `
             <p class="text-lg leading-relaxed mb-4">
               The digital trail led Alex deep into the city's underground network, where data 
               flowed like rivers of light through fiber-optic veins. Here, in the digital 
               underworld, memories were the most valuable currency.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               "I'm getting closer," Alex whispered to himself as his neural interface connected 
               to the city's mainframe. The data streams revealed a pattern—Elena's memories 
               had been fragmented and scattered across multiple servers.
             </p>
           `
         },
         {
           page: 5,
           content: `
             <h2 class="text-2xl font-semibold mb-4">The Memory Hunt</h2>
             <p class="text-lg leading-relaxed mb-4">
               Each fragment of Elena's consciousness held a piece of the puzzle. Through her 
               memories, Alex discovered a conspiracy that went deeper than he could have imagined. 
               The memory thieves weren't just criminals—they were part of a larger organization.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               "This is bigger than one murder," Alex realized as he pieced together the fragments. 
               "They're building something. Something that could change the very nature of human 
               consciousness."
             </p>
           `
         },
         {
           page: 6,
           content: `
             <p class="text-lg leading-relaxed mb-4">
               The chase led Alex to the heart of the digital labyrinth, where the memory thieves 
               had established their base of operations. Here, in a hidden server farm beneath 
               the city, they were creating something unprecedented—a collective consciousness 
               built from stolen memories.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               "Time to shut this down," Alex said, drawing his neural disruptor. The future of 
               human memory was at stake, and he was the only one who could stop it.
             </p>
           `
         }
       ],
             "Garden of Memories": [
         {
           page: 1,
                       content: `
              <h1 class="book-title text-3xl font-bold mb-6 text-center text-gray-800">Garden of Memories</h1>
             <p class="text-lg leading-relaxed mb-4">
               The garden existed in a place between dreams and reality, where memories bloomed 
               as flowers and secrets grew in the shadows. Lily stepped through the wrought-iron 
               gate, her bare feet sinking into the soft earth that seemed to pulse with ancient magic.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               Around her, flowers of every imaginable color swayed gently in a breeze that carried 
               the whispers of forgotten moments. Each petal held a memory—some sweet, some bitter, 
               all precious in their own way.
             </p>
             <p class="text-lg leading-relaxed">
               "Welcome, child," said a voice that seemed to come from everywhere and nowhere. 
               "I am the Gardener. I tend to the memories of those who have lost their way. 
               What brings you to my sanctuary?"
             </p>
           `
         },
         {
           page: 2,
           content: `
             <h2 class="text-2xl font-semibold mb-4">Chapter 1: The Memory Bloom</h2>
             <p class="text-lg leading-relaxed mb-4">
               Lily looked down at her hands, where a small flower had begun to grow from her palm. 
               Its petals were translucent, and within them, she could see fragments of her own 
               memories playing like miniature films.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               "This is impossible," she whispered, but the flower continued to bloom, its roots 
               intertwining with her veins in a beautiful, terrifying dance of life and memory.
             </p>
             <p class="text-lg leading-relaxed">
               "Nothing is impossible in the Garden of Memories," the Gardener replied, appearing 
               beside her as a figure made entirely of light and shadow. "Your memories are trying 
               to find their way back to you. Will you help them bloom?"
             </p>
           `
         }
       ],
       "City of Shadows": [
         {
           page: 1,
                       content: `
              <h1 class="book-title text-3xl font-bold mb-6 text-center text-gray-800">City of Shadows</h1>
             <p class="text-lg leading-relaxed mb-4">
               The city never truly slept. In the depths of night, when the neon lights dimmed 
               and the crowds dispersed, the shadows came alive. Detective Marcus Kane knew this 
               better than anyone—he had spent the last decade hunting the things that lurked 
               in the darkness.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               Tonight, however, was different. The shadows were moving in ways he had never 
               seen before. They flowed like liquid through the streets, converging on a single 
               point in the old district where the buildings leaned against each other like 
               drunken friends.
             </p>
             <p class="text-lg leading-relaxed">
               His supernatural senses tingled with warning. Something was coming, something 
               that would change the city forever. And he was the only one who could stop it.
             </p>
           `
         },
         {
           page: 2,
           content: `
             <h2 class="text-2xl font-semibold mb-4">Chapter 1: The Shadow Convergence</h2>
             <p class="text-lg leading-relaxed mb-4">
               The old warehouse stood like a sentinel in the darkness, its windows boarded up 
               and its walls covered in graffiti that seemed to move in the flickering streetlights. 
               Marcus approached cautiously, his silver dagger ready in his hand.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               Inside, the air was thick with the scent of old magic and something else—something 
               that made his skin crawl. The shadows had gathered here, forming a swirling mass 
               in the center of the room.
             </p>
             <p class="text-lg leading-relaxed">
               "I know you're here," Marcus called out, his voice echoing through the empty space. 
               "Show yourself, demon. Let's end this once and for all."
             </p>
           `
         }
       ],
       "The Last Bookstore": [
         {
           page: 1,
                       content: `
              <h1 class="book-title text-3xl font-bold mb-6 text-center text-gray-800">The Last Bookstore</h1>
             <p class="text-lg leading-relaxed mb-4">
               In a world where reading had been outlawed and books were burned as heresy, 
               the Last Bookstore stood as a beacon of resistance. Hidden behind a false wall 
               in an abandoned subway station, it was the only place where the written word 
               still lived.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               Maya, the store's keeper, moved silently among the shelves, her fingers trailing 
               over the spines of forbidden knowledge. Each book was a treasure, each page a 
               rebellion against the regime that had tried to erase history itself.
             </p>
             <p class="text-lg leading-relaxed">
               Tonight, she had a visitor—a young woman who had risked everything to find this 
               place. Her name was Elena, and she carried with her a book that could change 
               everything.
             </p>
           `
         },
         {
           page: 2,
           content: `
             <h2 class="text-2xl font-semibold mb-4">Chapter 1: The Forbidden Text</h2>
             <p class="text-lg leading-relaxed mb-4">
               Elena's hands trembled as she placed the ancient tome on the counter. Its leather 
               cover was worn and cracked, but the gold lettering on the spine still gleamed 
               in the dim light of Maya's lantern.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               "Where did you find this?" Maya whispered, her voice barely audible over the 
               distant sound of patrol sirens. The book was older than the regime itself, 
               containing secrets that could bring down the entire system.
             </p>
             <p class="text-lg leading-relaxed">
               "In my grandmother's attic," Elena replied. "She told me to bring it here, 
               to you. She said you would know what to do with it."
             </p>
           `
         }
       ],
       "Starlight Serenade": [
         {
           page: 1,
                       content: `
              <h1 class="book-title text-3xl font-bold mb-6 text-center text-gray-800">Starlight Serenade</h1>
             <p class="text-lg leading-relaxed mb-4">
               Across the vast expanse of space, where stars sang their eternal songs and 
               planets danced in cosmic harmony, two souls found each other in the most 
               unlikely of places. Captain Zara Nova of the Andromeda Fleet and Prince 
               Orion of the Celestial Kingdom were worlds apart, yet destined to meet.
             </p>
             <p class="text-lg leading-relaxed mb-4">
               Their first encounter happened during a diplomatic mission gone wrong. Zara's 
               ship had been caught in a solar storm, and Orion's royal vessel had been the 
               only one close enough to offer assistance. What began as a rescue mission 
               quickly became something much more profound.
             </p>
             <p class="text-lg leading-relaxed">
               "You're not what I expected," Zara said, looking into Orion's eyes that 
               seemed to contain entire galaxies. "I thought all royals were pompous and 
               arrogant."
             </p>
           `
         },
         {
           page: 2,
           content: `
             <h2 class="text-2xl font-semibold mb-4">Chapter 1: Cosmic Attraction</h2>
             <p class="text-lg leading-relaxed mb-4">
               Orion laughed, a sound that reminded Zara of wind chimes in a gentle breeze. 
               "And I thought all fleet captains were stern and unfeeling. You've proven me 
               wrong on both counts."
             </p>
             <p class="text-lg leading-relaxed mb-4">
               As their ships traveled through the void together, they discovered that love 
               knew no boundaries—not distance, not culture, not even the laws of physics. 
               Their connection transcended everything they had ever known.
             </p>
             <p class="text-lg leading-relaxed">
               "What happens when this mission ends?" Zara asked, her voice barely a whisper 
               in the quiet of the observation deck. "When we have to return to our separate 
               worlds?"
             </p>
           `
         }
       ]
    };
    
    return bookContents[bookTitle] || bookContents["The Quantum Café"];
  };

    const bookContent = getBookContent(book?.title);

  useEffect(() => {
    // Animate book opening with a more dramatic entrance
    const timer = setTimeout(() => setIsOpen(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isFlipping) {
        if (event.key === 'ArrowRight' || event.key === ' ') {
          event.preventDefault();
          handlePageTurn('next');
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          handlePageTurn('prev');
        } else if (event.key === 'Escape') {
          event.preventDefault();
          handleClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFlipping, currentPage, bookContent.length]);

  // Drag event listeners
  useEffect(() => {
    const bookElement = bookRef.current;
    if (!bookElement) return;

    // Mouse events
    bookElement.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    // Touch events
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
  }, [isDragging, isFlipping, dragStartX, dragOffset, currentPage, bookContent.length]);

  const handlePageTurn = (direction) => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setFlipDirection(direction);
    setFlipProgress(0);
    
    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Simulate page flip sound effect (visual feedback)
    const audioContext = window.AudioContext || window.webkitAudioContext;
    if (audioContext) {
      try {
        const audio = new audioContext();
        const oscillator = audio.createOscillator();
        const gainNode = audio.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audio.destination);
        
        oscillator.frequency.setValueAtTime(200, audio.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audio.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audio.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.1);
        
        oscillator.start(audio.currentTime);
        oscillator.stop(audio.currentTime + 0.1);
      } catch (error) {
        // Silently fail if audio context is not available
      }
    }
    
    // Animate the flip progress
    const animateFlip = () => {
      setFlipProgress(prev => {
        const newProgress = prev + 0.05;
        
        // Add haptic feedback at key moments
        if (newProgress > 0.5 && prev <= 0.5) {
          if (navigator.vibrate) {
            navigator.vibrate(30);
          }
        }
        
        if (newProgress >= 1) {
          // Flip complete, change page
          if (direction === 'next' && currentPage < bookContent.length - 2) {
            setCurrentPage(currentPage + 2);
          } else if (direction === 'prev' && currentPage > 0) {
            setCurrentPage(currentPage - 2);
          }
          setIsFlipping(false);
          setFlipDirection(null);
          setFlipProgress(0);
          
          // Final haptic feedback
          if (navigator.vibrate) {
            navigator.vibrate(100);
          }
          
          return 0;
        }
        return newProgress;
      });
    };
    
    const flipInterval = setInterval(animateFlip, 25); // 40fps animation
    
    // Cleanup interval after animation completes
    setTimeout(() => {
      clearInterval(flipInterval);
    }, 1000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => onClose(), 300);
  };

  // Drag handlers for page turning
  const handleDragStart = (e) => {
    if (isFlipping) return;
    
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    setIsDragging(true);
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e) => {
    if (!isDragging || isFlipping) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging || isFlipping) return;
    
    setIsDragging(false);
    
    // Determine if drag was significant enough to turn page
    const threshold = 100; // Minimum drag distance to trigger page turn
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentPage > 0) {
        // Dragged right - go to previous page
        handlePageTurn('prev');
      } else if (dragOffset < 0 && currentPage < bookContent.length - 2) {
        // Dragged left - go to next page
        handlePageTurn('next');
      }
    }
    
    setDragOffset(0);
  };

  const currentPageContent = bookContent[currentPage];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={bookRef}
        className={`relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-2xl book-spine transition-all duration-300 cursor-grab active:cursor-grabbing book-draggable ${
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
                <p className="text-sm text-gray-600">Pages {currentPage + 1}-{Math.min(currentPage + 2, bookContent.length)} of {bookContent.length}</p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></span>
                    Drag pages, use ← → arrows, or spacebar to navigate
                  </span>
                </p>
              </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(0)}
                disabled={currentPage === 0}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Book Content */}
        <div className="absolute top-16 left-0 right-0 bottom-16 overflow-hidden">
          <div className="h-full flex relative">
            {/* Book Spine in Center */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-400 to-gray-600 transform -translate-x-1/2 z-10 shadow-lg"></div>
            
            {/* Left Page */}
            <div className="w-1/2 h-full bg-gradient-to-r from-amber-50 via-orange-50 to-white p-8 border-r border-gray-200 relative">
              {/* Page curl effect */}
              <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-200/50 to-transparent"></div>
              
              <div className="h-full overflow-y-auto">
                <div 
                  className={`book-text transition-all duration-800 ease-in-out ${
                    isFlipping ? 'page-flip page-curl-animation opacity-30 transform scale-95 rotate-1' : 'opacity-100 transform scale-100 rotate-0'
                  }`}
                  dangerouslySetInnerHTML={{ __html: currentPageContent?.content || '' }}
                />
              </div>
              
              {/* Page number */}
              <div className="absolute bottom-4 left-8 text-sm text-gray-500 font-serif">
                {currentPage + 1}
              </div>
            </div>

            {/* Right Page */}
            <div className="w-1/2 h-full bg-gradient-to-l from-amber-50 via-orange-50 to-white p-8 relative">
              {/* Page curl effect */}
              <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-200/50 to-transparent"></div>
              
              <div className="h-full overflow-y-auto">
                {currentPage + 1 < bookContent.length ? (
                  <div 
                    className={`book-text transition-all duration-800 ease-in-out ${
                      isFlipping ? 'page-flip page-curl-animation opacity-30 transform scale-95 -rotate-1' : 'opacity-100 transform scale-100 rotate-0'
                    }`}
                    dangerouslySetInnerHTML={{ __html: bookContent[currentPage + 1]?.content || '' }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-4xl animate-pulse">📖</span>
                      </div>
                      <p className="text-lg font-medium font-serif">The End</p>
                      <p className="text-sm mt-2 text-gray-500">Thank you for reading</p>
                      
                      {/* Decorative elements */}
                      <div className="mt-6 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Page number */}
              <div className="absolute bottom-4 right-8 text-sm text-gray-500 font-serif">
                {currentPage + 2}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-b-lg border-t">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => handlePageTurn('prev')}
              disabled={currentPage === 0 || isFlipping}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(bookContent.length / 2) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index * 2)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentPage / 2) === index 
                      ? 'bg-orange-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageTurn('next')}
              disabled={currentPage >= bookContent.length - 2 || isFlipping}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Realistic Page Flip Animation - Between Pages */}
        {isFlipping && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Flipping page overlay - positioned in the center */}
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
              {/* Page content during flip */}
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
            
            {/* Page shadow during flip - positioned in the center */}
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
            
            {/* Page curl effect - positioned in the center */}
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
            
            {/* Page lift effect - positioned in the center */}
            <div 
              className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-amber-50 via-orange-50 to-white rounded-lg ${
                flipDirection === 'next' ? 'origin-right left-1/2' : 'origin-left left-0'
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${
                  flipDirection === 'next' 
                    ? `${-flipProgress * 180}deg` 
                    : `${flipProgress * 180}deg`
                }) translateZ(${flipProgress * 5}px)`,
                transformOrigin: flipDirection === 'next' ? 'right center' : 'left center',
                zIndex: 22,
                opacity: flipProgress > 0.5 ? 0 : 1,
                boxShadow: `${
                  flipDirection === 'next' 
                    ? `${-flipProgress * 30}px 0 ${flipProgress * 40}px rgba(0,0,0,0.4)` 
                    : `${flipProgress * 30}px 0 ${flipProgress * 40}px rgba(0,0,0,0.4)`
                }`
              }}
            />
          </div>
        )}

        {/* Drag Feedback Overlay */}
        {isDragging && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Drag direction indicator */}
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
            
            {/* Drag progress bar */}
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
      </div>
    </div>
  );
};
