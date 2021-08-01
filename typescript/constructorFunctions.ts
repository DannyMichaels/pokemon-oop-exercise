interface PokemonBattle {
  pokemon1: TPokemon;
  pokemon2: TPokemon;
  turn: number;
  start(): void;
  finish(): void;
}

function PokemonBattle(pokemon1: TPokemon, pokemon2: TPokemon, turn = 100) {
  this.pokemon1 = pokemon1;
  this.pokemon2 = pokemon2;
  this.turn = turn;
  console.log(`Starting battle between ${pokemon1.name} and ${pokemon2.name}`);

  this.start = function () {
    let pokemon1 = this.pokemon1;
    let pokemon2 = this.pokemon2;

    while (pokemon1.isAlive() && pokemon2.isAlive()) {
      console.log(`Turn ${this.turn}`);

      console.log('Current HP');
      console.log(`${pokemon2.name}: ${pokemon2.hp} HP`);
      console.log(`${pokemon1.name}: ${pokemon1.hp} HP`);

      console.log('-------------------------');

      console.log('Fight');

      pokemon1.attack(pokemon2);
      pokemon2.attack(pokemon1);

      console.log('-------------------------');

      console.log('HP left after this turn');
      console.log(`${pokemon2.name}: ${pokemon2.hp} HP`);
      console.log(`${pokemon1.name}: ${pokemon1.hp} HP`);

      this.turn += 1;
      console.log(' ');
      console.log(' ');
    }
    this.finish();
  };

  this.finish = function () {
    const winner = this.pokemon1.hp <= 0 ? this.pokemon2 : this.pokemon1;
    console.log(`The battle is over. ${winner.name} wins!`);
  };
}

interface TPokemon {
  name: string;
  type: string;
  strength: number;
  hp?: number;
  isAlive(): boolean;
  isFainting(): boolean;
  attack(...args: TPokemon[]): void;
}

function Pokemon(name: string, type: string, strength: number, hp = 100) {
  this.name = name;
  this.type = type;
  this.strength = strength;
  this.hp = hp;

  this.attack = function (pokemon: TPokemon) {
    if (this.isFainting()) {
      this.hp = 0;
      return null;
    }

    if (this.missAttack()) return null;

    if (this.criticalHit()) {
      pokemon.hp -= this.strength * 2;
    } else {
      pokemon.hp -= this.strength;
    }
  };

  this.isAlive = function () {
    return this.hp > 0;
  };

  this.missAttack = function () {
    let range = Math.floor(Math.random() * 100) + 1;

    if (range <= 10) {
      console.log(`${this.name} misses the attack`);
      return true;
    }
    return false;
  };

  this.criticalHit = function () {
    let range = Math.floor(Math.random() * 100) + 1;

    if (range <= 7) {
      console.log(`${this.name} lands a critical hit`);
      return true;
    }
    return false;
  };

  this.isFainting = function () {
    if (this.hp <= 0) {
      console.log(`${this.name} fainted`);
      return true;
    }
    return false;
  };
}

let pikachuPokemon = new Pokemon('Pikachu', 'Electric', 9);
let laprasPokemon = new Pokemon('Lapras', 'Water', 7);

let pokeBattle = new PokemonBattle(pikachuPokemon, laprasPokemon);

pokeBattle.start();
