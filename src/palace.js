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

/** Draw command constants */
export const DC =
{
	Path: 0,
	Shape: 1,
	Text: 2,
	Detonate: 3,
	Delete: 4,
	Ellipse: 5
}

/** Server info flags and codes */
export const SI =
{
	AVATAR_URL: 1,
	SERVER_VERSION: 2,
	SERVER_TYPE: 4,
	SERVER_FLAGS: 8,
	NUM_USERS: 16,
	SERVER_NAME: 32,
	HTTP_URL: 64,
	INF_AURL: 0x4155524C,
	ERR_AUTH: 0x41555448,
	INF_FLAG: 0x464C4147,
	INF_HURL: 0x4855524C,
	EXT_NAME: 0x4E414D45,
	INF_NAME: 0x4E414D45,
	INF_NUM_USERS: 0x4E555352,
	EXT_PASS: 0x50415353,
	EXT_TYPE: 0x54595045,
	INF_TYPE: 0x54595045,
	ERR_UNKN: 0x554E4B4E,
	INF_VERS: 0x56455253
}

/** Server configuration flags */
export const FF =
{
	DirectPlay: 1, // obsolete, no longer used
	ClosedServer: 2,
	GuestsAreMembers: 4, // obsolete, always set
	InstantPalace: 16, // obsolete, no longer used
	PalacePresents: 32 // obsolete, no longer used
}

/** Platform constants */
export const PLAT =
{
	Macintosh: 0,
	Windows95: 1, // obsolete, no longer used
	WindowsNT: 2,
	Unix: 3
}

/** Room flags */
export const RF =
{
	AuthorLocked: 1,
	Private: 2,
	NoPainting: 4,
	Closed: 8,
	CyborgFreeZone: 16,
	Hidden: 32,
	NoGuests: 64, // obsolete, no longer used, ignored
	WizardsOnly: 128,
	DropZone: 256,
	NoLooseProps: 512
}

/** User flags */
export const U =
{
	SuperUser: 1,
	God: 2,
	Kill: 4,
	Guest: 8, // obsolete, no longer used, ignored
	Banished: 16, // redundant, don't use, ignored
	Penalized: 32, // unused
	CommError: 64,
	Gag: 128,
	Pin: 256,
	Hide: 512,
	RejectESP: 1024,
	RejectPrivate: 2048,
	PropGag: 4096
}

/** Login auxillary flags */
export const LI_AUXFLAGS =
{
	UnknownMach: 0,
	Mac68k: 1, // obsolete, ignored
	MacPPC: 2, // obsolete, ignored
	Win16: 3, // obsolete, ignored
	Win32: 4,
	Java: 5,
	OSMask: 15,
	Authenticate: 0x80000000
}

/** Upload capabilities */
export const LI_ULCAPS =
{
	ASSETS_PALACE: 1,
	ASSETS_FTP: 2,
	ASSETS_HTTP: 4,
	ASSETS_OTHER: 8,
	FILES_PALACE: 16,
	FILES_FTP: 32,
	FILES_HTTP: 64,
	FILES_OTHER: 128,
	EXTEND_PKT: 256
}

/** Download capabilities */
export const LI_DLCAPS =
{
	ASSETS_PALACE: 1,
	ASSETS_FTP: 2,
	ASSETS_HTTP: 4,
	ASSETS_OTHER: 8,
	FILES_PALACE: 16,
	FILES_FTP: 32,
	FILES_HTTP: 64,
	FILES_OTHER: 128,
	FILES_HTTPSrvr: 256,
	EXTEND_PKT: 512
}

/** 2D engine capabilities */
export const LI_2DENGINECAP =
{
	PALACE: 1,
	DOUBLEBYTE: 2
}

/** 2D graphics capabilities */
export const LI_2DGRAPHCAP =
{
	GIF87: 1,
	GIF89a: 2,
	JPG: 4,
	TIFF: 8,
	TARGA: 16,
	BMP: 32,
	PCT: 64
}

/** 3D engine capabilities */
export const LI_3DENGINECAP =
{
	VRML1: 1,
	VRML2: 2
}

/** Server error constants */
export const SE =
{
	InternalError: 0,
	RoomUnknown: 1,
	RoomFull: 2,
	RoomClosed: 3,
	CantAuthor: 4,
	PalaceFull: 5
}

/** Script event flags */
export const PE =
{
	Select: 1,
	Lock: 1 << 1,
	Unlock: 1 << 2,
	Hide: 1 << 3,
	Show: 1 << 4,
	Startup: 1 << 5,
	Alarm: 1 << 6,
	Custom: 1 << 7,
	InChat: 1 << 8,
	PropChange: 1 << 9,
	Enter: 1 << 10,
	Leave: 1 << 11,
	OutChat: 1 << 12,
	SignOn: 1 << 13,
	SignOff: 1 << 14,
	Macro0: 1 << 15,
	Macro1: 1 << 16,
	Macro2: 1 << 17,
	Macro3: 1 << 18,
	Macro4: 1 << 19,
	Macro5: 1 << 20,
	Macro6: 1 << 21,
	Macro7: 1 << 22,
	Macro8: 1 << 23,
	Macro9: 1 << 24,
}

/** Spot type/state */
export const HS =
{
	Normal: 0,
	Unlock: 0,
	Door: 1,
	Lock: 1,
	ShutableDoor: 2,
	LockableDoor: 3,
	Bolt: 4,
	NavArea: 5
}

/** Connection error constants */
export const K =
{
	Unknown: 0,
	LoggedOff: 1,
	CommError: 2,
	Flood: 3,
	KilledByPlayer: 4,
	ServerDown: 5,
	Unresponsive: 6,
	KilledBySysop: 7,
	ServerFull: 8,
	InvalidSerialNumber: 9, // obsolete, no longer used
	DuplicateUser: 10,
	DeathPenaltyActive: 11,
	Banished: 12,
	BanishKill: 13,
	NoGuests: 14, // obsolete, no longer used
	DemoExpired: 15, // obsolete, no longer used
	Verbose: 16
}

/** Server permission flags */
export const PM =
{
	AllowGuests: 1, // obsolete, always set
	AllowCyborgs: 2,
	AllowPainting: 4,
	AllowCustomProps: 8,
	AllowWizards: 16,
	WizardsMayKill: 32,
	WizardsMayAuthor: 64,
	PlayersMayKill: 128,
	CyborgsMayKill: 256,
	DeathPenalty: 512,
	PurgeInactiveProps: 1024,
	KillFlooders: 2048,
	NoSpoofing: 4096,
	MemberCreatedRooms: 8192
}

/** Server option flags */
export const SO =
{
	SaveSessionKeys: 1, // obsolete, no longer used
	PasswordSecurity: 2,
	ChatLog: 4,
	NoWhisper: 8,
	AllowDemoMembers: 16, // obsolete, no longer used
	Authenticate: 32,
	PoundProtect: 64,
	SortOptions: 128,
	AuthTrackLogoff: 256,
	JavaSecure: 512 // obsolete, no longer used
}

/** Encodes as a UTF-8 null terminated string */
String.prototype.toC = function()
{
	let enc = new TextEncoder();
	let utf8 = enc.encode(this);
	let result = new Uint8Array(utf8.length + 1);

	result.set(utf8, 0);
	result[result.length - 1] = 0;
	
	return result;
}

/** Encodes as a UTF-8 Pascal string */
String.prototype.toPascal = function()
{
	let enc = new TextEncoder();
	let utf8 = enc.encode(this);
	let len = utf8.length > 255 ? 255 : utf8.length;
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
	let len = utf8.length > 31 ? 31 : utf8.length;
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
	let len = utf8.length > 63 ? 63 : utf8.length;
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

exports.String.prototype.toC = String.prototype.toC;
exports.String.prototype.toPascal = String.prototype.toPascal;
exports.String.prototype.toStr31 = String.prototype.toStr31;
exports.String.prototype.toStr63 = String.prototype.toStr63;
