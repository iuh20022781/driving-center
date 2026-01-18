import { SexStatus } from "@/types/enum/SexStatus";

export default interface UpdateUserRequest {
  name?: string;
  sex?: SexStatus | null;
  birthday?: string;
}
