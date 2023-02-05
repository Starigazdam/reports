import { useEffect, useState } from "react";
import viteLogo from "./assets/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["CSV"];

function App() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const handleChange = (file: any) => {
    setFile(file);
    console.log(file.name);
  };

  useEffect(() => {
    if (file) {
      parseCsvFile(file).then((transactions) => setTransactions(transactions));
    }
  }, [file]);

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
          <TransactionTable transactions={transactions} />
        </div>
      )}
    </div>
  );
}

export default App;

import { parse } from "csv-parse";
import Papa from "papaparse";

interface Transaction {
  Date: string;
  Amount: number;
  Description: string;
  Category: string;
  Account: string;
  Jived: string;
  CheckNumber: string;
  Payee: string;
  Memo: string;
  User: string;
}

// async function parseCsvFile(file: File): Promise<Transaction[]> {
//   return new Promise((resolve, reject) => {
//     const transactions: Transaction[] = [];
//     const reader = new FileReader();
//     reader.readAsText(file, "UTF-8");
//     reader.onload = () => {
//       parse(
//         reader.result as string,
//         {
//           delimiter: ",",
//           columns: true,
//           relax_column_count: true,
//           on_record: (record: any) => {
//             transactions.push({
//               Date: record.Date,
//               Amount: parseFloat(record.Amount),
//               Description: record.Description,
//               Category: record.Category,
//               Account: record.Account,
//               Jived: record.Jived,
//               CheckNumber: record.CheckNumber,
//               Payee: record.Payee,
//               Memo: record.Memo,
//               User: record.User,
//             });
//           },
//         },
//         (error, output) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(transactions);
//           }
//         }
//       );
//     };
//   });
// }

const parseCsvFile = (file: File): Promise<Transaction[] | null> => {
  return new Promise<Transaction[] | null>((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        resolve(results.data as Transaction[]);
      },
      error: (error) => {
        reject(null);
      },
    });
  });
};

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
          <th>Account</th>
          <th>Jived</th>
          <th>Check Number</th>
          <th>Payee</th>
          <th>Memo</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.Date + transaction.Amount}>
            <td>{transaction.Date}</td>
            <td>{transaction.Amount}</td>
            <td>{transaction.Description}</td>
            <td>{transaction.Category}</td>
            <td>{transaction.Account}</td>
            <td>{transaction.Jived}</td>
            <td>{transaction.CheckNumber}</td>
            <td>{transaction.Payee}</td>
            <td>{transaction.Memo}</td>
            <td>{transaction.User}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
