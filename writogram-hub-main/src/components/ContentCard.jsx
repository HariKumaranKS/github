import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card.jsx";
import { Progress } from "@/components/ui/progress.jsx";

export const ContentCard = ({ title, type, progress, status, lastModified }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case "book":
        return "📚";
      case "film":
        return "🎬";
      default:
        return "📄";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTypeIcon(type)}</span>
            <div>
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground capitalize">{type}</p>
            </div>
          </div>
          <Badge className={`text-xs ${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Last modified: {lastModified}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Preview
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}; 