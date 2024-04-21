import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from 'react-router-dom';


function RepoList() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/BalezDev/repos')
      .then(response => response.json())
      .then(data => setRepos(data))
      .catch(error => console.error('Error:', error));
  }, []);


  return (
    <div>
      <h1>Balez GitHub Repositories</h1>
      {repos.map(repo => (
        <p key={repo.id}>
          <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
        </p>
      ))}
    <button onClick={fetch}>Load more</button>
    </div>
  );
}

function Repo() {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/BalezDev/${repoName}`)
      .then(response => response.json())
      .then(data => setRepo(data))
      .catch(error => console.error('Error:', error));
  }, [repoName]);

  if (!repo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <a href={repo.html_url}>View on GitHub</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/repo" element={<Repo />}>
        </Route>
        <Route path="/" element={<RepoList />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;