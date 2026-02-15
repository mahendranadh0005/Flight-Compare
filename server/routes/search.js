import express from "express";
import axios from "axios";

const router = express.Router();
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 15;

router.post("/", async (req, res) => {
  const { origin, destination, date } = req.body;

  if (!origin || !destination || !date) {
    return res.status(400).json({
      error: "Origin, destination, and date are required"
    });
  }
  const cacheKey = `${origin}-${destination}-${date}`.toLowerCase();

  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);

    if (Date.now() - cached.timestamp < CACHE_TTL) {
      console.log("Serving from cache:", cacheKey);
      return res.json(cached.data);
    } else {
      cache.delete(cacheKey);
    }
  }


  try {
    const sites = [
      { name: "Spice Jet", url: "https://www.spicejet.com/" },
      
      { name: "IndiGo", url: "https://www.goindigo.in" },
      
    ];

    const allFlights = [];

    for (const site of sites) {
      try {
        console.log(`Starting TinyFish for ${site.name}...`);

        const response = await axios.post(
          "https://agent.tinyfish.ai/v1/automation/run",
          {
            url: site.url,
            goal: `
              Search for one-way flights from ${origin} to ${destination}
              on ${date}.
              Use the official booking form.
              If required, select 1 adult and economy class.
              Wait for results to fully load.
              Extract airline, departure_time, arrival_time, price, and booking_url.
              Ignore advertisements, sponsored results, and promotional banners.
              Return structured JSON array only.
            `,
            proxy_config: { enabled: true }
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": process.env.TINYFISH_KEY
            },
            timeout: 500000
          }
        );

        console.log(`RUN RESPONSE (${site.name}):`, response.data);

        const tinyResult = response.data?.result;
        if (!tinyResult) continue;

        let parsedFlights = [];

        // Case 1: flights array
        if (Array.isArray(tinyResult.flights)) {
          parsedFlights = tinyResult.flights;
        }
        // Case 2: result array
        else if (Array.isArray(tinyResult.result)) {
          parsedFlights = tinyResult.result;
        }
        // Case 3: markdown string
        else if (typeof tinyResult.result === "string") {
          const cleaned = tinyResult.result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

          parsedFlights = JSON.parse(cleaned);
        }

        const cleanedFlights = parsedFlights
          .map(flight => {
            let priceRaw = flight.price;

            if (typeof priceRaw === "string") {
              priceRaw = priceRaw.replace(/[^\d.]/g, "");
            }

            const priceNumber = Number(priceRaw);

            return {
              airline: flight.airline || site.name,
              departure_time: flight.departure_time || "N/A",
              arrival_time: flight.arrival_time || "N/A",
              price: priceNumber,
              source: site.name,
              booking_url: flight.booking_url || site.url
            };
          })
          .filter(f => !isNaN(f.price) && f.price > 0);

        allFlights.push(...cleanedFlights);

      } catch (siteError) {
        console.error(`TinyFish failed for ${site.name}:`, siteError.message);
        // continue with other sites
      }
    }

    const sortedFlights = allFlights.sort((a, b) => a.price - b.price);
    cache.set(cacheKey, {
          data: sortedFlights,
          timestamp: Date.now()
        });


    res.json(sortedFlights);

  } catch (error) {
    console.error("Search failed:", error.message);

    res.status(500).json({
      error: "Flight search failed",
      details: error.message
    });
  }
});

export default router;
