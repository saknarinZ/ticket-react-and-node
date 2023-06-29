import { useEffect, useState } from 'react';

import { Paginator } from 'primereact/paginator';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ITicket } from '../interface/ticket.interface';
import { Dropdown } from 'primereact/dropdown';

const TableTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [page, setPage] = useState<number>(1);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(100);
  const [satuts, setSatuts] = useState<string>();

  interface Items {
    name: string;
    value: string;
  }

  const items: Items[] = [
    { name: 'pending', value: 'pending' },
    { name: 'accepted', value: 'accepted' },
    { name: 'resolved', value: 'resolved' },
    { name: 'rejected', value: 'rejected' },
  ];

  useEffect(() => {
    // get api Axios.get setTickets

    const fetchData = async () => {
      try {
        const response = await axios
          .get('http://localhost:3000/api/tickets')
          .then((items) => {
            return items.data;
          });
        setTotalRecords(response.totalRecords);
        setTickets(response.data.tickets);
      } catch (error) {
        toast.error('Error while fetching tickets');
      }
    };

    fetchData();
  }, []);

  // pending, accepted, resolved, rejected
  // const items = [
  //   {
  //     label: 'เรียงตาม',
  //     items: [
  //       {
  //         label: 'pending',
  //         command: () => {
  //           filterSataus('pending');
  //         },
  //       },
  //       {
  //         label: 'accepted',
  //         command: () => {
  //           filterSataus('accepted');
  //         },
  //       },
  //       {
  //         label: 'resolved',
  //         command: () => {
  //           filterSataus('resolved');
  //         },
  //       },
  //       {
  //         label: 'rejected',
  //         command: () => {
  //           filterSataus('rejected');
  //         },
  //       },
  //     ],
  //   },
  // ];

  const filterSataus = async (status: string) => {
    const response = await axios
      .get(
        `http://localhost:3000/api/tickets?page=${page}&limit=${rows}&status=${status}`
      )
      .then((items) => {
        return items.data;
      });
    setSatuts(status);
    setTickets(response.data.tickets);
  };

  const onPageChange = async (event: any) => {
    const response = await axios
      .get(
        `http://localhost:3000/api/tickets?page=${event.page + 1}&limit=${
          event.rows
        }`
      )
      .then((items) => {
        return items.data;
      });

    setTickets(response.data.tickets);
    setPage(event.page + 1);
    setFirst(event.first);
    setRows(event.rows);
  };

  const colorStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-orange-500';
      case 'accepted':
        return 'text-green-500';
      case 'resolved':
        return 'text-cyan-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-orange-500';
    }
  };

  return (
    <div className="p-10 bg-white w-11/12 rounded-lg mx-auto ">
      <div className=" mb-6">
        <Dropdown
          value={satuts}
          onChange={(e) => filterSataus(e.value)}
          options={items}
          optionLabel="name"
          optionValue="value"
          placeholder="search status"
        />
      </div>

      <div className="overflow-x-auto shadow-md">
        <table className=" table-auto min-w-full divide-y divide-gray-200  rounded-lg ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded">
                status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded">
                title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded">
                description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded">
                contact information
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => {
              return (
                <tr key={ticket._id}>
                  <td
                    className={`${colorStatus(
                      ticket?.status!
                    )} font-bold px-6 py-4 whitespace-nowrap rounded`}
                  >
                    {ticket.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap rounded">
                    {ticket.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap rounded">
                    {ticket.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap rounded">
                    {ticket.contactinformation}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TableTickets;
