# CF-Workers-Text2Img

Simple text to image script using Cloudflare Workers

## Usage

`worker.js` can be used alone, `static-page-worker.js` needs to setup `worker.js` first.

### worker.js

1. Obtain your Cloudflare account ID.
   - After logging in, your account ID can be found in the dashboard URL.
3. Generate a Workers AI API token at [https://dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens).
4. Create a new Workers instance and add environment variables.
    - Set `APIToken` as the Workers AI API token and `UserID` as the account ID.
    - Set `CORS_DOMAIN` as the CORS restrict domain.
      - If you want this worker to be used by all clients, just set it to `*`, otherwise set it to the domain you want restrcition to.
5. Copy-paste the content from `worker.js` into the newly created Workers instance.
6. Send `GET` requests with the parameter `p` (as the prompt) to the Worker.
    - There's also an `s` parameter that indicates the number of generation steps, default is 20 (maximum).

### static-page-worker.js

This worker provides a simple web page to call previous `worker.js` worker as an API

To use this `static-page-worker.js`, you need to

1. Create a new Workers instance and and add environment variables.
    - Add the `worker.js` worker's domain as the environment variable `DOMAIN` (e.g. sdapi.example.com, without any http/https prefix)
2. (Optional) Change `worker.js` worker's `CORS_DOMAIN` environment variable to this worker's domain (or change to `*`) if you have restriction on other domains before.
3. Copy-paste the content from `static-page-worker.js` into the newly created Workers instance.
4. Visit the page.
