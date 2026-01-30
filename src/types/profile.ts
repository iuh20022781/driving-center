export type Gender = "male" | "female" | "other";

export type Profile = {
  role: string; // readonly
  fullName: string;
  gender: Gender;
  dob: string; // yyyy-mm-dd
  phone: string;
  email: string;
  address: string;
  avatarUrl: string;
};
