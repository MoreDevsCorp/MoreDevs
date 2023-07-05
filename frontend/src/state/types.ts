export interface User {
  id: string | null;
  name: string | null;
  image: string | null;
  token: string | null;
  companyCreated: boolean | null;
  company: {
    id: string | null;
  } | null;
}
