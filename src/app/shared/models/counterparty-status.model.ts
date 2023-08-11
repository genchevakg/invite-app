import { Counterparty } from "./counterparty.model";

export interface CounterpartyStatus extends Counterparty {
    selected: boolean;
}