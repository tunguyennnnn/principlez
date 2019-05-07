import { generateToken } from '../../services/auth';
import { encrypt, compare } from '../../services/bcrypt';

export default {
  User: {
    profileImage: () => {
      return {
        large: 'https://avatarfiles.alphacoders.com/715/71560.jpg',
        medium: 'https://avatarfiles.alphacoders.com/715/71560.jpg',
        thumb: 'https://avatarfiles.alphacoders.com/715/71560.jpg',
      };
    },
    authToken: user => {
      const { id, email, createdAt } = user;
      return generateToken({ id, email, createdAt });
    },
    location: async (user, args, { models }) => {
      return await user.getLocation();
    },
  },
  Query: {
    me: async (root, args, { models, user }) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    },
    user: async (root, { id }, { models, user }) => {
      return models.User.findOne({ id });
    },
    users: async (root, args, { models, user }) => {
      return models.User.findAll();
    },
  },
  Mutation: {
    signup: async (
      root,
      { email, fullname, password, location, yearOfBirth },
      { models },
    ) => {
      try {
        const userLocation = await models.Location.findOneOrCreate(location);

        const bcryptPassword = await encrypt(password);

        const user = await models.User.create({
          email,
          fullname,
          password: bcryptPassword,
          yearOfBirth,
          locationId: userLocation.id,
        });
        await models.ChapterGroup.createDefaultGroups(user.id);
        return { user };
      } catch (e) {
        return { error: e.toString() };
      }
    },
    login: async (root, { email, password }, { models }) => {
      try {
        const user = await models.User.findOne({ where: { email } });
        if (!user || !(await compare(password, user.password))) {
          throw new Error(`Incorrect email or password`);
        }
        return { user };
      } catch (e) {
        return { error: e.toString() };
      }
    },
    updateUserInfo: {
      authentication: true,
      resolve: async (
        root,
        { fullname, yearOfBirth, blurb, occupation },
        { models, user },
      ) => {
        try {
          const newUser = await user.update({
            fullname: fullname || user.fullname,
            yearOfBirth: yearOfBirth || user.yearOfBirth,
            blurb: blurb || user.blurb,
            occupation: occupation || user.occupation,
          });
          return { user: newUser };
        } catch (e) {
          return { error: e.toString() };
        }
      },
    },
  },
};
