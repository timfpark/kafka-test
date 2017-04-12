const kafka = require('kafka-node'),
      Consumer = kafka.Consumer,
      Producer = kafka.Producer,
      client = new kafka.Client('10.0.190.68:2181'),
      producer = new Producer(client),
      consumer = new Consumer(
          client, [
            { topic: 'test', partition: 0 }
          ], {
            autoCommit: false
          }
      );

producer.on('ready', function () {
    producer.createTopics(['test'], (err, data) => {
        console.log(err);
        console.log(data);
        producer.send([
            { topic: 'test', messages: 'hello world', partition: 0 }
        ], function (err, data) {
            console.log('send err: ' + err);
            console.log('send data: ' + data);
        });
    });
});

producer.on('error', err => {
    console.log('producer error: ' + err);
});

consumer.on('message', function (message) {
    console.log('consumed: ' + message);
});

consumer.on('error', err => {
    console.log('consumer error: ' + err);
});
