import axios from "axios";

export async function getAirportCode(city) {
  try {
    const response = await axios.get(
      "http://api.aviationstack.com/v1/airports",
      {
        params: {
          access_key: process.env.AVIATION_KEY,
          search: city,
          limit: 5
        }
      }
    );

    const airports = response.data?.data;

    if (!airports || airports.length === 0) {
      throw new Error(`No airports returned for ${city}`);
    }

    const validAirport = airports.find(
      a => a.iata_code && a.iata_code.length === 3
    );

    if (!validAirport) {
      throw new Error(`No valid IATA code found for ${city}`);
    }

    console.log(`Airport found for ${city}: ${validAirport.iata_code}`);

    return validAirport.iata_code;

  } catch (error) {
    console.error("Airport lookup failed:", error.message);
    throw error;   // IMPORTANT: do NOT return AAA
  }
}
