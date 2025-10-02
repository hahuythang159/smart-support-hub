interface ErrorResponse {
    errors?: { msg: string }[];
    message?: string;
    [key: string]: any;
}