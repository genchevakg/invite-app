import { CounterpartyStatus } from "./counterparty-status.model";

export interface CounterpartiesState {
    counterparties: CounterpartyStatus[];
    loading: boolean;
    addedEmails?: string[];
}