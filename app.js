//jshint esversion:6
// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please check your data,no name specified"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "pretty solid fruit",
});

// fruit.save();

const personsSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const People = mongoose.model("People", personsSchema);

const mango = new Fruit({
  name: "Mango",
  score: 8,
  review: "Decent fruit.",
});

mango.save();

People.updateOne({ name: "Rehan" }, { favouriteFruit: mango })
  .then(function () {
    console.log("successfully Updated");
  })
  .catch(function () {
    console.log(err);
  });
// const people = new People({
//   name: "John",
//   age: 20,
//   favouriteFruit: pineapple,
// });

// people.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 10,
//   review: "The best fruit",
// });

// const orange = new Fruit({
//   name: "orange",
//   rating: 9,
//   review: "Yumm for me",
// });

// Fruit.insertMany([kiwi, orange])
//   .then(function () {
//     console.log("Successfully Added");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// Fruit.find(function (err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(fruits);
//   }
// });

Fruit.find()
  .then(function (fruits) {
    // console.log(fruit);

    fruits.forEach(function (fruit) {
      console.log(fruit.name);
      // mongoose.connection.close();
    });
  })
  .catch(function (err) {
    console.log(err);
  });

// Fruit.updateOne({ _id: "649e49103aea2ae752ae663c" }, { name: "Peach" })
//   .then(function () {
//     console.log("updated successfully");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// Fruit.deleteOne({ name: "Peach" })
//   .then(function () {
//     console.log("deleted successfully");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

People.deleteMany({ name: "Rehan" })
  .then(function () {
    console.log("Deleted Successfully");
  })
  .catch(function (err) {
    console.log(err);
  });

// const url = "mongodb://localhost:27017";

// const dbName = "fruitsDB";

// const client = new MongoClient(url, { useNewUrlParser: true });

// client.connect(function (err) {
//   assert.equal(null, err);
//   console.log("connected successfully to server");

//   const db = client.db(dbName);

//   findDocuments(db, function () {
//     client.close();
//   });
// });

// const insertDocuments = function (db, callback) {
//   const collection = db.collection("fruits");

//   collection.insertMany(
//     [
//       {
//         name: "Apple",
//         score: 8,
//         review: "Great Fruit",
//       },
//       {
//         name: "orange",
//         score: 6,
//         review: "kinda sour",
//       },
//       {
//         name: "Banana",
//         score: 9,
//         review: "Great stuff!",
//       },
//     ],
//     function (err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     }
//   );
// };

// const findDocuments = function (db, callback) {
//   const collection = db.collection("fruits");

//   collection.find({}).toArray(function (err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits);
//     callback(fruits);
//   });
// };
