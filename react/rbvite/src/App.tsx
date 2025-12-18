import { Route, Routes } from 'react-router-dom';
import Hello from './components/Hello';
import Home from './components/Home';
import My from './components/My';
import Nav from './components/Nav';
import Posts from './components/Posts';
import { useCounter } from './hooks/CounterContext';
import { SessionProvider } from './hooks/SessionContext';

function App() {
  // const [count, setCount] = useState(0);
  const { count } = useCounter();

  return (
    <div className='grid place-items-center h-screen mx-2'>
      <h1 className='text-3xl'>count: {count}</h1>
      <SessionProvider>
        <Nav />
        <div className='grid place-items-center h-screen mx-2'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/my' element={<My />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/hello' element={<Hello />} />
            <Route path='*' element={<h1>경로잘못쳤음!</h1>} />
          </Routes>
        </div>
      </SessionProvider>
      {/* <div className='mt-10 pb-10'>
        <Practice />
      </div> */}
    </div>
  );
}

export default App;
