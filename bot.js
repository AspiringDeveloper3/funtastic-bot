require("dotenv").config();
const _ = require("lodash");
const discord = require("discord.js");
const tonic = require("tonic-js");
const client = new discord.Client({
  partials: ["MESSAGE", "REACTION"],
});

function makeUser(msg) {
  const newUser = new User({
    userId: msg.author.id,
    username: msg.author.username,
    kittens: [],
    pokedex: [],
    xp: 0,
    level: 0,
    inv: [],
  });
  newUser.save();
}

const mongoose = require("mongoose");
const { filter, random } = require("lodash");

mongoose.connect(
  "mongodb+srv://admin-vedant:Vedant7126@funtastic-bot.quavu.mongodb.net/botDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userSchema = new mongoose.Schema({
  userId: String,
  username: String,
  kittens: [],
  pokedex: [],
  xp: Number,
  level: Number,
  inv: [],
});

const User = mongoose.model("user", userSchema);

// User.deleteMany({}, (err, res) => console.log("Delete"));

// Kitties
const kitties = [
  { name: "Nibbles", type: "Common" },
  { name: "Chroma", type: "Epic" },
  { name: "Amber", type: "Epic" },
  { name: "Fang", type: "Rare" },
  { name: "Apollo", type: "Common" },
  { name: "Cuddles", type: "Common" },
  { name: "Static", type: "Rare" },
  { name: "Neon", type: "Common" },
  { name: "Scratch", type: "Common" },
  { name: "Phobos", type: "Common" },
  { name: "Claws", type: "Legendary" },
  { name: "Pancake", type: "Legendary" },
  { name: "Glamour", type: "Common" },
  { name: "Meow", type: "Rare" },
  { name: "Crimson", type: "Rare" },
  { name: "Melon", type: "Common" },
];

// Pokemons
const pokemons = [
  {
    name: "Pikachu",
    type: "Epic",
    info: { health: 220, weight: "13.2 lbs" },
    moves: [
      {
        move: "Thunderbolt",
        damage: 30,
      },
      {
        move: "Electro Ball",
        damage: 43,
      },
      {
        move: "Agility",
        damage: 28,
      },
      {
        move: "Iron Tail",
        damage: 63,
      },
      {
        move: "Mega Punch",
        damage: 42,
      },
    ],
  },
  {
    name: "Chikorita",
    type: "Rare",
    info: { health: 210, weight: "14.1 lbs" },
    moves: [
      { move: "Vine Whip", damage: 26 },
      { move: "Razor Leaf", damage: 30 },
      { move: "Charge", damage: 54 },
      { move: "Tangle", damage: 32 },
      { move: "Mirror", damage: 10 },
    ],
  },
  {
    name: "Bulbasaur",
    type: "Common",
    info: { health: 130, weight: "300kg" },
    moves: [
      { move: "Vine Whip", damage: 16 },
      { move: "Razor Leaf", damage: 31 },
      { move: "Charge", damage: 24 },
      { move: "Tangle", damage: 32 },
      { move: "Mirror", damage: 20 },
    ],
  },
  {
    name: "Charmander",
    type: "Common",
    info: { health: 180, weight: "18.7 lbs" },
    moves: [
      { move: "Fire", damage: 26 },
      { move: "Tail Smash", damage: 35 },
      { move: "Charge", damage: 45 },
      { move: "Inferno", damage: 32 },
      { move: "Smokescreen", damage: 32 },
    ],
  },
  {
    name: "Squirtle",
    type: "Common",
    info: { health: 190, weight: "19.8 lbs" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Tail Smash", damage: 35 },
      { move: "Water Gun", damage: 45 },
      { move: "Rapid Spin", damage: 33 },
      { move: "Hydro Pump", damage: 62 },
    ],
  },
  {
    name: "Lucario",
    type: "Epic",
    info: { health: 290, weight: "119.0 lbs" },
    moves: [
      { move: "Aura Sphere", damage: 65 },
      { move: "Tail Smash", damage: 35 },
      { move: "Laser Focus", damage: 95 },
      { move: "Meteor Mash", damage: 83 },
      { move: "Power Punch", damage: 62 },
    ],
  },
  {
    name: "Eevee",
    type: "Common",
    info: { health: 150, weight: "14.3 lbs" },
    moves: [
      { move: "Tackle", damage: 26 },
      { move: "Tail Smash", damage: 35 },
      { move: "Quick Attack", damage: 25 },
      { move: "Bite", damage: 13 },
      { move: "Double Kick", damage: 22 },
    ],
  },
  {
    name: "Kyurem",
    type: "Legendary",
    info: { health: 300, weight: "716.5 lbs" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Rock Slide", damage: 65 },
      { move: "Giga Impact", damage: 89 },
      { move: "Icicle Spear", damage: 87 },
      { move: "Blizzard", damage: 92 },
    ],
  },
  {
    name: "Electabuzz",
    type: "Common",
    info: { health: 190, weight: "66.1 lbs" },
    moves: [
      { move: "Charge", damage: 46 },
      { move: "Electra Punch", damage: 25 },
      { move: "Thunder", damage: 45 },
    ],
  },
  {
    name: "Sandshrew",
    type: "Rare",
    info: { health: 170, weight: "26.5 lbs" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Metal Claw", damage: 55 },
      { move: "Steel Roller", damage: 45 },
      { move: "Rock Slide", damage: 33 },
      { move: "Sandstorm", damage: 32 },
    ],
  },
  {
    name: "Nidorina",
    type: "Rare",
    info: { health: 190, weight: "44.1 lbs" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Double Kick", damage: 35 },
      { move: "Toxic", damage: 38 },
      { move: "Pound", damage: 33 },
      { move: "Shadow Claw", damage: 51 },
    ],
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Kadabra",
    type: "Epic",
    info: { health: 290, weight: "124.6 lbs" },
    moves: [
      { move: "Kinesis", damage: 46 },
      { move: "Psybeam", damage: 42 },
      { move: "Psycho Cut", damage: 32 },
      { move: "Psychic", damage: 39 },
      { move: "Confusion", damage: 58 },
    ],
  },
  {
    name: "Geodude",
    type: "Rare",
    info: { health: 180, weight: "44.1 lbs" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Rock Punch", damage: 35 },
      { move: "Tomb", damage: 45 },
      { move: "Take Down", damage: 33 },
      { move: "Headbutt", damage: 29 },
    ],
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Haunter",
    type: "Epic",
    info: { health: 260, weight: "0.2 lbs" },
    moves: [
      { move: "Tackle", damage: 31 },
      { move: "Giga Drain", damage: 35 },
      { move: "Disable", damage: 45 },
      { move: "Shadow Punch", damage: 60 },
      { move: "Shadow Ball", damage: 80 },
    ],
  },
  {
    name: "Drowzee",
    type: "Epic",
    info: { health: 240, weight: "71.4 lbs" },
    moves: [
      { move: "Tackle", damage: 26 },
      { move: "Hypnosis", damage: 35 },
      { move: "Psybeam", damage: 45 },
      { move: "Dream Eater", damage: 33 },
      { move: "Headbutt", damage: 62 },
    ],
  },
  {
    name: "Cubone",
    type: "Common",
    info: { health: 150, weight: "14.3 lbs" },
    moves: [
      { move: "Tackle", damage: 21 },
      { move: "Wack", damage: 16 },
      { move: "Bone Rush", damage: 45 },
      { move: "Bonemerang", damage: 33 },
      { move: "Double Kick", damage: 32 },
    ],
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Kangaskhan",
    type: "Epic",
    info: { health: 290, weight: "176.4 lbs" },
    moves: [
      { move: "Tackle", damage: 56 },
      { move: "Mega Punch", damage: 39 },
      { move: "Circle Throw", damage: 41 },
      { move: "Counter", damage: 53 },
      { move: "Last Resort", damage: 42 },
    ],
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Steelix",
    type: "Epic",
    info: { health: 240, weight: "881.8 lbs" },
    moves: [
      { move: "Tackle", damage: 31 },
      { move: "Stone Edge", damage: 52 },
      { move: "	Rock Slide", damage: 51 },
      { move: "Steel Roll", damage: 68 },
      { move: "Dragon Tail", damage: 44 },
    ],
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Blaziken",
    type: "Rare",
    info: { health: 210, weight: "114.6 lbs" },
    moves: [
      { move: "Tackle", damage: 31 },
      { move: "Double Kick", damage: 35 },
      { move: "Fire Punch", damage: 42 },
      { move: "Flame Charge", damage: 29 },
      { move: "Aerial Ace", damage: 62 },
    ],
  },
  {
    name: "Nothing",
    type: "Nothing",
  },
  {
    name: "Gyrados",
    type: "Rare",
    info: { health: 200, weight: "300kg" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Tail Smash", damage: 35 },
      { move: "Water Gun", damage: 45 },
      { move: "Rapid Spin", damage: 33 },
      { move: "Hydro Pump", damage: 62 },
    ],
  },
  {
    name: "Aerodactyl",
    type: "Legendary",
    info: { health: 200, weight: "300kg" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Tail Smash", damage: 35 },
      { move: "Mega Punch", damage: 67 },
      { move: "Megadrop", damage: 54 },
      { move: "Earthquake", damage: 62 },
    ],
  },
  {
    name: "Mew",
    type: "Legendary",
    info: { health: 350, weight: "300kg" },
    moves: [
      { move: "Ancient Power", damage: 77 },
      { move: "Metronome", damage: 89 },
      { move: "Aura Sphere", damage: 87 },
      { move: "Dual Wingbeat", damage: 63 },
      { move: "Psypump", damage: 62 },
    ],
  },
  {
    name: "MewTwo",
    type: "Mega-Legendary",
    info: { health: 700, weight: "269.0 lbs" },
    moves: [
      { move: "Confusion", damage: 90 },
      { move: "Laser", damage: 70 },
      { move: "Psycho Cut", damage: 90 },
      { move: "Amnesia", damage: 87 },
      { move: "Psydrive", damage: 120 },
    ],
  },
  {
    name: "Arceus",
    type: "Mega-Legendary",
    info: { health: 700, weight: "705.5 lbs" },
    moves: [
      { move: "Earth Power", damage: 90 },
      { move: "Hyper Voice", damage: 110 },
      { move: "Hyper Beam", damage: 69 },
      { move: "Dragon Pulse", damage: 92 },
      { move: "Icy Wind", damage: 82 },
    ],
  },
  {
    name: "Noctowl",
    type: "Epic",
    info: { health: 200, weight: "89.9 lbs" },
    moves: [
      { move: "Tackle", damage: 46 },
      { move: "Hypnosis", damage: 60 },
      { move: "Confusion", damage: 52 },
      { move: "Air Slash", damage: 43 },
      { move: "Sky Attack", damage: 33 },
    ],
  },
  {
    name: "Groudon",
    type: "Legendary",
    info: { health: 300, weight: "2094.4 lbs" },
    moves: [
      { move: "Earth Power", damage: 90 },
      { move: "Fire Blast", damage: 70 },
      { move: "Solar Beam", damage: 65 },
      { move: "Mega Punch", damage: 83 },
      { move: "Body Slam", damage: 68 },
    ],
  },
];

const trymsg =
  "You weren't a user before, now an account has been made. Re-run the command for MAGIC!";

// Bot msgs
client.on("ready", () => {
  console.log("Bot ready!");
  client.user.setPresence({
    status: "online",
    activity: {
      name: "-help",
      type: "PLAYING",
      url: "https://discord.com",
    },
  });
});

client.on("message", (msg) => {
  if (msg.content.toLowerCase() === "-kitties") {
    User.findOne({ userId: msg.author.id }, (err, result) => {
      if (err) console.log(err);
      else {
        if (!result) {
          makeUser(msg);
          msg.reply(trymsg);
        } else {
          msg.reply(result.kittens);
        }
      }
    });
  }

  if (msg.content.toLowerCase() === "-kittyhunt") {
    const index = Math.floor(Math.random() * kitties.length);
    const kitty = kitties[index];

    User.findOne({ userId: msg.author.id }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.level > 0) {
          for (let i = 0; i < result.level; i++) {
            result.inv.push("Pokefood");
          }
          result.save();
        }
        if (!result) {
          makeUser(msg);
          msg.reply(trymsg);
        } else {
          switch (kitty.type) {
            case "Common":
              msg.reply("You caught a COMMON kitty, " + kitty.name + " 😺");
              break;
            case "Rare":
              msg.reply("You caught a RARE kitty, " + kitty.name + " 😽");
              break;
            case "Epic":
              msg.reply("You caught an EPIC kitty, " + kitty.name + " 😻");
              break;
            case "Legendary":
              msg.reply("You caught a LEGENDARY kitty," + kitty.name + " 🙀");
              break;

            default:
              break;
          }
          result.kittens.push(kitty.name);
          result.save();
        }
      }
    });
  }

  if (msg.content.startsWith("-kittysell")) {
    const split = msg.content.split(" ");
    let xp;
    kitties.forEach((kitty) => {
      if (kitty.name === _.capitalize(split[1])) {
        switch (kitty.type) {
          case "Common":
            xp = 25;
            break;
          case "Rare":
            xp = 65;
            break;
          case "Epic":
            xp = 90;
            break;
          case "Legendary":
            xp = 150;
            break;

          default:
            break;
        }
      }
    });

    if (!split[1]) {
      msg.reply("Hey! What are u trying to sell? Atleast write the name 🙄");
    } else {
      User.findOne({ userId: msg.author.id }, (err, res) => {
        if (err) console.log(err);
        else {
          if (!res) {
            makeUser(msg);
            msg.reply(trymsg);
          } else {
            for (let i = 0; i < res.kittens.length; i++) {
              const element = res.kittens[i];
              const index = res.kittens.indexOf(_.capitalize(split[1]));
              if (element === _.capitalize(split[1])) {
                msg.reply(`You sold ${split[1]} for ${xp} xp!`);
                if (index > -1) {
                  res.kittens.splice(index, 1);
                  res.xp += xp;
                  res.save();
                  break;
                }
              } else if (
                element != _.capitalize(split[1]) &&
                i === res.kittens.length - 1
              ) {
                msg.reply("You don't have this kitty!");
                break;
              }
            }
          }
        }
      });
    }
  }

  if (msg.content.startsWith("-xp")) {
    const mention = msg.mentions.users.first();
    if (mention) {
      User.findOne({ userId: mention.id }, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.level > 0) {
            result.inv = [];
            for (let i = 0; i < result.level; i++) {
              result.inv.push("Pokefood");
            }
            result.save();
          }

          if (result.xp > 900) {
            result.level++;
            result.xp -= 900;
            result.save();
          }
          msg.reply(`
          You have ${result.xp} xp &
          your level is ${result.level}
  
          **You need ${900 - result.xp} more xp for level ${result.level + 1}**
          `);
        }
      });
    } else {
      User.findOne({ userId: msg.author.id }, (err, result) => {
        if (err) console.log(err);
        else {
          if (result.level > 0) {
            result.inv = [];
            for (let i = 0; i < result.level; i++) {
              result.inv.push("Pokefood");
            }
            result.save();
          }

          if (result.xp > 900) {
            result.level++;
            result.xp -= 900;
            result.save();
          }
          msg.reply(`
          You have ${result.xp} xp &
          your level is ${result.level}
  
          **You need ${900 - result.xp} more xp for level ${result.level + 1}**
          `);
        }
      });
    }
  }

  if (msg.content.startsWith("-inv")) {
    const mention = msg.mentions.users.first();
    if (mention) {
      User.findOne({ userId: mention.id }, (err, res) => {
        if (err) console.log(err);
        else {
          if (!res) {
            makeUser(msg);
            msg.reply(trymsg);
          } else {
            msg.reply(`${res.username}'s inventory : -
            ${res.inv}`);
          }
        }
      });
    } else {
      User.findOne({ userId: msg.author.id }, (err, result) => {
        if (err) console.log(err);
        else {
          if (!result) {
            makeUser(msg);
            msg.reply(trymsg);
          } else {
            msg.reply(`${result.username}'s inventory : -
              ${result.inv}`);
          }
        }
      });
    }
  }

  if (msg.content.startsWith("-pokedex")) {
    const mention = msg.mentions.users.first();
    if (mention) {
      User.findOne({ userId: mention.id }, (err, res) => {
        msg.reply(`${res.username}'s pokedex : -
        ${res.pokedex}`);
      });
    } else {
      User.findOne({ userId: msg.author.id }, (err, res) => {
        if (err) console.log(err);
        else {
          if (!res) {
            makeUser(msg);
            msg.reply(trymsg);
          }
          if (res.pokedex.length > 0) {
            msg.reply(res.pokedex);
          } else {
            msg.reply(
              "You have no pokemons. Go hunt some using **'-pokehunt'** command"
            );
          }
        }
      });
    }
  }

  if (msg.content === "-pokehunt") {
    const index = Math.floor(Math.random() * pokemons.length);
    const pokemon = pokemons[index];

    User.findOne({ userId: msg.author.id }, (err, res) => {
      if (err) console.log(err);
      else {
        if (!res) {
          makeUser(msg);
          msg.reply(trymsg);
        } else if (res.pokedex.length > 6) {
          msg.reply(
            "Hey! You already have 6 pokemons, its the limit. Go sell some!"
          );
        } else if (pokemon.name === "Nothing") {
          msg.reply("lol, u got nothing. Try again!");
          return;
        } else {
          switch (pokemon.type) {
            case "Common":
              msg.reply(`You caught a COMMON pokemon, **${pokemon.name}** 🙂`);
              break;
            case "Rare":
              msg.reply(`You caught a RARE pokemon, **${pokemon.name}** 😃`);
              break;
            case "Legendary":
              msg.reply(
                `You caught a LEGENDARY pokemon, **${pokemon.name}** 🥳`
              );
              break;
            case "Epic":
              msg.reply(`You caught an EPIC pokemon, **${pokemon.name}** 🤩`);
              break;
            case "Mega-Legendary":
              msg.reply(
                `You caught a MEGA-LEGENDARY pokemon, **${pokemon.name}** 😱`
              );
              break;

            default:
              break;
          }
          res.pokedex.push(pokemon.name);
          res.save();
        }
      }
    });
  }

  if (msg.content.startsWith("-pokesell")) {
    const split = msg.content.split(" ");
    let xp;
    pokemons.forEach((pokemon) => {
      if (pokemon.name === _.capitalize(split[1])) {
        switch (pokemon.type) {
          case "Common":
            xp = 40;
            break;
          case "Rare":
            xp = 105;
            break;
          case "Epic":
            xp = 150;
            break;
          case "Legendary":
            xp = 200;
            break;
          case "Mega-Legendary":
            xp = 300;
            break;

          default:
            break;
        }
      }
    });

    if (!split[1]) {
      msg.reply("Hey! What are u trying to sell? Atleast write the name 🙄");
    } else {
      User.findOne({ userId: msg.author.id }, (err, res) => {
        if (err) console.log(err);
        else {
          if (!res) {
            makeUser(msg);
            msg.reply(trymsg);
          } else {
            for (let i = 0; i < res.pokedex.length; i++) {
              const element = res.pokedex[i];
              const index = res.pokedex.indexOf(_.capitalize(split[1]));
              if (element === _.capitalize(split[1])) {
                msg.reply(`You sold ${split[1]} for ${xp} xp!`);
                if (index > -1) {
                  res.pokedex.splice(index, 1);
                  res.xp += xp;
                  res.save();
                  break;
                }
              } else if (
                element != _.capitalize(split[1]) &&
                i === res.pokedex.length - 1
              ) {
                msg.reply("You don't have this pokemon!");
                break;
              }
            }
          }
        }
      });
    }
  }

  if (msg.content === "-help") {
    msg.reply(
      "```Funtastic the Bot responds to these commands : - \n\n-pokehunt: hunt for pokemons\n\n-pokesell <pokemon name>: sell some pokemon for xp\n\n-pokedex: look at the pokemons u have\n\n-pokeinfo <pokemon name>: Get info about a pokemon\n\n-kittyhunt: hunt for kitties\n\n-kittysell <kitty name>: sell the kitties for xp\n\n-kitties: look at the kitties u have\n\n-xp: check your level and xp\n\n-inv: check your inventory ```"
    );
  }

  if (msg.content.startsWith("-pokeinfo")) {
    const split = msg.content.split(" ");
    const reqPokemon = split[1];
    pokemons.forEach((pokemon) => {
      if (pokemon.name === _.capitalize(reqPokemon)) {
        msg.reply(
          `**${pokemon.name}'s** health is **${pokemon.info.health}** and its weight is **${pokemon.info.weight}**.\nIt's moves are : -`
        );
        pokemon.moves.forEach((move) =>
          msg.channel.send(
            `**${move.move}** and it deals **${move.damage}** damage`
          )
        );
      }
    });
  }

  if (msg.content.startsWith("-play")) {
    const game = msg.content.split(" ")[1];
    const questions = [
      {
        question: "What is the capital of Russia?",
        answer: "Moscow",
      },
      {
        question: "What is the longest word without a vowel?",
        answer: "Rhythm",
      },
      {
        question: "How tall is the Mount Everest?",
        answer: "8848 m",
      },
      {
        question: "How many hours in a week?",
        answer: "168",
      },
      {
        question: "What is the 3rd largest country? (Answer in all caps)",
        answer: "USA",
      },
      {
        question: "How many countries are in the world?",
        answer: "195",
      },
      {
        question: "When did you die",
        answer: "Never",
      },
      {
        question: "When did World War 1 start (year)",
        answer: "1914",
      },
    ];
    if (game === "trivia") {
      const author = msg.author;
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      msg.reply(randomQuestion.question).then(() => {
        msg.channel
          .awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .then((message) => {
            message = message.first();

            if (message.author === author) {
              const addedXP = Math.floor(Math.random() * 50);
              if (
                message.content.toLowerCase() ===
                randomQuestion.answer.toLowerCase()
              ) {
                User.findOne({ userId: author.id }, (err, result) => {
                  if (err) {
                    console.log(err);
                  } else if (!result) {
                    msg.reply(trymsg);
                    makeUser(msg);
                  } else {
                    result.xp += addedXP;
                    result.save();
                    if (addedXP === 0) {
                      msg.reply(
                        `That is correct! Unfortunately, you luck is bad. You earned 0 xp, lol 🤣`
                      );
                    } else {
                      msg.reply(
                        `That is correct! You earned ${addedXP} more xp! Great job!`
                      );
                    }
                  }
                });
              } else {
                msg.reply(
                  `No! That's the wrong answer, the correct answer was ${randomQuestion.answer}`
                );
              }
            }
          });
      });
    } else if (game === "numguess") {
      const randomNum = Math.round(Math.random() * 50);
      msg.reply("Take a guess between 1 & 50!").then(() => {
        msg.channel
          .awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .then((message) => {
            message = message.first();
            if (message.content === randomNum) {
              const addedXP = Math.floor(Math.random() * 500);
              User.findOne({ userId: author.id }, (err, result) => {
                if (err) {
                  console.log(err);
                } else if (!result) {
                  msg.reply(trymsg);
                  makeUser(msg);
                } else {
                  result.xp += addedXP;
                  result.save();
                  if (addedXP === 0) {
                    msg.reply(
                      `That is correct! Unfortunately, you luck is bad. You earned 0 xp, lol 🤣`
                    );
                  } else {
                    msg.reply(
                      `That is correct! You earned ${addedXP} more xp! Great job!`
                    );
                  }
                }
              });
            } else {
              msg.reply("No! thats wrong, the number was " + randomNum);
            }
          });
      });
    }
  }

  if (msg.content.startsWith("-pokebattle")) {
    const split = msg.content.split(" ");
    const userPokemon = split[2];
    const mention = msg.mentions.users.first();

    if (!mention) {
      msg.reply(
        "Who do you want to challenge?\nThe correct format is\n*-pokebattle <who you want to challenge> <your pokemon>*"
      );
    } else if (!userPokemon) {
      msg.reply(
        "Which pokemon do you want to choose 🙄.\nThe correct format is\n*-pokebattle <who you want to challenge> <your pokemon>* "
      );
    }
    User.findOne({ userId: msg.author.id }, (err, result) => {
      if (err || !result) {
        msg.reply(trymsg);
        makeUser(msg);
      } else {
        for (let i = 0; i < result.pokedex.length; i++) {
          const value = result.pokedex[i];
          if (value.toLowerCase() === userPokemon.toLowerCase()) {
            msg.reply("You have this");
            msg.channel
              .send(mention.toString() + " what is your pokemon?")
              .then(() => {
                msg.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"],
                  })
                  .then((message) => {
                    message = message.first();
                    msg.reply(message);
                  });
              });
          } else if (i === result.pokedex.length - 1) {
            msg.reply("Nothing");
            return;
          }
        }
      }
    });
  }

  if (msg.content.startsWith("-spin")) {
    const names = msg.content.split(" ").slice(1, msg.content.length);

    const randomName = names[Math.floor(Math.random() * names.length)];
    msg.channel.send("🎡...Spinning...🎡").then((message) => {
      setTimeout(() => {
        message.edit("🌟 " + randomName + " 🌟");
      }, 600);
    });
  }

  if (msg.content.startsWith("-predict")) {
    const predictions = [
      "No",
      "yes",
      "maybe",
      "try later bruh",
      "never ever in ur life gonna happen",
      "100% sure it wont happen",
      "It will surely not happen!",
      "Even i dont know 😢",
      "Agreed! It will happen",
      "100% sure it will happen",
      "yes yes!",
      "perhaps",
      "who knows lol",
    ];
    msg.reply("Thinking").then((message) => {
      setTimeout(() => {
        message.edit(message.content + "......").then((value) => {
          setTimeout(() => {
            value.edit(
              predictions[Math.floor(Math.random() * predictions.length)]
            );
          }, 400);
        });
      }, 300);
    });
  }
});

client.login(process.env.BOT_TOKEN);
