const moongose = require("mongoose");

const connectDB = async () => {
  await moongose.connect(
    "mongodb+srv://DevTinderNode:iiMFVdiyQ8ykD1jl@cluster0.qcgj3ti.mongodb.net/"
  );
};
// "mongodb+srv://DevTinderNode:iiMFVdiyQ8ykD1jl@cluster0.qcgj3ti.mongodb.net/" ---> this url is just connect mongoose cluster

// "mongodb+srv://DevTinderNode:iiMFVdiyQ8ykD1jl@cluster0.qcgj3ti.mongodb.net/DatabaseName" ---> this url is connect perticular Database.

connectDB()
  .then(() => {
    console.log("Database connection is established..");
  })
  .catch((err) => {
    console.error("Databse not connected..!");
  });
