import merge from "lodash.merge";

import userResolvers from "./user";
import post from "./post";
import comment from "./comment";
import skill from "./skill";
import interest from "./interest";
import notification from "./notification";
import follow from "./follow";
import offer from "./offer";
import profile from "./profile";
import company from "./company";
import feed from "./feed";

export default merge(
  {},
  userResolvers,
  post,
  comment,
  skill,
  interest,
  notification,
  follow,
  offer,
  profile,
  company,
  feed
);
