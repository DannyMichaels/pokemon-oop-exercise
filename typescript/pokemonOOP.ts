interface PokemonBattle {
  pokemon1: IPokemon;
  pokemon2: IPokemon;
  turn: number;
  start(): void;
  finish(): void;
}

class PokemonBattle {
  constructor(pokemon1: IPokemon, pokemon2: IPokemon, turn = 100) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
    this.turn = turn;
    console.log(
      `Starting battle between ${pokemon1.name} and ${pokemon2.name}`
    );
  }

  start() {
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
  }

  finish() {
    const winner = this.pokemon1.hp <= 0 ? this.pokemon2 : this.pokemon1;
    console.log(`The battle is over. ${winner.name} wins!`);
  }
}

interface IPokemon {
  name: string;
  type: string;
  strength: number;
  hp?: number;
  isAlive(): boolean;
  isFainting(): boolean;
  attack(...args: IPokemon[]): void;
}

class IPokemon {
  constructor(name: string, type: string, strength: number, hp = 100) {
    this.name = name;
    this.type = type;
    this.strength = strength;
    this.hp = hp;
  }

  attack(pokemon: IPokemon) {
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
  }

  isAlive() {
    return this.hp > 0;
  }

  missAttack() {
    let range = Math.floor(Math.random() * 100) + 1;

    if (range <= 10) {
      console.log(`${this.name} misses the attack`);
      return true;
    }
    return false;
  }

  criticalHit() {
    let range = Math.floor(Math.random() * 100) + 1;

    if (range <= 7) {
      console.log(`${this.name} lands a critical hit`);
      return true;
    }
    return false;
  }

  isFainting() {
    if (this.hp <= 0) {
      console.log(`${this.name} fainted`);
      return true;
    }
    return false;
  }
}

let pikachuPokemon = new Pokemon('Pikachu', 'Electric', 9);
let laprasPokemon = new Pokemon('Lapras', 'Water', 7);

let pokeBattle = new Battle(pikachuPokemon, laprasPokemon);

pokeBattle.start();
