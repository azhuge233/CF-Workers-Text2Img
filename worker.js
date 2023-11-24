export default {
  async fetch(request, env, ctx) {
    if(request.method != 'GET') {
      return new Response("GET request only.", {
        status: 200
      })
    }

    let url = new URL(request.url);
    let prompt = url.searchParams.get('p');
    let steps = 20;

    if (prompt == null || prompt == "") {
      return new Response("No prompt provided.", {
        status: 200
      });
    }

    if (url.searchParams.get('s') != null) {
      steps = parseInt(url.searchParams.get('s'));

      if(isNaN(steps) || steps > 20 || steps < 0) {
        return new Response("Invalid step, step must be in [0, 20]", {
          status: 200
        });
      }
    }

    console.log(prompt, steps);

    const UserID = env.UserID;
    const Token = env.APIToken;
    const CFApiEndpoint = `https://api.cloudflare.com/client/v4/accounts/${UserID}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`;

    const body = {
      prompt: prompt,
      num_steps: steps
    };

    const init = {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Token}`,
        "content-type": "application/json;",
      },
    };

    const response = await fetch(CFApiEndpoint, init);

    return new Response(response.body, {
      headers: {
          "content-type": "image/png",
      },
    });
  },
};
