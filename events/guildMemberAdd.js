'use strict'

module.exports = async (client, member) => {

    const guild = member.guild

    let author = member
    try {
        const serverRoles = guild.roles.cache
        
        let foundGlobalbanRole = false
        let globalBanRole = null
        serverRoles.forEach(role => {
            if (role.name === 'Globalban Quarantined') {
                foundGlobalbanRole = true
                globalBanRole = role
            }
        })

        if (foundGlobalbanRole !== true) {
            globalBanRole = await guild.roles.create({
                data: {
                    name: 'Globalban Quarantined',
                    color: 'BLACK',
                    permissions: []
                },
                reason: 'The quarantine role for the Globalbans Bot. NEVER CHANGE IT\'S NAME ',
            })
        }

        
        if (globalBanRole !== null) {
            const serverChannels = guild.channels.cache
            serverChannels.forEach(channel => {
                channel.updateOverwrite(globalBanRole, { VIEW_CHANNEL: false })
            })
            client.bdd.query('SELECT * FROM user_blacklist WHERE user_id = ?', [author.id], function (err, result) {
                if (err) throw err
                if (result.length !== 0) {
    
                    client.bdd.query('SELECT * FROM user_quarantine_decision WHERE user_id = ? AND guild_id = ?', [author.id, guild.id], function (err, result) {
                        if (err) throw err
                        if (result.length === 0) {
                            author.roles.add(globalBanRole)
                        } else {
                            if (result[0].banned === true) {
                                author.send(`You've been banned from the server **${guild.name}** because you've been blacklisted by our robot for the following reason: **${result[0].reason}** !`)
                                guild.members.cache.get(author.id).ban({ reason: `GlobalBan Thread Detection | Reason for blacklist : ${result[0].reason}` })
                                    .then(console.log)
                                    .catch(console.error)
                                
                            } 
                            if (result[0].banned === false) {
                                if (author.roles.cache.has(globalBanRole.id)) {
                                    author.roles.remove(globalBanRole)
                                }
                            }
                        }
                    })
                }
            })
        }

    } catch (err) {
        console.log(err)
    }
}