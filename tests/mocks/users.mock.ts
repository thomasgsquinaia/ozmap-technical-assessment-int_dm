import { faker, fakerPT_BR } from '@faker-js/faker';
import regionsMock from './regions.mock';

const getAllUsersMock = {
  message: 'Users successfully obtained',
  data: [
    {
      _id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: fakerPT_BR.location.streetAddress(),
      coordinates: [faker.location.latitude(), faker.location.latitude()],
      regions: [faker.database.mongodbObjectId()],
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      __v: faker.number.int(),
    },
  ],
  page: 1,
  limit: 10,
  total: 1,
};

const getAllUsersMockRange = {
  message: 'There are no registered users in this range',
  data: [],
  page: 1,
  limit: 10,
  total: 0,
};

const user = {
  _id: faker.database.mongodbObjectId(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: fakerPT_BR.location.streetAddress(),
  coordinates: [faker.location.longitude(), faker.location.latitude()],
  regions: [regionsMock.region],
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  __v: faker.number.int()
};

const users = {
  message: 'Users successfully obtained',
  data: [user],
  page: 1,
  limit: 10,
  total: 1,
};

const userRequestBody = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  coordinates: {
    lng: faker.location.longitude(),
    lat: faker.location.latitude(),
  },
};

const userRequestBodyAddress = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: {
    street: fakerPT_BR.location.street(),
    number: fakerPT_BR.location.buildingNumber(),
    neighborhood: fakerPT_BR.lorem.slug(),
    city: fakerPT_BR.location.city(),
    state: fakerPT_BR.location.state(),
    zipCode: fakerPT_BR.location.zipCode(),
    country: fakerPT_BR.location.country(),
  },
};

const userRequestBodyNoNumber = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: {
    street: fakerPT_BR.location.street(),
    neighborhood: fakerPT_BR.lorem.slug(),
    city: fakerPT_BR.location.city(),
    state: fakerPT_BR.location.state(),
    zipCode: fakerPT_BR.location.zipCode(),
    country: fakerPT_BR.location.country(),
  },
};

export default {
  getAllUsersMock,
  getAllUsersMockRange,
  users,
  user,
  userRequestBody,
  userRequestBodyAddress,
  userRequestBodyNoNumber,
};