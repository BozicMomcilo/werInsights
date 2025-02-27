import { supabase, isSupabaseConfigured } from '../../lib/supabase/supabaseClient';
import { Commitment } from '../interfaces/Commitment';
import { BehaviorSubject } from 'rxjs';

export class CommitmentService {
    private commitmentsSubject = new BehaviorSubject<Commitment[]>([]);
    commitments$ = this.commitmentsSubject.asObservable();

    constructor() {
        if (!isSupabaseConfigured()) {
            throw new Error('Supabase is not configured. Please connect your Supabase project first.');
        }
        this.setupRealtimeSubscription();
    }

    private setupRealtimeSubscription() {
        supabase!
            .channel('commitments-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'commitment'
                },
                async () => {
                    // Refresh the commitments when any change occurs
                    await this.fetchAllCommitments();
                }
            )
            .subscribe();
    }

    async fetchAllCommitments(): Promise<Commitment[]> {
        try {
            const { data, error } = await supabase!
                .from('commitment')
                .select('*')
                .eq('deleted', false)
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            const commitments = data as Commitment[];
            this.commitmentsSubject.next(commitments);
            return commitments;
        } catch (error) {
            console.error('Error fetching commitments:', error);
            throw error;
        }
    }

    async getCommitmentById(id: string): Promise<Commitment | null> {
        try {
            const { data, error } = await supabase!
                .from('commitment')
                .select('*')
                .eq('id', id)
                .eq('deleted', false)
                .single();

            if (error) {
                throw error;
            }

            return data as Commitment;
        } catch (error) {
            console.error('Error fetching commitment:', error);
            throw error;
        }
    }

    async getCommitmentsByDealId(dealId: string): Promise<Commitment[]> {
        try {
            const { data, error } = await supabase!
                .from('commitment')
                .select('*')
                .eq('deal_id', dealId)
                .eq('deleted', false)
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            return data as Commitment[];
        } catch (error) {
            console.error('Error fetching commitments by deal:', error);
            throw error;
        }
    }

    async getCommitmentsByPersonId(personId: string): Promise<Commitment[]> {
        try {
            const { data, error } = await supabase!
                .from('commitment')
                .select('*')
                .eq('person_id', personId)
                .eq('deleted', false)
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            return data as Commitment[];
        } catch (error) {
            console.error('Error fetching commitments by person:', error);
            throw error;
        }
    }

    async createCommitment(commitment: Omit<Commitment, 'id' | 'created_at'>): Promise<Commitment> {
        try {
            const { data, error } = await supabase!
                .from('commitment')
                .insert([{ ...commitment, deleted: false }])
                .select()
                .single();

            if (error) {
                throw error;
            }

            await this.fetchAllCommitments(); // Refresh the list
            return data as Commitment;
        } catch (error) {
            console.error('Error creating commitment:', error);
            throw error;
        }
    }

    async updateCommitment(id: string, updates: Partial<Commitment>): Promise<Commitment> {
        try {
            const { data, error } = await supabase!
                .from('commitment')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw error;
            }

            await this.fetchAllCommitments(); // Refresh the list
            return data as Commitment;
        } catch (error) {
            console.error('Error updating commitment:', error);
            throw error;
        }
    }

    async deleteCommitment(id: string): Promise<void> {
        try {
            // Soft delete by setting deleted flag to true
            const { error } = await supabase!
                .from('commitment')
                .update({ deleted: true })
                .eq('id', id);

            if (error) {
                throw error;
            }

            await this.fetchAllCommitments(); // Refresh the list
        } catch (error) {
            console.error('Error deleting commitment:', error);
            throw error;
        }
    }

    async getTotalCommitmentsByDeal(dealId: string): Promise<number> {
        try {
            const { data, error } = await supabase!
                .from('commitment')
                .select('ticket_count')
                .eq('deal_id', dealId)
                .eq('deleted', false);

            if (error) {
                throw error;
            }

            return data.reduce((sum, commitment) => sum + (commitment.ticket_count || 0), 0);
        } catch (error) {
            console.error('Error calculating total commitments:', error);
            throw error;
        }
    }
}
