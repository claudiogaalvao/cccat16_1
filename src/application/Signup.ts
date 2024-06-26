import crypto from "crypto";
import { validate } from "./validateCpf";
import { AccountDAO } from "../resource/AccountDAO";

export class Signup {

	constructor (readonly accountDAO: AccountDAO) {

	}

	async execute (input: any): Promise<any> {
		const account = input;
		account.accountId = crypto.randomUUID();
		const existingAccount = await this.accountDAO.getAccountByEmail(account.email);
		if (existingAccount) throw new Error("Account already exists");
		if (!account.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
		if (!account.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
		if (!validate(account.cpf)) throw new Error("Invalid cpf");
		if (account.isDriver && account.carPlate && !account.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid car plate");
		await this.accountDAO.saveAccount(account);
		return {
			accountId: account.accountId
		};
	}
}
