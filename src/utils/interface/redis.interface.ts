export interface IRedisData {
  key: string;
  value: string;
}

export interface IRedisResponse {
  data?: string;
  isSuccess: boolean;
  message: string;
  status: number;
}
