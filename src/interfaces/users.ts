export type UserRequestBody = {
    name: string;
    email: string;
    address?: Address,
    coordinates?: {
        lat: number;
        lng: number;
    };
  };
  
export type Address = {
    street: string;
    neighborhood: string;
    number?: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
};

export type NewUser = {
    name: string;
    email: string;
    address?: string;
    coordinates?: [number, number];
  };

export type UpdateUser = {
    name: string;
    email: string;
    address?: string;
    coordinates?: [number, number];
};