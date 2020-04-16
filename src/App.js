import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get('/repositories');
      const { data } = response;

      setRepositories(data);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const repository = { 
      "id": "uuid",
      "title": "Desafio Node.js",
      "url": "http://github.com/igorgodoy/tindev",
      "techs": ["Node.js", "React", "React Native"],
      "likes": 0
    };

    const response = await api.post('/repositories', repository);

    const msg = response.status === 200 ? 'Repositório adicionado.' : 'Falha ao adicionar repositório.';

    console.log(msg);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    const msg = response.status === 204 ? 'Repositório excluído.' : 'Falha ao excluir repositório.';

    console.log(msg);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div data-testid="repository-list-container">
      { 
        (
          <ul data-testid="repository-list">
            {
              repositories.length > 0 ? repositories.map(repository => (
                <li key={repository.id}>
                  {repository.title}
      
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
              )) : ''
            }
          </ul>
        ) 
      }

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;