export interface IRedisData {
  token: string;
}

export interface IRedisResponse {
  data?: string;
  isSuccess: boolean;
  message: string;
  status: number;
}
