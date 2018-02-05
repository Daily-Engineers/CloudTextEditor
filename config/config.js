let config = {
  db_connection:'mongodb://<USERNAME>:<PASSWORD>@cloudtexteditor-shard-00-00-g0esn.mongodb.net:27017,cloudtexteditor-shard-00-01-g0esn.mongodb.net:27017,cloudtexteditor-shard-00-02-g0esn.mongodb.net:27017/<DB>?replicaSet=CloudTextEditor-shard-0&ssl=true&authSource=admin',
  db_user:'adam',
  db_password:'Daily-Engineers1',
  db:'cloudtexteditordb'
}

exports.getDatabaseURI = function(){
  let uri = config.db_connection;
  uri = uri.replace('<USERNAME>', config.db_user);
  uri = uri.replace('<PASSWORD>', config.db_password);
  uri = uri.replace('<DB>', config.db);
  return uri;
}
