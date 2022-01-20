export default class EmailActivationRequest {
    to: string = "";
    link: string = "";

    constructor(to: string, link: string) {
        this.to = to;
        this.link = link;
    }
}