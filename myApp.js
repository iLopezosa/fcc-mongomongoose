require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, validate: (value) => value > 0 && value < 120},
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let john = new Person({
    name: 'John',
    age: 30,
    favoriteFoods: ['Pizza', 'Pasta']
  });

  john.save((err, data) => err ? console.error(err): done(null, data));
};

let arrayOfPeople = [
  {name: 'John', age: 30, favoriteFoods: ['Pizza', 'Pasta']},
  {name: 'Mary', age: 25, favoriteFoods: ['Pizza', 'Pasta']},
  {name: 'Bob', age: 40, favoriteFoods: ['Pizza', 'Pasta']},
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => err ? console.error(err) : done(null, data));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => err ? console.error(err) : done(null, data));
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => err ? console.error(err) : done(null, data));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
