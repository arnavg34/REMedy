const API_KEY = process.env.EXPO_PUBLIC_NEWSAPI_KEY;

export async function services(q) {
  let url =
    "https://newsapi.org/v2/everything?" +
    "q=" +
    q +
    "&searchIn=title" +
    "&apiKey=" +
    API_KEY;
  console.log(url);
  let req = new Request(url);

  let a = await fetch(req);
  let result = await a.json();
  return result.articles;
}
