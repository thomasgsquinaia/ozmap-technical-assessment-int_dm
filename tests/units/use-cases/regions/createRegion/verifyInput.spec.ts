import { describe, expect, it } from "vitest";
import { verifyInput } from "../../../../../src/user-cases/regions/getRegions";

describe("Should Test VerifyInput Get Regions", () => {
    it("Should not pass page with a string", async () => {
        try {
            const input = {
              page: "1",
              limit: 10
            };
            await verifyInput(input)
        } catch (err) {
            expect(err).toBe({
                message: "'page' must be a number",
                status: 400,
            });
        }
    });

    it("Should not pass limit with a string", async () => {
        try {
            const input = {
              page: 1,
              limit: "10"
            };
            await verifyInput(input)
        } catch (err) {
            expect(err).toBe({
                message: "'limit' must be a number",
                status: 400,
            });
        }
    });
    
    it("Should pass", async () => {
        const input = {
            page: 1,
            limit: 10
        };
        await verifyInput(input);
    });
});