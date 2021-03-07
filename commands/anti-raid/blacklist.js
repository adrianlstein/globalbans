'use strict'

const Command = require('../../structure/Command.js')

class Staff extends Command {
    constructor() {
        super({
            name: 'blacklist',
            category: 'anti-raid',
            description: 'Allows people who are staff to blacklist one person.',
            usage: 'blacklist',
            example: ['blacklist <add/remove> <@user/id> <reason>'],
            aliases: []
        })
    }

    async run(client, message, args) {
        let staff = client.bdd.query('SELECT * FROM user_staff WHERE user_id = ?', [message.author.id])
        if (staff) {
            if (args[1] === 'add') {
                let member = message.mentions.members.first() || client.users.cache.get(args[2]) 
                if (!member) {
                    let memberId = args[2]


                    let foundMemberId = false
                    if (memberId.length === 18 || memberId.length === 17) {
                        foundMemberId = true
                    } else if (memberId.length > 18) {
                        memberId = memberId.substring(3)
                        memberId = memberId.slice(0, -1)

       
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
				
                let reason = args[3].slice(' ')
                if(!reason) return message.channel.send('Please specify a reason for this blacklist.')
                try {
                    client.bdd.query('SELECT * FROM user_blacklist WHERE user_id = ?', [member.id], function (err, result) {
                        if (err) throw err
                        if (result.length === 0) {
                            const user = message.member.user.tag
                            const userId = message.member.user.id
                            const guild = message.guild.name
                            const guildId = message.guild.id
                            client.bdd.query('INSERT INTO user_blacklist SET ?', {user_id: member.id, reason: reason, banned_by: user, banning_guild: guild, banning_guild_id: guildId, banned_by_id: userId  })
                            message.channel.send(`The user with the identification number **${member.id}** is now blacklisted for the following reason: **${reason}**`)
                        } else {
                            message.channel.send(`The user with the identification number **${member.id}** is already blacklisted for the following reason: **${result[0].reason}**`)
                        }
                    })

                } catch (err) {
                    console.log(err)
                }
            } else if (args[1] === 'remove') {
                let member = message.mentions.members.first() || client.users.cache.get(args[2]) 
                if (!member) {
                    let memberId = args[2]


                    let foundMemberId = false
                    if (memberId.length === 18 || memberId.length === 17) {
                        foundMemberId = true
                    } else if (memberId.length > 18) {
                        memberId = memberId.substring(3)
                        memberId = memberId.slice(0, -1)

    
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
                    client.bdd.query('SELECT * FROM user_blacklist WHERE user_id = ?', [member.id], function (err, result) {
                        if (err) throw err
                        if (result.length !== 0) {
                            client.bdd.query('DELETE FROM user_blacklist WHERE user_id = ?', [member.id])
                            message.channel.send(`The user with the identification number **${member.id}** was successfully removed from the blacklist..`)
                        } else {
                            message.channel.send(`The user with the identification number **${member.id}** is not blacklisted.`)
                        }
                    })

                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            await message.channel.send('You\'re not part of the staff.')
        }
    }
}

module.exports = new Staff
