import { useState, useEffect } from "react";

const API_KEY = "5a6706f0b1fa456c9f19f8bac2e84d94";

export default function NewsAggregator() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=video+game&language=en&searchIn=title,description&sortBy=publishedAt&pageSize=10&apiKey=${API_KEY}`,
      );
      const data = await res.json();
      setArticles(data.articles);
    }
    fetchNews();
  }, []);

  return (
    <div>
      <h2>Latest News</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ "text-align":"left"}}>
            <hr />
            <a href={article.url}>{article.title}</a>
            <p>by {article.author}</p>
            <p
              style={{
                color: "yellow",
                fontFamily: "consolas",
                fontSize: "16px",
              }}
            >
              "{article.description}"
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
