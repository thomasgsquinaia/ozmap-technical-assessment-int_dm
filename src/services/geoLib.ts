import axios from "axios";
import dotenv from 'dotenv'; 
dotenv.config();
const API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_GEOCODING_REVERSE_API_URL = process.env.GOOGLE_GEOCODING_REVERSE_API_URL;
const GOOGLE_GEOCODING_API_URL = process.env.GOOGLE_GEOCODING_API_URL;
class GeoLib {
    public async getAddressFromCoordinates(coordinates: { lat: number; lng: number }): Promise<string> {
      const response = await axios.get(`${GOOGLE_GEOCODING_REVERSE_API_URL}${coordinates.lat},${coordinates.lng}&key=${API_KEY}`)

      if (response.statusText !==  "OK") {
        throw ({
          message: "Invalid Geocoding API response!",
          statusCode: 400,
        });
      }
  
      if (!response.data.results.length) {
        throw ({
          message: 'No address was found with the given coordinates!',
          statusCode: 404,
        });
      }

      return response.data.results[0].formatted_address;
    };
  
    public async getCoordinatesFromAddress(zipCode: string): Promise<{ lat: number; lng: number }> {
      const response = await axios.get(`${GOOGLE_GEOCODING_API_URL}${zipCode}&key=${API_KEY}`);

      if (response.statusText !== 'OK') {
        throw ({
          message: 'Invalid Geocoding API response!',
          statusCode: 400
        });
      }
  
      if (!response.data.results.length) {
        throw ({
          message: 'No address was found with the given CEP!',
          statusCode: 404
        });
      }
  
      return response.data.results[0].geometry.location;
    };
  }
  
export default new GeoLib();