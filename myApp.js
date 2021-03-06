require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, validate: (value) => value >= 0 && value < 150 },
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

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => err ? console.error(err) : done(null, data));
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => err ? console.error(err) : done(null, data));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => err ? console.error(err) : done(null, data));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => err ? console.error(err) : done(null, data));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err)
      return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => err ? console.error(err) : done(null, updatedPerson));
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
    (err, updatedPerson) => err ? console.error(err) : done(null, updatedPerson));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => err ? console.error(err) : done(null, deletedPerson));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, outJSON) => err ? console.error(err) : done(null, outJSON));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
        .sort({ name: 'asc' })
        .limit(2)
        .select('-age')
        .exec((err, query) => err ? console.error(err) : done(null, query));
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
