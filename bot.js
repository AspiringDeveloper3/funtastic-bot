require("dotenv").config();
const _ = require("lodash");
const discord = require("discord.js");
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
  { name: "Pikachu", type: "Epic" },
  { name: "Chikorita", type: "Rare" },
  { name: "Bulbasaur", type: "Common" },
  { name: "Charmander", type: "Common" },
  { name: "Squirtle", type: "Common" },
  { name: "Psyduck", type: "Rare" },
  { name: "Lucario", type: "Epic" },
  { name: "Eevee", type: "Common" },
  { name: "Kyurem", type: "Legendary" },
  { name: "Electabuzz", type: "Common" },
  { name: "Rayquaza", type: "Legendary" },
  { name: "Ditto", type: "Epic" },
  { name: "Sandshrew", type: "Rare" },
  { name: "Nidoran", type: "Rare" },
  { name: "Nidorina", type: "Rare" },
  { name: "Nothing", type: "Nothing" },
  { name: "Meowth", type: "Rare" },
  { name: "Nothing", type: "Nothing" },
  { name: "Kadabra", type: "Epic" },
  { name: "Geodude", type: "Rare" },
  { name: "Nothing", type: "Nothing" },
  { name: "Slowpoke", type: "Common" },
  { name: "Haunter", type: "Epic" },
  { name: "Drowzee", type: "Epic" },
  { name: "Cubone", type: "Common" },
  { name: "Nothing", type: "Nothing" },
  { name: "Kangaskhan", type: "Epic" },
  { name: "Staryu", type: "Common" },
  { name: "Nothing", type: "Nothing" },
  { name: "Cyndaquil", type: "Common" },
  { name: "Totodile", type: "Common" },
  { name: "Nothing", type: "Nothing" },
  { name: "Steelix", type: "Epic" },
  { name: "Slugma", type: "Common" },
  { name: "Nothing", type: "Nothing" },
  { name: "Blaziken", type: "Rare" },
  { name: "Nothing", type: "Nothing" },
  { name: "Lugia", type: "Legendary" },
  { name: "Gyrados", type: "Rare" },
  { name: "Aerodactyl", type: "Legendary" },
  { name: "Mew", type: "Legendary" },
  { name: "MewTwo", type: "Mega-Legendary" },
  { name: "Arceus", type: "Mega-Legendary" },
  { name: "Noctowl", type: "Epic" },
  { name: "Groudon", type: "Legendary" },
];

const trymsg =
  "You weren't a user before, now an account has been made. Re-run the command for MAGIC!";

// Bot msgs
client.on("ready", () => {
  console.log("Bot ready!");
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

  if (msg.content === "-xp") {
    User.findOne({ userId: msg.author.id }, (err, result) => {
      if (err) console.log(err);
      else {
        if (result.level > 0) {
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

  if (msg.content === "-inv") {
    User.findOne({ userId: msg.author.id }, (err, result) => {
      if (err) console.log(err);
      else {
        if (!result) {
          makeUser(msg);
          msg.reply(trymsg);
        } else {
          msg.reply(result.inv);
        }
      }
    });
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

  if (msg.content === "-pokedex") {
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
      "```Funtastic the Bot responds to these commands : - \n\n-pokehunt: hunt for pokemons\n\n-pokesell: sell some pokemon for xp\n\n-pokedex: look at the pokemons u have\n\n-kittyhunt: hunt for kitties\n\n-kittysell: sell the kitties for xp\n\n-kitties: look at the kitties u have\n\n-xp: check your level and xp\n\n-inv: check your inventory ```"
    );
  }
});

client.login(process.env.BOT_TOKEN);
