'use strict'

const Command = require('../../structure/Command.js')

class boop extends Command {
    constructor() {
        super({
            name: 'boop',
            category: 'dev',
            description: 'Boop people',
            usage: '',
            example: ['bopp'],
            aliases: ['boop']
        })
    }

    async run(client, message) {
        await message.channel.send('Boop https://tenor.com/view/milk-mocha-nose-milk-and-mocha-nose-milk-and-mocha-boop-milk-mocha-boop-milk-and-mocha-nose-boop-gif-19678376')
    }
}

module.exports = new boop