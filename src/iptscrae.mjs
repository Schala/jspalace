"use strict"

/** A lexical token in the code */
const TokenType =
{
	// literals
	Array: 'array',
	Atom: 'atom',
	Integer: 'integer',
	String: 'string',

	// misc
	Identifier: 'identifier',
	Operator: 'operator'
}

/** A value-type pair */
class Token
{
	/**
	 * @constructor
	 * @param {any} value
	 * @param {TokenType} type
	*/
	constructor(value, type)
	{
		this.value = value;
		this.type = type;
	}
}

class Lexer
{
	/**
	 * Loads a file into the lexer
	 * @constructor
	 * @param {Interpreter} interpretor - Interpreter instance
	 * @param {string} code - Script code
	*/
	constructor(interpretor, code)
	{
		this._code = code;
		this._interp = interpretor;
		this._linePos = 0;
		this._line = 1;
		this._chr = null;

		// Position in code
		this._pos = 0;

		this._tokens = [];

		while (this._pos < code.length)
			this._nextToken();
	}

	/** Returns the parsed token sequence */
	get tokens()
	{
		return this._tokens;
	}

	/** True if the current character is alphabetic */
	_isAlpha()
	{
		let code = this._chr.charCodeAt(0);
		return (code >= 65 && code <= 90) || // >= 'A and <= 'Z'
			(code >= 97 && code <= 122); // >= 'a' and <= 'z'
	}

	/** True if the current character is alphanumeric */
	_isAlphanumeric()
	{
		return this._isAlpha() || this._isDigit();
	}

	/** True if the current character is a numerical digit */
	_isDigit()
	{
		let code = this._chr.charCodeAt(0);
		return code >= 48 && code <= 57; // >= '0' and <= '9'
	}

	/** True if the current character is a new line */
	_isNewLine()
	{
		switch (this._chr)
		{
			case '\n':
			case '\r':
				return true;
			default:
				return false;
		}
	}

	/** True if the current character is whitespace */
	_isSpace()
	{
		switch (this._chr)
		{
			case '\t':
			case ' ':
				return true;
			default:
				return false;
		}
	}

	/** True if the current character is a reserved symbol */
	_isSpecial()
	{
		switch (this._chr)
		{
			case '&': // concatenation
			case '*': // multiplication
			case '-': // subtraction
			case '=': // assignment, equality
			case '+': // addition
			case '<': // less than
			case '>': // greater than
				return true;
			default:
				return false;
		}
	}

	/** Returns the last token parsed */
	_last()
	{
		return this.tokens[this.tokens.length - 1];
	}

	/** Gets the next character in the source code */
	_nextChar()
	{
		this._chr = this._code.charAt(this._pos++);

		switch (this._chr)
		{
			// new line
			case '\n':
			case '\r':
				this._line++;
				this._linePos = 0;
				break;

			// whitespace
			case '\t':
			case ' ':
				this._linePos++;
				this._nextChar();
				break;
			default:
				this._linePos++;
		}

		return this._chr;
	}

	/** Gets the next token in the source code */
	_nextToken()
	{
		this._nextChar();

		// integer
		if (this._isDigit())
		{
			this._tokens.push(new Token(this._parseInteger(), TokenType.Integer));
			return this._last();
		}

		// string
		if (this._chr == '"')
		{
			this._tokens.push(new Token(this._parseString(), TokenType.String));
			return this._last();
		}
		
		// array
		if (this._chr == '[')
		{
			this._tokens.push(new Token(this._parseArray(), TokenType.Array));
			return this._last();
		}

		// atom
		if (this._chr == '{')
		{
			var code = "";
			var scope = 1;
			while (scope > 0)
			{
				this._chr = this._code.charAt(this._pos++);
				switch (this._chr)
				{
					case '{': scope++; break;
					case '}': scope--; break;
					default: ;
				}

				if (scope === 0 && this._chr !== '}')
					code += this._chr;
			}

			this._tokens.push(new Token((new Lexer(code)).tokens, TokenType.Atom));
			return this._last();
		}

		// identifier
		if (this._isAlpha() || this._chr == '_')
			this._tokens.push(new Token(this._parseIdentifier(), TokenType.Identifier));
	}

	_parseArray()
	{
		var array = [];
		while (this._nextChar() != ']')
		{
			// nested array
			if (this._chr == '[')
				array.push(new Token(this._parseArray(), TokenType.Array));

			// identifier
			if (this._isAlpha() || this._chr == '_')
				array.push(new Token(this._parseIdentifier(), TokenType.Identifier));

			// integer
			if (this._isDigit())
				array.push(new Token(this._parseInteger(), TokenType.Integer));

			// operator
			if (this._isSpecial())
				array.push(new Token(this._parseOperator(), TokenType.Operator));
		
			// string
			if (this._chr == '"')
				array.push(new Token(this._parseString(), TokenType.String));
		}

		return array;
	}

	_parseIdentifier()
	{
		var id = this._chr;
		this._nextChar();
		while (this._isAlphanumeric() || this._chr === '_')
			id += this._chr;
		return id;
	}

	_parseInteger()
	{
		var num = this._chr;
		while (this._isDigit(this._nextChar()))
			num += this._chr;
		return parseInt(num, 10);
	}

	_parseOperator()
	{
		var op = this._chr;
		this._nextChar();
		if (this._isSpecial())
			op += this._chr;
		return op;
	}

	_parseString()
	{
		var str = "";
		while (this._nextChar() != '"')
			str += this._chr;
		return str;
	}
}

/** Meta property tokens */
const MetaPropertyType =
{
	Artist: "ARTIST",
	Dest: "DEST",
	Door: "DOOR",
	EndDoor: "ENDDOOR",
	EndPicts: "ENDPICTS",
	EndPicture: "ENDPICTURE",
	EndRoom: "ENDROOM",
	EndScript: "ENDSCRIPT",
	EndSpot: "ENDSPOT",
	Hidden: "HIDDEN",
	ID: "ID",
	Name: "NAME",
	NoCyborgs: "NOCYBORGS",
	NoGuests: "NOGUESTS",
	NoPainting: "NOPAINTING",
	On: "ON",
	Outline: "OUTLINE",
	Pict: "PICT",
	Picts: "PICTS",
	Picture: "PICTURE",
	Private: "PRIVATE",
	Room: "ROOM",
	Script: "SCRIPT",
	Spot: "SPOT",
	TransColor: "TRANSCOLOR"
}

/** Event type tokens */
const EventType =
{
	Alarm: "ALARM",
	ColorChange: "COLORCHANGE",
	Enter: "ENTER",
	FaceChange: "FACECHANGE",
	FrameChange: "FRAMECHANGE",
	HTTPError: "HTTPERROR",
	HTTPReceived: "HTTPRECEIVED",
	HTTPSendProgress: "HTTPSENDPROGRESS",
	HTTPReceiveProgress: "HTTPRECEIVEPROGRESS",
	Idle: "IDLE",
	InChat: "INCHAT",
	KeyDown: "KEYDOWN",
	KeyUp: "KEYUP",
	Leave: "LEAVE",
	Lock: "LOCK",
	LoosePropAdded: "LOOSEPROPADDED",
	LoosePropChanged: "LOOSEPROPCHANGED",
	LoosePropDeleted: "LOOSEPROPDELETED",
	Macro0: "MACRO0",
	Macro1: "MACRO1",
	Macro2: "MACRO2",
	Macro3: "MACRO3",
	Macro4: "MACRO4",
	Macro5: "MACRO5",
	Macro6: "MACRO6",
	Macro7: "MACRO7",
	Macro8: "MACRO8",
	Macro9: "MACRO9",
	MouseDown: "MOUSEDOWN",
	MouseDrag: "MOUSEDRAG",
	MouseMove: "MOUSEMOVE",
	MouseUp: "MOUSEUP",
	NameChange: "NAMECHANGE",
	OutChat: "OUTCHAT",
	RollOut: "ROLLOUT",
	RollOver: "ROLLOVER",
	RoomLoad: "ROOMLOAD",
	RoomReady: "ROOMREADY",
	Select: "SELECT",
	ServerMsg: "SERVERMSG",
	SignOn: "SIGNON",
	StateChange: "STATECHANGE",
	Unlock: "UNLOCK",
	UserEnter: "USERENTER",
	UserLeave: "USERLEAVE",
	UserMove: "USERMOVE",
	WebDocBegin: "WEBDOCBEGIN",
	WebDocDone: "WEBDOCDONE",
	WebStatus: "WEBSTATUS",
	WebTitle: "WEBTITLE"
}

export class Interpreter
{
	/**
	 * Loads a file into the interpretor
	 * @constructor
	 * @param {string} code - Script code
	*/
	constructor(code)
	{
		// Variable map
		this._vars = new Map();

		// operation stack
		this._stack = new Lexer(code).tokens;

		this._reset();
	}

	/**
	 * Evaluate an expression on the stack.
	 * @param {boolean} run - Execute the popped code
	*/
	eval(run = true)
	{
		var elem = this._stack.pop();
	}

	_reset()
	{
		// stack pointer
		this._ptr = this._stack.length - 1;

		// in case we have nested expressions, this keeps count
		this._depth = 0;
	}

	// --- operations ---

	_addlooseprop()
	{
	}

	_array()
	{
		var vals = [];

		while (this._stack.length > 0)
			vals.push(this.eval());
		
		for (let v of vals)
			this._stack.push(v);
	}

	_assign()
	{
		var id = this._stack.pop();
		var rhs = this.eval();
		this._vars[id] = rhs;
	}

	_chatstr()
	{
	}

	_clearprops()
	{
	}

	_concat()
	{
		var rhs = this.eval();
		var lhs = this.eval();
		this._stack.push(lhs.concat(rhs));
	}

	_doffprop()
	{

	}

	_donprop()
	{
		var prop = this.eval();
	}

	_dooridx()
	{
		var id = this.eval();
	}

	_dropprop()
	{
		var y = this.eval();
		var x = this.eval();
	}

	_equal()
	{
		var rhs = this.eval();
		var lhs = this.eval();
		this._stack.push(lhs == rhs ? 1 : 0);
	}

	_get()
	{
	}

	_getspotstate()
	{
		var id = this.eval();
	}

	_global()
	{
		this._vars[this._stack.pop()] = null;
	}

	_globalmsg()
	{
		var msg = this.eval();
	}

	_gotoroom()
	{
		var id = this.eval();
	}

	_gotourlframe()
	{
		var frame = this.eval();
		var url = this.eval();
	}

	_grepstr()
	{
		var pattern = this.eval();
		var input = this.eval();
	}

	_grepsub()
	{
		var pattern = this.eval();
		var input = this.eval();
	}

	_hasprop()
	{
		var id = this.eval();
	}

	_if()
	{
		if (this.eval())
			;
	}

	_ifelse()
	{
		if (this.eval())
			;
	}

	_inspot()
	{
		var id = this.eval();
	}

	_isgod()
	{
	}

	_isguest()
	{
	}

	_islocked()
	{
		var id = this.eval();
	}

	_iswizard()
	{
	}

	_itoa()
	{
		this._stack.push(this.eval().toString());
	}

	_killuser()
	{
		var id = this.eval();
	}

	_localmsg()
	{
		var msg = this.eval();
	}

	_lock()
	{
		var id = this.eval();
	}

	_logmsg()
	{
		var msg = this.eval();
	}

	_macro()
	{
		var id = this.eval();
	}

	_me()
	{
	}

	_minus()
	{
		var lhs = this.eval();
		var rhs = this.eval();
		this._stack.push(lhs - rhs);
	}

	_move()
	{
		var y = this.eval();
		var x = this.eval();
	}

	_nbrdoors()
	{
	}

	_nbrroomusers()
	{
	}

	_nbrspots()
	{
	}

	_nbruserprops()
	{
	}

	_netgoto()
	{
		var url = this.eval();
	}

	_plus()
	{
		var lhs = this.eval();
		var rhs = this.eval();
		this._stack.push(lhs + rhs);
	}

	_posx()
	{
	}

	_posy()
	{
	}

	_privatemsg()
	{
		var target = this.eval();
		var msg = this.eval();
	}

	_put()
	{
	}

	_random()
	{
		var max = this.eval();
		this._stack.push(Math.round(Math.random() * max));
	}

	_roommsg()
	{
		var msg = this.eval();
	}

	_roomuser()
	{
		var id = this.eval();
	}

	_say()
	{
		var text = this.eval();
	}

	_sayat()
	{
		var y = this.eval();
		var x = this.eval();
		var text = this.eval();
	}

	_select()
	{
		var id = this.eval();
	}

	_setalarm()
	{
		var target = this.eval();
		var value = this.eval();
	}

	_setcolor()
	{
		var color = this.eval();
	}

	_setface()
	{
		var face = this.eval();
	}

	_setloc()
	{
		var id = this.eval();
		var y = this.eval();
		var x = this.eval();
	}

	_setpicloc()
	{
		var id = this.eval();
		var y = this.eval();
		var x = this.eval();
	}

	_setpos()
	{
		var y = this.eval();
		var x = this.eval();
	}

	_setprops()
	{
		var props = [];

		while (this._stack.length > 0)
			props.push(this.eval());
	}

	_setspotstate()
	{
		var id = this.eval();
		var state = this.eval();
	}

	_setspotstatelocal()
	{
		var id = this.eval();
		var state = this.eval();
	}

	_showlooseprops()
	{
	}

	_sound()
	{
		var sound = this.eval();
	}

	_spotdest()
	{
		var id = this.eval();
	}

	_spotidx()
	{
		var id = this.eval();
	}

	_spotname()
	{
		var id = this.eval();
	}

	_susrmsg()
	{
		var msg = this.eval();
	}

	_times()
	{
		var lhs = this.eval();
		var rhs = this.eval();
		this._stack.push(lhs * rhs);
	}

	_topprop()
	{
	}

	_unlock()
	{
		var id = this.eval();
	}

	_username()
	{
	}

	_userprop()
	{
		var id = this.eval();
	}

	_while()
	{
		var cond = this.eval();
		var atom = this.eval(false);
	}

	_whochat()
	{
	}

	_whome()
	{
	}

	_whoname()
	{
		var id = this.eval();
	}

	_whopos()
	{
	}

	_whotarget()
	{
	}
}