import { PageInfo } from "../Page/PageType";

export interface ApiResponseArray<T> {
  status: number;
  message: string;
  result: {
    content: T[];
    page: PageInfo;
  };
  timestamp: number;
}

// API Response wrapper
export interface ApiResponseObject<T> {
  status: number;
  message: string;
  result: T;
  timestamp: number;
}
