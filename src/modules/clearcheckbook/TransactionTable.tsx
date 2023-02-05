import { Guid } from "guid-typescript";
import { ITransaction } from "./types";

interface TransactionTableProps {
  transactions: ITransaction[];
  limit?: number;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  limit,
}) => {
  const rowCount = limit ?? transactions.length;
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
        {transactions.slice(0, rowCount).map((transaction) => (
          <tr key={Guid.create().toString()}>
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
