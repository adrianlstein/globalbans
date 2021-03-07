const discord = require ('discord.js')
const Command = require('../../structure/Command.js')
const { loadavg, cpus, totalmem } = require('os')

class Stats extends Command {
    constructor() {
        super({
            name: 'stats',
            category: 'utils',
            description: 'Get bot stats',
            usage: 'stats',
            example: ['stats'],
            aliases: ['botinfo','botstats']
        })
    }

    async run(client, message) {
        let cpuCores = cpus().length
        
        
        client.bdd.query('SELECT COUNT(*) AS namesCount FROM user_blacklist', async function (err, result) {
            if (err) throw err
            
            let bannedUserCount = result[0].namesCount

            client.bdd.query('SELECT COUNT(*) AS namesCount FROM user_watchlist', async function (err, result) {
                if (err) throw err

                let userWatchlistCount = result[0].namesCount

                await message.channel.send({
                    embed: {
                        color: '0xff0000',
                        title: client.user.username,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.displayAvatarURL(),
                            text: client.user.username
                        },
                        thumbnail: {
                            url: client.user.displayAvatarURL()
                        },
                        fields: [
                            {
                                name: 'My Creator\'s',
                                value: 'Zeus and Master Eva',
                                inline: false
                            }, 
                            {
                                name: 'My users ',
                                value: 'Watching' + `\`\`${client.users.cache.size}\`\`Users`,
                                inline: true
                            },
                            {
                                name: 'My Server',
                                value: 'Watching' + `\`\`${client.guilds.cache.size}\`\`Servers`,
                                inline: true
                            },
                            {
                                name: 'Processor use',
                                value: `${(loadavg()[0]/cpuCores).toFixed(2)}% / 100%`,
                                inline: true
                            },
                            {
                                name: 'RAM use',
                                value: `${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB`,
                                inline: true
                            },
                            {
                                name: 'User\'s Blacklisted',
                                value: bannedUserCount,
                                inline: true
                            },
                            {
                                name: 'User\'s on Watchlist',
                                value: userWatchlistCount,
                                inline: true
                            },
                            {
                                name: '___Support Server___',
                                value: 'https://discord.gg/6R9G5UXWQ6',
                                inline: true
                            },
                            {
                                name: '___Website___',
                                value: 'http://globalbans.xyz',
                                inline: false
                            }
                        ]
                    }
                })
            })
        })
    }
}

module.exports = new Stats