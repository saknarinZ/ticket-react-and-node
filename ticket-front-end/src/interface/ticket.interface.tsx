

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
export interface ITicket {
    _id?: string;
    title: string;
    description: string;
    contactinformation: string;
    status?: string;
    created?: Date;
    latestupdate?: Date;
    
}

export interface ITicketUpdateStatus {
    _id: string;
    title: string;
    description: string;
    contactinformation: string;
    status: string;
    created: Date;
    latestupdate: Date;

}