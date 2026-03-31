import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
