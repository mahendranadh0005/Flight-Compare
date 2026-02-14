import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Plane, MapPin, Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SearchParams } from "@/types/flight";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date || isLoading) return;

    onSearch({
      origin: origin.trim(),
      destination: destination.trim(),
      date: format(date, "yyyy-MM-dd"),
    });
  };

  const isValid = origin.trim() && destination.trim() && date;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl bg-card p-6 shadow-lg border border-border transition-all"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        
        {/* Origin */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Origin
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="e.g. Bangalore"
              value={origin}
              disabled={isLoading}
              onChange={(e) => setOrigin(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Destination
          </label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="e.g. Amritsar"
              value={destination}
              disabled={isLoading}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Date Picker */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={isLoading}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full gap-2"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                AI Searching...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Search with AI
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AI Notice */}
      <p className="mt-4 text-xs text-muted-foreground">
        Our AI agent browses real flight websites to extract live prices. 
        Searches may take up to 2–3 minutes.
      </p>
    </form>
  );
};

export default SearchForm;
