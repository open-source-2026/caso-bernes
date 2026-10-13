import {BaseAssembler} from '../../shared/domain/infrastructure/base-assembler';
import {BookStock} from '../domain/model/book-stock.entity';
import {BookStocksResponse, BookStockResource} from './book-stocks-response';

/**
 * Assembler for converting between BookStock entities and API resources.
 */

export class BookStockAssembler implements BaseAssembler<BookStock, BookStockResource, BookStocksResponse> {

  /**
   * Converts a response envelope into a collection of domain entities.
   * @param response - Response payload returned by the API.
   * @returns Array of mapped domain entities.
   */

  toEntitiesFromResponse = (response: BookStocksResponse): BookStock[] => {
    console.log(response);
    return response.data.map(resource => this.toEntityFromResource(resource as BookStockResource));
  };

  /**
   * Converts a resource to an entity.
   * @param resource - The resource to convert.
   * @returns The converted entity.
   */

  toEntityFromResource = (resource: BookStockResource) : BookStock =>
    new BookStock({
      id: resource.id,
      bookstoreId: resource.bookstoreId,
      bookKey: resource.bookKey,
      bookTitle: resource.bookTitle,
      authorName: resource.authorName,
      copies: resource.copies,
      receivedAt: new Date(resource.receivedAt)
    });

  /**
   * Converts an entity to a resource.
   * @param entity - The entity to convert.
   * @returns The converted resource.
   */

  toResourceFromEntity = (entity: BookStock): BookStockResource =>
    ({
      id: entity.id,
      bookstoreId: entity.bookstoreId,
      bookKey: entity.bookKey,
      bookTitle: entity.bookTitle,
      authorName: entity.authorName,
      copies: entity.copies,
      receivedAt: entity.receivedAt
    } as BookStockResource);


}
