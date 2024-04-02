import { describe, expect, it } from "vitest";
import { verifyInput } from "../../../../../src/user-cases/regions/updateRegion";
import { RegionRequestBody } from "../../../../../src/interfaces/regions";

describe("Should Test Update Region", () => {
    it("Should not pass without a name", async () => {
        try {
            const input: RegionRequestBody = {
              user: "10",
              coordinates: {
                    lat: 47.973465,
                    lng: 19.7658641,
                }
            }
            await verifyInput(input)
        } catch (err) {
            expect(err).toStrictEqual({
                message: "Field required \"name\"",
                status: 400,
            });
        }
    });

    it("Should pass", async () => {
        const input = {
            name: "Test1",
            user: "660b175cba6dee38152e0c4a",
            coordinates: {
                  lat: 47.973465,
                  lng: 19.7658641,
            }
          }
          await verifyInput(input)
    });
});