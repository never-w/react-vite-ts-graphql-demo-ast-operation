import { useMemo, useState } from "react"
import reactLogo from "./assets/react.svg"
import "./App.css"
import operationsFromSchema from "./utils/operations"
import { parse, buildSchema } from "graphql"

function App() {
  const [count, setCount] = useState(0)

  useMemo(async () => {
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
      query Query {
          _schema
        }
    `,
      }),
    })
      .then((response) => response.json())
      .then((data) => parse(data.data._schema).loc?.source.body)
      .then((source) => {
        const schema = buildSchema(source as string, {
          noLocation: true,
        })

        const operationsDictionary = {
          query: { ...(schema.getQueryType()?.getFields() || {}) },
          mutation: { ...(schema.getMutationType()?.getFields() || {}) },
          subscription: { ...(schema.getSubscriptionType()?.getFields() || {}) },
        }

        // console.log(operationsDictionary, "99999999999")
      })
      .catch((error) => console.error(error))

    // getSchemaFromUrl("http://localhost:4000/graphql").then((res) => {
    //   const queryOperations = res.getQueryType()

    //   console.log(queryOperations?.getFields()["hello"].type)
    //   console.log({ ...(res.getQueryType()?.getFields() || {}) })
    // })
    // http://192.168.10.233:9406/graphql
    const res = await operationsFromSchema("http://localhost:4000/graphql")
    console.log(res, "=+++++++++")
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default App
