import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes/Routes';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            caseSensitive={route.caseSensitive}
            path={route.path}
            element={route.element}
            index={route.index}
            id={route.id}
            loader={route.loader}
            action={route.action}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
