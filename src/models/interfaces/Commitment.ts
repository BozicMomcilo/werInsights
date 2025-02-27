import { Item } from './Item';
import { Person } from './Person';

export interface Commitment {
    id: string;
    deleted: boolean;
    created_at: Date;
    ticket_count: number;
    deal_id: string;  // References Item.id in the database
    person_id: string;
    updated_at?: Date;
} 