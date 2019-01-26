/*eslint-disable */
const blockchain = {
  "chain": [{
      "index": 1,
      "timestamp": 1548475845239,
      "transaction": [],
      "nonce": 100,
      "hash": "0",
      "previousBlockHash": "0"
    },
    {
      "index": 2,
      "timestamp": 1548475906265,
      "transaction": [],
      "nonce": 16441,
      "hash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
      "previousBlockHash": "0"
    },
    {
      "index": 3,
      "timestamp": 1548475980900,
      "transaction": [{
          "amount": 12.5,
          "sender": "00",
          "recipient": "488cd86a62f445beb32c85ac7b142418",
          "transactionId": "185b61d5f9834f23bca9fca4862dd0ef"
        },
        {
          "amount": 50,
          "sender": "asdasd",
          "recipient": "nodeAddress",
          "transactionId": "10bd0142722f44ba81c29adb6cafba70"
        },
        {
          "amount": 15,
          "sender": "asdasd",
          "recipient": "nodeAddress",
          "transactionId": "5208b23e16b44dcca97acc6c853ddf7d"
        },
        {
          "amount": 14,
          "sender": "asdasd",
          "recipient": "nodeAddress",
          "transactionId": "06d8231f88494f5290bb50853fb261c2"
        }
      ],
      "nonce": 9402,
      "hash": "000050327dc1ff05f464d0c8a8277f7e15fe5902af323deee4dac4da664194ac",
      "previousBlockHash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285"
    },
    {
      "index": 4,
      "timestamp": 1548476034730,
      "transaction": [{
          "amount": 12.5,
          "sender": "00",
          "recipient": "488cd86a62f445beb32c85ac7b142418",
          "transactionId": "49a9cb839a8947f9b0d39ff6dd4e2a10"
        },
        {
          "amount": 14,
          "sender": "asdasd",
          "recipient": "nodeAddress",
          "transactionId": "75a4b20e63ff413ba0b78a76e5f0c06a"
        },
        {
          "amount": 15,
          "sender": "asdasd",
          "recipient": "nodeAddress",
          "transactionId": "438c373715c64fe1aa7d5676efd111c2"
        },
        {
          "amount": 20,
          "sender": "asdasd",
          "recipient": "nodeAddress",
          "transactionId": "6d160009dcc04a3eabc8980865221a5b"
        },
        {
          "amount": 30,
          "sender": "asdasd",
          "recipient": "nodeAddress",
          "transactionId": "40a17a07d3914dea9d0bba10253926bf"
        }
      ],
      "nonce": 20068,
      "hash": "0000b31acb4eaec64bef50057334cb9d3f081b3fc6c0723f4c0c74b9dfa24778",
      "previousBlockHash": "000050327dc1ff05f464d0c8a8277f7e15fe5902af323deee4dac4da664194ac"
    },
    {
      "index": 5,
      "timestamp": 1548476037554,
      "transaction": [{
        "amount": 12.5,
        "sender": "00",
        "recipient": "488cd86a62f445beb32c85ac7b142418",
        "transactionId": "02ad847ec8054f2c86b60610514c4024"
      }],
      "nonce": 36229,
      "hash": "000094e81ac12ff990f1ec7fb7bef9c33db960e92cf704c9f1c02c5987a7c465",
      "previousBlockHash": "0000b31acb4eaec64bef50057334cb9d3f081b3fc6c0723f4c0c74b9dfa24778"
    },
    {
      "index": 6,
      "timestamp": 1548476038596,
      "transaction": [{
        "amount": 12.5,
        "sender": "00",
        "recipient": "488cd86a62f445beb32c85ac7b142418",
        "transactionId": "5fa1e07226774d6eaac4e385d5532526"
      }],
      "nonce": 102090,
      "hash": "00003429968179e57c658b7bd67dc859a068940ebfe35c53fc39b92dccd6d701",
      "previousBlockHash": "000094e81ac12ff990f1ec7fb7bef9c33db960e92cf704c9f1c02c5987a7c465"
    }
  ],
  "pendingTransaction": [{
    "amount": 12.5,
    "sender": "00",
    "recipient": "488cd86a62f445beb32c85ac7b142418",
    "transactionId": "a1515bbe8b50405b8f8230da8170c761"
  }],
  "currentNodeUrl": "http://localhost:3001",
  "networkNodes": []
}

module.exports = blockchain