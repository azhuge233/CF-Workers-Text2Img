# CF-Workers-Text2Img

Simple text to image script using Cloudflare Workers

## Usage

### worker.js

1. Obtain your Cloudflare account ID.
   - After logging in, your account ID can be found in the dashboard URL.
3. Generate a Workers AI API token at [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).
4. Create a new Workers instance and add environment variables.
    - Set `APIToken` as the Workers AI API token and `UserID` as the account ID.
5. Copy-paste the content from `worker.js` into the newly created Workers instance.
6. Send `GET` requests with the parameter `p` (as the prompt) to the Worker.
    - There's also an `s` parameter that indicates the number of generation steps, default is 20 (maximum).

### static-page-worker.js

This worker provides a simple web page to call previous `worker.js` page as API

To use this `static-page-worker.js`, you need to

1. Create a new Workers instance and add the `worker.js` worker domain as the environment variable `DOMAIN` (e.g. sdapi.example.com, without any http/https prefix)
2. Copy-paste the content from `static-page-worker.js` into the newly created Workers instance.
3. Visit the page.
