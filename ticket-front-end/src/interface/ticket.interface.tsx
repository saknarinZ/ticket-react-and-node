export interface TicketProps {
  ticket?: ITicket;
  tickets: ITicket[];
  setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
}

export interface TableTicketsProps {
  ticket?: ITicket;
  tickets: ITicket[];
  setTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
}

// title, description, contactinformation
export interface ITicket extends BaseTicket {
  _id?: string;
  status?: string;
  created?: Date;
  latestupdate?: Date;
}

export interface ITicketUpdateStatus extends BaseTicket {
  _id: string;
  status: string;
  created: Date;
  latestupdate: Date;
}

interface BaseTicket {
  _id?: string;
  status?: string;
  created?: Date;
  latestupdate?: Date;
  title?: string;
  description?: string;
  contactinformation?: string;
}
