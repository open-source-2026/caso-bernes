import {BaseResource, BaseResponse} from '../../shared/domain/infrastructure/base-response';

/**
 * Resource representation of a book stock.
 */
export interface BookStockResource extends BaseResource {

  /**
   * Unique identifier of the book stock.
   */

  id: number;
  bookstoreId: number;
  bookKey: string;
  bookTitle: string;
  authorName: string;
  copies: number;
  receivedAt: Date;

}

/**
 * Response representation of book stocks.
 */

export interface BookStocksResponse extends BaseResponse {
  data: BookStockResource[];
}

