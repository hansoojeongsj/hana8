function discount() {
  const dcRate = 0.1;
  return function (price) {
    return price * dcRate;
  };
}
const items = [
  { item: '상품a', price: 32000 },
  { item: '상품b', price: 45000 },
];
const discounter = discount();

for (const { item, price: orgPrice } of items) {
  // orgPrice 가독성 위해
  const salePrice = orgPrice - discounter(orgPrice);
  console.log(`${item} salePrice: `, salePrice.toLocaleString());
}

console.log('------------------------');

const actions = ['입장', '입장', '입장', '퇴장', '입장', '퇴장']; //status queue

// const { connect, disconnect, getCount } = currentCount();
const [conn, disconn, getCount] = currentCount();

for (const status of actions) {
  if (status === '입장') connect();
  else disconnect();
}

function currentCount() {
  let cnt = 0;

  function connect() {
    cnt++;
  }

  function disconnect() {
    cnt--;
  }

  // return {
  //   connect: connect,
  //   disconnect: disconnect,
  //   getCount: function getCount() {
  //     return cnt;
  //   },
  // };
  return [
    connect,
    disconnect,
    function () {
      return cnt;
    },
  ];
}

console.log('🚀 ~ cnt:', counter.getCount());
