# Introduction

Catalog of Turing machines based on "The Annotated Turing" by Charles Petzold.

A Turing machine is composed by a list of m-configurations; the configuration and the behaviour of the Turing machine is described into the Turing machine Table.

The Turing machine Table is composed of 4 columns, the first pair of columns describes the configuration of the machine and the second pair of columns describes the behaviour of the machine.
The first column contains the m-configuration, the second column contains the tape square scanned symbol, the third column contains the operations and the fourth column contains the next m-configuration.

The following is an example of a Turing machine Table:

| m-config | symbol | operations | final m-config |
| :------: | :------: | :------: | :------: |
| b | none | P0,R | c |
| c | none | R | e |
| e | none | P1,R | f |
| f | none | R | b |

The machines make use of a one-dimensional tape divided into squares.

The application prints at every computational stage the complete configuration (the current m-configuration, all the symbols into the tape and the position of the head).

There are some assumptions:
- The machines compute binary numeric sequences
- The machines use only alternate squares for printing numeric sequences
- The tape does not extend infinitely toward the right
- The symbol "none" of the Table symbol column corresponds to a square with no symbol (blank square)
- The symbol "any" of the Table symbol column corresponds to any non-blank symbol
- The Table operations column contains zero, one or more operations
- The available operations are: R (right), L (left), P (print), E (erase)
- The erase operation is not compared to a print operation with no symbol
- An error is thrown by print operation if the head square is already filled with a symbol
- The Turing machine evolution starts with the first m-configuration listed in the Table

Turing machine initial setup:
- The initial tape is composed of 20 blank squares
- The head is located on the first square of the initial tape

Features:
- Turing machine async evolution
- The initial tape square symbols are editable
- The initial tape squares count can be changed

# Development

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm start` for open dev Electron window 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Demo
https://sitmcella.github.io/turing-machine/