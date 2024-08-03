require("dotenv").config();

const { name } = require("body-parser");
/** # MONGOOSE SETUP
 *  ==============   */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI_TEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Schema = mongoose.Schema;

/**
 * MongoDB stores JSON documents in them
 */

/**
 * Creating schema = document structure
 * document is the equivalent of a row in an SQL table
 */
const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

/**
 * Creating a model.
 * Models are constructors that take a schema and create an instance of a document
 */
const Person = mongoose.model("Person", personSchema);

/**
 * done is a callback function called when an async operation has completed
 */
const createAndSavePerson = (done) => {
  let examplePerson = new Person({
    name: "Example",
    age: 21,
    favoriteFoods: ["pizza"],
  });
  examplePerson.save(function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

let arrayOfPeople = [
  { name: "Example2", age: 30, favoriteFoods: ["Pasta"] },
  { name: "Example3", age: 32, favoriteFoods: ["Pasta", "Pizza"] },
  { name: "Example4", age: 34, favoriteFoods: ["Pasta", "Eggs", "Pancakes"] },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
  //done(null, arrayOfPeople);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save(function (err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  // findOneAndUpdate(conditions, update, options, callback)
  // options = {new: true} returns the updated document
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, person) => {
      if (err) console.log(err);
      done(null, person);
    },
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) console.log(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, person) => {
    if (err) console.log(err);
    done(null, person);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: 1, favoriteFoods: 1 })
    .exec((err, data) => {
      if (err) console.log(err);
      done(err, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
