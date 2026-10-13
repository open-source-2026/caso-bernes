import {BaseAssembler} from '../../shared/domain/infrastructure/base-assembler';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookstoreResource, BookstoresResponse} from './bookstores-response';

/**
 * Assembler for converting between Bookstore entities and API resources.
 */


export class BookstoreAssembler implements BaseAssembler<Bookstore, BookstoreResource, BookstoresResponse> {

  /**
   * Converts a response envelope into a collection of domain entities.
   * @param response - Response payload returned by the API.
   * @returns Array of mapped domain entities.
   */

  toEntitiesFromResponse = (response: BookstoresResponse): Bookstore[] =>
    response.data.map(resource => this.toEntityFromResource(resource as BookstoreResource));


  /**
   * Converts a resource to an entity.
   * @param resource - The resource to convert.
   * @returns The converted entity.
   */

  toEntityFromResource = (resource: BookstoreResource): Bookstore =>
    new Bookstore({
      id: resource.id,
      name: resource.name,
      specialty: resource.specialty,
      minimumCopies: resource.minimumCopies
    });

  /**
   * Converts an entity to a resource.
   * @param entity - The entity to convert.
   * @returns The converted resource.
   */

  toResourceFromEntity = (entity: Bookstore): BookstoreResource =>
    ({
      id: entity.id,
      name: entity.name,
      specialty: entity.specialty,
      minimumCopies: entity.minimumCopies
    } as BookstoreResource);


}

