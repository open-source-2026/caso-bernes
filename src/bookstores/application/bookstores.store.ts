import {computed,inject, Injectable, Signal, signal} from '@angular/core';
import {BookstoresApi} from '../infrastructure/bookstores-api';
import {Bookstore} from '../domain/model/bookstore.entity';
import {BookStock} from '../domain/model/book-stock.entity';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookstoresStore {

  private readonly bookstoresApi = inject(BookstoresApi);

  readonly bookstoreCount = computed(() => this.bookstores().length);

  readonly bookStockCount = computed(() => this.bookStocks().length);

  private readonly bookstoresSignal = signal<Bookstore[]>([]);

  readonly bookstores = this.bookstoresSignal.asReadonly();

  private readonly bookStocksSignal = signal<BookStock[]>([]);

  readonly bookStocks = this.bookStocksSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);

  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);

  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadbookstores();
    this.loadbookStocks();
  }

  getBookstoreById = (bookstoreId: number): Signal<Bookstore | undefined> =>
    computed(() => bookstoreId ? this.bookstores().find(bookstore => bookstore.id === bookstoreId) : undefined);

  getBookStockById = (bookStockId: number): Signal<BookStock | undefined> =>
    computed(() => bookStockId ? this.bookStocks().find(bookStock => bookStock.id === bookStockId) : undefined);

  addBookstore = (bookstore: Bookstore): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.bookstoresApi.createBookStore(bookstore).pipe(retry(2)).subscribe({
      next: createdBookstore => {
        this.bookstoresSignal.update(bookstores => [...bookstores, createdBookstore]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create bookstore'));
        this.loadingSignal.set(false);
      }
    });

  }

  updateBookstore = (bookstore: Bookstore): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.bookstoresApi.updateBookStore(bookstore).pipe(retry(2)).subscribe({
      next: updatedBookstore => {
        this.bookstoresSignal.update(bookstores => bookstores.map(b => b.id === updatedBookstore.id ? updatedBookstore : b));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update bookstore'));
        this.loadingSignal.set(false);
      }
    });

  }

  deleteBookstore = (bookstoreId: number): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.bookstoresApi.deleteBookStore(bookstoreId).pipe(retry(2)).subscribe({
      next: () => {
        this.bookstoresSignal.update(bookstores => bookstores.filter(b => b.id !== bookstoreId));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete bookstore'));
        this.loadingSignal.set(false);
      }
    });
  }

  addBookStock = (bookStock: BookStock): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.bookstoresApi.createBookStock(bookStock).pipe(retry(2)).subscribe({
      next: createdBookStock => {
        this.bookStocksSignal.update(bookStocks => [...bookStocks, createdBookStock]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create book stock'));
        this.loadingSignal.set(false);
      }
    });
  };

  updateBookStock = (bookStock: BookStock): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.bookstoresApi.updateBookStock(bookStock).pipe(retry(2)).subscribe({
      next: updatedBookStock => {
        this.bookStocksSignal.update(bookStocks => bookStocks.map(b => b.id === updatedBookStock.id ? updatedBookStock : b));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update book stock'));
        this.loadingSignal.set(false);
      }
    });
  };

  deleteBookStock = (bookStockId: number): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.bookstoresApi.deleteBookStock(bookStockId).pipe(retry(2)).subscribe({
      next: () => {
        this.bookStocksSignal.update(bookStocks => bookStocks.filter(b => b.id !== bookStockId));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete book stock'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadbookstores = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.bookstoresApi.getBookstores().pipe(takeUntilDestroyed()).subscribe({
      next: bookstores => {
        this.bookstoresSignal.set(bookstores);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load bookstores'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadbookStocks = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.bookstoresApi.getBookStocks().pipe(takeUntilDestroyed()).subscribe({
      next: bookStocks => {
        this.bookStocksSignal.set(bookStocks);
        this.loadingSignal.set(false);
        this.errorSignal.set(null);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load book stocks'));
        this.loadingSignal.set(false);
      }
    });
  };

  private assignBookstoresToBookStocks = (): void => {
    this.bookStocksSignal.update(bookStocks =>
      bookStocks.map(bookStock => this.assignBookstoreToBookStock(bookStock))
    );
  };

  private assignBookstoreToBookStock = (bookStock: BookStock): BookStock => {
    const bookstoreId = bookStock.bookstoreId ?? 0;

    bookStock.bookstoreId = bookStock.bookstoreId ?? this.getBookstoreById(bookstoreId)()?.id ?? null;
    return bookStock;
  }



  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  }




}
