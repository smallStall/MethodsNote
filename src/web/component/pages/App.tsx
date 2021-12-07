import './App.scss';
import { Column } from 'react-table';
import { Table } from '../molecules/Table';
import React from 'react';
import './App.scss';

type Data = {
  id: string;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  view: React.ReactNode;
};

const createArr = (n: number): Data[] => {
  const data: Data[] = [];
  for (let i = 0; i < n; i += 1) {
    data.push({
      id: `ID-${Math.random().toFixed(4)}`,
      date: new Date().toDateString(),
      firstName: `Rick #${i}`,
      lastName: `Sanchez #${i}`,
      email: `morty_${i}@rick.space`,
      view: <button>View</button>,
    });
  }
  return data;
};

export default function App() {
  const data = React.useMemo<Data[]>(() => createArr(3), []);
  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Date Requested',
        accessor: 'date',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        accessor: 'view',
      },
    ],
    []
  );

  return (
    <div className="app">
      <Table<Data> data={data} columns={columns} />
      <p>nohoho</p>
    </div>
  );
}
