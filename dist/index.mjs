import * as fs$1 from 'node:fs';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { realpath, readlink, readdir, lstat } from 'node:fs/promises';
import os$1 from 'node:os';
import path, { win32, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { realpathSync, readlinkSync, readdirSync, readdir as readdir$1, lstatSync } from 'fs';
import { EventEmitter as EventEmitter$1 } from 'node:events';
import Pe from 'node:stream';
import { StringDecoder } from 'node:string_decoder';
import { execSync } from 'node:child_process';
import * as tty from 'tty';
import { format } from 'util';
import { EOL } from 'os';
import { StringDecoder as StringDecoder$1 } from 'string_decoder';
import { Writable } from 'stream';
import { randomUUID } from 'crypto';

/**
 * Retrieves the value of a GitHub Actions input.
 *
 * @param name - The name of the GitHub Actions input.
 * @returns The value of the GitHub Actions input, or an empty string if not found.
 */
function getInput(name) {
    const value = process.env[`INPUT_${name.toUpperCase()}`] ?? "";
    return value.trim();
}

/**
 * Logs an error message in GitHub Actions.
 *
 * @param err - The error, which can be of any type.
 */
function logError(err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stdout.write(`::error::${message}${os$1.EOL}`);
}

var Gt=(n,t,e)=>{let s=n instanceof RegExp?ce(n,e):n,i=t instanceof RegExp?ce(t,e):t,r=s!==null&&i!=null&&ss(s,i,e);return r&&{start:r[0],end:r[1],pre:e.slice(0,r[0]),body:e.slice(r[0]+s.length,r[1]),post:e.slice(r[1]+i.length)}},ce=(n,t)=>{let e=t.match(n);return e?e[0]:null},ss=(n,t,e)=>{let s,i,r,o,h,a=e.indexOf(n),l=e.indexOf(t,a+1),u=a;if(a>=0&&l>0){if(n===t)return [a,l];for(s=[],r=e.length;u>=0&&!h;){if(u===a)s.push(u),a=e.indexOf(n,u+1);else if(s.length===1){let c=s.pop();c!==void 0&&(h=[c,l]);}else i=s.pop(),i!==void 0&&i<r&&(r=i,o=l),l=e.indexOf(t,u+1);u=a<l&&a>=0?a:l;}s.length&&o!==void 0&&(h=[r,o]);}return h};var fe="\0SLASH"+Math.random()+"\0",ue="\0OPEN"+Math.random()+"\0",qt="\0CLOSE"+Math.random()+"\0",de="\0COMMA"+Math.random()+"\0",pe="\0PERIOD"+Math.random()+"\0",is=new RegExp(fe,"g"),rs=new RegExp(ue,"g"),ns=new RegExp(qt,"g"),os=new RegExp(de,"g"),hs=new RegExp(pe,"g"),as=/\\\\/g,ls=/\\{/g,cs=/\\}/g,fs=/\\,/g,us=/\\./g,ds=1e5;function Ht(n){return isNaN(n)?n.charCodeAt(0):parseInt(n,10)}function ps(n){return n.replace(as,fe).replace(ls,ue).replace(cs,qt).replace(fs,de).replace(us,pe)}function ms(n){return n.replace(is,"\\").replace(rs,"{").replace(ns,"}").replace(os,",").replace(hs,".")}function me(n){if(!n)return [""];let t=[],e=Gt("{","}",n);if(!e)return n.split(",");let{pre:s,body:i,post:r}=e,o=s.split(",");o[o.length-1]+="{"+i+"}";let h=me(r);return r.length&&(o[o.length-1]+=h.shift(),o.push.apply(o,h)),t.push.apply(t,o),t}function ge(n,t={}){if(!n)return [];let{max:e=ds}=t;return n.slice(0,2)==="{}"&&(n="\\{\\}"+n.slice(2)),ht(ps(n),e,true).map(ms)}function gs(n){return "{"+n+"}"}function ws(n){return /^-?0\d/.test(n)}function ys(n,t){return n<=t}function bs(n,t){return n>=t}function ht(n,t,e){let s=[],i=Gt("{","}",n);if(!i)return [n];let r=i.pre,o=i.post.length?ht(i.post,t,false):[""];if(/\$$/.test(i.pre))for(let h=0;h<o.length&&h<t;h++){let a=r+"{"+i.body+"}"+o[h];s.push(a);}else {let h=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(i.body),a=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(i.body),l=h||a,u=i.body.indexOf(",")>=0;if(!l&&!u)return i.post.match(/,(?!,).*\}/)?(n=i.pre+"{"+i.body+qt+i.post,ht(n,t,true)):[n];let c;if(l)c=i.body.split(/\.\./);else if(c=me(i.body),c.length===1&&c[0]!==void 0&&(c=ht(c[0],t,false).map(gs),c.length===1))return o.map(f=>i.pre+c[0]+f);let d;if(l&&c[0]!==void 0&&c[1]!==void 0){let f=Ht(c[0]),m=Ht(c[1]),p=Math.max(c[0].length,c[1].length),w=c.length===3&&c[2]!==void 0?Math.abs(Ht(c[2])):1,g=ys;m<f&&(w*=-1,g=bs);let E=c.some(ws);d=[];for(let y=f;g(y,m);y+=w){let b;if(a)b=String.fromCharCode(y),b==="\\"&&(b="");else if(b=String(y),E){let z=p-b.length;if(z>0){let $=new Array(z+1).join("0");y<0?b="-"+$+b.slice(1):b=$+b;}}d.push(b);}}else {d=[];for(let f=0;f<c.length;f++)d.push.apply(d,ht(c[f],t,false));}for(let f=0;f<d.length;f++)for(let m=0;m<o.length&&s.length<t;m++){let p=r+d[f]+o[m];(!e||l||p)&&s.push(p);}}return s}var at=n=>{if(typeof n!="string")throw new TypeError("invalid pattern");if(n.length>65536)throw new TypeError("pattern is too long")};var Ss={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",true],"[:alpha:]":["\\p{L}\\p{Nl}",true],"[:ascii:]":["\\x00-\\x7f",false],"[:blank:]":["\\p{Zs}\\t",true],"[:cntrl:]":["\\p{Cc}",true],"[:digit:]":["\\p{Nd}",true],"[:graph:]":["\\p{Z}\\p{C}",true,true],"[:lower:]":["\\p{Ll}",true],"[:print:]":["\\p{C}",true],"[:punct:]":["\\p{P}",true],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",true],"[:upper:]":["\\p{Lu}",true],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",true],"[:xdigit:]":["A-Fa-f0-9",false]},lt=n=>n.replace(/[[\]\\-]/g,"\\$&"),Es=n=>n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),we=n=>n.join(""),ye=(n,t)=>{let e=t;if(n.charAt(e)!=="[")throw new Error("not in a brace expression");let s=[],i=[],r=e+1,o=false,h=false,a=false,l=false,u=e,c="";t:for(;r<n.length;){let p=n.charAt(r);if((p==="!"||p==="^")&&r===e+1){l=true,r++;continue}if(p==="]"&&o&&!a){u=r+1;break}if(o=true,p==="\\"&&!a){a=true,r++;continue}if(p==="["&&!a){for(let[w,[g,S,E]]of Object.entries(Ss))if(n.startsWith(w,r)){if(c)return ["$.",false,n.length-e,true];r+=w.length,E?i.push(g):s.push(g),h=h||S;continue t}}if(a=false,c){p>c?s.push(lt(c)+"-"+lt(p)):p===c&&s.push(lt(p)),c="",r++;continue}if(n.startsWith("-]",r+1)){s.push(lt(p+"-")),r+=2;continue}if(n.startsWith("-",r+1)){c=p,r+=2;continue}s.push(lt(p)),r++;}if(u<r)return ["",false,0,false];if(!s.length&&!i.length)return ["$.",false,n.length-e,true];if(i.length===0&&s.length===1&&/^\\?.$/.test(s[0])&&!l){let p=s[0].length===2?s[0].slice(-1):s[0];return [Es(p),false,u-e,false]}let d="["+(l?"^":"")+we(s)+"]",f="["+(l?"":"^")+we(i)+"]";return [s.length&&i.length?"("+d+"|"+f+")":s.length?d:f,h,u-e,true]};var W=(n,{windowsPathsNoEscape:t=false,magicalBraces:e=true}={})=>e?t?n.replace(/\[([^\/\\])\]/g,"$1"):n.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1"):t?n.replace(/\[([^\/\\{}])\]/g,"$1"):n.replace(/((?!\\).|^)\[([^\/\\{}])\]/g,"$1$2").replace(/\\([^\/{}])/g,"$1");var xs=new Set(["!","?","+","*","@"]),be=n=>xs.has(n),vs="(?!(?:^|/)\\.\\.?(?:$|/))",Ct="(?!\\.)",Cs=new Set(["[","."]),Ts=new Set(["..","."]),As=new Set("().*{}+?[]^$\\!"),ks=n=>n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),Kt="[^/]",Se=Kt+"*?",Ee=Kt+"+?",Q=class n{type;#t;#s;#n=false;#r=[];#o;#S;#w;#c=false;#h;#u;#f=false;constructor(t,e,s={}){this.type=t,t&&(this.#s=true),this.#o=e,this.#t=this.#o?this.#o.#t:this,this.#h=this.#t===this?s:this.#t.#h,this.#w=this.#t===this?[]:this.#t.#w,t==="!"&&!this.#t.#c&&this.#w.push(this),this.#S=this.#o?this.#o.#r.length:0;}get hasMagic(){if(this.#s!==void 0)return this.#s;for(let t of this.#r)if(typeof t!="string"&&(t.type||t.hasMagic))return this.#s=true;return this.#s}toString(){return this.#u!==void 0?this.#u:this.type?this.#u=this.type+"("+this.#r.map(t=>String(t)).join("|")+")":this.#u=this.#r.map(t=>String(t)).join("")}#a(){if(this!==this.#t)throw new Error("should only call on root");if(this.#c)return this;this.toString(),this.#c=true;let t;for(;t=this.#w.pop();){if(t.type!=="!")continue;let e=t,s=e.#o;for(;s;){for(let i=e.#S+1;!s.type&&i<s.#r.length;i++)for(let r of t.#r){if(typeof r=="string")throw new Error("string part in extglob AST??");r.copyIn(s.#r[i]);}e=s,s=e.#o;}}return this}push(...t){for(let e of t)if(e!==""){if(typeof e!="string"&&!(e instanceof n&&e.#o===this))throw new Error("invalid part: "+e);this.#r.push(e);}}toJSON(){let t=this.type===null?this.#r.slice().map(e=>typeof e=="string"?e:e.toJSON()):[this.type,...this.#r.map(e=>e.toJSON())];return this.isStart()&&!this.type&&t.unshift([]),this.isEnd()&&(this===this.#t||this.#t.#c&&this.#o?.type==="!")&&t.push({}),t}isStart(){if(this.#t===this)return  true;if(!this.#o?.isStart())return  false;if(this.#S===0)return  true;let t=this.#o;for(let e=0;e<this.#S;e++){let s=t.#r[e];if(!(s instanceof n&&s.type==="!"))return  false}return  true}isEnd(){if(this.#t===this||this.#o?.type==="!")return  true;if(!this.#o?.isEnd())return  false;if(!this.type)return this.#o?.isEnd();let t=this.#o?this.#o.#r.length:0;return this.#S===t-1}copyIn(t){typeof t=="string"?this.push(t):this.push(t.clone(this));}clone(t){let e=new n(this.type,t);for(let s of this.#r)e.copyIn(s);return e}static#i(t,e,s,i){let r=false,o=false,h=-1,a=false;if(e.type===null){let f=s,m="";for(;f<t.length;){let p=t.charAt(f++);if(r||p==="\\"){r=!r,m+=p;continue}if(o){f===h+1?(p==="^"||p==="!")&&(a=true):p==="]"&&!(f===h+2&&a)&&(o=false),m+=p;continue}else if(p==="["){o=true,h=f,a=false,m+=p;continue}if(!i.noext&&be(p)&&t.charAt(f)==="("){e.push(m),m="";let w=new n(p,e);f=n.#i(t,w,f,i),e.push(w);continue}m+=p;}return e.push(m),f}let l=s+1,u=new n(null,e),c=[],d="";for(;l<t.length;){let f=t.charAt(l++);if(r||f==="\\"){r=!r,d+=f;continue}if(o){l===h+1?(f==="^"||f==="!")&&(a=true):f==="]"&&!(l===h+2&&a)&&(o=false),d+=f;continue}else if(f==="["){o=true,h=l,a=false,d+=f;continue}if(be(f)&&t.charAt(l)==="("){u.push(d),d="";let m=new n(f,u);u.push(m),l=n.#i(t,m,l,i);continue}if(f==="|"){u.push(d),d="",c.push(u),u=new n(null,e);continue}if(f===")")return d===""&&e.#r.length===0&&(e.#f=true),u.push(d),d="",e.push(...c,u),l;d+=f;}return e.type=null,e.#s=void 0,e.#r=[t.substring(s-1)],l}static fromGlob(t,e={}){let s=new n(null,void 0,e);return n.#i(t,s,0,e),s}toMMPattern(){if(this!==this.#t)return this.#t.toMMPattern();let t=this.toString(),[e,s,i,r]=this.toRegExpSource();if(!(i||this.#s||this.#h.nocase&&!this.#h.nocaseMagicOnly&&t.toUpperCase()!==t.toLowerCase()))return s;let h=(this.#h.nocase?"i":"")+(r?"u":"");return Object.assign(new RegExp(`^${e}$`,h),{_src:e,_glob:t})}get options(){return this.#h}toRegExpSource(t){let e=t??!!this.#h.dot;if(this.#t===this&&this.#a(),!this.type){let a=this.isStart()&&this.isEnd()&&!this.#r.some(f=>typeof f!="string"),l=this.#r.map(f=>{let[m,p,w,g]=typeof f=="string"?n.#E(f,this.#s,a):f.toRegExpSource(t);return this.#s=this.#s||w,this.#n=this.#n||g,m}).join(""),u="";if(this.isStart()&&typeof this.#r[0]=="string"&&!(this.#r.length===1&&Ts.has(this.#r[0]))){let m=Cs,p=e&&m.has(l.charAt(0))||l.startsWith("\\.")&&m.has(l.charAt(2))||l.startsWith("\\.\\.")&&m.has(l.charAt(4)),w=!e&&!t&&m.has(l.charAt(0));u=p?vs:w?Ct:"";}let c="";return this.isEnd()&&this.#t.#c&&this.#o?.type==="!"&&(c="(?:$|\\/)"),[u+l+c,W(l),this.#s=!!this.#s,this.#n]}let s=this.type==="*"||this.type==="+",i=this.type==="!"?"(?:(?!(?:":"(?:",r=this.#d(e);if(this.isStart()&&this.isEnd()&&!r&&this.type!=="!"){let a=this.toString();return this.#r=[a],this.type=null,this.#s=void 0,[a,W(this.toString()),false,false]}let o=!s||t||e||!Ct?"":this.#d(true);o===r&&(o=""),o&&(r=`(?:${r})(?:${o})*?`);let h="";if(this.type==="!"&&this.#f)h=(this.isStart()&&!e?Ct:"")+Ee;else {let a=this.type==="!"?"))"+(this.isStart()&&!e&&!t?Ct:"")+Se+")":this.type==="@"?")":this.type==="?"?")?":this.type==="+"&&o?")":this.type==="*"&&o?")?":`)${this.type}`;h=i+r+a;}return [h,W(r),this.#s=!!this.#s,this.#n]}#d(t){return this.#r.map(e=>{if(typeof e=="string")throw new Error("string type in extglob ast??");let[s,i,r,o]=e.toRegExpSource(t);return this.#n=this.#n||o,s}).filter(e=>!(this.isStart()&&this.isEnd())||!!e).join("|")}static#E(t,e,s=false){let i=false,r="",o=false,h=false;for(let a=0;a<t.length;a++){let l=t.charAt(a);if(i){i=false,r+=(As.has(l)?"\\":"")+l;continue}if(l==="*"){if(h)continue;h=true,r+=s&&/^[*]+$/.test(t)?Ee:Se,e=true;continue}else h=false;if(l==="\\"){a===t.length-1?r+="\\\\":i=true;continue}if(l==="["){let[u,c,d,f]=ye(t,a);if(d){r+=u,o=o||c,a+=d-1,e=e||f;continue}}if(l==="?"){r+=Kt,e=true;continue}r+=ks(l);}return [r,W(t),!!e,o]}};var tt=(n,{windowsPathsNoEscape:t=false,magicalBraces:e=false}={})=>e?t?n.replace(/[?*()[\]{}]/g,"[$&]"):n.replace(/[?*()[\]\\{}]/g,"\\$&"):t?n.replace(/[?*()[\]]/g,"[$&]"):n.replace(/[?*()[\]\\]/g,"\\$&");var O=(n,t,e={})=>(at(t),!e.nocomment&&t.charAt(0)==="#"?false:new D(t,e).match(n)),Rs=/^\*+([^+@!?\*\[\(]*)$/,Os=n=>t=>!t.startsWith(".")&&t.endsWith(n),Fs=n=>t=>t.endsWith(n),Ds=n=>(n=n.toLowerCase(),t=>!t.startsWith(".")&&t.toLowerCase().endsWith(n)),Ms=n=>(n=n.toLowerCase(),t=>t.toLowerCase().endsWith(n)),Ns=/^\*+\.\*+$/,_s=n=>!n.startsWith(".")&&n.includes("."),Ls=n=>n!=="."&&n!==".."&&n.includes("."),Ws=/^\.\*+$/,Ps=n=>n!=="."&&n!==".."&&n.startsWith("."),js=/^\*+$/,Is=n=>n.length!==0&&!n.startsWith("."),zs=n=>n.length!==0&&n!=="."&&n!=="..",Bs=/^\?+([^+@!?\*\[\(]*)?$/,Us=([n,t=""])=>{let e=Ce([n]);return t?(t=t.toLowerCase(),s=>e(s)&&s.toLowerCase().endsWith(t)):e},$s=([n,t=""])=>{let e=Te([n]);return t?(t=t.toLowerCase(),s=>e(s)&&s.toLowerCase().endsWith(t)):e},Gs=([n,t=""])=>{let e=Te([n]);return t?s=>e(s)&&s.endsWith(t):e},Hs=([n,t=""])=>{let e=Ce([n]);return t?s=>e(s)&&s.endsWith(t):e},Ce=([n])=>{let t=n.length;return e=>e.length===t&&!e.startsWith(".")},Te=([n])=>{let t=n.length;return e=>e.length===t&&e!=="."&&e!==".."},Ae=typeof process=="object"&&process?typeof process.env=="object"&&process.env&&process.env.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix",xe={win32:{sep:"\\"},posix:{sep:"/"}},qs=Ae==="win32"?xe.win32.sep:xe.posix.sep;O.sep=qs;var A=Symbol("globstar **");O.GLOBSTAR=A;var Ks="[^/]",Vs=Ks+"*?",Ys="(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",Xs="(?:(?!(?:\\/|^)\\.).)*?",Js=(n,t={})=>e=>O(e,n,t);O.filter=Js;var N=(n,t={})=>Object.assign({},n,t),Zs=n=>{if(!n||typeof n!="object"||!Object.keys(n).length)return O;let t=O;return Object.assign((s,i,r={})=>t(s,i,N(n,r)),{Minimatch:class extends t.Minimatch{constructor(i,r={}){super(i,N(n,r));}static defaults(i){return t.defaults(N(n,i)).Minimatch}},AST:class extends t.AST{constructor(i,r,o={}){super(i,r,N(n,o));}static fromGlob(i,r={}){return t.AST.fromGlob(i,N(n,r))}},unescape:(s,i={})=>t.unescape(s,N(n,i)),escape:(s,i={})=>t.escape(s,N(n,i)),filter:(s,i={})=>t.filter(s,N(n,i)),defaults:s=>t.defaults(N(n,s)),makeRe:(s,i={})=>t.makeRe(s,N(n,i)),braceExpand:(s,i={})=>t.braceExpand(s,N(n,i)),match:(s,i,r={})=>t.match(s,i,N(n,r)),sep:t.sep,GLOBSTAR:A})};O.defaults=Zs;var ke=(n,t={})=>(at(n),t.nobrace||!/\{(?:(?!\{).)*\}/.test(n)?[n]:ge(n,{max:t.braceExpandMax}));O.braceExpand=ke;var Qs=(n,t={})=>new D(n,t).makeRe();O.makeRe=Qs;var ti=(n,t,e={})=>{let s=new D(t,e);return n=n.filter(i=>s.match(i)),s.options.nonull&&!n.length&&n.push(t),n};O.match=ti;var ve=/[?*]|[+@!]\(.*?\)|\[|\]/,ei=n=>n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),D=class{options;set;pattern;windowsPathsNoEscape;nonegate;negate;comment;empty;preserveMultipleSlashes;partial;globSet;globParts;nocase;isWindows;platform;windowsNoMagicRoot;regexp;constructor(t,e={}){at(t),e=e||{},this.options=e,this.pattern=t,this.platform=e.platform||Ae,this.isWindows=this.platform==="win32";let s="allowWindowsEscape";this.windowsPathsNoEscape=!!e.windowsPathsNoEscape||e[s]===false,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!e.preserveMultipleSlashes,this.regexp=null,this.negate=false,this.nonegate=!!e.nonegate,this.comment=false,this.empty=false,this.partial=!!e.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=e.windowsNoMagicRoot!==void 0?e.windowsNoMagicRoot:!!(this.isWindows&&this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make();}hasMagic(){if(this.options.magicalBraces&&this.set.length>1)return  true;for(let t of this.set)for(let e of t)if(typeof e!="string")return  true;return  false}debug(...t){}make(){let t=this.pattern,e=this.options;if(!e.nocomment&&t.charAt(0)==="#"){this.comment=true;return}if(!t){this.empty=true;return}this.parseNegate(),this.globSet=[...new Set(this.braceExpand())],e.debug&&(this.debug=(...r)=>console.error(...r)),this.debug(this.pattern,this.globSet);let s=this.globSet.map(r=>this.slashSplit(r));this.globParts=this.preprocess(s),this.debug(this.pattern,this.globParts);let i=this.globParts.map((r,o,h)=>{if(this.isWindows&&this.windowsNoMagicRoot){let a=r[0]===""&&r[1]===""&&(r[2]==="?"||!ve.test(r[2]))&&!ve.test(r[3]),l=/^[a-z]:/i.test(r[0]);if(a)return [...r.slice(0,4),...r.slice(4).map(u=>this.parse(u))];if(l)return [r[0],...r.slice(1).map(u=>this.parse(u))]}return r.map(a=>this.parse(a))});if(this.debug(this.pattern,i),this.set=i.filter(r=>r.indexOf(false)===-1),this.isWindows)for(let r=0;r<this.set.length;r++){let o=this.set[r];o[0]===""&&o[1]===""&&this.globParts[r][2]==="?"&&typeof o[3]=="string"&&/^[a-z]:$/i.test(o[3])&&(o[2]="?");}this.debug(this.pattern,this.set);}preprocess(t){if(this.options.noglobstar)for(let s=0;s<t.length;s++)for(let i=0;i<t[s].length;i++)t[s][i]==="**"&&(t[s][i]="*");let{optimizationLevel:e=1}=this.options;return e>=2?(t=this.firstPhasePreProcess(t),t=this.secondPhasePreProcess(t)):e>=1?t=this.levelOneOptimize(t):t=this.adjascentGlobstarOptimize(t),t}adjascentGlobstarOptimize(t){return t.map(e=>{let s=-1;for(;(s=e.indexOf("**",s+1))!==-1;){let i=s;for(;e[i+1]==="**";)i++;i!==s&&e.splice(s,i-s);}return e})}levelOneOptimize(t){return t.map(e=>(e=e.reduce((s,i)=>{let r=s[s.length-1];return i==="**"&&r==="**"?s:i===".."&&r&&r!==".."&&r!=="."&&r!=="**"?(s.pop(),s):(s.push(i),s)},[]),e.length===0?[""]:e))}levelTwoFileOptimize(t){Array.isArray(t)||(t=this.slashSplit(t));let e=false;do{if(e=false,!this.preserveMultipleSlashes){for(let i=1;i<t.length-1;i++){let r=t[i];i===1&&r===""&&t[0]===""||(r==="."||r==="")&&(e=true,t.splice(i,1),i--);}t[0]==="."&&t.length===2&&(t[1]==="."||t[1]==="")&&(e=true,t.pop());}let s=0;for(;(s=t.indexOf("..",s+1))!==-1;){let i=t[s-1];i&&i!=="."&&i!==".."&&i!=="**"&&(e=true,t.splice(s-1,2),s-=2);}}while(e);return t.length===0?[""]:t}firstPhasePreProcess(t){let e=false;do{e=false;for(let s of t){let i=-1;for(;(i=s.indexOf("**",i+1))!==-1;){let o=i;for(;s[o+1]==="**";)o++;o>i&&s.splice(i+1,o-i);let h=s[i+1],a=s[i+2],l=s[i+3];if(h!==".."||!a||a==="."||a===".."||!l||l==="."||l==="..")continue;e=true,s.splice(i,1);let u=s.slice(0);u[i]="**",t.push(u),i--;}if(!this.preserveMultipleSlashes){for(let o=1;o<s.length-1;o++){let h=s[o];o===1&&h===""&&s[0]===""||(h==="."||h==="")&&(e=true,s.splice(o,1),o--);}s[0]==="."&&s.length===2&&(s[1]==="."||s[1]==="")&&(e=true,s.pop());}let r=0;for(;(r=s.indexOf("..",r+1))!==-1;){let o=s[r-1];if(o&&o!=="."&&o!==".."&&o!=="**"){e=true;let a=r===1&&s[r+1]==="**"?["."]:[];s.splice(r-1,2,...a),s.length===0&&s.push(""),r-=2;}}}}while(e);return t}secondPhasePreProcess(t){for(let e=0;e<t.length-1;e++)for(let s=e+1;s<t.length;s++){let i=this.partsMatch(t[e],t[s],!this.preserveMultipleSlashes);if(i){t[e]=[],t[s]=i;break}}return t.filter(e=>e.length)}partsMatch(t,e,s=false){let i=0,r=0,o=[],h="";for(;i<t.length&&r<e.length;)if(t[i]===e[r])o.push(h==="b"?e[r]:t[i]),i++,r++;else if(s&&t[i]==="**"&&e[r]===t[i+1])o.push(t[i]),i++;else if(s&&e[r]==="**"&&t[i]===e[r+1])o.push(e[r]),r++;else if(t[i]==="*"&&e[r]&&(this.options.dot||!e[r].startsWith("."))&&e[r]!=="**"){if(h==="b")return  false;h="a",o.push(t[i]),i++,r++;}else if(e[r]==="*"&&t[i]&&(this.options.dot||!t[i].startsWith("."))&&t[i]!=="**"){if(h==="a")return  false;h="b",o.push(e[r]),i++,r++;}else return  false;return t.length===e.length&&o}parseNegate(){if(this.nonegate)return;let t=this.pattern,e=false,s=0;for(let i=0;i<t.length&&t.charAt(i)==="!";i++)e=!e,s++;s&&(this.pattern=t.slice(s)),this.negate=e;}matchOne(t,e,s=false){let i=this.options;if(this.isWindows){let p=typeof t[0]=="string"&&/^[a-z]:$/i.test(t[0]),w=!p&&t[0]===""&&t[1]===""&&t[2]==="?"&&/^[a-z]:$/i.test(t[3]),g=typeof e[0]=="string"&&/^[a-z]:$/i.test(e[0]),S=!g&&e[0]===""&&e[1]===""&&e[2]==="?"&&typeof e[3]=="string"&&/^[a-z]:$/i.test(e[3]),E=w?3:p?0:void 0,y=S?3:g?0:void 0;if(typeof E=="number"&&typeof y=="number"){let[b,z]=[t[E],e[y]];b.toLowerCase()===z.toLowerCase()&&(e[y]=b,y>E?e=e.slice(y):E>y&&(t=t.slice(E)));}}let{optimizationLevel:r=1}=this.options;r>=2&&(t=this.levelTwoFileOptimize(t)),this.debug("matchOne",this,{file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var o=0,h=0,a=t.length,l=e.length;o<a&&h<l;o++,h++){this.debug("matchOne loop");var u=e[h],c=t[o];if(this.debug(e,u,c),u===false)return  false;if(u===A){this.debug("GLOBSTAR",[e,u,c]);var d=o,f=h+1;if(f===l){for(this.debug("** at the end");o<a;o++)if(t[o]==="."||t[o]===".."||!i.dot&&t[o].charAt(0)===".")return  false;return  true}for(;d<a;){var m=t[d];if(this.debug(`
globstar while`,t,d,e,f,m),this.matchOne(t.slice(d),e.slice(f),s))return this.debug("globstar found match!",d,a,m),true;if(m==="."||m===".."||!i.dot&&m.charAt(0)==="."){this.debug("dot detected!",t,d,e,f);break}this.debug("globstar swallow a segment, and continue"),d++;}return !!(s&&(this.debug(`
>>> no match, partial?`,t,d,e,f),d===a))}let p;if(typeof u=="string"?(p=c===u,this.debug("string match",u,c,p)):(p=u.test(c),this.debug("pattern match",u,c,p)),!p)return  false}if(o===a&&h===l)return  true;if(o===a)return s;if(h===l)return o===a-1&&t[o]==="";throw new Error("wtf?")}braceExpand(){return ke(this.pattern,this.options)}parse(t){at(t);let e=this.options;if(t==="**")return A;if(t==="")return "";let s,i=null;(s=t.match(js))?i=e.dot?zs:Is:(s=t.match(Rs))?i=(e.nocase?e.dot?Ms:Ds:e.dot?Fs:Os)(s[1]):(s=t.match(Bs))?i=(e.nocase?e.dot?$s:Us:e.dot?Gs:Hs)(s):(s=t.match(Ns))?i=e.dot?Ls:_s:(s=t.match(Ws))&&(i=Ps);let r=Q.fromGlob(t,this.options).toMMPattern();return i&&typeof r=="object"&&Reflect.defineProperty(r,"test",{value:i}),r}makeRe(){if(this.regexp||this.regexp===false)return this.regexp;let t=this.set;if(!t.length)return this.regexp=false,this.regexp;let e=this.options,s=e.noglobstar?Vs:e.dot?Ys:Xs,i=new Set(e.nocase?["i"]:[]),r=t.map(a=>{let l=a.map(c=>{if(c instanceof RegExp)for(let d of c.flags.split(""))i.add(d);return typeof c=="string"?ei(c):c===A?A:c._src});l.forEach((c,d)=>{let f=l[d+1],m=l[d-1];c!==A||m===A||(m===void 0?f!==void 0&&f!==A?l[d+1]="(?:\\/|"+s+"\\/)?"+f:l[d]=s:f===void 0?l[d-1]=m+"(?:\\/|\\/"+s+")?":f!==A&&(l[d-1]=m+"(?:\\/|\\/"+s+"\\/)"+f,l[d+1]=A));});let u=l.filter(c=>c!==A);if(this.partial&&u.length>=1){let c=[];for(let d=1;d<=u.length;d++)c.push(u.slice(0,d).join("/"));return "(?:"+c.join("|")+")"}return u.join("/")}).join("|"),[o,h]=t.length>1?["(?:",")"]:["",""];r="^"+o+r+h+"$",this.partial&&(r="^(?:\\/|"+o+r.slice(1,-1)+h+")$"),this.negate&&(r="^(?!"+r+").+$");try{this.regexp=new RegExp(r,[...i].join(""));}catch{this.regexp=false;}return this.regexp}slashSplit(t){return this.preserveMultipleSlashes?t.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(t)?["",...t.split(/\/+/)]:t.split(/\/+/)}match(t,e=this.partial){if(this.debug("match",t,this.pattern),this.comment)return  false;if(this.empty)return t==="";if(t==="/"&&e)return  true;let s=this.options;this.isWindows&&(t=t.split("\\").join("/"));let i=this.slashSplit(t);this.debug(this.pattern,"split",i);let r=this.set;this.debug(this.pattern,"set",r);let o=i[i.length-1];if(!o)for(let h=i.length-2;!o&&h>=0;h--)o=i[h];for(let h=0;h<r.length;h++){let a=r[h],l=i;if(s.matchBase&&a.length===1&&(l=[o]),this.matchOne(l,a,e))return s.flipNegate?true:!this.negate}return s.flipNegate?false:this.negate}static defaults(t){return O.defaults(t).Minimatch}};O.AST=Q;O.Minimatch=D;O.escape=tt;O.unescape=W;var si=typeof performance=="object"&&performance&&typeof performance.now=="function"?performance:Date,Oe=new Set,Vt=typeof process=="object"&&process?process:{},Fe=(n,t,e,s)=>{typeof Vt.emitWarning=="function"?Vt.emitWarning(n,t,e,s):console.error(`[${e}] ${t}: ${n}`);},At=globalThis.AbortController,Re=globalThis.AbortSignal;if(typeof At>"u"){Re=class{onabort;_onabort=[];reason;aborted=false;addEventListener(e,s){this._onabort.push(s);}},At=class{constructor(){t();}signal=new Re;abort(e){if(!this.signal.aborted){this.signal.reason=e,this.signal.aborted=true;for(let s of this.signal._onabort)s(e);this.signal.onabort?.(e);}}};let n=Vt.env?.LRU_CACHE_IGNORE_AC_WARNING!=="1",t=()=>{n&&(n=false,Fe("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.","NO_ABORT_CONTROLLER","ENOTSUP",t));};}var ii=n=>!Oe.has(n);var q=n=>n&&n===Math.floor(n)&&n>0&&isFinite(n),De=n=>q(n)?n<=Math.pow(2,8)?Uint8Array:n<=Math.pow(2,16)?Uint16Array:n<=Math.pow(2,32)?Uint32Array:n<=Number.MAX_SAFE_INTEGER?Tt:null:null,Tt=class extends Array{constructor(n){super(n),this.fill(0);}},ri=class ct{heap;length;static#t=false;static create(t){let e=De(t);if(!e)return [];ct.#t=true;let s=new ct(t,e);return ct.#t=false,s}constructor(t,e){if(!ct.#t)throw new TypeError("instantiate Stack using Stack.create(n)");this.heap=new e(t),this.length=0;}push(t){this.heap[this.length++]=t;}pop(){return this.heap[--this.length]}},ft=class Me{#t;#s;#n;#r;#o;#S;#w;#c;get perf(){return this.#c}ttl;ttlResolution;ttlAutopurge;updateAgeOnGet;updateAgeOnHas;allowStale;noDisposeOnSet;noUpdateTTL;maxEntrySize;sizeCalculation;noDeleteOnFetchRejection;noDeleteOnStaleGet;allowStaleOnFetchAbort;allowStaleOnFetchRejection;ignoreFetchAbort;#h;#u;#f;#a;#i;#d;#E;#b;#p;#R;#m;#C;#T;#g;#y;#x;#A;#e;#_;static unsafeExposeInternals(t){return {starts:t.#T,ttls:t.#g,autopurgeTimers:t.#y,sizes:t.#C,keyMap:t.#f,keyList:t.#a,valList:t.#i,next:t.#d,prev:t.#E,get head(){return t.#b},get tail(){return t.#p},free:t.#R,isBackgroundFetch:e=>t.#l(e),backgroundFetch:(e,s,i,r)=>t.#U(e,s,i,r),moveToTail:e=>t.#W(e),indexes:e=>t.#F(e),rindexes:e=>t.#D(e),isStale:e=>t.#v(e)}}get max(){return this.#t}get maxSize(){return this.#s}get calculatedSize(){return this.#u}get size(){return this.#h}get fetchMethod(){return this.#S}get memoMethod(){return this.#w}get dispose(){return this.#n}get onInsert(){return this.#r}get disposeAfter(){return this.#o}constructor(t){let{max:e=0,ttl:s,ttlResolution:i=1,ttlAutopurge:r,updateAgeOnGet:o,updateAgeOnHas:h,allowStale:a,dispose:l,onInsert:u,disposeAfter:c,noDisposeOnSet:d,noUpdateTTL:f,maxSize:m=0,maxEntrySize:p=0,sizeCalculation:w,fetchMethod:g,memoMethod:S,noDeleteOnFetchRejection:E,noDeleteOnStaleGet:y,allowStaleOnFetchRejection:b,allowStaleOnFetchAbort:z,ignoreFetchAbort:$,perf:J}=t;if(J!==void 0&&typeof J?.now!="function")throw new TypeError("perf option must have a now() method if specified");if(this.#c=J??si,e!==0&&!q(e))throw new TypeError("max option must be a nonnegative integer");let Z=e?De(e):Array;if(!Z)throw new Error("invalid max value: "+e);if(this.#t=e,this.#s=m,this.maxEntrySize=p||this.#s,this.sizeCalculation=w,this.sizeCalculation){if(!this.#s&&!this.maxEntrySize)throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");if(typeof this.sizeCalculation!="function")throw new TypeError("sizeCalculation set to non-function")}if(S!==void 0&&typeof S!="function")throw new TypeError("memoMethod must be a function if defined");if(this.#w=S,g!==void 0&&typeof g!="function")throw new TypeError("fetchMethod must be a function if specified");if(this.#S=g,this.#A=!!g,this.#f=new Map,this.#a=new Array(e).fill(void 0),this.#i=new Array(e).fill(void 0),this.#d=new Z(e),this.#E=new Z(e),this.#b=0,this.#p=0,this.#R=ri.create(e),this.#h=0,this.#u=0,typeof l=="function"&&(this.#n=l),typeof u=="function"&&(this.#r=u),typeof c=="function"?(this.#o=c,this.#m=[]):(this.#o=void 0,this.#m=void 0),this.#x=!!this.#n,this.#_=!!this.#r,this.#e=!!this.#o,this.noDisposeOnSet=!!d,this.noUpdateTTL=!!f,this.noDeleteOnFetchRejection=!!E,this.allowStaleOnFetchRejection=!!b,this.allowStaleOnFetchAbort=!!z,this.ignoreFetchAbort=!!$,this.maxEntrySize!==0){if(this.#s!==0&&!q(this.#s))throw new TypeError("maxSize must be a positive integer if specified");if(!q(this.maxEntrySize))throw new TypeError("maxEntrySize must be a positive integer if specified");this.#G();}if(this.allowStale=!!a,this.noDeleteOnStaleGet=!!y,this.updateAgeOnGet=!!o,this.updateAgeOnHas=!!h,this.ttlResolution=q(i)||i===0?i:1,this.ttlAutopurge=!!r,this.ttl=s||0,this.ttl){if(!q(this.ttl))throw new TypeError("ttl must be a positive integer if specified");this.#M();}if(this.#t===0&&this.ttl===0&&this.#s===0)throw new TypeError("At least one of max, maxSize, or ttl is required");if(!this.ttlAutopurge&&!this.#t&&!this.#s){let $t="LRU_CACHE_UNBOUNDED";ii($t)&&(Oe.add($t),Fe("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.","UnboundedCacheWarning",$t,Me));}}getRemainingTTL(t){return this.#f.has(t)?1/0:0}#M(){let t=new Tt(this.#t),e=new Tt(this.#t);this.#g=t,this.#T=e;let s=this.ttlAutopurge?new Array(this.#t):void 0;this.#y=s,this.#j=(o,h,a=this.#c.now())=>{if(e[o]=h!==0?a:0,t[o]=h,s?.[o]&&(clearTimeout(s[o]),s[o]=void 0),h!==0&&s){let l=setTimeout(()=>{this.#v(o)&&this.#O(this.#a[o],"expire");},h+1);l.unref&&l.unref(),s[o]=l;}},this.#k=o=>{e[o]=t[o]!==0?this.#c.now():0;},this.#N=(o,h)=>{if(t[h]){let a=t[h],l=e[h];if(!a||!l)return;o.ttl=a,o.start=l,o.now=i||r();let u=o.now-l;o.remainingTTL=a-u;}};let i=0,r=()=>{let o=this.#c.now();if(this.ttlResolution>0){i=o;let h=setTimeout(()=>i=0,this.ttlResolution);h.unref&&h.unref();}return o};this.getRemainingTTL=o=>{let h=this.#f.get(o);if(h===void 0)return 0;let a=t[h],l=e[h];if(!a||!l)return 1/0;let u=(i||r())-l;return a-u},this.#v=o=>{let h=e[o],a=t[o];return !!a&&!!h&&(i||r())-h>a};}#k=()=>{};#N=()=>{};#j=()=>{};#v=()=>false;#G(){let t=new Tt(this.#t);this.#u=0,this.#C=t,this.#P=e=>{this.#u-=t[e],t[e]=0;},this.#I=(e,s,i,r)=>{if(this.#l(s))return 0;if(!q(i))if(r){if(typeof r!="function")throw new TypeError("sizeCalculation must be a function");if(i=r(s,e),!q(i))throw new TypeError("sizeCalculation return invalid (expect positive integer)")}else throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");return i},this.#L=(e,s,i)=>{if(t[e]=s,this.#s){let r=this.#s-t[e];for(;this.#u>r;)this.#B(true);}this.#u+=t[e],i&&(i.entrySize=s,i.totalCalculatedSize=this.#u);};}#P=t=>{};#L=(t,e,s)=>{};#I=(t,e,s,i)=>{if(s||i)throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");return 0};*#F({allowStale:t=this.allowStale}={}){if(this.#h)for(let e=this.#p;!(!this.#z(e)||((t||!this.#v(e))&&(yield e),e===this.#b));)e=this.#E[e];}*#D({allowStale:t=this.allowStale}={}){if(this.#h)for(let e=this.#b;!(!this.#z(e)||((t||!this.#v(e))&&(yield e),e===this.#p));)e=this.#d[e];}#z(t){return t!==void 0&&this.#f.get(this.#a[t])===t}*entries(){for(let t of this.#F())this.#i[t]!==void 0&&this.#a[t]!==void 0&&!this.#l(this.#i[t])&&(yield [this.#a[t],this.#i[t]]);}*rentries(){for(let t of this.#D())this.#i[t]!==void 0&&this.#a[t]!==void 0&&!this.#l(this.#i[t])&&(yield [this.#a[t],this.#i[t]]);}*keys(){for(let t of this.#F()){let e=this.#a[t];e!==void 0&&!this.#l(this.#i[t])&&(yield e);}}*rkeys(){for(let t of this.#D()){let e=this.#a[t];e!==void 0&&!this.#l(this.#i[t])&&(yield e);}}*values(){for(let t of this.#F())this.#i[t]!==void 0&&!this.#l(this.#i[t])&&(yield this.#i[t]);}*rvalues(){for(let t of this.#D())this.#i[t]!==void 0&&!this.#l(this.#i[t])&&(yield this.#i[t]);}[Symbol.iterator](){return this.entries()}[Symbol.toStringTag]="LRUCache";find(t,e={}){for(let s of this.#F()){let i=this.#i[s],r=this.#l(i)?i.__staleWhileFetching:i;if(r!==void 0&&t(r,this.#a[s],this))return this.get(this.#a[s],e)}}forEach(t,e=this){for(let s of this.#F()){let i=this.#i[s],r=this.#l(i)?i.__staleWhileFetching:i;r!==void 0&&t.call(e,r,this.#a[s],this);}}rforEach(t,e=this){for(let s of this.#D()){let i=this.#i[s],r=this.#l(i)?i.__staleWhileFetching:i;r!==void 0&&t.call(e,r,this.#a[s],this);}}purgeStale(){let t=false;for(let e of this.#D({allowStale:true}))this.#v(e)&&(this.#O(this.#a[e],"expire"),t=true);return t}info(t){let e=this.#f.get(t);if(e===void 0)return;let s=this.#i[e],i=this.#l(s)?s.__staleWhileFetching:s;if(i===void 0)return;let r={value:i};if(this.#g&&this.#T){let o=this.#g[e],h=this.#T[e];if(o&&h){let a=o-(this.#c.now()-h);r.ttl=a,r.start=Date.now();}}return this.#C&&(r.size=this.#C[e]),r}dump(){let t=[];for(let e of this.#F({allowStale:true})){let s=this.#a[e],i=this.#i[e],r=this.#l(i)?i.__staleWhileFetching:i;if(r===void 0||s===void 0)continue;let o={value:r};if(this.#g&&this.#T){o.ttl=this.#g[e];let h=this.#c.now()-this.#T[e];o.start=Math.floor(Date.now()-h);}this.#C&&(o.size=this.#C[e]),t.unshift([s,o]);}return t}load(t){this.clear();for(let[e,s]of t){if(s.start){let i=Date.now()-s.start;s.start=this.#c.now()-i;}this.set(e,s.value,s);}}set(t,e,s={}){if(e===void 0)return this.delete(t),this;let{ttl:i=this.ttl,start:r,noDisposeOnSet:o=this.noDisposeOnSet,sizeCalculation:h=this.sizeCalculation,status:a}=s,{noUpdateTTL:l=this.noUpdateTTL}=s,u=this.#I(t,e,s.size||0,h);if(this.maxEntrySize&&u>this.maxEntrySize)return a&&(a.set="miss",a.maxEntrySizeExceeded=true),this.#O(t,"set"),this;let c=this.#h===0?void 0:this.#f.get(t);if(c===void 0)c=this.#h===0?this.#p:this.#R.length!==0?this.#R.pop():this.#h===this.#t?this.#B(false):this.#h,this.#a[c]=t,this.#i[c]=e,this.#f.set(t,c),this.#d[this.#p]=c,this.#E[c]=this.#p,this.#p=c,this.#h++,this.#L(c,u,a),a&&(a.set="add"),l=false,this.#_&&this.#r?.(e,t,"add");else {this.#W(c);let d=this.#i[c];if(e!==d){if(this.#A&&this.#l(d)){d.__abortController.abort(new Error("replaced"));let{__staleWhileFetching:f}=d;f!==void 0&&!o&&(this.#x&&this.#n?.(f,t,"set"),this.#e&&this.#m?.push([f,t,"set"]));}else o||(this.#x&&this.#n?.(d,t,"set"),this.#e&&this.#m?.push([d,t,"set"]));if(this.#P(c),this.#L(c,u,a),this.#i[c]=e,a){a.set="replace";let f=d&&this.#l(d)?d.__staleWhileFetching:d;f!==void 0&&(a.oldValue=f);}}else a&&(a.set="update");this.#_&&this.onInsert?.(e,t,e===d?"update":"replace");}if(i!==0&&!this.#g&&this.#M(),this.#g&&(l||this.#j(c,i,r),a&&this.#N(a,c)),!o&&this.#e&&this.#m){let d=this.#m,f;for(;f=d?.shift();)this.#o?.(...f);}return this}pop(){try{for(;this.#h;){let t=this.#i[this.#b];if(this.#B(!0),this.#l(t)){if(t.__staleWhileFetching)return t.__staleWhileFetching}else if(t!==void 0)return t}}finally{if(this.#e&&this.#m){let t=this.#m,e;for(;e=t?.shift();)this.#o?.(...e);}}}#B(t){let e=this.#b,s=this.#a[e],i=this.#i[e];return this.#A&&this.#l(i)?i.__abortController.abort(new Error("evicted")):(this.#x||this.#e)&&(this.#x&&this.#n?.(i,s,"evict"),this.#e&&this.#m?.push([i,s,"evict"])),this.#P(e),this.#y?.[e]&&(clearTimeout(this.#y[e]),this.#y[e]=void 0),t&&(this.#a[e]=void 0,this.#i[e]=void 0,this.#R.push(e)),this.#h===1?(this.#b=this.#p=0,this.#R.length=0):this.#b=this.#d[e],this.#f.delete(s),this.#h--,e}has(t,e={}){let{updateAgeOnHas:s=this.updateAgeOnHas,status:i}=e,r=this.#f.get(t);if(r!==void 0){let o=this.#i[r];if(this.#l(o)&&o.__staleWhileFetching===void 0)return  false;if(this.#v(r))i&&(i.has="stale",this.#N(i,r));else return s&&this.#k(r),i&&(i.has="hit",this.#N(i,r)),true}else i&&(i.has="miss");return  false}peek(t,e={}){let{allowStale:s=this.allowStale}=e,i=this.#f.get(t);if(i===void 0||!s&&this.#v(i))return;let r=this.#i[i];return this.#l(r)?r.__staleWhileFetching:r}#U(t,e,s,i){let r=e===void 0?void 0:this.#i[e];if(this.#l(r))return r;let o=new At,{signal:h}=s;h?.addEventListener("abort",()=>o.abort(h.reason),{signal:o.signal});let a={signal:o.signal,options:s,context:i},l=(p,w=false)=>{let{aborted:g}=o.signal,S=s.ignoreFetchAbort&&p!==void 0,E=s.ignoreFetchAbort||!!(s.allowStaleOnFetchAbort&&p!==void 0);if(s.status&&(g&&!w?(s.status.fetchAborted=true,s.status.fetchError=o.signal.reason,S&&(s.status.fetchAbortIgnored=true)):s.status.fetchResolved=true),g&&!S&&!w)return c(o.signal.reason,E);let y=f,b=this.#i[e];return (b===f||S&&w&&b===void 0)&&(p===void 0?y.__staleWhileFetching!==void 0?this.#i[e]=y.__staleWhileFetching:this.#O(t,"fetch"):(s.status&&(s.status.fetchUpdated=true),this.set(t,p,a.options))),p},u=p=>(s.status&&(s.status.fetchRejected=true,s.status.fetchError=p),c(p,false)),c=(p,w)=>{let{aborted:g}=o.signal,S=g&&s.allowStaleOnFetchAbort,E=S||s.allowStaleOnFetchRejection,y=E||s.noDeleteOnFetchRejection,b=f;if(this.#i[e]===f&&(!y||!w&&b.__staleWhileFetching===void 0?this.#O(t,"fetch"):S||(this.#i[e]=b.__staleWhileFetching)),E)return s.status&&b.__staleWhileFetching!==void 0&&(s.status.returnedStale=true),b.__staleWhileFetching;if(b.__returned===b)throw p},d=(p,w)=>{let g=this.#S?.(t,r,a);g&&g instanceof Promise&&g.then(S=>p(S===void 0?void 0:S),w),o.signal.addEventListener("abort",()=>{(!s.ignoreFetchAbort||s.allowStaleOnFetchAbort)&&(p(void 0),s.allowStaleOnFetchAbort&&(p=S=>l(S,true)));});};s.status&&(s.status.fetchDispatched=true);let f=new Promise(d).then(l,u),m=Object.assign(f,{__abortController:o,__staleWhileFetching:r,__returned:void 0});return e===void 0?(this.set(t,m,{...a.options,status:void 0}),e=this.#f.get(t)):this.#i[e]=m,m}#l(t){if(!this.#A)return  false;let e=t;return !!e&&e instanceof Promise&&e.hasOwnProperty("__staleWhileFetching")&&e.__abortController instanceof At}async fetch(t,e={}){let{allowStale:s=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:r=this.noDeleteOnStaleGet,ttl:o=this.ttl,noDisposeOnSet:h=this.noDisposeOnSet,size:a=0,sizeCalculation:l=this.sizeCalculation,noUpdateTTL:u=this.noUpdateTTL,noDeleteOnFetchRejection:c=this.noDeleteOnFetchRejection,allowStaleOnFetchRejection:d=this.allowStaleOnFetchRejection,ignoreFetchAbort:f=this.ignoreFetchAbort,allowStaleOnFetchAbort:m=this.allowStaleOnFetchAbort,context:p,forceRefresh:w=false,status:g,signal:S}=e;if(!this.#A)return g&&(g.fetch="get"),this.get(t,{allowStale:s,updateAgeOnGet:i,noDeleteOnStaleGet:r,status:g});let E={allowStale:s,updateAgeOnGet:i,noDeleteOnStaleGet:r,ttl:o,noDisposeOnSet:h,size:a,sizeCalculation:l,noUpdateTTL:u,noDeleteOnFetchRejection:c,allowStaleOnFetchRejection:d,allowStaleOnFetchAbort:m,ignoreFetchAbort:f,status:g,signal:S},y=this.#f.get(t);if(y===void 0){g&&(g.fetch="miss");let b=this.#U(t,y,E,p);return b.__returned=b}else {let b=this.#i[y];if(this.#l(b)){let Z=s&&b.__staleWhileFetching!==void 0;return g&&(g.fetch="inflight",Z&&(g.returnedStale=true)),Z?b.__staleWhileFetching:b.__returned=b}let z=this.#v(y);if(!w&&!z)return g&&(g.fetch="hit"),this.#W(y),i&&this.#k(y),g&&this.#N(g,y),b;let $=this.#U(t,y,E,p),J=$.__staleWhileFetching!==void 0&&s;return g&&(g.fetch=z?"stale":"refresh",J&&z&&(g.returnedStale=true)),J?$.__staleWhileFetching:$.__returned=$}}async forceFetch(t,e={}){let s=await this.fetch(t,e);if(s===void 0)throw new Error("fetch() returned undefined");return s}memo(t,e={}){let s=this.#w;if(!s)throw new Error("no memoMethod provided to constructor");let{context:i,forceRefresh:r,...o}=e,h=this.get(t,o);if(!r&&h!==void 0)return h;let a=s(t,h,{options:o,context:i});return this.set(t,a,o),a}get(t,e={}){let{allowStale:s=this.allowStale,updateAgeOnGet:i=this.updateAgeOnGet,noDeleteOnStaleGet:r=this.noDeleteOnStaleGet,status:o}=e,h=this.#f.get(t);if(h!==void 0){let a=this.#i[h],l=this.#l(a);return o&&this.#N(o,h),this.#v(h)?(o&&(o.get="stale"),l?(o&&s&&a.__staleWhileFetching!==void 0&&(o.returnedStale=true),s?a.__staleWhileFetching:void 0):(r||this.#O(t,"expire"),o&&s&&(o.returnedStale=true),s?a:void 0)):(o&&(o.get="hit"),l?a.__staleWhileFetching:(this.#W(h),i&&this.#k(h),a))}else o&&(o.get="miss");}#$(t,e){this.#E[e]=t,this.#d[t]=e;}#W(t){t!==this.#p&&(t===this.#b?this.#b=this.#d[t]:this.#$(this.#E[t],this.#d[t]),this.#$(this.#p,t),this.#p=t);}delete(t){return this.#O(t,"delete")}#O(t,e){let s=false;if(this.#h!==0){let i=this.#f.get(t);if(i!==void 0)if(this.#y?.[i]&&(clearTimeout(this.#y?.[i]),this.#y[i]=void 0),s=true,this.#h===1)this.#H(e);else {this.#P(i);let r=this.#i[i];if(this.#l(r)?r.__abortController.abort(new Error("deleted")):(this.#x||this.#e)&&(this.#x&&this.#n?.(r,t,e),this.#e&&this.#m?.push([r,t,e])),this.#f.delete(t),this.#a[i]=void 0,this.#i[i]=void 0,i===this.#p)this.#p=this.#E[i];else if(i===this.#b)this.#b=this.#d[i];else {let o=this.#E[i];this.#d[o]=this.#d[i];let h=this.#d[i];this.#E[h]=this.#E[i];}this.#h--,this.#R.push(i);}}if(this.#e&&this.#m?.length){let i=this.#m,r;for(;r=i?.shift();)this.#o?.(...r);}return s}clear(){return this.#H("delete")}#H(t){for(let e of this.#D({allowStale:true})){let s=this.#i[e];if(this.#l(s))s.__abortController.abort(new Error("deleted"));else {let i=this.#a[e];this.#x&&this.#n?.(s,i,t),this.#e&&this.#m?.push([s,i,t]);}}if(this.#f.clear(),this.#i.fill(void 0),this.#a.fill(void 0),this.#g&&this.#T){this.#g.fill(0),this.#T.fill(0);for(let e of this.#y??[])e!==void 0&&clearTimeout(e);this.#y?.fill(void 0);}if(this.#C&&this.#C.fill(0),this.#b=0,this.#p=0,this.#R.length=0,this.#u=0,this.#h=0,this.#e&&this.#m){let e=this.#m,s;for(;s=e?.shift();)this.#o?.(...s);}}};var Ne=typeof process=="object"&&process?process:{stdout:null,stderr:null},oi=n=>!!n&&typeof n=="object"&&(n instanceof V||n instanceof Pe||hi(n)||ai(n)),hi=n=>!!n&&typeof n=="object"&&n instanceof EventEmitter$1&&typeof n.pipe=="function"&&n.pipe!==Pe.Writable.prototype.pipe,ai=n=>!!n&&typeof n=="object"&&n instanceof EventEmitter$1&&typeof n.write=="function"&&typeof n.end=="function",G=Symbol("EOF"),H=Symbol("maybeEmitEnd"),K=Symbol("emittedEnd"),kt=Symbol("emittingEnd"),ut=Symbol("emittedError"),Rt=Symbol("closed"),_e=Symbol("read"),Ot=Symbol("flush"),Le=Symbol("flushChunk"),P=Symbol("encoding"),et=Symbol("decoder"),v=Symbol("flowing"),dt=Symbol("paused"),st=Symbol("resume"),C=Symbol("buffer"),F=Symbol("pipes"),T=Symbol("bufferLength"),Yt=Symbol("bufferPush"),Ft=Symbol("bufferShift"),k=Symbol("objectMode"),x=Symbol("destroyed"),Xt=Symbol("error"),Jt=Symbol("emitData"),We=Symbol("emitEnd"),Zt=Symbol("emitEnd2"),B=Symbol("async"),Qt=Symbol("abort"),Dt=Symbol("aborted"),pt=Symbol("signal"),Y=Symbol("dataListeners"),M=Symbol("discarded"),mt=n=>Promise.resolve().then(n),li=n=>n(),ci=n=>n==="end"||n==="finish"||n==="prefinish",fi=n=>n instanceof ArrayBuffer||!!n&&typeof n=="object"&&n.constructor&&n.constructor.name==="ArrayBuffer"&&n.byteLength>=0,ui=n=>!Buffer.isBuffer(n)&&ArrayBuffer.isView(n),Mt=class{src;dest;opts;ondrain;constructor(t,e,s){this.src=t,this.dest=e,this.opts=s,this.ondrain=()=>t[st](),this.dest.on("drain",this.ondrain);}unpipe(){this.dest.removeListener("drain",this.ondrain);}proxyErrors(t){}end(){this.unpipe(),this.opts.end&&this.dest.end();}},te=class extends Mt{unpipe(){this.src.removeListener("error",this.proxyErrors),super.unpipe();}constructor(t,e,s){super(t,e,s),this.proxyErrors=i=>this.dest.emit("error",i),t.on("error",this.proxyErrors);}},di=n=>!!n.objectMode,pi=n=>!n.objectMode&&!!n.encoding&&n.encoding!=="buffer",V=class extends EventEmitter$1{[v]=false;[dt]=false;[F]=[];[C]=[];[k];[P];[B];[et];[G]=false;[K]=false;[kt]=false;[Rt]=false;[ut]=null;[T]=0;[x]=false;[pt];[Dt]=false;[Y]=0;[M]=false;writable=true;readable=true;constructor(...t){let e=t[0]||{};if(super(),e.objectMode&&typeof e.encoding=="string")throw new TypeError("Encoding and objectMode may not be used together");di(e)?(this[k]=true,this[P]=null):pi(e)?(this[P]=e.encoding,this[k]=false):(this[k]=false,this[P]=null),this[B]=!!e.async,this[et]=this[P]?new StringDecoder(this[P]):null,e&&e.debugExposeBuffer===true&&Object.defineProperty(this,"buffer",{get:()=>this[C]}),e&&e.debugExposePipes===true&&Object.defineProperty(this,"pipes",{get:()=>this[F]});let{signal:s}=e;s&&(this[pt]=s,s.aborted?this[Qt]():s.addEventListener("abort",()=>this[Qt]()));}get bufferLength(){return this[T]}get encoding(){return this[P]}set encoding(t){throw new Error("Encoding must be set at instantiation time")}setEncoding(t){throw new Error("Encoding must be set at instantiation time")}get objectMode(){return this[k]}set objectMode(t){throw new Error("objectMode must be set at instantiation time")}get async(){return this[B]}set async(t){this[B]=this[B]||!!t;}[Qt](){this[Dt]=true,this.emit("abort",this[pt]?.reason),this.destroy(this[pt]?.reason);}get aborted(){return this[Dt]}set aborted(t){}write(t,e,s){if(this[Dt])return  false;if(this[G])throw new Error("write after end");if(this[x])return this.emit("error",Object.assign(new Error("Cannot call write after a stream was destroyed"),{code:"ERR_STREAM_DESTROYED"})),true;typeof e=="function"&&(s=e,e="utf8"),e||(e="utf8");let i=this[B]?mt:li;if(!this[k]&&!Buffer.isBuffer(t)){if(ui(t))t=Buffer.from(t.buffer,t.byteOffset,t.byteLength);else if(fi(t))t=Buffer.from(t);else if(typeof t!="string")throw new Error("Non-contiguous data written to non-objectMode stream")}return this[k]?(this[v]&&this[T]!==0&&this[Ot](true),this[v]?this.emit("data",t):this[Yt](t),this[T]!==0&&this.emit("readable"),s&&i(s),this[v]):t.length?(typeof t=="string"&&!(e===this[P]&&!this[et]?.lastNeed)&&(t=Buffer.from(t,e)),Buffer.isBuffer(t)&&this[P]&&(t=this[et].write(t)),this[v]&&this[T]!==0&&this[Ot](true),this[v]?this.emit("data",t):this[Yt](t),this[T]!==0&&this.emit("readable"),s&&i(s),this[v]):(this[T]!==0&&this.emit("readable"),s&&i(s),this[v])}read(t){if(this[x])return null;if(this[M]=false,this[T]===0||t===0||t&&t>this[T])return this[H](),null;this[k]&&(t=null),this[C].length>1&&!this[k]&&(this[C]=[this[P]?this[C].join(""):Buffer.concat(this[C],this[T])]);let e=this[_e](t||null,this[C][0]);return this[H](),e}[_e](t,e){if(this[k])this[Ft]();else {let s=e;t===s.length||t===null?this[Ft]():typeof s=="string"?(this[C][0]=s.slice(t),e=s.slice(0,t),this[T]-=t):(this[C][0]=s.subarray(t),e=s.subarray(0,t),this[T]-=t);}return this.emit("data",e),!this[C].length&&!this[G]&&this.emit("drain"),e}end(t,e,s){return typeof t=="function"&&(s=t,t=void 0),typeof e=="function"&&(s=e,e="utf8"),t!==void 0&&this.write(t,e),s&&this.once("end",s),this[G]=true,this.writable=false,(this[v]||!this[dt])&&this[H](),this}[st](){this[x]||(!this[Y]&&!this[F].length&&(this[M]=true),this[dt]=false,this[v]=true,this.emit("resume"),this[C].length?this[Ot]():this[G]?this[H]():this.emit("drain"));}resume(){return this[st]()}pause(){this[v]=false,this[dt]=true,this[M]=false;}get destroyed(){return this[x]}get flowing(){return this[v]}get paused(){return this[dt]}[Yt](t){this[k]?this[T]+=1:this[T]+=t.length,this[C].push(t);}[Ft](){return this[k]?this[T]-=1:this[T]-=this[C][0].length,this[C].shift()}[Ot](t=false){do;while(this[Le](this[Ft]())&&this[C].length);!t&&!this[C].length&&!this[G]&&this.emit("drain");}[Le](t){return this.emit("data",t),this[v]}pipe(t,e){if(this[x])return t;this[M]=false;let s=this[K];return e=e||{},t===Ne.stdout||t===Ne.stderr?e.end=false:e.end=e.end!==false,e.proxyErrors=!!e.proxyErrors,s?e.end&&t.end():(this[F].push(e.proxyErrors?new te(this,t,e):new Mt(this,t,e)),this[B]?mt(()=>this[st]()):this[st]()),t}unpipe(t){let e=this[F].find(s=>s.dest===t);e&&(this[F].length===1?(this[v]&&this[Y]===0&&(this[v]=false),this[F]=[]):this[F].splice(this[F].indexOf(e),1),e.unpipe());}addListener(t,e){return this.on(t,e)}on(t,e){let s=super.on(t,e);if(t==="data")this[M]=false,this[Y]++,!this[F].length&&!this[v]&&this[st]();else if(t==="readable"&&this[T]!==0)super.emit("readable");else if(ci(t)&&this[K])super.emit(t),this.removeAllListeners(t);else if(t==="error"&&this[ut]){let i=e;this[B]?mt(()=>i.call(this,this[ut])):i.call(this,this[ut]);}return s}removeListener(t,e){return this.off(t,e)}off(t,e){let s=super.off(t,e);return t==="data"&&(this[Y]=this.listeners("data").length,this[Y]===0&&!this[M]&&!this[F].length&&(this[v]=false)),s}removeAllListeners(t){let e=super.removeAllListeners(t);return (t==="data"||t===void 0)&&(this[Y]=0,!this[M]&&!this[F].length&&(this[v]=false)),e}get emittedEnd(){return this[K]}[H](){!this[kt]&&!this[K]&&!this[x]&&this[C].length===0&&this[G]&&(this[kt]=true,this.emit("end"),this.emit("prefinish"),this.emit("finish"),this[Rt]&&this.emit("close"),this[kt]=false);}emit(t,...e){let s=e[0];if(t!=="error"&&t!=="close"&&t!==x&&this[x])return  false;if(t==="data")return !this[k]&&!s?false:this[B]?(mt(()=>this[Jt](s)),true):this[Jt](s);if(t==="end")return this[We]();if(t==="close"){if(this[Rt]=true,!this[K]&&!this[x])return  false;let r=super.emit("close");return this.removeAllListeners("close"),r}else if(t==="error"){this[ut]=s,super.emit(Xt,s);let r=!this[pt]||this.listeners("error").length?super.emit("error",s):false;return this[H](),r}else if(t==="resume"){let r=super.emit("resume");return this[H](),r}else if(t==="finish"||t==="prefinish"){let r=super.emit(t);return this.removeAllListeners(t),r}let i=super.emit(t,...e);return this[H](),i}[Jt](t){for(let s of this[F])s.dest.write(t)===false&&this.pause();let e=this[M]?false:super.emit("data",t);return this[H](),e}[We](){return this[K]?false:(this[K]=true,this.readable=false,this[B]?(mt(()=>this[Zt]()),true):this[Zt]())}[Zt](){if(this[et]){let e=this[et].end();if(e){for(let s of this[F])s.dest.write(e);this[M]||super.emit("data",e);}}for(let e of this[F])e.end();let t=super.emit("end");return this.removeAllListeners("end"),t}async collect(){let t=Object.assign([],{dataLength:0});this[k]||(t.dataLength=0);let e=this.promise();return this.on("data",s=>{t.push(s),this[k]||(t.dataLength+=s.length);}),await e,t}async concat(){if(this[k])throw new Error("cannot concat in objectMode");let t=await this.collect();return this[P]?t.join(""):Buffer.concat(t,t.dataLength)}async promise(){return new Promise((t,e)=>{this.on(x,()=>e(new Error("stream destroyed"))),this.on("error",s=>e(s)),this.on("end",()=>t());})}[Symbol.asyncIterator](){this[M]=false;let t=false,e=async()=>(this.pause(),t=true,{value:void 0,done:true});return {next:()=>{if(t)return e();let i=this.read();if(i!==null)return Promise.resolve({done:false,value:i});if(this[G])return e();let r,o,h=c=>{this.off("data",a),this.off("end",l),this.off(x,u),e(),o(c);},a=c=>{this.off("error",h),this.off("end",l),this.off(x,u),this.pause(),r({value:c,done:!!this[G]});},l=()=>{this.off("error",h),this.off("data",a),this.off(x,u),e(),r({done:true,value:void 0});},u=()=>h(new Error("stream destroyed"));return new Promise((c,d)=>{o=d,r=c,this.once(x,u),this.once("error",h),this.once("end",l),this.once("data",a);})},throw:e,return:e,[Symbol.asyncIterator](){return this},[Symbol.asyncDispose]:async()=>{}}}[Symbol.iterator](){this[M]=false;let t=false,e=()=>(this.pause(),this.off(Xt,e),this.off(x,e),this.off("end",e),t=true,{done:true,value:void 0}),s=()=>{if(t)return e();let i=this.read();return i===null?e():{done:false,value:i}};return this.once("end",e),this.once(Xt,e),this.once(x,e),{next:s,throw:e,return:e,[Symbol.iterator](){return this},[Symbol.dispose]:()=>{}}}destroy(t){if(this[x])return t?this.emit("error",t):this.emit(x),this;this[x]=true,this[M]=true,this[C].length=0,this[T]=0;let e=this;return typeof e.close=="function"&&!this[Rt]&&e.close(),t?this.emit("error",t):this.emit(x),this}static get isStream(){return oi}};var vi=realpathSync.native,wt={lstatSync:lstatSync,readdir:readdir$1,readdirSync:readdirSync,readlinkSync:readlinkSync,realpathSync:vi,promises:{lstat:lstat,readdir:readdir,readlink:readlink,realpath:realpath}},Ue=n=>!n||n===wt||n===fs$1?wt:{...wt,...n,promises:{...wt.promises,...n.promises||{}}},$e=/^\\\\\?\\([a-z]:)\\?$/i,Ri=n=>n.replace(/\//g,"\\").replace($e,"$1\\"),Oi=/[\\\/]/,L=0,Ge=1,He=2,U=4,qe=6,Ke=8,X=10,Ve=12,_=15,gt=~_,se=16,je=32,yt=64,j=128,Nt=256,Lt=512,Ie=yt|j|Lt,Fi=1023,ie=n=>n.isFile()?Ke:n.isDirectory()?U:n.isSymbolicLink()?X:n.isCharacterDevice()?He:n.isBlockDevice()?qe:n.isSocket()?Ve:n.isFIFO()?Ge:L,ze=new ft({max:2**12}),bt=n=>{let t=ze.get(n);if(t)return t;let e=n.normalize("NFKD");return ze.set(n,e),e},Be=new ft({max:2**12}),_t=n=>{let t=Be.get(n);if(t)return t;let e=bt(n.toLowerCase());return Be.set(n,e),e},Wt=class extends ft{constructor(){super({max:256});}},ne=class extends ft{constructor(t=16*1024){super({maxSize:t,sizeCalculation:e=>e.length+1});}},Ye=Symbol("PathScurry setAsCwd"),R=class{name;root;roots;parent;nocase;isCWD=false;#t;#s;get dev(){return this.#s}#n;get mode(){return this.#n}#r;get nlink(){return this.#r}#o;get uid(){return this.#o}#S;get gid(){return this.#S}#w;get rdev(){return this.#w}#c;get blksize(){return this.#c}#h;get ino(){return this.#h}#u;get size(){return this.#u}#f;get blocks(){return this.#f}#a;get atimeMs(){return this.#a}#i;get mtimeMs(){return this.#i}#d;get ctimeMs(){return this.#d}#E;get birthtimeMs(){return this.#E}#b;get atime(){return this.#b}#p;get mtime(){return this.#p}#R;get ctime(){return this.#R}#m;get birthtime(){return this.#m}#C;#T;#g;#y;#x;#A;#e;#_;#M;#k;get parentPath(){return (this.parent||this).fullpath()}get path(){return this.parentPath}constructor(t,e=L,s,i,r,o,h){this.name=t,this.#C=r?_t(t):bt(t),this.#e=e&Fi,this.nocase=r,this.roots=i,this.root=s||this,this.#_=o,this.#g=h.fullpath,this.#x=h.relative,this.#A=h.relativePosix,this.parent=h.parent,this.parent?this.#t=this.parent.#t:this.#t=Ue(h.fs);}depth(){return this.#T!==void 0?this.#T:this.parent?this.#T=this.parent.depth()+1:this.#T=0}childrenCache(){return this.#_}resolve(t){if(!t)return this;let e=this.getRootString(t),i=t.substring(e.length).split(this.splitSep);return e?this.getRoot(e).#N(i):this.#N(i)}#N(t){let e=this;for(let s of t)e=e.child(s);return e}children(){let t=this.#_.get(this);if(t)return t;let e=Object.assign([],{provisional:0});return this.#_.set(this,e),this.#e&=~se,e}child(t,e){if(t===""||t===".")return this;if(t==="..")return this.parent||this;let s=this.children(),i=this.nocase?_t(t):bt(t);for(let a of s)if(a.#C===i)return a;let r=this.parent?this.sep:"",o=this.#g?this.#g+r+t:void 0,h=this.newChild(t,L,{...e,parent:this,fullpath:o});return this.canReaddir()||(h.#e|=j),s.push(h),h}relative(){if(this.isCWD)return "";if(this.#x!==void 0)return this.#x;let t=this.name,e=this.parent;if(!e)return this.#x=this.name;let s=e.relative();return s+(!s||!e.parent?"":this.sep)+t}relativePosix(){if(this.sep==="/")return this.relative();if(this.isCWD)return "";if(this.#A!==void 0)return this.#A;let t=this.name,e=this.parent;if(!e)return this.#A=this.fullpathPosix();let s=e.relativePosix();return s+(!s||!e.parent?"":"/")+t}fullpath(){if(this.#g!==void 0)return this.#g;let t=this.name,e=this.parent;if(!e)return this.#g=this.name;let i=e.fullpath()+(e.parent?this.sep:"")+t;return this.#g=i}fullpathPosix(){if(this.#y!==void 0)return this.#y;if(this.sep==="/")return this.#y=this.fullpath();if(!this.parent){let i=this.fullpath().replace(/\\/g,"/");return /^[a-z]:\//i.test(i)?this.#y=`//?/${i}`:this.#y=i}let t=this.parent,e=t.fullpathPosix(),s=e+(!e||!t.parent?"":"/")+this.name;return this.#y=s}isUnknown(){return (this.#e&_)===L}isType(t){return this[`is${t}`]()}getType(){return this.isUnknown()?"Unknown":this.isDirectory()?"Directory":this.isFile()?"File":this.isSymbolicLink()?"SymbolicLink":this.isFIFO()?"FIFO":this.isCharacterDevice()?"CharacterDevice":this.isBlockDevice()?"BlockDevice":this.isSocket()?"Socket":"Unknown"}isFile(){return (this.#e&_)===Ke}isDirectory(){return (this.#e&_)===U}isCharacterDevice(){return (this.#e&_)===He}isBlockDevice(){return (this.#e&_)===qe}isFIFO(){return (this.#e&_)===Ge}isSocket(){return (this.#e&_)===Ve}isSymbolicLink(){return (this.#e&X)===X}lstatCached(){return this.#e&je?this:void 0}readlinkCached(){return this.#M}realpathCached(){return this.#k}readdirCached(){let t=this.children();return t.slice(0,t.provisional)}canReadlink(){if(this.#M)return  true;if(!this.parent)return  false;let t=this.#e&_;return !(t!==L&&t!==X||this.#e&Nt||this.#e&j)}calledReaddir(){return !!(this.#e&se)}isENOENT(){return !!(this.#e&j)}isNamed(t){return this.nocase?this.#C===_t(t):this.#C===bt(t)}async readlink(){let t=this.#M;if(t)return t;if(this.canReadlink()&&this.parent)try{let e=await this.#t.promises.readlink(this.fullpath()),s=(await this.parent.realpath())?.resolve(e);if(s)return this.#M=s}catch(e){this.#D(e.code);return}}readlinkSync(){let t=this.#M;if(t)return t;if(this.canReadlink()&&this.parent)try{let e=this.#t.readlinkSync(this.fullpath()),s=this.parent.realpathSync()?.resolve(e);if(s)return this.#M=s}catch(e){this.#D(e.code);return}}#j(t){this.#e|=se;for(let e=t.provisional;e<t.length;e++){let s=t[e];s&&s.#v();}}#v(){this.#e&j||(this.#e=(this.#e|j)&gt,this.#G());}#G(){let t=this.children();t.provisional=0;for(let e of t)e.#v();}#P(){this.#e|=Lt,this.#L();}#L(){if(this.#e&yt)return;let t=this.#e;(t&_)===U&&(t&=gt),this.#e=t|yt,this.#G();}#I(t=""){t==="ENOTDIR"||t==="EPERM"?this.#L():t==="ENOENT"?this.#v():this.children().provisional=0;}#F(t=""){t==="ENOTDIR"?this.parent.#L():t==="ENOENT"&&this.#v();}#D(t=""){let e=this.#e;e|=Nt,t==="ENOENT"&&(e|=j),(t==="EINVAL"||t==="UNKNOWN")&&(e&=gt),this.#e=e,t==="ENOTDIR"&&this.parent&&this.parent.#L();}#z(t,e){return this.#U(t,e)||this.#B(t,e)}#B(t,e){let s=ie(t),i=this.newChild(t.name,s,{parent:this}),r=i.#e&_;return r!==U&&r!==X&&r!==L&&(i.#e|=yt),e.unshift(i),e.provisional++,i}#U(t,e){for(let s=e.provisional;s<e.length;s++){let i=e[s];if((this.nocase?_t(t.name):bt(t.name))===i.#C)return this.#l(t,i,s,e)}}#l(t,e,s,i){let r=e.name;return e.#e=e.#e&gt|ie(t),r!==t.name&&(e.name=t.name),s!==i.provisional&&(s===i.length-1?i.pop():i.splice(s,1),i.unshift(e)),i.provisional++,e}async lstat(){if((this.#e&j)===0)try{return this.#$(await this.#t.promises.lstat(this.fullpath())),this}catch(t){this.#F(t.code);}}lstatSync(){if((this.#e&j)===0)try{return this.#$(this.#t.lstatSync(this.fullpath())),this}catch(t){this.#F(t.code);}}#$(t){let{atime:e,atimeMs:s,birthtime:i,birthtimeMs:r,blksize:o,blocks:h,ctime:a,ctimeMs:l,dev:u,gid:c,ino:d,mode:f,mtime:m,mtimeMs:p,nlink:w,rdev:g,size:S,uid:E}=t;this.#b=e,this.#a=s,this.#m=i,this.#E=r,this.#c=o,this.#f=h,this.#R=a,this.#d=l,this.#s=u,this.#S=c,this.#h=d,this.#n=f,this.#p=m,this.#i=p,this.#r=w,this.#w=g,this.#u=S,this.#o=E;let y=ie(t);this.#e=this.#e&gt|y|je,y!==L&&y!==U&&y!==X&&(this.#e|=yt);}#W=[];#O=false;#H(t){this.#O=false;let e=this.#W.slice();this.#W.length=0,e.forEach(s=>s(null,t));}readdirCB(t,e=false){if(!this.canReaddir()){e?t(null,[]):queueMicrotask(()=>t(null,[]));return}let s=this.children();if(this.calledReaddir()){let r=s.slice(0,s.provisional);e?t(null,r):queueMicrotask(()=>t(null,r));return}if(this.#W.push(t),this.#O)return;this.#O=true;let i=this.fullpath();this.#t.readdir(i,{withFileTypes:true},(r,o)=>{if(r)this.#I(r.code),s.provisional=0;else {for(let h of o)this.#z(h,s);this.#j(s);}this.#H(s.slice(0,s.provisional));});}#q;async readdir(){if(!this.canReaddir())return [];let t=this.children();if(this.calledReaddir())return t.slice(0,t.provisional);let e=this.fullpath();if(this.#q)await this.#q;else {let s=()=>{};this.#q=new Promise(i=>s=i);try{for(let i of await this.#t.promises.readdir(e,{withFileTypes:!0}))this.#z(i,t);this.#j(t);}catch(i){this.#I(i.code),t.provisional=0;}this.#q=void 0,s();}return t.slice(0,t.provisional)}readdirSync(){if(!this.canReaddir())return [];let t=this.children();if(this.calledReaddir())return t.slice(0,t.provisional);let e=this.fullpath();try{for(let s of this.#t.readdirSync(e,{withFileTypes:!0}))this.#z(s,t);this.#j(t);}catch(s){this.#I(s.code),t.provisional=0;}return t.slice(0,t.provisional)}canReaddir(){if(this.#e&Ie)return  false;let t=_&this.#e;return t===L||t===U||t===X}shouldWalk(t,e){return (this.#e&U)===U&&!(this.#e&Ie)&&!t.has(this)&&(!e||e(this))}async realpath(){if(this.#k)return this.#k;if(!((Lt|Nt|j)&this.#e))try{let t=await this.#t.promises.realpath(this.fullpath());return this.#k=this.resolve(t)}catch{this.#P();}}realpathSync(){if(this.#k)return this.#k;if(!((Lt|Nt|j)&this.#e))try{let t=this.#t.realpathSync(this.fullpath());return this.#k=this.resolve(t)}catch{this.#P();}}[Ye](t){if(t===this)return;t.isCWD=false,this.isCWD=true;let e=new Set([]),s=[],i=this;for(;i&&i.parent;)e.add(i),i.#x=s.join(this.sep),i.#A=s.join("/"),i=i.parent,s.push("..");for(i=t;i&&i.parent&&!e.has(i);)i.#x=void 0,i.#A=void 0,i=i.parent;}},Pt=class n extends R{sep="\\";splitSep=Oi;constructor(t,e=L,s,i,r,o,h){super(t,e,s,i,r,o,h);}newChild(t,e=L,s={}){return new n(t,e,this.root,this.roots,this.nocase,this.childrenCache(),s)}getRootString(t){return win32.parse(t).root}getRoot(t){if(t=Ri(t.toUpperCase()),t===this.root.name)return this.root;for(let[e,s]of Object.entries(this.roots))if(this.sameRoot(t,e))return this.roots[t]=s;return this.roots[t]=new it(t,this).root}sameRoot(t,e=this.root.name){return t=t.toUpperCase().replace(/\//g,"\\").replace($e,"$1\\"),t===e}},jt=class n extends R{splitSep="/";sep="/";constructor(t,e=L,s,i,r,o,h){super(t,e,s,i,r,o,h);}getRootString(t){return t.startsWith("/")?"/":""}getRoot(t){return this.root}newChild(t,e=L,s={}){return new n(t,e,this.root,this.roots,this.nocase,this.childrenCache(),s)}},It=class{root;rootPath;roots;cwd;#t;#s;#n;nocase;#r;constructor(t=process.cwd(),e,s,{nocase:i,childrenCacheSize:r=16*1024,fs:o=wt}={}){this.#r=Ue(o),(t instanceof URL||t.startsWith("file://"))&&(t=fileURLToPath(t));let h=e.resolve(t);this.roots=Object.create(null),this.rootPath=this.parseRootPath(h),this.#t=new Wt,this.#s=new Wt,this.#n=new ne(r);let a=h.substring(this.rootPath.length).split(s);if(a.length===1&&!a[0]&&a.pop(),i===void 0)throw new TypeError("must provide nocase setting to PathScurryBase ctor");this.nocase=i,this.root=this.newRoot(this.#r),this.roots[this.rootPath]=this.root;let l=this.root,u=a.length-1,c=e.sep,d=this.rootPath,f=false;for(let m of a){let p=u--;l=l.child(m,{relative:new Array(p).fill("..").join(c),relativePosix:new Array(p).fill("..").join("/"),fullpath:d+=(f?"":c)+m}),f=true;}this.cwd=l;}depth(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.depth()}childrenCache(){return this.#n}resolve(...t){let e="";for(let r=t.length-1;r>=0;r--){let o=t[r];if(!(!o||o===".")&&(e=e?`${o}/${e}`:o,this.isAbsolute(o)))break}let s=this.#t.get(e);if(s!==void 0)return s;let i=this.cwd.resolve(e).fullpath();return this.#t.set(e,i),i}resolvePosix(...t){let e="";for(let r=t.length-1;r>=0;r--){let o=t[r];if(!(!o||o===".")&&(e=e?`${o}/${e}`:o,this.isAbsolute(o)))break}let s=this.#s.get(e);if(s!==void 0)return s;let i=this.cwd.resolve(e).fullpathPosix();return this.#s.set(e,i),i}relative(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.relative()}relativePosix(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.relativePosix()}basename(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.name}dirname(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),(t.parent||t).fullpath()}async readdir(t=this.cwd,e={withFileTypes:true}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd);let{withFileTypes:s}=e;if(t.canReaddir()){let i=await t.readdir();return s?i:i.map(r=>r.name)}else return []}readdirSync(t=this.cwd,e={withFileTypes:true}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd);let{withFileTypes:s=true}=e;return t.canReaddir()?s?t.readdirSync():t.readdirSync().map(i=>i.name):[]}async lstat(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.lstat()}lstatSync(t=this.cwd){return typeof t=="string"&&(t=this.cwd.resolve(t)),t.lstatSync()}async readlink(t=this.cwd,{withFileTypes:e}={withFileTypes:false}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t.withFileTypes,t=this.cwd);let s=await t.readlink();return e?s:s?.fullpath()}readlinkSync(t=this.cwd,{withFileTypes:e}={withFileTypes:false}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t.withFileTypes,t=this.cwd);let s=t.readlinkSync();return e?s:s?.fullpath()}async realpath(t=this.cwd,{withFileTypes:e}={withFileTypes:false}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t.withFileTypes,t=this.cwd);let s=await t.realpath();return e?s:s?.fullpath()}realpathSync(t=this.cwd,{withFileTypes:e}={withFileTypes:false}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t.withFileTypes,t=this.cwd);let s=t.realpathSync();return e?s:s?.fullpath()}async walk(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd);let{withFileTypes:s=true,follow:i=false,filter:r,walkFilter:o}=e,h=[];(!r||r(t))&&h.push(s?t:t.fullpath());let a=new Set,l=(c,d)=>{a.add(c),c.readdirCB((f,m)=>{if(f)return d(f);let p=m.length;if(!p)return d();let w=()=>{--p===0&&d();};for(let g of m)(!r||r(g))&&h.push(s?g:g.fullpath()),i&&g.isSymbolicLink()?g.realpath().then(S=>S?.isUnknown()?S.lstat():S).then(S=>S?.shouldWalk(a,o)?l(S,w):w()):g.shouldWalk(a,o)?l(g,w):w();},true);},u=t;return new Promise((c,d)=>{l(u,f=>{if(f)return d(f);c(h);});})}walkSync(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd);let{withFileTypes:s=true,follow:i=false,filter:r,walkFilter:o}=e,h=[];(!r||r(t))&&h.push(s?t:t.fullpath());let a=new Set([t]);for(let l of a){let u=l.readdirSync();for(let c of u){(!r||r(c))&&h.push(s?c:c.fullpath());let d=c;if(c.isSymbolicLink()){if(!(i&&(d=c.realpathSync())))continue;d.isUnknown()&&d.lstatSync();}d.shouldWalk(a,o)&&a.add(d);}}return h}[Symbol.asyncIterator](){return this.iterate()}iterate(t=this.cwd,e={}){return typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd),this.stream(t,e)[Symbol.asyncIterator]()}[Symbol.iterator](){return this.iterateSync()}*iterateSync(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd);let{withFileTypes:s=true,follow:i=false,filter:r,walkFilter:o}=e;(!r||r(t))&&(yield s?t:t.fullpath());let h=new Set([t]);for(let a of h){let l=a.readdirSync();for(let u of l){(!r||r(u))&&(yield s?u:u.fullpath());let c=u;if(u.isSymbolicLink()){if(!(i&&(c=u.realpathSync())))continue;c.isUnknown()&&c.lstatSync();}c.shouldWalk(h,o)&&h.add(c);}}}stream(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd);let{withFileTypes:s=true,follow:i=false,filter:r,walkFilter:o}=e,h=new V({objectMode:true});(!r||r(t))&&h.write(s?t:t.fullpath());let a=new Set,l=[t],u=0,c=()=>{let d=false;for(;!d;){let f=l.shift();if(!f){u===0&&h.end();return}u++,a.add(f);let m=(w,g,S=false)=>{if(w)return h.emit("error",w);if(i&&!S){let E=[];for(let y of g)y.isSymbolicLink()&&E.push(y.realpath().then(b=>b?.isUnknown()?b.lstat():b));if(E.length){Promise.all(E).then(()=>m(null,g,true));return}}for(let E of g)E&&(!r||r(E))&&(h.write(s?E:E.fullpath())||(d=true));u--;for(let E of g){let y=E.realpathCached()||E;y.shouldWalk(a,o)&&l.push(y);}d&&!h.flowing?h.once("drain",c):p||c();},p=true;f.readdirCB(m,true),p=false;}};return c(),h}streamSync(t=this.cwd,e={}){typeof t=="string"?t=this.cwd.resolve(t):t instanceof R||(e=t,t=this.cwd);let{withFileTypes:s=true,follow:i=false,filter:r,walkFilter:o}=e,h=new V({objectMode:true}),a=new Set;(!r||r(t))&&h.write(s?t:t.fullpath());let l=[t],u=0,c=()=>{let d=false;for(;!d;){let f=l.shift();if(!f){u===0&&h.end();return}u++,a.add(f);let m=f.readdirSync();for(let p of m)(!r||r(p))&&(h.write(s?p:p.fullpath())||(d=true));u--;for(let p of m){let w=p;if(p.isSymbolicLink()){if(!(i&&(w=p.realpathSync())))continue;w.isUnknown()&&w.lstatSync();}w.shouldWalk(a,o)&&l.push(w);}}d&&!h.flowing&&h.once("drain",c);};return c(),h}chdir(t=this.cwd){let e=this.cwd;this.cwd=typeof t=="string"?this.cwd.resolve(t):t,this.cwd[Ye](e);}},it=class extends It{sep="\\";constructor(t=process.cwd(),e={}){let{nocase:s=true}=e;super(t,win32,"\\",{...e,nocase:s}),this.nocase=s;for(let i=this.cwd;i;i=i.parent)i.nocase=this.nocase;}parseRootPath(t){return win32.parse(t).root.toUpperCase()}newRoot(t){return new Pt(this.rootPath,U,void 0,this.roots,this.nocase,this.childrenCache(),{fs:t})}isAbsolute(t){return t.startsWith("/")||t.startsWith("\\")||/^[a-z]:(\/|\\)/i.test(t)}},rt=class extends It{sep="/";constructor(t=process.cwd(),e={}){let{nocase:s=false}=e;super(t,posix,"/",{...e,nocase:s}),this.nocase=s;}parseRootPath(t){return "/"}newRoot(t){return new jt(this.rootPath,U,void 0,this.roots,this.nocase,this.childrenCache(),{fs:t})}isAbsolute(t){return t.startsWith("/")}},St=class extends rt{constructor(t=process.cwd(),e={}){let{nocase:s=true}=e;super(t,{...e,nocase:s});}};process.platform==="win32"?Pt:jt;var Xe=process.platform==="win32"?it:process.platform==="darwin"?St:rt;var Di=n=>n.length>=1,Mi=n=>n.length>=1,Ni=Symbol.for("nodejs.util.inspect.custom"),nt=class n{#t;#s;#n;length;#r;#o;#S;#w;#c;#h;#u=true;constructor(t,e,s,i){if(!Di(t))throw new TypeError("empty pattern list");if(!Mi(e))throw new TypeError("empty glob list");if(e.length!==t.length)throw new TypeError("mismatched pattern list and glob list lengths");if(this.length=t.length,s<0||s>=this.length)throw new TypeError("index out of range");if(this.#t=t,this.#s=e,this.#n=s,this.#r=i,this.#n===0){if(this.isUNC()){let[r,o,h,a,...l]=this.#t,[u,c,d,f,...m]=this.#s;l[0]===""&&(l.shift(),m.shift());let p=[r,o,h,a,""].join("/"),w=[u,c,d,f,""].join("/");this.#t=[p,...l],this.#s=[w,...m],this.length=this.#t.length;}else if(this.isDrive()||this.isAbsolute()){let[r,...o]=this.#t,[h,...a]=this.#s;o[0]===""&&(o.shift(),a.shift());let l=r+"/",u=h+"/";this.#t=[l,...o],this.#s=[u,...a],this.length=this.#t.length;}}}[Ni](){return "Pattern <"+this.#s.slice(this.#n).join("/")+">"}pattern(){return this.#t[this.#n]}isString(){return typeof this.#t[this.#n]=="string"}isGlobstar(){return this.#t[this.#n]===A}isRegExp(){return this.#t[this.#n]instanceof RegExp}globString(){return this.#S=this.#S||(this.#n===0?this.isAbsolute()?this.#s[0]+this.#s.slice(1).join("/"):this.#s.join("/"):this.#s.slice(this.#n).join("/"))}hasMore(){return this.length>this.#n+1}rest(){return this.#o!==void 0?this.#o:this.hasMore()?(this.#o=new n(this.#t,this.#s,this.#n+1,this.#r),this.#o.#h=this.#h,this.#o.#c=this.#c,this.#o.#w=this.#w,this.#o):this.#o=null}isUNC(){let t=this.#t;return this.#c!==void 0?this.#c:this.#c=this.#r==="win32"&&this.#n===0&&t[0]===""&&t[1]===""&&typeof t[2]=="string"&&!!t[2]&&typeof t[3]=="string"&&!!t[3]}isDrive(){let t=this.#t;return this.#w!==void 0?this.#w:this.#w=this.#r==="win32"&&this.#n===0&&this.length>1&&typeof t[0]=="string"&&/^[a-z]:$/i.test(t[0])}isAbsolute(){let t=this.#t;return this.#h!==void 0?this.#h:this.#h=t[0]===""&&t.length>1||this.isDrive()||this.isUNC()}root(){let t=this.#t[0];return typeof t=="string"&&this.isAbsolute()&&this.#n===0?t:""}checkFollowGlobstar(){return !(this.#n===0||!this.isGlobstar()||!this.#u)}markFollowGlobstar(){return this.#n===0||!this.isGlobstar()||!this.#u?false:(this.#u=false,true)}};var _i=typeof process=="object"&&process&&typeof process.platform=="string"?process.platform:"linux",ot=class{relative;relativeChildren;absolute;absoluteChildren;platform;mmopts;constructor(t,{nobrace:e,nocase:s,noext:i,noglobstar:r,platform:o=_i}){this.relative=[],this.absolute=[],this.relativeChildren=[],this.absoluteChildren=[],this.platform=o,this.mmopts={dot:true,nobrace:e,nocase:s,noext:i,noglobstar:r,optimizationLevel:2,platform:o,nocomment:true,nonegate:true};for(let h of t)this.add(h);}add(t){let e=new D(t,this.mmopts);for(let s=0;s<e.set.length;s++){let i=e.set[s],r=e.globParts[s];if(!i||!r)throw new Error("invalid pattern object");for(;i[0]==="."&&r[0]===".";)i.shift(),r.shift();let o=new nt(i,r,0,this.platform),h=new D(o.globString(),this.mmopts),a=r[r.length-1]==="**",l=o.isAbsolute();l?this.absolute.push(h):this.relative.push(h),a&&(l?this.absoluteChildren.push(h):this.relativeChildren.push(h));}}ignored(t){let e=t.fullpath(),s=`${e}/`,i=t.relative()||".",r=`${i}/`;for(let o of this.relative)if(o.match(i)||o.match(r))return  true;for(let o of this.absolute)if(o.match(e)||o.match(s))return  true;return  false}childrenIgnored(t){let e=t.fullpath()+"/",s=(t.relative()||".")+"/";for(let i of this.relativeChildren)if(i.match(s))return  true;for(let i of this.absoluteChildren)if(i.match(e))return  true;return  false}};var oe=class n{store;constructor(t=new Map){this.store=t;}copy(){return new n(new Map(this.store))}hasWalked(t,e){return this.store.get(t.fullpath())?.has(e.globString())}storeWalked(t,e){let s=t.fullpath(),i=this.store.get(s);i?i.add(e.globString()):this.store.set(s,new Set([e.globString()]));}},he=class{store=new Map;add(t,e,s){let i=(e?2:0)|(s?1:0),r=this.store.get(t);this.store.set(t,r===void 0?i:i&r);}entries(){return [...this.store.entries()].map(([t,e])=>[t,!!(e&2),!!(e&1)])}},ae=class{store=new Map;add(t,e){if(!t.canReaddir())return;let s=this.store.get(t);s?s.find(i=>i.globString()===e.globString())||s.push(e):this.store.set(t,[e]);}get(t){let e=this.store.get(t);if(!e)throw new Error("attempting to walk unknown path");return e}entries(){return this.keys().map(t=>[t,this.store.get(t)])}keys(){return [...this.store.keys()].filter(t=>t.canReaddir())}},Et=class n{hasWalkedCache;matches=new he;subwalks=new ae;patterns;follow;dot;opts;constructor(t,e){this.opts=t,this.follow=!!t.follow,this.dot=!!t.dot,this.hasWalkedCache=e?e.copy():new oe;}processPatterns(t,e){this.patterns=e;let s=e.map(i=>[t,i]);for(let[i,r]of s){this.hasWalkedCache.storeWalked(i,r);let o=r.root(),h=r.isAbsolute()&&this.opts.absolute!==false;if(o){i=i.resolve(o==="/"&&this.opts.root!==void 0?this.opts.root:o);let c=r.rest();if(c)r=c;else {this.matches.add(i,true,false);continue}}if(i.isENOENT())continue;let a,l,u=false;for(;typeof(a=r.pattern())=="string"&&(l=r.rest());)i=i.resolve(a),r=l,u=true;if(a=r.pattern(),l=r.rest(),u){if(this.hasWalkedCache.hasWalked(i,r))continue;this.hasWalkedCache.storeWalked(i,r);}if(typeof a=="string"){let c=a===".."||a===""||a===".";this.matches.add(i.resolve(a),h,c);continue}else if(a===A){(!i.isSymbolicLink()||this.follow||r.checkFollowGlobstar())&&this.subwalks.add(i,r);let c=l?.pattern(),d=l?.rest();if(!l||(c===""||c===".")&&!d)this.matches.add(i,h,c===""||c===".");else if(c===".."){let f=i.parent||i;d?this.hasWalkedCache.hasWalked(f,d)||this.subwalks.add(f,d):this.matches.add(f,h,true);}}else a instanceof RegExp&&this.subwalks.add(i,r);}return this}subwalkTargets(){return this.subwalks.keys()}child(){return new n(this.opts,this.hasWalkedCache)}filterEntries(t,e){let s=this.subwalks.get(t),i=this.child();for(let r of e)for(let o of s){let h=o.isAbsolute(),a=o.pattern(),l=o.rest();a===A?i.testGlobstar(r,o,l,h):a instanceof RegExp?i.testRegExp(r,a,l,h):i.testString(r,a,l,h);}return i}testGlobstar(t,e,s,i){if((this.dot||!t.name.startsWith("."))&&(e.hasMore()||this.matches.add(t,i,false),t.canReaddir()&&(this.follow||!t.isSymbolicLink()?this.subwalks.add(t,e):t.isSymbolicLink()&&(s&&e.checkFollowGlobstar()?this.subwalks.add(t,s):e.markFollowGlobstar()&&this.subwalks.add(t,e)))),s){let r=s.pattern();if(typeof r=="string"&&r!==".."&&r!==""&&r!==".")this.testString(t,r,s.rest(),i);else if(r===".."){let o=t.parent||t;this.subwalks.add(o,s);}else r instanceof RegExp&&this.testRegExp(t,r,s.rest(),i);}}testRegExp(t,e,s,i){e.test(t.name)&&(s?this.subwalks.add(t,s):this.matches.add(t,i,false));}testString(t,e,s,i){t.isNamed(e)&&(s?this.subwalks.add(t,s):this.matches.add(t,i,false));}};var Li=(n,t)=>typeof n=="string"?new ot([n],t):Array.isArray(n)?new ot(n,t):n,zt=class{path;patterns;opts;seen=new Set;paused=false;aborted=false;#t=[];#s;#n;signal;maxDepth;includeChildMatches;constructor(t,e,s){if(this.patterns=t,this.path=e,this.opts=s,this.#n=!s.posix&&s.platform==="win32"?"\\":"/",this.includeChildMatches=s.includeChildMatches!==false,(s.ignore||!this.includeChildMatches)&&(this.#s=Li(s.ignore??[],s),!this.includeChildMatches&&typeof this.#s.add!="function")){let i="cannot ignore child matches, ignore lacks add() method.";throw new Error(i)}this.maxDepth=s.maxDepth||1/0,s.signal&&(this.signal=s.signal,this.signal.addEventListener("abort",()=>{this.#t.length=0;}));}#r(t){return this.seen.has(t)||!!this.#s?.ignored?.(t)}#o(t){return !!this.#s?.childrenIgnored?.(t)}pause(){this.paused=true;}resume(){if(this.signal?.aborted)return;this.paused=false;let t;for(;!this.paused&&(t=this.#t.shift());)t();}onResume(t){this.signal?.aborted||(this.paused?this.#t.push(t):t());}async matchCheck(t,e){if(e&&this.opts.nodir)return;let s;if(this.opts.realpath){if(s=t.realpathCached()||await t.realpath(),!s)return;t=s;}let r=t.isUnknown()||this.opts.stat?await t.lstat():t;if(this.opts.follow&&this.opts.nodir&&r?.isSymbolicLink()){let o=await r.realpath();o&&(o.isUnknown()||this.opts.stat)&&await o.lstat();}return this.matchCheckTest(r,e)}matchCheckTest(t,e){return t&&(this.maxDepth===1/0||t.depth()<=this.maxDepth)&&(!e||t.canReaddir())&&(!this.opts.nodir||!t.isDirectory())&&(!this.opts.nodir||!this.opts.follow||!t.isSymbolicLink()||!t.realpathCached()?.isDirectory())&&!this.#r(t)?t:void 0}matchCheckSync(t,e){if(e&&this.opts.nodir)return;let s;if(this.opts.realpath){if(s=t.realpathCached()||t.realpathSync(),!s)return;t=s;}let r=t.isUnknown()||this.opts.stat?t.lstatSync():t;if(this.opts.follow&&this.opts.nodir&&r?.isSymbolicLink()){let o=r.realpathSync();o&&(o?.isUnknown()||this.opts.stat)&&o.lstatSync();}return this.matchCheckTest(r,e)}matchFinish(t,e){if(this.#r(t))return;if(!this.includeChildMatches&&this.#s?.add){let r=`${t.relativePosix()}/**`;this.#s.add(r);}let s=this.opts.absolute===void 0?e:this.opts.absolute;this.seen.add(t);let i=this.opts.mark&&t.isDirectory()?this.#n:"";if(this.opts.withFileTypes)this.matchEmit(t);else if(s){let r=this.opts.posix?t.fullpathPosix():t.fullpath();this.matchEmit(r+i);}else {let r=this.opts.posix?t.relativePosix():t.relative(),o=this.opts.dotRelative&&!r.startsWith(".."+this.#n)?"."+this.#n:"";this.matchEmit(r?o+r+i:"."+i);}}async match(t,e,s){let i=await this.matchCheck(t,s);i&&this.matchFinish(i,e);}matchSync(t,e,s){let i=this.matchCheckSync(t,s);i&&this.matchFinish(i,e);}walkCB(t,e,s){this.signal?.aborted&&s(),this.walkCB2(t,e,new Et(this.opts),s);}walkCB2(t,e,s,i){if(this.#o(t))return i();if(this.signal?.aborted&&i(),this.paused){this.onResume(()=>this.walkCB2(t,e,s,i));return}s.processPatterns(t,e);let r=1,o=()=>{--r===0&&i();};for(let[h,a,l]of s.matches.entries())this.#r(h)||(r++,this.match(h,a,l).then(()=>o()));for(let h of s.subwalkTargets()){if(this.maxDepth!==1/0&&h.depth()>=this.maxDepth)continue;r++;let a=h.readdirCached();h.calledReaddir()?this.walkCB3(h,a,s,o):h.readdirCB((l,u)=>this.walkCB3(h,u,s,o),true);}o();}walkCB3(t,e,s,i){s=s.filterEntries(t,e);let r=1,o=()=>{--r===0&&i();};for(let[h,a,l]of s.matches.entries())this.#r(h)||(r++,this.match(h,a,l).then(()=>o()));for(let[h,a]of s.subwalks.entries())r++,this.walkCB2(h,a,s.child(),o);o();}walkCBSync(t,e,s){this.signal?.aborted&&s(),this.walkCB2Sync(t,e,new Et(this.opts),s);}walkCB2Sync(t,e,s,i){if(this.#o(t))return i();if(this.signal?.aborted&&i(),this.paused){this.onResume(()=>this.walkCB2Sync(t,e,s,i));return}s.processPatterns(t,e);let r=1,o=()=>{--r===0&&i();};for(let[h,a,l]of s.matches.entries())this.#r(h)||this.matchSync(h,a,l);for(let h of s.subwalkTargets()){if(this.maxDepth!==1/0&&h.depth()>=this.maxDepth)continue;r++;let a=h.readdirSync();this.walkCB3Sync(h,a,s,o);}o();}walkCB3Sync(t,e,s,i){s=s.filterEntries(t,e);let r=1,o=()=>{--r===0&&i();};for(let[h,a,l]of s.matches.entries())this.#r(h)||this.matchSync(h,a,l);for(let[h,a]of s.subwalks.entries())r++,this.walkCB2Sync(h,a,s.child(),o);o();}},xt=class extends zt{matches=new Set;constructor(t,e,s){super(t,e,s);}matchEmit(t){this.matches.add(t);}async walk(){if(this.signal?.aborted)throw this.signal.reason;return this.path.isUnknown()&&await this.path.lstat(),await new Promise((t,e)=>{this.walkCB(this.path,this.patterns,()=>{this.signal?.aborted?e(this.signal.reason):t(this.matches);});}),this.matches}walkSync(){if(this.signal?.aborted)throw this.signal.reason;return this.path.isUnknown()&&this.path.lstatSync(),this.walkCBSync(this.path,this.patterns,()=>{if(this.signal?.aborted)throw this.signal.reason}),this.matches}},vt=class extends zt{results;constructor(t,e,s){super(t,e,s),this.results=new V({signal:this.signal,objectMode:true}),this.results.on("drain",()=>this.resume()),this.results.on("resume",()=>this.resume());}matchEmit(t){this.results.write(t),this.results.flowing||this.pause();}stream(){let t=this.path;return t.isUnknown()?t.lstat().then(()=>{this.walkCB(t,this.patterns,()=>this.results.end());}):this.walkCB(t,this.patterns,()=>this.results.end()),this.results}streamSync(){return this.path.isUnknown()&&this.path.lstatSync(),this.walkCBSync(this.path,this.patterns,()=>this.results.end()),this.results}};var Pi=typeof process=="object"&&process&&typeof process.platform=="string"?process.platform:"linux",I=class{absolute;cwd;root;dot;dotRelative;follow;ignore;magicalBraces;mark;matchBase;maxDepth;nobrace;nocase;nodir;noext;noglobstar;pattern;platform;realpath;scurry;stat;signal;windowsPathsNoEscape;withFileTypes;includeChildMatches;opts;patterns;constructor(t,e){if(!e)throw new TypeError("glob options required");if(this.withFileTypes=!!e.withFileTypes,this.signal=e.signal,this.follow=!!e.follow,this.dot=!!e.dot,this.dotRelative=!!e.dotRelative,this.nodir=!!e.nodir,this.mark=!!e.mark,e.cwd?(e.cwd instanceof URL||e.cwd.startsWith("file://"))&&(e.cwd=fileURLToPath(e.cwd)):this.cwd="",this.cwd=e.cwd||"",this.root=e.root,this.magicalBraces=!!e.magicalBraces,this.nobrace=!!e.nobrace,this.noext=!!e.noext,this.realpath=!!e.realpath,this.absolute=e.absolute,this.includeChildMatches=e.includeChildMatches!==false,this.noglobstar=!!e.noglobstar,this.matchBase=!!e.matchBase,this.maxDepth=typeof e.maxDepth=="number"?e.maxDepth:1/0,this.stat=!!e.stat,this.ignore=e.ignore,this.withFileTypes&&this.absolute!==void 0)throw new Error("cannot set absolute and withFileTypes:true");if(typeof t=="string"&&(t=[t]),this.windowsPathsNoEscape=!!e.windowsPathsNoEscape||e.allowWindowsEscape===false,this.windowsPathsNoEscape&&(t=t.map(a=>a.replace(/\\/g,"/"))),this.matchBase){if(e.noglobstar)throw new TypeError("base matching requires globstar");t=t.map(a=>a.includes("/")?a:`./**/${a}`);}if(this.pattern=t,this.platform=e.platform||Pi,this.opts={...e,platform:this.platform},e.scurry){if(this.scurry=e.scurry,e.nocase!==void 0&&e.nocase!==e.scurry.nocase)throw new Error("nocase option contradicts provided scurry option")}else {let a=e.platform==="win32"?it:e.platform==="darwin"?St:e.platform?rt:Xe;this.scurry=new a(this.cwd,{nocase:e.nocase,fs:e.fs});}this.nocase=this.scurry.nocase;let s=this.platform==="darwin"||this.platform==="win32",i={braceExpandMax:1e4,...e,dot:this.dot,matchBase:this.matchBase,nobrace:this.nobrace,nocase:this.nocase,nocaseMagicOnly:s,nocomment:true,noext:this.noext,nonegate:true,optimizationLevel:2,platform:this.platform,windowsPathsNoEscape:this.windowsPathsNoEscape,debug:!!this.opts.debug},r=this.pattern.map(a=>new D(a,i)),[o,h]=r.reduce((a,l)=>(a[0].push(...l.set),a[1].push(...l.globParts),a),[[],[]]);this.patterns=o.map((a,l)=>{let u=h[l];if(!u)throw new Error("invalid pattern object");return new nt(a,u,0,this.platform)});}async walk(){return [...await new xt(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).walk()]}walkSync(){return [...new xt(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).walkSync()]}stream(){return new vt(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).stream()}streamSync(){return new vt(this.patterns,this.scurry.cwd,{...this.opts,maxDepth:this.maxDepth!==1/0?this.maxDepth+this.scurry.cwd.depth():1/0,platform:this.platform,nocase:this.nocase,includeChildMatches:this.includeChildMatches}).streamSync()}iterateSync(){return this.streamSync()[Symbol.iterator]()}[Symbol.iterator](){return this.iterateSync()}iterate(){return this.stream()[Symbol.asyncIterator]()}[Symbol.asyncIterator](){return this.iterate()}};var le=(n,t={})=>{Array.isArray(n)||(n=[n]);for(let e of n)if(new D(e,t).hasMagic())return  true;return  false};function Bt(n,t={}){return new I(n,t).streamSync()}function Qe(n,t={}){return new I(n,t).stream()}function ts(n,t={}){return new I(n,t).walkSync()}async function Je(n,t={}){return new I(n,t).walk()}function Ut(n,t={}){return new I(n,t).iterateSync()}function es(n,t={}){return new I(n,t).iterate()}var ji=Bt,Ii=Object.assign(Qe,{sync:Bt}),zi=Ut,Bi=Object.assign(es,{sync:Ut}),Ui=Object.assign(ts,{stream:Bt,iterate:Ut}),Ze=Object.assign(Je,{glob:Je,globSync:ts,sync:Ui,globStream:Qe,stream:Ii,globStreamSync:Bt,streamSync:ji,globIterate:es,iterate:Bi,globIterateSync:Ut,iterateSync:zi,Glob:I,hasMagic:le,escape:tt,unescape:W});Ze.glob=Ze;

const ALIAS = Symbol.for('yaml.alias');
const DOC = Symbol.for('yaml.document');
const MAP = Symbol.for('yaml.map');
const PAIR = Symbol.for('yaml.pair');
const SCALAR$1 = Symbol.for('yaml.scalar');
const SEQ = Symbol.for('yaml.seq');
const NODE_TYPE = Symbol.for('yaml.node.type');
const isAlias = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === ALIAS;
const isDocument = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === DOC;
const isMap = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === MAP;
const isPair = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === PAIR;
const isScalar$1 = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === SCALAR$1;
const isSeq = (node) => !!node && typeof node === 'object' && node[NODE_TYPE] === SEQ;
function isCollection$1(node) {
    if (node && typeof node === 'object')
        switch (node[NODE_TYPE]) {
            case MAP:
            case SEQ:
                return true;
        }
    return false;
}
function isNode(node) {
    if (node && typeof node === 'object')
        switch (node[NODE_TYPE]) {
            case ALIAS:
            case MAP:
            case SCALAR$1:
            case SEQ:
                return true;
        }
    return false;
}
const hasAnchor = (node) => (isScalar$1(node) || isCollection$1(node)) && !!node.anchor;

const BREAK$1 = Symbol('break visit');
const SKIP$1 = Symbol('skip children');
const REMOVE$1 = Symbol('remove node');
/**
 * Apply a visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
function visit$1(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE$1)
            node.contents = null;
    }
    else
        visit_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit$1.BREAK = BREAK$1;
/** Do not visit the children of the current node */
visit$1.SKIP = SKIP$1;
/** Remove the current node */
visit$1.REMOVE = REMOVE$1;
function visit_(key, node, visitor, path) {
    const ctrl = callVisitor(key, node, visitor, path);
    if (isNode(ctrl) || isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== 'symbol') {
        if (isCollection$1(node)) {
            path = Object.freeze(path.concat(node));
            for (let i = 0; i < node.items.length; ++i) {
                const ci = visit_(i, node.items[i], visitor, path);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK$1)
                    return BREAK$1;
                else if (ci === REMOVE$1) {
                    node.items.splice(i, 1);
                    i -= 1;
                }
            }
        }
        else if (isPair(node)) {
            path = Object.freeze(path.concat(node));
            const ck = visit_('key', node.key, visitor, path);
            if (ck === BREAK$1)
                return BREAK$1;
            else if (ck === REMOVE$1)
                node.key = null;
            const cv = visit_('value', node.value, visitor, path);
            if (cv === BREAK$1)
                return BREAK$1;
            else if (cv === REMOVE$1)
                node.value = null;
        }
    }
    return ctrl;
}
/**
 * Apply an async visitor to an AST node or document.
 *
 * Walks through the tree (depth-first) starting from `node`, calling a
 * `visitor` function with three arguments:
 *   - `key`: For sequence values and map `Pair`, the node's index in the
 *     collection. Within a `Pair`, `'key'` or `'value'`, correspondingly.
 *     `null` for the root node.
 *   - `node`: The current node.
 *   - `path`: The ancestry of the current node.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `Promise`: Must resolve to one of the following values
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this node, continue with next
 *     sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current node, then continue with the next one
 *   - `Node`: Replace the current node, then continue by visiting it
 *   - `number`: While iterating the items of a sequence or map, set the index
 *     of the next step. This is useful especially if the index of the current
 *     node has changed.
 *
 * If `visitor` is a single function, it will be called with all values
 * encountered in the tree, including e.g. `null` values. Alternatively,
 * separate visitor functions may be defined for each `Map`, `Pair`, `Seq`,
 * `Alias` and `Scalar` node. To define the same visitor function for more than
 * one node type, use the `Collection` (map and seq), `Value` (map, seq & scalar)
 * and `Node` (alias, map, seq & scalar) targets. Of all these, only the most
 * specific defined one will be used for each node.
 */
async function visitAsync(node, visitor) {
    const visitor_ = initVisitor(visitor);
    if (isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE$1)
            node.contents = null;
    }
    else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visitAsync.BREAK = BREAK$1;
/** Do not visit the children of the current node */
visitAsync.SKIP = SKIP$1;
/** Remove the current node */
visitAsync.REMOVE = REMOVE$1;
async function visitAsync_(key, node, visitor, path) {
    const ctrl = await callVisitor(key, node, visitor, path);
    if (isNode(ctrl) || isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
    }
    if (typeof ctrl !== 'symbol') {
        if (isCollection$1(node)) {
            path = Object.freeze(path.concat(node));
            for (let i = 0; i < node.items.length; ++i) {
                const ci = await visitAsync_(i, node.items[i], visitor, path);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK$1)
                    return BREAK$1;
                else if (ci === REMOVE$1) {
                    node.items.splice(i, 1);
                    i -= 1;
                }
            }
        }
        else if (isPair(node)) {
            path = Object.freeze(path.concat(node));
            const ck = await visitAsync_('key', node.key, visitor, path);
            if (ck === BREAK$1)
                return BREAK$1;
            else if (ck === REMOVE$1)
                node.key = null;
            const cv = await visitAsync_('value', node.value, visitor, path);
            if (cv === BREAK$1)
                return BREAK$1;
            else if (cv === REMOVE$1)
                node.value = null;
        }
    }
    return ctrl;
}
function initVisitor(visitor) {
    if (typeof visitor === 'object' &&
        (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
            Alias: visitor.Node,
            Map: visitor.Node,
            Scalar: visitor.Node,
            Seq: visitor.Node
        }, visitor.Value && {
            Map: visitor.Value,
            Scalar: visitor.Value,
            Seq: visitor.Value
        }, visitor.Collection && {
            Map: visitor.Collection,
            Seq: visitor.Collection
        }, visitor);
    }
    return visitor;
}
function callVisitor(key, node, visitor, path) {
    if (typeof visitor === 'function')
        return visitor(key, node, path);
    if (isMap(node))
        return visitor.Map?.(key, node, path);
    if (isSeq(node))
        return visitor.Seq?.(key, node, path);
    if (isPair(node))
        return visitor.Pair?.(key, node, path);
    if (isScalar$1(node))
        return visitor.Scalar?.(key, node, path);
    if (isAlias(node))
        return visitor.Alias?.(key, node, path);
    return undefined;
}
function replaceNode(key, path, node) {
    const parent = path[path.length - 1];
    if (isCollection$1(parent)) {
        parent.items[key] = node;
    }
    else if (isPair(parent)) {
        if (key === 'key')
            parent.key = node;
        else
            parent.value = node;
    }
    else if (isDocument(parent)) {
        parent.contents = node;
    }
    else {
        const pt = isAlias(parent) ? 'alias' : 'scalar';
        throw new Error(`Cannot replace node with ${pt} parent`);
    }
}

const escapeChars = {
    '!': '%21',
    ',': '%2C',
    '[': '%5B',
    ']': '%5D',
    '{': '%7B',
    '}': '%7D'
};
const escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, ch => escapeChars[ch]);
class Directives {
    constructor(yaml, tags) {
        /**
         * The directives-end/doc-start marker `---`. If `null`, a marker may still be
         * included in the document's stringified representation.
         */
        this.docStart = null;
        /** The doc-end marker `...`.  */
        this.docEnd = false;
        this.yaml = Object.assign({}, Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, Directives.defaultTags, tags);
    }
    clone() {
        const copy = new Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
    }
    /**
     * During parsing, get a Directives instance for the current document and
     * update the stream state according to the current version's spec.
     */
    atDocument() {
        const res = new Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
            case '1.1':
                this.atNextDocument = true;
                break;
            case '1.2':
                this.atNextDocument = false;
                this.yaml = {
                    explicit: Directives.defaultYaml.explicit,
                    version: '1.2'
                };
                this.tags = Object.assign({}, Directives.defaultTags);
                break;
        }
        return res;
    }
    /**
     * @param onError - May be called even if the action was successful
     * @returns `true` on success
     */
    add(line, onError) {
        if (this.atNextDocument) {
            this.yaml = { explicit: Directives.defaultYaml.explicit, version: '1.1' };
            this.tags = Object.assign({}, Directives.defaultTags);
            this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
            case '%TAG': {
                if (parts.length !== 2) {
                    onError(0, '%TAG directive should contain exactly two parts');
                    if (parts.length < 2)
                        return false;
                }
                const [handle, prefix] = parts;
                this.tags[handle] = prefix;
                return true;
            }
            case '%YAML': {
                this.yaml.explicit = true;
                if (parts.length !== 1) {
                    onError(0, '%YAML directive should contain exactly one part');
                    return false;
                }
                const [version] = parts;
                if (version === '1.1' || version === '1.2') {
                    this.yaml.version = version;
                    return true;
                }
                else {
                    const isValid = /^\d+\.\d+$/.test(version);
                    onError(6, `Unsupported YAML version ${version}`, isValid);
                    return false;
                }
            }
            default:
                onError(0, `Unknown directive ${name}`, true);
                return false;
        }
    }
    /**
     * Resolves a tag, matching handles to those defined in %TAG directives.
     *
     * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
     *   `'!local'` tag, or `null` if unresolvable.
     */
    tagName(source, onError) {
        if (source === '!')
            return '!'; // non-specific tag
        if (source[0] !== '!') {
            onError(`Not a valid tag: ${source}`);
            return null;
        }
        if (source[1] === '<') {
            const verbatim = source.slice(2, -1);
            if (verbatim === '!' || verbatim === '!!') {
                onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
                return null;
            }
            if (source[source.length - 1] !== '>')
                onError('Verbatim tags must end with a >');
            return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
            onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
            try {
                return prefix + decodeURIComponent(suffix);
            }
            catch (error) {
                onError(String(error));
                return null;
            }
        }
        if (handle === '!')
            return source; // local tag
        onError(`Could not resolve tag: ${source}`);
        return null;
    }
    /**
     * Given a fully resolved tag, returns its printable string form,
     * taking into account current tag prefixes and defaults.
     */
    tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
            if (tag.startsWith(prefix))
                return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === '!' ? tag : `!<${tag}>`;
    }
    toString(doc) {
        const lines = this.yaml.explicit
            ? [`%YAML ${this.yaml.version || '1.2'}`]
            : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
            const tags = {};
            visit$1(doc.contents, (_key, node) => {
                if (isNode(node) && node.tag)
                    tags[node.tag] = true;
            });
            tagNames = Object.keys(tags);
        }
        else
            tagNames = [];
        for (const [handle, prefix] of tagEntries) {
            if (handle === '!!' && prefix === 'tag:yaml.org,2002:')
                continue;
            if (!doc || tagNames.some(tn => tn.startsWith(prefix)))
                lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join('\n');
    }
}
Directives.defaultYaml = { explicit: false, version: '1.2' };
Directives.defaultTags = { '!!': 'tag:yaml.org,2002:' };

/**
 * Verify that the input string is a valid anchor.
 *
 * Will throw on errors.
 */
function anchorIsValid(anchor) {
    if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
    }
    return true;
}
function anchorNames(root) {
    const anchors = new Set();
    visit$1(root, {
        Value(_key, node) {
            if (node.anchor)
                anchors.add(node.anchor);
        }
    });
    return anchors;
}
/** Find a new anchor name with the given `prefix` and a one-indexed suffix. */
function findNewAnchor(prefix, exclude) {
    for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
            return name;
    }
}
function createNodeAnchors(doc, prefix) {
    const aliasObjects = [];
    const sourceObjects = new Map();
    let prevAnchors = null;
    return {
        onAnchor: (source) => {
            aliasObjects.push(source);
            if (!prevAnchors)
                prevAnchors = anchorNames(doc);
            const anchor = findNewAnchor(prefix, prevAnchors);
            prevAnchors.add(anchor);
            return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
            for (const source of aliasObjects) {
                const ref = sourceObjects.get(source);
                if (typeof ref === 'object' &&
                    ref.anchor &&
                    (isScalar$1(ref.node) || isCollection$1(ref.node))) {
                    ref.node.anchor = ref.anchor;
                }
                else {
                    const error = new Error('Failed to resolve repeated object (this should not happen)');
                    error.source = source;
                    throw error;
                }
            }
        },
        sourceObjects
    };
}

/**
 * Applies the JSON.parse reviver algorithm as defined in the ECMA-262 spec,
 * in section 24.5.1.1 "Runtime Semantics: InternalizeJSONProperty" of the
 * 2021 edition: https://tc39.es/ecma262/#sec-json.parse
 *
 * Includes extensions for handling Map and Set objects.
 */
function applyReviver(reviver, obj, key, val) {
    if (val && typeof val === 'object') {
        if (Array.isArray(val)) {
            for (let i = 0, len = val.length; i < len; ++i) {
                const v0 = val[i];
                const v1 = applyReviver(reviver, val, String(i), v0);
                // eslint-disable-next-line @typescript-eslint/no-array-delete
                if (v1 === undefined)
                    delete val[i];
                else if (v1 !== v0)
                    val[i] = v1;
            }
        }
        else if (val instanceof Map) {
            for (const k of Array.from(val.keys())) {
                const v0 = val.get(k);
                const v1 = applyReviver(reviver, val, k, v0);
                if (v1 === undefined)
                    val.delete(k);
                else if (v1 !== v0)
                    val.set(k, v1);
            }
        }
        else if (val instanceof Set) {
            for (const v0 of Array.from(val)) {
                const v1 = applyReviver(reviver, val, v0, v0);
                if (v1 === undefined)
                    val.delete(v0);
                else if (v1 !== v0) {
                    val.delete(v0);
                    val.add(v1);
                }
            }
        }
        else {
            for (const [k, v0] of Object.entries(val)) {
                const v1 = applyReviver(reviver, val, k, v0);
                if (v1 === undefined)
                    delete val[k];
                else if (v1 !== v0)
                    val[k] = v1;
            }
        }
    }
    return reviver.call(obj, key, val);
}

/**
 * Recursively convert any node or its contents to native JavaScript
 *
 * @param value - The input value
 * @param arg - If `value` defines a `toJSON()` method, use this
 *   as its first argument
 * @param ctx - Conversion context, originally set in Document#toJS(). If
 *   `{ keep: true }` is not set, output should be suitable for JSON
 *   stringification.
 */
function toJS(value, arg, ctx) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
    if (value && typeof value.toJSON === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!ctx || !hasAnchor(value))
            return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: undefined };
        ctx.anchors.set(value, data);
        ctx.onCreate = res => {
            data.res = res;
            delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
            ctx.onCreate(res);
        return res;
    }
    if (typeof value === 'bigint' && !ctx?.keep)
        return Number(value);
    return value;
}

class NodeBase {
    constructor(type) {
        Object.defineProperty(this, NODE_TYPE, { value: type });
    }
    /** Create a copy of this node.  */
    clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /** A plain JavaScript representation of this node. */
    toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!isDocument(doc))
            throw new TypeError('A document argument is required');
        const ctx = {
            anchors: new Map(),
            doc,
            keep: true,
            mapAsMap: mapAsMap === true,
            mapKeyWarned: false,
            maxAliasCount: typeof maxAliasCount === 'number' ? maxAliasCount : 100
        };
        const res = toJS(this, '', ctx);
        if (typeof onAnchor === 'function')
            for (const { count, res } of ctx.anchors.values())
                onAnchor(res, count);
        return typeof reviver === 'function'
            ? applyReviver(reviver, { '': res }, '', res)
            : res;
    }
}

class Alias extends NodeBase {
    constructor(source) {
        super(ALIAS);
        this.source = source;
        Object.defineProperty(this, 'tag', {
            set() {
                throw new Error('Alias nodes cannot have tags');
            }
        });
    }
    /**
     * Resolve the value of this alias within `doc`, finding the last
     * instance of the `source` anchor before this node.
     */
    resolve(doc) {
        let found = undefined;
        visit$1(doc, {
            Node: (_key, node) => {
                if (node === this)
                    return visit$1.BREAK;
                if (node.anchor === this.source)
                    found = node;
            }
        });
        return found;
    }
    toJSON(_arg, ctx) {
        if (!ctx)
            return { source: this.source };
        const { anchors, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc);
        if (!source) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new ReferenceError(msg);
        }
        let data = anchors.get(source);
        if (!data) {
            // Resolve anchors for Node.prototype.toJS()
            toJS(source, null, ctx);
            data = anchors.get(source);
        }
        /* istanbul ignore if */
        if (!data || data.res === undefined) {
            const msg = 'This should not happen: Alias anchor was not resolved?';
            throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
            data.count += 1;
            if (data.aliasCount === 0)
                data.aliasCount = getAliasCount(doc, source, anchors);
            if (data.count * data.aliasCount > maxAliasCount) {
                const msg = 'Excessive alias count indicates a resource exhaustion attack';
                throw new ReferenceError(msg);
            }
        }
        return data.res;
    }
    toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
            anchorIsValid(this.source);
            if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
                const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
                throw new Error(msg);
            }
            if (ctx.implicitKey)
                return `${src} `;
        }
        return src;
    }
}
function getAliasCount(doc, node, anchors) {
    if (isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors && source && anchors.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
    }
    else if (isCollection$1(node)) {
        let count = 0;
        for (const item of node.items) {
            const c = getAliasCount(doc, item, anchors);
            if (c > count)
                count = c;
        }
        return count;
    }
    else if (isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors);
        const vc = getAliasCount(doc, node.value, anchors);
        return Math.max(kc, vc);
    }
    return 1;
}

const isScalarValue = (value) => !value || (typeof value !== 'function' && typeof value !== 'object');
class Scalar extends NodeBase {
    constructor(value) {
        super(SCALAR$1);
        this.value = value;
    }
    toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS(this.value, arg, ctx);
    }
    toString() {
        return String(this.value);
    }
}
Scalar.BLOCK_FOLDED = 'BLOCK_FOLDED';
Scalar.BLOCK_LITERAL = 'BLOCK_LITERAL';
Scalar.PLAIN = 'PLAIN';
Scalar.QUOTE_DOUBLE = 'QUOTE_DOUBLE';
Scalar.QUOTE_SINGLE = 'QUOTE_SINGLE';

const defaultTagPrefix = 'tag:yaml.org,2002:';
function findTagObject(value, tagName, tags) {
    if (tagName) {
        const match = tags.filter(t => t.tag === tagName);
        const tagObj = match.find(t => !t.format) ?? match[0];
        if (!tagObj)
            throw new Error(`Tag ${tagName} not found`);
        return tagObj;
    }
    return tags.find(t => t.identify?.(value) && !t.format);
}
function createNode(value, tagName, ctx) {
    if (isDocument(value))
        value = value.contents;
    if (isNode(value))
        return value;
    if (isPair(value)) {
        const map = ctx.schema[MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
    }
    if (value instanceof String ||
        value instanceof Number ||
        value instanceof Boolean ||
        (typeof BigInt !== 'undefined' && value instanceof BigInt) // not supported everywhere
    ) {
        // https://tc39.es/ecma262/#sec-serializejsonproperty
        value = value.valueOf();
    }
    const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
    // Detect duplicate references to the same object & use Alias nodes for all
    // after first. The `ref` wrapper allows for circular references to resolve.
    let ref = undefined;
    if (aliasDuplicateObjects && value && typeof value === 'object') {
        ref = sourceObjects.get(value);
        if (ref) {
            if (!ref.anchor)
                ref.anchor = onAnchor(value);
            return new Alias(ref.anchor);
        }
        else {
            ref = { anchor: null, node: null };
            sourceObjects.set(value, ref);
        }
    }
    if (tagName?.startsWith('!!'))
        tagName = defaultTagPrefix + tagName.slice(2);
    let tagObj = findTagObject(value, tagName, schema.tags);
    if (!tagObj) {
        if (value && typeof value.toJSON === 'function') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            value = value.toJSON();
        }
        if (!value || typeof value !== 'object') {
            const node = new Scalar(value);
            if (ref)
                ref.node = node;
            return node;
        }
        tagObj =
            value instanceof Map
                ? schema[MAP]
                : Symbol.iterator in Object(value)
                    ? schema[SEQ]
                    : schema[MAP];
    }
    if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
    }
    const node = tagObj?.createNode
        ? tagObj.createNode(ctx.schema, value, ctx)
        : typeof tagObj?.nodeClass?.from === 'function'
            ? tagObj.nodeClass.from(ctx.schema, value, ctx)
            : new Scalar(value);
    if (tagName)
        node.tag = tagName;
    else if (!tagObj.default)
        node.tag = tagObj.tag;
    if (ref)
        ref.node = node;
    return node;
}

function collectionFromPath(schema, path, value) {
    let v = value;
    for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === 'number' && Number.isInteger(k) && k >= 0) {
            const a = [];
            a[k] = v;
            v = a;
        }
        else {
            v = new Map([[k, v]]);
        }
    }
    return createNode(v, undefined, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
            throw new Error('This should not happen, please report a bug.');
        },
        schema,
        sourceObjects: new Map()
    });
}
// Type guard is intentionally a little wrong so as to be more useful,
// as it does not cover untypable empty non-string iterables (e.g. []).
const isEmptyPath = (path) => path == null ||
    (typeof path === 'object' && !!path[Symbol.iterator]().next().done);
class Collection extends NodeBase {
    constructor(type, schema) {
        super(type);
        Object.defineProperty(this, 'schema', {
            value: schema,
            configurable: true,
            enumerable: false,
            writable: true
        });
    }
    /**
     * Create a copy of this collection.
     *
     * @param schema - If defined, overwrites the original's schema
     */
    clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
            copy.schema = schema;
        copy.items = copy.items.map(it => isNode(it) || isPair(it) ? it.clone(schema) : it);
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /**
     * Adds a value to the collection. For `!!map` and `!!omap` the value must
     * be a Pair instance or a `{ key, value }` object, which may not have a key
     * that already exists in the map.
     */
    addIn(path, value) {
        if (isEmptyPath(path))
            this.add(value);
        else {
            const [key, ...rest] = path;
            const node = this.get(key, true);
            if (isCollection$1(node))
                node.addIn(rest, value);
            else if (node === undefined && this.schema)
                this.set(key, collectionFromPath(this.schema, rest, value));
            else
                throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
    }
    /**
     * Removes a value from the collection.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
            return this.delete(key);
        const node = this.get(key, true);
        if (isCollection$1(node))
            return node.deleteIn(rest);
        else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
            return !keepScalar && isScalar$1(node) ? node.value : node;
        else
            return isCollection$1(node) ? node.getIn(rest, keepScalar) : undefined;
    }
    hasAllNullValues(allowScalar) {
        return this.items.every(node => {
            if (!isPair(node))
                return false;
            const n = node.value;
            return (n == null ||
                (allowScalar &&
                    isScalar$1(n) &&
                    n.value == null &&
                    !n.commentBefore &&
                    !n.comment &&
                    !n.tag));
        });
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     */
    hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
            return this.has(key);
        const node = this.get(key, true);
        return isCollection$1(node) ? node.hasIn(rest) : false;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
            this.set(key, value);
        }
        else {
            const node = this.get(key, true);
            if (isCollection$1(node))
                node.setIn(rest, value);
            else if (node === undefined && this.schema)
                this.set(key, collectionFromPath(this.schema, rest, value));
            else
                throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
    }
}

/**
 * Stringifies a comment.
 *
 * Empty comment lines are left empty,
 * lines consisting of a single space are replaced by `#`,
 * and all other lines are prefixed with a `#`.
 */
const stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, '#');
function indentComment(comment, indent) {
    if (/^\n+$/.test(comment))
        return comment.substring(1);
    return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
const lineComment = (str, indent, comment) => str.endsWith('\n')
    ? indentComment(comment, indent)
    : comment.includes('\n')
        ? '\n' + indentComment(comment, indent)
        : (str.endsWith(' ') ? '' : ' ') + comment;

const FOLD_FLOW = 'flow';
const FOLD_BLOCK = 'block';
const FOLD_QUOTED = 'quoted';
/**
 * Tries to keep input at up to `lineWidth` characters, splitting only on spaces
 * not followed by newlines or spaces unless `mode` is `'quoted'`. Lines are
 * terminated with `\n` and started with `indent`.
 */
function foldFlowLines(text, indent, mode = 'flow', { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
    if (!lineWidth || lineWidth < 0)
        return text;
    if (lineWidth < minContentWidth)
        minContentWidth = 0;
    const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
    if (text.length <= endStep)
        return text;
    const folds = [];
    const escapedFolds = {};
    let end = lineWidth - indent.length;
    if (typeof indentAtStart === 'number') {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
            folds.push(0);
        else
            end = lineWidth - indentAtStart;
    }
    let split = undefined;
    let prev = undefined;
    let overflow = false;
    let i = -1;
    let escStart = -1;
    let escEnd = -1;
    if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent.length);
        if (i !== -1)
            end = i + endStep;
    }
    for (let ch; (ch = text[(i += 1)]);) {
        if (mode === FOLD_QUOTED && ch === '\\') {
            escStart = i;
            switch (text[i + 1]) {
                case 'x':
                    i += 3;
                    break;
                case 'u':
                    i += 5;
                    break;
                case 'U':
                    i += 9;
                    break;
                default:
                    i += 1;
            }
            escEnd = i;
        }
        if (ch === '\n') {
            if (mode === FOLD_BLOCK)
                i = consumeMoreIndentedLines(text, i, indent.length);
            end = i + indent.length + endStep;
            split = undefined;
        }
        else {
            if (ch === ' ' &&
                prev &&
                prev !== ' ' &&
                prev !== '\n' &&
                prev !== '\t') {
                // space surrounded by non-space can be replaced with newline + indent
                const next = text[i + 1];
                if (next && next !== ' ' && next !== '\n' && next !== '\t')
                    split = i;
            }
            if (i >= end) {
                if (split) {
                    folds.push(split);
                    end = split + endStep;
                    split = undefined;
                }
                else if (mode === FOLD_QUOTED) {
                    // white-space collected at end may stretch past lineWidth
                    while (prev === ' ' || prev === '\t') {
                        prev = ch;
                        ch = text[(i += 1)];
                        overflow = true;
                    }
                    // Account for newline escape, but don't break preceding escape
                    const j = i > escEnd + 1 ? i - 2 : escStart - 1;
                    // Bail out if lineWidth & minContentWidth are shorter than an escape string
                    if (escapedFolds[j])
                        return text;
                    folds.push(j);
                    escapedFolds[j] = true;
                    end = j + endStep;
                    split = undefined;
                }
                else {
                    overflow = true;
                }
            }
        }
        prev = ch;
    }
    if (overflow && onOverflow)
        onOverflow();
    if (folds.length === 0)
        return text;
    if (onFold)
        onFold();
    let res = text.slice(0, folds[0]);
    for (let i = 0; i < folds.length; ++i) {
        const fold = folds[i];
        const end = folds[i + 1] || text.length;
        if (fold === 0)
            res = `\n${indent}${text.slice(0, end)}`;
        else {
            if (mode === FOLD_QUOTED && escapedFolds[fold])
                res += `${text[fold]}\\`;
            res += `\n${indent}${text.slice(fold + 1, end)}`;
        }
    }
    return res;
}
/**
 * Presumes `i + 1` is at the start of a line
 * @returns index of last newline in more-indented block
 */
function consumeMoreIndentedLines(text, i, indent) {
    let end = i;
    let start = i + 1;
    let ch = text[start];
    while (ch === ' ' || ch === '\t') {
        if (i < start + indent) {
            ch = text[++i];
        }
        else {
            do {
                ch = text[++i];
            } while (ch && ch !== '\n');
            end = i;
            start = i + 1;
            ch = text[start];
        }
    }
    return end;
}

const getFoldOptions = (ctx, isBlock) => ({
    indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
    lineWidth: ctx.options.lineWidth,
    minContentWidth: ctx.options.minContentWidth
});
// Also checks for lines starting with %, as parsing the output as YAML 1.1 will
// presume that's starting a new document.
const containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
function lineLengthOverLimit(str, lineWidth, indentLength) {
    if (!lineWidth || lineWidth < 0)
        return false;
    const limit = lineWidth - indentLength;
    const strLen = str.length;
    if (strLen <= limit)
        return false;
    for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === '\n') {
            if (i - start > limit)
                return true;
            start = i + 1;
            if (strLen - start <= limit)
                return false;
        }
    }
    return true;
}
function doubleQuotedString(value, ctx) {
    const json = JSON.stringify(value);
    if (ctx.options.doubleQuotedAsJSON)
        return json;
    const { implicitKey } = ctx;
    const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
    const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
    let str = '';
    let start = 0;
    for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === ' ' && json[i + 1] === '\\' && json[i + 2] === 'n') {
            // space before newline needs to be escaped to not be folded
            str += json.slice(start, i) + '\\ ';
            i += 1;
            start = i;
            ch = '\\';
        }
        if (ch === '\\')
            switch (json[i + 1]) {
                case 'u':
                    {
                        str += json.slice(start, i);
                        const code = json.substr(i + 2, 4);
                        switch (code) {
                            case '0000':
                                str += '\\0';
                                break;
                            case '0007':
                                str += '\\a';
                                break;
                            case '000b':
                                str += '\\v';
                                break;
                            case '001b':
                                str += '\\e';
                                break;
                            case '0085':
                                str += '\\N';
                                break;
                            case '00a0':
                                str += '\\_';
                                break;
                            case '2028':
                                str += '\\L';
                                break;
                            case '2029':
                                str += '\\P';
                                break;
                            default:
                                if (code.substr(0, 2) === '00')
                                    str += '\\x' + code.substr(2);
                                else
                                    str += json.substr(i, 6);
                        }
                        i += 5;
                        start = i + 1;
                    }
                    break;
                case 'n':
                    if (implicitKey ||
                        json[i + 2] === '"' ||
                        json.length < minMultiLineLength) {
                        i += 1;
                    }
                    else {
                        // folding will eat first newline
                        str += json.slice(start, i) + '\n\n';
                        while (json[i + 2] === '\\' &&
                            json[i + 3] === 'n' &&
                            json[i + 4] !== '"') {
                            str += '\n';
                            i += 2;
                        }
                        str += indent;
                        // space after newline needs to be escaped to not be folded
                        if (json[i + 2] === ' ')
                            str += '\\';
                        i += 1;
                        start = i + 1;
                    }
                    break;
                default:
                    i += 1;
            }
    }
    str = start ? str + json.slice(start) : json;
    return implicitKey
        ? str
        : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
}
function singleQuotedString(value, ctx) {
    if (ctx.options.singleQuote === false ||
        (ctx.implicitKey && value.includes('\n')) ||
        /[ \t]\n|\n[ \t]/.test(value) // single quoted string can't have leading or trailing whitespace around newline
    )
        return doubleQuotedString(value, ctx);
    const indent = ctx.indent || (containsDocumentMarker(value) ? '  ' : '');
    const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&\n${indent}`) + "'";
    return ctx.implicitKey
        ? res
        : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function quotedString(value, ctx) {
    const { singleQuote } = ctx.options;
    let qs;
    if (singleQuote === false)
        qs = doubleQuotedString;
    else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
            qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
            qs = doubleQuotedString;
        else
            qs = singleQuote ? singleQuotedString : doubleQuotedString;
    }
    return qs(value, ctx);
}
// The negative lookbehind avoids a polynomial search,
// but isn't supported yet on Safari: https://caniuse.com/js-regexp-lookbehind
let blockEndNewlines;
try {
    blockEndNewlines = new RegExp('(^|(?<!\n))\n+(?!\n|$)', 'g');
}
catch {
    blockEndNewlines = /\n+(?!\n|$)/g;
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
    const { blockQuote, commentString, lineWidth } = ctx.options;
    // 1. Block can't end in whitespace unless the last line is non-empty.
    // 2. Strings consisting of only whitespace are best rendered explicitly.
    if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return quotedString(value, ctx);
    }
    const indent = ctx.indent ||
        (ctx.forceBlockIndent || containsDocumentMarker(value) ? '  ' : '');
    const literal = blockQuote === 'literal'
        ? true
        : blockQuote === 'folded' || type === Scalar.BLOCK_FOLDED
            ? false
            : type === Scalar.BLOCK_LITERAL
                ? true
                : !lineLengthOverLimit(value, lineWidth, indent.length);
    if (!value)
        return literal ? '|\n' : '>\n';
    // determine chomping from whitespace at value end
    let chomp;
    let endStart;
    for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== '\n' && ch !== '\t' && ch !== ' ')
            break;
    }
    let end = value.substring(endStart);
    const endNlPos = end.indexOf('\n');
    if (endNlPos === -1) {
        chomp = '-'; // strip
    }
    else if (value === end || endNlPos !== end.length - 1) {
        chomp = '+'; // keep
        if (onChompKeep)
            onChompKeep();
    }
    else {
        chomp = ''; // clip
    }
    if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === '\n')
            end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
    }
    // determine indent indicator from whitespace at value start
    let startWithSpace = false;
    let startEnd;
    let startNlPos = -1;
    for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === ' ')
            startWithSpace = true;
        else if (ch === '\n')
            startNlPos = startEnd;
        else
            break;
    }
    let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
    if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
    }
    const indentSize = indent ? '2' : '1'; // root is at -1
    // Leading | or > is added later
    let header = (startWithSpace ? indentSize : '') + chomp;
    if (comment) {
        header += ' ' + commentString(comment.replace(/ ?[\r\n]+/g, ' '));
        if (onComment)
            onComment();
    }
    if (!literal) {
        const foldedValue = value
            .replace(/\n+/g, '\n$&')
            .replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, '$1$2') // more-indented lines aren't folded
            //                ^ more-ind. ^ empty     ^ capture next empty lines only at end of indent
            .replace(/\n+/g, `$&${indent}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== 'folded' && type !== Scalar.BLOCK_FOLDED) {
            foldOptions.onOverflow = () => {
                literalFallback = true;
            };
        }
        const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
        if (!literalFallback)
            return `>${header}\n${indent}${body}`;
    }
    value = value.replace(/\n+/g, `$&${indent}`);
    return `|${header}\n${indent}${start}${value}${end}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
    const { type, value } = item;
    const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
    if ((implicitKey && value.includes('\n')) ||
        (inFlow && /[[\]{},]/.test(value))) {
        return quotedString(value, ctx);
    }
    if (!value ||
        /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        // not allowed:
        // - empty string, '-' or '?'
        // - start with an indicator character (except [?:-]) or /[?-] /
        // - '\n ', ': ' or ' \n' anywhere
        // - '#' not preceded by a non-space char
        // - end with ' ' or ':'
        return implicitKey || inFlow || !value.includes('\n')
            ? quotedString(value, ctx)
            : blockString(item, ctx, onComment, onChompKeep);
    }
    if (!implicitKey &&
        !inFlow &&
        type !== Scalar.PLAIN &&
        value.includes('\n')) {
        // Where allowed & type not set explicitly, prefer block style for multiline strings
        return blockString(item, ctx, onComment, onChompKeep);
    }
    if (containsDocumentMarker(value)) {
        if (indent === '') {
            ctx.forceBlockIndent = true;
            return blockString(item, ctx, onComment, onChompKeep);
        }
        else if (implicitKey && indent === indentStep) {
            return quotedString(value, ctx);
        }
    }
    const str = value.replace(/\n+/g, `$&\n${indent}`);
    // Verify that output will be parsed as a string, as e.g. plain numbers and
    // booleans get parsed with those types in v1.2 (e.g. '42', 'true' & '0.9e-3'),
    // and others in v1.1.
    if (actualString) {
        const test = (tag) => tag.default && tag.tag !== 'tag:yaml.org,2002:str' && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
            return quotedString(value, ctx);
    }
    return implicitKey
        ? str
        : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function stringifyString(item, ctx, onComment, onChompKeep) {
    const { implicitKey, inFlow } = ctx;
    const ss = typeof item.value === 'string'
        ? item
        : Object.assign({}, item, { value: String(item.value) });
    let { type } = item;
    if (type !== Scalar.QUOTE_DOUBLE) {
        // force double quotes on control characters & unpaired surrogates
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
            type = Scalar.QUOTE_DOUBLE;
    }
    const _stringify = (_type) => {
        switch (_type) {
            case Scalar.BLOCK_FOLDED:
            case Scalar.BLOCK_LITERAL:
                return implicitKey || inFlow
                    ? quotedString(ss.value, ctx) // blocks are not valid inside flow containers
                    : blockString(ss, ctx, onComment, onChompKeep);
            case Scalar.QUOTE_DOUBLE:
                return doubleQuotedString(ss.value, ctx);
            case Scalar.QUOTE_SINGLE:
                return singleQuotedString(ss.value, ctx);
            case Scalar.PLAIN:
                return plainString(ss, ctx, onComment, onChompKeep);
            default:
                return null;
        }
    };
    let res = _stringify(type);
    if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = (implicitKey && defaultKeyType) || defaultStringType;
        res = _stringify(t);
        if (res === null)
            throw new Error(`Unsupported default string type ${t}`);
    }
    return res;
}

function createStringifyContext(doc, options) {
    const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment,
        defaultKeyType: null,
        defaultStringType: 'PLAIN',
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: 'false',
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: 'null',
        simpleKeys: false,
        singleQuote: null,
        trueStr: 'true',
        verifyAliasOrder: true
    }, doc.schema.toStringOptions, options);
    let inFlow;
    switch (opt.collectionStyle) {
        case 'block':
            inFlow = false;
            break;
        case 'flow':
            inFlow = true;
            break;
        default:
            inFlow = null;
    }
    return {
        anchors: new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? ' ' : '',
        indent: '',
        indentStep: typeof opt.indent === 'number' ? ' '.repeat(opt.indent) : '  ',
        inFlow,
        options: opt
    };
}
function getTagObject(tags, item) {
    if (item.tag) {
        const match = tags.filter(t => t.tag === item.tag);
        if (match.length > 0)
            return match.find(t => t.format === item.format) ?? match[0];
    }
    let tagObj = undefined;
    let obj;
    if (isScalar$1(item)) {
        obj = item.value;
        let match = tags.filter(t => t.identify?.(obj));
        if (match.length > 1) {
            const testMatch = match.filter(t => t.test);
            if (testMatch.length > 0)
                match = testMatch;
        }
        tagObj =
            match.find(t => t.format === item.format) ?? match.find(t => !t.format);
    }
    else {
        obj = item;
        tagObj = tags.find(t => t.nodeClass && obj instanceof t.nodeClass);
    }
    if (!tagObj) {
        const name = obj?.constructor?.name ?? typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
    }
    return tagObj;
}
// needs to be called before value stringifier to allow for circular anchor refs
function stringifyProps(node, tagObj, { anchors, doc }) {
    if (!doc.directives)
        return '';
    const props = [];
    const anchor = (isScalar$1(node) || isCollection$1(node)) && node.anchor;
    if (anchor && anchorIsValid(anchor)) {
        anchors.add(anchor);
        props.push(`&${anchor}`);
    }
    const tag = node.tag ? node.tag : tagObj.default ? null : tagObj.tag;
    if (tag)
        props.push(doc.directives.tagString(tag));
    return props.join(' ');
}
function stringify$2(item, ctx, onComment, onChompKeep) {
    if (isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
    if (isAlias(item)) {
        if (ctx.doc.directives)
            return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
            throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        }
        else {
            if (ctx.resolvedAliases)
                ctx.resolvedAliases.add(item);
            else
                ctx.resolvedAliases = new Set([item]);
            item = item.resolve(ctx.doc);
        }
    }
    let tagObj = undefined;
    const node = isNode(item)
        ? item
        : ctx.doc.createNode(item, { onTagObj: o => (tagObj = o) });
    if (!tagObj)
        tagObj = getTagObject(ctx.doc.schema.tags, node);
    const props = stringifyProps(node, tagObj, ctx);
    if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
    const str = typeof tagObj.stringify === 'function'
        ? tagObj.stringify(node, ctx, onComment, onChompKeep)
        : isScalar$1(node)
            ? stringifyString(node, ctx, onComment, onChompKeep)
            : node.toString(ctx, onComment, onChompKeep);
    if (!props)
        return str;
    return isScalar$1(node) || str[0] === '{' || str[0] === '['
        ? `${props} ${str}`
        : `${props}\n${ctx.indent}${str}`;
}

function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
    const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
    let keyComment = (isNode(key) && key.comment) || null;
    if (simpleKeys) {
        if (keyComment) {
            throw new Error('With simple keys, key nodes cannot have comments');
        }
        if (isCollection$1(key) || (!isNode(key) && typeof key === 'object')) {
            const msg = 'With simple keys, collection cannot be used as a key value';
            throw new Error(msg);
        }
    }
    let explicitKey = !simpleKeys &&
        (!key ||
            (keyComment && value == null && !ctx.inFlow) ||
            isCollection$1(key) ||
            (isScalar$1(key)
                ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL
                : typeof key === 'object'));
    ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
    });
    let keyCommentDone = false;
    let chompKeep = false;
    let str = stringify$2(key, ctx, () => (keyCommentDone = true), () => (chompKeep = true));
    if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
            throw new Error('With simple keys, single line scalar must not span more than 1024 characters');
        explicitKey = true;
    }
    if (ctx.inFlow) {
        if (allNullValues || value == null) {
            if (keyCommentDone && onComment)
                onComment();
            return str === '' ? '?' : explicitKey ? `? ${str}` : str;
        }
    }
    else if ((allNullValues && !simpleKeys) || (value == null && explicitKey)) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
            str += lineComment(str, ctx.indent, commentString(keyComment));
        }
        else if (chompKeep && onChompKeep)
            onChompKeep();
        return str;
    }
    if (keyCommentDone)
        keyComment = null;
    if (explicitKey) {
        if (keyComment)
            str += lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}\n${indent}:`;
    }
    else {
        str = `${str}:`;
        if (keyComment)
            str += lineComment(str, ctx.indent, commentString(keyComment));
    }
    let vsb, vcb, valueComment;
    if (isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
    }
    else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === 'object')
            value = doc.createNode(value);
    }
    ctx.implicitKey = false;
    if (!explicitKey && !keyComment && isScalar$1(value))
        ctx.indentAtStart = str.length + 1;
    chompKeep = false;
    if (!indentSeq &&
        indentStep.length >= 2 &&
        !ctx.inFlow &&
        !explicitKey &&
        isSeq(value) &&
        !value.flow &&
        !value.tag &&
        !value.anchor) {
        // If indentSeq === false, consider '- ' as part of indentation where possible
        ctx.indent = ctx.indent.substring(2);
    }
    let valueCommentDone = false;
    const valueStr = stringify$2(value, ctx, () => (valueCommentDone = true), () => (chompKeep = true));
    let ws = ' ';
    if (keyComment || vsb || vcb) {
        ws = vsb ? '\n' : '';
        if (vcb) {
            const cs = commentString(vcb);
            ws += `\n${indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === '' && !ctx.inFlow) {
            if (ws === '\n')
                ws = '\n\n';
        }
        else {
            ws += `\n${ctx.indent}`;
        }
    }
    else if (!explicitKey && isCollection$1(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf('\n');
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
            let hasPropsLine = false;
            if (hasNewline && (vs0 === '&' || vs0 === '!')) {
                let sp0 = valueStr.indexOf(' ');
                if (vs0 === '&' &&
                    sp0 !== -1 &&
                    sp0 < nl0 &&
                    valueStr[sp0 + 1] === '!') {
                    sp0 = valueStr.indexOf(' ', sp0 + 1);
                }
                if (sp0 === -1 || nl0 < sp0)
                    hasPropsLine = true;
            }
            if (!hasPropsLine)
                ws = `\n${ctx.indent}`;
        }
    }
    else if (valueStr === '' || valueStr[0] === '\n') {
        ws = '';
    }
    str += ws + valueStr;
    if (ctx.inFlow) {
        if (valueCommentDone && onComment)
            onComment();
    }
    else if (valueComment && !valueCommentDone) {
        str += lineComment(str, ctx.indent, commentString(valueComment));
    }
    else if (chompKeep && onChompKeep) {
        onChompKeep();
    }
    return str;
}

function warn(logLevel, warning) {
    if (logLevel === 'debug' || logLevel === 'warn') {
        console.warn(warning);
    }
}

// If the value associated with a merge key is a single mapping node, each of
// its key/value pairs is inserted into the current mapping, unless the key
// already exists in it. If the value associated with the merge key is a
// sequence, then this sequence is expected to contain mapping nodes and each
// of these nodes is merged in turn according to its order in the sequence.
// Keys in mapping nodes earlier in the sequence override keys specified in
// later mapping nodes. -- http://yaml.org/type/merge.html
const MERGE_KEY = '<<';
const merge = {
    identify: value => value === MERGE_KEY ||
        (typeof value === 'symbol' && value.description === MERGE_KEY),
    default: 'key',
    tag: 'tag:yaml.org,2002:merge',
    test: /^<<$/,
    resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
    }),
    stringify: () => MERGE_KEY
};
const isMergeKey = (ctx, key) => (merge.identify(key) ||
    (isScalar$1(key) &&
        (!key.type || key.type === Scalar.PLAIN) &&
        merge.identify(key.value))) &&
    ctx?.doc.schema.tags.some(tag => tag.tag === merge.tag && tag.default);
function addMergeToJSMap(ctx, map, value) {
    value = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
    if (isSeq(value))
        for (const it of value.items)
            mergeValue(ctx, map, it);
    else if (Array.isArray(value))
        for (const it of value)
            mergeValue(ctx, map, it);
    else
        mergeValue(ctx, map, value);
}
function mergeValue(ctx, map, value) {
    const source = ctx && isAlias(value) ? value.resolve(ctx.doc) : value;
    if (!isMap(source))
        throw new Error('Merge sources must be maps or map aliases');
    const srcMap = source.toJSON(null, ctx, Map);
    for (const [key, value] of srcMap) {
        if (map instanceof Map) {
            if (!map.has(key))
                map.set(key, value);
        }
        else if (map instanceof Set) {
            map.add(key);
        }
        else if (!Object.prototype.hasOwnProperty.call(map, key)) {
            Object.defineProperty(map, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
            });
        }
    }
    return map;
}

function addPairToJSMap(ctx, map, { key, value }) {
    if (isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
    // TODO: Should drop this special case for bare << handling
    else if (isMergeKey(ctx, key))
        addMergeToJSMap(ctx, map, value);
    else {
        const jsKey = toJS(key, '', ctx);
        if (map instanceof Map) {
            map.set(jsKey, toJS(value, jsKey, ctx));
        }
        else if (map instanceof Set) {
            map.add(jsKey);
        }
        else {
            const stringKey = stringifyKey(key, jsKey, ctx);
            const jsValue = toJS(value, stringKey, ctx);
            if (stringKey in map)
                Object.defineProperty(map, stringKey, {
                    value: jsValue,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            else
                map[stringKey] = jsValue;
        }
    }
    return map;
}
function stringifyKey(key, jsKey, ctx) {
    if (jsKey === null)
        return '';
    if (typeof jsKey !== 'object')
        return String(jsKey);
    if (isNode(key) && ctx?.doc) {
        const strCtx = createStringifyContext(ctx.doc, {});
        strCtx.anchors = new Set();
        for (const node of ctx.anchors.keys())
            strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
            let jsonStr = JSON.stringify(strKey);
            if (jsonStr.length > 40)
                jsonStr = jsonStr.substring(0, 36) + '..."';
            warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
            ctx.mapKeyWarned = true;
        }
        return strKey;
    }
    return JSON.stringify(jsKey);
}

function createPair(key, value, ctx) {
    const k = createNode(key, undefined, ctx);
    const v = createNode(value, undefined, ctx);
    return new Pair(k, v);
}
class Pair {
    constructor(key, value = null) {
        Object.defineProperty(this, NODE_TYPE, { value: PAIR });
        this.key = key;
        this.value = value;
    }
    clone(schema) {
        let { key, value } = this;
        if (isNode(key))
            key = key.clone(schema);
        if (isNode(value))
            value = value.clone(schema);
        return new Pair(key, value);
    }
    toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? new Map() : {};
        return addPairToJSMap(ctx, pair, this);
    }
    toString(ctx, onComment, onChompKeep) {
        return ctx?.doc
            ? stringifyPair(this, ctx, onComment, onChompKeep)
            : JSON.stringify(this);
    }
}

function stringifyCollection(collection, ctx, options) {
    const flow = ctx.inFlow ?? collection.flow;
    const stringify = flow ? stringifyFlowCollection : stringifyBlockCollection;
    return stringify(collection, ctx, options);
}
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
    const { indent, options: { commentString } } = ctx;
    const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
    let chompKeep = false; // flag for the preceding node's status
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (isNode(item)) {
            if (!chompKeep && item.spaceBefore)
                lines.push('');
            addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
            if (item.comment)
                comment = item.comment;
        }
        else if (isPair(item)) {
            const ik = isNode(item.key) ? item.key : null;
            if (ik) {
                if (!chompKeep && ik.spaceBefore)
                    lines.push('');
                addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
            }
        }
        chompKeep = false;
        let str = stringify$2(item, itemCtx, () => (comment = null), () => (chompKeep = true));
        if (comment)
            str += lineComment(str, itemIndent, commentString(comment));
        if (chompKeep && comment)
            chompKeep = false;
        lines.push(blockItemPrefix + str);
    }
    let str;
    if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
    }
    else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
            const line = lines[i];
            str += line ? `\n${indent}${line}` : '\n';
        }
    }
    if (comment) {
        str += '\n' + indentComment(commentString(comment), indent);
        if (onComment)
            onComment();
    }
    else if (chompKeep && onChompKeep)
        onChompKeep();
    return str;
}
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
    const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
    itemIndent += indentStep;
    const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
    });
    let reqNewline = false;
    let linesAtValue = 0;
    const lines = [];
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (isNode(item)) {
            if (item.spaceBefore)
                lines.push('');
            addCommentBefore(ctx, lines, item.commentBefore, false);
            if (item.comment)
                comment = item.comment;
        }
        else if (isPair(item)) {
            const ik = isNode(item.key) ? item.key : null;
            if (ik) {
                if (ik.spaceBefore)
                    lines.push('');
                addCommentBefore(ctx, lines, ik.commentBefore, false);
                if (ik.comment)
                    reqNewline = true;
            }
            const iv = isNode(item.value) ? item.value : null;
            if (iv) {
                if (iv.comment)
                    comment = iv.comment;
                if (iv.commentBefore)
                    reqNewline = true;
            }
            else if (item.value == null && ik?.comment) {
                comment = ik.comment;
            }
        }
        if (comment)
            reqNewline = true;
        let str = stringify$2(item, itemCtx, () => (comment = null));
        if (i < items.length - 1)
            str += ',';
        if (comment)
            str += lineComment(str, itemIndent, commentString(comment));
        if (!reqNewline && (lines.length > linesAtValue || str.includes('\n')))
            reqNewline = true;
        lines.push(str);
        linesAtValue = lines.length;
    }
    const { start, end } = flowChars;
    if (lines.length === 0) {
        return start + end;
    }
    else {
        if (!reqNewline) {
            const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
            reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
            let str = start;
            for (const line of lines)
                str += line ? `\n${indentStep}${indent}${line}` : '\n';
            return `${str}\n${indent}${end}`;
        }
        else {
            return `${start}${fcPadding}${lines.join(' ')}${fcPadding}${end}`;
        }
    }
}
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
    if (comment && chompKeep)
        comment = comment.replace(/^\n+/, '');
    if (comment) {
        const ic = indentComment(commentString(comment), indent);
        lines.push(ic.trimStart()); // Avoid double indent on first line
    }
}

function findPair(items, key) {
    const k = isScalar$1(key) ? key.value : key;
    for (const it of items) {
        if (isPair(it)) {
            if (it.key === key || it.key === k)
                return it;
            if (isScalar$1(it.key) && it.key.value === k)
                return it;
        }
    }
    return undefined;
}
class YAMLMap extends Collection {
    static get tagName() {
        return 'tag:yaml.org,2002:map';
    }
    constructor(schema) {
        super(MAP, schema);
        this.items = [];
    }
    /**
     * A generic collection parsing method that can be extended
     * to other node classes that inherit from YAMLMap
     */
    static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
            if (typeof replacer === 'function')
                value = replacer.call(obj, key, value);
            else if (Array.isArray(replacer) && !replacer.includes(key))
                return;
            if (value !== undefined || keepUndefined)
                map.items.push(createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
            for (const [key, value] of obj)
                add(key, value);
        }
        else if (obj && typeof obj === 'object') {
            for (const key of Object.keys(obj))
                add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === 'function') {
            map.items.sort(schema.sortMapEntries);
        }
        return map;
    }
    /**
     * Adds a value to the collection.
     *
     * @param overwrite - If not set `true`, using a key that is already in the
     *   collection will throw. Otherwise, overwrites the previous value.
     */
    add(pair, overwrite) {
        let _pair;
        if (isPair(pair))
            _pair = pair;
        else if (!pair || typeof pair !== 'object' || !('key' in pair)) {
            // In TypeScript, this never happens.
            _pair = new Pair(pair, pair?.value);
        }
        else
            _pair = new Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
            if (!overwrite)
                throw new Error(`Key ${_pair.key} already set`);
            // For scalars, keep the old node & its comments and anchors
            if (isScalar$1(prev.value) && isScalarValue(_pair.value))
                prev.value.value = _pair.value;
            else
                prev.value = _pair.value;
        }
        else if (sortEntries) {
            const i = this.items.findIndex(item => sortEntries(_pair, item) < 0);
            if (i === -1)
                this.items.push(_pair);
            else
                this.items.splice(i, 0, _pair);
        }
        else {
            this.items.push(_pair);
        }
    }
    delete(key) {
        const it = findPair(this.items, key);
        if (!it)
            return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
    }
    get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && isScalar$1(node) ? node.value : node) ?? undefined;
    }
    has(key) {
        return !!findPair(this.items, key);
    }
    set(key, value) {
        this.add(new Pair(key, value), true);
    }
    /**
     * @param ctx - Conversion context, originally set in Document#toJS()
     * @param {Class} Type - If set, forces the returned collection type
     * @returns Instance of Type, Map, or Object
     */
    toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? new Map() : {};
        if (ctx?.onCreate)
            ctx.onCreate(map);
        for (const item of this.items)
            addPairToJSMap(ctx, map, item);
        return map;
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        for (const item of this.items) {
            if (!isPair(item))
                throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
            ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection(this, ctx, {
            blockItemPrefix: '',
            flowChars: { start: '{', end: '}' },
            itemIndent: ctx.indent || '',
            onChompKeep,
            onComment
        });
    }
}

const map = {
    collection: 'map',
    default: true,
    nodeClass: YAMLMap,
    tag: 'tag:yaml.org,2002:map',
    resolve(map, onError) {
        if (!isMap(map))
            onError('Expected a mapping for this tag');
        return map;
    },
    createNode: (schema, obj, ctx) => YAMLMap.from(schema, obj, ctx)
};

class YAMLSeq extends Collection {
    static get tagName() {
        return 'tag:yaml.org,2002:seq';
    }
    constructor(schema) {
        super(SEQ, schema);
        this.items = [];
    }
    add(value) {
        this.items.push(value);
    }
    /**
     * Removes a value from the collection.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     *
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
    }
    get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            return undefined;
        const it = this.items[idx];
        return !keepScalar && isScalar$1(it) ? it.value : it;
    }
    /**
     * Checks if the collection includes a value with the key `key`.
     *
     * `key` must contain a representation of an integer for this to succeed.
     * It may be wrapped in a `Scalar`.
     */
    has(key) {
        const idx = asItemIndex(key);
        return typeof idx === 'number' && idx < this.items.length;
    }
    /**
     * Sets a value in this collection. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     *
     * If `key` does not contain a representation of an integer, this will throw.
     * It may be wrapped in a `Scalar`.
     */
    set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== 'number')
            throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (isScalar$1(prev) && isScalarValue(value))
            prev.value = value;
        else
            this.items[idx] = value;
    }
    toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
            ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
            seq.push(toJS(item, String(i++), ctx));
        return seq;
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        return stringifyCollection(this, ctx, {
            blockItemPrefix: '- ',
            flowChars: { start: '[', end: ']' },
            itemIndent: (ctx.indent || '') + '  ',
            onChompKeep,
            onComment
        });
    }
    static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
            let i = 0;
            for (let it of obj) {
                if (typeof replacer === 'function') {
                    const key = obj instanceof Set ? it : String(i++);
                    it = replacer.call(obj, key, it);
                }
                seq.items.push(createNode(it, undefined, ctx));
            }
        }
        return seq;
    }
}
function asItemIndex(key) {
    let idx = isScalar$1(key) ? key.value : key;
    if (idx && typeof idx === 'string')
        idx = Number(idx);
    return typeof idx === 'number' && Number.isInteger(idx) && idx >= 0
        ? idx
        : null;
}

const seq = {
    collection: 'seq',
    default: true,
    nodeClass: YAMLSeq,
    tag: 'tag:yaml.org,2002:seq',
    resolve(seq, onError) {
        if (!isSeq(seq))
            onError('Expected a sequence for this tag');
        return seq;
    },
    createNode: (schema, obj, ctx) => YAMLSeq.from(schema, obj, ctx)
};

const string = {
    identify: value => typeof value === 'string',
    default: true,
    tag: 'tag:yaml.org,2002:str',
    resolve: str => str,
    stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString(item, ctx, onComment, onChompKeep);
    }
};

const nullTag = {
    identify: value => value == null,
    createNode: () => new Scalar(null),
    default: true,
    tag: 'tag:yaml.org,2002:null',
    test: /^(?:~|[Nn]ull|NULL)?$/,
    resolve: () => new Scalar(null),
    stringify: ({ source }, ctx) => typeof source === 'string' && nullTag.test.test(source)
        ? source
        : ctx.options.nullStr
};

const boolTag = {
    identify: value => typeof value === 'boolean',
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
    resolve: str => new Scalar(str[0] === 't' || str[0] === 'T'),
    stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
            const sv = source[0] === 't' || source[0] === 'T';
            if (value === sv)
                return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
};

function stringifyNumber({ format, minFractionDigits, tag, value }) {
    if (typeof value === 'bigint')
        return String(value);
    const num = typeof value === 'number' ? value : Number(value);
    if (!isFinite(num))
        return isNaN(num) ? '.nan' : num < 0 ? '-.inf' : '.inf';
    let n = JSON.stringify(value);
    if (!format &&
        minFractionDigits &&
        (!tag || tag === 'tag:yaml.org,2002:float') &&
        /^\d/.test(n)) {
        let i = n.indexOf('.');
        if (i < 0) {
            i = n.length;
            n += '.';
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
            n += '0';
    }
    return n;
}

const floatNaN$1 = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: str => str.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : str[0] === '-'
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber
};
const floatExp$1 = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
    resolve: str => parseFloat(str),
    stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber(node);
    }
};
const float$1 = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
    resolve(str) {
        const node = new Scalar(parseFloat(str));
        const dot = str.indexOf('.');
        if (dot !== -1 && str[str.length - 1] === '0')
            node.minFractionDigits = str.length - dot - 1;
        return node;
    },
    stringify: stringifyNumber
};

const intIdentify$2 = (value) => typeof value === 'bigint' || Number.isInteger(value);
const intResolve$1 = (str, offset, radix, { intAsBigInt }) => (intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix));
function intStringify$1(node, radix, prefix) {
    const { value } = node;
    if (intIdentify$2(value) && value >= 0)
        return prefix + value.toString(radix);
    return stringifyNumber(node);
}
const intOct$1 = {
    identify: value => intIdentify$2(value) && value >= 0,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^0o[0-7]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 2, 8, opt),
    stringify: node => intStringify$1(node, 8, '0o')
};
const int$1 = {
    identify: intIdentify$2,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 0, 10, opt),
    stringify: stringifyNumber
};
const intHex$1 = {
    identify: value => intIdentify$2(value) && value >= 0,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^0x[0-9a-fA-F]+$/,
    resolve: (str, _onError, opt) => intResolve$1(str, 2, 16, opt),
    stringify: node => intStringify$1(node, 16, '0x')
};

const schema$2 = [
    map,
    seq,
    string,
    nullTag,
    boolTag,
    intOct$1,
    int$1,
    intHex$1,
    floatNaN$1,
    floatExp$1,
    float$1
];

function intIdentify$1(value) {
    return typeof value === 'bigint' || Number.isInteger(value);
}
const stringifyJSON = ({ value }) => JSON.stringify(value);
const jsonScalars = [
    {
        identify: value => typeof value === 'string',
        default: true,
        tag: 'tag:yaml.org,2002:str',
        resolve: str => str,
        stringify: stringifyJSON
    },
    {
        identify: value => value == null,
        createNode: () => new Scalar(null),
        default: true,
        tag: 'tag:yaml.org,2002:null',
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
    },
    {
        identify: value => typeof value === 'boolean',
        default: true,
        tag: 'tag:yaml.org,2002:bool',
        test: /^true$|^false$/,
        resolve: str => str === 'true',
        stringify: stringifyJSON
    },
    {
        identify: intIdentify$1,
        default: true,
        tag: 'tag:yaml.org,2002:int',
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify$1(value) ? value.toString() : JSON.stringify(value)
    },
    {
        identify: value => typeof value === 'number',
        default: true,
        tag: 'tag:yaml.org,2002:float',
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: str => parseFloat(str),
        stringify: stringifyJSON
    }
];
const jsonError = {
    default: true,
    tag: '',
    test: /^/,
    resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
    }
};
const schema$1 = [map, seq].concat(jsonScalars, jsonError);

const binary = {
    identify: value => value instanceof Uint8Array, // Buffer inherits from Uint8Array
    default: false,
    tag: 'tag:yaml.org,2002:binary',
    /**
     * Returns a Buffer in node and an Uint8Array in browsers
     *
     * To use the resulting buffer as an image, you'll want to do something like:
     *
     *   const blob = new Blob([buffer], { type: 'image/jpeg' })
     *   document.querySelector('#photo').src = URL.createObjectURL(blob)
     */
    resolve(src, onError) {
        if (typeof atob === 'function') {
            // On IE 11, atob() can't handle newlines
            const str = atob(src.replace(/[\n\r]/g, ''));
            const buffer = new Uint8Array(str.length);
            for (let i = 0; i < str.length; ++i)
                buffer[i] = str.charCodeAt(i);
            return buffer;
        }
        else {
            onError('This environment does not support reading binary tags; either Buffer or atob is required');
            return src;
        }
    },
    stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        const buf = value; // checked earlier by binary.identify()
        let str;
        if (typeof btoa === 'function') {
            let s = '';
            for (let i = 0; i < buf.length; ++i)
                s += String.fromCharCode(buf[i]);
            str = btoa(s);
        }
        else {
            throw new Error('This environment does not support writing binary tags; either Buffer or btoa is required');
        }
        if (!type)
            type = Scalar.BLOCK_LITERAL;
        if (type !== Scalar.QUOTE_DOUBLE) {
            const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
            const n = Math.ceil(str.length / lineWidth);
            const lines = new Array(n);
            for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
                lines[i] = str.substr(o, lineWidth);
            }
            str = lines.join(type === Scalar.BLOCK_LITERAL ? '\n' : ' ');
        }
        return stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
    }
};

function resolvePairs(seq, onError) {
    if (isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
            let item = seq.items[i];
            if (isPair(item))
                continue;
            else if (isMap(item)) {
                if (item.items.length > 1)
                    onError('Each pair must have its own sequence indicator');
                const pair = item.items[0] || new Pair(new Scalar(null));
                if (item.commentBefore)
                    pair.key.commentBefore = pair.key.commentBefore
                        ? `${item.commentBefore}\n${pair.key.commentBefore}`
                        : item.commentBefore;
                if (item.comment) {
                    const cn = pair.value ?? pair.key;
                    cn.comment = cn.comment
                        ? `${item.comment}\n${cn.comment}`
                        : item.comment;
                }
                item = pair;
            }
            seq.items[i] = isPair(item) ? item : new Pair(item);
        }
    }
    else
        onError('Expected a sequence for this tag');
    return seq;
}
function createPairs(schema, iterable, ctx) {
    const { replacer } = ctx;
    const pairs = new YAMLSeq(schema);
    pairs.tag = 'tag:yaml.org,2002:pairs';
    let i = 0;
    if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
            if (typeof replacer === 'function')
                it = replacer.call(iterable, String(i++), it);
            let key, value;
            if (Array.isArray(it)) {
                if (it.length === 2) {
                    key = it[0];
                    value = it[1];
                }
                else
                    throw new TypeError(`Expected [key, value] tuple: ${it}`);
            }
            else if (it && it instanceof Object) {
                const keys = Object.keys(it);
                if (keys.length === 1) {
                    key = keys[0];
                    value = it[key];
                }
                else {
                    throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
                }
            }
            else {
                key = it;
            }
            pairs.items.push(createPair(key, value, ctx));
        }
    return pairs;
}
const pairs = {
    collection: 'seq',
    default: false,
    tag: 'tag:yaml.org,2002:pairs',
    resolve: resolvePairs,
    createNode: createPairs
};

class YAMLOMap extends YAMLSeq {
    constructor() {
        super();
        this.add = YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.prototype.set.bind(this);
        this.tag = YAMLOMap.tag;
    }
    /**
     * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
     * but TypeScript won't allow widening the signature of a child method.
     */
    toJSON(_, ctx) {
        if (!ctx)
            return super.toJSON(_);
        const map = new Map();
        if (ctx?.onCreate)
            ctx.onCreate(map);
        for (const pair of this.items) {
            let key, value;
            if (isPair(pair)) {
                key = toJS(pair.key, '', ctx);
                value = toJS(pair.value, key, ctx);
            }
            else {
                key = toJS(pair, '', ctx);
            }
            if (map.has(key))
                throw new Error('Ordered maps must not include duplicate keys');
            map.set(key, value);
        }
        return map;
    }
    static from(schema, iterable, ctx) {
        const pairs = createPairs(schema, iterable, ctx);
        const omap = new this();
        omap.items = pairs.items;
        return omap;
    }
}
YAMLOMap.tag = 'tag:yaml.org,2002:omap';
const omap = {
    collection: 'seq',
    identify: value => value instanceof Map,
    nodeClass: YAMLOMap,
    default: false,
    tag: 'tag:yaml.org,2002:omap',
    resolve(seq, onError) {
        const pairs = resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs.items) {
            if (isScalar$1(key)) {
                if (seenKeys.includes(key.value)) {
                    onError(`Ordered maps must not include duplicate keys: ${key.value}`);
                }
                else {
                    seenKeys.push(key.value);
                }
            }
        }
        return Object.assign(new YAMLOMap(), pairs);
    },
    createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
};

function boolStringify({ value, source }, ctx) {
    const boolObj = value ? trueTag : falseTag;
    if (source && boolObj.test.test(source))
        return source;
    return value ? ctx.options.trueStr : ctx.options.falseStr;
}
const trueTag = {
    identify: value => value === true,
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
    resolve: () => new Scalar(true),
    stringify: boolStringify
};
const falseTag = {
    identify: value => value === false,
    default: true,
    tag: 'tag:yaml.org,2002:bool',
    test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
    resolve: () => new Scalar(false),
    stringify: boolStringify
};

const floatNaN = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
    resolve: (str) => str.slice(-3).toLowerCase() === 'nan'
        ? NaN
        : str[0] === '-'
            ? Number.NEGATIVE_INFINITY
            : Number.POSITIVE_INFINITY,
    stringify: stringifyNumber
};
const floatExp = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'EXP',
    test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
    resolve: (str) => parseFloat(str.replace(/_/g, '')),
    stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber(node);
    }
};
const float = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
    resolve(str) {
        const node = new Scalar(parseFloat(str.replace(/_/g, '')));
        const dot = str.indexOf('.');
        if (dot !== -1) {
            const f = str.substring(dot + 1).replace(/_/g, '');
            if (f[f.length - 1] === '0')
                node.minFractionDigits = f.length;
        }
        return node;
    },
    stringify: stringifyNumber
};

const intIdentify = (value) => typeof value === 'bigint' || Number.isInteger(value);
function intResolve(str, offset, radix, { intAsBigInt }) {
    const sign = str[0];
    if (sign === '-' || sign === '+')
        offset += 1;
    str = str.substring(offset).replace(/_/g, '');
    if (intAsBigInt) {
        switch (radix) {
            case 2:
                str = `0b${str}`;
                break;
            case 8:
                str = `0o${str}`;
                break;
            case 16:
                str = `0x${str}`;
                break;
        }
        const n = BigInt(str);
        return sign === '-' ? BigInt(-1) * n : n;
    }
    const n = parseInt(str, radix);
    return sign === '-' ? -1 * n : n;
}
function intStringify(node, radix, prefix) {
    const { value } = node;
    if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? '-' + prefix + str.substr(1) : prefix + str;
    }
    return stringifyNumber(node);
}
const intBin = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'BIN',
    test: /^[-+]?0b[0-1_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
    stringify: node => intStringify(node, 2, '0b')
};
const intOct = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'OCT',
    test: /^[-+]?0[0-7_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
    stringify: node => intStringify(node, 8, '0')
};
const int = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    test: /^[-+]?[0-9][0-9_]*$/,
    resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
    stringify: stringifyNumber
};
const intHex = {
    identify: intIdentify,
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'HEX',
    test: /^[-+]?0x[0-9a-fA-F_]+$/,
    resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
    stringify: node => intStringify(node, 16, '0x')
};

class YAMLSet extends YAMLMap {
    constructor(schema) {
        super(schema);
        this.tag = YAMLSet.tag;
    }
    add(key) {
        let pair;
        if (isPair(key))
            pair = key;
        else if (key &&
            typeof key === 'object' &&
            'key' in key &&
            'value' in key &&
            key.value === null)
            pair = new Pair(key.key, null);
        else
            pair = new Pair(key, null);
        const prev = findPair(this.items, pair.key);
        if (!prev)
            this.items.push(pair);
    }
    /**
     * If `keepPair` is `true`, returns the Pair matching `key`.
     * Otherwise, returns the value of that Pair's key.
     */
    get(key, keepPair) {
        const pair = findPair(this.items, key);
        return !keepPair && isPair(pair)
            ? isScalar$1(pair.key)
                ? pair.key.value
                : pair.key
            : pair;
    }
    set(key, value) {
        if (typeof value !== 'boolean')
            throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = findPair(this.items, key);
        if (prev && !value) {
            this.items.splice(this.items.indexOf(prev), 1);
        }
        else if (!prev && value) {
            this.items.push(new Pair(key));
        }
    }
    toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
    }
    toString(ctx, onComment, onChompKeep) {
        if (!ctx)
            return JSON.stringify(this);
        if (this.hasAllNullValues(true))
            return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
            throw new Error('Set items must all have null values');
    }
    static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
            for (let value of iterable) {
                if (typeof replacer === 'function')
                    value = replacer.call(iterable, value, value);
                set.items.push(createPair(value, null, ctx));
            }
        return set;
    }
}
YAMLSet.tag = 'tag:yaml.org,2002:set';
const set = {
    collection: 'map',
    identify: value => value instanceof Set,
    nodeClass: YAMLSet,
    default: false,
    tag: 'tag:yaml.org,2002:set',
    createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
    resolve(map, onError) {
        if (isMap(map)) {
            if (map.hasAllNullValues(true))
                return Object.assign(new YAMLSet(), map);
            else
                onError('Set items must all have null values');
        }
        else
            onError('Expected a mapping for this tag');
        return map;
    }
};

/** Internal types handle bigint as number, because TS can't figure it out. */
function parseSexagesimal(str, asBigInt) {
    const sign = str[0];
    const parts = sign === '-' || sign === '+' ? str.substring(1) : str;
    const num = (n) => asBigInt ? BigInt(n) : Number(n);
    const res = parts
        .replace(/_/g, '')
        .split(':')
        .reduce((res, p) => res * num(60) + num(p), num(0));
    return (sign === '-' ? num(-1) * res : res);
}
/**
 * hhhh:mm:ss.sss
 *
 * Internal types handle bigint as number, because TS can't figure it out.
 */
function stringifySexagesimal(node) {
    let { value } = node;
    let num = (n) => n;
    if (typeof value === 'bigint')
        num = n => BigInt(n);
    else if (isNaN(value) || !isFinite(value))
        return stringifyNumber(node);
    let sign = '';
    if (value < 0) {
        sign = '-';
        value *= num(-1);
    }
    const _60 = num(60);
    const parts = [value % _60]; // seconds, including ms
    if (value < 60) {
        parts.unshift(0); // at least one : is required
    }
    else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60); // minutes
        if (value >= 60) {
            value = (value - parts[0]) / _60;
            parts.unshift(value); // hours
        }
    }
    return (sign +
        parts
            .map(n => String(n).padStart(2, '0'))
            .join(':')
            .replace(/000000\d*$/, '') // % 60 may introduce error
    );
}
const intTime = {
    identify: value => typeof value === 'bigint' || Number.isInteger(value),
    default: true,
    tag: 'tag:yaml.org,2002:int',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
    resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
    stringify: stringifySexagesimal
};
const floatTime = {
    identify: value => typeof value === 'number',
    default: true,
    tag: 'tag:yaml.org,2002:float',
    format: 'TIME',
    test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
    resolve: str => parseSexagesimal(str, false),
    stringify: stringifySexagesimal
};
const timestamp = {
    identify: value => value instanceof Date,
    default: true,
    tag: 'tag:yaml.org,2002:timestamp',
    // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
    // may be omitted altogether, resulting in a date format. In such a case, the time part is
    // assumed to be 00:00:00Z (start of day, UTC).
    test: RegExp('^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})' + // YYYY-Mm-Dd
        '(?:' + // time is optional
        '(?:t|T|[ \\t]+)' + // t | T | whitespace
        '([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)' + // Hh:Mm:Ss(.ss)?
        '(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?' + // Z | +5 | -03:30
        ')?$'),
    resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
            throw new Error('!!timestamp expects a date, starting with yyyy-mm-dd');
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + '00').substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== 'Z') {
            let d = parseSexagesimal(tz, false);
            if (Math.abs(d) < 30)
                d *= 60;
            date -= 60000 * d;
        }
        return new Date(date);
    },
    stringify: ({ value }) => value.toISOString().replace(/(T00:00:00)?\.000Z$/, '')
};

const schema = [
    map,
    seq,
    string,
    nullTag,
    trueTag,
    falseTag,
    intBin,
    intOct,
    int,
    intHex,
    floatNaN,
    floatExp,
    float,
    binary,
    merge,
    omap,
    pairs,
    set,
    intTime,
    floatTime,
    timestamp
];

const schemas = new Map([
    ['core', schema$2],
    ['failsafe', [map, seq, string]],
    ['json', schema$1],
    ['yaml11', schema],
    ['yaml-1.1', schema]
]);
const tagsByName = {
    binary,
    bool: boolTag,
    float: float$1,
    floatExp: floatExp$1,
    floatNaN: floatNaN$1,
    floatTime,
    int: int$1,
    intHex: intHex$1,
    intOct: intOct$1,
    intTime,
    map,
    merge,
    null: nullTag,
    omap,
    pairs,
    seq,
    set,
    timestamp
};
const coreKnownTags = {
    'tag:yaml.org,2002:binary': binary,
    'tag:yaml.org,2002:merge': merge,
    'tag:yaml.org,2002:omap': omap,
    'tag:yaml.org,2002:pairs': pairs,
    'tag:yaml.org,2002:set': set,
    'tag:yaml.org,2002:timestamp': timestamp
};
function getTags(customTags, schemaName, addMergeTag) {
    const schemaTags = schemas.get(schemaName);
    if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge)
            ? schemaTags.concat(merge)
            : schemaTags.slice();
    }
    let tags = schemaTags;
    if (!tags) {
        if (Array.isArray(customTags))
            tags = [];
        else {
            const keys = Array.from(schemas.keys())
                .filter(key => key !== 'yaml11')
                .map(key => JSON.stringify(key))
                .join(', ');
            throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
    }
    if (Array.isArray(customTags)) {
        for (const tag of customTags)
            tags = tags.concat(tag);
    }
    else if (typeof customTags === 'function') {
        tags = customTags(tags.slice());
    }
    if (addMergeTag)
        tags = tags.concat(merge);
    return tags.reduce((tags, tag) => {
        const tagObj = typeof tag === 'string' ? tagsByName[tag] : tag;
        if (!tagObj) {
            const tagName = JSON.stringify(tag);
            const keys = Object.keys(tagsByName)
                .map(key => JSON.stringify(key))
                .join(', ');
            throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags.includes(tagObj))
            tags.push(tagObj);
        return tags;
    }, []);
}

const sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
class Schema {
    constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat)
            ? getTags(compat, 'compat')
            : compat
                ? getTags(null, compat)
                : null;
        this.name = (typeof schema === 'string' && schema) || 'core';
        this.knownTags = resolveKnownTags ? coreKnownTags : {};
        this.tags = getTags(customTags, this.name, merge);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, MAP, { value: map });
        Object.defineProperty(this, SCALAR$1, { value: string });
        Object.defineProperty(this, SEQ, { value: seq });
        // Used by createMap()
        this.sortMapEntries =
            typeof sortMapEntries === 'function'
                ? sortMapEntries
                : sortMapEntries === true
                    ? sortMapEntriesByKey
                    : null;
    }
    clone() {
        const copy = Object.create(Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
    }
}

function stringifyDocument(doc, options) {
    const lines = [];
    let hasDirectives = options.directives === true;
    if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
            lines.push(dir);
            hasDirectives = true;
        }
        else if (doc.directives.docStart)
            hasDirectives = true;
    }
    if (hasDirectives)
        lines.push('---');
    const ctx = createStringifyContext(doc, options);
    const { commentString } = ctx.options;
    if (doc.commentBefore) {
        if (lines.length !== 1)
            lines.unshift('');
        const cs = commentString(doc.commentBefore);
        lines.unshift(indentComment(cs, ''));
    }
    let chompKeep = false;
    let contentComment = null;
    if (doc.contents) {
        if (isNode(doc.contents)) {
            if (doc.contents.spaceBefore && hasDirectives)
                lines.push('');
            if (doc.contents.commentBefore) {
                const cs = commentString(doc.contents.commentBefore);
                lines.push(indentComment(cs, ''));
            }
            // top-level block scalars need to be indented if followed by a comment
            ctx.forceBlockIndent = !!doc.comment;
            contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? undefined : () => (chompKeep = true);
        let body = stringify$2(doc.contents, ctx, () => (contentComment = null), onChompKeep);
        if (contentComment)
            body += lineComment(body, '', commentString(contentComment));
        if ((body[0] === '|' || body[0] === '>') &&
            lines[lines.length - 1] === '---') {
            // Top-level block scalars with a preceding doc marker ought to use the
            // same line for their header.
            lines[lines.length - 1] = `--- ${body}`;
        }
        else
            lines.push(body);
    }
    else {
        lines.push(stringify$2(doc.contents, ctx));
    }
    if (doc.directives?.docEnd) {
        if (doc.comment) {
            const cs = commentString(doc.comment);
            if (cs.includes('\n')) {
                lines.push('...');
                lines.push(indentComment(cs, ''));
            }
            else {
                lines.push(`... ${cs}`);
            }
        }
        else {
            lines.push('...');
        }
    }
    else {
        let dc = doc.comment;
        if (dc && chompKeep)
            dc = dc.replace(/^\n+/, '');
        if (dc) {
            if ((!chompKeep || contentComment) && lines[lines.length - 1] !== '')
                lines.push('');
            lines.push(indentComment(commentString(dc), ''));
        }
    }
    return lines.join('\n') + '\n';
}

class Document {
    constructor(value, replacer, options) {
        /** A comment before this Document */
        this.commentBefore = null;
        /** A comment immediately after this Document */
        this.comment = null;
        /** Errors encountered during parsing. */
        this.errors = [];
        /** Warnings encountered during parsing. */
        this.warnings = [];
        Object.defineProperty(this, NODE_TYPE, { value: DOC });
        let _replacer = null;
        if (typeof replacer === 'function' || Array.isArray(replacer)) {
            _replacer = replacer;
        }
        else if (options === undefined && replacer) {
            options = replacer;
            replacer = undefined;
        }
        const opt = Object.assign({
            intAsBigInt: false,
            keepSourceTokens: false,
            logLevel: 'warn',
            prettyErrors: true,
            strict: true,
            stringKeys: false,
            uniqueKeys: true,
            version: '1.2'
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
            this.directives = options._directives.atDocument();
            if (this.directives.yaml.explicit)
                version = this.directives.yaml.version;
        }
        else
            this.directives = new Directives({ version });
        this.setSchema(version, options);
        // @ts-expect-error We can't really know that this matches Contents.
        this.contents =
            value === undefined ? null : this.createNode(value, _replacer, options);
    }
    /**
     * Create a deep copy of this Document and its contents.
     *
     * Custom Node values that inherit from `Object` still refer to their original instances.
     */
    clone() {
        const copy = Object.create(Document.prototype, {
            [NODE_TYPE]: { value: DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
            copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        // @ts-expect-error We can't really know that this matches Contents.
        copy.contents = isNode(this.contents)
            ? this.contents.clone(copy.schema)
            : this.contents;
        if (this.range)
            copy.range = this.range.slice();
        return copy;
    }
    /** Adds a value to the document. */
    add(value) {
        if (assertCollection(this.contents))
            this.contents.add(value);
    }
    /** Adds a value to the document. */
    addIn(path, value) {
        if (assertCollection(this.contents))
            this.contents.addIn(path, value);
    }
    /**
     * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
     *
     * If `node` already has an anchor, `name` is ignored.
     * Otherwise, the `node.anchor` value will be set to `name`,
     * or if an anchor with that name is already present in the document,
     * `name` will be used as a prefix for a new unique anchor.
     * If `name` is undefined, the generated anchor will use 'a' as a prefix.
     */
    createAlias(node, name) {
        if (!node.anchor) {
            const prev = anchorNames(this);
            node.anchor =
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                !name || prev.has(name) ? findNewAnchor(name || 'a', prev) : name;
        }
        return new Alias(node.anchor);
    }
    createNode(value, replacer, options) {
        let _replacer = undefined;
        if (typeof replacer === 'function') {
            value = replacer.call({ '': value }, '', value);
            _replacer = replacer;
        }
        else if (Array.isArray(replacer)) {
            const keyToStr = (v) => typeof v === 'number' || v instanceof String || v instanceof Number;
            const asStr = replacer.filter(keyToStr).map(String);
            if (asStr.length > 0)
                replacer = replacer.concat(asStr);
            _replacer = replacer;
        }
        else if (options === undefined && replacer) {
            options = replacer;
            replacer = undefined;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(this, 
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        anchorPrefix || 'a');
        const ctx = {
            aliasDuplicateObjects: aliasDuplicateObjects ?? true,
            keepUndefined: keepUndefined ?? false,
            onAnchor,
            onTagObj,
            replacer: _replacer,
            schema: this.schema,
            sourceObjects
        };
        const node = createNode(value, tag, ctx);
        if (flow && isCollection$1(node))
            node.flow = true;
        setAnchors();
        return node;
    }
    /**
     * Convert a key and a value into a `Pair` using the current schema,
     * recursively wrapping all values as `Scalar` or `Collection` nodes.
     */
    createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair(k, v);
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
    }
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path) {
        if (isEmptyPath(path)) {
            if (this.contents == null)
                return false;
            // @ts-expect-error Presumed impossible if Strict extends false
            this.contents = null;
            return true;
        }
        return assertCollection(this.contents)
            ? this.contents.deleteIn(path)
            : false;
    }
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    get(key, keepScalar) {
        return isCollection$1(this.contents)
            ? this.contents.get(key, keepScalar)
            : undefined;
    }
    /**
     * Returns item at `path`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path, keepScalar) {
        if (isEmptyPath(path))
            return !keepScalar && isScalar$1(this.contents)
                ? this.contents.value
                : this.contents;
        return isCollection$1(this.contents)
            ? this.contents.getIn(path, keepScalar)
            : undefined;
    }
    /**
     * Checks if the document includes a value with the key `key`.
     */
    has(key) {
        return isCollection$1(this.contents) ? this.contents.has(key) : false;
    }
    /**
     * Checks if the document includes a value at `path`.
     */
    hasIn(path) {
        if (isEmptyPath(path))
            return this.contents !== undefined;
        return isCollection$1(this.contents) ? this.contents.hasIn(path) : false;
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    set(key, value) {
        if (this.contents == null) {
            // @ts-expect-error We can't really know that this matches Contents.
            this.contents = collectionFromPath(this.schema, [key], value);
        }
        else if (assertCollection(this.contents)) {
            this.contents.set(key, value);
        }
    }
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path, value) {
        if (isEmptyPath(path)) {
            // @ts-expect-error We can't really know that this matches Contents.
            this.contents = value;
        }
        else if (this.contents == null) {
            // @ts-expect-error We can't really know that this matches Contents.
            this.contents = collectionFromPath(this.schema, Array.from(path), value);
        }
        else if (assertCollection(this.contents)) {
            this.contents.setIn(path, value);
        }
    }
    /**
     * Change the YAML version and schema used by the document.
     * A `null` version disables support for directives, explicit tags, anchors, and aliases.
     * It also requires the `schema` option to be given as a `Schema` instance value.
     *
     * Overrides all previously set schema options.
     */
    setSchema(version, options = {}) {
        if (typeof version === 'number')
            version = String(version);
        let opt;
        switch (version) {
            case '1.1':
                if (this.directives)
                    this.directives.yaml.version = '1.1';
                else
                    this.directives = new Directives({ version: '1.1' });
                opt = { resolveKnownTags: false, schema: 'yaml-1.1' };
                break;
            case '1.2':
            case 'next':
                if (this.directives)
                    this.directives.yaml.version = version;
                else
                    this.directives = new Directives({ version });
                opt = { resolveKnownTags: true, schema: 'core' };
                break;
            case null:
                if (this.directives)
                    delete this.directives;
                opt = null;
                break;
            default: {
                const sv = JSON.stringify(version);
                throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
            }
        }
        // Not using `instanceof Schema` to allow for duck typing
        if (options.schema instanceof Object)
            this.schema = options.schema;
        else if (opt)
            this.schema = new Schema(Object.assign(opt, options));
        else
            throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
    }
    // json & jsonArg are only used from toJSON()
    toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
            anchors: new Map(),
            doc: this,
            keep: !json,
            mapAsMap: mapAsMap === true,
            mapKeyWarned: false,
            maxAliasCount: typeof maxAliasCount === 'number' ? maxAliasCount : 100
        };
        const res = toJS(this.contents, jsonArg ?? '', ctx);
        if (typeof onAnchor === 'function')
            for (const { count, res } of ctx.anchors.values())
                onAnchor(res, count);
        return typeof reviver === 'function'
            ? applyReviver(reviver, { '': res }, '', res)
            : res;
    }
    /**
     * A JSON representation of the document `contents`.
     *
     * @param jsonArg Used by `JSON.stringify` to indicate the array index or
     *   property name.
     */
    toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
    }
    /** A YAML representation of the document. */
    toString(options = {}) {
        if (this.errors.length > 0)
            throw new Error('Document with errors cannot be stringified');
        if ('indent' in options &&
            (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
            const s = JSON.stringify(options.indent);
            throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument(this, options);
    }
}
function assertCollection(contents) {
    if (isCollection$1(contents))
        return true;
    throw new Error('Expected a YAML collection as document contents');
}

class YAMLError extends Error {
    constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
    }
}
class YAMLParseError extends YAMLError {
    constructor(pos, code, message) {
        super('YAMLParseError', pos, code, message);
    }
}
class YAMLWarning extends YAMLError {
    constructor(pos, code, message) {
        super('YAMLWarning', pos, code, message);
    }
}
const prettifyError = (src, lc) => (error) => {
    if (error.pos[0] === -1)
        return;
    error.linePos = error.pos.map(pos => lc.linePos(pos));
    const { line, col } = error.linePos[0];
    error.message += ` at line ${line}, column ${col}`;
    let ci = col - 1;
    let lineStr = src
        .substring(lc.lineStarts[line - 1], lc.lineStarts[line])
        .replace(/[\n\r]+$/, '');
    // Trim to max 80 chars, keeping col position near the middle
    if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = '…' + lineStr.substring(trimStart);
        ci -= trimStart - 1;
    }
    if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + '…';
    // Include previous line in context if pointing at line start
    if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        // Regexp won't match if start is trimmed
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
            prev = prev.substring(0, 79) + '…\n';
        lineStr = prev + lineStr;
    }
    if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end && end.line === line && end.col > col) {
            count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = ' '.repeat(ci) + '^'.repeat(count);
        error.message += `:\n\n${lineStr}\n${pointer}\n`;
    }
};

function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
    let spaceBefore = false;
    let atNewline = startOnNewline;
    let hasSpace = startOnNewline;
    let comment = '';
    let commentSep = '';
    let hasNewline = false;
    let reqSpace = false;
    let tab = null;
    let anchor = null;
    let tag = null;
    let newlineAfterProp = null;
    let comma = null;
    let found = null;
    let start = null;
    for (const token of tokens) {
        if (reqSpace) {
            if (token.type !== 'space' &&
                token.type !== 'newline' &&
                token.type !== 'comma')
                onError(token.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
            reqSpace = false;
        }
        if (tab) {
            if (atNewline && token.type !== 'comment' && token.type !== 'newline') {
                onError(tab, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation');
            }
            tab = null;
        }
        switch (token.type) {
            case 'space':
                // At the doc level, tabs at line start may be parsed
                // as leading white space rather than indentation.
                // In a flow collection, only the parser handles indent.
                if (!flow &&
                    (indicator !== 'doc-start' || next?.type !== 'flow-collection') &&
                    token.source.includes('\t')) {
                    tab = token;
                }
                hasSpace = true;
                break;
            case 'comment': {
                if (!hasSpace)
                    onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                const cb = token.source.substring(1) || ' ';
                if (!comment)
                    comment = cb;
                else
                    comment += commentSep + cb;
                commentSep = '';
                atNewline = false;
                break;
            }
            case 'newline':
                if (atNewline) {
                    if (comment)
                        comment += token.source;
                    else if (!found || indicator !== 'seq-item-ind')
                        spaceBefore = true;
                }
                else
                    commentSep += token.source;
                atNewline = true;
                hasNewline = true;
                if (anchor || tag)
                    newlineAfterProp = token;
                hasSpace = true;
                break;
            case 'anchor':
                if (anchor)
                    onError(token, 'MULTIPLE_ANCHORS', 'A node can have at most one anchor');
                if (token.source.endsWith(':'))
                    onError(token.offset + token.source.length - 1, 'BAD_ALIAS', 'Anchor ending in : is ambiguous', true);
                anchor = token;
                if (start === null)
                    start = token.offset;
                atNewline = false;
                hasSpace = false;
                reqSpace = true;
                break;
            case 'tag': {
                if (tag)
                    onError(token, 'MULTIPLE_TAGS', 'A node can have at most one tag');
                tag = token;
                if (start === null)
                    start = token.offset;
                atNewline = false;
                hasSpace = false;
                reqSpace = true;
                break;
            }
            case indicator:
                // Could here handle preceding comments differently
                if (anchor || tag)
                    onError(token, 'BAD_PROP_ORDER', `Anchors and tags must be after the ${token.source} indicator`);
                if (found)
                    onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.source} in ${flow ?? 'collection'}`);
                found = token;
                atNewline =
                    indicator === 'seq-item-ind' || indicator === 'explicit-key-ind';
                hasSpace = false;
                break;
            case 'comma':
                if (flow) {
                    if (comma)
                        onError(token, 'UNEXPECTED_TOKEN', `Unexpected , in ${flow}`);
                    comma = token;
                    atNewline = false;
                    hasSpace = false;
                    break;
                }
            // else fallthrough
            default:
                onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${token.type} token`);
                atNewline = false;
                hasSpace = false;
        }
    }
    const last = tokens[tokens.length - 1];
    const end = last ? last.offset + last.source.length : offset;
    if (reqSpace &&
        next &&
        next.type !== 'space' &&
        next.type !== 'newline' &&
        next.type !== 'comma' &&
        (next.type !== 'scalar' || next.source !== '')) {
        onError(next.offset, 'MISSING_CHAR', 'Tags and anchors must be separated from the next token by white space');
    }
    if (tab &&
        ((atNewline && tab.indent <= parentIndent) ||
            next?.type === 'block-map' ||
            next?.type === 'block-seq'))
        onError(tab, 'TAB_AS_INDENT', 'Tabs are not allowed as indentation');
    return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start ?? end
    };
}

function containsNewline(key) {
    if (!key)
        return null;
    switch (key.type) {
        case 'alias':
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            if (key.source.includes('\n'))
                return true;
            if (key.end)
                for (const st of key.end)
                    if (st.type === 'newline')
                        return true;
            return false;
        case 'flow-collection':
            for (const it of key.items) {
                for (const st of it.start)
                    if (st.type === 'newline')
                        return true;
                if (it.sep)
                    for (const st of it.sep)
                        if (st.type === 'newline')
                            return true;
                if (containsNewline(it.key) || containsNewline(it.value))
                    return true;
            }
            return false;
        default:
            return true;
    }
}

function flowIndentCheck(indent, fc, onError) {
    if (fc?.type === 'flow-collection') {
        const end = fc.end[0];
        if (end.indent === indent &&
            (end.source === ']' || end.source === '}') &&
            containsNewline(fc)) {
            const msg = 'Flow end indicator should be more indented than parent';
            onError(end, 'BAD_INDENT', msg, true);
        }
    }
}

function mapIncludes(ctx, items, search) {
    const { uniqueKeys } = ctx.options;
    if (uniqueKeys === false)
        return false;
    const isEqual = typeof uniqueKeys === 'function'
        ? uniqueKeys
        : (a, b) => a === b || (isScalar$1(a) && isScalar$1(b) && a.value === b.value);
    return items.some(pair => isEqual(pair.key, search));
}

const startColMsg = 'All mapping items must start at the same column';
function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLMap;
    const map = new NodeClass(ctx.schema);
    if (ctx.atRoot)
        ctx.atRoot = false;
    let offset = bm.offset;
    let commentEnd = null;
    for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        // key properties
        const keyProps = resolveProps(start, {
            indicator: 'explicit-key-ind',
            next: key ?? sep?.[0],
            offset,
            onError,
            parentIndent: bm.indent,
            startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
            if (key) {
                if (key.type === 'block-seq')
                    onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'A block sequence may not be used as an implicit map key');
                else if ('indent' in key && key.indent !== bm.indent)
                    onError(offset, 'BAD_INDENT', startColMsg);
            }
            if (!keyProps.anchor && !keyProps.tag && !sep) {
                commentEnd = keyProps.end;
                if (keyProps.comment) {
                    if (map.comment)
                        map.comment += '\n' + keyProps.comment;
                    else
                        map.comment = keyProps.comment;
                }
                continue;
            }
            if (keyProps.newlineAfterProp || containsNewline(key)) {
                onError(key ?? start[start.length - 1], 'MULTILINE_IMPLICIT_KEY', 'Implicit keys need to be on a single line');
            }
        }
        else if (keyProps.found?.indent !== bm.indent) {
            onError(offset, 'BAD_INDENT', startColMsg);
        }
        // key value
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key
            ? composeNode(ctx, key, keyProps, onError)
            : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
            flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (mapIncludes(ctx, map.items, keyNode))
            onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
        // value properties
        const valueProps = resolveProps(sep ?? [], {
            indicator: 'map-value-ind',
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: bm.indent,
            startOnNewline: !key || key.type === 'block-scalar'
        });
        offset = valueProps.end;
        if (valueProps.found) {
            if (implicitKey) {
                if (value?.type === 'block-map' && !valueProps.hasNewline)
                    onError(offset, 'BLOCK_AS_IMPLICIT_KEY', 'Nested mappings are not allowed in compact mappings');
                if (ctx.options.strict &&
                    keyProps.start < valueProps.found.offset - 1024)
                    onError(keyNode.range, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit block mapping key');
            }
            // value value
            const valueNode = value
                ? composeNode(ctx, value, valueProps, onError)
                : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
            if (ctx.schema.compat)
                flowIndentCheck(bm.indent, value, onError);
            offset = valueNode.range[2];
            const pair = new Pair(keyNode, valueNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            map.items.push(pair);
        }
        else {
            // key with no value
            if (implicitKey)
                onError(keyNode.range, 'MISSING_CHAR', 'Implicit map keys need to be followed by map values');
            if (valueProps.comment) {
                if (keyNode.comment)
                    keyNode.comment += '\n' + valueProps.comment;
                else
                    keyNode.comment = valueProps.comment;
            }
            const pair = new Pair(keyNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            map.items.push(pair);
        }
    }
    if (commentEnd && commentEnd < offset)
        onError(commentEnd, 'IMPOSSIBLE', 'Map comment with trailing content');
    map.range = [bm.offset, offset, commentEnd ?? offset];
    return map;
}

function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
    const NodeClass = tag?.nodeClass ?? YAMLSeq;
    const seq = new NodeClass(ctx.schema);
    if (ctx.atRoot)
        ctx.atRoot = false;
    if (ctx.atKey)
        ctx.atKey = false;
    let offset = bs.offset;
    let commentEnd = null;
    for (const { start, value } of bs.items) {
        const props = resolveProps(start, {
            indicator: 'seq-item-ind',
            next: value,
            offset,
            onError,
            parentIndent: bs.indent,
            startOnNewline: true
        });
        if (!props.found) {
            if (props.anchor || props.tag || value) {
                if (value && value.type === 'block-seq')
                    onError(props.end, 'BAD_INDENT', 'All sequence items must start at the same column');
                else
                    onError(offset, 'MISSING_CHAR', 'Sequence item without - indicator');
            }
            else {
                commentEnd = props.end;
                if (props.comment)
                    seq.comment = props.comment;
                continue;
            }
        }
        const node = value
            ? composeNode(ctx, value, props, onError)
            : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
            flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
    }
    seq.range = [bs.offset, offset, commentEnd ?? offset];
    return seq;
}

function resolveEnd(end, offset, reqSpace, onError) {
    let comment = '';
    if (end) {
        let hasSpace = false;
        let sep = '';
        for (const token of end) {
            const { source, type } = token;
            switch (type) {
                case 'space':
                    hasSpace = true;
                    break;
                case 'comment': {
                    if (reqSpace && !hasSpace)
                        onError(token, 'MISSING_CHAR', 'Comments must be separated from other tokens by white space characters');
                    const cb = source.substring(1) || ' ';
                    if (!comment)
                        comment = cb;
                    else
                        comment += sep + cb;
                    sep = '';
                    break;
                }
                case 'newline':
                    if (comment)
                        sep += source;
                    hasSpace = true;
                    break;
                default:
                    onError(token, 'UNEXPECTED_TOKEN', `Unexpected ${type} at node end`);
            }
            offset += source.length;
        }
    }
    return { comment, offset };
}

const blockMsg = 'Block collections are not allowed within flow collections';
const isBlock = (token) => token && (token.type === 'block-map' || token.type === 'block-seq');
function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
    const isMap = fc.start.source === '{';
    const fcName = isMap ? 'flow map' : 'flow sequence';
    const NodeClass = (tag?.nodeClass ?? (isMap ? YAMLMap : YAMLSeq));
    const coll = new NodeClass(ctx.schema);
    coll.flow = true;
    const atRoot = ctx.atRoot;
    if (atRoot)
        ctx.atRoot = false;
    if (ctx.atKey)
        ctx.atKey = false;
    let offset = fc.offset + fc.start.source.length;
    for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps(start, {
            flow: fcName,
            indicator: 'explicit-key-ind',
            next: key ?? sep?.[0],
            offset,
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
        });
        if (!props.found) {
            if (!props.anchor && !props.tag && !sep && !value) {
                if (i === 0 && props.comma)
                    onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);
                else if (i < fc.items.length - 1)
                    onError(props.start, 'UNEXPECTED_TOKEN', `Unexpected empty item in ${fcName}`);
                if (props.comment) {
                    if (coll.comment)
                        coll.comment += '\n' + props.comment;
                    else
                        coll.comment = props.comment;
                }
                offset = props.end;
                continue;
            }
            if (!isMap && ctx.options.strict && containsNewline(key))
                onError(key, // checked by containsNewline()
                'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
        }
        if (i === 0) {
            if (props.comma)
                onError(props.comma, 'UNEXPECTED_TOKEN', `Unexpected , in ${fcName}`);
        }
        else {
            if (!props.comma)
                onError(props.start, 'MISSING_CHAR', `Missing , between ${fcName} items`);
            if (props.comment) {
                let prevItemComment = '';
                loop: for (const st of start) {
                    switch (st.type) {
                        case 'comma':
                        case 'space':
                            break;
                        case 'comment':
                            prevItemComment = st.source.substring(1);
                            break loop;
                        default:
                            break loop;
                    }
                }
                if (prevItemComment) {
                    let prev = coll.items[coll.items.length - 1];
                    if (isPair(prev))
                        prev = prev.value ?? prev.key;
                    if (prev.comment)
                        prev.comment += '\n' + prevItemComment;
                    else
                        prev.comment = prevItemComment;
                    props.comment = props.comment.substring(prevItemComment.length + 1);
                }
            }
        }
        if (!isMap && !sep && !props.found) {
            // item is a value in a seq
            // → key & sep are empty, start does not include ? or :
            const valueNode = value
                ? composeNode(ctx, value, props, onError)
                : composeEmptyNode(ctx, props.end, sep, null, props, onError);
            coll.items.push(valueNode);
            offset = valueNode.range[2];
            if (isBlock(value))
                onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
        }
        else {
            // item is a key+value pair
            // key value
            ctx.atKey = true;
            const keyStart = props.end;
            const keyNode = key
                ? composeNode(ctx, key, props, onError)
                : composeEmptyNode(ctx, keyStart, start, null, props, onError);
            if (isBlock(key))
                onError(keyNode.range, 'BLOCK_IN_FLOW', blockMsg);
            ctx.atKey = false;
            // value properties
            const valueProps = resolveProps(sep ?? [], {
                flow: fcName,
                indicator: 'map-value-ind',
                next: value,
                offset: keyNode.range[2],
                onError,
                parentIndent: fc.indent,
                startOnNewline: false
            });
            if (valueProps.found) {
                if (!isMap && !props.found && ctx.options.strict) {
                    if (sep)
                        for (const st of sep) {
                            if (st === valueProps.found)
                                break;
                            if (st.type === 'newline') {
                                onError(st, 'MULTILINE_IMPLICIT_KEY', 'Implicit keys of flow sequence pairs need to be on a single line');
                                break;
                            }
                        }
                    if (props.start < valueProps.found.offset - 1024)
                        onError(valueProps.found, 'KEY_OVER_1024_CHARS', 'The : indicator must be at most 1024 chars after the start of an implicit flow sequence key');
                }
            }
            else if (value) {
                if ('source' in value && value.source && value.source[0] === ':')
                    onError(value, 'MISSING_CHAR', `Missing space after : in ${fcName}`);
                else
                    onError(valueProps.start, 'MISSING_CHAR', `Missing , or : between ${fcName} items`);
            }
            // value value
            const valueNode = value
                ? composeNode(ctx, value, valueProps, onError)
                : valueProps.found
                    ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError)
                    : null;
            if (valueNode) {
                if (isBlock(value))
                    onError(valueNode.range, 'BLOCK_IN_FLOW', blockMsg);
            }
            else if (valueProps.comment) {
                if (keyNode.comment)
                    keyNode.comment += '\n' + valueProps.comment;
                else
                    keyNode.comment = valueProps.comment;
            }
            const pair = new Pair(keyNode, valueNode);
            if (ctx.options.keepSourceTokens)
                pair.srcToken = collItem;
            if (isMap) {
                const map = coll;
                if (mapIncludes(ctx, map.items, keyNode))
                    onError(keyStart, 'DUPLICATE_KEY', 'Map keys must be unique');
                map.items.push(pair);
            }
            else {
                const map = new YAMLMap(ctx.schema);
                map.flow = true;
                map.items.push(pair);
                const endRange = (valueNode ?? keyNode).range;
                map.range = [keyNode.range[0], endRange[1], endRange[2]];
                coll.items.push(map);
            }
            offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
    }
    const expectedEnd = isMap ? '}' : ']';
    const [ce, ...ee] = fc.end;
    let cePos = offset;
    if (ce && ce.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
    else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot
            ? `${name} must end with a ${expectedEnd}`
            : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? 'MISSING_CHAR' : 'BAD_INDENT', msg);
        if (ce && ce.source.length !== 1)
            ee.unshift(ce);
    }
    if (ee.length > 0) {
        const end = resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
            if (coll.comment)
                coll.comment += '\n' + end.comment;
            else
                coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
    }
    else {
        coll.range = [fc.offset, cePos, cePos];
    }
    return coll;
}

function resolveCollection(CN, ctx, token, onError, tagName, tag) {
    const coll = token.type === 'block-map'
        ? resolveBlockMap(CN, ctx, token, onError, tag)
        : token.type === 'block-seq'
            ? resolveBlockSeq(CN, ctx, token, onError, tag)
            : resolveFlowCollection(CN, ctx, token, onError, tag);
    const Coll = coll.constructor;
    // If we got a tagName matching the class, or the tag name is '!',
    // then use the tagName from the node class used to create it.
    if (tagName === '!' || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
    }
    if (tagName)
        coll.tag = tagName;
    return coll;
}
function composeCollection(CN, ctx, token, props, onError) {
    const tagToken = props.tag;
    const tagName = !tagToken
        ? null
        : ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg));
    if (token.type === 'block-seq') {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken
            ? anchor.offset > tagToken.offset
                ? anchor
                : tagToken
            : (anchor ?? tagToken);
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
            const message = 'Missing newline after block sequence props';
            onError(lastProp, 'MISSING_CHAR', message);
        }
    }
    const expType = token.type === 'block-map'
        ? 'map'
        : token.type === 'block-seq'
            ? 'seq'
            : token.start.source === '{'
                ? 'map'
                : 'seq';
    // shortcut: check if it's a generic YAMLMap or YAMLSeq
    // before jumping into the custom tag logic.
    if (!tagToken ||
        !tagName ||
        tagName === '!' ||
        (tagName === YAMLMap.tagName && expType === 'map') ||
        (tagName === YAMLSeq.tagName && expType === 'seq')) {
        return resolveCollection(CN, ctx, token, onError, tagName);
    }
    let tag = ctx.schema.tags.find(t => t.tag === tagName && t.collection === expType);
    if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt && kt.collection === expType) {
            ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
            tag = kt;
        }
        else {
            if (kt?.collection) {
                onError(tagToken, 'BAD_COLLECTION_TYPE', `${kt.tag} used for ${expType} collection, but expects ${kt.collection}`, true);
            }
            else {
                onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, true);
            }
            return resolveCollection(CN, ctx, token, onError, tagName);
        }
    }
    const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
    const res = tag.resolve?.(coll, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg), ctx.options) ?? coll;
    const node = isNode(res)
        ? res
        : new Scalar(res);
    node.range = coll.range;
    node.tag = tagName;
    if (tag?.format)
        node.format = tag.format;
    return node;
}

function resolveBlockScalar(ctx, scalar, onError) {
    const start = scalar.offset;
    const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
    if (!header)
        return { value: '', type: null, comment: '', range: [start, start, start] };
    const type = header.mode === '>' ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL;
    const lines = scalar.source ? splitLines(scalar.source) : [];
    // determine the end of content & start of chomping
    let chompStart = lines.length;
    for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === '' || content === '\r')
            chompStart = i;
        else
            break;
    }
    // shortcut for empty contents
    if (chompStart === 0) {
        const value = header.chomp === '+' && lines.length > 0
            ? '\n'.repeat(Math.max(1, lines.length - 1))
            : '';
        let end = start + header.length;
        if (scalar.source)
            end += scalar.source.length;
        return { value, type, comment: header.comment, range: [start, end, end] };
    }
    // find the indentation level to trim from start
    let trimIndent = scalar.indent + header.indent;
    let offset = scalar.offset + header.length;
    let contentStart = 0;
    for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === '' || content === '\r') {
            if (header.indent === 0 && indent.length > trimIndent)
                trimIndent = indent.length;
        }
        else {
            if (indent.length < trimIndent) {
                const message = 'Block scalars with more-indented leading empty lines must use an explicit indentation indicator';
                onError(offset + indent.length, 'MISSING_CHAR', message);
            }
            if (header.indent === 0)
                trimIndent = indent.length;
            contentStart = i;
            if (trimIndent === 0 && !ctx.atRoot) {
                const message = 'Block scalar values in collections must be indented';
                onError(offset, 'BAD_INDENT', message);
            }
            break;
        }
        offset += indent.length + content.length + 1;
    }
    // include trailing more-indented empty lines in content
    for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
            chompStart = i + 1;
    }
    let value = '';
    let sep = '';
    let prevMoreIndented = false;
    // leading whitespace is kept intact
    for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + '\n';
    for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === '\r';
        if (crlf)
            content = content.slice(0, -1);
        /* istanbul ignore if already caught in lexer */
        if (content && indent.length < trimIndent) {
            const src = header.indent
                ? 'explicit indentation indicator'
                : 'first line';
            const message = `Block scalar lines must not be less indented than their ${src}`;
            onError(offset - content.length - (crlf ? 2 : 1), 'BAD_INDENT', message);
            indent = '';
        }
        if (type === Scalar.BLOCK_LITERAL) {
            value += sep + indent.slice(trimIndent) + content;
            sep = '\n';
        }
        else if (indent.length > trimIndent || content[0] === '\t') {
            // more-indented content within a folded block
            if (sep === ' ')
                sep = '\n';
            else if (!prevMoreIndented && sep === '\n')
                sep = '\n\n';
            value += sep + indent.slice(trimIndent) + content;
            sep = '\n';
            prevMoreIndented = true;
        }
        else if (content === '') {
            // empty line
            if (sep === '\n')
                value += '\n';
            else
                sep = '\n';
        }
        else {
            value += sep + content;
            sep = ' ';
            prevMoreIndented = false;
        }
    }
    switch (header.chomp) {
        case '-':
            break;
        case '+':
            for (let i = chompStart; i < lines.length; ++i)
                value += '\n' + lines[i][0].slice(trimIndent);
            if (value[value.length - 1] !== '\n')
                value += '\n';
            break;
        default:
            value += '\n';
    }
    const end = start + header.length + scalar.source.length;
    return { value, type, comment: header.comment, range: [start, end, end] };
}
function parseBlockScalarHeader({ offset, props }, strict, onError) {
    /* istanbul ignore if should not happen */
    if (props[0].type !== 'block-scalar-header') {
        onError(props[0], 'IMPOSSIBLE', 'Block scalar header not found');
        return null;
    }
    const { source } = props[0];
    const mode = source[0];
    let indent = 0;
    let chomp = '';
    let error = -1;
    for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === '-' || ch === '+'))
            chomp = ch;
        else {
            const n = Number(ch);
            if (!indent && n)
                indent = n;
            else if (error === -1)
                error = offset + i;
        }
    }
    if (error !== -1)
        onError(error, 'UNEXPECTED_TOKEN', `Block scalar header includes extra characters: ${source}`);
    let hasSpace = false;
    let comment = '';
    let length = source.length;
    for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
            case 'space':
                hasSpace = true;
            // fallthrough
            case 'newline':
                length += token.source.length;
                break;
            case 'comment':
                if (strict && !hasSpace) {
                    const message = 'Comments must be separated from other tokens by white space characters';
                    onError(token, 'MISSING_CHAR', message);
                }
                length += token.source.length;
                comment = token.source.substring(1);
                break;
            case 'error':
                onError(token, 'UNEXPECTED_TOKEN', token.message);
                length += token.source.length;
                break;
            /* istanbul ignore next should not happen */
            default: {
                const message = `Unexpected token in block scalar header: ${token.type}`;
                onError(token, 'UNEXPECTED_TOKEN', message);
                const ts = token.source;
                if (ts && typeof ts === 'string')
                    length += ts.length;
            }
        }
    }
    return { mode, indent, chomp, comment, length };
}
/** @returns Array of lines split up as `[indent, content]` */
function splitLines(source) {
    const split = source.split(/\n( *)/);
    const first = split[0];
    const m = first.match(/^( *)/);
    const line0 = m?.[1]
        ? [m[1], first.slice(m[1].length)]
        : ['', first];
    const lines = [line0];
    for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
    return lines;
}

function resolveFlowScalar(scalar, strict, onError) {
    const { offset, type, source, end } = scalar;
    let _type;
    let value;
    const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
    switch (type) {
        case 'scalar':
            _type = Scalar.PLAIN;
            value = plainValue(source, _onError);
            break;
        case 'single-quoted-scalar':
            _type = Scalar.QUOTE_SINGLE;
            value = singleQuotedValue(source, _onError);
            break;
        case 'double-quoted-scalar':
            _type = Scalar.QUOTE_DOUBLE;
            value = doubleQuotedValue(source, _onError);
            break;
        /* istanbul ignore next should not happen */
        default:
            onError(scalar, 'UNEXPECTED_TOKEN', `Expected a flow scalar value, but found: ${type}`);
            return {
                value: '',
                type: null,
                comment: '',
                range: [offset, offset + source.length, offset + source.length]
            };
    }
    const valueEnd = offset + source.length;
    const re = resolveEnd(end, valueEnd, strict, onError);
    return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
    };
}
function plainValue(source, onError) {
    let badChar = '';
    switch (source[0]) {
        /* istanbul ignore next should not happen */
        case '\t':
            badChar = 'a tab character';
            break;
        case ',':
            badChar = 'flow indicator character ,';
            break;
        case '%':
            badChar = 'directive indicator character %';
            break;
        case '|':
        case '>': {
            badChar = `block scalar indicator ${source[0]}`;
            break;
        }
        case '@':
        case '`': {
            badChar = `reserved character ${source[0]}`;
            break;
        }
    }
    if (badChar)
        onError(0, 'BAD_SCALAR_START', `Plain value cannot start with ${badChar}`);
    return foldLines(source);
}
function singleQuotedValue(source, onError) {
    if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, 'MISSING_CHAR', "Missing closing 'quote");
    return foldLines(source.slice(1, -1)).replace(/''/g, "'");
}
function foldLines(source) {
    /**
     * The negative lookbehind here and in the `re` RegExp is to
     * prevent causing a polynomial search time in certain cases.
     *
     * The try-catch is for Safari, which doesn't support this yet:
     * https://caniuse.com/js-regexp-lookbehind
     */
    let first, line;
    try {
        first = new RegExp('(.*?)(?<![ \t])[ \t]*\r?\n', 'sy');
        line = new RegExp('[ \t]*(.*?)(?:(?<![ \t])[ \t]*)?\r?\n', 'sy');
    }
    catch {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
    }
    let match = first.exec(source);
    if (!match)
        return source;
    let res = match[1];
    let sep = ' ';
    let pos = first.lastIndex;
    line.lastIndex = pos;
    while ((match = line.exec(source))) {
        if (match[1] === '') {
            if (sep === '\n')
                res += sep;
            else
                sep = '\n';
        }
        else {
            res += sep + match[1];
            sep = ' ';
        }
        pos = line.lastIndex;
    }
    const last = /[ \t]*(.*)/sy;
    last.lastIndex = pos;
    match = last.exec(source);
    return res + sep + (match?.[1] ?? '');
}
function doubleQuotedValue(source, onError) {
    let res = '';
    for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === '\r' && source[i + 1] === '\n')
            continue;
        if (ch === '\n') {
            const { fold, offset } = foldNewline(source, i);
            res += fold;
            i = offset;
        }
        else if (ch === '\\') {
            let next = source[++i];
            const cc = escapeCodes[next];
            if (cc)
                res += cc;
            else if (next === '\n') {
                // skip escaped newlines, but still trim the following line
                next = source[i + 1];
                while (next === ' ' || next === '\t')
                    next = source[++i + 1];
            }
            else if (next === '\r' && source[i + 1] === '\n') {
                // skip escaped CRLF newlines, but still trim the following line
                next = source[++i + 1];
                while (next === ' ' || next === '\t')
                    next = source[++i + 1];
            }
            else if (next === 'x' || next === 'u' || next === 'U') {
                const length = { x: 2, u: 4, U: 8 }[next];
                res += parseCharCode(source, i + 1, length, onError);
                i += length;
            }
            else {
                const raw = source.substr(i - 1, 2);
                onError(i - 1, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
                res += raw;
            }
        }
        else if (ch === ' ' || ch === '\t') {
            // trim trailing whitespace
            const wsStart = i;
            let next = source[i + 1];
            while (next === ' ' || next === '\t')
                next = source[++i + 1];
            if (next !== '\n' && !(next === '\r' && source[i + 2] === '\n'))
                res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        }
        else {
            res += ch;
        }
    }
    if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, 'MISSING_CHAR', 'Missing closing "quote');
    return res;
}
/**
 * Fold a single newline into a space, multiple newlines to N - 1 newlines.
 * Presumes `source[offset] === '\n'`
 */
function foldNewline(source, offset) {
    let fold = '';
    let ch = source[offset + 1];
    while (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
        if (ch === '\r' && source[offset + 2] !== '\n')
            break;
        if (ch === '\n')
            fold += '\n';
        offset += 1;
        ch = source[offset + 1];
    }
    if (!fold)
        fold = ' ';
    return { fold, offset };
}
const escapeCodes = {
    '0': '\0', // null character
    a: '\x07', // bell character
    b: '\b', // backspace
    e: '\x1b', // escape character
    f: '\f', // form feed
    n: '\n', // line feed
    r: '\r', // carriage return
    t: '\t', // horizontal tab
    v: '\v', // vertical tab
    N: '\u0085', // Unicode next line
    _: '\u00a0', // Unicode non-breaking space
    L: '\u2028', // Unicode line separator
    P: '\u2029', // Unicode paragraph separator
    ' ': ' ',
    '"': '"',
    '/': '/',
    '\\': '\\',
    '\t': '\t'
};
function parseCharCode(source, offset, length, onError) {
    const cc = source.substr(offset, length);
    const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
    const code = ok ? parseInt(cc, 16) : NaN;
    if (isNaN(code)) {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, 'BAD_DQ_ESCAPE', `Invalid escape sequence ${raw}`);
        return raw;
    }
    return String.fromCodePoint(code);
}

function composeScalar(ctx, token, tagToken, onError) {
    const { value, type, comment, range } = token.type === 'block-scalar'
        ? resolveBlockScalar(ctx, token, onError)
        : resolveFlowScalar(token, ctx.options.strict, onError);
    const tagName = tagToken
        ? ctx.directives.tagName(tagToken.source, msg => onError(tagToken, 'TAG_RESOLVE_FAILED', msg))
        : null;
    let tag;
    if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[SCALAR$1];
    }
    else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
    else if (token.type === 'scalar')
        tag = findScalarTagByTest(ctx, value, token, onError);
    else
        tag = ctx.schema[SCALAR$1];
    let scalar;
    try {
        const res = tag.resolve(value, msg => onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg), ctx.options);
        scalar = isScalar$1(res) ? res : new Scalar(res);
    }
    catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, 'TAG_RESOLVE_FAILED', msg);
        scalar = new Scalar(value);
    }
    scalar.range = range;
    scalar.source = value;
    if (type)
        scalar.type = type;
    if (tagName)
        scalar.tag = tagName;
    if (tag.format)
        scalar.format = tag.format;
    if (comment)
        scalar.comment = comment;
    return scalar;
}
function findScalarTagByName(schema, value, tagName, tagToken, onError) {
    if (tagName === '!')
        return schema[SCALAR$1]; // non-specific tag
    const matchWithTest = [];
    for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
            if (tag.default && tag.test)
                matchWithTest.push(tag);
            else
                return tag;
        }
    }
    for (const tag of matchWithTest)
        if (tag.test?.test(value))
            return tag;
    const kt = schema.knownTags[tagName];
    if (kt && !kt.collection) {
        // Ensure that the known tag is available for stringifying,
        // but does not get used by default.
        schema.tags.push(Object.assign({}, kt, { default: false, test: undefined }));
        return kt;
    }
    onError(tagToken, 'TAG_RESOLVE_FAILED', `Unresolved tag: ${tagName}`, tagName !== 'tag:yaml.org,2002:str');
    return schema[SCALAR$1];
}
function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
    const tag = schema.tags.find(tag => (tag.default === true || (atKey && tag.default === 'key')) &&
        tag.test?.test(value)) || schema[SCALAR$1];
    if (schema.compat) {
        const compat = schema.compat.find(tag => tag.default && tag.test?.test(value)) ??
            schema[SCALAR$1];
        if (tag.tag !== compat.tag) {
            const ts = directives.tagString(tag.tag);
            const cs = directives.tagString(compat.tag);
            const msg = `Value may be parsed as either ${ts} or ${cs}`;
            onError(token, 'TAG_RESOLVE_FAILED', msg, true);
        }
    }
    return tag;
}

function emptyScalarPosition(offset, before, pos) {
    if (before) {
        if (pos === null)
            pos = before.length;
        for (let i = pos - 1; i >= 0; --i) {
            let st = before[i];
            switch (st.type) {
                case 'space':
                case 'comment':
                case 'newline':
                    offset -= st.source.length;
                    continue;
            }
            // Technically, an empty scalar is immediately after the last non-empty
            // node, but it's more useful to place it after any whitespace.
            st = before[++i];
            while (st?.type === 'space') {
                offset += st.source.length;
                st = before[++i];
            }
            break;
        }
    }
    return offset;
}

const CN = { composeNode, composeEmptyNode };
function composeNode(ctx, token, props, onError) {
    const atKey = ctx.atKey;
    const { spaceBefore, comment, anchor, tag } = props;
    let node;
    let isSrcToken = true;
    switch (token.type) {
        case 'alias':
            node = composeAlias(ctx, token, onError);
            if (anchor || tag)
                onError(token, 'ALIAS_PROPS', 'An alias node must not specify any properties');
            break;
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'block-scalar':
            node = composeScalar(ctx, token, tag, onError);
            if (anchor)
                node.anchor = anchor.source.substring(1);
            break;
        case 'block-map':
        case 'block-seq':
        case 'flow-collection':
            node = composeCollection(CN, ctx, token, props, onError);
            if (anchor)
                node.anchor = anchor.source.substring(1);
            break;
        default: {
            const message = token.type === 'error'
                ? token.message
                : `Unsupported token (type: ${token.type})`;
            onError(token, 'UNEXPECTED_TOKEN', message);
            node = composeEmptyNode(ctx, token.offset, undefined, null, props, onError);
            isSrcToken = false;
        }
    }
    if (anchor && node.anchor === '')
        onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
    if (atKey &&
        ctx.options.stringKeys &&
        (!isScalar$1(node) ||
            typeof node.value !== 'string' ||
            (node.tag && node.tag !== 'tag:yaml.org,2002:str'))) {
        const msg = 'With stringKeys, all keys must be strings';
        onError(tag ?? token, 'NON_STRING_KEY', msg);
    }
    if (spaceBefore)
        node.spaceBefore = true;
    if (comment) {
        if (token.type === 'scalar' && token.source === '')
            node.comment = comment;
        else
            node.commentBefore = comment;
    }
    // @ts-expect-error Type checking misses meaning of isSrcToken
    if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
    return node;
}
function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
    const token = {
        type: 'scalar',
        offset: emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ''
    };
    const node = composeScalar(ctx, token, tag, onError);
    if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === '')
            onError(anchor, 'BAD_ALIAS', 'Anchor cannot be an empty string');
    }
    if (spaceBefore)
        node.spaceBefore = true;
    if (comment) {
        node.comment = comment;
        node.range[2] = end;
    }
    return node;
}
function composeAlias({ options }, { offset, source, end }, onError) {
    const alias = new Alias(source.substring(1));
    if (alias.source === '')
        onError(offset, 'BAD_ALIAS', 'Alias cannot be an empty string');
    if (alias.source.endsWith(':'))
        onError(offset + source.length - 1, 'BAD_ALIAS', 'Alias ending in : is ambiguous', true);
    const valueEnd = offset + source.length;
    const re = resolveEnd(end, valueEnd, options.strict, onError);
    alias.range = [offset, valueEnd, re.offset];
    if (re.comment)
        alias.comment = re.comment;
    return alias;
}

function composeDoc(options, directives, { offset, start, value, end }, onError) {
    const opts = Object.assign({ _directives: directives }, options);
    const doc = new Document(undefined, opts);
    const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
    };
    const props = resolveProps(start, {
        indicator: 'doc-start',
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
    });
    if (props.found) {
        doc.directives.docStart = true;
        if (value &&
            (value.type === 'block-map' || value.type === 'block-seq') &&
            !props.hasNewline)
            onError(props.end, 'MISSING_CHAR', 'Block collection cannot start on same line with directives-end marker');
    }
    // @ts-expect-error If Contents is set, let's trust the user
    doc.contents = value
        ? composeNode(ctx, value, props, onError)
        : composeEmptyNode(ctx, props.end, start, null, props, onError);
    const contentEnd = doc.contents.range[2];
    const re = resolveEnd(end, contentEnd, false, onError);
    if (re.comment)
        doc.comment = re.comment;
    doc.range = [offset, contentEnd, re.offset];
    return doc;
}

function getErrorPos(src) {
    if (typeof src === 'number')
        return [src, src + 1];
    if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
    const { offset, source } = src;
    return [offset, offset + (typeof source === 'string' ? source.length : 1)];
}
function parsePrelude(prelude) {
    let comment = '';
    let atComment = false;
    let afterEmptyLine = false;
    for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
            case '#':
                comment +=
                    (comment === '' ? '' : afterEmptyLine ? '\n\n' : '\n') +
                        (source.substring(1) || ' ');
                atComment = true;
                afterEmptyLine = false;
                break;
            case '%':
                if (prelude[i + 1]?.[0] !== '#')
                    i += 1;
                atComment = false;
                break;
            default:
                // This may be wrong after doc-end, but in that case it doesn't matter
                if (!atComment)
                    afterEmptyLine = true;
                atComment = false;
        }
    }
    return { comment, afterEmptyLine };
}
/**
 * Compose a stream of CST nodes into a stream of YAML Documents.
 *
 * ```ts
 * import { Composer, Parser } from 'yaml'
 *
 * const src: string = ...
 * const tokens = new Parser().parse(src)
 * const docs = new Composer().compose(tokens)
 * ```
 */
class Composer {
    constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
            const pos = getErrorPos(source);
            if (warning)
                this.warnings.push(new YAMLWarning(pos, code, message));
            else
                this.errors.push(new YAMLParseError(pos, code, message));
        };
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        this.directives = new Directives({ version: options.version || '1.2' });
        this.options = options;
    }
    decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        //console.log({ dc: doc.comment, prelude, comment })
        if (comment) {
            const dc = doc.contents;
            if (afterDoc) {
                doc.comment = doc.comment ? `${doc.comment}\n${comment}` : comment;
            }
            else if (afterEmptyLine || doc.directives.docStart || !dc) {
                doc.commentBefore = comment;
            }
            else if (isCollection$1(dc) && !dc.flow && dc.items.length > 0) {
                let it = dc.items[0];
                if (isPair(it))
                    it = it.key;
                const cb = it.commentBefore;
                it.commentBefore = cb ? `${comment}\n${cb}` : comment;
            }
            else {
                const cb = dc.commentBefore;
                dc.commentBefore = cb ? `${comment}\n${cb}` : comment;
            }
        }
        if (afterDoc) {
            Array.prototype.push.apply(doc.errors, this.errors);
            Array.prototype.push.apply(doc.warnings, this.warnings);
        }
        else {
            doc.errors = this.errors;
            doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
    }
    /**
     * Current stream status information.
     *
     * Mostly useful at the end of input for an empty stream.
     */
    streamInfo() {
        return {
            comment: parsePrelude(this.prelude).comment,
            directives: this.directives,
            errors: this.errors,
            warnings: this.warnings
        };
    }
    /**
     * Compose tokens into documents.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
            yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
    }
    /** Advance the composer by one CST token. */
    *next(token) {
        switch (token.type) {
            case 'directive':
                this.directives.add(token.source, (offset, message, warning) => {
                    const pos = getErrorPos(token);
                    pos[0] += offset;
                    this.onError(pos, 'BAD_DIRECTIVE', message, warning);
                });
                this.prelude.push(token.source);
                this.atDirectives = true;
                break;
            case 'document': {
                const doc = composeDoc(this.options, this.directives, token, this.onError);
                if (this.atDirectives && !doc.directives.docStart)
                    this.onError(token, 'MISSING_CHAR', 'Missing directives-end/doc-start indicator line');
                this.decorate(doc, false);
                if (this.doc)
                    yield this.doc;
                this.doc = doc;
                this.atDirectives = false;
                break;
            }
            case 'byte-order-mark':
            case 'space':
                break;
            case 'comment':
            case 'newline':
                this.prelude.push(token.source);
                break;
            case 'error': {
                const msg = token.source
                    ? `${token.message}: ${JSON.stringify(token.source)}`
                    : token.message;
                const error = new YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg);
                if (this.atDirectives || !this.doc)
                    this.errors.push(error);
                else
                    this.doc.errors.push(error);
                break;
            }
            case 'doc-end': {
                if (!this.doc) {
                    const msg = 'Unexpected doc-end without preceding document';
                    this.errors.push(new YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', msg));
                    break;
                }
                this.doc.directives.docEnd = true;
                const end = resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
                this.decorate(this.doc, true);
                if (end.comment) {
                    const dc = this.doc.comment;
                    this.doc.comment = dc ? `${dc}\n${end.comment}` : end.comment;
                }
                this.doc.range[2] = end.offset;
                break;
            }
            default:
                this.errors.push(new YAMLParseError(getErrorPos(token), 'UNEXPECTED_TOKEN', `Unsupported token ${token.type}`));
        }
    }
    /**
     * Call at end of input to yield any remaining document.
     *
     * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
     * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
     */
    *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
            this.decorate(this.doc, true);
            yield this.doc;
            this.doc = null;
        }
        else if (forceDoc) {
            const opts = Object.assign({ _directives: this.directives }, this.options);
            const doc = new Document(undefined, opts);
            if (this.atDirectives)
                this.onError(endOffset, 'MISSING_CHAR', 'Missing directives-end indicator line');
            doc.range = [0, endOffset, endOffset];
            this.decorate(doc, false);
            yield doc;
        }
    }
}

function resolveAsScalar(token, strict = true, onError) {
    if (token) {
        const _onError = (pos, code, message) => {
            const offset = typeof pos === 'number' ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
            if (onError)
                onError(offset, code, message);
            else
                throw new YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return resolveFlowScalar(token, strict, _onError);
            case 'block-scalar':
                return resolveBlockScalar({ options: { strict } }, token, _onError);
        }
    }
    return null;
}
/**
 * Create a new scalar token with `value`
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.end Comments and whitespace after the end of the value, or after the block scalar header. If undefined, a newline will be added.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.indent The indent level of the token.
 * @param context.inFlow Is this scalar within a flow collection? This may affect the resolved type of the token's value.
 * @param context.offset The offset position of the token.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function createScalarToken(value, context) {
    const { implicitKey = false, indent, inFlow = false, offset = -1, type = 'PLAIN' } = context;
    const source = stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? ' '.repeat(indent) : '',
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
    });
    const end = context.end ?? [
        { type: 'newline', offset: -1, indent, source: '\n' }
    ];
    switch (source[0]) {
        case '|':
        case '>': {
            const he = source.indexOf('\n');
            const head = source.substring(0, he);
            const body = source.substring(he + 1) + '\n';
            const props = [
                { type: 'block-scalar-header', offset, indent, source: head }
            ];
            if (!addEndtoBlockProps(props, end))
                props.push({ type: 'newline', offset: -1, indent, source: '\n' });
            return { type: 'block-scalar', offset, indent, props, source: body };
        }
        case '"':
            return { type: 'double-quoted-scalar', offset, indent, source, end };
        case "'":
            return { type: 'single-quoted-scalar', offset, indent, source, end };
        default:
            return { type: 'scalar', offset, indent, source, end };
    }
}
/**
 * Set the value of `token` to the given string `value`, overwriting any previous contents and type that it may have.
 *
 * Best efforts are made to retain any comments previously associated with the `token`,
 * though all contents within a collection's `items` will be overwritten.
 *
 * Values that represent an actual string but may be parsed as a different type should use a `type` other than `'PLAIN'`,
 * as this function does not support any schema operations and won't check for such conflicts.
 *
 * @param token Any token. If it does not include an `indent` value, the value will be stringified as if it were an implicit key.
 * @param value The string representation of the value, which will have its content properly indented.
 * @param context.afterKey In most cases, values after a key should have an additional level of indentation.
 * @param context.implicitKey Being within an implicit key may affect the resolved type of the token's value.
 * @param context.inFlow Being within a flow collection may affect the resolved type of the token's value.
 * @param context.type The preferred type of the scalar token. If undefined, the previous type of the `token` will be used, defaulting to `'PLAIN'`.
 */
function setScalarValue(token, value, context = {}) {
    let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
    let indent = 'indent' in token ? token.indent : null;
    if (afterKey && typeof indent === 'number')
        indent += 2;
    if (!type)
        switch (token.type) {
            case 'single-quoted-scalar':
                type = 'QUOTE_SINGLE';
                break;
            case 'double-quoted-scalar':
                type = 'QUOTE_DOUBLE';
                break;
            case 'block-scalar': {
                const header = token.props[0];
                if (header.type !== 'block-scalar-header')
                    throw new Error('Invalid block scalar header');
                type = header.source[0] === '>' ? 'BLOCK_FOLDED' : 'BLOCK_LITERAL';
                break;
            }
            default:
                type = 'PLAIN';
        }
    const source = stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? ' '.repeat(indent) : '',
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
    });
    switch (source[0]) {
        case '|':
        case '>':
            setBlockScalarValue(token, source);
            break;
        case '"':
            setFlowScalarValue(token, source, 'double-quoted-scalar');
            break;
        case "'":
            setFlowScalarValue(token, source, 'single-quoted-scalar');
            break;
        default:
            setFlowScalarValue(token, source, 'scalar');
    }
}
function setBlockScalarValue(token, source) {
    const he = source.indexOf('\n');
    const head = source.substring(0, he);
    const body = source.substring(he + 1) + '\n';
    if (token.type === 'block-scalar') {
        const header = token.props[0];
        if (header.type !== 'block-scalar-header')
            throw new Error('Invalid block scalar header');
        header.source = head;
        token.source = body;
    }
    else {
        const { offset } = token;
        const indent = 'indent' in token ? token.indent : -1;
        const props = [
            { type: 'block-scalar-header', offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, 'end' in token ? token.end : undefined))
            props.push({ type: 'newline', offset: -1, indent, source: '\n' });
        for (const key of Object.keys(token))
            if (key !== 'type' && key !== 'offset')
                delete token[key];
        Object.assign(token, { type: 'block-scalar', indent, props, source: body });
    }
}
/** @returns `true` if last token is a newline */
function addEndtoBlockProps(props, end) {
    if (end)
        for (const st of end)
            switch (st.type) {
                case 'space':
                case 'comment':
                    props.push(st);
                    break;
                case 'newline':
                    props.push(st);
                    return true;
            }
    return false;
}
function setFlowScalarValue(token, source, type) {
    switch (token.type) {
        case 'scalar':
        case 'double-quoted-scalar':
        case 'single-quoted-scalar':
            token.type = type;
            token.source = source;
            break;
        case 'block-scalar': {
            const end = token.props.slice(1);
            let oa = source.length;
            if (token.props[0].type === 'block-scalar-header')
                oa -= token.props[0].source.length;
            for (const tok of end)
                tok.offset += oa;
            delete token.props;
            Object.assign(token, { type, source, end });
            break;
        }
        case 'block-map':
        case 'block-seq': {
            const offset = token.offset + source.length;
            const nl = { type: 'newline', offset, indent: token.indent, source: '\n' };
            delete token.items;
            Object.assign(token, { type, source, end: [nl] });
            break;
        }
        default: {
            const indent = 'indent' in token ? token.indent : -1;
            const end = 'end' in token && Array.isArray(token.end)
                ? token.end.filter(st => st.type === 'space' ||
                    st.type === 'comment' ||
                    st.type === 'newline')
                : [];
            for (const key of Object.keys(token))
                if (key !== 'type' && key !== 'offset')
                    delete token[key];
            Object.assign(token, { type, indent, source, end });
        }
    }
}

/**
 * Stringify a CST document, token, or collection item
 *
 * Fair warning: This applies no validation whatsoever, and
 * simply concatenates the sources in their logical order.
 */
const stringify$1 = (cst) => 'type' in cst ? stringifyToken(cst) : stringifyItem(cst);
function stringifyToken(token) {
    switch (token.type) {
        case 'block-scalar': {
            let res = '';
            for (const tok of token.props)
                res += stringifyToken(tok);
            return res + token.source;
        }
        case 'block-map':
        case 'block-seq': {
            let res = '';
            for (const item of token.items)
                res += stringifyItem(item);
            return res;
        }
        case 'flow-collection': {
            let res = token.start.source;
            for (const item of token.items)
                res += stringifyItem(item);
            for (const st of token.end)
                res += st.source;
            return res;
        }
        case 'document': {
            let res = stringifyItem(token);
            if (token.end)
                for (const st of token.end)
                    res += st.source;
            return res;
        }
        default: {
            let res = token.source;
            if ('end' in token && token.end)
                for (const st of token.end)
                    res += st.source;
            return res;
        }
    }
}
function stringifyItem({ start, key, sep, value }) {
    let res = '';
    for (const st of start)
        res += st.source;
    if (key)
        res += stringifyToken(key);
    if (sep)
        for (const st of sep)
            res += st.source;
    if (value)
        res += stringifyToken(value);
    return res;
}

const BREAK = Symbol('break visit');
const SKIP = Symbol('skip children');
const REMOVE = Symbol('remove item');
/**
 * Apply a visitor to a CST document or item.
 *
 * Walks through the tree (depth-first) starting from the root, calling a
 * `visitor` function with two arguments when entering each item:
 *   - `item`: The current item, which included the following members:
 *     - `start: SourceToken[]` – Source tokens before the key or value,
 *       possibly including its anchor or tag.
 *     - `key?: Token | null` – Set for pair values. May then be `null`, if
 *       the key before the `:` separator is empty.
 *     - `sep?: SourceToken[]` – Source tokens between the key and the value,
 *       which should include the `:` map value indicator if `value` is set.
 *     - `value?: Token` – The value of a sequence item, or of a map pair.
 *   - `path`: The steps from the root to the current node, as an array of
 *     `['key' | 'value', number]` tuples.
 *
 * The return value of the visitor may be used to control the traversal:
 *   - `undefined` (default): Do nothing and continue
 *   - `visit.SKIP`: Do not visit the children of this token, continue with
 *      next sibling
 *   - `visit.BREAK`: Terminate traversal completely
 *   - `visit.REMOVE`: Remove the current item, then continue with the next one
 *   - `number`: Set the index of the next step. This is useful especially if
 *     the index of the current token has changed.
 *   - `function`: Define the next visitor for this item. After the original
 *     visitor is called on item entry, next visitors are called after handling
 *     a non-empty `key` and when exiting the item.
 */
function visit(cst, visitor) {
    if ('type' in cst && cst.type === 'document')
        cst = { start: cst.start, value: cst.value };
    _visit(Object.freeze([]), cst, visitor);
}
// Without the `as symbol` casts, TS declares these in the `visit`
// namespace using `var`, but then complains about that because
// `unique symbol` must be `const`.
/** Terminate visit traversal completely */
visit.BREAK = BREAK;
/** Do not visit the children of the current item */
visit.SKIP = SKIP;
/** Remove the current item */
visit.REMOVE = REMOVE;
/** Find the item at `path` from `cst` as the root */
visit.itemAtPath = (cst, path) => {
    let item = cst;
    for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && 'items' in tok) {
            item = tok.items[index];
        }
        else
            return undefined;
    }
    return item;
};
/**
 * Get the immediate parent collection of the item at `path` from `cst` as the root.
 *
 * Throws an error if the collection is not found, which should never happen if the item itself exists.
 */
visit.parentCollection = (cst, path) => {
    const parent = visit.itemAtPath(cst, path.slice(0, -1));
    const field = path[path.length - 1][0];
    const coll = parent?.[field];
    if (coll && 'items' in coll)
        return coll;
    throw new Error('Parent collection not found');
};
function _visit(path, item, visitor) {
    let ctrl = visitor(item, path);
    if (typeof ctrl === 'symbol')
        return ctrl;
    for (const field of ['key', 'value']) {
        const token = item[field];
        if (token && 'items' in token) {
            for (let i = 0; i < token.items.length; ++i) {
                const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
                if (typeof ci === 'number')
                    i = ci - 1;
                else if (ci === BREAK)
                    return BREAK;
                else if (ci === REMOVE) {
                    token.items.splice(i, 1);
                    i -= 1;
                }
            }
            if (typeof ctrl === 'function' && field === 'key')
                ctrl = ctrl(item, path);
        }
    }
    return typeof ctrl === 'function' ? ctrl(item, path) : ctrl;
}

/** The byte order mark */
const BOM = '\u{FEFF}';
/** Start of doc-mode */
const DOCUMENT = '\x02'; // C0: Start of Text
/** Unexpected end of flow-mode */
const FLOW_END = '\x18'; // C0: Cancel
/** Next token is a scalar value */
const SCALAR = '\x1f'; // C0: Unit Separator
/** @returns `true` if `token` is a flow or block collection */
const isCollection = (token) => !!token && 'items' in token;
/** @returns `true` if `token` is a flow or block scalar; not an alias */
const isScalar = (token) => !!token &&
    (token.type === 'scalar' ||
        token.type === 'single-quoted-scalar' ||
        token.type === 'double-quoted-scalar' ||
        token.type === 'block-scalar');
/* istanbul ignore next */
/** Get a printable representation of a lexer token */
function prettyToken(token) {
    switch (token) {
        case BOM:
            return '<BOM>';
        case DOCUMENT:
            return '<DOC>';
        case FLOW_END:
            return '<FLOW_END>';
        case SCALAR:
            return '<SCALAR>';
        default:
            return JSON.stringify(token);
    }
}
/** Identify the type of a lexer token. May return `null` for unknown tokens. */
function tokenType(source) {
    switch (source) {
        case BOM:
            return 'byte-order-mark';
        case DOCUMENT:
            return 'doc-mode';
        case FLOW_END:
            return 'flow-error-end';
        case SCALAR:
            return 'scalar';
        case '---':
            return 'doc-start';
        case '...':
            return 'doc-end';
        case '':
        case '\n':
        case '\r\n':
            return 'newline';
        case '-':
            return 'seq-item-ind';
        case '?':
            return 'explicit-key-ind';
        case ':':
            return 'map-value-ind';
        case '{':
            return 'flow-map-start';
        case '}':
            return 'flow-map-end';
        case '[':
            return 'flow-seq-start';
        case ']':
            return 'flow-seq-end';
        case ',':
            return 'comma';
    }
    switch (source[0]) {
        case ' ':
        case '\t':
            return 'space';
        case '#':
            return 'comment';
        case '%':
            return 'directive-line';
        case '*':
            return 'alias';
        case '&':
            return 'anchor';
        case '!':
            return 'tag';
        case "'":
            return 'single-quoted-scalar';
        case '"':
            return 'double-quoted-scalar';
        case '|':
        case '>':
            return 'block-scalar-header';
    }
    return null;
}

var cst = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BOM: BOM,
    DOCUMENT: DOCUMENT,
    FLOW_END: FLOW_END,
    SCALAR: SCALAR,
    createScalarToken: createScalarToken,
    isCollection: isCollection,
    isScalar: isScalar,
    prettyToken: prettyToken,
    resolveAsScalar: resolveAsScalar,
    setScalarValue: setScalarValue,
    stringify: stringify$1,
    tokenType: tokenType,
    visit: visit
});

/*
START -> stream

stream
  directive -> line-end -> stream
  indent + line-end -> stream
  [else] -> line-start

line-end
  comment -> line-end
  newline -> .
  input-end -> END

line-start
  doc-start -> doc
  doc-end -> stream
  [else] -> indent -> block-start

block-start
  seq-item-start -> block-start
  explicit-key-start -> block-start
  map-value-start -> block-start
  [else] -> doc

doc
  line-end -> line-start
  spaces -> doc
  anchor -> doc
  tag -> doc
  flow-start -> flow -> doc
  flow-end -> error -> doc
  seq-item-start -> error -> doc
  explicit-key-start -> error -> doc
  map-value-start -> doc
  alias -> doc
  quote-start -> quoted-scalar -> doc
  block-scalar-header -> line-end -> block-scalar(min) -> line-start
  [else] -> plain-scalar(false, min) -> doc

flow
  line-end -> flow
  spaces -> flow
  anchor -> flow
  tag -> flow
  flow-start -> flow -> flow
  flow-end -> .
  seq-item-start -> error -> flow
  explicit-key-start -> flow
  map-value-start -> flow
  alias -> flow
  quote-start -> quoted-scalar -> flow
  comma -> flow
  [else] -> plain-scalar(true, 0) -> flow

quoted-scalar
  quote-end -> .
  [else] -> quoted-scalar

block-scalar(min)
  newline + peek(indent < min) -> .
  [else] -> block-scalar(min)

plain-scalar(is-flow, min)
  scalar-end(is-flow) -> .
  peek(newline + (indent < min)) -> .
  [else] -> plain-scalar(min)
*/
function isEmpty(ch) {
    switch (ch) {
        case undefined:
        case ' ':
        case '\n':
        case '\r':
        case '\t':
            return true;
        default:
            return false;
    }
}
const hexDigits = new Set('0123456789ABCDEFabcdef');
const tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
const flowIndicatorChars = new Set(',[]{}');
const invalidAnchorChars = new Set(' ,[]{}\n\r\t');
const isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
/**
 * Splits an input string into lexical tokens, i.e. smaller strings that are
 * easily identifiable by `tokens.tokenType()`.
 *
 * Lexing starts always in a "stream" context. Incomplete input may be buffered
 * until a complete token can be emitted.
 *
 * In addition to slices of the original input, the following control characters
 * may also be emitted:
 *
 * - `\x02` (Start of Text): A document starts with the next token
 * - `\x18` (Cancel): Unexpected end of flow-mode (indicates an error)
 * - `\x1f` (Unit Separator): Next token is a scalar value
 * - `\u{FEFF}` (Byte order mark): Emitted separately outside documents
 */
class Lexer {
    constructor() {
        /**
         * Flag indicating whether the end of the current buffer marks the end of
         * all input
         */
        this.atEnd = false;
        /**
         * Explicit indent set in block scalar header, as an offset from the current
         * minimum indent, so e.g. set to 1 from a header `|2+`. Set to -1 if not
         * explicitly set.
         */
        this.blockScalarIndent = -1;
        /**
         * Block scalars that include a + (keep) chomping indicator in their header
         * include trailing empty lines, which are otherwise excluded from the
         * scalar's contents.
         */
        this.blockScalarKeep = false;
        /** Current input */
        this.buffer = '';
        /**
         * Flag noting whether the map value indicator : can immediately follow this
         * node within a flow context.
         */
        this.flowKey = false;
        /** Count of surrounding flow collection levels. */
        this.flowLevel = 0;
        /**
         * Minimum level of indentation required for next lines to be parsed as a
         * part of the current scalar value.
         */
        this.indentNext = 0;
        /** Indentation level of the current line. */
        this.indentValue = 0;
        /** Position of the next \n character. */
        this.lineEndPos = null;
        /** Stores the state of the lexer if reaching the end of incpomplete input */
        this.next = null;
        /** A pointer to `buffer`; the current position of the lexer. */
        this.pos = 0;
    }
    /**
     * Generate YAML tokens from the `source` string. If `incomplete`,
     * a part of the last line may be left as a buffer for the next call.
     *
     * @returns A generator of lexical tokens
     */
    *lex(source, incomplete = false) {
        if (source) {
            if (typeof source !== 'string')
                throw TypeError('source is not a string');
            this.buffer = this.buffer ? this.buffer + source : source;
            this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? 'stream';
        while (next && (incomplete || this.hasChars(1)))
            next = yield* this.parseNext(next);
    }
    atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === ' ' || ch === '\t')
            ch = this.buffer[++i];
        if (!ch || ch === '#' || ch === '\n')
            return true;
        if (ch === '\r')
            return this.buffer[i + 1] === '\n';
        return false;
    }
    charAt(n) {
        return this.buffer[this.pos + n];
    }
    continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
            let indent = 0;
            while (ch === ' ')
                ch = this.buffer[++indent + offset];
            if (ch === '\r') {
                const next = this.buffer[indent + offset + 1];
                if (next === '\n' || (!next && !this.atEnd))
                    return offset + indent + 1;
            }
            return ch === '\n' || indent >= this.indentNext || (!ch && !this.atEnd)
                ? offset + indent
                : -1;
        }
        if (ch === '-' || ch === '.') {
            const dt = this.buffer.substr(offset, 3);
            if ((dt === '---' || dt === '...') && isEmpty(this.buffer[offset + 3]))
                return -1;
        }
        return offset;
    }
    getLine() {
        let end = this.lineEndPos;
        if (typeof end !== 'number' || (end !== -1 && end < this.pos)) {
            end = this.buffer.indexOf('\n', this.pos);
            this.lineEndPos = end;
        }
        if (end === -1)
            return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === '\r')
            end -= 1;
        return this.buffer.substring(this.pos, end);
    }
    hasChars(n) {
        return this.pos + n <= this.buffer.length;
    }
    setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
    }
    peek(n) {
        return this.buffer.substr(this.pos, n);
    }
    *parseNext(next) {
        switch (next) {
            case 'stream':
                return yield* this.parseStream();
            case 'line-start':
                return yield* this.parseLineStart();
            case 'block-start':
                return yield* this.parseBlockStart();
            case 'doc':
                return yield* this.parseDocument();
            case 'flow':
                return yield* this.parseFlowCollection();
            case 'quoted-scalar':
                return yield* this.parseQuotedScalar();
            case 'block-scalar':
                return yield* this.parseBlockScalar();
            case 'plain-scalar':
                return yield* this.parsePlainScalar();
        }
    }
    *parseStream() {
        let line = this.getLine();
        if (line === null)
            return this.setNext('stream');
        if (line[0] === BOM) {
            yield* this.pushCount(1);
            line = line.substring(1);
        }
        if (line[0] === '%') {
            let dirEnd = line.length;
            let cs = line.indexOf('#');
            while (cs !== -1) {
                const ch = line[cs - 1];
                if (ch === ' ' || ch === '\t') {
                    dirEnd = cs - 1;
                    break;
                }
                else {
                    cs = line.indexOf('#', cs + 1);
                }
            }
            while (true) {
                const ch = line[dirEnd - 1];
                if (ch === ' ' || ch === '\t')
                    dirEnd -= 1;
                else
                    break;
            }
            const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
            yield* this.pushCount(line.length - n); // possible comment
            this.pushNewline();
            return 'stream';
        }
        if (this.atLineEnd()) {
            const sp = yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - sp);
            yield* this.pushNewline();
            return 'stream';
        }
        yield DOCUMENT;
        return yield* this.parseLineStart();
    }
    *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
            return this.setNext('line-start');
        if (ch === '-' || ch === '.') {
            if (!this.atEnd && !this.hasChars(4))
                return this.setNext('line-start');
            const s = this.peek(3);
            if ((s === '---' || s === '...') && isEmpty(this.charAt(3))) {
                yield* this.pushCount(3);
                this.indentValue = 0;
                this.indentNext = 0;
                return s === '---' ? 'doc' : 'stream';
            }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
            this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
    }
    *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
            return this.setNext('block-start');
        if ((ch0 === '-' || ch0 === '?' || ch0 === ':') && isEmpty(ch1)) {
            const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
            this.indentNext = this.indentValue + 1;
            this.indentValue += n;
            return yield* this.parseBlockStart();
        }
        return 'doc';
    }
    *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
            return this.setNext('doc');
        let n = yield* this.pushIndicators();
        switch (line[n]) {
            case '#':
                yield* this.pushCount(line.length - n);
            // fallthrough
            case undefined:
                yield* this.pushNewline();
                return yield* this.parseLineStart();
            case '{':
            case '[':
                yield* this.pushCount(1);
                this.flowKey = false;
                this.flowLevel = 1;
                return 'flow';
            case '}':
            case ']':
                // this is an error
                yield* this.pushCount(1);
                return 'doc';
            case '*':
                yield* this.pushUntil(isNotAnchorChar);
                return 'doc';
            case '"':
            case "'":
                return yield* this.parseQuotedScalar();
            case '|':
            case '>':
                n += yield* this.parseBlockScalarHeader();
                n += yield* this.pushSpaces(true);
                yield* this.pushCount(line.length - n);
                yield* this.pushNewline();
                return yield* this.parseBlockScalar();
            default:
                return yield* this.parsePlainScalar();
        }
    }
    *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
            nl = yield* this.pushNewline();
            if (nl > 0) {
                sp = yield* this.pushSpaces(false);
                this.indentValue = indent = sp;
            }
            else {
                sp = 0;
            }
            sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
            return this.setNext('flow');
        if ((indent !== -1 && indent < this.indentNext && line[0] !== '#') ||
            (indent === 0 &&
                (line.startsWith('---') || line.startsWith('...')) &&
                isEmpty(line[3]))) {
            // Allowing for the terminal ] or } at the same (rather than greater)
            // indent level as the initial [ or { is technically invalid, but
            // failing here would be surprising to users.
            const atFlowEndMarker = indent === this.indentNext - 1 &&
                this.flowLevel === 1 &&
                (line[0] === ']' || line[0] === '}');
            if (!atFlowEndMarker) {
                // this is an error
                this.flowLevel = 0;
                yield FLOW_END;
                return yield* this.parseLineStart();
            }
        }
        let n = 0;
        while (line[n] === ',') {
            n += yield* this.pushCount(1);
            n += yield* this.pushSpaces(true);
            this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
            case undefined:
                return 'flow';
            case '#':
                yield* this.pushCount(line.length - n);
                return 'flow';
            case '{':
            case '[':
                yield* this.pushCount(1);
                this.flowKey = false;
                this.flowLevel += 1;
                return 'flow';
            case '}':
            case ']':
                yield* this.pushCount(1);
                this.flowKey = true;
                this.flowLevel -= 1;
                return this.flowLevel ? 'flow' : 'doc';
            case '*':
                yield* this.pushUntil(isNotAnchorChar);
                return 'flow';
            case '"':
            case "'":
                this.flowKey = true;
                return yield* this.parseQuotedScalar();
            case ':': {
                const next = this.charAt(1);
                if (this.flowKey || isEmpty(next) || next === ',') {
                    this.flowKey = false;
                    yield* this.pushCount(1);
                    yield* this.pushSpaces(true);
                    return 'flow';
                }
            }
            // fallthrough
            default:
                this.flowKey = false;
                return yield* this.parsePlainScalar();
        }
    }
    *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
            while (end !== -1 && this.buffer[end + 1] === "'")
                end = this.buffer.indexOf("'", end + 2);
        }
        else {
            // double-quote
            while (end !== -1) {
                let n = 0;
                while (this.buffer[end - 1 - n] === '\\')
                    n += 1;
                if (n % 2 === 0)
                    break;
                end = this.buffer.indexOf('"', end + 1);
            }
        }
        // Only looking for newlines within the quotes
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf('\n', this.pos);
        if (nl !== -1) {
            while (nl !== -1) {
                const cs = this.continueScalar(nl + 1);
                if (cs === -1)
                    break;
                nl = qb.indexOf('\n', cs);
            }
            if (nl !== -1) {
                // this is an error caused by an unexpected unindent
                end = nl - (qb[nl - 1] === '\r' ? 2 : 1);
            }
        }
        if (end === -1) {
            if (!this.atEnd)
                return this.setNext('quoted-scalar');
            end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? 'flow' : 'doc';
    }
    *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
            const ch = this.buffer[++i];
            if (ch === '+')
                this.blockScalarKeep = true;
            else if (ch > '0' && ch <= '9')
                this.blockScalarIndent = Number(ch) - 1;
            else if (ch !== '-')
                break;
        }
        return yield* this.pushUntil(ch => isEmpty(ch) || ch === '#');
    }
    *parseBlockScalar() {
        let nl = this.pos - 1; // may be -1 if this.pos === 0
        let indent = 0;
        let ch;
        loop: for (let i = this.pos; (ch = this.buffer[i]); ++i) {
            switch (ch) {
                case ' ':
                    indent += 1;
                    break;
                case '\n':
                    nl = i;
                    indent = 0;
                    break;
                case '\r': {
                    const next = this.buffer[i + 1];
                    if (!next && !this.atEnd)
                        return this.setNext('block-scalar');
                    if (next === '\n')
                        break;
                } // fallthrough
                default:
                    break loop;
            }
        }
        if (!ch && !this.atEnd)
            return this.setNext('block-scalar');
        if (indent >= this.indentNext) {
            if (this.blockScalarIndent === -1)
                this.indentNext = indent;
            else {
                this.indentNext =
                    this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
            }
            do {
                const cs = this.continueScalar(nl + 1);
                if (cs === -1)
                    break;
                nl = this.buffer.indexOf('\n', cs);
            } while (nl !== -1);
            if (nl === -1) {
                if (!this.atEnd)
                    return this.setNext('block-scalar');
                nl = this.buffer.length;
            }
        }
        // Trailing insufficiently indented tabs are invalid.
        // To catch that during parsing, we include them in the block scalar value.
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === ' ')
            ch = this.buffer[++i];
        if (ch === '\t') {
            while (ch === '\t' || ch === ' ' || ch === '\r' || ch === '\n')
                ch = this.buffer[++i];
            nl = i - 1;
        }
        else if (!this.blockScalarKeep) {
            do {
                let i = nl - 1;
                let ch = this.buffer[i];
                if (ch === '\r')
                    ch = this.buffer[--i];
                const lastChar = i; // Drop the line if last char not more indented
                while (ch === ' ')
                    ch = this.buffer[--i];
                if (ch === '\n' && i >= this.pos && i + 1 + indent > lastChar)
                    nl = i;
                else
                    break;
            } while (true);
        }
        yield SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
    }
    *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while ((ch = this.buffer[++i])) {
            if (ch === ':') {
                const next = this.buffer[i + 1];
                if (isEmpty(next) || (inFlow && flowIndicatorChars.has(next)))
                    break;
                end = i;
            }
            else if (isEmpty(ch)) {
                let next = this.buffer[i + 1];
                if (ch === '\r') {
                    if (next === '\n') {
                        i += 1;
                        ch = '\n';
                        next = this.buffer[i + 1];
                    }
                    else
                        end = i;
                }
                if (next === '#' || (inFlow && flowIndicatorChars.has(next)))
                    break;
                if (ch === '\n') {
                    const cs = this.continueScalar(i + 1);
                    if (cs === -1)
                        break;
                    i = Math.max(i, cs - 2); // to advance, but still account for ' #'
                }
            }
            else {
                if (inFlow && flowIndicatorChars.has(ch))
                    break;
                end = i;
            }
        }
        if (!ch && !this.atEnd)
            return this.setNext('plain-scalar');
        yield SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? 'flow' : 'doc';
    }
    *pushCount(n) {
        if (n > 0) {
            yield this.buffer.substr(this.pos, n);
            this.pos += n;
            return n;
        }
        return 0;
    }
    *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
            yield s;
            this.pos += s.length;
            return s.length;
        }
        else if (allowEmpty)
            yield '';
        return 0;
    }
    *pushIndicators() {
        switch (this.charAt(0)) {
            case '!':
                return ((yield* this.pushTag()) +
                    (yield* this.pushSpaces(true)) +
                    (yield* this.pushIndicators()));
            case '&':
                return ((yield* this.pushUntil(isNotAnchorChar)) +
                    (yield* this.pushSpaces(true)) +
                    (yield* this.pushIndicators()));
            case '-': // this is an error
            case '?': // this is an error outside flow collections
            case ':': {
                const inFlow = this.flowLevel > 0;
                const ch1 = this.charAt(1);
                if (isEmpty(ch1) || (inFlow && flowIndicatorChars.has(ch1))) {
                    if (!inFlow)
                        this.indentNext = this.indentValue + 1;
                    else if (this.flowKey)
                        this.flowKey = false;
                    return ((yield* this.pushCount(1)) +
                        (yield* this.pushSpaces(true)) +
                        (yield* this.pushIndicators()));
                }
            }
        }
        return 0;
    }
    *pushTag() {
        if (this.charAt(1) === '<') {
            let i = this.pos + 2;
            let ch = this.buffer[i];
            while (!isEmpty(ch) && ch !== '>')
                ch = this.buffer[++i];
            return yield* this.pushToIndex(ch === '>' ? i + 1 : i, false);
        }
        else {
            let i = this.pos + 1;
            let ch = this.buffer[i];
            while (ch) {
                if (tagChars.has(ch))
                    ch = this.buffer[++i];
                else if (ch === '%' &&
                    hexDigits.has(this.buffer[i + 1]) &&
                    hexDigits.has(this.buffer[i + 2])) {
                    ch = this.buffer[(i += 3)];
                }
                else
                    break;
            }
            return yield* this.pushToIndex(i, false);
        }
    }
    *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === '\n')
            return yield* this.pushCount(1);
        else if (ch === '\r' && this.charAt(1) === '\n')
            return yield* this.pushCount(2);
        else
            return 0;
    }
    *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
            ch = this.buffer[++i];
        } while (ch === ' ' || (allowTabs && ch === '\t'));
        const n = i - this.pos;
        if (n > 0) {
            yield this.buffer.substr(this.pos, n);
            this.pos = i;
        }
        return n;
    }
    *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
            ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
    }
}

/**
 * Tracks newlines during parsing in order to provide an efficient API for
 * determining the one-indexed `{ line, col }` position for any offset
 * within the input.
 */
class LineCounter {
    constructor() {
        this.lineStarts = [];
        /**
         * Should be called in ascending order. Otherwise, call
         * `lineCounter.lineStarts.sort()` before calling `linePos()`.
         */
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        /**
         * Performs a binary search and returns the 1-indexed { line, col }
         * position of `offset`. If `line === 0`, `addNewLine` has never been
         * called or `offset` is before the first known newline.
         */
        this.linePos = (offset) => {
            let low = 0;
            let high = this.lineStarts.length;
            while (low < high) {
                const mid = (low + high) >> 1; // Math.floor((low + high) / 2)
                if (this.lineStarts[mid] < offset)
                    low = mid + 1;
                else
                    high = mid;
            }
            if (this.lineStarts[low] === offset)
                return { line: low + 1, col: 1 };
            if (low === 0)
                return { line: 0, col: offset };
            const start = this.lineStarts[low - 1];
            return { line: low, col: offset - start + 1 };
        };
    }
}

function includesToken(list, type) {
    for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
            return true;
    return false;
}
function findNonEmptyIndex(list) {
    for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
            case 'space':
            case 'comment':
            case 'newline':
                break;
            default:
                return i;
        }
    }
    return -1;
}
function isFlowToken(token) {
    switch (token?.type) {
        case 'alias':
        case 'scalar':
        case 'single-quoted-scalar':
        case 'double-quoted-scalar':
        case 'flow-collection':
            return true;
        default:
            return false;
    }
}
function getPrevProps(parent) {
    switch (parent.type) {
        case 'document':
            return parent.start;
        case 'block-map': {
            const it = parent.items[parent.items.length - 1];
            return it.sep ?? it.start;
        }
        case 'block-seq':
            return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
            return [];
    }
}
/** Note: May modify input array */
function getFirstKeyStartProps(prev) {
    if (prev.length === 0)
        return [];
    let i = prev.length;
    loop: while (--i >= 0) {
        switch (prev[i].type) {
            case 'doc-start':
            case 'explicit-key-ind':
            case 'map-value-ind':
            case 'seq-item-ind':
            case 'newline':
                break loop;
        }
    }
    while (prev[++i]?.type === 'space') {
        /* loop */
    }
    return prev.splice(i, prev.length);
}
function fixFlowSeqItems(fc) {
    if (fc.start.type === 'flow-seq-start') {
        for (const it of fc.items) {
            if (it.sep &&
                !it.value &&
                !includesToken(it.start, 'explicit-key-ind') &&
                !includesToken(it.sep, 'map-value-ind')) {
                if (it.key)
                    it.value = it.key;
                delete it.key;
                if (isFlowToken(it.value)) {
                    if (it.value.end)
                        Array.prototype.push.apply(it.value.end, it.sep);
                    else
                        it.value.end = it.sep;
                }
                else
                    Array.prototype.push.apply(it.start, it.sep);
                delete it.sep;
            }
        }
    }
}
/**
 * A YAML concrete syntax tree (CST) parser
 *
 * ```ts
 * const src: string = ...
 * for (const token of new Parser().parse(src)) {
 *   // token: Token
 * }
 * ```
 *
 * To use the parser with a user-provided lexer:
 *
 * ```ts
 * function* parse(source: string, lexer: Lexer) {
 *   const parser = new Parser()
 *   for (const lexeme of lexer.lex(source))
 *     yield* parser.next(lexeme)
 *   yield* parser.end()
 * }
 *
 * const src: string = ...
 * const lexer = new Lexer()
 * for (const token of parse(src, lexer)) {
 *   // token: Token
 * }
 * ```
 */
class Parser {
    /**
     * @param onNewLine - If defined, called separately with the start position of
     *   each new line (in `parse()`, including the start of input).
     */
    constructor(onNewLine) {
        /** If true, space and sequence indicators count as indentation */
        this.atNewLine = true;
        /** If true, next token is a scalar value */
        this.atScalar = false;
        /** Current indentation level */
        this.indent = 0;
        /** Current offset since the start of parsing */
        this.offset = 0;
        /** On the same line with a block map key */
        this.onKeyLine = false;
        /** Top indicates the node that's currently being built */
        this.stack = [];
        /** The source of the current token, set in parse() */
        this.source = '';
        /** The type of the current token, set in parse() */
        this.type = '';
        // Must be defined after `next()`
        this.lexer = new Lexer();
        this.onNewLine = onNewLine;
    }
    /**
     * Parse `source` as a YAML stream.
     * If `incomplete`, a part of the last line may be left as a buffer for the next call.
     *
     * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
     *
     * @returns A generator of tokens representing each directive, document, and other structure.
     */
    *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
            this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
            yield* this.next(lexeme);
        if (!incomplete)
            yield* this.end();
    }
    /**
     * Advance the parser by the `source` of one lexical token.
     */
    *next(source) {
        this.source = source;
        if (this.atScalar) {
            this.atScalar = false;
            yield* this.step();
            this.offset += source.length;
            return;
        }
        const type = tokenType(source);
        if (!type) {
            const message = `Not a YAML token: ${source}`;
            yield* this.pop({ type: 'error', offset: this.offset, message, source });
            this.offset += source.length;
        }
        else if (type === 'scalar') {
            this.atNewLine = false;
            this.atScalar = true;
            this.type = 'scalar';
        }
        else {
            this.type = type;
            yield* this.step();
            switch (type) {
                case 'newline':
                    this.atNewLine = true;
                    this.indent = 0;
                    if (this.onNewLine)
                        this.onNewLine(this.offset + source.length);
                    break;
                case 'space':
                    if (this.atNewLine && source[0] === ' ')
                        this.indent += source.length;
                    break;
                case 'explicit-key-ind':
                case 'map-value-ind':
                case 'seq-item-ind':
                    if (this.atNewLine)
                        this.indent += source.length;
                    break;
                case 'doc-mode':
                case 'flow-error-end':
                    return;
                default:
                    this.atNewLine = false;
            }
            this.offset += source.length;
        }
    }
    /** Call at end of input to push out any remaining constructions */
    *end() {
        while (this.stack.length > 0)
            yield* this.pop();
    }
    get sourceToken() {
        const st = {
            type: this.type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
        };
        return st;
    }
    *step() {
        const top = this.peek(1);
        if (this.type === 'doc-end' && (!top || top.type !== 'doc-end')) {
            while (this.stack.length > 0)
                yield* this.pop();
            this.stack.push({
                type: 'doc-end',
                offset: this.offset,
                source: this.source
            });
            return;
        }
        if (!top)
            return yield* this.stream();
        switch (top.type) {
            case 'document':
                return yield* this.document(top);
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return yield* this.scalar(top);
            case 'block-scalar':
                return yield* this.blockScalar(top);
            case 'block-map':
                return yield* this.blockMap(top);
            case 'block-seq':
                return yield* this.blockSequence(top);
            case 'flow-collection':
                return yield* this.flowCollection(top);
            case 'doc-end':
                return yield* this.documentEnd(top);
        }
        /* istanbul ignore next should not happen */
        yield* this.pop();
    }
    peek(n) {
        return this.stack[this.stack.length - n];
    }
    *pop(error) {
        const token = error ?? this.stack.pop();
        /* istanbul ignore if should not happen */
        if (!token) {
            const message = 'Tried to pop an empty stack';
            yield { type: 'error', offset: this.offset, source: '', message };
        }
        else if (this.stack.length === 0) {
            yield token;
        }
        else {
            const top = this.peek(1);
            if (token.type === 'block-scalar') {
                // Block scalars use their parent rather than header indent
                token.indent = 'indent' in top ? top.indent : 0;
            }
            else if (token.type === 'flow-collection' && top.type === 'document') {
                // Ignore all indent for top-level flow collections
                token.indent = 0;
            }
            if (token.type === 'flow-collection')
                fixFlowSeqItems(token);
            switch (top.type) {
                case 'document':
                    top.value = token;
                    break;
                case 'block-scalar':
                    top.props.push(token); // error
                    break;
                case 'block-map': {
                    const it = top.items[top.items.length - 1];
                    if (it.value) {
                        top.items.push({ start: [], key: token, sep: [] });
                        this.onKeyLine = true;
                        return;
                    }
                    else if (it.sep) {
                        it.value = token;
                    }
                    else {
                        Object.assign(it, { key: token, sep: [] });
                        this.onKeyLine = !it.explicitKey;
                        return;
                    }
                    break;
                }
                case 'block-seq': {
                    const it = top.items[top.items.length - 1];
                    if (it.value)
                        top.items.push({ start: [], value: token });
                    else
                        it.value = token;
                    break;
                }
                case 'flow-collection': {
                    const it = top.items[top.items.length - 1];
                    if (!it || it.value)
                        top.items.push({ start: [], key: token, sep: [] });
                    else if (it.sep)
                        it.value = token;
                    else
                        Object.assign(it, { key: token, sep: [] });
                    return;
                }
                /* istanbul ignore next should not happen */
                default:
                    yield* this.pop();
                    yield* this.pop(token);
            }
            if ((top.type === 'document' ||
                top.type === 'block-map' ||
                top.type === 'block-seq') &&
                (token.type === 'block-map' || token.type === 'block-seq')) {
                const last = token.items[token.items.length - 1];
                if (last &&
                    !last.sep &&
                    !last.value &&
                    last.start.length > 0 &&
                    findNonEmptyIndex(last.start) === -1 &&
                    (token.indent === 0 ||
                        last.start.every(st => st.type !== 'comment' || st.indent < token.indent))) {
                    if (top.type === 'document')
                        top.end = last.start;
                    else
                        top.items.push({ start: last.start });
                    token.items.splice(-1, 1);
                }
            }
        }
    }
    *stream() {
        switch (this.type) {
            case 'directive-line':
                yield { type: 'directive', offset: this.offset, source: this.source };
                return;
            case 'byte-order-mark':
            case 'space':
            case 'comment':
            case 'newline':
                yield this.sourceToken;
                return;
            case 'doc-mode':
            case 'doc-start': {
                const doc = {
                    type: 'document',
                    offset: this.offset,
                    start: []
                };
                if (this.type === 'doc-start')
                    doc.start.push(this.sourceToken);
                this.stack.push(doc);
                return;
            }
        }
        yield {
            type: 'error',
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML stream`,
            source: this.source
        };
    }
    *document(doc) {
        if (doc.value)
            return yield* this.lineEnd(doc);
        switch (this.type) {
            case 'doc-start': {
                if (findNonEmptyIndex(doc.start) !== -1) {
                    yield* this.pop();
                    yield* this.step();
                }
                else
                    doc.start.push(this.sourceToken);
                return;
            }
            case 'anchor':
            case 'tag':
            case 'space':
            case 'comment':
            case 'newline':
                doc.start.push(this.sourceToken);
                return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
            this.stack.push(bv);
        else {
            yield {
                type: 'error',
                offset: this.offset,
                message: `Unexpected ${this.type} token in YAML document`,
                source: this.source
            };
        }
    }
    *scalar(scalar) {
        if (this.type === 'map-value-ind') {
            const prev = getPrevProps(this.peek(2));
            const start = getFirstKeyStartProps(prev);
            let sep;
            if (scalar.end) {
                sep = scalar.end;
                sep.push(this.sourceToken);
                delete scalar.end;
            }
            else
                sep = [this.sourceToken];
            const map = {
                type: 'block-map',
                offset: scalar.offset,
                indent: scalar.indent,
                items: [{ start, key: scalar, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
        }
        else
            yield* this.lineEnd(scalar);
    }
    *blockScalar(scalar) {
        switch (this.type) {
            case 'space':
            case 'comment':
            case 'newline':
                scalar.props.push(this.sourceToken);
                return;
            case 'scalar':
                scalar.source = this.source;
                // block-scalar source includes trailing newline
                this.atNewLine = true;
                this.indent = 0;
                if (this.onNewLine) {
                    let nl = this.source.indexOf('\n') + 1;
                    while (nl !== 0) {
                        this.onNewLine(this.offset + nl);
                        nl = this.source.indexOf('\n', nl) + 1;
                    }
                }
                yield* this.pop();
                break;
            /* istanbul ignore next should not happen */
            default:
                yield* this.pop();
                yield* this.step();
        }
    }
    *blockMap(map) {
        const it = map.items[map.items.length - 1];
        // it.sep is true-ish if pair already has key or : separator
        switch (this.type) {
            case 'newline':
                this.onKeyLine = false;
                if (it.value) {
                    const end = 'end' in it.value ? it.value.end : undefined;
                    const last = Array.isArray(end) ? end[end.length - 1] : undefined;
                    if (last?.type === 'comment')
                        end?.push(this.sourceToken);
                    else
                        map.items.push({ start: [this.sourceToken] });
                }
                else if (it.sep) {
                    it.sep.push(this.sourceToken);
                }
                else {
                    it.start.push(this.sourceToken);
                }
                return;
            case 'space':
            case 'comment':
                if (it.value) {
                    map.items.push({ start: [this.sourceToken] });
                }
                else if (it.sep) {
                    it.sep.push(this.sourceToken);
                }
                else {
                    if (this.atIndentedComment(it.start, map.indent)) {
                        const prev = map.items[map.items.length - 2];
                        const end = prev?.value?.end;
                        if (Array.isArray(end)) {
                            Array.prototype.push.apply(end, it.start);
                            end.push(this.sourceToken);
                            map.items.pop();
                            return;
                        }
                    }
                    it.start.push(this.sourceToken);
                }
                return;
        }
        if (this.indent >= map.indent) {
            const atMapIndent = !this.onKeyLine && this.indent === map.indent;
            const atNextItem = atMapIndent &&
                (it.sep || it.explicitKey) &&
                this.type !== 'seq-item-ind';
            // For empty nodes, assign newline-separated not indented empty tokens to following node
            let start = [];
            if (atNextItem && it.sep && !it.value) {
                const nl = [];
                for (let i = 0; i < it.sep.length; ++i) {
                    const st = it.sep[i];
                    switch (st.type) {
                        case 'newline':
                            nl.push(i);
                            break;
                        case 'space':
                            break;
                        case 'comment':
                            if (st.indent > map.indent)
                                nl.length = 0;
                            break;
                        default:
                            nl.length = 0;
                    }
                }
                if (nl.length >= 2)
                    start = it.sep.splice(nl[1]);
            }
            switch (this.type) {
                case 'anchor':
                case 'tag':
                    if (atNextItem || it.value) {
                        start.push(this.sourceToken);
                        map.items.push({ start });
                        this.onKeyLine = true;
                    }
                    else if (it.sep) {
                        it.sep.push(this.sourceToken);
                    }
                    else {
                        it.start.push(this.sourceToken);
                    }
                    return;
                case 'explicit-key-ind':
                    if (!it.sep && !it.explicitKey) {
                        it.start.push(this.sourceToken);
                        it.explicitKey = true;
                    }
                    else if (atNextItem || it.value) {
                        start.push(this.sourceToken);
                        map.items.push({ start, explicitKey: true });
                    }
                    else {
                        this.stack.push({
                            type: 'block-map',
                            offset: this.offset,
                            indent: this.indent,
                            items: [{ start: [this.sourceToken], explicitKey: true }]
                        });
                    }
                    this.onKeyLine = true;
                    return;
                case 'map-value-ind':
                    if (it.explicitKey) {
                        if (!it.sep) {
                            if (includesToken(it.start, 'newline')) {
                                Object.assign(it, { key: null, sep: [this.sourceToken] });
                            }
                            else {
                                const start = getFirstKeyStartProps(it.start);
                                this.stack.push({
                                    type: 'block-map',
                                    offset: this.offset,
                                    indent: this.indent,
                                    items: [{ start, key: null, sep: [this.sourceToken] }]
                                });
                            }
                        }
                        else if (it.value) {
                            map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                        }
                        else if (includesToken(it.sep, 'map-value-ind')) {
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start, key: null, sep: [this.sourceToken] }]
                            });
                        }
                        else if (isFlowToken(it.key) &&
                            !includesToken(it.sep, 'newline')) {
                            const start = getFirstKeyStartProps(it.start);
                            const key = it.key;
                            const sep = it.sep;
                            sep.push(this.sourceToken);
                            // @ts-expect-error type guard is wrong here
                            delete it.key;
                            // @ts-expect-error type guard is wrong here
                            delete it.sep;
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start, key, sep }]
                            });
                        }
                        else if (start.length > 0) {
                            // Not actually at next item
                            it.sep = it.sep.concat(start, this.sourceToken);
                        }
                        else {
                            it.sep.push(this.sourceToken);
                        }
                    }
                    else {
                        if (!it.sep) {
                            Object.assign(it, { key: null, sep: [this.sourceToken] });
                        }
                        else if (it.value || atNextItem) {
                            map.items.push({ start, key: null, sep: [this.sourceToken] });
                        }
                        else if (includesToken(it.sep, 'map-value-ind')) {
                            this.stack.push({
                                type: 'block-map',
                                offset: this.offset,
                                indent: this.indent,
                                items: [{ start: [], key: null, sep: [this.sourceToken] }]
                            });
                        }
                        else {
                            it.sep.push(this.sourceToken);
                        }
                    }
                    this.onKeyLine = true;
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    const fs = this.flowScalar(this.type);
                    if (atNextItem || it.value) {
                        map.items.push({ start, key: fs, sep: [] });
                        this.onKeyLine = true;
                    }
                    else if (it.sep) {
                        this.stack.push(fs);
                    }
                    else {
                        Object.assign(it, { key: fs, sep: [] });
                        this.onKeyLine = true;
                    }
                    return;
                }
                default: {
                    const bv = this.startBlockValue(map);
                    if (bv) {
                        if (atMapIndent && bv.type !== 'block-seq') {
                            map.items.push({ start });
                        }
                        this.stack.push(bv);
                        return;
                    }
                }
            }
        }
        yield* this.pop();
        yield* this.step();
    }
    *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
            case 'newline':
                if (it.value) {
                    const end = 'end' in it.value ? it.value.end : undefined;
                    const last = Array.isArray(end) ? end[end.length - 1] : undefined;
                    if (last?.type === 'comment')
                        end?.push(this.sourceToken);
                    else
                        seq.items.push({ start: [this.sourceToken] });
                }
                else
                    it.start.push(this.sourceToken);
                return;
            case 'space':
            case 'comment':
                if (it.value)
                    seq.items.push({ start: [this.sourceToken] });
                else {
                    if (this.atIndentedComment(it.start, seq.indent)) {
                        const prev = seq.items[seq.items.length - 2];
                        const end = prev?.value?.end;
                        if (Array.isArray(end)) {
                            Array.prototype.push.apply(end, it.start);
                            end.push(this.sourceToken);
                            seq.items.pop();
                            return;
                        }
                    }
                    it.start.push(this.sourceToken);
                }
                return;
            case 'anchor':
            case 'tag':
                if (it.value || this.indent <= seq.indent)
                    break;
                it.start.push(this.sourceToken);
                return;
            case 'seq-item-ind':
                if (this.indent !== seq.indent)
                    break;
                if (it.value || includesToken(it.start, 'seq-item-ind'))
                    seq.items.push({ start: [this.sourceToken] });
                else
                    it.start.push(this.sourceToken);
                return;
        }
        if (this.indent > seq.indent) {
            const bv = this.startBlockValue(seq);
            if (bv) {
                this.stack.push(bv);
                return;
            }
        }
        yield* this.pop();
        yield* this.step();
    }
    *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === 'flow-error-end') {
            let top;
            do {
                yield* this.pop();
                top = this.peek(1);
            } while (top && top.type === 'flow-collection');
        }
        else if (fc.end.length === 0) {
            switch (this.type) {
                case 'comma':
                case 'explicit-key-ind':
                    if (!it || it.sep)
                        fc.items.push({ start: [this.sourceToken] });
                    else
                        it.start.push(this.sourceToken);
                    return;
                case 'map-value-ind':
                    if (!it || it.value)
                        fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
                    else if (it.sep)
                        it.sep.push(this.sourceToken);
                    else
                        Object.assign(it, { key: null, sep: [this.sourceToken] });
                    return;
                case 'space':
                case 'comment':
                case 'newline':
                case 'anchor':
                case 'tag':
                    if (!it || it.value)
                        fc.items.push({ start: [this.sourceToken] });
                    else if (it.sep)
                        it.sep.push(this.sourceToken);
                    else
                        it.start.push(this.sourceToken);
                    return;
                case 'alias':
                case 'scalar':
                case 'single-quoted-scalar':
                case 'double-quoted-scalar': {
                    const fs = this.flowScalar(this.type);
                    if (!it || it.value)
                        fc.items.push({ start: [], key: fs, sep: [] });
                    else if (it.sep)
                        this.stack.push(fs);
                    else
                        Object.assign(it, { key: fs, sep: [] });
                    return;
                }
                case 'flow-map-end':
                case 'flow-seq-end':
                    fc.end.push(this.sourceToken);
                    return;
            }
            const bv = this.startBlockValue(fc);
            /* istanbul ignore else should not happen */
            if (bv)
                this.stack.push(bv);
            else {
                yield* this.pop();
                yield* this.step();
            }
        }
        else {
            const parent = this.peek(2);
            if (parent.type === 'block-map' &&
                ((this.type === 'map-value-ind' && parent.indent === fc.indent) ||
                    (this.type === 'newline' &&
                        !parent.items[parent.items.length - 1].sep))) {
                yield* this.pop();
                yield* this.step();
            }
            else if (this.type === 'map-value-ind' &&
                parent.type !== 'flow-collection') {
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                fixFlowSeqItems(fc);
                const sep = fc.end.splice(1, fc.end.length);
                sep.push(this.sourceToken);
                const map = {
                    type: 'block-map',
                    offset: fc.offset,
                    indent: fc.indent,
                    items: [{ start, key: fc, sep }]
                };
                this.onKeyLine = true;
                this.stack[this.stack.length - 1] = map;
            }
            else {
                yield* this.lineEnd(fc);
            }
        }
    }
    flowScalar(type) {
        if (this.onNewLine) {
            let nl = this.source.indexOf('\n') + 1;
            while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf('\n', nl) + 1;
            }
        }
        return {
            type,
            offset: this.offset,
            indent: this.indent,
            source: this.source
        };
    }
    startBlockValue(parent) {
        switch (this.type) {
            case 'alias':
            case 'scalar':
            case 'single-quoted-scalar':
            case 'double-quoted-scalar':
                return this.flowScalar(this.type);
            case 'block-scalar-header':
                return {
                    type: 'block-scalar',
                    offset: this.offset,
                    indent: this.indent,
                    props: [this.sourceToken],
                    source: ''
                };
            case 'flow-map-start':
            case 'flow-seq-start':
                return {
                    type: 'flow-collection',
                    offset: this.offset,
                    indent: this.indent,
                    start: this.sourceToken,
                    items: [],
                    end: []
                };
            case 'seq-item-ind':
                return {
                    type: 'block-seq',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [this.sourceToken] }]
                };
            case 'explicit-key-ind': {
                this.onKeyLine = true;
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                start.push(this.sourceToken);
                return {
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, explicitKey: true }]
                };
            }
            case 'map-value-ind': {
                this.onKeyLine = true;
                const prev = getPrevProps(parent);
                const start = getFirstKeyStartProps(prev);
                return {
                    type: 'block-map',
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                };
            }
        }
        return null;
    }
    atIndentedComment(start, indent) {
        if (this.type !== 'comment')
            return false;
        if (this.indent <= indent)
            return false;
        return start.every(st => st.type === 'newline' || st.type === 'space');
    }
    *documentEnd(docEnd) {
        if (this.type !== 'doc-mode') {
            if (docEnd.end)
                docEnd.end.push(this.sourceToken);
            else
                docEnd.end = [this.sourceToken];
            if (this.type === 'newline')
                yield* this.pop();
        }
    }
    *lineEnd(token) {
        switch (this.type) {
            case 'comma':
            case 'doc-start':
            case 'doc-end':
            case 'flow-seq-end':
            case 'flow-map-end':
            case 'map-value-ind':
                yield* this.pop();
                yield* this.step();
                break;
            case 'newline':
                this.onKeyLine = false;
            // fallthrough
            case 'space':
            case 'comment':
            default:
                // all other values are errors
                if (token.end)
                    token.end.push(this.sourceToken);
                else
                    token.end = [this.sourceToken];
                if (this.type === 'newline')
                    yield* this.pop();
        }
    }
}

function parseOptions(options) {
    const prettyErrors = options.prettyErrors !== false;
    const lineCounter = options.lineCounter || (prettyErrors && new LineCounter()) || null;
    return { lineCounter, prettyErrors };
}
/**
 * Parse the input as a stream of YAML documents.
 *
 * Documents should be separated from each other by `...` or `---` marker lines.
 *
 * @returns If an empty `docs` array is returned, it will be of type
 *   EmptyStream and contain additional stream information. In
 *   TypeScript, you should use `'empty' in docs` as a type guard for it.
 */
function parseAllDocuments(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser = new Parser(lineCounter?.addNewLine);
    const composer = new Composer(options);
    const docs = Array.from(composer.compose(parser.parse(source)));
    if (prettyErrors && lineCounter)
        for (const doc of docs) {
            doc.errors.forEach(prettifyError(source, lineCounter));
            doc.warnings.forEach(prettifyError(source, lineCounter));
        }
    if (docs.length > 0)
        return docs;
    return Object.assign([], { empty: true }, composer.streamInfo());
}
/** Parse an input string into a single YAML.Document */
function parseDocument(source, options = {}) {
    const { lineCounter, prettyErrors } = parseOptions(options);
    const parser = new Parser(lineCounter?.addNewLine);
    const composer = new Composer(options);
    // `doc` is always set by compose.end(true) at the very latest
    let doc = null;
    for (const _doc of composer.compose(parser.parse(source), true, source.length)) {
        if (!doc)
            doc = _doc;
        else if (doc.options.logLevel !== 'silent') {
            doc.errors.push(new YAMLParseError(_doc.range.slice(0, 2), 'MULTIPLE_DOCS', 'Source contains multiple documents; please use YAML.parseAllDocuments()'));
            break;
        }
    }
    if (prettyErrors && lineCounter) {
        doc.errors.forEach(prettifyError(source, lineCounter));
        doc.warnings.forEach(prettifyError(source, lineCounter));
    }
    return doc;
}
function parse(src, reviver, options) {
    let _reviver = undefined;
    if (typeof reviver === 'function') {
        _reviver = reviver;
    }
    else if (options === undefined && reviver && typeof reviver === 'object') {
        options = reviver;
    }
    const doc = parseDocument(src, options);
    if (!doc)
        return null;
    doc.warnings.forEach(warning => warn(doc.options.logLevel, warning));
    if (doc.errors.length > 0) {
        if (doc.options.logLevel !== 'silent')
            throw doc.errors[0];
        else
            doc.errors = [];
    }
    return doc.toJS(Object.assign({ reviver: _reviver }, options));
}
function stringify(value, replacer, options) {
    let _replacer = null;
    if (typeof replacer === 'function' || Array.isArray(replacer)) {
        _replacer = replacer;
    }
    else if (options === undefined && replacer) {
        options = replacer;
    }
    if (typeof options === 'string')
        options = options.length;
    if (typeof options === 'number') {
        const indent = Math.round(options);
        options = indent < 1 ? undefined : indent > 8 ? { indent: 8 } : { indent };
    }
    if (value === undefined) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
            return undefined;
    }
    if (isDocument(value) && !_replacer)
        return value.toString(options);
    return new Document(value, _replacer, options).toString(options);
}

var YAML = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Alias: Alias,
    CST: cst,
    Composer: Composer,
    Document: Document,
    Lexer: Lexer,
    LineCounter: LineCounter,
    Pair: Pair,
    Parser: Parser,
    Scalar: Scalar,
    Schema: Schema,
    YAMLError: YAMLError,
    YAMLMap: YAMLMap,
    YAMLParseError: YAMLParseError,
    YAMLSeq: YAMLSeq,
    YAMLWarning: YAMLWarning,
    isAlias: isAlias,
    isCollection: isCollection$1,
    isDocument: isDocument,
    isMap: isMap,
    isNode: isNode,
    isPair: isPair,
    isScalar: isScalar$1,
    isSeq: isSeq,
    parse: parse,
    parseAllDocuments: parseAllDocuments,
    parseDocument: parseDocument,
    stringify: stringify,
    visit: visit$1,
    visitAsync: visitAsync
});

/**
 * Reads a test schema from a YAML file.
 *
 * @param schemaFile - The path of the YAML schema file.
 * @returns The parsed test schema.
 */
function readYamlSchema(schemaFile) {
    const data = readFileSync(schemaFile, "utf-8");
    return YAML.parse(data);
}

/**
 * Generates C++ main function code from a test schema.
 *
 * @param schema - The test schema.
 * @returns An object containing the generated C++ code and a set of required headers.
 */
function generateCppMainCode(schema) {
    return {
        code: [
            `int main() {`,
            `  int failures{0};`,
            `  for (int i{0}; i < ${schema.cases.length}; ++i) {`,
            `    std::cout << "testing " << test_cases[i].name << "...\\n";`,
            `    Solution s{};`,
            (() => {
                const params = schema.cpp.function.inputs
                    .map((_, i) => `test_cases[i].inputs.arg${i}`)
                    .join(", ");
                return `    const ${schema.cpp.function.output.type} output{s.${schema.cpp.function.name}(${params})};`;
            })(),
            `    if (output != test_cases[i].output) {`,
            `      std::cerr << "failed to test " << test_cases[i].name << ":\\n";`,
            `      std::cerr << ".  output: " << output << "\\n";`,
            `      std::cerr << ".  expected: " << test_cases[i].output << "\\n\\n";`,
            `      ++failures;`,
            `    }`,
            `  }`,
            `  if (failures > 0) std::cerr << failures << " test cases have failed\\n";`,
            `  return failures;`,
            `}`,
            ``,
        ].join("\n"),
        headers: new Set(["iostream"]),
    };
}

const cppVectorOstreamOperatorCode = [
    `template <typename T>`,
    `std::ostream& operator<<(std::ostream& out, const std::vector<T>& arr) {`,
    `  out << '{';`,
    `  if (arr.size() > 0) {`,
    `    out << arr[0];`,
    `    for (std::size_t i{1}; i < arr.size(); ++i) {`,
    `      out << ", " << arr[i];`,
    `    }`,
    `  }`,
    `  return out << '}';`,
    `}`,
    ``,
].join("\n");
/**
 * Generates C++ utility functions code from a test schema.
 *
 * @param schema - The test schema.
 * @returns The generated C++ utility functions code.
 */
function generateCppUtilityCode(schema) {
    if (schema.cpp.function.output.type.match(/^std::vector<.*>$/)) {
        return cppVectorOstreamOperatorCode;
    }
    return "";
}

/**
 * Formats a value to a string in C++ format.
 *
 * @param value - The value to format.
 * @param type - The target C++ type.
 * @returns A string representation of the value in C++ format.
 */
function formatCpp(value, type) {
    if (type === "std::string") {
        return `"${value}"`;
    }
    if (type.match(/^std::vector<.*>$/)) {
        const subtype = type.substring(12, type.length - 1);
        return `{${value.map((v) => formatCpp(v, subtype)).join(", ")}}`;
    }
    return `${value}`;
}

/**
 * Generates C++ test case code from a test schema.
 *
 * @param schema - The test schema.
 * @returns The generated C++ test case code.
 */
function generateCppTestCaseCode(schema) {
    return [
        `struct TestCase {`,
        `  const char* name;`,
        `  struct {`,
        ...schema.cpp.function.inputs.map((input, i) => `    ${input.type} arg${i};`),
        `  } inputs;`,
        `  ${schema.cpp.function.output.type} output;`,
        `};`,
        ``,
        `TestCase test_cases[${schema.cases.length}]{`,
        schema.cases
            .map((c) => [
            `  {`,
            `    "${c.name}",`,
            `    .inputs{`,
            schema.cpp.function.inputs
                .map((input) => `      ${formatCpp(c.inputs[input.value], input.type)}`)
                .join(",\n"),
            `    },`,
            `    ${formatCpp(c.output, schema.cpp.function.output.type)}`,
            `  }`,
        ].join("\n"))
            .join(",\n"),
        `};`,
        ``,
    ].join("\n");
}

/**
 * Generates a C++ test file from a test schema.
 *
 * @param schema - The test schema.
 * @param solutionFile - The path of the C++ solution file.
 * @param outFile - The path of the C++ test file output.
 */
function generateCppTest(schema, solutionFile, outFile) {
    const main = generateCppMainCode(schema);
    mkdirSync(path.dirname(outFile), { recursive: true });
    writeFileSync(outFile, [
        `#include "${path.relative(path.dirname(outFile), solutionFile)}"`,
        ``,
        [...main.headers]
            .sort()
            .map((header) => `#include <${header}>`)
            .join("\n"),
        ``,
        generateCppTestCaseCode(schema),
        generateCppUtilityCode(schema),
        main.code,
    ].join("\n"));
}

/**
 * Compiles a C++ test file using Clang.
 *
 * @param testFile - The path of the C++ test file to compile.
 * @param outFile - The path of the compiled executable output.
 */
function compileCppTest(testFile, outFile) {
    mkdirSync(path.dirname(outFile), { recursive: true });
    execSync(`clang++ --std=c++20 -O2 ${testFile} -o ${outFile}`, {
        stdio: "pipe",
    });
}

/**
 * Runs a C++ test executable.
 *
 * @param testExec - The path of the C++ test executable to run.
 */
function runCppTest(testExec) {
    const cmd = process.platform === "win32" ? `start ${testExec}` : testExec;
    execSync(cmd, { stdio: "pipe" });
}

/**
 * Creates a list of tasks for testing the C++ solution of a LeetCode problem.
 *
 * This function creates a list of Listr tasks for compiling a C++ solution file into a test executable
 * and then running the executable for testing the solution.
 *
 * @param solutionFile - The path of the C++ solution file.
 * @returns A list of Listr tasks.
 */
function createTestCppSolutionTasks(solutionFile) {
    const schemaFile = path.join(path.dirname(solutionFile), "test.yaml");
    const testFile = path.join("build", path.dirname(solutionFile), "test.cpp");
    const testExec = path.join(path.dirname(testFile), "test");
    return [
        {
            title: `Loading ${schemaFile}...`,
            task: (ctx) => {
                ctx.schema = readYamlSchema(schemaFile);
            },
        },
        {
            title: `Generating ${testFile}...`,
            task: (ctx) => generateCppTest(ctx.schema, solutionFile, testFile),
        },
        {
            title: `Compiling ${testFile}...`,
            task: () => compileCppTest(testFile, testExec),
        },
        {
            title: `Running ${testExec}...`,
            task: () => runCppTest(testExec),
        },
    ];
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var eventemitter3 = {exports: {}};

var hasRequiredEventemitter3;

function requireEventemitter3 () {
	if (hasRequiredEventemitter3) return eventemitter3.exports;
	hasRequiredEventemitter3 = 1;
	(function (module) {

		var has = Object.prototype.hasOwnProperty
		  , prefix = '~';

		/**
		 * Constructor to create a storage for our `EE` objects.
		 * An `Events` instance is a plain object whose properties are event names.
		 *
		 * @constructor
		 * @private
		 */
		function Events() {}

		//
		// We try to not inherit from `Object.prototype`. In some engines creating an
		// instance in this way is faster than calling `Object.create(null)` directly.
		// If `Object.create(null)` is not supported we prefix the event names with a
		// character to make sure that the built-in object properties are not
		// overridden or used as an attack vector.
		//
		if (Object.create) {
		  Events.prototype = Object.create(null);

		  //
		  // This hack is needed because the `__proto__` property is still inherited in
		  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
		  //
		  if (!new Events().__proto__) prefix = false;
		}

		/**
		 * Representation of a single event listener.
		 *
		 * @param {Function} fn The listener function.
		 * @param {*} context The context to invoke the listener with.
		 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
		 * @constructor
		 * @private
		 */
		function EE(fn, context, once) {
		  this.fn = fn;
		  this.context = context;
		  this.once = once || false;
		}

		/**
		 * Add a listener for a given event.
		 *
		 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} context The context to invoke the listener with.
		 * @param {Boolean} once Specify if the listener is a one-time listener.
		 * @returns {EventEmitter}
		 * @private
		 */
		function addListener(emitter, event, fn, context, once) {
		  if (typeof fn !== 'function') {
		    throw new TypeError('The listener must be a function');
		  }

		  var listener = new EE(fn, context || emitter, once)
		    , evt = prefix ? prefix + event : event;

		  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
		  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
		  else emitter._events[evt] = [emitter._events[evt], listener];

		  return emitter;
		}

		/**
		 * Clear event by name.
		 *
		 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
		 * @param {(String|Symbol)} evt The Event name.
		 * @private
		 */
		function clearEvent(emitter, evt) {
		  if (--emitter._eventsCount === 0) emitter._events = new Events();
		  else delete emitter._events[evt];
		}

		/**
		 * Minimal `EventEmitter` interface that is molded against the Node.js
		 * `EventEmitter` interface.
		 *
		 * @constructor
		 * @public
		 */
		function EventEmitter() {
		  this._events = new Events();
		  this._eventsCount = 0;
		}

		/**
		 * Return an array listing the events for which the emitter has registered
		 * listeners.
		 *
		 * @returns {Array}
		 * @public
		 */
		EventEmitter.prototype.eventNames = function eventNames() {
		  var names = []
		    , events
		    , name;

		  if (this._eventsCount === 0) return names;

		  for (name in (events = this._events)) {
		    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		  }

		  if (Object.getOwnPropertySymbols) {
		    return names.concat(Object.getOwnPropertySymbols(events));
		  }

		  return names;
		};

		/**
		 * Return the listeners registered for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Array} The registered listeners.
		 * @public
		 */
		EventEmitter.prototype.listeners = function listeners(event) {
		  var evt = prefix ? prefix + event : event
		    , handlers = this._events[evt];

		  if (!handlers) return [];
		  if (handlers.fn) return [handlers.fn];

		  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
		    ee[i] = handlers[i].fn;
		  }

		  return ee;
		};

		/**
		 * Return the number of listeners listening to a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Number} The number of listeners.
		 * @public
		 */
		EventEmitter.prototype.listenerCount = function listenerCount(event) {
		  var evt = prefix ? prefix + event : event
		    , listeners = this._events[evt];

		  if (!listeners) return 0;
		  if (listeners.fn) return 1;
		  return listeners.length;
		};

		/**
		 * Calls each of the listeners registered for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Boolean} `true` if the event had listeners, else `false`.
		 * @public
		 */
		EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		  var evt = prefix ? prefix + event : event;

		  if (!this._events[evt]) return false;

		  var listeners = this._events[evt]
		    , len = arguments.length
		    , args
		    , i;

		  if (listeners.fn) {
		    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

		    switch (len) {
		      case 1: return listeners.fn.call(listeners.context), true;
		      case 2: return listeners.fn.call(listeners.context, a1), true;
		      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
		      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
		      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
		      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
		    }

		    for (i = 1, args = new Array(len -1); i < len; i++) {
		      args[i - 1] = arguments[i];
		    }

		    listeners.fn.apply(listeners.context, args);
		  } else {
		    var length = listeners.length
		      , j;

		    for (i = 0; i < length; i++) {
		      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

		      switch (len) {
		        case 1: listeners[i].fn.call(listeners[i].context); break;
		        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
		        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
		        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
		        default:
		          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
		            args[j - 1] = arguments[j];
		          }

		          listeners[i].fn.apply(listeners[i].context, args);
		      }
		    }
		  }

		  return true;
		};

		/**
		 * Add a listener for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.on = function on(event, fn, context) {
		  return addListener(this, event, fn, context, false);
		};

		/**
		 * Add a one-time listener for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.once = function once(event, fn, context) {
		  return addListener(this, event, fn, context, true);
		};

		/**
		 * Remove the listeners of a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn Only remove the listeners that match this function.
		 * @param {*} context Only remove the listeners that have this context.
		 * @param {Boolean} once Only remove one-time listeners.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		  var evt = prefix ? prefix + event : event;

		  if (!this._events[evt]) return this;
		  if (!fn) {
		    clearEvent(this, evt);
		    return this;
		  }

		  var listeners = this._events[evt];

		  if (listeners.fn) {
		    if (
		      listeners.fn === fn &&
		      (!once || listeners.once) &&
		      (!context || listeners.context === context)
		    ) {
		      clearEvent(this, evt);
		    }
		  } else {
		    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
		      if (
		        listeners[i].fn !== fn ||
		        (once && !listeners[i].once) ||
		        (context && listeners[i].context !== context)
		      ) {
		        events.push(listeners[i]);
		      }
		    }

		    //
		    // Reset the array, or remove it completely if we have no more listeners.
		    //
		    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
		    else clearEvent(this, evt);
		  }

		  return this;
		};

		/**
		 * Remove all listeners, or those of the specified event.
		 *
		 * @param {(String|Symbol)} [event] The event name.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		  var evt;

		  if (event) {
		    evt = prefix ? prefix + event : event;
		    if (this._events[evt]) clearEvent(this, evt);
		  } else {
		    this._events = new Events();
		    this._eventsCount = 0;
		  }

		  return this;
		};

		//
		// Alias methods names because people roll like that.
		//
		EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
		EventEmitter.prototype.addListener = EventEmitter.prototype.on;

		//
		// Expose the prefix.
		//
		EventEmitter.prefixed = prefix;

		//
		// Allow `EventEmitter` to be imported as module namespace.
		//
		EventEmitter.EventEmitter = EventEmitter;

		//
		// Expose the module.
		//
		{
		  module.exports = EventEmitter;
		} 
	} (eventemitter3));
	return eventemitter3.exports;
}

var eventemitter3Exports = requireEventemitter3();
var EventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

const {
  env = {},
  argv = [],
  platform = "",
} = typeof process === "undefined" ? {} : process;

const isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
const isForced = "FORCE_COLOR" in env || argv.includes("--color");
const isWindows = platform === "win32";
const isDumbTerminal = env.TERM === "dumb";

const isCompatibleTerminal =
  tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;

const isCI =
  "CI" in env &&
  ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env);

const isColorSupported =
  !isDisabled &&
  (isForced || (isWindows && !isDumbTerminal) || isCompatibleTerminal || isCI);

const replaceClose = (
  index,
  string,
  close,
  replace,
  head = string.substring(0, index) + replace,
  tail = string.substring(index + close.length),
  next = tail.indexOf(close)
) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));

const clearBleed = (index, string, open, close, replace) =>
  index < 0
    ? open + string + close
    : open + replaceClose(index, string, close, replace) + close;

const filterEmpty =
  (open, close, replace = open, at = open.length + 1) =>
  (string) =>
    string || !(string === "" || string === undefined)
      ? clearBleed(
          ("" + string).indexOf(close, at),
          string,
          open,
          close,
          replace
        )
      : "";

const init = (open, close, replace) =>
  filterEmpty(`\x1b[${open}m`, `\x1b[${close}m`, replace);

const colors = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1b[22m\x1b[1m"),
  dim: init(2, 22, "\x1b[22m\x1b[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49),
};

const createColors = ({ useColor = isColorSupported } = {}) =>
  useColor
    ? colors
    : Object.keys(colors).reduce(
        (colors, key) => ({ ...colors, [key]: String }),
        {}
      );

const {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
} = createColors();

var rfdc_1;
var hasRequiredRfdc;

function requireRfdc () {
	if (hasRequiredRfdc) return rfdc_1;
	hasRequiredRfdc = 1;
	rfdc_1 = rfdc;

	function copyBuffer (cur) {
	  if (cur instanceof Buffer) {
	    return Buffer.from(cur)
	  }

	  return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length)
	}

	function rfdc (opts) {
	  opts = opts || {};
	  if (opts.circles) return rfdcCircles(opts)

	  const constructorHandlers = new Map();
	  constructorHandlers.set(Date, (o) => new Date(o));
	  constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
	  constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
	  if (opts.constructorHandlers) {
	    for (const handler of opts.constructorHandlers) {
	      constructorHandlers.set(handler[0], handler[1]);
	    }
	  }

	  let handler = null;

	  return opts.proto ? cloneProto : clone

	  function cloneArray (a, fn) {
	    const keys = Object.keys(a);
	    const a2 = new Array(keys.length);
	    for (let i = 0; i < keys.length; i++) {
	      const k = keys[i];
	      const cur = a[k];
	      if (typeof cur !== 'object' || cur === null) {
	        a2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        a2[k] = handler(cur, fn);
	      } else if (ArrayBuffer.isView(cur)) {
	        a2[k] = copyBuffer(cur);
	      } else {
	        a2[k] = fn(cur);
	      }
	    }
	    return a2
	  }

	  function clone (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, clone)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, clone)
	    }
	    const o2 = {};
	    for (const k in o) {
	      if (Object.hasOwnProperty.call(o, k) === false) continue
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, clone);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        o2[k] = clone(cur);
	      }
	    }
	    return o2
	  }

	  function cloneProto (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, cloneProto)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, cloneProto)
	    }
	    const o2 = {};
	    for (const k in o) {
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, cloneProto);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        o2[k] = cloneProto(cur);
	      }
	    }
	    return o2
	  }
	}

	function rfdcCircles (opts) {
	  const refs = [];
	  const refsNew = [];

	  const constructorHandlers = new Map();
	  constructorHandlers.set(Date, (o) => new Date(o));
	  constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
	  constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
	  if (opts.constructorHandlers) {
	    for (const handler of opts.constructorHandlers) {
	      constructorHandlers.set(handler[0], handler[1]);
	    }
	  }

	  let handler = null;
	  return opts.proto ? cloneProto : clone

	  function cloneArray (a, fn) {
	    const keys = Object.keys(a);
	    const a2 = new Array(keys.length);
	    for (let i = 0; i < keys.length; i++) {
	      const k = keys[i];
	      const cur = a[k];
	      if (typeof cur !== 'object' || cur === null) {
	        a2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        a2[k] = handler(cur, fn);
	      } else if (ArrayBuffer.isView(cur)) {
	        a2[k] = copyBuffer(cur);
	      } else {
	        const index = refs.indexOf(cur);
	        if (index !== -1) {
	          a2[k] = refsNew[index];
	        } else {
	          a2[k] = fn(cur);
	        }
	      }
	    }
	    return a2
	  }

	  function clone (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, clone)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, clone)
	    }
	    const o2 = {};
	    refs.push(o);
	    refsNew.push(o2);
	    for (const k in o) {
	      if (Object.hasOwnProperty.call(o, k) === false) continue
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, clone);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        const i = refs.indexOf(cur);
	        if (i !== -1) {
	          o2[k] = refsNew[i];
	        } else {
	          o2[k] = clone(cur);
	        }
	      }
	    }
	    refs.pop();
	    refsNew.pop();
	    return o2
	  }

	  function cloneProto (o) {
	    if (typeof o !== 'object' || o === null) return o
	    if (Array.isArray(o)) return cloneArray(o, cloneProto)
	    if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
	      return handler(o, cloneProto)
	    }
	    const o2 = {};
	    refs.push(o);
	    refsNew.push(o2);
	    for (const k in o) {
	      const cur = o[k];
	      if (typeof cur !== 'object' || cur === null) {
	        o2[k] = cur;
	      } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
	        o2[k] = handler(cur, cloneProto);
	      } else if (ArrayBuffer.isView(cur)) {
	        o2[k] = copyBuffer(cur);
	      } else {
	        const i = refs.indexOf(cur);
	        if (i !== -1) {
	          o2[k] = refsNew[i];
	        } else {
	          o2[k] = cloneProto(cur);
	        }
	      }
	    }
	    refs.pop();
	    refsNew.pop();
	    return o2
	  }
	}
	return rfdc_1;
}

var rfdcExports = requireRfdc();
var rfdc = /*@__PURE__*/getDefaultExportFromCjs(rfdcExports);

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/constants/ansi-escape-codes.constants.ts
var ANSI_ESCAPE = "\x1B[";
var ANSI_ESCAPE_CODES = {
  CURSOR_HIDE: ANSI_ESCAPE + "?25l",
  CURSOR_SHOW: ANSI_ESCAPE + "?25h"
};

// src/constants/listr-task-state.constants.ts
var ListrTaskState = /* @__PURE__ */ ((ListrTaskState2) => {
  ListrTaskState2["WAITING"] = "WAITING";
  ListrTaskState2["STARTED"] = "STARTED";
  ListrTaskState2["COMPLETED"] = "COMPLETED";
  ListrTaskState2["FAILED"] = "FAILED";
  ListrTaskState2["SKIPPED"] = "SKIPPED";
  ListrTaskState2["ROLLING_BACK"] = "ROLLING_BACK";
  ListrTaskState2["ROLLED_BACK"] = "ROLLED_BACK";
  ListrTaskState2["RETRY"] = "RETRY";
  ListrTaskState2["PAUSED"] = "PAUSED";
  ListrTaskState2["PROMPT"] = "PROMPT";
  ListrTaskState2["PROMPT_COMPLETED"] = "PROMPT_COMPLETED";
  ListrTaskState2["PROMPT_FAILED"] = "PROMPT_FAILED";
  return ListrTaskState2;
})(ListrTaskState || {});
var EventManager = class {
  static {
    __name(this, "EventManager");
  }
  emitter = new EventEmitter();
  emit(dispatch, args) {
    this.emitter.emit(dispatch, args);
  }
  on(dispatch, handler) {
    this.emitter.addListener(dispatch, handler);
  }
  once(dispatch, handler) {
    this.emitter.once(dispatch, handler);
  }
  off(dispatch, handler) {
    this.emitter.off(dispatch, handler);
  }
  complete() {
    this.emitter.removeAllListeners();
  }
};

// src/interfaces/event.interface.ts
(class {
  static {
    __name(this, "BaseEventMap");
  }
});

// src/utils/environment/is-observable.ts
function isObservable(obj) {
  return !!obj && typeof obj === "object" && typeof obj.subscribe === "function";
}
__name(isObservable, "isObservable");

// src/utils/environment/is-readable.ts
function isReadable(obj) {
  return !!obj && typeof obj === "object" && obj.readable === true && typeof obj.read === "function" && typeof obj.on === "function";
}
__name(isReadable, "isReadable");

// src/utils/environment/is-unicode-supported.ts
function isUnicodeSupported() {
  return !!process.env["LISTR_FORCE_UNICODE" /* FORCE_UNICODE */] || process.platform !== "win32" || !!process.env.CI || !!process.env.WT_SESSION || process.env.TERM_PROGRAM === "vscode" || process.env.TERM === "xterm-256color" || process.env.TERM === "alacritty";
}
__name(isUnicodeSupported, "isUnicodeSupported");

// src/utils/format/cleanse-ansi.constants.ts
var CLEAR_LINE_REGEX = "(?:\\u001b|\\u009b)\\[[\\=><~/#&.:=?%@~_-]*[0-9]*[\\a-ln-tqyz=><~/#&.:=?%@~_-]+";
var BELL_REGEX = /\u0007/;

// src/utils/format/cleanse-ansi.ts
function cleanseAnsi(chunk) {
  return String(chunk).replace(new RegExp(CLEAR_LINE_REGEX, "gmi"), "").replace(new RegExp(BELL_REGEX, "gmi"), "").trim();
}
__name(cleanseAnsi, "cleanseAnsi");
var color = createColors();

// src/utils/format/indent.ts
function indent(string, count) {
  return string.replace(/^(?!\s*$)/gm, " ".repeat(count));
}
__name(indent, "indent");

// src/utils/format/figures.ts
var FIGURES_MAIN = {
  warning: "\u26A0",
  cross: "\u2716",
  arrowDown: "\u2193",
  tick: "\u2714",
  arrowRight: "\u2192",
  pointer: "\u276F",
  checkboxOn: "\u2612",
  arrowLeft: "\u2190",
  squareSmallFilled: "\u25FC",
  pointerSmall: "\u203A"
};
var FIGURES_FALLBACK = {
  ...FIGURES_MAIN,
  warning: "\u203C",
  cross: "\xD7",
  tick: "\u221A",
  pointer: ">",
  squareSmallFilled: "\u25A0"
};
var figures = isUnicodeSupported() ? FIGURES_MAIN : FIGURES_FALLBACK;
function splat(message, ...splat2) {
  return format(String(message), ...splat2);
}
__name(splat, "splat");
var LISTR_LOGGER_STYLE = {
  icon: {
    ["STARTED" /* STARTED */]: figures.pointer,
    ["FAILED" /* FAILED */]: figures.cross,
    ["SKIPPED" /* SKIPPED */]: figures.arrowDown,
    ["COMPLETED" /* COMPLETED */]: figures.tick,
    ["OUTPUT" /* OUTPUT */]: figures.pointerSmall,
    ["TITLE" /* TITLE */]: figures.arrowRight,
    ["RETRY" /* RETRY */]: figures.warning,
    ["ROLLBACK" /* ROLLBACK */]: figures.arrowLeft,
    ["PAUSED" /* PAUSED */]: figures.squareSmallFilled
  },
  color: {
    ["STARTED" /* STARTED */]: color.yellow,
    ["FAILED" /* FAILED */]: color.red,
    ["SKIPPED" /* SKIPPED */]: color.yellow,
    ["COMPLETED" /* COMPLETED */]: color.green,
    ["RETRY" /* RETRY */]: color.yellowBright,
    ["ROLLBACK" /* ROLLBACK */]: color.redBright,
    ["PAUSED" /* PAUSED */]: color.yellowBright
  }
};
var LISTR_LOGGER_STDERR_LEVELS = ["RETRY" /* RETRY */, "ROLLBACK" /* ROLLBACK */, "FAILED" /* FAILED */];
var ListrLogger = class {
  constructor(options) {
    this.options = options;
    this.options = {
      useIcons: true,
      toStderr: [],
      ...options ?? {}
    };
    this.options.fields ??= {};
    this.options.fields.prefix ??= [];
    this.options.fields.suffix ??= [];
    this.process = this.options.processOutput ?? new ProcessOutput();
  }
  static {
    __name(this, "ListrLogger");
  }
  process;
  log(level, message, options) {
    const output = this.format(level, message, options);
    if (this.options.toStderr.includes(level)) {
      this.process.toStderr(output);
      return;
    }
    this.process.toStdout(output);
  }
  toStdout(message, options, eol = true) {
    this.process.toStdout(this.format(null, message, options), eol);
  }
  toStderr(message, options, eol = true) {
    this.process.toStderr(this.format(null, message, options), eol);
  }
  wrap(message, options) {
    if (!message) {
      return message;
    }
    return this.applyFormat(`[${message}]`, options);
  }
  splat(...args) {
    const message = args.shift() ?? "";
    return args.length === 0 ? message : splat(message, args);
  }
  suffix(message, ...suffixes) {
    suffixes.filter(Boolean).forEach((suffix) => {
      message += this.spacing(message);
      if (typeof suffix === "string") {
        message += this.wrap(suffix);
      } else if (typeof suffix === "object") {
        suffix.args ??= [];
        if (typeof suffix.condition === "function" ? !suffix.condition(...suffix.args) : !(suffix.condition ?? true)) {
          return message;
        }
        message += this.wrap(typeof suffix.field === "function" ? suffix.field(...suffix.args) : suffix.field, {
          format: suffix?.format(...suffix.args)
        });
      }
    });
    return message;
  }
  prefix(message, ...prefixes) {
    prefixes.filter(Boolean).forEach((prefix) => {
      message = this.spacing(message) + message;
      if (typeof prefix === "string") {
        message = this.wrap(prefix) + message;
      } else if (typeof prefix === "object") {
        prefix.args ??= [];
        if (typeof prefix.condition === "function" ? !prefix.condition(...prefix.args) : !(prefix.condition ?? true)) {
          return message;
        }
        message = this.wrap(typeof prefix.field === "function" ? prefix.field(...prefix.args) : prefix.field, {
          format: prefix?.format()
        }) + message;
      }
    });
    return message;
  }
  fields(message, options) {
    if (this.options?.fields?.prefix) {
      message = this.prefix(message, ...this.options.fields.prefix);
    }
    if (options?.prefix) {
      message = this.prefix(message, ...options.prefix);
    }
    if (options?.suffix) {
      message = this.suffix(message, ...options.suffix);
    }
    if (this.options?.fields?.suffix) {
      message = this.suffix(message, ...this.options.fields.suffix);
    }
    return message;
  }
  icon(level, icon) {
    if (!level) {
      return null;
    }
    if (!icon) {
      const i = this.options.icon?.[level];
      icon = typeof i === "function" ? i() : i;
    }
    const coloring = this.options.color?.[level];
    if (icon && coloring) {
      icon = coloring(icon);
    }
    return icon;
  }
  format(level, message, options) {
    if (!Array.isArray(message)) {
      message = [message];
    }
    message = this.splat(message.shift(), ...message).toString().split(EOL).filter((m) => !m || m.trim() !== "").map((m) => {
      return this.style(
        level,
        this.fields(m, {
          prefix: Array.isArray(options?.prefix) ? options.prefix : [options?.prefix],
          suffix: Array.isArray(options?.suffix) ? options.suffix : [options?.suffix]
        })
      );
    }).join(EOL);
    return message;
  }
  style(level, message) {
    if (!level || !message) {
      return message;
    }
    const icon = this.icon(level, !this.options.useIcons && this.wrap(level));
    if (icon) {
      message = icon + " " + message;
    }
    return message;
  }
  applyFormat(message, options) {
    if (options?.format) {
      return options.format(message);
    }
    return message;
  }
  spacing(message) {
    return typeof message === "undefined" || message.trim() === "" ? "" : " ";
  }
};
var ProcessOutputBuffer = class {
  constructor(options) {
    this.options = options;
  }
  static {
    __name(this, "ProcessOutputBuffer");
  }
  buffer = [];
  decoder = new StringDecoder$1();
  get all() {
    return this.buffer;
  }
  get last() {
    return this.buffer.at(-1);
  }
  get length() {
    return this.buffer.length;
  }
  write(data, ...args) {
    const callback = args[args.length - 1];
    this.buffer.push({
      time: Date.now(),
      stream: this.options?.stream,
      entry: this.decoder.write(typeof data === "string" ? Buffer.from(data, typeof args[0] === "string" ? args[0] : void 0) : Buffer.from(data))
    });
    if (this.options?.limit) {
      this.buffer = this.buffer.slice(-this.options.limit);
    }
    if (typeof callback === "function") {
      callback();
    }
    return true;
  }
  reset() {
    this.buffer = [];
  }
};

// src/utils/process-output/process-output-stream.ts
var ProcessOutputStream = class {
  constructor(stream) {
    this.stream = stream;
    this.method = stream.write;
    this.buffer = new ProcessOutputBuffer({ stream });
  }
  static {
    __name(this, "ProcessOutputStream");
  }
  method;
  buffer;
  get out() {
    return Object.assign({}, this.stream, {
      write: this.write.bind(this)
    });
  }
  hijack() {
    this.stream.write = this.buffer.write.bind(this.buffer);
  }
  release() {
    this.stream.write = this.method;
    const buffer = [...this.buffer.all];
    this.buffer.reset();
    return buffer;
  }
  write(...args) {
    return this.method.apply(this.stream, args);
  }
};
var ProcessOutput = class {
  constructor(stdout, stderr, options) {
    this.options = options;
    this.stream = {
      stdout: new ProcessOutputStream(stdout ?? process.stdout),
      stderr: new ProcessOutputStream(stderr ?? process.stderr)
    };
    this.options = {
      dump: ["stdout", "stderr"],
      leaveEmptyLine: true,
      ...options
    };
  }
  static {
    __name(this, "ProcessOutput");
  }
  stream;
  active;
  get stdout() {
    return this.stream.stdout.out;
  }
  get stderr() {
    return this.stream.stderr.out;
  }
  hijack() {
    if (this.active) {
      throw new Error("ProcessOutput has been already hijacked!");
    }
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_HIDE);
    Object.values(this.stream).forEach((stream) => stream.hijack());
    this.active = true;
  }
  release() {
    const output = Object.entries(this.stream).map(([name, stream]) => ({ name, buffer: stream.release() })).filter((output2) => this.options.dump.includes(output2.name)).flatMap((output2) => output2.buffer).sort((a, b) => a.time - b.time).map((message) => {
      return {
        ...message,
        entry: cleanseAnsi(message.entry)
      };
    }).filter((message) => message.entry);
    if (output.length > 0) {
      if (this.options.leaveEmptyLine) {
        this.stdout.write(EOL);
      }
      output.forEach((message) => {
        const stream = message.stream ?? this.stdout;
        stream.write(message.entry + EOL);
      });
    }
    this.stream.stdout.write(ANSI_ESCAPE_CODES.CURSOR_SHOW);
    this.active = false;
  }
  toStdout(buffer, eol = true) {
    if (eol) {
      buffer = buffer + EOL;
    }
    return this.stream.stdout.write(buffer);
  }
  toStderr(buffer, eol = true) {
    if (eol) {
      buffer = buffer + EOL;
    }
    return this.stream.stderr.write(buffer);
  }
};
function createWritable(cb) {
  const writable = new Writable();
  writable.rows = Infinity;
  writable.columns = Infinity;
  writable.write = (chunk) => {
    cb(chunk.toString());
    return true;
  };
  return writable;
}
__name(createWritable, "createWritable");

// src/utils/prompts/adapter.ts
(class {
  constructor(task, wrapper) {
    this.task = task;
    this.wrapper = wrapper;
  }
  static {
    __name(this, "ListrPromptAdapter");
  }
  state;
  reportStarted() {
    this.state = this.task.state;
    if (this.task.prompt) {
      throw new PromptError("There is already an active prompt attached to this task which may not be cleaned up properly.");
    }
    this.task.prompt = this;
    this.task.state$ = "PROMPT" /* PROMPT */;
  }
  reportFailed() {
    this.task.state$ = "PROMPT_FAILED" /* PROMPT_FAILED */;
    this.restoreState();
  }
  reportCompleted() {
    this.task.state$ = "PROMPT_COMPLETED" /* PROMPT_COMPLETED */;
    this.restoreState();
  }
  restoreState() {
    this.task.prompt = void 0;
    if (this.state) {
      this.task.state = this.state;
    }
  }
});

// src/utils/ui/spinner.ts
var Spinner = class {
  static {
    __name(this, "Spinner");
  }
  spinner = !isUnicodeSupported() ? ["-", "\\", "|", "/"] : ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
  id;
  spinnerPosition = 0;
  spin() {
    this.spinnerPosition = ++this.spinnerPosition % this.spinner.length;
  }
  fetch() {
    return this.spinner[this.spinnerPosition];
  }
  isRunning() {
    return !!this.id;
  }
  start(cb, interval = 100) {
    this.id = setInterval(() => {
      this.spin();
      if (cb) {
        cb();
      }
    }, interval);
  }
  stop() {
    clearInterval(this.id);
  }
};
var LISTR_DEFAULT_RENDERER_STYLE = {
  icon: {
    ["SKIPPED_WITH_COLLAPSE" /* SKIPPED_WITH_COLLAPSE */]: figures.arrowDown,
    ["SKIPPED_WITHOUT_COLLAPSE" /* SKIPPED_WITHOUT_COLLAPSE */]: figures.warning,
    ["OUTPUT" /* OUTPUT */]: figures.pointerSmall,
    ["OUTPUT_WITH_BOTTOMBAR" /* OUTPUT_WITH_BOTTOMBAR */]: figures.pointerSmall,
    ["PENDING" /* PENDING */]: figures.pointer,
    ["COMPLETED" /* COMPLETED */]: figures.tick,
    ["COMPLETED_WITH_FAILED_SUBTASKS" /* COMPLETED_WITH_FAILED_SUBTASKS */]: figures.warning,
    ["COMPLETED_WITH_SISTER_TASKS_FAILED" /* COMPLETED_WITH_FAILED_SISTER_TASKS */]: figures.squareSmallFilled,
    ["RETRY" /* RETRY */]: figures.warning,
    ["ROLLING_BACK" /* ROLLING_BACK */]: figures.warning,
    ["ROLLED_BACK" /* ROLLED_BACK */]: figures.arrowLeft,
    ["FAILED" /* FAILED */]: figures.cross,
    ["FAILED_WITH_SUBTASKS" /* FAILED_WITH_FAILED_SUBTASKS */]: figures.pointer,
    ["WAITING" /* WAITING */]: figures.squareSmallFilled,
    ["PAUSED" /* PAUSED */]: figures.squareSmallFilled
  },
  color: {
    ["SKIPPED_WITH_COLLAPSE" /* SKIPPED_WITH_COLLAPSE */]: color.yellow,
    ["SKIPPED_WITHOUT_COLLAPSE" /* SKIPPED_WITHOUT_COLLAPSE */]: color.yellow,
    ["PENDING" /* PENDING */]: color.yellow,
    ["COMPLETED" /* COMPLETED */]: color.green,
    ["COMPLETED_WITH_FAILED_SUBTASKS" /* COMPLETED_WITH_FAILED_SUBTASKS */]: color.yellow,
    ["COMPLETED_WITH_SISTER_TASKS_FAILED" /* COMPLETED_WITH_FAILED_SISTER_TASKS */]: color.red,
    ["RETRY" /* RETRY */]: color.yellowBright,
    ["ROLLING_BACK" /* ROLLING_BACK */]: color.redBright,
    ["ROLLED_BACK" /* ROLLED_BACK */]: color.redBright,
    ["FAILED" /* FAILED */]: color.red,
    ["FAILED_WITH_SUBTASKS" /* FAILED_WITH_FAILED_SUBTASKS */]: color.red,
    ["WAITING" /* WAITING */]: color.dim,
    ["PAUSED" /* PAUSED */]: color.yellowBright
  }
};

// src/presets/timer/parser.ts
function parseTimer(duration) {
  const seconds = Math.floor(duration / 1e3);
  const minutes = Math.floor(seconds / 60);
  let parsedTime;
  if (seconds === 0 && minutes === 0) {
    parsedTime = `0.${Math.floor(duration / 100)}s`;
  }
  if (seconds > 0) {
    parsedTime = `${seconds % 60}s`;
  }
  if (minutes > 0) {
    parsedTime = `${minutes}m${parsedTime}`;
  }
  return parsedTime;
}
__name(parseTimer, "parseTimer");

// src/presets/timer/preset.ts
var PRESET_TIMER = {
  condition: true,
  field: parseTimer,
  format: /* @__PURE__ */ __name(() => color.dim, "format")
};

// src/presets/timestamp/parser.ts
function parseTimestamp() {
  const now = /* @__PURE__ */ new Date();
  return String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0") + ":" + String(now.getSeconds()).padStart(2, "0");
}
__name(parseTimestamp, "parseTimestamp");

// src/renderer/default/renderer.ts
var DefaultRenderer = class _DefaultRenderer {
  constructor(tasks, options, events) {
    this.tasks = tasks;
    this.options = options;
    this.events = events;
    this.options = {
      ..._DefaultRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_DEFAULT_RENDERER_STYLE.icon,
        ...options?.icon ?? {}
      },
      color: {
        ...LISTR_DEFAULT_RENDERER_STYLE.color,
        ...options?.color ?? {}
      }
    };
    this.spinner = this.options.spinner ?? new Spinner();
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: true, toStderr: [] });
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
  }
  static {
    __name(this, "DefaultRenderer");
  }
  static nonTTY = false;
  static rendererOptions = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapseSubtasks: true,
    collapseSkips: true,
    showSkipMessage: true,
    suffixSkips: false,
    collapseErrors: true,
    showErrorMessage: true,
    suffixRetries: true,
    lazy: false,
    removeEmptyLines: true,
    formatOutput: "wrap",
    pausedTimer: {
      ...PRESET_TIMER,
      format: /* @__PURE__ */ __name(() => color.yellowBright, "format")
    }
  };
  static rendererTaskOptions = {
    outputBar: true
  };
  prompt;
  activePrompt;
  spinner;
  logger;
  updater;
  truncate;
  wrap;
  buffer = {
    output: /* @__PURE__ */ new Map(),
    bottom: /* @__PURE__ */ new Map()
  };
  cache = {
    render: /* @__PURE__ */ new Map(),
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  };
  async render() {
    const { createLogUpdate } = await import('./index-DKzXF4Bx.js');
    const { default: truncate } = await import('./index-DQaTec44.js');
    const { default: wrap } = await import('./index-DGFl7j_K.js');
    this.updater = createLogUpdate(this.logger.process.stdout);
    this.truncate = truncate;
    this.wrap = wrap;
    this.logger.process.hijack();
    if (!this.options?.lazy) {
      this.spinner.start(() => {
        this.update();
      });
    }
    this.events.on("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */, () => {
      this.update();
    });
  }
  update() {
    this.updater(this.create());
  }
  end() {
    this.spinner.stop();
    this.updater.clear();
    this.updater.done();
    if (!this.options.clearOutput) {
      this.logger.process.toStdout(this.create({ prompt: false }));
    }
    this.logger.process.release();
  }
  create(options) {
    options = {
      tasks: true,
      bottomBar: true,
      prompt: true,
      ...options
    };
    const render = [];
    const renderTasks = this.renderer(this.tasks);
    const renderBottomBar = this.renderBottomBar();
    const renderPrompt = this.renderPrompt();
    if (options.tasks && renderTasks.length > 0) {
      render.push(...renderTasks);
    }
    if (options.bottomBar && renderBottomBar.length > 0) {
      if (render.length > 0) {
        render.push("");
      }
      render.push(...renderBottomBar);
    }
    if (options.prompt && renderPrompt.length > 0) {
      if (render.length > 0) {
        render.push("");
      }
      render.push(...renderPrompt);
    }
    return render.join(EOL);
  }
  // eslint-disable-next-line complexity
  style(task, output = false) {
    const rendererOptions = this.cache.rendererOptions.get(task.id);
    if (task.isSkipped()) {
      if (output || rendererOptions.collapseSkips) {
        return this.logger.icon("SKIPPED_WITH_COLLAPSE" /* SKIPPED_WITH_COLLAPSE */);
      } else if (rendererOptions.collapseSkips === false) {
        return this.logger.icon("SKIPPED_WITHOUT_COLLAPSE" /* SKIPPED_WITHOUT_COLLAPSE */);
      }
    }
    if (output) {
      if (this.shouldOutputToBottomBar(task)) {
        return this.logger.icon("OUTPUT_WITH_BOTTOMBAR" /* OUTPUT_WITH_BOTTOMBAR */);
      }
      return this.logger.icon("OUTPUT" /* OUTPUT */);
    }
    if (task.hasSubtasks()) {
      if (task.isStarted() || task.isPrompt() && rendererOptions.showSubtasks !== false && !task.subtasks.every((subtask) => !subtask.hasTitle())) {
        return this.logger.icon("PENDING" /* PENDING */);
      } else if (task.isCompleted() && task.subtasks.some((subtask) => subtask.hasFailed())) {
        return this.logger.icon("COMPLETED_WITH_FAILED_SUBTASKS" /* COMPLETED_WITH_FAILED_SUBTASKS */);
      } else if (task.hasFailed()) {
        return this.logger.icon("FAILED_WITH_SUBTASKS" /* FAILED_WITH_FAILED_SUBTASKS */);
      }
    }
    if (task.isStarted() || task.isPrompt()) {
      return this.logger.icon("PENDING" /* PENDING */, !this.options?.lazy && this.spinner.fetch());
    } else if (task.isCompleted()) {
      return this.logger.icon("COMPLETED" /* COMPLETED */);
    } else if (task.isRetrying()) {
      return this.logger.icon("RETRY" /* RETRY */, !this.options?.lazy && this.spinner.fetch());
    } else if (task.isRollingBack()) {
      return this.logger.icon("ROLLING_BACK" /* ROLLING_BACK */, !this.options?.lazy && this.spinner.fetch());
    } else if (task.hasRolledBack()) {
      return this.logger.icon("ROLLED_BACK" /* ROLLED_BACK */);
    } else if (task.hasFailed()) {
      return this.logger.icon("FAILED" /* FAILED */);
    } else if (task.isPaused()) {
      return this.logger.icon("PAUSED" /* PAUSED */);
    }
    return this.logger.icon("WAITING" /* WAITING */);
  }
  format(message, icon, level) {
    if (message.trim() === "") {
      return [];
    }
    if (icon) {
      message = icon + " " + message;
    }
    let parsed;
    const columns = (process.stdout.columns ?? 80) - level * this.options.indentation - 2;
    switch (this.options.formatOutput) {
      case "truncate":
        parsed = message.split(EOL).map((s, i) => {
          return this.truncate(this.indent(s, i), columns);
        });
        break;
      case "wrap":
        parsed = this.wrap(message, columns, { hard: true, trim: false }).split(EOL).map((s, i) => this.indent(s, i));
        break;
      default:
        throw new ListrRendererError("Format option for the renderer is wrong.");
    }
    if (this.options.removeEmptyLines) {
      parsed = parsed.filter(Boolean);
    }
    return parsed.map((str) => indent(str, level * this.options.indentation));
  }
  shouldOutputToOutputBar(task) {
    const outputBar = this.cache.rendererTaskOptions.get(task.id).outputBar;
    return typeof outputBar === "number" && outputBar !== 0 || typeof outputBar === "boolean" && outputBar !== false;
  }
  shouldOutputToBottomBar(task) {
    const bottomBar = this.cache.rendererTaskOptions.get(task.id).bottomBar;
    return typeof bottomBar === "number" && bottomBar !== 0 || typeof bottomBar === "boolean" && bottomBar !== false || !task.hasTitle();
  }
  renderer(tasks, level = 0) {
    return tasks.flatMap((task) => {
      if (!task.isEnabled()) {
        return [];
      }
      if (this.cache.render.has(task.id)) {
        return this.cache.render.get(task.id);
      }
      this.calculate(task);
      this.setupBuffer(task);
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      const output = [];
      if (task.isPrompt()) {
        if (this.activePrompt && this.activePrompt !== task.id) {
          throw new ListrRendererError("Only one prompt can be active at the given time, please re-evaluate your task design.");
        } else if (!this.activePrompt) {
          task.on("PROMPT" /* PROMPT */, (prompt) => {
            const cleansed = cleanseAnsi(prompt);
            if (cleansed) {
              this.prompt = cleansed;
            }
          });
          task.on("STATE" /* STATE */, (state) => {
            if (state === "PROMPT_COMPLETED" /* PROMPT_COMPLETED */ || task.hasFinalized() || task.hasReset()) {
              this.prompt = null;
              this.activePrompt = null;
              task.off("PROMPT" /* PROMPT */);
            }
          });
          this.activePrompt = task.id;
        }
      }
      if (task.hasTitle()) {
        if (!(tasks.some((task2) => task2.hasFailed()) && !task.hasFailed() && task.options.exitOnError !== false && !(task.isCompleted() || task.isSkipped()))) {
          if (task.hasFailed() && rendererOptions.collapseErrors) {
            output.push(...this.format(!task.hasSubtasks() && task.message.error && rendererOptions.showErrorMessage ? task.message.error : task.title, this.style(task), level));
          } else if (task.isSkipped() && rendererOptions.collapseSkips) {
            output.push(
              ...this.format(
                this.logger.suffix(task.message.skip && rendererOptions.showSkipMessage ? task.message.skip : task.title, {
                  field: "SKIPPED" /* SKIPPED */,
                  condition: rendererOptions.suffixSkips,
                  format: /* @__PURE__ */ __name(() => color.dim, "format")
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isRetrying()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  field: `${"RETRY" /* RETRY */}:${task.message.retry.count}`,
                  format: /* @__PURE__ */ __name(() => color.yellow, "format"),
                  condition: rendererOptions.suffixRetries
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isCompleted() && task.hasTitle() && assertFunctionOrSelf(rendererTaskOptions.timer?.condition, task.message.duration)) {
            output.push(
              ...this.format(
                this.logger.suffix(task?.title, {
                  ...rendererTaskOptions.timer,
                  args: [task.message.duration]
                }),
                this.style(task),
                level
              )
            );
          } else if (task.isPaused()) {
            output.push(
              ...this.format(
                this.logger.suffix(task.title, {
                  ...rendererOptions.pausedTimer,
                  args: [task.message.paused - Date.now()]
                }),
                this.style(task),
                level
              )
            );
          } else {
            output.push(...this.format(task.title, this.style(task), level));
          }
        } else {
          output.push(...this.format(task.title, this.logger.icon("COMPLETED_WITH_SISTER_TASKS_FAILED" /* COMPLETED_WITH_FAILED_SISTER_TASKS */), level));
        }
      }
      if (!task.hasSubtasks() || !rendererOptions.showSubtasks) {
        if (task.hasFailed() && rendererOptions.collapseErrors === false && (rendererOptions.showErrorMessage || !rendererOptions.showSubtasks)) {
          output.push(...this.dump(task, level, "FAILED" /* FAILED */));
        } else if (task.isSkipped() && rendererOptions.collapseSkips === false && (rendererOptions.showSkipMessage || !rendererOptions.showSubtasks)) {
          output.push(...this.dump(task, level, "SKIPPED" /* SKIPPED */));
        }
      }
      if (task.isPending() || rendererTaskOptions.persistentOutput) {
        output.push(...this.renderOutputBar(task, level));
      }
      if (
        // check if renderer option is on first
        rendererOptions.showSubtasks !== false && // if it doesnt have subtasks no need to check
        task.hasSubtasks() && (task.isPending() || task.hasFinalized() && !task.hasTitle() || // have to be completed and have subtasks
        task.isCompleted() && rendererOptions.collapseSubtasks === false && !task.subtasks.some((subtask) => this.cache.rendererOptions.get(subtask.id)?.collapseSubtasks === true) || // if any of the subtasks have the collapse option of
        task.subtasks.some((subtask) => this.cache.rendererOptions.get(subtask.id)?.collapseSubtasks === false) || // if any of the subtasks has failed
        task.subtasks.some((subtask) => subtask.hasFailed()) || // if any of the subtasks rolled back
        task.subtasks.some((subtask) => subtask.hasRolledBack()))
      ) {
        const subtaskLevel = !task.hasTitle() ? level : level + 1;
        const subtaskRender = this.renderer(task.subtasks, subtaskLevel);
        output.push(...subtaskRender);
      }
      if (task.hasFinalized()) {
        if (!rendererTaskOptions.persistentOutput) {
          this.buffer.bottom.delete(task.id);
          this.buffer.output.delete(task.id);
        }
      }
      if (task.isClosed()) {
        this.cache.render.set(task.id, output);
        this.reset(task);
      }
      return output;
    });
  }
  renderOutputBar(task, level) {
    const output = this.buffer.output.get(task.id);
    if (!output) {
      return [];
    }
    return output.all.flatMap((o) => this.dump(task, level, "OUTPUT" /* OUTPUT */, o.entry));
  }
  renderBottomBar() {
    if (this.buffer.bottom.size === 0) {
      return [];
    }
    return Array.from(this.buffer.bottom.values()).flatMap((output) => output.all).sort((a, b) => a.time - b.time).map((output) => output.entry);
  }
  renderPrompt() {
    if (!this.prompt) {
      return [];
    }
    return [this.prompt];
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._DefaultRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  setupBuffer(task) {
    if (this.buffer.bottom.has(task.id) || this.buffer.output.has(task.id)) {
      return;
    }
    const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
    if (this.shouldOutputToBottomBar(task) && !this.buffer.bottom.has(task.id)) {
      this.buffer.bottom.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.bottomBar === "number" ? rendererTaskOptions.bottomBar : 1 }));
      task.on("OUTPUT" /* OUTPUT */, (output) => {
        const data = this.dump(task, -1, "OUTPUT" /* OUTPUT */, output);
        this.buffer.bottom.get(task.id).write(data.join(EOL));
      });
      task.on("STATE" /* STATE */, (state) => {
        switch (state) {
          case ("RETRY" /* RETRY */ /* ROLLING_BACK */):
            this.buffer.bottom.delete(task.id);
            break;
        }
      });
    } else if (this.shouldOutputToOutputBar(task) && !this.buffer.output.has(task.id)) {
      this.buffer.output.set(task.id, new ProcessOutputBuffer({ limit: typeof rendererTaskOptions.outputBar === "number" ? rendererTaskOptions.outputBar : 1 }));
      task.on("OUTPUT" /* OUTPUT */, (output) => {
        this.buffer.output.get(task.id).write(output);
      });
      task.on("STATE" /* STATE */, (state) => {
        switch (state) {
          case ("RETRY" /* RETRY */ /* ROLLING_BACK */):
            this.buffer.output.delete(task.id);
            break;
        }
      });
    }
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
    this.buffer.output.delete(task.id);
  }
  dump(task, level, source = "OUTPUT" /* OUTPUT */, data) {
    if (!data) {
      switch (source) {
        case "OUTPUT" /* OUTPUT */:
          data = task.output;
          break;
        case "SKIPPED" /* SKIPPED */:
          data = task.message.skip;
          break;
        case "FAILED" /* FAILED */:
          data = task.message.error;
          break;
      }
    }
    if (task.hasTitle() && source === "FAILED" /* FAILED */ && data === task.title || typeof data !== "string") {
      return [];
    }
    if (source === "OUTPUT" /* OUTPUT */) {
      data = cleanseAnsi(data);
    }
    return this.format(data, this.style(task, true), level + 1);
  }
  indent(str, i) {
    return i > 0 ? indent(str.trimEnd(), this.options.indentation) : str.trimEnd();
  }
};

// src/renderer/silent/renderer.ts
var SilentRenderer = class {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
  }
  static {
    __name(this, "SilentRenderer");
  }
  static nonTTY = true;
  static rendererOptions;
  static rendererTaskOptions;
  render() {
    return;
  }
  end() {
    return;
  }
};

// src/renderer/simple/renderer.ts
var SimpleRenderer = class _SimpleRenderer {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
    this.options = {
      ..._SimpleRenderer.rendererOptions,
      ...options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ...options?.icon ?? {}
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ...options?.color ?? {}
      }
    };
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: true, toStderr: LISTR_LOGGER_STDERR_LEVELS });
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp);
    }
  }
  static {
    __name(this, "SimpleRenderer");
  }
  static nonTTY = true;
  static rendererOptions = {
    pausedTimer: {
      ...PRESET_TIMER,
      field: /* @__PURE__ */ __name((time) => `${"PAUSED" /* PAUSED */}:${time}`, "field"),
      format: /* @__PURE__ */ __name(() => color.yellowBright, "format")
    }
  };
  static rendererTaskOptions = {};
  logger;
  cache = {
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  render() {
    this.renderer(this.tasks);
  }
  renderer(tasks) {
    tasks.forEach((task) => {
      this.calculate(task);
      task.once("CLOSED" /* CLOSED */, () => {
        this.reset(task);
      });
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      task.on("SUBTASK" /* SUBTASK */, (subtasks) => {
        this.renderer(subtasks);
      });
      task.on("STATE" /* STATE */, (state) => {
        if (!task.hasTitle()) {
          return;
        }
        if (state === "STARTED" /* STARTED */) {
          this.logger.log("STARTED" /* STARTED */, task.title);
        } else if (state === "COMPLETED" /* COMPLETED */) {
          const timer = rendererTaskOptions?.timer;
          this.logger.log(
            "COMPLETED" /* COMPLETED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!task.message?.duration && timer.condition,
                args: [task.message.duration]
              }
            }
          );
        } else if (state === "PROMPT" /* PROMPT */) {
          this.logger.process.hijack();
          task.on("PROMPT" /* PROMPT */, (prompt) => {
            this.logger.process.toStderr(prompt, false);
          });
        } else if (state === "PROMPT_COMPLETED" /* PROMPT_COMPLETED */) {
          task.off("PROMPT" /* PROMPT */);
          this.logger.process.release();
        }
      });
      task.on("OUTPUT" /* OUTPUT */, (output) => {
        this.logger.log("OUTPUT" /* OUTPUT */, output);
      });
      task.on("MESSAGE" /* MESSAGE */, (message) => {
        if (message.error) {
          this.logger.log("FAILED" /* FAILED */, task.title, {
            suffix: {
              field: `${"FAILED" /* FAILED */}: ${message.error}`,
              format: /* @__PURE__ */ __name(() => color.red, "format")
            }
          });
        } else if (message.skip) {
          this.logger.log("SKIPPED" /* SKIPPED */, task.title, {
            suffix: {
              field: `${"SKIPPED" /* SKIPPED */}: ${message.skip}`,
              format: /* @__PURE__ */ __name(() => color.yellow, "format")
            }
          });
        } else if (message.rollback) {
          this.logger.log("ROLLBACK" /* ROLLBACK */, task.title, {
            suffix: {
              field: `${"ROLLBACK" /* ROLLBACK */}: ${message.rollback}`,
              format: /* @__PURE__ */ __name(() => color.red, "format")
            }
          });
        } else if (message.retry) {
          this.logger.log("RETRY" /* RETRY */, task.title, {
            suffix: {
              field: `${"RETRY" /* RETRY */}:${message.retry.count}`,
              format: /* @__PURE__ */ __name(() => color.red, "format")
            }
          });
        } else if (message.paused) {
          const timer = rendererOptions?.pausedTimer;
          this.logger.log(
            "PAUSED" /* PAUSED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!message?.paused && timer.condition,
                args: [message.paused - Date.now()]
              }
            }
          );
        }
      });
    });
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._SimpleRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
  }
};

// src/renderer/test/serializer.ts
var TestRendererSerializer = class {
  constructor(options) {
    this.options = options;
  }
  static {
    __name(this, "TestRendererSerializer");
  }
  serialize(event, data, task) {
    return JSON.stringify(this.generate(event, data, task));
  }
  generate(event, data, task) {
    const output = {
      event,
      data
    };
    if (typeof this.options?.task !== "boolean") {
      const t = Object.fromEntries(
        this.options.task.map((entity) => {
          const property = task[entity];
          if (typeof property === "function") {
            return [entity, property.call(task)];
          }
          return [entity, property];
        })
      );
      if (Object.keys(task).length > 0) {
        output.task = t;
      }
    }
    return output;
  }
};

// src/renderer/test/renderer.ts
var TestRenderer = class _TestRenderer {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
    this.options = { ..._TestRenderer.rendererOptions, ...this.options };
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: false });
    this.serializer = new TestRendererSerializer(this.options);
  }
  static {
    __name(this, "TestRenderer");
  }
  static nonTTY = true;
  static rendererOptions = {
    subtasks: true,
    state: Object.values(ListrTaskState),
    output: true,
    prompt: true,
    title: true,
    messages: ["skip", "error", "retry", "rollback", "paused"],
    messagesToStderr: ["error", "rollback", "retry"],
    task: [
      "hasRolledBack",
      "isRollingBack",
      "isCompleted",
      "isSkipped",
      "hasFinalized",
      "hasSubtasks",
      "title",
      "hasReset",
      "hasTitle",
      "isPrompt",
      "isPaused",
      "isPending",
      "isSkipped",
      "isStarted",
      "hasFailed",
      "isEnabled",
      "isRetrying",
      "path"
    ]
  };
  static rendererTaskOptions;
  logger;
  serializer;
  render() {
    this.renderer(this.tasks);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  // verbose renderer multi-level
  renderer(tasks) {
    tasks.forEach((task) => {
      if (this.options.subtasks) {
        task.on("SUBTASK" /* SUBTASK */, (subtasks) => {
          this.renderer(subtasks);
        });
      }
      if (this.options.state) {
        task.on("STATE" /* STATE */, (state) => {
          this.logger.toStdout(this.serializer.serialize("STATE" /* STATE */, state, task));
        });
      }
      if (this.options.output) {
        task.on("OUTPUT" /* OUTPUT */, (data) => {
          this.logger.toStdout(this.serializer.serialize("OUTPUT" /* OUTPUT */, data, task));
        });
      }
      if (this.options.prompt) {
        task.on("PROMPT" /* PROMPT */, (prompt) => {
          this.logger.toStdout(this.serializer.serialize("PROMPT" /* PROMPT */, prompt, task));
        });
      }
      if (this.options.title) {
        task.on("TITLE" /* TITLE */, (title) => {
          this.logger.toStdout(this.serializer.serialize("TITLE" /* TITLE */, title, task));
        });
      }
      task.on("MESSAGE" /* MESSAGE */, (message) => {
        const parsed = Object.fromEntries(
          Object.entries(message).map(([key, value]) => {
            if (this.options.messages.includes(key)) {
              return [key, value];
            }
          }).filter(Boolean)
        );
        if (Object.keys(parsed).length > 0) {
          const output = this.serializer.serialize("MESSAGE" /* MESSAGE */, parsed, task);
          if (this.options.messagesToStderr.some((state) => Object.keys(parsed).includes(state))) {
            this.logger.toStderr(output);
          } else {
            this.logger.toStdout(output);
          }
        }
      });
    });
  }
};

// src/renderer/verbose/renderer.ts
var VerboseRenderer = class _VerboseRenderer {
  constructor(tasks, options) {
    this.tasks = tasks;
    this.options = options;
    this.options = {
      ..._VerboseRenderer.rendererOptions,
      ...this.options,
      icon: {
        ...LISTR_LOGGER_STYLE.icon,
        ...options?.icon ?? {}
      },
      color: {
        ...LISTR_LOGGER_STYLE.color,
        ...options?.color ?? {}
      }
    };
    this.logger = this.options.logger ?? new ListrLogger({ useIcons: false, toStderr: LISTR_LOGGER_STDERR_LEVELS });
    this.logger.options.icon = this.options.icon;
    this.logger.options.color = this.options.color;
    if (this.options.timestamp) {
      this.logger.options.fields.prefix.unshift(this.options.timestamp);
    }
  }
  static {
    __name(this, "VerboseRenderer");
  }
  static nonTTY = true;
  static rendererOptions = {
    logTitleChange: false,
    pausedTimer: {
      ...PRESET_TIMER,
      format: /* @__PURE__ */ __name(() => color.yellowBright, "format")
    }
  };
  static rendererTaskOptions;
  logger;
  cache = {
    rendererOptions: /* @__PURE__ */ new Map(),
    rendererTaskOptions: /* @__PURE__ */ new Map()
  };
  render() {
    this.renderer(this.tasks);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  end() {
  }
  renderer(tasks) {
    tasks.forEach((task) => {
      this.calculate(task);
      task.once("CLOSED" /* CLOSED */, () => {
        this.reset(task);
      });
      const rendererOptions = this.cache.rendererOptions.get(task.id);
      const rendererTaskOptions = this.cache.rendererTaskOptions.get(task.id);
      task.on("SUBTASK" /* SUBTASK */, (subtasks) => {
        this.renderer(subtasks);
      });
      task.on("STATE" /* STATE */, (state) => {
        if (!task.hasTitle()) {
          return;
        }
        if (state === "STARTED" /* STARTED */) {
          this.logger.log("STARTED" /* STARTED */, task.title);
        } else if (state === "COMPLETED" /* COMPLETED */) {
          const timer = rendererTaskOptions.timer;
          this.logger.log(
            "COMPLETED" /* COMPLETED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!task.message?.duration && timer.condition,
                args: [task.message.duration]
              }
            }
          );
        }
      });
      task.on("OUTPUT" /* OUTPUT */, (data) => {
        this.logger.log("OUTPUT" /* OUTPUT */, data);
      });
      task.on("PROMPT" /* PROMPT */, (prompt) => {
        const cleansed = cleanseAnsi(prompt);
        if (cleansed) {
          this.logger.log("PROMPT" /* PROMPT */, cleansed);
        }
      });
      if (this.options?.logTitleChange !== false) {
        task.on("TITLE" /* TITLE */, (title) => {
          this.logger.log("TITLE" /* TITLE */, title);
        });
      }
      task.on("MESSAGE" /* MESSAGE */, (message) => {
        if (message?.error) {
          this.logger.log("FAILED" /* FAILED */, message.error);
        } else if (message?.skip) {
          this.logger.log("SKIPPED" /* SKIPPED */, message.skip);
        } else if (message?.rollback) {
          this.logger.log("ROLLBACK" /* ROLLBACK */, message.rollback);
        } else if (message?.retry) {
          this.logger.log("RETRY" /* RETRY */, task.title, { suffix: message.retry.count.toString() });
        } else if (message?.paused) {
          const timer = rendererOptions?.pausedTimer;
          this.logger.log(
            "PAUSED" /* PAUSED */,
            task.title,
            timer && {
              suffix: {
                ...timer,
                condition: !!message?.paused && timer.condition,
                args: [message.paused - Date.now()]
              }
            }
          );
        }
      });
    });
  }
  calculate(task) {
    if (this.cache.rendererOptions.has(task.id) && this.cache.rendererTaskOptions.has(task.id)) {
      return;
    }
    const rendererOptions = {
      ...this.options,
      ...task.rendererOptions
    };
    this.cache.rendererOptions.set(task.id, rendererOptions);
    this.cache.rendererTaskOptions.set(task.id, {
      ..._VerboseRenderer.rendererTaskOptions,
      timer: rendererOptions.timer,
      ...task.rendererTaskOptions
    });
  }
  reset(task) {
    this.cache.rendererOptions.delete(task.id);
    this.cache.rendererTaskOptions.delete(task.id);
  }
};

// src/utils/ui/renderer.ts
var RENDERERS = {
  default: DefaultRenderer,
  simple: SimpleRenderer,
  verbose: VerboseRenderer,
  test: TestRenderer,
  silent: SilentRenderer
};
function isRendererSupported(renderer) {
  return process.stdout.isTTY === true || renderer.nonTTY === true;
}
__name(isRendererSupported, "isRendererSupported");
function getRendererClass(renderer) {
  if (typeof renderer === "string") {
    return RENDERERS[renderer] ?? RENDERERS.default;
  }
  return typeof renderer === "function" ? renderer : RENDERERS.default;
}
__name(getRendererClass, "getRendererClass");
function getRenderer(options) {
  if (assertFunctionOrSelf(options?.silentRendererCondition)) {
    return { renderer: getRendererClass("silent"), selection: "SILENT" /* SILENT */ };
  }
  const r = {
    renderer: getRendererClass(options.renderer),
    options: options.rendererOptions,
    selection: "PRIMARY" /* PRIMARY */
  };
  if (!isRendererSupported(r.renderer) || assertFunctionOrSelf(options?.fallbackRendererCondition)) {
    return {
      renderer: getRendererClass(options.fallbackRenderer),
      options: options.fallbackRendererOptions,
      selection: "SECONDARY" /* SECONDARY */
    };
  }
  return r;
}
__name(getRenderer, "getRenderer");

// src/utils/assert.ts
function assertFunctionOrSelf(functionOrSelf, ...args) {
  if (typeof functionOrSelf === "function") {
    return functionOrSelf(...args);
  } else {
    return functionOrSelf;
  }
}
__name(assertFunctionOrSelf, "assertFunctionOrSelf");
var clone = rfdc({ circles: true });
function cloneObject(obj) {
  return clone(obj);
}
__name(cloneObject, "cloneObject");

// src/utils/concurrency.ts
var Concurrency = class {
  static {
    __name(this, "Concurrency");
  }
  concurrency;
  count;
  queue;
  constructor(options) {
    this.concurrency = options.concurrency;
    this.count = 0;
    this.queue = /* @__PURE__ */ new Set();
  }
  add(fn) {
    if (this.count < this.concurrency) {
      return this.run(fn);
    }
    return new Promise((resolve) => {
      const callback = /* @__PURE__ */ __name(() => resolve(this.run(fn)), "callback");
      this.queue.add(callback);
    });
  }
  flush() {
    for (const callback of this.queue) {
      if (this.count >= this.concurrency) {
        break;
      }
      this.queue.delete(callback);
      callback();
    }
  }
  run(fn) {
    this.count++;
    const promise = fn();
    const cleanup = /* @__PURE__ */ __name(() => {
      this.count--;
      this.flush();
    }, "cleanup");
    promise.then(cleanup, () => {
      this.queue.clear();
    });
    return promise;
  }
};

// src/utils/delay.ts
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
__name(delay, "delay");

// src/interfaces/listr-error.interface.ts
var ListrError = class extends Error {
  constructor(error, type, task) {
    super(error.message);
    this.error = error;
    this.type = type;
    this.task = task;
    this.name = "ListrError";
    this.path = task.path;
    if (task?.options.collectErrors === "full") {
      this.task = cloneObject(task);
      this.ctx = cloneObject(task.listr.ctx);
    }
    this.stack = error?.stack;
  }
  static {
    __name(this, "ListrError");
  }
  path;
  ctx;
};

// src/interfaces/listr-renderer-error.interface.ts
var ListrRendererError = class extends Error {
  static {
    __name(this, "ListrRendererError");
  }
};

// src/interfaces/prompt-error.interface.ts
var PromptError = class extends Error {
  static {
    __name(this, "PromptError");
  }
};

// src/lib/task-wrapper.ts
var TaskWrapper = class {
  constructor(task) {
    this.task = task;
  }
  static {
    __name(this, "TaskWrapper");
  }
  /* istanbul ignore next */
  get title() {
    return this.task.title;
  }
  /**
   * Title of the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/title.html}
   */
  set title(title) {
    title = Array.isArray(title) ? title : [title];
    this.task.title$ = splat(title.shift(), ...title);
  }
  /* istanbul ignore next */
  get output() {
    return this.task.output;
  }
  /* istanbul ignore next */
  /**
   * Send output from the current task to the renderer.
   *
   * @see {@link https://listr2.kilic.dev/task/output.html}
   */
  set output(output) {
    output = Array.isArray(output) ? output : [output];
    this.task.output$ = splat(output.shift(), ...output);
  }
  /* istanbul ignore next */
  /** Send an output to the output channel as prompt. */
  set promptOutput(output) {
    this.task.promptOutput$ = output;
  }
  /**
   * Creates a new set of Listr subtasks.
   *
   * @see {@link https://listr2.kilic.dev/task/subtasks.html}
   */
  newListr(task, options) {
    let tasks;
    if (typeof task === "function") {
      tasks = task(this);
    } else {
      tasks = task;
    }
    return new Listr(tasks, options, this.task);
  }
  /**
   * Report an error that has to be collected and handled.
   *
   * @see {@link https://listr2.kilic.dev/task/error-handling.html}
   */
  report(error, type) {
    if (this.task.options.collectErrors !== false) {
      this.task.listr.errors.push(new ListrError(error, type, this.task));
    }
    this.task.message$ = { error: error.message ?? this.task?.title };
  }
  /**
   * Skip the current task.
   *
   * @see {@link https://listr2.kilic.dev/task/skip.html}
   */
  skip(message, ...metadata) {
    this.task.state$ = "SKIPPED" /* SKIPPED */;
    if (message) {
      this.task.message$ = { skip: message ? splat(message, ...metadata) : this.task?.title };
    }
  }
  /**
   * Check whether this task is currently in a retry state.
   *
   * @see {@link https://listr2.kilic.dev/task/retry.html}
   */
  isRetrying() {
    return this.task.isRetrying() ? this.task.retry : { count: 0 };
  }
  /* istanbul ignore next */
  /**
   * Create a new prompt for getting user input through the prompt adapter.
   * This will create a new prompt through the adapter if the task is not currently rendering a prompt or will return the active instance.
   *
   * This part of the application requires optional peer dependencies, please refer to documentation.
   *
   * @see {@link https://listr2.kilic.dev/task/prompt.html}
   */
  prompt(adapter) {
    if (this.task.prompt) {
      return this.task.prompt;
    }
    return new adapter(this.task, this);
  }
  /* istanbul ignore next */
  /**
   * Generates a fake stdout for your use case, where it will be tunnelled through Listr to handle the rendering process.
   *
   * @see {@link https://listr2.kilic.dev/renderer/process-output.html}
   */
  stdout(type) {
    return createWritable((chunk) => {
      switch (type) {
        case "PROMPT" /* PROMPT */:
          this.promptOutput = chunk;
          break;
        default:
          this.output = chunk;
      }
    });
  }
  /** Run this task. */
  run(ctx) {
    return this.task.run(ctx, this);
  }
};

// src/lib/listr-task-event-manager.ts
var ListrTaskEventManager = class extends EventManager {
  static {
    __name(this, "ListrTaskEventManager");
  }
};

// src/lib/task.ts
var Task = class extends ListrTaskEventManager {
  constructor(listr, task, options, rendererOptions, rendererTaskOptions) {
    super();
    this.listr = listr;
    this.task = task;
    this.options = options;
    this.rendererOptions = rendererOptions;
    this.rendererTaskOptions = rendererTaskOptions;
    if (task.title) {
      const title = Array.isArray(task?.title) ? task.title : [task.title];
      this.title = splat(title.shift(), ...title);
      this.initialTitle = this.title;
    }
    this.taskFn = task.task;
    this.parent = listr.parentTask;
  }
  static {
    __name(this, "Task");
  }
  /** Unique id per task, can be used for identifying a Task. */
  id = randomUUID();
  /** The current state of the task. */
  state = "WAITING" /* WAITING */;
  /** Subtasks of the current task. */
  subtasks;
  /** Title of the task. */
  title;
  /** Initial/Untouched version of the title for using whenever task has a reset. */
  initialTitle;
  /** Output channel for the task. */
  output;
  /** Current state of the retry process whenever the task is retrying. */
  retry;
  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  message = {};
  /** Current prompt instance or prompt error whenever the task is prompting. */
  prompt;
  /** Parent task of the current task. */
  parent;
  /** Enable flag of this task. */
  enabled;
  /** User provided Task callback function to run. */
  taskFn;
  /** Marks the task as closed. This is different from finalized since this is not really related to task itself. */
  closed;
  /**
   * Update the current state of the Task and emit the neccassary events.
   */
  set state$(state) {
    this.state = state;
    this.emit("STATE" /* STATE */, state);
    if (this.hasSubtasks() && this.hasFailed()) {
      for (const subtask of this.subtasks) {
        if (subtask.state === "STARTED" /* STARTED */) {
          subtask.state$ = "FAILED" /* FAILED */;
        }
      }
    }
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Update the current output of the Task and emit the neccassary events.
   */
  set output$(data) {
    this.output = data;
    this.emit("OUTPUT" /* OUTPUT */, data);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Update the current prompt output of the Task and emit the neccassary events.
   */
  set promptOutput$(data) {
    this.emit("PROMPT" /* PROMPT */, data);
    if (cleanseAnsi(data)) {
      this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
    }
  }
  /**
   * Update or extend the current message of the Task and emit the neccassary events.
   */
  set message$(data) {
    this.message = { ...this.message, ...data };
    this.emit("MESSAGE" /* MESSAGE */, data);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Update the current title of the Task and emit the neccassary events.
   */
  set title$(title) {
    this.title = title;
    this.emit("TITLE" /* TITLE */, title);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
  }
  /**
   * Current task path in the hierarchy.
   */
  get path() {
    return [...this.listr.path, this.initialTitle];
  }
  /**
   * Checks whether the current task with the given context should be set as enabled.
   */
  async check(ctx) {
    if (this.state === "WAITING" /* WAITING */) {
      this.enabled = await assertFunctionOrSelf(this.task?.enabled ?? true, ctx);
      this.emit("ENABLED" /* ENABLED */, this.enabled);
      this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
    }
    return this.enabled;
  }
  /** Returns whether this task has subtasks. */
  hasSubtasks() {
    return this.subtasks?.length > 0;
  }
  /** Returns whether this task is finalized in someform. */
  hasFinalized() {
    return this.isCompleted() || this.hasFailed() || this.isSkipped() || this.hasRolledBack();
  }
  /** Returns whether this task is in progress. */
  isPending() {
    return this.isStarted() || this.isPrompt() || this.hasReset();
  }
  /** Returns whether this task has started. */
  isStarted() {
    return this.state === "STARTED" /* STARTED */;
  }
  /** Returns whether this task is skipped. */
  isSkipped() {
    return this.state === "SKIPPED" /* SKIPPED */;
  }
  /** Returns whether this task has been completed. */
  isCompleted() {
    return this.state === "COMPLETED" /* COMPLETED */;
  }
  /** Returns whether this task has been failed. */
  hasFailed() {
    return this.state === "FAILED" /* FAILED */;
  }
  /** Returns whether this task has an active rollback task going on. */
  isRollingBack() {
    return this.state === "ROLLING_BACK" /* ROLLING_BACK */;
  }
  /** Returns whether the rollback action was successful. */
  hasRolledBack() {
    return this.state === "ROLLED_BACK" /* ROLLED_BACK */;
  }
  /** Returns whether this task has an actively retrying task going on. */
  isRetrying() {
    return this.state === "RETRY" /* RETRY */;
  }
  /** Returns whether this task has some kind of reset like retry and rollback going on. */
  hasReset() {
    return this.state === "RETRY" /* RETRY */ || this.state === "ROLLING_BACK" /* ROLLING_BACK */;
  }
  /** Returns whether enabled function resolves to true. */
  isEnabled() {
    return this.enabled;
  }
  /** Returns whether this task actually has a title. */
  hasTitle() {
    return typeof this?.title === "string";
  }
  /** Returns whether this task has a prompt inside. */
  isPrompt() {
    return this.state === "PROMPT" /* PROMPT */ || this.state === "PROMPT_COMPLETED" /* PROMPT_COMPLETED */;
  }
  /** Returns whether this task is currently paused. */
  isPaused() {
    return this.state === "PAUSED" /* PAUSED */;
  }
  /** Returns whether this task is closed. */
  isClosed() {
    return this.closed;
  }
  /** Pause the given task for certain time. */
  async pause(time) {
    const state = this.state;
    this.state$ = "PAUSED" /* PAUSED */;
    this.message$ = {
      paused: Date.now() + time
    };
    await delay(time);
    this.state$ = state;
    this.message$ = {
      paused: null
    };
  }
  /** Run the current task. */
  async run(context, wrapper) {
    const handleResult = /* @__PURE__ */ __name((result) => {
      if (result instanceof Listr) {
        result.options = { ...this.options, ...result.options };
        result.rendererClass = getRendererClass("silent");
        this.subtasks = result.tasks;
        result.errors = this.listr.errors;
        this.emit("SUBTASK" /* SUBTASK */, this.subtasks);
        result = result.run(context);
      } else if (result instanceof Promise) {
        result = result.then(handleResult);
      } else if (isReadable(result)) {
        result = new Promise((resolve, reject) => {
          result.on("data", (data) => {
            this.output$ = data.toString();
          });
          result.on("error", (error) => reject(error));
          result.on("end", () => resolve(null));
        });
      } else if (isObservable(result)) {
        result = new Promise((resolve, reject) => {
          result.subscribe({
            next: /* @__PURE__ */ __name((data) => {
              this.output$ = data;
            }, "next"),
            error: reject,
            complete: resolve
          });
        });
      }
      return result;
    }, "handleResult");
    const startTime = Date.now();
    this.state$ = "STARTED" /* STARTED */;
    const skipped = await assertFunctionOrSelf(this.task?.skip ?? false, context);
    if (skipped) {
      if (typeof skipped === "string") {
        this.message$ = { skip: skipped };
      } else if (this.hasTitle()) {
        this.message$ = { skip: this.title };
      } else {
        this.message$ = { skip: "Skipped task without a title." };
      }
      this.state$ = "SKIPPED" /* SKIPPED */;
      return;
    }
    try {
      const retryCount = typeof this.task?.retry === "number" && this.task.retry > 0 ? this.task.retry + 1 : typeof this.task?.retry === "object" && this.task.retry.tries > 0 ? this.task.retry.tries + 1 : 1;
      const retryDelay = typeof this.task.retry === "object" && this.task.retry.delay;
      for (let retries = 1; retries <= retryCount; retries++) {
        try {
          await handleResult(this.taskFn(context, wrapper));
          break;
        } catch (err) {
          if (retries !== retryCount) {
            this.retry = { count: retries, error: err };
            this.message$ = { retry: this.retry };
            this.title$ = this.initialTitle;
            this.output = void 0;
            wrapper.report(err, "WILL_RETRY" /* WILL_RETRY */);
            this.state$ = "RETRY" /* RETRY */;
            if (retryDelay) {
              await this.pause(retryDelay);
            }
          } else {
            throw err;
          }
        }
      }
      if (this.isStarted() || this.isRetrying()) {
        this.message$ = { duration: Date.now() - startTime };
        this.state$ = "COMPLETED" /* COMPLETED */;
      }
    } catch (error) {
      if (this.prompt instanceof PromptError) {
        error = this.prompt;
      }
      if (this.task?.rollback) {
        wrapper.report(error, "WILL_ROLLBACK" /* WILL_ROLLBACK */);
        try {
          this.state$ = "ROLLING_BACK" /* ROLLING_BACK */;
          await this.task.rollback(context, wrapper);
          this.message$ = { rollback: this.title };
          this.state$ = "ROLLED_BACK" /* ROLLED_BACK */;
        } catch (err) {
          this.state$ = "FAILED" /* FAILED */;
          wrapper.report(err, "HAS_FAILED_TO_ROLLBACK" /* HAS_FAILED_TO_ROLLBACK */);
          this.close();
          throw err;
        }
        if (this.listr.options?.exitAfterRollback !== false) {
          this.close();
          throw error;
        }
      } else {
        this.state$ = "FAILED" /* FAILED */;
        if (this.listr.options.exitOnError !== false && await assertFunctionOrSelf(this.task?.exitOnError, context) !== false) {
          wrapper.report(error, "HAS_FAILED" /* HAS_FAILED */);
          this.close();
          throw error;
        } else if (!this.hasSubtasks()) {
          wrapper.report(error, "HAS_FAILED_WITHOUT_ERROR" /* HAS_FAILED_WITHOUT_ERROR */);
        }
      }
    } finally {
      this.close();
    }
  }
  close() {
    this.emit("CLOSED" /* CLOSED */);
    this.listr.events.emit("SHOUD_REFRESH_RENDER" /* SHOULD_REFRESH_RENDER */);
    this.complete();
  }
};

// src/lib/listr-event-manager.ts
var ListrEventManager = class extends EventManager {
  static {
    __name(this, "ListrEventManager");
  }
};

// src/listr.ts
var Listr = class {
  constructor(task, options, parentTask) {
    this.task = task;
    this.options = options;
    this.parentTask = parentTask;
    this.options = {
      concurrent: false,
      renderer: "default",
      fallbackRenderer: "simple",
      exitOnError: true,
      exitAfterRollback: true,
      collectErrors: false,
      registerSignalListeners: true,
      ...this.parentTask?.options ?? {},
      ...options
    };
    if (this.options.concurrent === true) {
      this.options.concurrent = Infinity;
    } else if (typeof this.options.concurrent !== "number") {
      this.options.concurrent = 1;
    }
    this.concurrency = new Concurrency({ concurrency: this.options.concurrent });
    if (parentTask) {
      this.path = [...parentTask.listr.path, parentTask.title];
      this.errors = parentTask.listr.errors;
    }
    if (this.parentTask?.listr.events instanceof ListrEventManager) {
      this.events = this.parentTask.listr.events;
    } else {
      this.events = new ListrEventManager();
    }
    if (this.options?.forceTTY || process.env["LISTR_FORCE_TTY" /* FORCE_TTY */]) {
      process.stdout.isTTY = true;
      process.stderr.isTTY = true;
    }
    if (this.options?.forceUnicode) {
      process.env["LISTR_FORCE_UNICODE" /* FORCE_UNICODE */] = "1";
    }
    const renderer = getRenderer({
      renderer: this.options.renderer,
      rendererOptions: this.options.rendererOptions,
      fallbackRenderer: this.options.fallbackRenderer,
      fallbackRendererOptions: this.options.fallbackRendererOptions,
      fallbackRendererCondition: this.options?.fallbackRendererCondition,
      silentRendererCondition: this.options?.silentRendererCondition
    });
    this.rendererClass = renderer.renderer;
    this.rendererClassOptions = renderer.options;
    this.rendererSelection = renderer.selection;
    this.add(task ?? []);
    if (this.options.registerSignalListeners) {
      this.boundSignalHandler = this.signalHandler.bind(this);
      process.once("SIGINT", this.boundSignalHandler).setMaxListeners(0);
    }
  }
  static {
    __name(this, "Listr");
  }
  tasks = [];
  errors = [];
  ctx;
  events;
  path = [];
  rendererClass;
  rendererClassOptions;
  rendererSelection;
  boundSignalHandler;
  concurrency;
  renderer;
  /**
   * Whether this is the root task.
   */
  isRoot() {
    return !this.parentTask;
  }
  /**
   * Whether this is a subtask of another task list.
   */
  isSubtask() {
    return !!this.parentTask;
  }
  /**
   * Add tasks to current task list.
   *
   * @see {@link https://listr2.kilic.dev/task/task.html}
   */
  add(tasks) {
    this.tasks.push(...this.generate(tasks));
  }
  /**
   * Run the task list.
   *
   * @see {@link https://listr2.kilic.dev/listr/listr.html#run-the-generated-task-list}
   */
  async run(context) {
    if (!this.renderer) {
      this.renderer = new this.rendererClass(this.tasks, this.rendererClassOptions, this.events);
    }
    await this.renderer.render();
    this.ctx = this.options?.ctx ?? context ?? {};
    await Promise.all(this.tasks.map((task) => task.check(this.ctx)));
    try {
      await Promise.all(this.tasks.map((task) => this.concurrency.add(() => this.runTask(task))));
      this.renderer.end();
      this.removeSignalHandler();
    } catch (err) {
      if (this.options.exitOnError !== false) {
        this.renderer.end(err);
        this.removeSignalHandler();
        throw err;
      }
    }
    return this.ctx;
  }
  generate(tasks) {
    tasks = Array.isArray(tasks) ? tasks : [tasks];
    return tasks.map((task) => {
      let rendererTaskOptions;
      if (this.rendererSelection === "PRIMARY" /* PRIMARY */) {
        rendererTaskOptions = task.rendererOptions;
      } else if (this.rendererSelection === "SECONDARY" /* SECONDARY */) {
        rendererTaskOptions = task.fallbackRendererOptions;
      }
      return new Task(
        this,
        task,
        this.options,
        this.rendererClassOptions,
        rendererTaskOptions
      );
    });
  }
  async runTask(task) {
    if (!await task.check(this.ctx)) {
      return;
    }
    return new TaskWrapper(task).run(this.ctx);
  }
  signalHandler() {
    this.tasks?.forEach(async (task) => {
      if (task.isPending()) {
        task.state$ = "FAILED" /* FAILED */;
      }
    });
    if (this.isRoot()) {
      this.renderer?.end(new Error("Interrupted."));
      process.exit(127);
    }
  }
  removeSignalHandler() {
    if (this.boundSignalHandler) {
      process.removeListener("SIGINT", this.boundSignalHandler);
    }
  }
};

try {
    const solutionFiles = getInput("files")
        .split(/\s+/)
        .filter((arg) => arg != "")
        .map((pattern) => ts(pattern))
        .flat()
        .sort();
    const task = new Listr(solutionFiles.map((solutionFile) => ({
        title: `Testing ${solutionFile}...`,
        task: (_, task) => task.newListr(createTestCppSolutionTasks(solutionFile), {
            ctx: {},
            concurrent: false,
            exitOnError: true,
        }),
    })), {
        concurrent: true,
        exitOnError: false,
        collectErrors: "minimal",
        rendererOptions: {
            collapseErrors: false,
            removeEmptyLines: false,
        },
    });
    await task.run();
    if (task.errors.length > 0) {
        throw new Error(`failed to test ${task.errors.length.toString()} solutions`);
    }
}
catch (err) {
    logError(err);
    process.exit(1);
}
