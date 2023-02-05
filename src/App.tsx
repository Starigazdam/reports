import { useState } from "react";
import viteLogo from "./assets/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FileUploader } from "react-drag-drop-files";
import { ITransaction } from "./modules/clearcheckbook/types";
import { parseCsvFile } from "./modules/clearcheckbook/parseCsvFile";
import { TransactionTable } from "./modules/clearcheckbook/TransactionTable";
import { Doughnut } from "react-chartjs-2";

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
          <Doughnut data={data} />
        </div>
      )}
    </div>
  );
}

export default App;

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
