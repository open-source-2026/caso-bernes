// Bookstores (id, name, specialty, minimumCopies)

import {BaseEntity} from '../../../shared/domain/model/base.entity';

export class Bookstore implements BaseEntity {

  #id: number;
  #name: string;
  #specialty: string;
  #minimumCopies: number;

  constructor(props: {id: number, name: string, specialty: string, minimumCopies: number}) {
    this.#id = props.id;
    this.#name = props.name;
    this.#specialty = props.specialty;
    this.#minimumCopies = props.minimumCopies;
  }


  get id(): number {
    return this.#id;
  }

  set id(value: number) {
    this.#id = value;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
  }

  get specialty(): string {
    return this.#specialty;
  }

  set specialty(value: string) {
    this.#specialty = value;
  }

  get minimumCopies(): number {
    return this.#minimumCopies;
  }

  set minimumCopies(value: number) {
    this.#minimumCopies = value;
  }
}
