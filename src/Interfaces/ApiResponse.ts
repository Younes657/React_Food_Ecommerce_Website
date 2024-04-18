export default interface ApiResponse {
  data?: {
    isSuccess?: boolean;
    errors: Array<string>;
    statusCode?: number;
    result?: {
      [key: string]: string;
    };
  };
  error?: any;
}
