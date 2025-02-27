import { Address } from './Address';
import { Persona } from './Persona';
import { ImageResource } from './ImageResource';
import { MemberType, DEFAULT_MEMBER_TYPE } from './MemberType';

export interface Person {
    id: string;
    deleted: boolean;
    about?: string;
    additional_privileges?: string[];
    address?: Address;
    email: string;
    external_id?: string;
    externally_deleted?: boolean;
    first_name?: string;
    last_name?: string;
    linkedin_url?: string;
    member_status?: string;
    phone?: string;
    portfolio_id?: string;
    privileges?: string[];
    roles?: string[];
    track_record?: string;
    assigned_concierge_id?: string;
    organization_id?: string;
    username?: string;
    short_bio?: string;
    persona?: Persona;
    date_of_birth?: Date;
    profile_image?: ImageResource;
    member_type?: MemberType;
    universe?: string;
    member_invitations_left?: number;
    created_at?: Date;
    updated_at?: Date;
    registered?: boolean;
    tax_residence?: string;
    auth_id?: string; // UUID type in database, but we'll handle it as string in TypeScript
} 