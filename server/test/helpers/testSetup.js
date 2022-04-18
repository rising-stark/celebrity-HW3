const { dbConnect, dbClose } = require('../../helpers/dbConnect');
const { seedDatabase } = require('../../helpers/seedDatabase/seedDatabase');

const testSetup = () => {
  beforeAll((done) => {
    dbConnect(true)
      .once('open', () => {
        seedDatabase()
          .then(() => console.log('Database seeding completed'))
          .catch((e) => console.log(e));
        done();
      })
      .on('error', (e) => done(e));
  });

  afterAll((done) => {
    dbClose()
      .then(() => {
        console.log('Database connection closed');
        done();
      })
      .catch((e) => done(e));
  });
};

module.exports = testSetup;
