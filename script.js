
const button = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  const style = document.getElementById("style").value;
  const ratio = document.getElementById("ratio").value;

  if (!prompt) {
    alert("Please describe the image you want!");
    return;
  }

  button.disabled = true;
  button.innerHTML = "✦ Creating your image...";

  result.style.display = "block";
  result.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">✧</div>
      <p>Creating your imagination...</p>
      <small>Please wait while the image is generated.</small>
    </div>
  `;

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        style,
        ratio
      })
    });

    if (!response.ok) {
      throw new Error("Image generation failed");
    }

    const data = await response.json();

    if (!data.imageUrl) {
      throw new Error("No image returned");
    }

    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = "AI generated image";

    result.innerHTML = "";
    result.appendChild(img);

  } catch (error) {
    result.innerHTML = `
      <div class="placeholder">
        <p>Unable to generate image.</p>
        <small>Connect your AI generation backend and try again.</small>
      </div>
    `;
    console.error(error);
  } finally {
    button.disabled = false;
    button.innerHTML = "✦ Generate Image";
  }
});
