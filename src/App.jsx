import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import ErrorBoundary from "./components/Navbar/Errorboundary";

function RepoList() {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchRepos = async () => {
    const response = await fetch(`https://api.github.com/users/BalezDev/repos?page=${page}&per_page=100`);
    const data = await response.json();
    setRepos(prevRepos => [...prevRepos, ...data]);
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div>
      <h1>Balez GitHub Repositories</h1>
      {repos.map((repo) => (
        <p key={repo.id}>
          <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
        </p>
      ))}
      <button onClick={fetchRepos}>Load more</button>
    </div>
  );
}

//   useEffect(() => {
//     fetch("https://api.github.com/users/BalezDev/repos")
//       .then((response) => response.json())
//       .then((data) => setRepos(data))
//       .catch((error) => console.error("Error:", error));
//   }, []);

//   return (
//     <div>
//       <h1>Balez GitHub Repositories</h1>
//       {repos.map((repo) => (
//         <p key={repo.id}>
//           <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
//         </p>
//       ))}
//       <button onClick={fetch}>Load more</button>
//     </div>
//   );
// }

function Repo() {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/BalezDev/${repoName}`)
      .then((response) => response.json())
      .then((data) => setRepo(data))
      .catch((error) => console.error("Error:", error));
  }, [repoName]);

  if (!repo) return <div>Loading...</div>;

  return (
    <ErrorBoundary fallback = "Error">
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <a href={repo.html_url}>View on GitHub</a>
    </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/repo" element={<Repo />}></Route>
        <Route path="/" element={<RepoList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;