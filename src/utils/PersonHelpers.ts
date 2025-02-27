import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PersonService } from '../models/services/PersonService';
import { ItemService } from '../models/services/ItemService';
import { CommitmentService } from '../models/services/CommitmentService';

interface PersonVolumeMap {
    [personId: string]: number;
}

let personCommitmentStream: Observable<PersonVolumeMap> | null = null;

export const createPersonCommitmentStream = (
    personService: PersonService,
    itemService: ItemService,
    commitmentService: CommitmentService
): Observable<PersonVolumeMap> => {
    // If stream already exists, return it
    if (personCommitmentStream) {
        return personCommitmentStream;
    }

    // Trigger initial data fetch only if subjects are empty
    personService.persons$.pipe(
        tap(persons => {
            if (!persons || persons.length === 0) {
                personService.fetchPersons();
            }
        })
    ).subscribe();

    itemService.items$.pipe(
        tap(items => {
            if (!items || items.length === 0) {
                itemService.fetchItems();
            }
        })
    ).subscribe();

    commitmentService.commitments$.pipe(
        tap(commitments => {
            if (!commitments || commitments.length === 0) {
                commitmentService.fetchAllCommitments();
            }
        })
    ).subscribe();

    // Create new stream
    personCommitmentStream = combineLatest([
        itemService.items$.pipe(
            tap(items => {
                if (!items || items.length === 0) {
                    itemService.fetchItems();
                }
            })
        ),
        commitmentService.commitments$.pipe(
            tap(commitments => {
                if (!commitments || commitments.length === 0) {
                    commitmentService.fetchAllCommitments();
                }
            })
        ),
        personService.persons$.pipe(
            tap(persons => {
                if (!persons || persons.length === 0) {
                    personService.fetchPersons();
                }
            })
        )
    ]).pipe(
        map(([items, commitments, persons]) => {
            const volumeMap: PersonVolumeMap = {};

            // Initialize map with all persons
            persons.forEach(person => {
                if (!person.deleted) {
                    volumeMap[person.id] = 0;
                }
            });

            // Process all commitments
            commitments.forEach(commitment => {
                if (commitment.deleted) {
                    return;
                }
                
                if (volumeMap.hasOwnProperty(commitment.person_id)) {
                    // Find the associated deal
                    const deal = items.find(item => item.id === commitment.deal_id);
                    
                    if (deal && deal.ticket_size) {
                        const addedVolume = commitment.ticket_count * deal.ticket_size;
                        volumeMap[commitment.person_id] += addedVolume;
                    } 
                }
            });
            return volumeMap;
        })
    );

    return personCommitmentStream;
}; 