import { useState } from "react";
import { Plane, AlertCircle, Sparkles } from "lucide-react";
import SearchForm from "@/components/SearchForm";
import FlightResults from "@/components/FlightResults";
import airportImage from "@/airport.jpg";

import type { Flight, SearchParams } from "@/types/flight";

const Index = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setFlights([]);

    try {
       console.log("API URL:", import.meta.env.VITE_API_URL);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        }
      );

      const text = await res.text();

      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.error || `Server responded with ${res.status}`);
      }

      setFlights(Array.isArray(data) ? data : data.flights ?? []);
    } catch (err: any) {
      setError(
        err.message === "Failed to fetch"
          ? "Unable to reach backend. Please try again shortly."
          : err.message || "Something went wrong. Please try again."
      );
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            FlyCompare AI
          </h1>
        </div>
      </header>

      <section className="relative">
        <div className="h-[500px] w-full overflow-hidden">
          <img
            src={airportImage}
            alt="Airport runway with airplane"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            AI-powered flight search
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-200 sm:text-base">
            Our AI agents browse real airline websites in real-time to find the best deals.
            Searches may take up to 2–3 minutes.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl -mt-20 relative z-10">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="mt-16">

          {error && (
            <div className="mx-auto flex max-w-xl items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center gap-4 py-20 text-muted-foreground">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <div className="flex items-center gap-2 text-lg font-medium text-foreground">
                <Sparkles className="h-5 w-5 text-primary" />
                AI agent is searching flight websites...
              </div>
              <p className="text-sm text-muted-foreground">
                Browsing airline sites and extracting live prices. Please wait.
              </p>
            </div>
          )}

          {!isLoading && !error && flights.length > 0 && (
            <FlightResults flights={flights} />
          )}

          {!isLoading && !error && hasSearched && flights.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">
              No flights found for this route and date. Try different search criteria.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
