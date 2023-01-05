"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUser = exports.botsUserAuth = void 0;
const local_auth_1 = require("@google-cloud/local-auth");
const path_1 = __importDefault(require("path"));
const { google } = require("googleapis");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const CREDENTIALS_PATH = path_1.default.join(process.cwd(), "credentials.json");
function botsUserAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        return { refresh_token: yield authorize() };
    });
}
exports.botsUserAuth = botsUserAuth;
/**
 * Load or request or authorization to call APIs.
 *
 */
function authorize() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, local_auth_1.authenticate)({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            return {
                type: "authorized_user",
                refresh_token: client.credentials.refresh_token,
            };
        }
        return {
            message: "Not possible to authorize",
        };
    });
}
function getAuthUser(userCredentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const oauth2Client = new google.auth.OAuth2("224440623840-lu2fev9teuakrpj5up8iam02hbhcftum.apps.googleusercontent.com", "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", "http://localhost:3000");
        oauth2Client.setCredentials(userCredentials);
        return oauth2Client;
    });
}
exports.getAuthUser = getAuthUser;
