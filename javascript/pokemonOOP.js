//  Create a quick Pokémon game where 2 pokemons fight against each other. For This we need to:

//           /// CREATE A POKÉMON CLASS

// 1. Create 2 new instances of Pokemon (new pokemons)
//  Each pokemon will have these attributes:
//  - name
//  - type
//  - HP (health points)
//  - IMPORTANT: if we do not specify the HP, it will be 100 by default.

//  2. Be able to control when a pokemon:
//   - attacks
//   - misses the attack
//   - lands a critical hit
//   - faints (loses the battle)

//           /// CREATE A BATTLE CLASS

// 1. Initialize a battle between 2 pokémons that we pass as arguments
// 2. Start a battle where both pokémons will take turns to attack until one loses (HP equals 0)
// 3. Output the winner.

class Battle {
  constructor(pokemon1, pokemon2, turn = 1) {
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
class Pokemon {
  constructor(name, type, strength, hp = 100) {
    this.name = name;
    this.type = type;
    this.strength = strength;
    this.hp = hp;
  }

  attack(pokemon) {
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
    if (this.hp > 0) {
      return true;
    } else {
      return false;
    }
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

let pikachu = new Pokemon('Pikachu', 'Electric', 9);
let lapras = new Pokemon('Lapras', 'Water', 7);

battle = new Battle(pikachu, lapras);

battle.start();
