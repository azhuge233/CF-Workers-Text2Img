export default {
  async fetch(request, env, ctx) {
    const Domain = env.DOMAIN;

    const html = `<!DOCTYPE html>
    <html class="dark">
    <head>
      <title>Stable Diffusion on Cloudflare Workers</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/papercss@1.9.2/dist/paper.min.css"/>
      <style>
        textarea {
          width: 100%;
          max-width: 100%;
        }
      </style>
    </head>
    <body bgcolor="#41403e">
      <div class="row site">
        <div class="sm-12 col no-boarder">
          <div class="paper border-thick">
            <div class="row flex-middle">
              <div class="sm-5 col">
                <lable for="step">Steps: </label>&nbsp;
                <input type="number" id="step" min="0" max="20" value="20">
                <br/><br/>
                <lable for="prompt">Prompt: </label>
                <br/>
                <textarea type="text" id="prompt" rows="10">Cloudflare Workers</textarea>
                <br/>
                <button class="paper-btn btn-primary" id="submit" onclick="submit()">Submit</button>
              </div>
              <div class="sm-1 col"></div>
              <div class="sm-6 col no-boarder">
                <img id="image" width="512" height="512" class="no-border" />
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      <script>
      function submit() {
        var alert = document.getElementById("alert")
        var numbox = document.getElementById("step");
        var textarea = document.getElementById("prompt");
        var image = document.getElementById("image");
        var button = document.getElementById("submit");
    
        var step = numbox.value;
        var prompt = textarea.value.replace(/(?:\\r\\n|\\r|\\n)/g, ' ')
        
        if(prompt == null || prompt == "") {
          window.alert("No prompt provided!");
          return;
        }
        
        numbox.disabled = true;
        textarea.disabled = true;
        button.disabled = true;
        
        fetch(\`https://${Domain}/?p=\${prompt}&s=\${step}\`)
          .then(response => response.blob())
          .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            image.src = imageUrl;
            
            numbox.disabled = false;
            textarea.disabled = false;
            button.disabled = false;
          })
          .catch(error => console.log(error));
      }
    </script>
    </body>
    
    </html>` 

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      }
    });
  },
};
