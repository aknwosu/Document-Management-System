import faker from 'faker';

const data = {
  userRole: {
    title: 'user'
  },
  adminRole: {
    title: 'admin'
  },
  newRole: {
    title: 'guest1'
  },
  adminUser1: {
    id: 3,
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser2: {
    id: 4,
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },

  regularUser1: {
    username: 'damin',
    firstname: 'Daniel',
    lastname: 'Amin',
    email: 'daniel@amin.com',
    password: 'feefeesho',
  },
  regularUserEdit: {
    username: 'Nodamin2',
    firstname: 'NoDaniel2',
    lastname: 'Amin2',
    email: 'nodaniel2@amin.com',
    password: 'feefeesho'
  },

  regularUser1edit: {
    username: 'damin2',
    firstname: 'Daniel2',
    lastname: 'Amin2',
    email: 'daniel2@amin.com',
    password: 'feefeesho'
  },

  regularUser1Admin: {
    username: 'damin',
    firstname: 'Daniel',
    lastname: 'Amin',
    email: 'daniel@amin.com',
    password: 'feefeesho',
    roleId: 1,
  },
  regularUser4: {
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    password: 'password',
    departmentId: 2
  },
  regularUser4Edit: {
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.com',
    password: 'passwordModified',
  },
  regularUser5: {
    id: 12,
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  invalidUser: {
    username: null,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'a@a.com',
    password: faker.internet.password(),
  },
  roleIdUser: {
    username: 'roleIdUser',
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  publicDocument4: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 3,
  },
  publicDocument2: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    // docTypeId: 2,
    userId: 3,
  },
  publicDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 3,
  },
  publicDocument1: {
    title: 'GOT',
    content: 'All men must die',
    accessId: 1,
    userId: 4,
  },
  privateDocument1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
    userId: 3,
  },
  privateDocument2: {
    title: 'Game of Thrones',
    content: faker.lorem.paragraph(),
    access: 'private',
    userId: 4,
  },
  privateDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
    userId: 4,
  },
  privateDocument4: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
    userId: 4,
  },
  roleDocument1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role',
    userId: 2,
  },
  roleDocument2: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 3,
    userId: 3,
  },
  roleDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 3,
    userId: 3,
  },
  publicAccessType: {
    name: 'public'
  },
  privateAccessType: {
    name: 'private'
  },
  role: {
    name: 'role'
  },
};
export default data;

