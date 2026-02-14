import { Clock, ExternalLink, Plane, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Flight } from "@/types/flight";

interface FlightCardProps {
  flight: Flight;
  isCheapest: boolean;
}

const FlightCard = ({ flight, isCheapest }: FlightCardProps) => {
  return (
    <div
      className={`relative rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${
        isCheapest
          ? "border-primary ring-2 ring-primary/30 scale-[1.02]"
          : "border-border"
      }`}
    >
      {/* Best Price Badge */}
      {isCheapest && (
        <Badge className="absolute -top-3 left-5 flex items-center gap-1 bg-primary text-primary-foreground">
          <Sparkles className="h-3 w-3" />
          Best Deal
        </Badge>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Plane className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="font-semibold text-card-foreground text-base">
              {flight.airline}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <ExternalLink className="h-3 w-3" />
              {flight.source}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-2xl font-bold text-primary">
            ₹{flight.price}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-border" />

      {/* Time Section */}
      <div className="flex items-center justify-between">
        {/* Departure */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Departure</p>
          <p className="mt-1 flex items-center justify-center gap-1 font-semibold text-card-foreground">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            {flight.departure_time}
          </p>
        </div>

        {/* Flight Path */}
        <div className="flex flex-col items-center text-muted-foreground">
          <Plane className="h-4 w-4 rotate-90" />
          <div className="mt-1 h-px w-12 bg-border" />
        </div>

        {/* Arrival */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Arrival</p>
          <p className="mt-1 flex items-center justify-center gap-1 font-semibold text-card-foreground">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            {flight.arrival_time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
