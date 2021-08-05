import dataloader from "dataloader";

import { MongoUtils } from './db';


async function batchAccounts(acc, keys) {
  const accounts = await acc
    .find({
      account_id: { $in: keys }
    })
    .toArray();
  const result = keys.map((key) => accounts.find((account) => {
    return account.account_id === key
  }));
  return result;
}

export function batchAcc(acc){
  return {
    accountsLoader: new dataloader(
      keys => batchAccounts(acc, keys),
      {
        cacheKeyFn: key => key 
      },
    )
  }
}

export const resolvers = {
  Customer: {
    accounts: async ({ accounts }, args, { dataloaders: { accountsLoader } }) => accountsLoader.loadMany(accounts) },
  Query: {
    getCustomers: async (root, args, context, info) => {
      const { db } = MongoUtils;
      const customers = db.collection('customers');

      const result = await customers
        .find({})
        .limit(5)
        .toArray();
      return result;
    }
  }
}