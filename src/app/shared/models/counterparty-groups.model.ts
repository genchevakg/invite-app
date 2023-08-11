import { Counterparty } from "./counterparty.model";

export interface CounterpartyGroups {
    [group: string]: Counterparty[];
}