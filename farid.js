const {
    WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	ReconnectMode,
	ProxyAgent,
	ChatModification,
	GroupSettingChange,
	waChatKey,
	mentionedJid,
	processTime,
	Browsers,
} = require("@adiwajshing/baileys")
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
const speed = require('performance-now')
const { spawn, exec, execSync } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const twitterGetUrl = require("twitter-url-direct")
const _gis = require('g-i-s')
const fetch = require('node-fetch');
const request = require('request');
const yts = require( 'yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const axios = require("axios")
const fs = require("fs-extra")
const { promisify, util } = require('util')
const qrcodes = require('qrcode');
const googleIt = require('google-it')
const os = require('os');
const hx = require('hxz-api')

// stickwm
const Exif = require('./lib/exif');
const exif = new Exif();

const { getBuffer, getGroupAdmins, getRandom, runtime, pickRandom, clockString, sleep } = require('./lib/myfunc')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetch')
const { color, bgcolor } = require('./lib/color')
const { mess } = require('./message/mess')
const { Toxic } = require('./lib/Toxic.js')
const { cmdadd } = require('./lib/totalcmd.js')
const { uptotele, uploadFile, RESTfulAPI, uploadImages } = require('./lib/uploadimage')
const { mediafireDl } = require('./lib/mediafire.js')
const { webp2gifFile, igDownloader, TiktokDownloader } = require("./lib/gif.js")
const { y2mateA, y2mateV } = require('./lib/y2mate')
const { jadibot, stopjadibot, listjadibot } = require('./lib/jadibot')
const truth = JSON.parse(fs.readFileSync('./database/truth.json'))
const dare = JSON.parse(fs.readFileSync('./database/dare.json'))
const a = '```'

hit_today = []
public = false
simple = true
banChats = true

let fakeimage = fs.readFileSync("./media/wpmobile.png")
let setting = JSON.parse(fs.readFileSync('./setting.json'))

prefix = setting.prefix
owner = setting.owner

// Database
let welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
let _scommand = JSON.parse(fs.readFileSync('./database/scommand.json'))


// Sticker Cmd
const addCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _scommand.push(obj)
    fs.writeFileSync('./database/scommand.json', JSON.stringify(_scommand))
}
const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'Good Night'
}
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang'
}
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore'
}
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Good Afternoon'
}
        if(time2 < "11:00:00"){
        var ucapanWaktu = 'Good Morning'
}
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Good Evening'
}
const getCommandPosition = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _scommand[position].chats
    }
}


const checkSCommand = (id) => {
    let status = false
    Object.keys(_scommand).forEach((i) => {
        if (_scommand[i].id === id) {
            status = true
        }
    })
    return status
}


module.exports = farid = async (farid, mek) => {
	try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
		if (!mek.message) return
		if (mek.key && mek.key.remoteJid == 'status@broadcast') return
		if (mek.key.id.startsWith('3EB0') && mek.key.id.length === 12) return
		global.blocked
		global.prefix
		mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
		const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
		const tanggal = moment.tz('Asia/Jakarta').format('dddd') + ', ' + moment.tz('Asia/Jakarta').format('LL')
		const waktu = moment.tz('Asia/Jakarta').format('a')
		const time = moment.tz('Asia/Jakarta').format('HH:mm:ss z')
		const content = JSON.stringify(mek.message)
		const from = mek.key.remoteJid
		const type = Object.keys(mek.message)[0]        
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(mek.message[type].fileSha256.toString('base64')) !== null && getCmd(mek.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message[type].fileSha256.toString('base64')) : ""
		budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
		const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		const args = body.trim().split(/ +/).slice(1)
		hit_today.push(command)
		const arg = body.substring(body.indexOf(' ') + 1)
		const ar = args.map((v) => v.toLowerCase())
		const argz = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix) 
		if (isCmd) cmdadd()
		const totalhit = JSON.parse(fs.readFileSync('./database/totalcmd.json'))[0].totalcmd
        const q = args.join(' ')

        const botNumber = farid.user.jid
        const ownerNumber = setting.ownerNumber
		const ownerName = setting.ownerName
		const botName = setting.botName
		const isGroup = from.endsWith('@g.us')
		const sender = mek.key.fromMe ? farid.user.jid : mek.key.remoteJid.endsWith('@g.us') ? mek.participant : mek.key.remoteJid
		const totalchat = await farid.chats.all()
		const groupMetadata = isGroup ? await farid.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupDesc = isGroup ? groupMetadata.desc : ''
		const groupOwner = isGroup ? groupMetadata.owner : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false
        const conts = mek.key.fromMe ? farid.user.jid : farid.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? farid.user.name : conts.notify || conts.vname || conts.name || '-'
        const mentionByTag = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.mentionedJid : []
        const mentionByreply = type == "extendedTextMessage" && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.participant || "" : ""
        const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
        mention != undefined ? mention.push(mentionByreply) : []
        const mentionUser = mention != undefined ? mention.filter(n => n) : []
        const isOwner = ownerNumber.includes(sender)
        const isWelkom = isGroup ? welkom.includes(from) : false
        
     // here button function
        selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId : ''

        responseButton = (type == 'listResponseMessage') ? mek.message.listResponseMessage.title : ''

        const gcount = setting.gcount
        
        const listmsg = (from, title, desc, list) => { // ngeread nya pake rowsId, jadi command nya ga keliatan
            let po = farid.prepareMessageFromContent(from, {"listMessage": {"title": title,"description": desc,"buttonText": "Click Here","listType": "SINGLE_SELECT","sections": list}},{quoted :mek})
            return farid.relayWAMessage(po, {waitForAck: true})
        }
        
   const readmore = "͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏";
    if (prefix && command) cmdadd();
      
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }   
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        const reply = (teks) => {
	      farid.sendMessage(from, teks, text, {quoted:mek, thumbnail: fakeimage})
        }
        const sendMess = (hehe, teks) => {
           farid.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
           (id == null || id == undefined || id == false) ? farid.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('./media/wpmobile.png')}, extendedText, { sendEphemeral: true, contextInfo: { "mentionedJid": memberr } }) : farid.sendMessage(from, {text: teks.trim(), jpegThumbnail: fs.readFileSync('./media/wpmobile.png')}, extendedText, { sendEphemeral: true, quoted: mek, contextInfo: { "mentionedJid": memberr } })
        }
        const sendText = (from, text) => {
           farid.sendMessage(from, text, MessageType.text)
        }
        const textImg = (teks) => {
           return farid.sendMessage(from, teks, text, {quoted: mek, thumbnail: fs.readFileSync('./media/wpmobile.png')})
           }
        const katalog = (teks) => {
        res = farid.prepareMessageFromContent(from,{ "orderMessage": { "itemCount": 321, "message": teks, "footerText": "*_©Farz_*", "thumbnail": fakeimage, "surface": 'CATALOG' }}, {quoted:fgc})
        farid.relayWAMessage(res)
             
        }
        const fgc = {
         key: {"fromMe": false,"participant": "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "62895619083555-1616169743@g.us","inviteCode": "mememteeeekkeke","groupName": "P", "caption": `🍂𝑰𝒕𝒔𝑴𝒆 𝑭 𝑨 𝑹 𝒁🍂\n𝑪𝒐𝒎𝒎𝒂𝒏𝒅 𝑬𝒙𝒆𝒄𝒖𝒕𝒆𝒅 : ${command}`, 'jpegThumbnail': fs.readFileSync('./media/Nakano.jpg')}}}
        const ftroli = {
         key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "16505434800@s.whatsapp.net" } : {})},message: {orderMessage: {itemCount : 2021,status: 1,surface : 1,message: `𝑪𝒓𝒆𝒂𝒕𝒆𝒅 𝑩𝒚メ\n🍂𝑰𝒕𝒔𝑴𝒆 𝑭 𝑨 𝑹 𝒁🍂`,orderTitle: 'Bang',thumbnail: fs.readFileSync('./media/Nakano.jpg'), sellerJid: '0@s.whatsapp.net'}}}
        const freply = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { "contactMessage": { "displayName": `${pushname}`, "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, "jpegThumbnail":fs.readFileSync('./media/Nakano.jpg')
        }}}
       const math = (teks) => {
           return Math.floor(teks)
       }
       const kick = function(from, orangnya){
	       for (let i of orangnya){
	       farid.groupRemove(from, [i])
        }
        }
       const kickMember = async(id, target = []) => {
           let group = await farid.groupMetadata(id)
           let owner = group.owner.replace("c.us", "s.whatsapp.net")
           let me = farid.user.jid
           for (i of target) {
           if (!i.includes(me) && !i.includes(owner)) {
           await farid.groupRemove(from, [i])
        } else {
           await farid.sendMessage(id, "Not Premited!", "conversation")
        }
    }
}
       const add = function(from, orangnya){
	       farid.groupAdd(from, orangnya)
}
      const sendBug = async(target, teks) => {
           if (!teks) teks = '.'
           await farid.relayWAMessage(farid.
           prepareMessageFromContent(target, farid.
           prepareDisappearingMessageSettingContent(0),
           {}),{waitForAck:true})
           farid.sendMessage(target, teks, 'conversation')
}
       const sendKontak = (from, nomor, nama, org = "") => {
	       const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + nama + '\n' + 'ORG:' + org + '\n' + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
	       farid.sendMessage(from, {displayname: nama, vcard: vcard}, MessageType.contact, {quoted: fgc})
}
      const hideTag = async function(from, text){
	       let anu = await farid.groupMetadata(from)
	       let members = anu.participants
	       let ane = []
	       for (let i of members){
	       ane.push(i.jid)
}
	       farid.sendMessage(from, {text:text, jpegThumbnail:fs.readFileSync('media/Nakano.jpg')}, 'extendedTextMessage', {contextInfo: {"mentionedJid": ane}})
}  
       const sendMediaURL = async(to, url, text="", mids=[]) =>{
           if(mids.length > 0){
           text = normalizeMention(to, text, mids)
}
           const fn = Date.now() / 10000;
           const filename = fn.toString()
           let mime = ""
           var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
           mime = res.headers['content-type']
           request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
});
};
           download(url, filename, async function () {
           console.log('done');
           let media = fs.readFileSync(filename)
           let type = mime.split("/")[0]+"Message"
           if(mime === "image/gif"){
           type = MessageType.video
           mime = Mimetype.gif
}
           if(mime.split("/")[0] === "audio"){
           mime = Mimetype.mp4Audio
}
           farid.sendMessage(to, media, type, {quoted: mek, mimetype: mime, caption: text, thumbnail: Buffer.alloc(0), contextInfo: {"mentionedJid": mids}})
                     
           fs.unlinkSync(filename)
});
}
      const sendFileFromUrl = async(link, type, options) => {
           hasil = await getBuffer(link)
	       farid.sendMessage(from, hasil, type, options).catch(e => {
	       fetch(link).then((hasil) => {
	       farid.sendMessage(from, hasil, type, options).catch(e => {
	       farid.sendMessage(from, { url : link }, type, options).catch(e => {
	       reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
	       console.log(e)
})
})
})
})
}
          let authorname = farid.contacts[from] != undefined ? farid.contacts[from].vname || farid.contacts[from].notify : undefined	
          if (authorname != undefined) { } else { authorname = groupName }	
          function addMetadata(packname, author) {	
          if (!packname) packname = 'WABot'; if (!author) author = 'Bot';author = author.replace(/[^a-zA-Z0-9]/g, '');	
          let name = `${author}_${packname}`
          if (fs.existsSync(`./sticker/${name}.exif`)) return `./sticker/${name}.exif`
          const json = {	
         "sticker-pack-name": packname,
         "sticker-pack-publisher": author,
}
         const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
         const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	
         let len = JSON.stringify(json).length	
         let last	
         if (len > 256) {	
         len = len - 256	
         bytes.unshift(0x01)	
         } else {	
         bytes.unshift(0x00)	
}	
         if (len < 16) {	
         last = len.toString(16)	
         last = "0" + len	
         } else {	
         last = len.toString(16)	
}	
       const buf2 = Buffer.from(last, "hex")	
	   const buf3 = Buffer.from(bytes)	
	   const buf4 = Buffer.from(JSON.stringify(json))	
	   const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	
	   fs.writeFile(`./sticker/${name}.exif`, buffer, (err) => {	
	   return `./sticker/${name}.exif`	
})	
}
       function formatDate(n, locale = 'id') {
       let d = new Date(n)
       return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })
    }
       
        colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
		const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

     // Auto Read
        farid.chatRead(from, "read")
         // CMD
        if (isCmd && !isGroup)
            console.log(color('[ CMD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        
        if (isCmd && isGroup)
            console.log(color('[ CMD ]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
            
            if (!mek.key.fromMe && banChats === true) return
            switch(command){
           
           case 'owner':
           case 'creator':
               sendKontak(from, `${owner}`, `${ownerName}`, 'Sibukk!!')
               await sleep(1000)
               txtt =`Hai Kak ${pushname}\nItu Ownerku, Mau tau soal apa ya?`
               buttons = [{buttonId: `${prefix}sourcecode`,buttonText:{displayText: 'SC BOT'},type:1},{buttonId:`${prefix}donasi`,buttonText:{displayText:'DONASI'},type:1}]
               buttonsMessage = { contentText: `${txtt}`, footerText: 'Jangan Sungkan Chat Ya Kak', buttons: buttons, headerType: 1 }
               prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{})
               farid.relayWAMessage(prep)
               break     
///Button Location
const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1
mhan = await farid.prepareMessage(from, kma, location)
const buttonMessages = {
locationMessage: mhan.message.locationMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 6
}
farid.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
} 
           case 'menu':
           case 'help':
           user = `${isOwner ? 'OWNER' : 'User'}`
           thu = await farid.getStatus(`${sender.split('@')[0]}@s.whatsapp.net`, MessageType.text)
           gambur = 'https://telegra.ph/file/6518d2792829eccb363a4.jpg'
          gambir = 'https://telegra.ph/file/6d1d96cbfba9d7c3800cc.jpg'
           gambar = await getBuffer(gambir)           
          if (simple == true) menu =`💌 _Hi_ , @${sender.split('@')[0]}
               
_INFO USER_
◕ _Name :_ ${pushname}
◕ _Bio :_ ${thu.status}
◕ _Status :_ ${isOwner ? 'OWNER' : 'User'}
◕ _Time :_ ${ucapanWaktu} || ${time} 

_Note : Not all features work because i'm newbie_ :)
`
     let gbutsan = [
					{ buttonId: `${prefix}command`, buttonText: { displayText: '⋮☰ MENU' }, type: 1 },
	                                { buttonId:`${prefix}info`, buttonText: { displayText: '✓ Statistic' }, type: 1 }
				]
				let gbuttonan = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: `${menu}`,
					footerText: `© Pikaw-Bot`,
					buttons: gbutsan,
					headerType: 6
				}
				await farid.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 1e7,
						isForwarded: true
					}, quoted: mek
				})
			break
case 'command':
case 'allmenu':
gambur = 'https://telegra.ph/file/2a17b7235b7a83be27591.jpg'
gambor = 'https://telegra.ph/file/935830c945f7550ffbd31.jpg'
           gambar = await getBuffer(gambor)
           menu = `──────────────────── 
_A simple whatsapp bot made with_
_nodejs by_ ${ownerName} ,
_click read more to see features._

 ˏˋ°•*⁀➷
-ˋˏ✄┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
${readmore}
*l*. S T I C K E R  M E N U

  ◕ ${prefix}telesticker
  ◕ ${prefix}attp *teks*
  ◕ ${prefix}nulis *teks*
  ◕ ${prefix}sticker *reply foto*
  ◕ ${prefix}tourl *reply foto*
  ◕ ${prefix}getpp *tag@*
  ◕ ${prefix}toimg *reply sticker*
  ◕ ${prefix}tomp3 
  ◕ ${prefix}tovideo *reply sticker gif*
  
*ll*. D O W N L O A D E R

  ◕ ${prefix}nhdl *query*
  ◕ ${prefix}play *query*
  ◕ ${prefix}igdl *link*
  ◕ ${prefix}igstory *link*
  ◕ ${prefix}tiktokdl *link*
  ◕ ${prefix}mediafire *link*
  ◕ ${prefix}facebook *link*
  ◕ ${prefix}youtubedl *link*

*lll*. S E A R C H  M E N U

  ◕ ${prefix}image *query*
  ◕ ${prefix}google *query*
  ◕ ${prefix}ytsearch *query*
  ◕ ${prefix}pinterest *query*
  ◕ ${prefix}ytdesc *query*
  ◕ ${prefix}ghsearch *query*

*lV*. F U N  M E N U

  ◕ ${prefix}mining
  ◕ ${prefix}waktu
  ◕ ${prefix}cekmati *nama*
  ◕ ${prefix}toxic
  ◕ ${prefix}citacita
  ◕ ${prefix}nilai
  ◕ ${prefix}cekganteng
  ◕ ${prefix}cekcantik
  ◕ ${prefix}cekwatak
  ◕ ${prefix}truth
  ◕ ${prefix}dare
  ◕ ${prefix}jadian
  ◕ ${prefix}cantik
  ◕ ${prefix}ganteng
  ◕ ${prefix}babi
  ◕ ${prefix}beban
  ◕ ${prefix}apakah *teks*
  ◕ ${prefix}bisakah *teks*
  ◕ ${prefix}kapankah *teks*

*V*. G R O U P  M E N U

  ◕ ${prefix}groupsetting
  ◕ ${prefix}group *open/close*
  ◕ ${prefix}listonline
  ◕ ${prefix}infogrup
  ◕ ${prefix}linkgc
  ◕ ${prefix}kick *reply chat*
  ◕ ${prefix}add *add 62*
  ◕ ${prefix}culik *idgroup*
  ◕ ${prefix}kickall
  ◕ ${prefix}leaveall
  ◕ ${prefix}setgrupname *teks*
  ◕ ${prefix}setdesc *teks*
  ◕ ${prefix}setppgrup *foto*
  ◕ ${prefix}tagall
  ◕ ${prefix}hidetag
  ◕ ${prefix}welcome *enable/disable*
  ◕ ${prefix}sider *reply chat bot*
  ◕ ${prefix}delete *reply chat bot*
  ◕ ${prefix}caripesan *pesan|4*

*Vl*. O W N E R  M E N U

  ◕ ${prefix}bc
  ◕ ${prefix}public
  ◕ ${prefix}self
  ◕ ${prefix}join *linkgc*
  ◕ ${prefix}exif
  ◕ ${prefix}term
  ◕ ${prefix}shutdown 
  ◕ ${prefix}leaveall
  ◕ ${prefix}setprefix *setprefix|prefix*
  ◕ ${prefix}cekapikey *query*
  ◕ ${prefix}setcmd *setcmd|command*
  ◕ ${prefix}delcmd *reply sticker*
  ◕ ${prefix}listcmd

*Vll*. S E S S I O N

  ◕ ${prefix}exif 
  ◕ ${prefix}ping
  ◕ ${prefix}runtime
  ◕ ${prefix}donasi
  ◕ ${prefix}sc
  ◕ ${prefix}jadibot
  ◕ ${prefix}stopjadibot
  ◕ ${prefix}listjadibot
  ◕ ${prefix}bugreport *problem*

`
buttons = [
					{ buttonId: `${prefix}rules`, buttonText: { displayText: 'RULES' }, type: 1 },
	                                { buttonId:`${prefix}owner`, buttonText: { displayText: 'OWNER' }, type: 1 }
				]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: `${menu}`,
					footerText: `© Pikaw-Bot`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break
case 'owner1':
gambur = 'https://telegra.ph/file/752f43ab8dd86b2df353e.jpg'
           gambar = await getBuffer(gambur)
menu = `
*INFO OWNER*

*Nama* : _Farid Rahman Fauzi_
*Umur* : _19 y.o_
*Status* : _Private_
*Pacar* : _10:v_

*INSTAGRAM*
https://instagram.com/faaaarr__

*CONTACT*
wa.me/6285692949920

*GITHUB*
https://github.com/Faridrfauzi/Pikawbotv2
`
buttons = [
					{ buttonId: `${prefix}farid`, buttonText: { displayText: 'NUMBER' }, type: 1 },
	                  { buttonId: `${prefix}infoig`, buttonText: { displayText: 'INSTAGRAM' }, type: 1 }              
				]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: `${menu}`,
					footerText: `Bot WhatsApp\n${ucapanWaktu} || ${time}`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break

farid.sendMessage(from,menu,text, {quoted: fgc, contextInfo: { mentionedJid: [sender],externalAdReply: { "title": `${ucapanWaktu} Kak ${pushname}`, mediaType: 2, "thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`, "mediaUrl": `https://youtu.be/E4_s-UlA7BEh`}}})
             break
case 'sendloc':
           namanya = `Pikaw 𝐵𝑜𝑡`
               captionnya = `Hallo Kak ${pushname}`
               farid.sendMessage(from, {"name": `${namanya}`, "address": `${captionnya}`, "jpegThumbnail": fs.readFileSync('media/Nakano.jpg')}, location, {quoted: fgc, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl":"https://telegra.ph/file/8c6e353c15532fe5e5746.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
               break
case 'tes':
        farid.sendMessage(from, ` *BOT ONLINE* `, text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}\n${ucapanWaktu}\n${time2}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted:fgc,quoted: fgc})
               break
case 'rules':
      case 'rulesbot':
             farid.sendMessage(from, `🌹 *Syarat & Ketentuan* 🌹\n1. Teks dan nama pengguna WhatsApp anda kami simpan di dalam server selama bot aktif.\n2. Data anda akan di hapus ketika bot offline.\n3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim.\n4. Kami tidak pernah meminta anda untuk memberikan informasi pribadi.\n5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot.\n6. Cukup perintah 1x jika bot tidak merespon harap ulangi kembali, Jika di ulangi kembali tidak merespon, Bot tidak aktif\n7. Dilarang spam, Share virus virtex, Telpon, Video call, Kami akan blockir anda.\n8. Apapun yang anda perintah pada bot ini, *KAMI TIDAK BERTANGGUNG JAWAB!*\n\nOwner  BOTZ:\nwa.me/6285692949920\n\nTERIMA KASIH !~`, text, {quoted: fgc, contextInfo: { mentionedJid: [sender],externalAdReply: { "title": `${ucapanWaktu} Kak ${pushname}👋🏻`, mediaType: 2, "thumbnailUrl": `https://telegra.ph/file/5f03f464c45c2149fa439.jpg`, "mediaUrl": `https://youtu.be/E4_s-UlA7BEh`}}})
             break
case 'info':
case 'stat':
case 'botstat':
           case 'infobot':           
           ram2 = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
           gambur = 'https://telegra.ph/file/27e6c316a47f5425c23a3.jpg'
           gambar = await getBuffer(gambur)
           menu =`
*INFO BOT*           
_Creator :_ @${ownerName}
_Hit Today_ : _*${totalhit} Hit*_
_Type_ : _*NodeJs*_
_Lib_ : _*Baileys*_
_Prefix :_ *[ . ]*
_Mode :_ _*${banChats ? "SELF-MODE" : "PUBLIC-MODE"}*_
_Baterai_ : _*${baterai}%*_
_Platform_ : _*${os.platform()}*_
_Ram Usage_ : _*${ram2}*_
_Hostname_ : _*${os.hostname()}*_
_Wa Version_ : _${farid.user.phone.wa_version}_
_Os Version_ : _*${farid.user.phone.os_version}*_
_Device Manufacturer_ : _*${farid.user.phone.device_manufacturer}*_
_Device Model_ : _*(${farid.user.phone.device_model}*_
_Os Build Number_ : _*${farid.user.phone.os_build_number}*_
_Runtime :_ _*${clockString(process.uptime())}*_
_Tanggal :_ _*${tanggal}*_
_Waktu :_ _*${waktu.charAt(0).toUpperCase() + waktu.slice(1)} || ${time}*_

`
       farid.sendMessage(from,menu,text, {quoted: fgc, contextInfo: { mentionedJid: [sender],externalAdReply: { "title": `${ucapanWaktu} Kak ${pushname}`, mediaType: 2, "thumbnailUrl": `https://telegra.ph/file/935830c945f7550ffbd31.jpg`, "mediaUrl": `https://youtu.be/E4_s-UlA7BEh`}}})
             break
case 'grupsetting':
        case 'groupsetting':
               if (!isGroup) return reply(mess.only.group)
               if (!isGroupAdmins) return farid.sendMessage(from,(mess.only.admin), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/97d677a6b6ddb71a55043.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
               list = []
               com = [`group enable`,`welcome enable`,`antilink enable`]
               comm = [`group disable`,`welcome disable`,`antilink disable`]
               listnya = [`Group open/close`,`Welcome enable/disable`,`Antilink enable/disable`,]
               suruh = [`Enable`, `Disable`]
               fiturname = [`Group`,`Welcome`,`Antilink`]
               startnum = 0; let startnu = 0; let startn = 0;let start = 0
               startnumm = 1
               for (let x of com) {
               var yy = {title: `${listnya[startnum++]}`,
                    rows: [
                       {
                        title: `${suruh[0]}`,
                        description: `\nMengaktifkan ${fiturname[startnu++]}`,
                        rowId: `${prefix}${x}`
                      },{
                        title: `${suruh[1]}`,
                        description: `\nMenonaktifkan ${fiturname[startn++]}`,
                        rowId: `${prefix}${comm[start++]}`
                      }
                    ]
                   }
                        list.push(yy)
           }
             listmsg(from, `Group Setting`, `Atur Settingan Grup anda disini......`, list)
             break
case 'group':
      case 'grup':
             if (!isGroup) return reply(mess.only.group)
             if (!isGroupAdmins) return reply(mess.only.admin)
             if (!isBotGroupAdmins) return reply(mess.only.Badmin)
             if (args.length < 1) return reply('!group enable/disable')
             if (args[0].toLowerCase() === 'enable'){
             farid.groupSettingChange(from, "announcement", false)
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)))
             } else if (args[0].toLowerCase() === 'disable'){
             farid.groupSettingChange(from, "announcement", true)
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)))
             } else if (args[0].toLowerCase() === 'close'){
             farid.groupSettingChange(from, "announcement", true)
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)))
             } else if (args[0].toLowerCase() === 'open'){
             farid.groupSettingChange(from, "announcement", false)
            .then((res) => reply(jsonformat(res)))
            .catch((err) => reply(jsonformat(err)))
             } else {
             reply(`Pilih enable atau disable`)
}
             break
case 'bc':
     case 'broadcast':
             if (!isOwner) return  reply(mess.only.owner)
             if (args.length < 1) return reply('teks?')
             jas = `https://telegra.ph/file/61ee913c8c93e9dedc794.jpg`
              gambar = await getBuffer(jas)
             anu = await farid.chats.all()
             if (isMedia && !mek.message.videoMessage || isQuotedImage) {
             const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
             bc = await farid.downloadMediaMessage(encmedia)
             for (let _ of anu) {
             farid.sendMessage(_.jid, bc, image, {quoted:freply,caption: `*「 PESAN SIARAN BOT 」*\n\n${body.slice(4)}`})
}
             reply('Suksess broadcast')
             } else {
             for (let _ of anu) {
             	buttons = [
					{ buttonId: `${prefix}p`, buttonText: { displayText: 'Siap Bwang 🐣' }, type: 1 }, 
				]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: `*「 PESAN SIARAN BOT」*\n\n${body.slice(4)}`,
					footerText: `© Pikaw-Bot`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(_.jid, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
             }
             reply('Suksess broadcast')
}
             break
//===========Update Funmenu=======

case 'mining':       
              var mining = randomNomor(1000)
              atm.addKoinUser(sender, mining, _uang)
              await reply(`*Selamat Kamu Mendapatkan*: _Rp ${mining} 💰_`)
              break
       case 'waktu':       
              reply(`Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
              break
       case 'cekmati':      
              if (!q) return reply(mess.wrongFormat)
              predea = await axios.get(`https://api.agify.io/?name=${q}`)
              reply(`Nama : ${predea.data.name}\n*Mati Pada Umur :* ${predea.data.age} Tahun.\n\n_Cepet Cepet Tobat Bro Soalnya Mati ga ada yang tau_`)
              break
       
       case 'toxic':        
              Toxic().then(toxic => {
              reply (toxic)
})
              break
        case 'citacita':        
              const cita =['http://piyobot.000webhostapp.com/citacita1.mp3','http://piyobot.000webhostapp.com/citacita2.mp3','http://piyobot.000webhostapp.com/citacita3.mp3','http://piyobot.000webhostapp.com/citacita4.mp3','http://piyobot.000webhostapp.com/citacita5.mp3','http://piyobot.000webhostapp.com/citacita6.mp3','http://piyobot.000webhostapp.com/citacita7.mp3','http://piyobot.000webhostapp.com/citacita8.mp3','http://piyobot.000webhostapp.com/citacita9.mp3','http://piyobot.000webhostapp.com/citacita10.mp3','http://piyobot.000webhostapp.com/citacita11.mp3','http://piyobot.000webhostapp.com/citacita12.mp3','http://piyobot.000webhostapp.com/citacita13.mp3','http://piyobot.000webhostapp.com/citacita14.mp3','http://piyobot.000webhostapp.com/citacita15.mp3','http://piyobot.000webhostapp.com/citacita16.mp3','http://piyobot.000webhostapp.com/citacita17.mp3','http://piyobot.000webhostapp.com/citacita18.mp3','http://piyobot.000webhostapp.com/citacita19.mp3','http://piyobot.000webhostapp.com/citacita20.mp3','http://piyobot.000webhostapp.com/citacita21.mp3','http://piyobot.000webhostapp.com/citacita22.mp3','http://piyobot.000webhostapp.com/citacita23.mp3','http://piyobot.000webhostapp.com/citacita24.mp3','http://piyobot.000webhostapp.com/citacita25.mp3','http://piyobot.000webhostapp.com/citacita26.mp3','http://piyobot.000webhostapp.com/citacita27.mp3','http://piyobot.000webhostapp.com/citacita28.mp3','http://piyobot.000webhostapp.com/citacita29.mp3','http://piyobot.000webhostapp.com/citacita30.mp3','http://piyobot.000webhostapp.com/citacita31.mp3','http://piyobot.000webhostapp.com/citacita32.mp3','http://piyobot.000webhostapp.com/citacita33.mp3','http://piyobot.000webhostapp.com/citacita34.mp3','http://piyobot.000webhostapp.com/citacita35.mp3']
              const cita3 = cita[Math.floor(Math.random() * cita.length)]
              cita2 = await getBuffer(cita3)
              farid.sendMessage(from, cita2, audio,{mimetype: 'audio/mp4', ptt:true, quoted: fgc})
              break
       case 'apakah':       
              apakah = body.slice(1)
              const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
              const kah = apa[Math.floor(Math.random() * apa.length)]
              farid.sendMessage(from, '*Pertanyaan :* '+apakah+'\n*Jawaban :* '+ kah, text, { quoted: fgc })
              break
case 'rate':
       case 'nilai':       
       farid.updatePresence(from, Presence.composing)
              try {
              profil = await farid.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
              } catch {
              profil = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
              rate = body.slice(1)
              const ra =['0','4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
              const te = ra[Math.floor(Math.random() * ra.length)]
              buttons = [
					{ buttonId: `${prefix}rate`, buttonText: { displayText: 'Rate' }, type: 1 },                 
				
]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: ` *Question :* rate\n\n*Jawaban :* ${te}%`,
					footerText: `© Pikaw-Bot`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break
              
       case 'gantengcek':
       case 'cekganteng':       
       farid.updatePresence(from, Presence.composing)
              try {
              profil = await farid.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
              } catch {
              profil = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
              gambar = await getBuffer(profil)
              ganteng = body.slice(1)
              const gan =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
              const teng = gan[Math.floor(Math.random() * gan.length)]
              buttons = [
					{ buttonId: `${prefix}cekganteng`, buttonText: { displayText: 'Cek Ganteng' }, type: 1 },                 
				
]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: ` *Question :* Cekganteng\n\n*Jawaban :* ${teng}%`,
					footerText: `© Pikaw-Bot`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break
       case 'cantikcek':
       case 'cekcantik':       
       farid.updatePresence(from, Presence.composing)
              try {
              profil = await farid.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
              } catch {
              profil = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
              gambar = await getBuffer(profil)
              cantik = body.slice(1)
              const can =['10','30','20','40','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
              const tik = can[Math.floor(Math.random() * can.length)]
              buttons = [
					{ buttonId: `${prefix}cekcantik`, buttonText: { displayText: 'Cek Cantik' }, type: 1 },                 
				
]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: ` *Question :* Cekcantik\n\n*Jawaban :* ${tik}%`,
					footerText: `© Pikaw-Bot `,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break
       case 'cekwatak':       
       farid.updatePresence(from, Presence.composing)
              try {
              profil = await farid.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
              } catch {
              profil = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
              gambar = await getBuffer(profil)
              var namao = pushname
              var prfx = await farid.getProfilePicture(sender)
              const watak = ['top deh pokoknya','penyayang','pemurah','Pemarah','Pemaaf','Penurut','Baik','baperan','Baik-Hati','penyabar','UwU','Suka Membantu']
              const wtk = watak[Math.floor(Math.random() * (watak.length))]
              const ratenyaasu = ['100%','95%','90%','85%','80%','75%','70%','65%','60%','55%','50%','45%','40%','35%','30%','25%','20%','15%','10%','5%']
              const akhlak = ratenyaasu[Math.floor(Math.random() * (ratenyaasu.length))]
              const sifat = ['Penolong','Suka Membantu','Saling Menolong','Perhatian','Ngak Cuek','Romantis','Dermawan','Cool','Peduli Kepada Sesama','Suka Berkata Kasar']
              const sft = sifat[Math.floor(Math.random() * (sifat.length))]
              const hobby = ['Memasak','Membantu Atok','Mabar','Nobar','Coli','Colmek','Sosmedtan','Membantu Orang lain','Nonton Anime','Nonton Drakor','Naik Motor','Nyanyi','Menari','Bertumbuk','Menggambar','Foto fotoan Ga jelas','Maen Game','Berbicara Sendiri']
              const hby = hobby[Math.floor(Math.random() * (hobby.length))]
              const kelebihan = ['Soleh dan Soleha','Pintar','Rajin','Teladan']
              const klbh = kelebihan[Math.floor(Math.random() * (kelebihan.length))]
              const tipe = ['cool','idaman','Alami','Keren','Ideal','Dia Bamget','normal','elite','epic','Legend']
              const typo = tipe[Math.floor(Math.random() * (tipe.length))]
              buttons = [
					{ buttonId: `${prefix}cekwatak`, buttonText: { displayText: 'Cek Watak' }, type: 1 },                 
				
]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: gambar
					},
					contentText: ` *[ INTROGASI SUKSES ]*\n\n*Nama :* ${namao}\n\n*Watak :* ${wtk}\n\n*Akhlak✨ :* ${akhlak}\n\n*Sifat :* ${sft}\n\n*Hobby :* ${hby}\n\n*Tipe :* ${typo}\n\n*Kelebihan :* ${klbh}\n\n*Note*\n_ini hanya main main_`,
					footerText: `© Pikaw-Bot`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break
       
       case 'hobby':       
              hobby = body.slice(1)
              const by = hobby[Math.floor(Math.random() * hobby.length)]
              farid.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: fgc })
              break
       case 'bisakah':       
              bisakah = body.slice(1)
              const bisa =['Bisa','Tidak Bisa','Coba Ulangi','MANA GW TAU']
              const keh = bisa[Math.floor(Math.random() * bisa.length)]
              farid.sendMessage(from, '*Pertanyaan :* '+bisakah+'\n*Jawaban :* '+ keh, text, { quoted: fgc })
              break
       case 'kapankah':       
              kapankah = body.slice(1)
              const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi']
              const koh = kapan[Math.floor(Math.random() * kapan.length)]
              farid.sendMessage(from, '*Pertanyaan :* '+kapankah+'\n*Jawaban :* '+ koh, text, { quoted: fgc })
              break
       case 'truth':       
              const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
              const ttrth = trut[Math.floor(Math.random() * trut.length)]
              truteh = await getBuffer(`https://telegra.ph/file/3c76003bb6d72139cc013.jpg`)
              buttons = [
					{ buttonId: `${prefix}truth`, buttonText: { displayText: 'Truth' }, type: 1 }, { buttonId: `${prefix}dare`, buttonText: { displayText: 'Dare' }, type: 1 },                           
				]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: truteh
					},
					contentText: `*Question Truth :*\n\n${ttrth}`,
					footerText: `Pilih dibawah untuk bermain lagi`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break
              
       case 'dare':       
              const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "??💨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
              const der = dare[Math.floor(Math.random() * dare.length)]
              buffer = await getBuffer(`https://telegra.ph/file/3c76003bb6d72139cc013.jpg`)
             buttons = [
					{ buttonId: `${prefix}dare`, buttonText: { displayText: 'Dare' }, type: 1 }, { buttonId: `${prefix}truth`, buttonText: { displayText: 'Truth' }, type: 1 },                                   
				]
				buttons = {
					locationMessage: {
						degressLongitude: 0,
						degressLatitude: 1,
						address: 'a',
						jpegThumbnail: buffer
					},
					contentText: `*Challenge Dare :*\n\n${der}`,
					footerText: `Pilih dibawah untuk bermain lagi`,
					buttons: buttons,
					headerType: 6
				}
				await farid.sendMessage(from, buttons, MessageType.buttonsMessage, {
					contextInfo: {
						externalAdReply: {},
						mentionedJid: [sender],
						forwardingScore: 777,
						isForwarded: true
					}, quoted: mek
				})
			break
 
         case 'jadian':      
              jds = []
              jdii = groupMembers
              koss = groupMembers
              akuu = jdii[Math.floor(Math.random() * jdii.length)]
              diaa = koss[Math.floor(Math.random() * koss.length)]
              teks = `Ciee.. yang lagi jadian @${akuu.jid.split('@')[0]}  (♥️ ) @${diaa.jid.split('@')[0]} `
              jds.push(akuu.jid)
              jds.push(diaa.jid)
              mentions(teks, jds, true)
              break
       case 'cantik':       
              membr = []
              const mes = groupMembers
              const msk = groupMembers
              const siaps = mes[Math.floor(Math.random() * mes.length)]
              const sips = pushname[Math.floor(Math.random() * msk.length)]
              teks = `*Yang Paling Cantik Disini Adalah :* @${siaps.jid.split('@')[0]}`
              membr.push(siaps.jid)
              mentions(teks, membr, true)
              break
       case 'ganteng':       
              membr = []
              const nus = groupMembers
              const msl = groupMembers
              const siapss = nus[Math.floor(Math.random() * nus.length)]
              const sipss = pushname[Math.floor(Math.random() * msl.length)]
              teks = `*Masih Gantengan Owner Gua :* @${siapss.jid.split('@')[0]}`
              membr.push(siapss.jid)
              mentions(teks, membr, true)
              break
       case 'babi':       
              membr = []
              const meg = groupMembers
              const mge = groupMembers
              const ba = meg[Math.floor(Math.random() * meg.length)]
              const bi = pushname[Math.floor(Math.random() * mge.length)]
              teks = `*Yang Paling Babi Disini Adalah :* @${ba.jid.split('@')[0]}`
              membr.push(ba.jid)
              mentions(teks, membr, true)
              break
       case 'beban':       
              membr = []
              const nge = groupMembers
              const tod = groupMembers
              const beb = nge[Math.floor(Math.random() * nge.length)]
              const an = pushname[Math.floor(Math.random() * tod.length)]
              teks = `*Yang Paling Beban Disini Adalah :* @${beb.jid.split('@')[0]}`
              membr.push(beb.jid)
              mentions(teks, membr, true)
              break
//==============UPDATE FITUR============
case 'setmenu':
if (!isOwner) return farid.sendMessage(from,(mess.only.owner), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
if (args[0]=== 'ori'){
    simple = true
farid.sendMessage(from,(` *SUCCESS* `), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
} else if (args[0]=== 'simple'){
	farid.sendMessage(from,(` *SUCCESS* `), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
} else {
	farid.sendMessage(from,(` *ORI / SIMPLE* `), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
}
break
case 'linkgc':
case 'linkgrup':
case 'linkgrop':
case 'linkgroup':
if (!isGroup) return farid.sendMessage(from,(mess.only.group), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/27a27acdf6e4ab64bcb7f.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
if (!isBotGroupAdmins) return farid.sendMessage(from,(mess.only.Badmin), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/27a27acdf6e4ab64bcb7f.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
linkgc = await farid.groupInviteCode(from)
yeh = `\`\`\`「 Link Group 」\`\`\`\n•> Group Whatsapp :\nhttps://chat.whatsapp.com/${linkgc}\n\n_yo bisa yo ramein_`
farid.sendMessage(from, yeh, text, { quoted: fgc })
break
case 'infogrup':
       case 'infogroup':
       case 'grupinfo':
       case 'groupinfo':       
              if (!isGroup) return reply(mess.only.group)
              try {
              var pic = await farid.getProfilePicture(from)
              } catch {
              var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
}
              let ingfo = `*🌹G R O U P I N F O🌹*\n\n*Name :* ${groupName}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelkom ? 'Aktif' : 'Mati'}\n*Desc :* \n${groupMetadata.desc}`
              farid.sendMessage(from, await getBuffer(pic), image, {quoted: fgc, caption: ingfo, contextInfo: {"mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')]}})
              break
case 'online':
       case 'listonline':
       case 'here':                
             if (!isGroup) return reply(`Only group`)
             try {
             let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
             let online = [...Object.keys(farid.chats.get(ido).presences), farid.user.jid]
             farid.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, { quoted: fgc, contextInfo: { mentionedJid: online }})
             } catch (e) {
             reply(`${e}`)
}
             break
case 'setgrupname':
       if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return 
              if (args.length == 0) return reply(`Penggunaan ${prefix}setgrupname name`)
              farid.groupUpdateSubject(from, q)
             .then((res) => reply(jsonformat(res)))
             .catch((err) => reply(jsonformat(err)))
              break
       case 'setdesc':
       if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (args.length == 0)  return reply(`Penggunaan ${prefix}setdesc desc`)
              farid.groupUpdateDescription(from, q)
             .then((res) => reply(jsonformat(res)))
             .catch((err) => reply(jsonformat(err)))
              break
       case 'setppgrup':
       if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (isQuotedImage) {
              let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
              let media = await farid.downloadMediaMessage(encmedia)
              farid.updateProfilePicture(from, media)
             .then((res) => reply(jsonformat(res)))
             .catch((err) => reply(jsonformat(err)))
              } else {
              reply(`Kirim atau tag gambar dengan caption ${prefix}setppgrup`)
}
              break
case 'caripesan':  //by ANU TEAM
             if (args.length < 1) return reply(`Pesan Yang Mau Dicari Apaan?\nContoh : ${prefix + command} halo|10`)
             teks = arg
             if (teks.includes("|")) { 
             try {
             var ve = teks.split("|")[0]
             var za = teks.split("|")[1]
             sampai = `${za}`
             if (isNaN(sampai)) return reply('Harus berupa Angka!')
             batas = parseInt(sampai) + 1
             if (batas > 30) return reply('Maks 30!')
             reply(mess.wait)
             cok = await farid.searchMessages(`${ve}`, from, batas,1) 
             if (cok.messages.length < 2) return reply('Tidak Ditemukan Pesan') 
             if (cok.messages.length < parseInt(batas)) reply(`Hanya Ditemukan ${cok.messages.length - 1} Pesan`)
             for (i=1;i < cok.messages.length;i++) {
             if (cok.messages[i].message) {
             farid.sendMessage(from, `Ditemukan!`, text, {sendEphemeral: true, quoted: cok.messages[i]}) 
}
}
             } catch (e) {
             return reply(String(e))
}
             } else {
             reply(`Format salah tod, ini contoh format yang benar : ${prefix + command} halo|10`)
}
             break
case 'd':
        case 'del':
        case 'delete': // MR.CYSER        
               try {
               if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return farid.sendMessage(from,('Reply chat bot'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/37c7044dcdf0e98a9996b.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
               farid.deleteMessage(from, {id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true})
               } catch (e){
               farid.sendMessage(from,('Reply chat bot'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/27a27acdf6e4ab64bcb7f.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
}
               break
case 'sider':      
             if(!isGroup) return reply(mess.only.group)
             try {
             infom = await farid.messageInfo(from, mek.message.extendedTextMessage.contextInfo.stanzaId)
             tagg = []
             teks = `*• Dibaca oleh:*\n\n`
             for(let i of infom.reads){
             teks += '@' + i.jid.split('@')[0] + '\n'
             teks += `> ` + moment(`${i.t}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') + '\n\n'
             tagg.push(i.jid)
}
             teks += `*• Tersampaikan pada:*\n\n`
             for(let i of infom.deliveries){
             teks += '@' + i.jid.split('@')[0] + '\n'
             teks += `> ` + moment(`${i.t}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') + '\n\n'
             tagg.push(i.jid)
}
             mentions(teks, tagg, true)
             } catch (e) {
             console.log(color(e))
             farid.sendMessage(from,('Reply chat bot!'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/db58483366c6a3b9c1110.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
}
             break
case 'bugreport':
              if (args.length < 1) return reply(`Ketik ${prefix}bugreport [fiturnya] [Error Nya Gimana]`) 
              teks = args.join(' ')
              reply('Terima Kasih Telah Melaporkan Bug Pada Owner, Jika Itu Sekedar Iseng Maka Akan Di Ban Oleh Bot!')
              farid.sendMessage('6285692949920@s.whatsapp.net',`*Bug Report:* ${teks}`, text)
              break
//------------------< Sticker Cmd >-------------------
           case 'addcmd': 
           case 'setcmd':
           if (!isOwner) return  reply(mess.only.owner)
              if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${command} cmdnya dan tag stickernya`)
              var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              addCmd(kodenya, q)
              textImg("Done!")
              } else {
              reply('tag stickenya')
}
              break
       case 'delcmd':
       if (!isOwner) return  reply(mess.only.owner)
              if (!isQuotedSticker) return reply(`Penggunaan : ${command} tagsticker`)
              var kodenya = mek.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
             _scommand.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./database/scommand.json', JSON.stringify(_scommand))
              textImg("Done!")
              break
       case 'listcmd':
       if (!isOwner) return  reply(mess.only.owner)
              let teksnyee = `\`\`\`「 LIST STICKER CMD 」\`\`\``
              let cemde = [];
              for (let i of _scommand) {
              cemde.push(i.id)
              teksnyee += `\n\n➸ *ID :* ${i.id}\n➸ *Cmd* : ${i.chats}`
}
              mentions(teksnyee, cemde, true)
              break
//------------------< Public/Self >-------------------
    
    case 'public':
        if (!mek.key.fromMe && !isOwner) return 
          if (banChats === false) return 
              banChats = false
            farid.sendMessage(from,(`Success Activated Mode Public`), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/acbf22a3a6d9a11801421.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              break
	      case 'self':
	if (!mek.key.fromMe && !isOwner) return 
    if (banChats === true) return
        	  uptime = process.uptime()
        	  banChats = true
             farid.sendMessage(from,(`Success Activated Mode Self`), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/acbf22a3a6d9a11801421.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              break
//------------------< Downloader/Search/Anime >-------------------
          case 'igdl':
          case 'instagram':
              try {
              if (!isUrl(q)) return reply('Linknya?')
              res = await axios.get(`https://api.lolhuman.xyz/api/instagram2?apikey=${setting.lolkey}&url=${args[0]}`)
              data = res.data.result
              for (let i = 0; i < data.media.length; i++) {
              sendMediaURL(from, data.media[i], data.caption, {thumbnail: Buffer.alloc(0)})
}
              } catch (e) {
              console.log(e)
              reply(String(e))
}
              break
          case 'igstory': 
              if(!q) return reply('Usernamenya?')
              hx.igstory(q)
             .then(async result => {
              for(let i of result.medias){
              if(i.url.includes('mp4')){
              let link = await getBuffer(i.url)
              farid.sendMessage(from,link,video,{quoted: mek,caption: `Type : ${i.type}`})
              } else {
              let link = await getBuffer(i.url)
              farid.sendMessage(from,link,image,{quoted: fgc,caption: `Type : ${i.type}`})                  
}
}
});
              break
          case 'ghsearch': 
          case 'githubsearch': 
          case 'searchgithub':
              if (!q) return reply('Cari apa?')
              res = await fetch('https://api.github.com/search/repositories?q='+q)
              json = await res.json()
              if (res.status !== 200) throw json
              str = json.items.map((repo, index) => {
              return `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_Dibuat pada *${formatDate(repo.created_at)}*_
_Terakhir update pada *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} Issue${repo.description ? `
*Deskripsi:*\n${repo.description}` : ''}
*Clone:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim()
}).join('\n\n')
              reply(str)
              break
          case 'image':
          case 'gimage':
          case 'googleimage':
              if (args.length < 1) return farid.sendMessage(from,('Apa Yang Mau Dicari?'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              reply(mess.wait)
              teks = args.join(' ')
              res = await _gis(teks, google)
              function google(error, result){
              if (error){ return reply('_[ ! ] Error Terjari Kesalahan Atau Hasil Tidak Ditemukan_')}
              else {
              gugIm = result
              random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
              sendFileFromUrl(random, image, {quoted: fgc, caption: `*Hasil Pencarian Dari :* ${teks}`})
}
}
              break
          case 'youtubedl':
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateA(teks).catch(e => {
              reply('_[ ! ] Error Gagal Dalam Memasuki Web Y2mate_')
})
              result = `*Youtube Downloader*
             
📜 Title : ${res[0].judul}
🎁 Type : mp3/mp4
🚀 Durasi : ${res[0].size}`
              buttons = [{buttonId: `${prefix}buttons2 ${q}`,buttonText:{displayText: `▶️ Video`},type:1},{buttonId:`${prefix}buttons1 ${q}`,buttonText:{displayText:'🎵 Audio'},type:1}]
              fs.writeFileSync(`./ytmp.jpeg`, await getBuffer(res[0].thumb))
              imageMsg = ( await farid.prepareMessage(from, fs.readFileSync(`./ytmp.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Pilih satu format di bawah ini', imageMessage: imageMsg,
              contentText:`${result}`,buttons,headerType:4}
              prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              farid.relayWAMessage(prep)
              fs.unlinkSync(`./ytmp.jpeg`)
              break
          case 'tiktokdl':
              if (!q) return reply('Linknya?')
              if (!q.includes('tiktok')) return reply(mess.error.Iv)
              data = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${setting.lolkey}&url=${q}`)
              result = `⚜️ *Nickname*: ${data.result.author.nickname}\n❤️ *Like*: ${data.result.statistic.diggCount}\n💬 *Komentar*: ${data.result.statistic.commentCount}\n🔁 *Share*: ${data.result.statistic.shareCount}\n🎞️ *Views*: ${data.result.statistic.playCount}\n📑 *Desc*: ${data.result.title}`
              buttons = [{buttonId: `${prefix}buttons3 ${q}`,buttonText:{displayText: `▶️ Video`},type:1},{buttonId:`${prefix}buttons4 ${q}`,buttonText:{displayText:'🎵 Audio'},type:1}]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(data.result.thumbnail))
              imageMsg = ( await farid.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Pilih satu format di bawah ini', imageMessage: imageMsg,
              contentText:`${result}`,buttons,headerType:4}
              prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              farid.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break
          case 'nhentaipdf':
          case 'nhdl':
              if (!q) return reply('kodenya?')
              reply('Please wait, data is being processed')
              get_result = await fetchJson(`https://api.lolhuman.xyz/api/nhentai/${q}?apikey=${setting.lolkey}`)
              ini_image = await getBuffer(get_result.result.image[0])
              data = await fetchJson(`https://api.lolhuman.xyz/api/nhentaipdf/${q}?apikey=${setting.lolkey}`)
              pdf = await getBuffer(data.result)
              farid.sendMessage(from, pdf, document, { quoted: mek, mimetype: Mimetype.pdf, filename: `${get_result.result.title_romaji}.pdf`, thumbnail: ini_image })
              break
          case 'buttons1':
              await axios.get(`https://api.zeks.xyz/api/ytplaymp3/2?apikey=Nyarlathotep&q=${q}`)
		     .then(res => {
			  farid.sendMessage(from, { url: res.data.result.link }, 'audioMessage', { mimetype: 'audio/mp4', quoted: mek, contextInfo: { externalAdReply: { title: res.data.result.title, mediaType: 2, thumbnailUrl: res.data.result.thumb, mediaUrl: res.data.result.source }}})
})
              break
          case 'buttons2':
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateV(teks)
              sendFileFromUrl(res[0].link, video, {quoted: mek, mimetype: 'video/mp4', filename: res[0].output})
              break
          case 'buttons3': 
              if (!q) return reply('Linknya?')
              if (!q.includes('tiktok')) return reply(mess.error.Iv)
              data = await fetchJson(`https://api.lolhuman.xyz/api/tiktok?apikey=${setting.lolkey}&url=${q}`)
              ini_video = await getBuffer(data.result.link)
              farid.sendMessage(from, ini_video, video, { quoted: mek })
              break
          case 'buttons4': 
              if (!q) return reply('Linknya?')
              if (!q.includes('tiktok')) return reply(mess.error.Iv)
              data = await getBuffer(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=${setting.lolkey}&url=${args[0]}`)
              farid.sendMessage(from, data, audio, { quoted: mek })
              break
          case 'buttons5':
              const mathdare = dare[Math.floor(Math.random() * (dare.length))]
              result = `${mathdare}`
              buttons = [{buttonId: `${prefix}buttons6`,buttonText:{displayText: 'Truth'},type:1},{buttonId:`${prefix}buttons5`,buttonText:{displayText:'Dare'},type:1},{buttonId:`${prefix}tod`,buttonText:{displayText:'Tod'},type:1}]
              buttonsMessage = { contentText: `${result}`, footerText: 'Kebenaran atau tantangan?', buttons: buttons, headerType: 1 }
              prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{})
              farid.relayWAMessage(prep)
              break
          case 'buttons6':
              const randomtruth = truth[Math.floor(Math.random() * truth.length)]
              result = `${randomtruth}`
              buttons = [{buttonId: `${prefix}buttons6`,buttonText:{displayText: 'Truth'},type:1},{buttonId:`${prefix}buttons5`,buttonText:{displayText:'Dare'},type:1},{buttonId:`${prefix}tod`,buttonText:{displayText:'Tod'},type:1}]
              buttonsMessage = { contentText: `${result}`, footerText: 'Kebenaran atau tantangan?', buttons: buttons, headerType: 1 }
              prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{})
              farid.relayWAMessage(prep)
              break
          case 'tod':
              result =`*Truth Or Dare*\nPemain diberi pilihan antara menjawab pertanyaan dengan jujur, atau melakukan tantangan yang diberikan`
              buttons = [{buttonId: `${prefix}buttons6`,buttonText:{displayText: 'Truth'},type:1},{buttonId:`${prefix}buttons5`,buttonText:{displayText:'Dare'},type:1},{buttonId:`${prefix}tod`,buttonText:{displayText:'Tod'},type:1}]
              buttonsMessage = { contentText: `${result}`, footerText: 'Kebenaran atau tantangan?', buttons: buttons, headerType: 1 }
              prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{})
              farid.relayWAMessage(prep)
              break
          case 'google':
              if (!q) return reply(mess.wrongFormat)
              ss = await getBuffer(`https://api.apiflash.com/v1/urltoimage?access_key=f3fce33fa6804c0b97c897b3bd2ec7a8&url=https://google.com/search?q=${q}`)
              if(q == undefined || q == ' ') return reply(`*Hasil Pencarian : ${q}* tidak ditemukan`)
              googleIt({ 'query': q }).then(results => {
              vars = `_*Hasil Pencarian : ${q}*_\n`
              for (let i = 0; i < results.length; i++) {
              vars +=  `\n═════════════════\n\n*Judul:* ${results[i].title}\n\n*Deskripsi:* ${results[i].snippet}\n\n*Link:* ${results[i].link}\n\n`
}
              farid.sendMessage(from, ss, image, {caption: vars, quoted : fgc, thumbnail: Buffer.alloc(0) })
              }).catch(e => {
              console.log(e)
              reply(`${e}`)
})
              break
          case 'mediafire':
              if (args.length < 1) return reply('Link Nya Mana? ')
              if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await mediafireDl(teks)
              result = `*MediaFire Downloader*
               
📜 Nama : ${res[0].nama}
🚀 Ukuran : ${res[0].size}
🖇️ Link : ${res[0].link}

_*Tunggu Proses Upload Media......*_`
              reply(result)
              sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: fgc})
              break
          case 'fb':
          case 'facebook':
              if (!q) return reply('Link Nya?')
              reply(mess.wait)
              data = await fetchJson(`https://api.lolhuman.xyz/api/facebook?apikey=${setting.lolkey}&url=${args[0]}`)
              ini_video = await getBuffer(data.result)
              farid.sendMessage(from, ini_video, video, { quoted: fgc})
              break
          case 'twitter':
              if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(mess.Iv)
              if (!q) return reply('Linknya?')
              ten = args[0]
              var res = await twitterGetUrl(`${ten}`)
             .then(g => {
              ren = `${g.download[2].url}`
              sendMediaURL(from,ren,'Done')
})
              break
          case 'ytdesc':
              if (args.length < 1) return reply('Video/Link Yt Nya Mana? ')
              teks = args.join(' ')
              res = await yts(teks)
              reply(res.all[0].description)
              break
          case 'waifu':
          case 'loli':
          case 'husbu':
          case 'milf':
          case 'cosplay':
          case 'wallml':
              let wipu = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/${command}.json`)).data
              let wipi = wipu[Math.floor(Math.random() * (wipu.length))]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(wipi))
		      buttons = [{buttonId: `${prefix + command}`,buttonText:{displayText: `➡️Next`},type:1},{buttonId:`${prefix}owner`,buttonText:{displayText:'🐤OWNER'},type:1}]
              imageMsg = ( await farid.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Jangan Lupa Donasi Ya Kak ☕', imageMessage: imageMsg,
              contentText:`klik Next untuk ke gambar selanjut nya`,buttons,headerType:4}
              prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{quoted: fgc})
              farid.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break
          case 'hentai':
              getBuffer(`https://api.lolhuman.xyz/api/random/nsfw/hentai?apikey=${setting.lolkey}`).then((gambar) => {
              farid.sendMessage(from, gambar, image, { quoted: fgc, thumbnail: Buffer.alloc(0) })
})
              break
          case 'play':
              await axios.get(`https://api.zeks.xyz/api/ytplaymp3/2?apikey=Nyarlathotep&q=${q}`)
		     .then(res => {
    		  farid.sendMessage(from, '*Data berhasil didapatkan*\n\n_Silahkan tunggu, file media sedang dikirim mungkin butuh waktu beberapa menit_', text, { contextInfo: { externalAdReply: { title: res.data.result.title, body: 'Duration ' + res.data.result.duration + ', Size ' + res.data.result.size, thumbnailUrl: res.data.result.thumb, sourceUrl: res.data.result.link }}})
			  farid.sendMessage(from, { url: res.data.result.link }, 'audioMessage', { mimetype: 'audio/mp4', quoted: ftroli, contextInfo: { externalAdReply: { title: res.data.result.title, mediaType: 2, thumbnailUrl: res.data.result.thumb, mediaUrl: res.data.result.source }}})
})
              break
          case 'pinterest':
          case 'pin':
              if (args.length < 1) return reply(`${prefix}Nakano Nino`)
              data = await fetchJson(`https://lolhuman.herokuapp.com/api/pinterest?apikey=${setting.lolkey}&query=${q}`)
              buttons = [{buttonId: `${prefix + command} ${q}`,buttonText:{displayText: `➡️Next`},type:1}]
              fs.writeFileSync(`./${sender}.jpeg`, await getBuffer(data.result))
              imageMsg = ( await farid.prepareMessage(from, fs.readFileSync(`./${sender}.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Jangan Lupa Donasi Ya Kak ☕', imageMessage: imageMsg,
              contentText:`*Hasil Pencarian Dari : ${q}*`,buttons,headerType:4}
              prep = await farid.prepareMessageFromContent(from,{buttonsMessage},{})
              farid.relayWAMessage(prep)
              fs.unlinkSync(`./${sender}.jpeg`)
              break 
          case 'yts': 
          case 'ytsearch': 
			  if (!q) return reply(`Penggunaan ${command} query`)
              let { videos } = await yts(q)
			  let length = videos.length < 10 ? videos.length : 10
			  let capt = ``
			  for (let i = 0; i < length; i++) {
					capt += `*${videos[i].title}* (${videos[i].url})\n`
					capt += `*By:* ${videos[i].author.name}\n`
					capt += `*Duration:* ${videos[i].timestamp}\n`
					capt += `*Uploaded:* ${videos[i].ago}\n`
					capt += `=`.repeat(24) + `\n`
				}
			  farid.sendMessage(from, capt.trim(), text, { contextInfo: { externalAdReply: { title: videos[0].title, body: videos[0].description, mediaType: 2, thumbnailUrl: videos[0].image, mediaUrl: videos[0].url }}})
			  break
          case 'tourl':
              if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedVideo ) && args.length == 0) {
              reply(mess.wait)
              boij = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              owgi = await farid.downloadMediaMessage(boij)
              res = await uploadImages(owgi)
              reply(res)
              } else {
              farid.sendMessage(from,('kirim/reply gambar/video'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
}
              break
          case 'telesticker': 
          case 'telestiker':
              if (!q) return reply(`Example: ${prefix + command} https://t.me/addstickers/LINE_Menhera_chan_ENG`)
              reply(mess.wait)
              ini_url = await fetchJson(`https://api.lolhuman.xyz/api/telestick?apikey=${setting.lolkey}&url=${args[0]}`)
              ini_sticker = ini_url.result.sticker
              reply('Sending '+ ini_sticker.length +' stickers...')
              for (sticker_ in ini_sticker) {
              ini_buffer = await getBuffer(ini_sticker[sticker_])
              farid.sendMessage(from, ini_buffer, sticker, {quoted :fgc})
}
              break
          case 'attp':
              if (args.length == 0) return reply(`Example: ${prefix + command} Farid`)
              buffer = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURI(q)}`)
              farid.sendMessage(from, buffer, sticker, { quoted: fgc })
              break
          case 'sticker':
          case 'stiker':
          case 's':
          case 'stickergif':
          case 'stikergif':
          case 'sgif':
              if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
              encmediat = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              mediat = await farid.downloadAndSaveMediaMessage(encmediat)
              ron = getRandom('.webp')
              exec(`ffmpeg -i ${mediat} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=15, crop=512:512" ${ron}`, (err) => {
              fs.unlinkSync(mediat)
              if (err) return reply(`${err}`)
              exec(`webpmux -set exif ${addMetadata('Faridchan')} ${ron} -o ${ron}`, async (error) => {
              if (error) return reply(`${error}`)
              farid.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:fgc})
              fs.unlinkSync(ron)
})
})
              } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
              encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              mediat = await farid.downloadAndSaveMediaMessage(encmedia)
              ron = getRandom('.webp')
              exec(`ffmpeg -i ${mediat} -vf "scale=512:512:force_original_aspect_ratio=increase,fps=15, crop=512:512" ${ron}`, (err) => {
              fs.unlinkSync(mediat)
              if (err) return reply(`${err}`)
              exec(`webpmux -set exif ${addMetadata('Faridchan')} ${ron} -o ${ron}`, async (error) => {
              if (error) return reply(`${error}`)
              farid.sendMessage(from, fs.readFileSync(ron), sticker, {quoted:fgc})
              fs.unlinkSync(ron)
})
})
              } else {
              reply(`Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`)
}
              break
          case 'tovideo':
              if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
              encmediaaa = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
              mediaaa = await farid.downloadAndSaveMediaMessage(encmediaaa)
              a = await webp2gifFile(mediaaa)
              mp4 = await getBuffer(a.result)
              farid.sendMessage(from, mp4, video, {mimetype: 'video/mp4', quoted: fgc, caption: mess.success})
              fs.unlinkSync(mediaaa)
              } else {
              reply(mess.wrongFormat)
}
              break
          case 'tomp3':
              if (isQuotedVideo || isQuotedAudio){
              reply(mess.wait)
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await farid.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.mp3')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(`Err: ${err}`)
              buffer453 = fs.readFileSync(ran)
              farid.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: fgc})
              fs.unlinkSync(ran)
})
              } else {
              reply(mess.wrongFormat)
}
              break
          case 'toimg':
              if (!isQuotedSticker) return reply('reply stickernya')
              encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await farid.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply('Gagal, pada saat mengkonversi sticker ke gambar')
              buffer = fs.readFileSync(ran)
              farid.sendMessage(from, buffer, image, {quoted: fgc, caption: '[ √ ] 𝚂𝚞𝚌𝚌𝚎𝚜𝚜...~'})
              fs.unlinkSync(ran)
})
              break
          case 'nulis':
          case 'tulis':
              if (args.length < 1) return reply('Yang mau di tulis apaan?')
              teks = args.join(' ')
              reply(mess.wait)
              nulis = encodeURIComponent(teks)
              res = await axios.get(`https://dt-04.herokuapp.com/nulis?text=${nulis}`)
              if (res.data.error) return reply(res.data.error)
              buff = Buffer.from(res.data.result.split(',')[1], 'base64')
              farid.sendMessage(from, buff, image, {quoted: fgc, caption: mess.success}).catch(e => {
              return reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim File_')
})
              break
//------------------< Ingfo Bot >-------------------
          case 'runtime':
          farid.sendMessage(from,(` *Aktif selama ${runtime(process.uptime())}* `), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              
              break
          case 'donate': 
          case 'donasi':
          farid.sendMessage(from, (setting.txtDonasi), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/97d677a6b6ddb71a55043.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              
              break
          case 'ping':
          case 'speed':
              timestampe = speed();
              latensie = speed() - timestampe
farid.sendMessage(from, `「 *𝙎𝙋𝙀𝙀𝘿 𝙏𝙀𝙎𝙏* 」\nMerespon dalam ${latensie.toFixed(4)} Sec 💬`, text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": `Hai Kak ${pushname}\n${ucapanWaktu}\n${time2} WIB`,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/90cec8aa4be48ca3016e0.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              
              break
          case 'exif':
              if (!isOwner) return  reply(mess.only.owner)
              if (!q) return reply(mess.wrongFormat)
              if (!arg.split('|')) return reply(`Penggunaan ${prefix}exif nama|author`)
              exif.create(arg.split('|')[0], arg.split('|')[1])
              reply('sukses')
              break	
          case 'join': 
              if (!q) return reply('Linknya?')
              if (!isOwner) return farid.sendMessage(from,(mess.only.owner), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              if (!isUrl(args[0]) && !args[0].includes('https://chat.whatsapp.com/')) return reply('Linknya Invalid Tod')
              link = args[0].replace('https://chat.whatsapp.com/','')
              fak = farid.query({ json: ['action', 'invite', link],
              expect200: true })
              reply('Berhasil Masuk Grup')
              break
          case 'term':
              if (!isOwner) return
              if (!q) return
              exec(q, (err, stdout) => {
              if (err) return reply(`${err}`)
              if (stdout) {
              reply(stdout)
}
})
              break 
          case 'shutdown':
              if (!isOwner) return 
              reply(`Bye...`)
              await sleep(3000)
              process.exit()
              break
          case 'leaveall':
              if (!isOwner) return  
              let totalgroup = farid.chats.array.filter(u => u.jid.endsWith('@g.us')).map(u => u.jid)
              for (let id of totalgroup) {
              sendMess(id, 'Byee', null)
              await sleep(3000)
              farid.groupLeave(id)
}
              break
          case 'culik':
              if (!isOwner) return
              if (args.length < 1) return reply('Masukin id grupnya tolol')
              let pantek = []
              for (let i of groupMembers) {
              pantek.push(i.jid)
}
              farid.groupAdd(args[0], pantek)
              break
          case 'setprefix':
              if (!isOwner) return
              teks = args.join('') 
              prefix = teks
              reply(`_Change Prefix Success!! Prefix_ : *${prefix}*`)
              break
          case 'hidetag':
          if (!isGroupAdmins) return farid.sendMessage(from,(mess.only.admin), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              try {
              quotedText = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
              hideTag(from, `${quotedText}`)
              } catch {
              hideTag(from, `${q}`)
}
              break
case 'tagall':
       if (!isGroupAdmins) return farid.sendMessage(from,(mess.only.admin), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
       if (!isGroup) return farid.sendMessage(from,('```KHUSUS GRUP BRO```'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
					teks += `@${mem.jid.split('@')[0]}\n`
					members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
			break
          case 'bug':
          case '.':
              try {
              quotedText = mek.message.extendedTextMessage.contextInfo.quotedMessage.conversation
              sendBug(from, `${quotedText}`)
              } catch {
              sendBug(from, `${q}`)
}
              break
          case 'wangy':
              if (!q) return
              qq = q.toUpperCase()
              awikwok = `${qq} ${qq} ${qq} ❤️ ❤️ ❤️ WANGY WANGY WANGY WANGY HU HA HU HA HU HA, aaaah baunya rambut ${qq} wangyy aku mau nyiumin aroma wangynya ${qq} AAAAAAAAH ~ Rambutnya.... aaah rambutnya juga pengen aku elus-elus ~~ AAAAAH ${qq} keluar pertama kali di anime juga manis ❤️ ❤️ ❤️ banget AAAAAAAAH ${qq} AAAAA LUCCUUUUUUUUUUUUUUU............ ${qq} AAAAAAAAAAAAAAAAAAAAGH ❤️ ❤️ ❤️apa ? ${qq} itu gak nyata ? Cuma HALU katamu ? nggak, ngak ngak ngak ngak NGAAAAAAAAK GUA GAK PERCAYA ITU DIA NYATA NGAAAAAAAAAAAAAAAAAK PEDULI BANGSAAAAAT !! GUA GAK PEDULI SAMA KENYATAAN POKOKNYA GAK PEDULI. ❤️ ❤️ ❤️ ${qq} gw ... ${qq} di laptop ngeliatin gw, ${qq} .. kamu percaya sama aku ? aaaaaaaaaaah syukur ${q} aku gak mau merelakan ${qq} aaaaaah ❤️ ❤️ ❤️ YEAAAAAAAAAAAH GUA MASIH PUNYA ${qq} SENDIRI PUN NGGAK SAMA AAAAAAAAAAAAAAH`
              reply(awikwok)
              break
//------------------< Lainnya >-------------------
          case 'getpp':
              if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) {
              linkpp = await farid.getProfilePicture(from) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              farid.sendMessage(from, buffer, image, {caption: "[ √ ] 𝚂𝚞𝚌𝚌𝚎𝚜𝚜...~", quoted: fgc })
              } else if (mek.message.extendedTextMessage.contextInfo.mentionedJid === null || mek.message.extendedTextMessage.contextInfo.mentionedJid === undefined) {
              mberr = mek.message.extendedTextMessage.contextInfo.participant
              linkpp = await farid.getProfilePicture(mberr) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              farid.sendMessage(from, buffer, image, { quoted: fgc, caption: `Profile Picture of @${mberr.split("@")[0]}`, contextInfo: { "mentionedJid": [mberr] }})
              } else if (mek.message.extendedTextMessage.contextInfo.mentionedJid.length > 0) {
              mberr = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
              linkpp = await farid.getProfilePicture(mberr) || "https://telegra.ph/file/40151a65238ba2643152d.jpg"
              buffer = await getBuffer(linkpp)
              farid.sendMessage(from, buffer, image, { quoted: fgc, caption: `Profile Picture of @${mberr.split("@")[0]}`, contextInfo: { "mentionedJid": [mberr] }})
}
              break
          case 'searchmsg':  //by ANU TEAM
              if (args.length < 1) return reply(`Pesan Yang Mau Dicari Apaan?\nContoh : ${prefix + command} halo|10`)
              teks = arg
              if (teks.includes("|")) { 
              try {
              var ve = teks.split("|")[0]
              var za = teks.split("|")[1]
              sampai = `${za}`
              if (isNaN(sampai)) return reply('Harus berupa Angka!')
              batas = parseInt(sampai) + 1
              if (batas > 30) return reply('Maks 30!')
              reply(mess.wait)
              cok = await farid.searchMessages(`${ve}`, from, batas,1) 
              if (cok.messages.length < 2) return reply('Tidak Ditemukan Pesan') 
              if (cok.messages.length < parseInt(batas)) reply(`Hanya Ditemukan ${cok.messages.length - 1} Pesan`)
              for (i=1;i < cok.messages.length;i++) {
              if (cok.messages[i].message) {
              farid.sendMessage(from, `Ditemukan!`, text, {sendEphemeral: true, quoted: cok.messages[i]}) 
}
}
              } catch (e) {
              return reply(String(e))
}
              } else {
              reply(`Format salah tod, ini contoh format yang benar : ${prefix + command} halo|10`)
}
              break
          case 'lolkey':
          case 'cekapikey':
              if (args.length < 1) return reply(`Ketik ${prefix}lolkey [Apikeynya]`) 
              anu = await fetchJson(`https://lolhuman.herokuapp.com/api/checkapikey?apikey=${q}`)
              teks = `*YOUR APIKEY*\n\n➸ Ussername= ${anu.result.username}\n➸ Request= ${anu.result.requests}\n➸ Today= ${anu.result.today}\n➸ Akun Type= ${anu.result.account_type}\n➸ Expired= ${anu.result.expired}\n➸ API = https://lolhuman.herokuapp.com`
              farid.sendMessage(from, teks, text, {quoted: fgc})
              break
          case 'welcome':
          if (!isGroupAdmins) return farid.sendMessage(from,(mess.only.admin), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              if (!isGroup) return reply(mess.only.group)
              if (args.length < 1) return farid.sendMessage(from,(`${prefix}welcome enable`), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              if ((args[0]) === 'enable') {
              if (isWelkom) return farid.sendMessage(from,('Udah aktif'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              welkom.push(from)
              fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
              farid.sendMessage(from,('Sukses mengaktifkan fitur welcome di group ini ✔️'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              } else if ((args[0]) === 'disable') {
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welcome.json', JSON.stringify(welkom))
              farid.sendMessage(from,('Sukses menonaktifkan fitur welcome di group ini ✔️'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
              } else {
              farid.sendMessage(from,('Enable untuk mengaktifkan, disable untuk menonaktifkan'), MessageType. text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ${ucapanWaktu}\n ${time2} WIB `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/8c6e353c15532fe5e5746.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
}
              break
case 'antilink':
       if (!isGroupAdmins) return reply(mess.only.admin)
       if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(` *🌹「 BOT NOT ADMIN 」🌹*`)
              if (!q) return reply(`Pilih enable atau disable`)
              if (args[0].toLowerCase() === 'enable'){
              if (isAntiLink) return reply(` *🌹「 ANTILINK TELAH DI AKTIFKAN  SEBELUMNYA 」🌹* `)
              antilink.push(from)
              fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
              reply('*??「 ANTILINK DI AKTIFKAN 」🌹*\n\nYang Ngirim Link Group Bakal Ke Kick!')
              } else if (args[0].toLowerCase() === 'disable'){
              let anu = antilink.indexOf(from)
              antilink.splice(anu, 1)
              fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
              reply('*🌹「 ANTILINK DI NONAKTIFKAN 」🌹*')
              } else {
              reply(`Pilih enable atau disable`)
}
break
          case 'kickall': // Anti Banned:v
              if (!isOwner) return
              for (let i of groupMembers) {
              await kickMember(from, [i.jid])
}
              break
          case 'kick':
          if (!isGroupAdmins) return reply(mess.only.admin)
         if (!isGroup) return reply(mess.only.group)
              kick(from, mentionUser)
              break
          case 'add':
          if (!isGroupAdmins) return reply(mess.only.admin)
              if (mek.message.extendedTextMessage === null || mek.message.extendedTextMessage === undefined) {
              entah = arg.split("|")[0]
              entah = entah.replace(new RegExp("[()+-/ +/]", "gi"), "")
              entah = `${entah}@s.whatsapp.net`
              farid.groupAdd(from, [entah])
              } else {
              orang = mek.message.extendedTextMessage.contextInfo.quotedMessage.sender
              await farid.groupAdd(from, [orang])
}
              break
          case 'infoig':
          farid.sendMessage(from, ` *🌹「 FOLLOW IG OWNER 」🌹* : https://www.instagram.com/faaaarr__/`, text, {quoted: fgc, contextInfo: {mentionedJid: [sender], externalAdReply: { 'title': `Hai Kak ${pushname}\n${ucapanWaktu}\n${time2}`, thumbnailUrl: 'https://telegra.ph/file/be275a73c34a73e704e1a.jpg', sourceUrl: 'https://instagram.com/faaaarr__?utm_medium=copy_link' }}})
            break
          case 'sourcecode': 
          case 'sc': 
          case 'src':
          farid.sendMessage(from, `*🌹 SOURCE CODE🌹* :\nhttps://github.com/Faridrfauzi/Pikawbotv2`, text, {"contextInfo": {text: 'HelloWorld',"forwardingScore": 3,isForwarded: true,sendEphemeral: true,mentionedJid: [sender],"externalAdReply": {"title": ` ᴘɪᴋᴀᴡ Bot🅥\n By©𝑭 𝑨 𝑹 𝒁 `,"body": ``,"previewType": "PHOTO","thumbnailUrl": `https://telegra.ph/file/96d81e8a1355bc37ec04e.jpg`,"thumbnail": "","sourceUrl": ""}}, quoted: fgc})
               break
          case 'jadibot':
              jadibot(reply,farid,from)
              break
          case 'stopjadibot':
              stopjadibot(reply)
              break
          case 'listbot':
          case 'listjadibot':
          if (!isOwner) return  reply(mess.only.owner)
              let jamdibot = '「 *LIST JADIBOT* 」\n\n'
              for(let i of listjadibot) {
              jamdibot += `*Nomor* : ${i.jid.split('@')[0]}
*Nama* : ${i.name}
*Device* : ${i.phone.device_manufacturer}
*Model* : ${i.phone.device_model}\n\n`
}
              reply(jamdibot)
              break
          case 'get':
          case 'fetch': //ambil dari nuru
              if (!/^https?:\/\//.test(q)) return reply('Awali *URL* dengan http:// atau https://')
              res = await fetch(q)
              if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
              delete res
              throw `Content-Length: ${res.headers.get('content-length')}`
}
              if (!/text|json/.test(res.headers.get('content-type'))) return sendMediaURL(from, q)
              txtx = await res.buffer()
              try {
              txtx = util.format(JSON.parse(txtx+''))
              } catch (e) {
              txtx = txtx + ''
              } finally {
              reply(txtx.slice(0, 65536) + '')
}
              break
default:
if (budy.startsWith('=>')){
if (!isOwner) return
try {
return farid.sendMessage(from, 
`${a}📥 Input: ${budy.slice(3)}
📤 OutPut: 
${JSON.stringify(eval(budy.slice(2)),null,'\t')}
${a}`
,text, {quoted:fgc })
} catch(err) {
e = String(err)
reply(`${a} "err" :  "${e}"${a}`)
}
}
if (!isOwner) return
if (budy.startsWith('> ')) {
try {
console.log(color('[ EVAL ]', 'pink'), color(time), budy, color('dari', 'yellow'), pushname, color('di'), isGroup ? groupName : 'Private Chat')
reply(require('util').format(eval(`;(async () => { ${budy.slice(2)} })()`)))
} catch(e) {
console.log(e)
err = String(e)
js = JSON.stringify(e, null, 2)
if (js == '{}') js = { err }
js = JSON.stringify(js, null, 2)
js = '```' + js + '```'
reply('_' + err + '_\n\n' + js)
}
}
if (isGroup && budy != undefined) {
} else {
console.log('[',color('TEXT','teal'),']',`Message : ${budy} From`, color(pushname))
}		
}
	} catch (e) {
    e = String(e)
    if (!e.includes("this.isZero")) {
	console.log('Message : %s', color(e, 'green'))
        }
	}
}



