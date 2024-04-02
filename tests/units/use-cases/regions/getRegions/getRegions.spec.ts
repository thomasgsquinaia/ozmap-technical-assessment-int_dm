import sinon from "sinon";
import { RegionModel, UserModel } from "../../../../../src/models/models";
import { getRegions } from "../../../../../src/user-cases/regions/getRegions";
import { describe, expect, it } from 'vitest'
import regionsMock from "../../../../mocks/regions.mock";

describe('Should testing Get Regions function', function () {
    it('Testing', async function () {
        sinon
          .mock(RegionModel)
          .expects('find')
          .returns({
            limit: sinon.stub().returns({
              skip: sinon.stub().resolves([regionsMock.regions]),
            }),
          });
        sinon.stub(RegionModel, 'countDocuments').resolves(0);
        
        try {
            await getRegions(1, 10);
        } 
        catch (error) {
            expect(error.message).toBe('Regions were not found!');
            return;
        }
    });
});