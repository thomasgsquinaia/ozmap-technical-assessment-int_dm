import { describe, expect, it } from "vitest";
import { verifyInput } from "../../../../../src/user-cases/users/createUser";

describe("Should Test VerifyInput Get Users", () => {
    it("Should not pass coordinates and address", async () => {
        try {
            const input = {
                name: "Teste1",
                email: "teste@email.com",
                address: {
                    street: "Av. 1",
                    neighborhood: "Cidade Jardim",
                    number: "111",
                    zipCode: "32025-164",
                    city: "Catalão",
                    state: "MG",
                    country: "Brazil"
                },
                coordinates: {
                    lat: 47.973465,
                    lng: 19.7658641,
                }
            };
            await verifyInput(input)
        } catch (err) {
            expect(err).toStrictEqual({
                message: "Enter only address or coordinates!",
                status: 400,
            });
        }
    });
    
    it("Should pass", async () => {
        const input = {
            name: "Teste1",
            email: "teste@email.com",
            address: {
                street: "Av. 1",
                neighborhood: "Cidade Jardim",
                number: "111",
                zipCode: "32025-164",
                city: "Catalão",
                state: "MG",
                country: "Brazil"
            }            
        };
        await verifyInput(input);
    });
});