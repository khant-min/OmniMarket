export interface User {
  id: string;
  slug: string;
  name?: string;
  avatar?: string;
  email?: string;
  varified: Boolean;
  phone?: string;
  refreshToken: string[];
}
