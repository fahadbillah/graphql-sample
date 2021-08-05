import { MongoClient, ObjectID } from 'mongodb';

const MongoUtils = {
  db: {},
  connect: (dbConfig, callback) => {
    // const dbName = 'sample_training';
    const dbName = 'sample_analytics';
    const uri = `mongodb://fahad:${process.env.MONGO_PASS}@fahad-free-shard-00-00.nozia.mongodb.net:27017,fahad-free-shard-00-01.nozia.mongodb.net:27017,fahad-free-shard-00-02.nozia.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rw3hjh-shard-0&authSource=admin&retryWrites=true&w=majority`;

    MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
      MongoUtils.db = client.db(dbName);
      return callback(err);
    });
  },
};

export { MongoUtils, ObjectID };

/* !!!:
mongodb: {
    password: 'MONGO_PASS',
    dbName: 'test-cluster-1',
    user: 'admin',
    cluster: '@test-cluster-1.nozia.gcp.mongodb.net',
    uri: `mongodb+srv://admin:${process.env.MONGO_PASS}@test-cluster-1.nozia.gcp.mongodb.net/test-cluster-1?retryWrites=true&w=majority`,
  },
 */