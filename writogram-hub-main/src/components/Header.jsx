import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="hidden font-bold sm:inline-block">
              Writogram
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input
              type="search"
              placeholder="Search stories, films, or creators..."
              className="h-8 w-full lg:w-[300px]"
            />
          </div>
          <nav className="flex items-center space-x-2">
            <Link to="/top-authors">
              <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                🏆 Top Authors
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
            <Badge variant="secondary" className="ml-2">
              Beta
            </Badge>
          </nav>
        </div>
      </div>
    </header>
  );
}; 