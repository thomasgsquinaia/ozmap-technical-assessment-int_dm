import sinon from "sinon";
import { UserModel } from "../../../../../src/models/models";
import usersMock from "../../../../mocks/users.mock";
import { getUsers } from "../../../../../src/user-cases/users/getUsers";
import { describe, expect, it } from 'vitest'

describe('Testin Get Users function', function () {
    it('Testing', async function () {
      sinon.mock(UserModel).expects('find').returns({
          limit: sinon.stub().returns({
            skip: sinon.stub().resolves([usersMock.users]),
          }),
        });

      sinon.stub(UserModel, 'countDocuments').resolves(1);

      const serviceResponse = await getUsers(1, 10);

      expect(serviceResponse).to.have.property('total');
    })
});