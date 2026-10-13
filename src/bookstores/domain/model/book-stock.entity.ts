// Book Stocks (id, bookstoreId, bookKey, bookTitle, authorName, copies,
// receivedAt)

import {BaseEntity} from '../../../shared/domain/model/base.entity';


export class BookStock implements BaseEntity {

  #id: number;
  #bookstoreId: number;
  #bookKey: string;
  #bookTitle: string;
  #authorName: string;
  #copies: number;
  #receivedAt: Date;

  constructor(props: {id: number, bookstoreId: number, bookKey: string, bookTitle: string, authorName: string, copies: number, receivedAt: Date}) {
    this.#id = props.id;
    this.#bookstoreId = props.bookstoreId;
    this.#bookKey = props.bookKey;
    this.#bookTitle = props.bookTitle;
    this.#authorName = props.authorName;
    this.#copies = props.copies;
    this.#receivedAt = props.receivedAt;
  }

  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get bookstoreId(): number {
    return this.#bookstoreId;
  }

  set bookstoreId(value: number) {
    this.#bookstoreId = value;
  }

  get bookKey(): string {
    return this.#bookKey;
  }

  set bookKey(value: string) {
    this.#bookKey = value;
  }

  get bookTitle(): string {
    return this.#bookTitle;
  }

  set bookTitle(value: string) {
    this.#bookTitle = value;
  }

  get authorName(): string {
    return this.#authorName;
  }

  set authorName(value: string) {
    this.#authorName = value;
  }

  get copies(): number {
    return this.#copies;
  }

  set copies(value: number) {
    this.#copies = value;
  }

  get receivedAt(): Date {
    return this.#receivedAt;
  }

  set receivedAt(value: Date) {
    this.#receivedAt = value;
  }
}
