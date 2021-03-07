'use strict'

const Command = require('../../structure/Command.js')
const paginationEmbed = require('discord.js-pagination')
const { MessageEmbed } = require('discord.js')

class CheckID extends Command {
    constructor() {
        super({
            name: 'userinfo',
            category: 'utils',
            description: 'Allows you to see explicite details of a users history of blacklist and watchlist entries.',
            usage: 'userinfo',
            example: ['userinfo <@user/id>'],
            aliases: ['checkuserinfo']
        })
    }
    
    async run(client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) 
        if (!member) {
            let memberId = args[1]

            console.log(memberId)

            let foundMemberId = false
            if (memberId.length === 18 || memberId.length === 17) {
                foundMemberId = true
            } else if (memberId.length > 18) {
                memberId = memberId.substring(3)
                memberId = memberId.slice(0, -1)

                console.log(memberId)
                if (memberId.length === 18 || memberId.length === 17) {
                    foundMemberId = true
                }
            }

            if (foundMemberId === true) {
                member = {
                    id: memberId
                }
            }

            if (foundMemberId === false) {
                return message.channel.send('Please specify a correct ID or mention correctly.')
            }
        }
        try {
            client.bdd.query('SELECT * FROM user_watchlist WHERE user_id = ?', [member.id], function (watchlistErr, watchlistResults) {
                if (watchlistErr) throw watchlistErr
                client.bdd.query('SELECT * FROM user_blacklist WHERE user_id = ?', [member.id], function (blacklistErr, blacklistResults) {
                    if (blacklistErr) throw blacklistErr

                    
                    let bannedByGuild = ''
                    let bannedByPlayer = ''
                    let bannedReason = ''
                    if (blacklistResults.length !== 0) {
                        for (let blacklistResultIndex = 0; blacklistResultIndex < blacklistResults.length; blacklistResultIndex++) {
                            const blacklistResult = blacklistResults[blacklistResultIndex]
                            
                            if (bannedByGuild === '') {
                                bannedByGuild += blacklistResult.banning_guild
                                bannedByPlayer += blacklistResult.banned_by
                                bannedReason += blacklistResult.reason
                            } else {
                                bannedByGuild += '\n' + blacklistResult.banning_guild
                                bannedByPlayer += '\n' + blacklistResult.banned_by
                                bannedReason += '\n' + blacklistResult.reason
                            }
                        }
                    } else {
                        bannedByGuild += 'No Ban Entries'
                        bannedByPlayer += 'No Ban Entries'
                        bannedReason += 'No Ban Entries'
                    }
                    
                    
                    const watchlistEmbeds = []

                    if (watchlistResults.length !== 0) {
                        for (let watchlistResultIndex = 0; watchlistResultIndex < watchlistResults.length; watchlistResultIndex++) {
                            const watchlistResult = watchlistResults[watchlistResultIndex]
                            
                            const watchlistEmbed = new MessageEmbed()
                                .setTitle('BLACKLIST AND WATCHLIST ENTRIES')
                                .addFields(
                                    { name: 'BANLIST', value: 'The Banlist shows how often a user was banned from Servers. We heartfully advice to keep track of people who were banned on other servers or to just ban them immediatly if the reason is damming.'},
                                    { name: 'Banning Guild', value: bannedByGuild, inline: true },
                                    { name: 'Banning Player', value: bannedByPlayer, inline: true },
                                    { name: 'Ban Reason', value: bannedReason, inline: true },
                                    { name: '\u200B', value: '\u200B' },
                                    { name: 'WATCHLIST', value: 'Users can be put on the watchlist as part of evidence collection through several servers before a ban is being issued.'},
                                    { name: 'Watched by Guild', value: watchlistResult.warning_guild, inline: true },
                                    { name: 'Watched by Player', value: watchlistResult.warned_by, inline: true },
                                    { name: 'Evidence', value: watchlistResult.evidence, inline: true },
                                )
    
                            watchlistEmbeds.push(watchlistEmbed)
                        }
                    }

                    if (watchlistEmbeds.length === 0) {
                        const noWatchlistDataEmbed = new MessageEmbed()
                            .setTitle('BLACKLIST AND WATCHLIST ENTRIES')
                            .addFields(
                                { name: 'BANLIST', value: 'The Banlist shows how often a user was banned from Servers. We heartfully advice to keep track of people who were banned on other servers or to just ban them immediatly if the reason is damming.'},
                                { name: 'Banning Guild', value: bannedByGuild, inline: true },
                                { name: 'Banning Player', value: bannedByPlayer, inline: true },
                                { name: 'Ban Reason', value: bannedReason, inline: true },
                                { name: '\u200B', value: '\u200B' },
                                { name: 'WATCHLIST', value: 'Users can be put on the watchlist as part of evidence collection through several servers before a ban is being issued.'},
                                { name: 'Watchlist Entries', value: 'No watchlist Entries found', inline: true },
                            )

                        watchlistEmbeds.push(noWatchlistDataEmbed)
                    }

                    paginationEmbed(message, watchlistEmbeds)
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new CheckID