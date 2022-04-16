const { dbConnect, dbClose, dbDrop } = require("../../helpers/dbConnect");
const { seedDatabase } = require("../../helpers/seedDatabase/seedDatabase");

let basicSetup = () => {
  beforeAll((done) => {
    dbConnect(true)
      .once("open", () => {
        seedDatabase()
          .then(() => console.log("Database seeding completed"))
          .catch((e) => console.log(e));
        done();
      })
      .on("error", (error) => done(error));
  });

  afterAll((done) => {
    dbDrop()
      .then(() => {
        console.log("Database dropped");
        done();
      })
      .catch((err) => done(err));
    dbClose()
      .then(() => {
        console.log("Database connection closed");
        done();
      })
      .catch((err) => done(err));
  });
};

module.exports = basicSetup;
