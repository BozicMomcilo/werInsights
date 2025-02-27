import { createClient } from '@supabase/supabase-js';
import { Person } from '../interfaces/Person';
import { BehaviorSubject } from 'rxjs';
import { mapToMemberType } from '../interfaces/MemberType';

const ITEMS_PER_PAGE = 5;

export class PersonService {
    private supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    private personsSubject = new BehaviorSubject<Person[]>([]);
    private totalPagesSubject = new BehaviorSubject<number>(0);
    private currentPageSubject = new BehaviorSubject<number>(1);
    private totalPersonsSubject = new BehaviorSubject<number>(0);

    persons$ = this.personsSubject.asObservable();
    totalPages$ = this.totalPagesSubject.asObservable();
    currentPage$ = this.currentPageSubject.asObservable();
    totalPersons$ = this.totalPersonsSubject.asObservable();

    constructor() {
        this.setupRealtimeSubscription();
    }

    private setupRealtimeSubscription() {
        this.supabase
            .channel('persons-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'person'
                },
                async () => {
                    // Refresh the current page when any change occurs
                    await this.fetchPersons(this.currentPageSubject.value);
                }
            )
            .subscribe();
    }

    async fetchPersons(page: number = 1): Promise<void> {
        try {
            // First, get the total count
            const { count } = await this.supabase
                .from('person')
                .select('*', { count: 'exact', head: true })
                .eq('deleted', false);

            const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
            this.totalPagesSubject.next(totalPages);
            this.totalPersonsSubject.next(count || 0);

            // Then fetch the actual data for the current page
            const { data: persons, error } = await this.supabase
                .from('person')
                .select('*')
                .eq('deleted', false)
                .order('created_at', { ascending: false })
                .range(
                    (page - 1) * ITEMS_PER_PAGE,
                    page * ITEMS_PER_PAGE - 1
                );

            if (error) {
                throw error;
            }

            // Set default memberType as 'coInvestor' if not provided
            const personsWithDefaultType = persons?.map(person => ({
                ...person,
                member_type: mapToMemberType(person.member_type)
            })) || [];

            this.currentPageSubject.next(page);
            this.personsSubject.next(personsWithDefaultType as Person[]);
        } catch (error) {
            console.error('Error fetching persons:', error);
            throw error;
        }
    }

    async nextPage(): Promise<void> {
        const currentPage = this.currentPageSubject.value;
        const totalPages = this.totalPagesSubject.value;
        
        if (currentPage < totalPages) {
            await this.fetchPersons(currentPage + 1);
        }
    }

    async previousPage(): Promise<void> {
        const currentPage = this.currentPageSubject.value;
        
        if (currentPage > 1) {
            await this.fetchPersons(currentPage - 1);
        }
    }

    async goToPage(page: number): Promise<void> {
        const totalPages = this.totalPagesSubject.value;
        
        if (page >= 1 && page <= totalPages) {
            await this.fetchPersons(page);
        }
    }
} 