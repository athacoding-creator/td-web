import { Clock } from "lucide-react";

interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
}

const ReadingTime = ({ content, wordsPerMinute = 200 }: ReadingTimeProps) => {
  const calculateReadingTime = (text: string): number => {
    // Remove markdown syntax and HTML tags for accurate word count
    const plainText = text
      .replace(/[#*_~`>\[\]()]/g, '') // Remove markdown symbols
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    const words = plainText.split(' ').filter(word => word.length > 0).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    return minutes;
  };

  const readingTime = calculateReadingTime(content);

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="h-3.5 w-3.5" />
      {readingTime} menit baca
    </span>
  );
};

export default ReadingTime;
