
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
                                name: 'My users ',
                                value: 'Users:' + `\`\`${client.users.cache.size}\`\``,
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
                                name: 'Users Blacklisted',
                                value: bannedUserCount,
                                inline: true
                            },
                            {
                                name: 'Users Watchlist',
                                value: userWatchlistCount,
                                inline: true
                            }
                        ]
                    }
                })
            })
        })
    }
}

module.exports = new Stats