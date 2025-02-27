import { createClient } from '@supabase/supabase-js';
import { Item } from '../interfaces/Item';
import { ItemType } from '../interfaces/ItemType';
import { BehaviorSubject } from 'rxjs';

const ITEMS_PER_PAGE = 5;

export class ItemService {
    private supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
    );

    // Main items subject
    private itemsSubject = new BehaviorSubject<Item[]>([]);
    private totalPagesSubject = new BehaviorSubject<number>(0);
    private currentPageSubject = new BehaviorSubject<number>(1);
    private totalItemsSubject = new BehaviorSubject<number>(0);

    // ItemType specific subjects
    private dealItemsSubject = new BehaviorSubject<Item[]>([]);
    private contentItemsSubject = new BehaviorSubject<Item[]>([]);
    private eventItemsSubject = new BehaviorSubject<Item[]>([]);
    private engagementItemsSubject = new BehaviorSubject<Item[]>([]);

    // Pagination subjects for each ItemType
    private dealCurrentPageSubject = new BehaviorSubject<number>(1);
    private dealTotalPagesSubject = new BehaviorSubject<number>(0);
    private dealTotalItemsSubject = new BehaviorSubject<number>(0);
    
    private contentCurrentPageSubject = new BehaviorSubject<number>(1);
    private contentTotalPagesSubject = new BehaviorSubject<number>(0);
    private contentTotalItemsSubject = new BehaviorSubject<number>(0);
    
    private eventCurrentPageSubject = new BehaviorSubject<number>(1);
    private eventTotalPagesSubject = new BehaviorSubject<number>(0);
    private eventTotalItemsSubject = new BehaviorSubject<number>(0);
    
    private engagementCurrentPageSubject = new BehaviorSubject<number>(1);
    private engagementTotalPagesSubject = new BehaviorSubject<number>(0);
    private engagementTotalItemsSubject = new BehaviorSubject<number>(0);

    // Observable streams
    items$ = this.itemsSubject.asObservable();
    totalPages$ = this.totalPagesSubject.asObservable();
    currentPage$ = this.currentPageSubject.asObservable();
    totalItems$ = this.totalItemsSubject.asObservable();

    // ItemType specific observable streams
    dealItems$ = this.dealItemsSubject.asObservable();
    contentItems$ = this.contentItemsSubject.asObservable();
    eventItems$ = this.eventItemsSubject.asObservable();
    engagementItems$ = this.engagementItemsSubject.asObservable();
    
    // Pagination observables for each ItemType
    dealCurrentPage$ = this.dealCurrentPageSubject.asObservable();
    dealTotalPages$ = this.dealTotalPagesSubject.asObservable();
    dealTotalItems$ = this.dealTotalItemsSubject.asObservable();
    
    contentCurrentPage$ = this.contentCurrentPageSubject.asObservable();
    contentTotalPages$ = this.contentTotalPagesSubject.asObservable();
    contentTotalItems$ = this.contentTotalItemsSubject.asObservable();
    
    eventCurrentPage$ = this.eventCurrentPageSubject.asObservable();
    eventTotalPages$ = this.eventTotalPagesSubject.asObservable();
    eventTotalItems$ = this.eventTotalItemsSubject.asObservable();
    
    engagementCurrentPage$ = this.engagementCurrentPageSubject.asObservable();
    engagementTotalPages$ = this.engagementTotalPagesSubject.asObservable();
    engagementTotalItems$ = this.engagementTotalItemsSubject.asObservable();

    constructor() {
        this.setupRealtimeSubscription();
    }

    private setupRealtimeSubscription() {
        this.supabase
            .channel('items-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'item'
                },
                async () => {
                    // Refresh all items
                    await this.fetchItems();
                    
                    // Update filtered items by type with their current pagination
                    this.updateItemsByType();
                }
            )
            .subscribe();
    }

    /**
     * Fetches all items and updates the items subject
     */
    async fetchItems(): Promise<void> {
        try {
            const { data, error } = await this.supabase
                .from('item')
                .select('*')
                .eq('deleted', false)
                .order('created_at', { ascending: false });

            if (error) {
                throw error;
            }

            this.itemsSubject.next(data as Item[]);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    /**
     * Updates filtered items by type using the main items
     */
    private updateItemsByType(): void {
        const allItems = this.itemsSubject.value;
        
        // Filter items by type
        const dealItems = allItems.filter(item => item.type === ItemType.Deal);
        const contentItems = allItems.filter(item => item.type === ItemType.Content);
        const eventItems = allItems.filter(item => item.type === ItemType.Event);
        const engagementItems = allItems.filter(item => item.type === ItemType.Engagement);

        // Update pagination for each type
        this.updateDealItems(this.dealCurrentPageSubject.value, dealItems);
        this.updateContentItems(this.contentCurrentPageSubject.value, contentItems);
        this.updateEventItems(this.eventCurrentPageSubject.value, eventItems);
        this.updateEngagementItems(this.engagementCurrentPageSubject.value, engagementItems);
    }

    /**
     * Updates Deal items with pagination
     */
    private updateDealItems(page: number, allDealItems: Item[]): void {
        const totalItems = allDealItems.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        // Paginate from the filtered items
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = allDealItems.slice(startIndex, endIndex);
        
        // Update the subjects
        this.dealItemsSubject.next(paginatedItems);
        this.dealCurrentPageSubject.next(page);
        this.dealTotalPagesSubject.next(totalPages);
        this.dealTotalItemsSubject.next(totalItems);
    }

    /**
     * Updates Content items with pagination
     */
    private updateContentItems(page: number, allContentItems: Item[]): void {
        const totalItems = allContentItems.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        // Paginate from the filtered items
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = allContentItems.slice(startIndex, endIndex);
        
        // Update the subjects
        this.contentItemsSubject.next(paginatedItems);
        this.contentCurrentPageSubject.next(page);
        this.contentTotalPagesSubject.next(totalPages);
        this.contentTotalItemsSubject.next(totalItems);
    }

    /**
     * Updates Event items with pagination
     */
    private updateEventItems(page: number, allEventItems: Item[]): void {
        const totalItems = allEventItems.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        // Paginate from the filtered items
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = allEventItems.slice(startIndex, endIndex);
        
        // Update the subjects
        this.eventItemsSubject.next(paginatedItems);
        this.eventCurrentPageSubject.next(page);
        this.eventTotalPagesSubject.next(totalPages);
        this.eventTotalItemsSubject.next(totalItems);
    }

    /**
     * Updates Engagement items with pagination
     */
    private updateEngagementItems(page: number, allEngagementItems: Item[]): void {
        const totalItems = allEngagementItems.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        
        // Paginate from the filtered items
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = allEngagementItems.slice(startIndex, endIndex);
        
        // Update the subjects
        this.engagementItemsSubject.next(paginatedItems);
        this.engagementCurrentPageSubject.next(page);
        this.engagementTotalPagesSubject.next(totalPages);
        this.engagementTotalItemsSubject.next(totalItems);
    }

    /**
     * Fetches items by type and updates the corresponding subjects
     */
    async fetchItemsByType(): Promise<void> {
        // If cache is empty, fetch all items first
        if (this.itemsSubject.value.length === 0) {
            await this.fetchItems();
        }
        
        // Update filtered items by type
        this.updateItemsByType();
    }

    /**
     * Creates a new item
     */
    async createItem(item: Partial<Item>): Promise<Item | null> {
        try {
            const { data, error } = await this.supabase
                .from('item')
                .insert([item])
                .select()
                .single();

            if (error) {
                throw error;
            }

            // Refresh all items and update the cache
            await this.fetchItems();
            
            // Update the main items with pagination
            await this.fetchItems();
            
            // Update filtered items by type
            this.updateItemsByType();

            return data as Item;
        } catch (error) {
            console.error('Error creating item:', error);
            return null;
        }
    }

    /**
     * Retrieves a single item by ID
     */
    async getItemById(id: string): Promise<Item | null> {
        try {
            // Check if the item is in the current items first
            const cachedItem = this.itemsSubject.value.find(item => item.id === id);
            if (cachedItem) {
                return cachedItem;
            }
            
            // If not found, fetch from the database
            const { data, error } = await this.supabase
                .from('item')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            return data as Item;
        } catch (error) {
            console.error('Error fetching item:', error);
            return null;
        }
    }

    /**
     * Updates an existing item
     */
    async updateItem(id: string, updates: Partial<Item>): Promise<Item | null> {
        try {
            const { data, error } = await this.supabase
                .from('item')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw error;
            }

            // Refresh all items and update the cache
            await this.fetchItems();
            
            // Update the main items with pagination
            await this.fetchItems();
            
            // Update filtered items by type
            this.updateItemsByType();

            return data as Item;
        } catch (error) {
            console.error('Error updating item:', error);
            return null;
        }
    }

    /**
     * Soft deletes an item by setting deleted = true
     */
    async deleteItem(id: string): Promise<boolean> {
        try {
            const { error } = await this.supabase
                .from('item')
                .update({ deleted: true })
                .eq('id', id);

            if (error) {
                throw error;
            }

            // Refresh all items and update the cache
            await this.fetchItems();
            
            // Update the main items with pagination
            await this.fetchItems();
            
            // Update filtered items by type
            this.updateItemsByType();

            return true;
        } catch (error) {
            console.error('Error deleting item:', error);
            return false;
        }
    }

    /**
     * Hard deletes an item from the database
     */
    async hardDeleteItem(id: string): Promise<boolean> {
        try {
            const { error } = await this.supabase
                .from('item')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }

            // Refresh all items and update the cache
            await this.fetchItems();
            
            // Update the main items with pagination
            await this.fetchItems();
            
            // Update filtered items by type
            this.updateItemsByType();

            return true;
        } catch (error) {
            console.error('Error hard deleting item:', error);
            return false;
        }
    }

    /**
     * Pagination methods
     */

    /**
     * Methods to fetch items by specific type with pagination
     */
    async fetchDealItems(page: number = 1): Promise<Item[]> {
        // If no items, fetch all items first
        if (this.itemsSubject.value.length === 0) {
            await this.fetchItems();
        }
        
        // Filter deal items
        const dealItems = this.itemsSubject.value.filter(item => item.type === ItemType.Deal);
        
        // Update deal items with pagination
        this.updateDealItems(page, dealItems);
        
        return this.dealItemsSubject.value;
    }

    async fetchContentItems(page: number = 1): Promise<Item[]> {
        // If no items, fetch all items first
        if (this.itemsSubject.value.length === 0) {
            await this.fetchItems();
        }
        
        // Filter content items
        const contentItems = this.itemsSubject.value.filter(item => item.type === ItemType.Content);
        
        // Update content items with pagination
        this.updateContentItems(page, contentItems);
        
        return this.contentItemsSubject.value;
    }

    async fetchEventItems(page: number = 1): Promise<Item[]> {
        // If no items, fetch all items first
        if (this.itemsSubject.value.length === 0) {
            await this.fetchItems();
        }
        
        // Filter event items
        const eventItems = this.itemsSubject.value.filter(item => item.type === ItemType.Event);
        
        // Update event items with pagination
        this.updateEventItems(page, eventItems);
        
        return this.eventItemsSubject.value;
    }

    async fetchEngagementItems(page: number = 1): Promise<Item[]> {
        // If no items, fetch all items first
        if (this.itemsSubject.value.length === 0) {
            await this.fetchItems();
        }
        
        // Filter engagement items
        const engagementItems = this.itemsSubject.value.filter(item => item.type === ItemType.Engagement);
        
        // Update engagement items with pagination
        this.updateEngagementItems(page, engagementItems);
        
        return this.engagementItemsSubject.value;
    }

    /**
     * Pagination methods for Deal items
     */
    async nextDealPage(): Promise<void> {
        const currentPage = this.dealCurrentPageSubject.value;
        const totalPages = this.dealTotalPagesSubject.value;
        
        if (currentPage < totalPages) {
            await this.fetchDealItems(currentPage + 1);
        }
    }

    async previousDealPage(): Promise<void> {
        const currentPage = this.dealCurrentPageSubject.value;
        
        if (currentPage > 1) {
            await this.fetchDealItems(currentPage - 1);
        }
    }

    async goToDealPage(page: number): Promise<void> {
        const totalPages = this.dealTotalPagesSubject.value;
        
        if (page >= 1 && page <= totalPages) {
            await this.fetchDealItems(page);
        }
    }

    /**
     * Pagination methods for Content items
     */
    async nextContentPage(): Promise<void> {
        const currentPage = this.contentCurrentPageSubject.value;
        const totalPages = this.contentTotalPagesSubject.value;
        
        if (currentPage < totalPages) {
            await this.fetchContentItems(currentPage + 1);
        }
    }

    async previousContentPage(): Promise<void> {
        const currentPage = this.contentCurrentPageSubject.value;
        
        if (currentPage > 1) {
            await this.fetchContentItems(currentPage - 1);
        }
    }

    async goToContentPage(page: number): Promise<void> {
        const totalPages = this.contentTotalPagesSubject.value;
        
        if (page >= 1 && page <= totalPages) {
            await this.fetchContentItems(page);
        }
    }

    /**
     * Pagination methods for Event items
     */
    async nextEventPage(): Promise<void> {
        const currentPage = this.eventCurrentPageSubject.value;
        const totalPages = this.eventTotalPagesSubject.value;
        
        if (currentPage < totalPages) {
            await this.fetchEventItems(currentPage + 1);
        }
    }

    async previousEventPage(): Promise<void> {
        const currentPage = this.eventCurrentPageSubject.value;
        
        if (currentPage > 1) {
            await this.fetchEventItems(currentPage - 1);
        }
    }

    async goToEventPage(page: number): Promise<void> {
        const totalPages = this.eventTotalPagesSubject.value;
        
        if (page >= 1 && page <= totalPages) {
            await this.fetchEventItems(page);
        }
    }

    /**
     * Pagination methods for Engagement items
     */
    async nextEngagementPage(): Promise<void> {
        const currentPage = this.engagementCurrentPageSubject.value;
        const totalPages = this.engagementTotalPagesSubject.value;
        
        if (currentPage < totalPages) {
            await this.fetchEngagementItems(currentPage + 1);
        }
    }

    async previousEngagementPage(): Promise<void> {
        const currentPage = this.engagementCurrentPageSubject.value;
        
        if (currentPage > 1) {
            await this.fetchEngagementItems(currentPage - 1);
        }
    }

    async goToEngagementPage(page: number): Promise<void> {
        const totalPages = this.engagementTotalPagesSubject.value;
        
        if (page >= 1 && page <= totalPages) {
            await this.fetchEngagementItems(page);
        }
    }
}
