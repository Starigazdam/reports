import { useState } from "react";
import viteLogo from "./assets/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FileUploader } from "react-drag-drop-files";
import { ITransaction } from "./modules/clearcheckbook/types";
import { parseCsvFile } from "./modules/clearcheckbook/parseCsvFile";
import { TransactionTable } from "./modules/clearcheckbook/TransactionTable";

const fileTypes = ["CSV"];

function App() {
  const [count, setCount] = useState(0);
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

  const handleChange = async (file: any) => {
    if (file) {
      parseCsvFile(file).then((transactions) => setTransactions(transactions));
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p className="read-the-docs">repo: starigazdam/reports</p>
      <div>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>
      {transactions && (
        <div>
          <TransactionTable transactions={transactions} limit={10} />
        </div>
      )}
    </div>
  );
}

export default App;
