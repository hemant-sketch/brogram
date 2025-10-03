import Layout from "./components/Layout.jsx";
import Grid from "./components/Grid.jsx";
import Hero from "./components/Hero.jsx";
import './fanta.css';

function App() {
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

export default App;
