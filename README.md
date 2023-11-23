# CF-Workers-Text2Img

Simple text to image script using Cloudflare Workers

## Usage

1. Obtain your Cloudflare account ID.
   - After logging in, your account ID can be found in the dashboard URL.
3. Generate a Workers AI API token at [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).
4. Create a new Workers instance and add your account ID and API token as environment variables.
    - Set `APIToken` as the Workers AI API token and `UserID` as the account ID.
5. Copy-paste the content from `worker.js` into the newly created Workers instance.
6. Send `GET` requests with the parameter `p` (as the prompt) to the Worker.
    - There's also an `s` parameter that indicates the number of generation steps, maximum 20.
