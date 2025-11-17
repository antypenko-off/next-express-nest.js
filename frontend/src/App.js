import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [users, setUsers] = useState([]);

    useEffect(() => {
    axios.get('/api/users').then(({data}) => setUsers(data))
  }, []);

  return (
      <div>
        <h1>Users!!!!:</h1>
        {
          users.map(user => <div key={user._id}>{JSON.stringify(user)}</div>)
        }
      </div>
  );
}

export default App;
