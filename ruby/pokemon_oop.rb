# Create a quick Pokémon game where 2 pokemons fight against each other. For This we need to:

          ### CREATE A POKÉMON CLASS

# 1. Create 2 new instances of Pokemon (new pokemons)
# Each pokemon will have these attributes:
# - name
# - type
# - HP (health points)
# - IMPORTANT: if we do not specify the HP, it will be 100 by default.

# 2. Be able to control when a pokemon:
# - attacks
# - misses the attack
# - lands a critical hit
# - faints (loses the battle)

          ### CREATE A BATTLE CLASS

# 1. Initialize a battle between 2 pokémons that we pass as arguments
# 2. Start a battle where both pokémons will take turns to attack until one loses (HP equals 0)
# 3. Output the winner.

class Battle
  attr_accessor :pokemon1, :pokemon2, :turn

  def initialize(pokemon1, pokemon2)
    @pokemon1 = pokemon1
    @pokemon2 = pokemon2 
    @turn = 1

    puts "Starting battle between #{pokemon1.name} and #{pokemon2.name}"
  end

  def start
    pokemon1 = self.pokemon1
    pokemon2 = self.pokemon2

    while (pokemon1.is_alive? && pokemon2.is_alive?)
      puts "Turn #{self.turn}"
      
      puts "Current HP"
      puts "#{pokemon2.name}: #{pokemon2.hp} HP"
      puts "#{pokemon1.name}: #{pokemon1.hp} HP"

      puts "-------------------------"
      
      puts "Fight"
        pokmeon1.attack(pokemon2)
        pokemon2.attack(pokemon1)

      puts "----------------------"

      puts "HP left after this turn"
      puts "#{pokemon2.name}: #{pokemon2.hp} HP"
      puts "#{pokemon1.name}: #{pokemon1.hp} HP"

      self.turn += 1
    end
    finish #calling finish method
  end

  def finish
    winner = self.pokemon1.hp <= 0 ? self.pokemon2 : self.pokemon1
    puts "The vattle is over. #{winner.name} wins!"
  end
end


class Pokemon
  attr_accessor :name, :type, :strength, :hp

  def initialize(name, type, strength, hp=100)
    @name = name
    @type = type
    @strength = strength
    @hp = hp

    puts "I am #{name}, my type is #{type}, my strength is #{strength} and I have #{hp} HP"
  end

  def attack(pokemon)
    if pokemon_faints
      self.hp = 0
      return nil
    end

    return nil if miss_attack
  
    puts "#{self.name} attacks #{pokemon.name}"

    if critical_hit
      pokemon.hp -= self.strength * 2
    else 
      pokemon.hp -= self.strength
    end

  end

  def is_alive? 
    if self.hp > 0 
      return true
    else 
      return false
    end
  end

  def miss_attack
    # https://blog.appsignal.com/2018/07/31/generating-random-numbers-in-ruby.html
    #  generate random number from 1 to 100 range using the rand() method.
    if rand(1..100) <=  10
      puts "#{self.name} misses the attack"
      return true
    end

    return false
  end

  def critical_hit
    if rand(1..100) <= 7
      puts "#{self.name} lands a critical hit"
      return true
    end
    return false
  end

  def pokemon_faints
    if self.hp <= 0
    puts "#{self.name} fainted"
    return true
    end

    return false
  end
end

pikachu = Pokemon.new('Pikachu', 'Electric', 9)
lapras = Pokemon.new('Lapras', 'Water', 7)

battle = Battle.new(pikachu, larpas)
battle.start