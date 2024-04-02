import { UserModel } from "../../../../../src/models/models";
import { deleteUser } from "../../../../../src/user-cases/users/deletUser";
import usersMock from "../../../../mocks/users.mock";
import sinon from "sinon";
import { describe, expect, it } from 'vitest';

describe('Testing deleteUser function', function () {

    it('Testing with a valid id', async function () {
        sinon.stub(UserModel, 'findOne').resolves(usersMock.user);

        expect(() => deleteUser('660b175cba6dee38152e0c4a')).to.not.have.throw();
    })

});