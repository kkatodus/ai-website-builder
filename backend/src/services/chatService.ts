import getChatCompletion from "../repository/gptRepository";

export default async function service(
  curHTML: string,
  curCSS: string,
  request: string
) {
  const prompt = `Here is a HTML and CSS code snipped. Modify the HTML and CSS code to fit the request of the user. HTML: ${curHTML} CSS: ${curCSS} Request: ${request}\n The return value should be in the format of \n
  Explanation: <Verbal Response to the user request starting with something like e.g. Sure! I have made the changes....>\n
  HTML: <div>...</div>\n
  CSS: <raw css code>`;

  const response = await getChatCompletion(prompt);
  return parseResponse(response);
}

function parseResponse(response: string) {
  // Regular expressions to match different parts
  const explanationRegex = /^(.*?)HTML:/s;
  const htmlRegex = /HTML:\s*```html\s*(.*?)\s*```/s;
  const cssRegex = /CSS:\s*```css\s*(.*?)\s*```/s;

  // Extract different parts
  const explanationMatch = response.match(explanationRegex);
  const htmlMatch = response.match(htmlRegex);
  const cssMatch = response.match(cssRegex);

  // Assign the matched content or fallback to an empty string if not found
  const verbalResponse = explanationMatch ? explanationMatch[1].trim() : "";
  const htmlContent = htmlMatch ? htmlMatch[1].trim() : "";
  const cssContent = cssMatch ? cssMatch[1].trim() : "";

  return [verbalResponse, htmlContent, cssContent];
}
