import { Square } from './square';
import { Tape } from './tape';
import { MachineStatus } from './machine-status';

export class DeepCopy {

  public apply(obj: object): object {
    let copy: object;

    if (obj instanceof Square) {
      return new Square(obj.id, obj.symbol);
    }

    if (obj instanceof MachineStatus) {
      return new MachineStatus(<Tape>this.apply(obj.tape), obj.index);
    }

    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.apply(obj[i]);
      }
      return copy;
    }

    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = this.apply(obj[attr]);
        }
      }
      return copy;
    }

    throw new Error('Unable to copy the object. Type not supported.');
  }
}
