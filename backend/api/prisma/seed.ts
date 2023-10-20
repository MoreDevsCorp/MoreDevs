import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const mobileHashTags = [
  {
    name: "reactnative",
  },
  {
    name: "flutter",
  },
  {
    name: "android",
  },
  {
    name: "ios",
  },
  {
    name: "kotlin",
  },
  {
    name: "java",
  },
  {
    name: "swift",
  },
];

const webHashTags = [
  {
    name: "backend",
  },
  {
    name: "frontend",
  },
  {
    name: "reactjs",
  },
  {
    name: "typescript",
  },
  {
    name: "webdev",
  },
  {
    name: "mongodb",
  },
  {
    name: "django",
  },
  {
    name: "nextjs",
  },
  {
    name: "graphql",
  },
  {
    name: "php",
  },
  {
    name: "aws",
  },
];

const interestsArray = [
  {
    name: "Web Development",
  },
  {
    name: "Mobile Development",
  },
];

const skills = [
  {
    name: "Javascript",
    slug: "javascript",
  },
  {
    name: "ReactJS",
    slug: "reactjs",
  },
  {
    name: "Laravel",
    slug: "laravel",
  },
  {
    name: "Java",
    slug: "java",
  },
  {
    name: ".NET",
    slug: ".net",
  },
];

async function main() {
  await prisma.hashTag.deleteMany();
  await prisma.interest.deleteMany();
  await prisma.interestHashTag.deleteMany();
  await prisma.skill.deleteMany();

  await prisma.skill.createMany({
    data: skills,
  });

  await prisma.hashTag.createMany({
    data: [...webHashTags, ...mobileHashTags],
  });
  await prisma.interest.createMany({ data: interestsArray });

  const hashtags = await prisma.hashTag.findMany();

  const webinterests = await prisma.interest.findFirst({
    where: { name: "Web Development" },
  });
  const mobileinterests = await prisma.interest.findFirst({
    where: { name: "Mobile Development" },
  });

  webHashTags.forEach(async (element) => {
    await prisma.interestHashTag.create({
      data: {
        hashTagId:
          hashtags.find((ht: any) => ht.name === element.name)?.id || "",
        interestId: webinterests?.id || "",
      },
    });
  });

  mobileHashTags.forEach(async (element) => {
    await prisma.interestHashTag.create({
      data: {
        hashTagId:
          hashtags.find((ht: any) => ht.name === element.name)?.id || "",
        interestId: mobileinterests?.id || "",
      },
    });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
