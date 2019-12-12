const UserModel = require("../../models//User.js");

module.exports = {
  Query: {
    getUsers: () => {
      return UserModel.find({});
    },
    getUser(_, { id }) {
      var user = UserModel.findById(id);
      return user;
    }
  },
  Mutation: {
    register: (_, args) => {
      const userDoc = new UserModel({ name: args.name, email: args.email });
      return userDoc.save();
    }
  }
};
