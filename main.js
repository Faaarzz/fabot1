const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./farid.js')
nocache('../farid.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'greenyellow'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'greenyellow'), color(`'${module}'`, 'lightcyan'), 'File is updated!'))
const starts = async (farid = new WAConnection()) => {
	farid.logger.level = 'warn'
	console.log(color(figlet.textSync('PikawBot', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'gold'))
console.log(color(figlet.textSync('By Farid', {
  font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'aqua'))
	console.log(color('[FARID]', 'greenyellow'), color('WELCOME TO PIKAW BOT~', 'lightcyan'))
	console.log(color('[FARID]', 'greenyellow'), color('Owner is online now!', 'lightcyan'))
	farid.browserDescription = ["FARID - BOT", "Firefox", "3.0.0"];

	// Menunggu QR
	farid.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Please scan qr code'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && farid.loadAuthInfo(`./${setting.sessionName}.json`)
	farid.on('connecting', () => {
		console.log(color('[ SYSTEM ]', 'magenta'), color(' Connecting...','cyan'));
	})

	//connect
	farid.on('open', () => {
		console.log(color('[ SYSTEM ]', 'magenta'), color('Connect, Welcome Owner','cyan'));
	})

	// session
	await farid.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(farid.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	farid.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	farid.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	farid.on('group-participants-update', async (anu) => {
		await welcome(farid, anu)
	})

	farid.on('chat-update', async (message) => {
		require('./farid.js')(farid, message)
	})
}

starts()