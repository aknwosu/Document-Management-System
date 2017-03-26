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
  badRole: {
    title: ""
  },

  regularUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  regularUser1: {
    username: 'damin',
    firstname: 'Daniel',
    lastname: 'Amin',
    email: 'daniel@amin.com',
    password: 'feefeesho',
  },
  regularUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  regularUser3: {
    id: 7,
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
  adminUser: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser1: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  adminUser2: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  dontBeAdmin: {
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1
  },
  publicDocument1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 2,
  },
  publicDocument2: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'public',
    userId: 1,
  },
  publicDocument3: {
    title: 'GOT',
    content: 'All men must die',
    userId: 2,
  },
  privateDocument1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
    userId: 1,
  },
  privateDocument2: {
    title: 'Game of Thrones',
    content: faker.lorem.paragraph(),
    access: 'private',
    userId: 2,
  },
  privateDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private',
    userId: 1,
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
    access: 'role',
    userId: 3,
  },
  roleDocument3: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'role',
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

