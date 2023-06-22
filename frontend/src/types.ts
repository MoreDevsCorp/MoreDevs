export type User = {
  id: string;
  email: string;
  token: string;
  image: string;
};

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

export interface CreateOfferVariables {
  companyId: string;
  title: string;
  description: string;
  location: string;
  skillsIds: string[];
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

export interface GetPostsData {
  posts: {
    author: {
      id: string;
      name: string;
      image: string;
      createdAt: string;
    };
    comments: number;
    likes: {
      id: string;
    };
  }[];
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
