import { invalidResponse } from "./invalidResponse";

// returns the config for next-connect handler
export function getNChandlerConfig() {
    // Define Middlewares for "Error" & "No Match"
    return {
        onNoMatch: (req, res) => {
            invalidResponse(res, `Method ${req.method} not allowed`, 405);
        },
        onError: (err, req, res) => {
            invalidResponse(res, err.message, 500);
        }
    };
}