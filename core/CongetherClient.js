var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as moment_ from 'moment';
var moment = moment_;
import { TraceHandler } from './TraceHandler';
import { ConductorHandler } from './ConductorHandler';
export * from './IClientService';
export * from './CongetherFile';
export * from './TraceHandler';
var CongetherClient = /** @class */ (function () {
    function CongetherClient() {
        this._latestCachedManifest = null;
        this._latestEndpointRequest = null;
        this._traceHandler = new TraceHandler(this);
        this._conductorHandler = new ConductorHandler(this);
    }
    Object.defineProperty(CongetherClient.prototype, "appIdentifier", {
        get: function () { return this._appIdentifier; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CongetherClient.prototype, "version", {
        get: function () { return this._version; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CongetherClient.prototype, "baseUrl", {
        get: function () { return this._baseUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CongetherClient.prototype, "deviceKey", {
        get: function () { return this._deviceKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CongetherClient.prototype, "requiresManifestFromService", {
        get: function () {
            return this._latestEndpointRequest == null || (this._latestEndpointRequest != null && moment(this._latestEndpointRequest).add(30, "m").isBefore(moment(new Date())));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CongetherClient.prototype, "tracer", {
        get: function () { return this._traceHandler; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CongetherClient.prototype, "conductor", {
        get: function () { return this._conductorHandler; },
        enumerable: true,
        configurable: true
    });
    CongetherClient.prototype.sendQueue = function (queue) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.postEvent(this._endpoint, queue)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CongetherClient.prototype.initialize = function (appIdentifier, baseUrl, endpoint, secret, deviceKey, version) {
        if (deviceKey === void 0) { deviceKey = null; }
        if (version === void 0) { version = null; }
        this._appIdentifier = appIdentifier;
        this._version = version;
        this._baseUrl = baseUrl;
        this._endpoint = endpoint;
        this._secret = secret;
        this._deviceKey = deviceKey;
        this.onInitialized();
        this.getCongetherFiles();
    };
    CongetherClient.prototype.getCongetherFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._fileHandler.getCommonCongetherFile()];
                    case 1:
                        _a._commonCongetherFile = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._fileHandler.getAppCongetherFile()];
                    case 2:
                        _b._appCongetherFile = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CongetherClient.prototype.getManifest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var manifest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.requiresManifestFromService) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getManifestFromService()];
                    case 1:
                        manifest = _a.sent();
                        if (!(manifest != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._fileHandler.setCachedEndpointManifest(manifest)];
                    case 2:
                        _a.sent();
                        this._latestCachedManifest = manifest;
                        if (manifest.endpoint.deviceId != null && manifest.endpoint.deviceId != this._commonCongetherFile.instanceId) {
                            this._commonCongetherFile.instanceId = manifest.endpoint.deviceId;
                            this._fileHandler.setCommonCongetherFile(this._commonCongetherFile);
                        }
                        if (manifest.endpoint.installationId != null && manifest.endpoint.installationId != this._appCongetherFile.instanceId) {
                            this._appCongetherFile.instanceId = manifest.endpoint.installationId;
                            this._fileHandler.setAppCongetherFile(this._appCongetherFile);
                        }
                        _a.label = 3;
                    case 3:
                        if (!(manifest == null && this._latestCachedManifest == null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._fileHandler.getCachedEndpointManifest()];
                    case 4:
                        manifest = _a.sent();
                        this._latestCachedManifest = manifest;
                        _a.label = 5;
                    case 5:
                        if (manifest == null && this._latestCachedManifest != null)
                            manifest = this._latestCachedManifest;
                        return [2 /*return*/, manifest];
                }
            });
        });
    };
    CongetherClient.prototype.getManifestFromService = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commonFile, appFile, manifest, endpoint, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commonFile = this._commonCongetherFile;
                        appFile = this._appCongetherFile;
                        manifest = null;
                        return [4 /*yield*/, this.getEndpointInfo()];
                    case 1:
                        endpoint = _a.sent();
                        this._latestEndpointRequest = new Date();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this._client.postManifestRequest(this._endpoint, endpoint)];
                    case 3:
                        manifest = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        console.error(ex_1);
                        manifest = null;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, manifest];
                }
            });
        });
    };
    CongetherClient.prototype.getEndpointInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._endpointProvider.getEndpointInfo(this)];
            });
        });
    };
    return CongetherClient;
}());
export { CongetherClient };
//# sourceMappingURL=CongetherClient.js.map