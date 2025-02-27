export enum MemberType {
    INTERNAL = 'Internal',
    CO_CREATOR = 'Co-Creator',
    CO_INVESTOR = 'Co-Investor'
}

// Default member type
export const DEFAULT_MEMBER_TYPE = MemberType.CO_INVESTOR;

// Map database values to MemberType enum
export function mapToMemberType(value: string | null | undefined): MemberType {
    if (!value) return DEFAULT_MEMBER_TYPE;
    
    switch (value.toLowerCase()) {
        case 'internal':
            return MemberType.INTERNAL;
        case 'coCreator':
        case 'co-creator':
            return MemberType.CO_CREATOR;
        case 'coInvestor':
        case 'co-investor':
            return MemberType.CO_INVESTOR;
        default:
            return DEFAULT_MEMBER_TYPE;
    }
} 