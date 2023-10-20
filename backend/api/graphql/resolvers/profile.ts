import { GraphQLError } from "graphql";
import { Context } from "../../utils/types";
import { Prisma } from "@prisma/client";

export default {
  Query: {
    getProfile: async (_: any, args: { userId: string }, context: Context) => {
      const { session, prisma } = context;
      const { userId } = args;

      if (!session?.user) {
        throw new GraphQLError("You're not authenticated !", {
          extensions: { code: 401 },
        });
      }

      try {
        const profile = await prisma.user.findFirst({
          where: { id: userId },
          include: profilePopulated,
        });

        if (!profile) {
          throw new GraphQLError("Not Found !", {
            extensions: { code: 404 },
          });
        }

        const skills = profile.skills.map((skill: any) => ({
          id: skill.skill?.id,
          name: skill.skill?.name,
        }));

        let isFollowed;

        const existingFollow = await prisma.follows.findFirst({
          where: {
            followingId: userId,
            AND: {
              followerId: session.user.id,
            },
          },
        });

        if (existingFollow) {
          isFollowed = true;
        } else {
          isFollowed = false;
        }

        // const followers = profile.followers.map((item) => {
        //   return {
        //     id: item.following.id,
        //     name: item.following.name,
        //   };
        // });
        // const following = profile.followers.map((item) => {
        //   return {
        //     id: item.following.id,
        //     name: item.following.name,
        //   };
        // });

        const following = await prisma.follows.findMany({
          where: {
            followerId: userId || session.user.id,
          },

          include: {
            following: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        const followers = await prisma.follows.findMany({
          where: {
            NOT: {
              followerId: userId || session.user.id,
            },
            AND: {
              followingId: userId || session.user.id,
            },
          },

          include: {
            follower: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        const followersArr = followers.map((item: any) => {
          return {
            id: item.follower.id,
            name: item.follower.name,
          };
        });

        const followingArr = following.map((item: any) => {
          return {
            id: item.following.id,
            name: item.following.name,
          };
        });

        return {
          profile: {
            ...profile,
            skills,
            isFollowed,
            followers: followersArr,
            following: followingArr,
          },
        };
      } catch (error: any) {
        console.log("Error getting profile :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
  Mutation: {
    setUpProfile: async (
      _: any,
      args: {
        id: string;
        first_name: string;
        last_name: string;
        bio: string;
        job_title: string;
        job_type: string;
        city: string;
      },
      context: Context
    ) => {
      const { session, prisma } = context;
      const { id, bio, city, first_name, job_title, job_type, last_name } =
        args;

      try {
        const user = await prisma.user.update({
          where: { id },
          data: {
            first_name,
            last_name,
            job_title,
            job_type,
            city,
            bio,
            location: `${city}, Morocco`,
            name: `${first_name} ${last_name}`,
          },
        });

        if (!user) {
          throw new GraphQLError("Not found", {
            extensions: { code: 404 },
          });
        }

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("Error setting up profile :", error.message);
        throw new GraphQLError(error.message, {
          extensions: { code: 500 },
        });
      }
    },
  },
};

export const profilePopulated = Prisma.validator<Prisma.UserInclude>()({
  experiences: {
    select: {
      id: true,
      present: true,
      title: true,
      description: true,
      location: true,
      company: true,
      startDate: true,
      endDate: true,
    },
  },

  educations: {
    select: {
      id: true,
      level: true,
      startedAt: true,
      endedAt: true,
      title: true,
      description: true,
      present: true,
    },
  },

  // followers: {
  //   select: {
  //     following: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //   },
  // },

  // following: {
  //   select: {
  //     follower: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //   },
  // },

  skills: {
    select: {
      skill: {
        include: {
          UserSkill: {
            include: {
              skill: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  },
});
