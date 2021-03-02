'use strict';

const Command = require("../../structure/Command.js");

class Roadmap extends Command {
    constructor() {
        super({
            name: 'Roadmap',
            category: 'dev',
            description: 'check the future of the bot',
            usage: 'Roadmap',
            example: ['roadmap'],
            aliases: ['roadmap']
        });
    }

    async run(client, message) {
        await message.channel.send('Check out the Roadmap here http://globalbans.xyz/').then(msg => {
           
        });
    }
}

module.exports = new Roadmap;