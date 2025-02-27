import { Item } from './Item';
import { Person } from './Person';

export interface MemberInteraction {
    id: string;
    member_id: string;
    item_id?: string;
    created_at: Date;
    type?: string;
} 