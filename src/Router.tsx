import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

interface IRouterProps {
  isDark:boolean;
  toggleDark: () => void;
}

function Router({ isDark, toggleDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin isDark={isDark}/>}/>
        <Route path="/" element={<Coins toggleDark={toggleDark}/>}/>
      </Routes>
    </BrowserRouter>
  );

}

export default Router;