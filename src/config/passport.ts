import { Strategy, ExtractJwt, VerifyCallback } from "passport-jwt";
import config from "./config";
import { UserService } from "user/user.service";

const jwtOptions = {
  secretOrKey: config.jwtConfig.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    const user = await new UserService().one(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
