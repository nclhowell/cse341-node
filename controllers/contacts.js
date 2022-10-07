const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  // #swagger.description = "Return all contacts from collection contacts"
  const result = await mongodb.getDb().db("cse341").collection("contacts").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  // #swagger.description = "Return single contact from collection contacts"
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("cse341")
    .collection("contacts")
    .find({
      _id: userId
    });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createSingle = async (req, res) => {
  // #swagger.description = "Create a single contact and append to collection contacts"
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  console.log(contact)

  const response = await mongodb.getDb().db("cse341").collection("contacts").insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the contact.");
  }
};

const updateSingle = async (req, res) => {
  // #swagger.description = "Update a single contact in collection contacts"
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db("cse341")
    .collection("contacts")
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount = 1) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Catchall Error Occurred.  Could have been anything!");
  }
};

const deleteSingle = async (req, res) => {
  // #swagger.description = "Delete a single contact in collection contacts"
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db("cse341").collection("contacts").deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the contact.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createSingle,
  updateSingle,
  deleteSingle
};