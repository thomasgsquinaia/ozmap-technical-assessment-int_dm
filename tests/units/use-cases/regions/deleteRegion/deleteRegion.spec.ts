import { RegionModel, UserModel } from "../../../../../src/models/models";
import { deleteRegion } from "../../../../../src/user-cases/regions/deleteRegion";
import sinon from "sinon";
import { describe, expect, it } from 'vitest';
import regionsMock from "../../../../mocks/regions.mock";

describe('Testing deleteUser function', function () {
    it('Testing successfully', async function () {
        sinon.stub(RegionModel, 'findOne').resolves(regionsMock.region);
        sinon.stub(UserModel, 'updateOne').resolves(null);
        sinon.stub(RegionModel, 'deleteOne').resolves(null);
  
        expect(() => deleteRegion(regionsMock.region._id)).to.not.have.throw();
      });
});