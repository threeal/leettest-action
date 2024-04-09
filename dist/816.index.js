export const id = 816;
export const ids = [816,778];
export const modules = {

/***/ 5133:
/***/ ((module) => {



const mimicFn = (to, from) => {
	for (const prop of Reflect.ownKeys(from)) {
		Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
	}

	return to;
};

module.exports = mimicFn;
// TODO: Remove this for the next major release
module.exports["default"] = mimicFn;


/***/ }),

/***/ 4927:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const mimicFn = __webpack_require__(5133);

const calledFunctions = new WeakMap();

const onetime = (function_, options = {}) => {
	if (typeof function_ !== 'function') {
		throw new TypeError('Expected a function');
	}

	let returnValue;
	let callCount = 0;
	const functionName = function_.displayName || function_.name || '<anonymous>';

	const onetime = function (...arguments_) {
		calledFunctions.set(onetime, ++callCount);

		if (callCount === 1) {
			returnValue = function_.apply(this, arguments_);
			function_ = null;
		} else if (options.throw === true) {
			throw new Error(`Function \`${functionName}\` can only be called once`);
		}

		return returnValue;
	};

	mimicFn(onetime, function_);
	calledFunctions.set(onetime, callCount);

	return onetime;
};

module.exports = onetime;
// TODO: Remove this for the next major release
module.exports["default"] = onetime;

module.exports.callCount = function_ => {
	if (!calledFunctions.has(function_)) {
		throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
	}

	return calledFunctions.get(function_);
};


/***/ }),

/***/ 4955:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
// grab a reference to node's real process object right away
var process = global.process

const processOk = function (process) {
  return process &&
    typeof process === 'object' &&
    typeof process.removeListener === 'function' &&
    typeof process.emit === 'function' &&
    typeof process.reallyExit === 'function' &&
    typeof process.listeners === 'function' &&
    typeof process.kill === 'function' &&
    typeof process.pid === 'number' &&
    typeof process.on === 'function'
}

// some kind of non-node environment, just no-op
/* istanbul ignore if */
if (!processOk(process)) {
  module.exports = function () {
    return function () {}
  }
} else {
  var assert = __webpack_require__(9491)
  var signals = __webpack_require__(150)
  var isWin = /^win/i.test(process.platform)

  var EE = __webpack_require__(2361)
  /* istanbul ignore if */
  if (typeof EE !== 'function') {
    EE = EE.EventEmitter
  }

  var emitter
  if (process.__signal_exit_emitter__) {
    emitter = process.__signal_exit_emitter__
  } else {
    emitter = process.__signal_exit_emitter__ = new EE()
    emitter.count = 0
    emitter.emitted = {}
  }

  // Because this emitter is a global, we have to check to see if a
  // previous version of this library failed to enable infinite listeners.
  // I know what you're about to say.  But literally everything about
  // signal-exit is a compromise with evil.  Get used to it.
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity)
    emitter.infinite = true
  }

  module.exports = function (cb, opts) {
    /* istanbul ignore if */
    if (!processOk(global.process)) {
      return function () {}
    }
    assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler')

    if (loaded === false) {
      load()
    }

    var ev = 'exit'
    if (opts && opts.alwaysLast) {
      ev = 'afterexit'
    }

    var remove = function () {
      emitter.removeListener(ev, cb)
      if (emitter.listeners('exit').length === 0 &&
          emitter.listeners('afterexit').length === 0) {
        unload()
      }
    }
    emitter.on(ev, cb)

    return remove
  }

  var unload = function unload () {
    if (!loaded || !processOk(global.process)) {
      return
    }
    loaded = false

    signals.forEach(function (sig) {
      try {
        process.removeListener(sig, sigListeners[sig])
      } catch (er) {}
    })
    process.emit = originalProcessEmit
    process.reallyExit = originalProcessReallyExit
    emitter.count -= 1
  }
  module.exports.unload = unload

  var emit = function emit (event, code, signal) {
    /* istanbul ignore if */
    if (emitter.emitted[event]) {
      return
    }
    emitter.emitted[event] = true
    emitter.emit(event, code, signal)
  }

  // { <signal>: <listener fn>, ... }
  var sigListeners = {}
  signals.forEach(function (sig) {
    sigListeners[sig] = function listener () {
      /* istanbul ignore if */
      if (!processOk(global.process)) {
        return
      }
      // If there are no other listeners, an exit is coming!
      // Simplest way: remove us and then re-send the signal.
      // We know that this will kill the process, so we can
      // safely emit now.
      var listeners = process.listeners(sig)
      if (listeners.length === emitter.count) {
        unload()
        emit('exit', null, sig)
        /* istanbul ignore next */
        emit('afterexit', null, sig)
        /* istanbul ignore next */
        if (isWin && sig === 'SIGHUP') {
          // "SIGHUP" throws an `ENOSYS` error on Windows,
          // so use a supported signal instead
          sig = 'SIGINT'
        }
        /* istanbul ignore next */
        process.kill(process.pid, sig)
      }
    }
  })

  module.exports.signals = function () {
    return signals
  }

  var loaded = false

  var load = function load () {
    if (loaded || !processOk(global.process)) {
      return
    }
    loaded = true

    // This is the number of onSignalExit's that are in play.
    // It's important so that we can count the correct number of
    // listeners on signals, and don't wait for the other one to
    // handle it instead of us.
    emitter.count += 1

    signals = signals.filter(function (sig) {
      try {
        process.on(sig, sigListeners[sig])
        return true
      } catch (er) {
        return false
      }
    })

    process.emit = processEmit
    process.reallyExit = processReallyExit
  }
  module.exports.load = load

  var originalProcessReallyExit = process.reallyExit
  var processReallyExit = function processReallyExit (code) {
    /* istanbul ignore if */
    if (!processOk(global.process)) {
      return
    }
    process.exitCode = code || /* istanbul ignore next */ 0
    emit('exit', process.exitCode, null)
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null)
    /* istanbul ignore next */
    originalProcessReallyExit.call(process, process.exitCode)
  }

  var originalProcessEmit = process.emit
  var processEmit = function processEmit (ev, arg) {
    if (ev === 'exit' && processOk(global.process)) {
      /* istanbul ignore else */
      if (arg !== undefined) {
        process.exitCode = arg
      }
      var ret = originalProcessEmit.apply(this, arguments)
      /* istanbul ignore next */
      emit('exit', process.exitCode, null)
      /* istanbul ignore next */
      emit('afterexit', process.exitCode, null)
      /* istanbul ignore next */
      return ret
    } else {
      return originalProcessEmit.apply(this, arguments)
    }
  }
}


/***/ }),

/***/ 150:
/***/ ((module) => {

// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM'
]

if (process.platform !== 'win32') {
  module.exports.push(
    'SIGVTALRM',
    'SIGXCPU',
    'SIGXFSZ',
    'SIGUSR2',
    'SIGTRAP',
    'SIGSYS',
    'SIGQUIT',
    'SIGIOT'
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  )
}

if (process.platform === 'linux') {
  module.exports.push(
    'SIGIO',
    'SIGPOLL',
    'SIGPWR',
    'SIGSTKFLT',
    'SIGUNUSED'
  )
}


/***/ }),

/***/ 8816:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "createLogUpdate": () => (/* binding */ createLogUpdate),
  "default": () => (/* binding */ log_update),
  "logUpdateStderr": () => (/* binding */ logUpdateStderr)
});

// EXTERNAL MODULE: external "node:process"
var external_node_process_ = __webpack_require__(7742);
;// CONCATENATED MODULE: ../../../.yarn/berry/cache/ansi-escapes-npm-6.2.1-fcae4e6cbc-10c0.zip/node_modules/ansi-escapes/index.js


const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

/* global window */
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isTerminalApp = !isBrowser && external_node_process_.env.TERM_PROGRAM === 'Apple_Terminal';
const isWindows = !isBrowser && external_node_process_.platform === 'win32';
const cwdFunction = isBrowser ? () => {
	throw new Error('`process.cwd()` only works in Node.js, not the browser.');
} : external_node_process_.cwd;

const ansiEscapes = {};

ansiEscapes.cursorTo = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	if (typeof y !== 'number') {
		return ESC + (x + 1) + 'G';
	}

	return ESC + (y + 1) + SEP + (x + 1) + 'H';
};

ansiEscapes.cursorMove = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	let returnValue = '';

	if (x < 0) {
		returnValue += ESC + (-x) + 'D';
	} else if (x > 0) {
		returnValue += ESC + x + 'C';
	}

	if (y < 0) {
		returnValue += ESC + (-y) + 'A';
	} else if (y > 0) {
		returnValue += ESC + y + 'B';
	}

	return returnValue;
};

ansiEscapes.cursorUp = (count = 1) => ESC + count + 'A';
ansiEscapes.cursorDown = (count = 1) => ESC + count + 'B';
ansiEscapes.cursorForward = (count = 1) => ESC + count + 'C';
ansiEscapes.cursorBackward = (count = 1) => ESC + count + 'D';

ansiEscapes.cursorLeft = ESC + 'G';
ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
ansiEscapes.cursorGetPosition = ESC + '6n';
ansiEscapes.cursorNextLine = ESC + 'E';
ansiEscapes.cursorPrevLine = ESC + 'F';
ansiEscapes.cursorHide = ESC + '?25l';
ansiEscapes.cursorShow = ESC + '?25h';

ansiEscapes.eraseLines = count => {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
	}

	if (count) {
		clear += ansiEscapes.cursorLeft;
	}

	return clear;
};

ansiEscapes.eraseEndLine = ESC + 'K';
ansiEscapes.eraseStartLine = ESC + '1K';
ansiEscapes.eraseLine = ESC + '2K';
ansiEscapes.eraseDown = ESC + 'J';
ansiEscapes.eraseUp = ESC + '1J';
ansiEscapes.eraseScreen = ESC + '2J';
ansiEscapes.scrollUp = ESC + 'S';
ansiEscapes.scrollDown = ESC + 'T';

ansiEscapes.clearScreen = '\u001Bc';

ansiEscapes.clearTerminal = isWindows
	? `${ansiEscapes.eraseScreen}${ESC}0f`
	// 1. Erases the screen (Only done in case `2` is not supported)
	// 2. Erases the whole screen including scrollback buffer
	// 3. Moves cursor to the top-left position
	// More info: https://www.real-world-systems.com/docs/ANSIcode.html
	: `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;

ansiEscapes.enterAlternativeScreen = ESC + '?1049h';
ansiEscapes.exitAlternativeScreen = ESC + '?1049l';

ansiEscapes.beep = BEL;

ansiEscapes.link = (text, url) => [
	OSC,
	'8',
	SEP,
	SEP,
	url,
	BEL,
	text,
	OSC,
	'8',
	SEP,
	SEP,
	BEL,
].join('');

ansiEscapes.image = (buffer, options = {}) => {
	let returnValue = `${OSC}1337;File=inline=1`;

	if (options.width) {
		returnValue += `;width=${options.width}`;
	}

	if (options.height) {
		returnValue += `;height=${options.height}`;
	}

	if (options.preserveAspectRatio === false) {
		returnValue += ';preserveAspectRatio=0';
	}

	return returnValue + ':' + buffer.toString('base64') + BEL;
};

ansiEscapes.iTerm = {
	setCwd: (cwd = cwdFunction()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

	annotation(message, options = {}) {
		let returnValue = `${OSC}1337;`;

		const hasX = typeof options.x !== 'undefined';
		const hasY = typeof options.y !== 'undefined';
		if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
			throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
		}

		message = message.replace(/\|/g, '');

		returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

		if (options.length > 0) {
			returnValue += (
				hasX
					? [message, options.length, options.x, options.y]
					: [options.length, message]
			).join('|');
		} else {
			returnValue += message;
		}

		return returnValue + BEL;
	},
};

/* harmony default export */ const ansi_escapes = (ansiEscapes);

// EXTERNAL MODULE: ../../../.yarn/berry/cache/onetime-npm-5.1.2-3ed148fa42-10c0.zip/node_modules/onetime/index.js
var onetime = __webpack_require__(4927);
// EXTERNAL MODULE: ../../../.yarn/berry/cache/signal-exit-npm-3.0.7-bd270458a3-10c0.zip/node_modules/signal-exit/index.js
var signal_exit = __webpack_require__(4955);
;// CONCATENATED MODULE: ../../../.yarn/berry/cache/restore-cursor-npm-4.0.0-d42254f39d-10c0.zip/node_modules/restore-cursor/index.js




const restoreCursor = onetime(() => {
	signal_exit(() => {
		external_node_process_.stderr.write('\u001B[?25h');
	}, {alwaysLast: true});
});

/* harmony default export */ const restore_cursor = (restoreCursor);

;// CONCATENATED MODULE: ../../../.yarn/berry/cache/cli-cursor-npm-4.0.0-08e7cbaf41-10c0.zip/node_modules/cli-cursor/index.js



let isHidden = false;

const cliCursor = {};

cliCursor.show = (writableStream = external_node_process_.stderr) => {
	if (!writableStream.isTTY) {
		return;
	}

	isHidden = false;
	writableStream.write('\u001B[?25h');
};

cliCursor.hide = (writableStream = external_node_process_.stderr) => {
	if (!writableStream.isTTY) {
		return;
	}

	restore_cursor();
	isHidden = true;
	writableStream.write('\u001B[?25l');
};

cliCursor.toggle = (force, writableStream) => {
	if (force !== undefined) {
		isHidden = force;
	}

	if (isHidden) {
		cliCursor.show(writableStream);
	} else {
		cliCursor.hide(writableStream);
	}
};

/* harmony default export */ const cli_cursor = (cliCursor);

// EXTERNAL MODULE: ../../../.yarn/berry/cache/wrap-ansi-npm-9.0.0-c35f82c87c-10c0.zip/node_modules/wrap-ansi/index.js
var wrap_ansi = __webpack_require__(6778);
// EXTERNAL MODULE: ../../../.yarn/berry/cache/ansi-styles-npm-6.2.1-d43647018c-10c0.zip/node_modules/ansi-styles/index.js
var ansi_styles = __webpack_require__(6460);
// EXTERNAL MODULE: ../../../.yarn/berry/cache/get-east-asian-width-npm-1.2.0-6cd8491dbe-10c0.zip/node_modules/get-east-asian-width/index.js + 1 modules
var get_east_asian_width = __webpack_require__(4574);
;// CONCATENATED MODULE: ../../../.yarn/berry/cache/is-fullwidth-code-point-npm-5.0.0-5eb90c2a6e-10c0.zip/node_modules/is-fullwidth-code-point/index.js


function isFullwidthCodePoint(codePoint) {
	if (!Number.isInteger(codePoint)) {
		return false;
	}

	return (0,get_east_asian_width/* eastAsianWidth */.a5)(codePoint) === 2;
}

;// CONCATENATED MODULE: ../../../.yarn/berry/cache/slice-ansi-npm-7.1.0-ecf63701b8-10c0.zip/node_modules/slice-ansi/index.js



// \x1b and \x9b
const ESCAPES = new Set([27, 155]);

const CODE_POINT_0 = '0'.codePointAt(0);
const CODE_POINT_9 = '9'.codePointAt(0);

const endCodesSet = new Set();
const endCodesMap = new Map();
for (const [start, end] of ansi_styles/* default.codes */.ZP.codes) {
	endCodesSet.add(ansi_styles/* default.color.ansi */.ZP.color.ansi(end));
	endCodesMap.set(ansi_styles/* default.color.ansi */.ZP.color.ansi(start), ansi_styles/* default.color.ansi */.ZP.color.ansi(end));
}

function getEndCode(code) {
	if (endCodesSet.has(code)) {
		return code;
	}

	if (endCodesMap.has(code)) {
		return endCodesMap.get(code);
	}

	code = code.slice(2);
	if (code.includes(';')) {
		code = code[0] + '0';
	}

	const returnValue = ansi_styles/* default.codes.get */.ZP.codes.get(Number.parseInt(code, 10));
	if (returnValue) {
		return ansi_styles/* default.color.ansi */.ZP.color.ansi(returnValue);
	}

	return ansi_styles/* default.reset.open */.ZP.reset.open;
}

function findNumberIndex(string) {
	for (let index = 0; index < string.length; index++) {
		const codePoint = string.codePointAt(index);
		if (codePoint >= CODE_POINT_0 && codePoint <= CODE_POINT_9) {
			return index;
		}
	}

	return -1;
}

function parseAnsiCode(string, offset) {
	string = string.slice(offset, offset + 19);
	const startIndex = findNumberIndex(string);
	if (startIndex !== -1) {
		let endIndex = string.indexOf('m', startIndex);
		if (endIndex === -1) {
			endIndex = string.length;
		}

		return string.slice(0, endIndex + 1);
	}
}

function tokenize(string, endCharacter = Number.POSITIVE_INFINITY) {
	const returnValue = [];

	let index = 0;
	let visibleCount = 0;
	while (index < string.length) {
		const codePoint = string.codePointAt(index);

		if (ESCAPES.has(codePoint)) {
			const code = parseAnsiCode(string, index);
			if (code) {
				returnValue.push({
					type: 'ansi',
					code,
					endCode: getEndCode(code),
				});
				index += code.length;
				continue;
			}
		}

		const isFullWidth = isFullwidthCodePoint(codePoint);
		const character = String.fromCodePoint(codePoint);

		returnValue.push({
			type: 'character',
			value: character,
			isFullWidth,
		});

		index += character.length;
		visibleCount += isFullWidth ? 2 : character.length;

		if (visibleCount >= endCharacter) {
			break;
		}
	}

	return returnValue;
}

function reduceAnsiCodes(codes) {
	let returnValue = [];

	for (const code of codes) {
		if (code.code === ansi_styles/* default.reset.open */.ZP.reset.open) {
			// Reset code, disable all codes
			returnValue = [];
		} else if (endCodesSet.has(code.code)) {
			// This is an end code, disable all matching start codes
			returnValue = returnValue.filter(returnValueCode => returnValueCode.endCode !== code.code);
		} else {
			// This is a start code. Disable all styles this "overrides", then enable it
			returnValue = returnValue.filter(returnValueCode => returnValueCode.endCode !== code.endCode);
			returnValue.push(code);
		}
	}

	return returnValue;
}

function undoAnsiCodes(codes) {
	const reduced = reduceAnsiCodes(codes);
	const endCodes = reduced.map(({endCode}) => endCode);
	return endCodes.reverse().join('');
}

function sliceAnsi(string, start, end) {
	const tokens = tokenize(string, end);
	let activeCodes = [];
	let position = 0;
	let returnValue = '';
	let include = false;

	for (const token of tokens) {
		if (end !== undefined && position >= end) {
			break;
		}

		if (token.type === 'ansi') {
			activeCodes.push(token);
			if (include) {
				returnValue += token.code;
			}
		} else {
			// Character
			if (!include && position >= start) {
				include = true;
				// Simplify active codes
				activeCodes = reduceAnsiCodes(activeCodes);
				returnValue = activeCodes.map(({code}) => code).join('');
			}

			if (include) {
				returnValue += token.value;
			}

			position += token.isFullWidth ? 2 : token.value.length;
		}
	}

	// Disable active codes at the end
	returnValue += undoAnsiCodes(activeCodes);
	return returnValue;
}

// EXTERNAL MODULE: ../../../.yarn/berry/cache/strip-ansi-npm-7.1.0-7453b80b79-10c0.zip/node_modules/strip-ansi/index.js + 1 modules
var strip_ansi = __webpack_require__(3605);
;// CONCATENATED MODULE: ../../../.yarn/berry/cache/log-update-npm-6.0.0-d80e13c9c6-10c0.zip/node_modules/log-update/index.js







const defaultTerminalHeight = 24;

const getWidth = stream => {
	const {columns} = stream;

	if (!columns) {
		return 80;
	}

	return columns;
};

const fitToTerminalHeight = (stream, text) => {
	const terminalHeight = stream.rows ?? defaultTerminalHeight;
	const lines = text.split('\n');

	const toRemove = lines.length - terminalHeight;
	if (toRemove <= 0) {
		return text;
	}

	return sliceAnsi(
		text,
		(0,strip_ansi/* default */.Z)(lines.slice(0, toRemove).join('\n')).length + 1,
	);
};

function createLogUpdate(stream, {showCursor = false} = {}) {
	let previousLineCount = 0;
	let previousWidth = getWidth(stream);
	let previousOutput = '';

	const render = (...arguments_) => {
		if (!showCursor) {
			cli_cursor.hide();
		}

		let output = arguments_.join(' ') + '\n';
		output = fitToTerminalHeight(stream, output);
		const width = getWidth(stream);
		if (output === previousOutput && previousWidth === width) {
			return;
		}

		previousOutput = output;
		previousWidth = width;
		output = (0,wrap_ansi["default"])(output, width, {
			trim: false,
			hard: true,
			wordWrap: false,
		});
		stream.write(ansi_escapes.eraseLines(previousLineCount) + output);
		previousLineCount = output.split('\n').length;
	};

	render.clear = () => {
		stream.write(ansi_escapes.eraseLines(previousLineCount));
		previousOutput = '';
		previousWidth = getWidth(stream);
		previousLineCount = 0;
	};

	render.done = () => {
		previousOutput = '';
		previousWidth = getWidth(stream);
		previousLineCount = 0;

		if (!showCursor) {
			cli_cursor.show();
		}
	};

	return render;
}

const logUpdate = createLogUpdate(external_node_process_.stdout);
/* harmony default export */ const log_update = (logUpdate);

const logUpdateStderr = createLogUpdate(external_node_process_.stderr);


/***/ }),

/***/ 6778:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ wrapAnsi)
/* harmony export */ });
/* harmony import */ var string_width__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8991);
/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3605);
/* harmony import */ var ansi_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6460);




const ESCAPES = new Set([
	'\u001B',
	'\u009B',
]);

const END_CODE = 39;
const ANSI_ESCAPE_BELL = '\u0007';
const ANSI_CSI = '[';
const ANSI_OSC = ']';
const ANSI_SGR_TERMINATOR = 'm';
const ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;

const wrapAnsiCode = code => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
const wrapAnsiHyperlink = url => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;

// Calculate the length of words split on ' ', ignoring
// the extra characters added by ansi escape codes
const wordLengths = string => string.split(' ').map(character => (0,string_width__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(character));

// Wrap a long word across multiple rows
// Ansi escape codes do not count towards length
const wrapWord = (rows, word, columns) => {
	const characters = [...word];

	let isInsideEscape = false;
	let isInsideLinkEscape = false;
	let visible = (0,string_width__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)((0,strip_ansi__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(rows.at(-1)));

	for (const [index, character] of characters.entries()) {
		const characterLength = (0,string_width__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(character);

		if (visible + characterLength <= columns) {
			rows[rows.length - 1] += character;
		} else {
			rows.push(character);
			visible = 0;
		}

		if (ESCAPES.has(character)) {
			isInsideEscape = true;

			const ansiEscapeLinkCandidate = characters.slice(index + 1, index + 1 + ANSI_ESCAPE_LINK.length).join('');
			isInsideLinkEscape = ansiEscapeLinkCandidate === ANSI_ESCAPE_LINK;
		}

		if (isInsideEscape) {
			if (isInsideLinkEscape) {
				if (character === ANSI_ESCAPE_BELL) {
					isInsideEscape = false;
					isInsideLinkEscape = false;
				}
			} else if (character === ANSI_SGR_TERMINATOR) {
				isInsideEscape = false;
			}

			continue;
		}

		visible += characterLength;

		if (visible === columns && index < characters.length - 1) {
			rows.push('');
			visible = 0;
		}
	}

	// It's possible that the last row we copy over is only
	// ansi escape characters, handle this edge-case
	if (!visible && rows.at(-1).length > 0 && rows.length > 1) {
		rows[rows.length - 2] += rows.pop();
	}
};

// Trims spaces from a string ignoring invisible sequences
const stringVisibleTrimSpacesRight = string => {
	const words = string.split(' ');
	let last = words.length;

	while (last > 0) {
		if ((0,string_width__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(words[last - 1]) > 0) {
			break;
		}

		last--;
	}

	if (last === words.length) {
		return string;
	}

	return words.slice(0, last).join(' ') + words.slice(last).join('');
};

// The wrap-ansi module can be invoked in either 'hard' or 'soft' wrap mode.
//
// 'hard' will never allow a string to take up more than columns characters.
//
// 'soft' allows long words to expand past the column length.
const exec = (string, columns, options = {}) => {
	if (options.trim !== false && string.trim() === '') {
		return '';
	}

	let returnValue = '';
	let escapeCode;
	let escapeUrl;

	const lengths = wordLengths(string);
	let rows = [''];

	for (const [index, word] of string.split(' ').entries()) {
		if (options.trim !== false) {
			rows[rows.length - 1] = rows.at(-1).trimStart();
		}

		let rowLength = (0,string_width__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(rows.at(-1));

		if (index !== 0) {
			if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
				// If we start with a new word but the current row length equals the length of the columns, add a new row
				rows.push('');
				rowLength = 0;
			}

			if (rowLength > 0 || options.trim === false) {
				rows[rows.length - 1] += ' ';
				rowLength++;
			}
		}

		// In 'hard' wrap mode, the length of a line is never allowed to extend past 'columns'
		if (options.hard && lengths[index] > columns) {
			const remainingColumns = (columns - rowLength);
			const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
			const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
			if (breaksStartingNextLine < breaksStartingThisLine) {
				rows.push('');
			}

			wrapWord(rows, word, columns);
			continue;
		}

		if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
			if (options.wordWrap === false && rowLength < columns) {
				wrapWord(rows, word, columns);
				continue;
			}

			rows.push('');
		}

		if (rowLength + lengths[index] > columns && options.wordWrap === false) {
			wrapWord(rows, word, columns);
			continue;
		}

		rows[rows.length - 1] += word;
	}

	if (options.trim !== false) {
		rows = rows.map(row => stringVisibleTrimSpacesRight(row));
	}

	const preString = rows.join('\n');
	const pre = [...preString];

	// We need to keep a separate index as `String#slice()` works on Unicode code units, while `pre` is an array of codepoints.
	let preStringIndex = 0;

	for (const [index, character] of pre.entries()) {
		returnValue += character;

		if (ESCAPES.has(character)) {
			const {groups} = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(preString.slice(preStringIndex)) || {groups: {}};
			if (groups.code !== undefined) {
				const code = Number.parseFloat(groups.code);
				escapeCode = code === END_CODE ? undefined : code;
			} else if (groups.uri !== undefined) {
				escapeUrl = groups.uri.length === 0 ? undefined : groups.uri;
			}
		}

		const code = ansi_styles__WEBPACK_IMPORTED_MODULE_1__/* ["default"].codes.get */ .ZP.codes.get(Number(escapeCode));

		if (pre[index + 1] === '\n') {
			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink('');
			}

			if (escapeCode && code) {
				returnValue += wrapAnsiCode(code);
			}
		} else if (character === '\n') {
			if (escapeCode && code) {
				returnValue += wrapAnsiCode(escapeCode);
			}

			if (escapeUrl) {
				returnValue += wrapAnsiHyperlink(escapeUrl);
			}
		}

		preStringIndex += character.length;
	}

	return returnValue;
};

// For each newline, invoke the method separately
function wrapAnsi(string, columns, options) {
	return String(string)
		.normalize()
		.replaceAll('\r\n', '\n')
		.split('\n')
		.map(line => exec(line, columns, options))
		.join('\n');
}


/***/ })

};
