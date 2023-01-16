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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUser = void 0;
const { google } = require("googleapis");
function getAuthUser(userCredentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const oauth2Client = new google.auth.OAuth2(process.env.APP_ID, process.env.APP_SECRET, process.env.REDIRECT_URI);
        oauth2Client.setCredentials(userCredentials);
        return oauth2Client;
    });
}
exports.getAuthUser = getAuthUser;
//# sourceMappingURL=auth-user.js.map