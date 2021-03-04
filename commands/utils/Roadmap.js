'use strict'

const Discord = require('discord.js')
const Command = require('../../structure/Command.js')

class Roadmap extends Command {
    constructor() {
        super({
            name: 'Roadmap',
            category: 'dev',
            description: 'check out are roadmap',
            usage: 'roadmap',
            example: ['Roadmap'],
            aliases: ['roadmap']
        })
    }

    async run(client, message) {
        await message.channel.send(new Discord.MessageEmbed()
            .setTitle('Global bans roadmap')
            .setURL('http://globalbans.xyz/')
            .setColor('#ff0000')
            .setDescription('Check out the roadmap for the bot ')
            .setFooter('the smart way to protect your community , ')
            .setImage('http://globalbans.xyz/gbbanslogo.png')
            .setThumbnail('https://cdn.discordapp.com/avatars/813673081738493983/391fd42bf32b89148d416239d1950413.png?size=128')
            .setTimestamp())
        
    }
}

module.exports = new Roadmap