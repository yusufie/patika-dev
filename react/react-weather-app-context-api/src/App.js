import './App.css';
import Select from './components/Select';
import Table from './components/Table';
import { WeatherProvider } from './context/Weather';

function App() {
  return (
    <div>
      <WeatherProvider>

        <Select />
        <Table />
      </WeatherProvider>

    </div>
  );
}

export default App;
