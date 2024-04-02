import { Address } from "../interfaces/users";

const formatAddress = ({ city, country, neighborhood, state, street, zipCode, number }: Address) => {
    if (number) {
      return `${street}, ${number}, ${neighborhood}, ${city} - ${state}, ${zipCode}, ${country}`;
    }
  
    return `${street} - ${neighborhood}, ${city} - ${state}, ${zipCode}, ${country}`;
  };
  
export default formatAddress;