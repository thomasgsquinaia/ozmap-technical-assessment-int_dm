import sinon from "sinon";
import { UserModel } from "../../../../../src/models/models";
import usersMock from "../../../../mocks/users.mock";
import { getUserById } from "../../../../../src/user-cases/users/getUserById";
import { describe, expect, it } from 'vitest'
import regionsMock from "../../../../mocks/regions.mock";

describe('Testin Get User By Id function', function () {
    it('Testing', async function () {
      sinon
        .mock(UserModel)
        .expects('findOne')
        .returns({
          populate: sinon.stub().resolves({ ...usersMock.user, regions: [regionsMock.region] }),
        });

      const serviceResponse = await getUserById(usersMock.user._id);
      expect(serviceResponse).toBeTruthy();
    })
});