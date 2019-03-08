import { generateToken } from '../../services/auth';
import { encrypt, compare } from '../../services/bcrypt';

export default {
  User: {
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
        return user;
      } catch (e) {
        throw e;
      }
    },
    login: async (root, { email, password }, { models }) => {
      try {
        const user = await models.User.findOne({ where: { email } });
        if (!user || !(await compare(password, user.password))) {
          throw new Error(`Incorrect email or password`);
        }
        return user;
      } catch (e) {}
    },
  },
};
