export default interface ChangePasswordResponse {
  status: number;
  message: string;
  result: string;
  errors?: PASSWORD_ERROR[];
  timestamp: number;
}

interface PASSWORD_ERROR {
  code: string;
  message: string;
}
