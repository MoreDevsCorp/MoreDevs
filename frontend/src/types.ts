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

export interface GetProfileData {
  id: string;
  name: string;
  location: string;
  image: string;
  bio: string;
  skills: string[];
  experiences: {
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
  };
  educations: {
    id: string;
    location: string;
    startedAt: string;
    endedAt: string;
  };
  followers: number;
  following: number;
}
