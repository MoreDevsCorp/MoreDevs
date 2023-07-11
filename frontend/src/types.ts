export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  image: string;
  companyCreated: boolean;
  company: {
    id: string;
  };
};

export interface GetUserData {
  getUser: {
    user: User;
  };
}

/**
 * Skill related types
 */

export interface GetSkillsData {
  getSkills: {
    skills: {
      id: string;
      slug: string;
      name: string;
    }[];
  };
}

export interface AddSkillVariables {
  name: string;
}

export interface AddSkillData {
  addSkill: {
    success: boolean;
  };
}

/**
 *  Offer related types
 */

export type Offer = {
  id: string;
  title: string;
  description: string;
  company: {
    id: string;
    name: string;
    location: string;
    avatar: string;
  };
  type: string;
  createdAt: string;
  taken: boolean;
  location: string;
  skills: {
    skill: Skill;
  }[];
};

export interface GetOffersData {
  getOffers: {
    offers: Offer[];
  };
}

export interface GetOfferData {
  getOffer: {
    offer: Offer;
  };
}

export interface GetOfferVariables {
  id: string;
}

export interface CreateOfferVariables {
  companyId: string;
  title: string;
  description: string;
  location: string;
  skillsIds: string[];
  type: string;
}
export interface CreateOfferData {
  success: boolean;
}

/**
 * Skill related types
 */

export interface GetExperiencesData {
  getExperiences: {
    experiences: Experience[];
  };
}

/**
 *  Post related types
 */

export interface CreatePostVariables {
  content: string;
}
export interface CreatePostData {
  sucess: boolean;
}

export interface Post {
  author: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
  comments: number;
  likes: {
    id: string;
  };
}

export interface GetPostsData {
  getPosts: {
    posts: Post[];
  };
}

/**
 * Follow related types
 *  */

export interface FollowVariables {
  userId: string;
}

export interface FollowData {
  follow: {
    success: boolean;
  };
}

/**
 *  Profile related types
 */

export interface GetProfileVariables {
  userId: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  location: string;
  company: {
    id: string;
    name: string;
    location: string;
    avatar: string;
  };
  startDate: string;
  endDate: string;
  present: boolean;
}

export interface Education {
  id: string;
  location: string;
  startedAt: string;
  endedAt: string;
}

export interface Profile {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string;
  image: string;
  bio: string;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  followers: number;
  following: number;
  job_type: string;
  job_title: string;
  city: string;
  isFollowed: boolean;
}

export interface GetProfileData {
  getProfile: {
    profile: Profile;
  };
}

export interface SetUpProfileVariables {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  city: string;
  job_type: string;
  job_title: string;
}

export interface SetUpProfileData {
  setUpProfile: {
    success: boolean;
  };
}

/**
 * Company Related types
 */

export interface CreateCompanyVariables {
  name: string;
  description: string;
  slogan: string;
  location: string;
}

export interface UpdateCompanyVariables {
  companyId: string;
  name: string;
  description: string;
  slogan: string;
  location: string;
  website: string;
}
export interface UpdateCompanyData {
  updateCompany: {
    success: boolean;
  };
}

export interface CreateCompanyData {
  createCompany: {
    id: string;
  };
}

export interface GetCompanyVariables {
  id: string;
}

export type Company = {
  id: string;
  name: string;
  description: string;
  location: string;
  avatar: string;
  website: string;
  slogan: string;
  offers: {
    id: string;
    title: string;
    createdAt: string;
  };
};

export interface GetCompanyData {
  getCompany: {
    company: Company;
  };
}
