const moongose = require("mongoose");

const connectDB = async () => {
  await moongose.connect(
    "mongodb+srv://DevTinderNode:iiMFVdiyQ8ykD1jl@cluster0.qcgj3ti.mongodb.net/DevTinderDB"
  );
};
// "mongodb+srv://DevTinderNode:iiMFVdiyQ8ykD1jl@cluster0.qcgj3ti.mongodb.net/" ---> this url is just connect mongoose cluster

// "mongodb+srv://DevTinderNode:iiMFVdiyQ8ykD1jl@cluster0.qcgj3ti.mongodb.net/DatabaseName" ---> this url is connect perticular Database.

module.exports = connectDB;
