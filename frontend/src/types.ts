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

export interface GetSkillsData {
  getSkills: {
    skills: {
      id: string;
      name: string;
    }[];
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
};

export interface GetOffersData {
  getOffers: {
    offers: Offer[];
  };
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
