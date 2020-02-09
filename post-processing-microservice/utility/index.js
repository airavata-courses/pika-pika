var imgur = require('imgur')

imgur.setClientId('77457873b7895a0');
imgur.setAPIUrl('https://api.imgur.com/3/');

const uploadImage = (base64) => {
	return imgur.uploadBase64(base64)
}

module.exports = { uploadImage }