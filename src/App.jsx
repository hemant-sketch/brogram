import Layout from "./components/Layout.jsx";
import Grid from "./components/Grid.jsx";
import {useState} from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Layout>
      <main>
        <Grid/>
      </main>
    </Layout>
    </>
  )
}

export default App
