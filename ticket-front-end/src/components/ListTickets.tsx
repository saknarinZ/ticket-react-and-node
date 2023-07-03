//  ListTaks component
import { toast } from 'react-hot-toast';
import {
  ITicket,
  ITicketUpdateStatus,
  TicketProps,
} from '../interface/ticket.interface';
import { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import axios from 'axios';
import { BaseRepository } from '../api/BaseRepository';

const ListTickts = ({ tickets, setTickets }: TicketProps) => {
  // console.log('🚀 ~ file: ListTickets.tsx:8 ~ ListTickts ~ tickets:', tickets[0]._id);
  // pending, accepted, resolved, rejected
  const [pending, setPending] = useState<ITicket[]>([]);
  const [accepted, setAccepted] = useState<ITicket[]>([]);
  const [resolved, setResolved] = useState<ITicket[]>([]);
  const [rejected, setRejected] = useState<ITicket[]>([]);

  useEffect(() => {
    const fpending = tickets.filter((tickets) => tickets.status === 'pending');
    const faccepted = tickets.filter(
      (tickets) => tickets.status === 'accepted'
    );
    const fresolved = tickets.filter(
      (tickets) => tickets.status === 'resolved'
    );
    const frejected = tickets.filter(
      (tickets) => tickets.status === 'rejected'
    );

    setPending(fpending);
    setAccepted(faccepted);
    setResolved(fresolved);
    setRejected(frejected);
  }, [tickets]);

  const statuses = ['pending', 'resolved', 'rejected', 'accepted'];

  return (
    <div className="flex gap-6">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tickets={tickets}
          setTickets={setTickets}
          pending={pending}
          accepted={accepted}
          resolved={resolved}
          rejected={rejected}
        ></Section>
      ))}
    </div>
  );
};

export default ListTickts;

interface StatusProps {
  status: string;
  tickets: ITicket[];
  setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
  pending: ITicket[];
  accepted: ITicket[];
  resolved: ITicket[];
  rejected: ITicket[];
}

const Section = ({
  status,
  tickets,
  setTickets,
  pending,
  accepted,
  resolved,
  rejected,
}: StatusProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ticket',
    drop: (item: ITicketUpdateStatus) => addItemToStatus(item._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // console.log(isOver);

  let text = 'pending';
  let bg = 'bg-orange-500';
  let ticketToMap = pending;

  if (status === 'accepted') {
    text = 'accepted';
    bg = 'bg-green-500';

    ticketToMap = accepted;
  }

  if (status === 'resolved') {
    text = 'resolved';
    bg = 'bg-cyan-500';
    ticketToMap = resolved;
  }

  if (status === 'rejected') {
    text = 'rejected';
    bg = 'bg-red-500';
    ticketToMap = rejected;
  }

  const addItemToStatus = async (id: string) => {
    const ticket = new BaseRepository();

    // Axios.put update status
    try {
      await axios.put(`http://localhost:3000/api/tickets/${id}`, {
        status: status,
      });

      const tickets = await ticket.fatchTickets();
      toast.success('Status updated successfully');
      setTickets(tickets.data.tickets);
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? 'bg-slate-200' : ''}`}
    >
      <Header text={text} bg={bg} count={ticketToMap.length} />
      {ticketToMap.length > 0 &&
        ticketToMap.map((ticket: ITicket) => (
          <Ticket
            key={ticket._id}
            ticket={ticket}
            tickets={tickets}
            setTickets={setTickets}
          />
        ))}
    </div>
  );
};

interface HeaderProps {
  text: string;
  bg: string;
  count: number;
}

const Header = ({ text, bg, count }: HeaderProps) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}{' '}
      <div className="ms-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Ticket = ({ ticket, tickets, setTickets }: TicketProps) => {
  // isDragging drag useDrag
  // Use the drag source hook
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ticket',
    item: { _id: ticket!._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // console.log(drag);

  const hadleRemove = (id: string) => {};

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md ${
        isDragging ? 'opacity-25' : 'opacity-100'
      } rounded-md cursor-grab`}
    >
      <p>
        <span className="font-bold">title:</span> {ticket?.title}
      </p>
      <p>
        <span className="font-bold">description:</span> {ticket?.description}
      </p>
      <p>
        <span className="font-bold">contact information:</span>
        {ticket?.contactinformation}
      </p>
      <button onClick={() => hadleRemove(ticket?._id!)}> hadleRemove</button>
    </div>
  );
};


