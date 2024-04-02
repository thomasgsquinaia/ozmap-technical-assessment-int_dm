export type RegionRequestBody = {
    name?: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    user: string;
  };