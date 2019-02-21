import generateToken from '../../services/generateToken';
import encrypt from '../../services/encrypt';

export default {
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

        const { token, expiresIn } = generateToken({
          id: user.id,
          email,
          createdAt: user.createdAt,
        });
        const { id } = user;
        return { id, email, fullname, yearOfBirth, location: userLocation };
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
};
