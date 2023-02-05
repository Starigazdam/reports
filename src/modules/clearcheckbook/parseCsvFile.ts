import Papa from "papaparse";
import { ITransaction } from "./types";

export const parseCsvFile = (file: File): Promise<ITransaction[] | null> => {
  return new Promise<ITransaction[] | null>((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        resolve(results.data as ITransaction[]);
      },
      error: (error) => {
        reject(null);
      },
    });
  });
};
