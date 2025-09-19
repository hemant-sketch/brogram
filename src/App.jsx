import Layout from "./components/Layout.jsx";
import Grid from "./components/Grid.jsx";
import Hero from "./components/Hero.jsx";
import {useState} from 'react';
import './fanta.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Layout>
      <main>
        <Hero/>
        <Grid/>
      </main>
    </Layout>
    </>
  )
}

export default App
