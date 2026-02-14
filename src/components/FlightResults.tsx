import FlightCard from "./FlightCard";
import type { Flight } from "@/types/flight";
import { TrendingDown } from "lucide-react";

interface FlightResultsProps {
  flights: Flight[];
}

const FlightResults = ({ flights }: FlightResultsProps) => {
  const sorted = [...flights].sort((a, b) => a.price - b.price);
  const cheapestPrice = sorted.length > 0 ? sorted[0].price : null;

  if (sorted.length === 0) return null;

  return (
    <div className="space-y-6">
      
      {/* Summary Banner */}
      <div className="flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {sorted.length} flight{sorted.length !== 1 ? "s" : ""} found
          </p>
          <p className="text-lg font-semibold text-foreground">
            Cheapest fare: ₹{cheapestPrice}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-green-600">
          <TrendingDown className="h-4 w-4" />
          Sorted by lowest price
        </div>
      </div>

      {/* Flight Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((flight, i) => (
          <FlightCard
            key={`${flight.airline}-${flight.departure_time}-${i}`}
            flight={flight}
            isCheapest={i === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
