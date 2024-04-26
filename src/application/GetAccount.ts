import { AccountDAO } from "../resource/AccountDAO";

export class GetAccount {
	
	constructor (readonly accountDAO: AccountDAO) {

	}

	async execute (accountId: string): Promise<any> {
		const account = await this.accountDAO.getAccountById(accountId);
		return account;
	}
}
