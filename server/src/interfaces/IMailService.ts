import EmailActivationRequest from "../models/EmailActivationRequest";

export default interface IMailService {
    sendActivationLink(model: EmailActivationRequest): void;
}