const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // get a single user by either their id or their username
        getMe: async (parent, args, context) => {
            // need to find user from decoding token. 
            const foundUser = await User.findOne({
                $or: [{ _id: context.user._id ? context.user._id : params.id }, { username: params.username }],
            });

            if (!foundUser) {
                console.log('Cannot find a user with this id!')
            }

            return User.find({});
        },

    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            // JWT Auth
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // JWT Auth
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { body }, context) => {
            const updatedBook = await Book.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
                console.log('updated book: ', updatedBook)

                return updatedBook;
        },
        deleteBook: async (parent, args, context) => {
            const updatedBook = await Book.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
              );

              if (!updatedBook) {
                console.log('Error deleting book')
              }

              return updatedBook;
        }
    }
};
module.exports = resolvers;