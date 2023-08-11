import { CounterpartyName } from "./counterparty-name.model";

export interface Counterparty {
    _id: string;
    picture:string;
    name: CounterpartyName;
    company: string;
    email: string;
    phone: string;
    groups?: string[];
}