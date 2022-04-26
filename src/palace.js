"use strict"

/** Asset type constants */
export const RT =
{
	IPUSERBASE: 0x49557372, // unused
	PROP: 0x50726F70,
	USERBASE: 0x55736572 // unused
}

/** Event type constants */
export const MSG =
{
	PICTDEL: 0x46505371,
	HTTPSERVER: 0x48545450,
	NOOP: 0x4E4F4F50,
	ASSETNEW: 0x61417374,
	AUTHENTICATE: 0x61757468,
	AUTHRESPONSE: 0x61757472,
	BLOWTHRU: 0x626C6F77,
	LOGOFF: 0x62796520,
	INITCONNECTION: 0x634C6F67, // unused
	SPOTMOVE: 0x636F4C73,
	PROPDEL: 0x64507270,
	SERVERDOWN: 0x646F776E,
	DRAW: 0x64726177,
	DISPLAYURL: 0x6475726C,
	ROOMDESCEND: 0x656E6472,
	USEREXIT: 0x65707273,
	FILENOTFND: 0x666E6665,
	GMSG: 0x676D7367,
	SERVERUP: 0x696E6974, // unused
	KILLUSER: 0x6B696C6C,
	DOORLOCK: 0x6C6F636B,
	USERLOG: 0x6C6F6720,
	PROPMOVE: 0x6D507270,
	PICTNEW: 0x6E506374,
	PROPNEW: 0x6E507270,
	ROOMNEW: 0x6E526F6D,
	ROOMGOTO: 0x6E617652,
	USERNEW: 0x6E707273,
	SPOTDEL: 0x6F705364,
	SPOTNEW: 0x6F70536E,
	SPOTSETDESC: 0x6F705373, // unused
	PICTMOVE: 0x704C6F63,
	PING: 0x70696E67,
	PONG: 0x706F6E67,
	TROPSER: 0x70736572, // used by InstantPalace, purpose unknown
	ASSETQUERY: 0x71417374,
	FILEQUERY: 0x7146696C,
	ASSETREGI: 0x72417374,
	LISTOFALLROOMS: 0x724C7374,
	LOGON: 0x72656769,
	ALTLOGONREPLY: 0x72657032,
	RESPORT: 0x72657370, // used by InstantPalace, purpose unknown
	RMSG: 0x726D7367,
	ROOMDESC: 0x726F6F6D,
	USERLIST: 0x72707273,
	DIYIT: 0x72796974,
	ASSETSEND: 0x73417374,
	NAVERROR: 0x73457272,
	FILESEND: 0x7346696C,
	EXTENDEDINFO: 0x73496E66,
	PICTSETDESC: 0x73506374, // unused
	PROPSETDESC: 0x73507270, // unused
	ROOMSETDESC: 0x73526F6D,
	SPOTSTATE: 0x73537461,
	SERVERINFO: 0x73696E66,
	SMSG: 0x736D7367,
	SUPERUSER: 0x73757372,
	TALK: 0x74616C6B,
	TIMYID: 0x74696D79, // unused
	TIYID: 0x74697972,
	USERNAME: 0x7573724E,
	LISTOFALLUSERS: 0x754C7374,
	USERSTATUS: 0x75537461,
	DOORUNLOCK: 0x756E6C6F,
	USERCOLOR: 0x75737243,
	USERDESC: 0x75737244,
	USERFACE: 0x75737246,
	USERPROP: 0x75737250,
	VERSION: 0x76657273,
	WHISPER: 0x77686973,
	WMSG: 0x776D7367,
	USERENTER: 0x77707273,
	XTALK: 0x78746C6B,
	XWHISPER: 0x78776973
}

/** Encodes as a UTF-8 Pascal string */
String.prototype.toPascal = function()
{
	let enc = new TextEncoder();
	let utf8 = enc.encode(this);
	let len = utf8.byteLength > 255 ? 255 : utf8.byteLength;
	let result = new Uint8Array(len + 1);

	result[0] = len;
	result.set(utf8, 1);

	return result;
}

/** Encodes as UTF-8 and truncates string length to 31 bytes */
String.prototype.toStr31 = function()
{
	let enc = new TextEncoder();
	let utf8 = enc.encode(this);
	let len = utf8.byteLength > 31 ? 31 : utf8.byteLength;
	let result = new Uint8Array(len + 1);

	result[0] = len;
	result.set(utf8, 1);

	return result;
}

/** Encodes as UTF-8 and truncates string length to 63 bytes */
String.prototype.toStr63 = function()
{
	let enc = new TextEncoder();
	let utf8 = enc.encode(this);
	let len = utf8.byteLength > 63 ? 63 : utf8.byteLength;
	let result = new Uint8Array(len + 1);

	result[0] = len;
	result.set(utf8, 1);

	return result;
}

/** Message codec */
export class Codec
{
	constructor()
	{
		this._lut = [];
		var key = 666666;
		var quo = 0;
		var rem = 0;
		var test = 0;

		for (let i = 0; i < 512; i++)
		{
			quo = key / 127773;
			rem = key % 127773;
			test = 16807 * rem - 2836 * quo;
			key = test > 0 ? test : test + 0x80000000;
			this._lut.push(Math.floor(key / 2147483647 * 256));
		}
	}

	/**
	 * Encodes a data buffer
	 * @param {Uint8Array} data
	*/
	encode(data)
	{
		var last = 0;
		var rc = 0;
		var b = 0;

		if (data.byteLength > 254)
			data = data.subarray(0, 253);
		
		for (let i = 0; i < data.byteLength; i++)
		{
			b = i;
			data[i] = (b ^ this._lut[rc++] ^ last) & 255;
			last = (data[i] & this._lut[rc++]) & 255;
		}

		return data;
	}

	/**
	 * Decodes a data buffer
	 * @param {Uint8Array} data
	*/
	decode(data)
	{
		var last = 0;
		var rc = 0;
		var b = 0;
		
		for (let i = 0; i < data.byteLength; i++)
		{
			b = i;
			data[i] = (b ^ this._lut[rc++] ^ last) & 255;
			last = (b & this._lut[rc++]) & 255;
		}

		return data;
	}
}

/** Asset specification */
export class AssetSpec
{
	/**
	 * @constructor
	 * @param {number} id - Asset ID
	 * @param {ArrayBuffer} data - Asset binary data
	*/
	constructor(id, data)
	{
		this.id = id;
		this._crc = 0xD9216290;

		let bytes = new DataView(data);
		for (let i = 0; i < bytes.byteLength; i++)
			this._crc = ((this._crc << 1) | ((this._crc & 0x80000000) ? 1 : 0)) ^ bytes.getUint8(i);
	}

	/** Returns the CRC generated from the data */
	get crc()
	{
		return this._crc;
	}
}

export class AssetDescriptor
{
	/**
	 * @constructor
	 * @param {string} name
	 * @param {number} size - Size in bytes of the asset
	*/
	constructor(name, size)
	{
		this.name = name;
		this._size = size;
		this._flags = 0;
	}

	/** Returns the asset name */
	get name()
	{
		return this._name;
	}

	/** Sets the asset name */
	set name(newName)
	{
		this._name = newName.toStr31();
	}

	/** Returns the byte size of the asset */
	get size()
	{
		return this._size;
	}
}

exports.String.prototype.toPascal = String.prototype.toPascal;
exports.String.prototype.toStr31 = String.prototype.toStr31;
exports.String.prototype.toStr63 = String.prototype.toStr63;
