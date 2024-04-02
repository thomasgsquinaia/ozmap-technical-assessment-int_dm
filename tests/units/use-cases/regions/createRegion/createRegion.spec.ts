import { RegionModel, UserModel } from "../../../../../src/models/models";
import { createRegion } from "../../../../../src/user-cases/regions/createRegion";
import regionsMock from "../../../../mocks/regions.mock";
import usersMock from "../../../../mocks/users.mock";
import { describe, expect, it } from "vitest";
import sinon from "sinon";

describe("Should Test VerifyInput Get Regions", () => {
    it('Testing successfully', async function () {
        sinon.stub(UserModel, 'findById').resolves(usersMock.user);
        sinon.stub(RegionModel, 'findOne').resolves(null);
        sinon.stub(RegionModel, 'create').resolves(regionsMock.region as any);
    
        const result = await createRegion(regionsMock.regionRequestBody);

        expect(result).toBeTruthy();
      });
});