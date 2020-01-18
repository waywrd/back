const UserModel = require("../../models//User.js");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isAuth = require("../middleware/isAuth");
const pubsub = new PubSub();

module.exports = {
  getUsers: req => {
    if (!req.isAuth) {
      throw Error("Unauthenticated!");
    }
    return UserModel.find({}, "name email");
  },
  getUser({ id }) {
    var user = UserModel.findById(id, "name email");
    return user;
  },
  login: async ({ email, password }) => {
    console.log(email);
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("User do not exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error("Password is incorrect");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "secretkey",
      {
        expiresIn: "1h"
      }
    );
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1
    };
  },
  register: async args => {
    return UserModel.findOne({ name: args.name })
      .then(user => {
        if (user) {
          throw new Error("User exists already.");
        }
        return bcrypt.hash(args.password, 12);
      })
      .then(hashedPassword => {
        const user = new UserModel({
          name: args.name,
          email: args.email,
          password: hashedPassword
        });
        pubsub.publish("DDz");
        return user.save();
      })
      .then(result => {
        return { ...result._doc, password: null, id: result.id };
      })
      .catch(err => {
        throw err;
      });
  },
  userAdded: {
    subscribe: () => pubsub.asyncIterator("userAdded")
  }
};
