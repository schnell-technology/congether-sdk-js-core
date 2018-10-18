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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
import { EndpointMessageQueue, EndpointMessage } from "./IClientService";
import * as moment_ from 'moment';
var moment = moment_;
var TraceHandler = /** @class */ (function () {
    function TraceHandler(_client) {
        var _this = this;
        this._client = _client;
        this.queueRunning = false;
        this.lastSend = null;
        this.lastLog = null;
        this._pendingQueues = new Array();
        setInterval(function () { _this.workQueue(); }, 10000);
    }
    TraceHandler.prototype.log = function (log) {
        return __awaiter(this, void 0, void 0, function () {
            var queue, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentQueue()];
                    case 1:
                        queue = _a.sent();
                        msg = new EndpointMessage();
                        msg.timestamp = moment(new Date());
                        msg.logEvent = log.clone();
                        queue.content.push(msg);
                        if (queue.content.length > TraceHandler.maxQueueLength) {
                            this.workQueue();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TraceHandler.prototype.metric = function (metric) {
        return __awaiter(this, void 0, void 0, function () {
            var queue, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentQueue()];
                    case 1:
                        queue = _a.sent();
                        msg = new EndpointMessage();
                        msg.timestamp = moment(new Date());
                        msg.metricEvent = metric.clone();
                        queue.content.push(msg);
                        if (queue.content.length > TraceHandler.maxQueueLength) {
                            this.workQueue();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TraceHandler.prototype.getCurrentQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queue;
            return __generator(this, function (_a) {
                if (this._currentQueue == null) {
                    queue = new EndpointMessageQueue();
                    queue.content = new Array();
                    this._currentQueue = queue;
                }
                return [2 /*return*/, this._currentQueue];
            });
        });
    };
    TraceHandler.prototype.workQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var queueToSend, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.queueRunning)
                            return [2 /*return*/];
                        this.queueRunning = true;
                        this._pendingQueues.forEach(function (q) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.sendQueue(q)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (!(this._currentQueue != null)) return [3 /*break*/, 3];
                        queueToSend = this._currentQueue;
                        this._currentQueue = null;
                        queueToSend.rand = Math.floor(Math.random() * 10000).toString();
                        _a = queueToSend;
                        return [4 /*yield*/, this._client.getManifest()];
                    case 1:
                        _a.endpoint = _b.sent();
                        return [4 /*yield*/, this.sendQueue(queueToSend)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        this.queueRunning = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    TraceHandler.prototype.sendQueue = function (queueToSend) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, idxOfQueue, ex_1, idxOfQueue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!(queueToSend.content.length > 0)) return [3 /*break*/, 3];
                        _a = queueToSend;
                        return [4 /*yield*/, this._client.getEndpointInfo()];
                    case 1:
                        _a.endpoint = _b.sent();
                        return [4 /*yield*/, this._client.sendQueue(queueToSend)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        idxOfQueue = this._pendingQueues.indexOf(queueToSend);
                        if (idxOfQueue >= 0) {
                            this._pendingQueues.splice(idxOfQueue, 1);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _b.sent();
                        idxOfQueue = this._pendingQueues.indexOf(queueToSend);
                        if (idxOfQueue < 0) {
                            this._pendingQueues.push(queueToSend);
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TraceHandler.maxQueueLength = 100;
    return TraceHandler;
}());
export { TraceHandler };
//# sourceMappingURL=TraceHandler.js.map