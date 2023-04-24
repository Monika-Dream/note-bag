async function sleep(n, name = "test") {
  return new Promise(resolve => {
    console.log(n, name, "start");
    setTimeout(() => {
      console.log(n, name, "end", "---------------------");
      resolve({ n, name });
    }, n * 1000);
  });
}

async function asyncPool({ limit, items }) {
  const promises = [];
  const pool = new Set();

  for (const item of items) {
    const fn = async item => item();
    const promise = fn(item);
    promises.push(promise);
    pool.add(promise);

    // 定义清理函数，用于在 Promise 状态变为 fulfilled 或 rejected 时从 Set 中删除该 Promise。
    const clean = () => pool.delete(promise);
    promise.then(undefined, clean);

    if (pool.size >= limit) {
      await Promise.race(pool);
    }
  }

  return Promise.all(promises);
}

async function start() {
  await asyncPool({
    limit: 2,
    items: [
      () => sleep(1, "吃饭"),
      () => sleep(2, "睡觉"),
      () => sleep(3, "打游戏"),
      () => sleep(4, "这是四"),
      () => sleep(5, "这是五"),
      () => sleep(6, "这是六")
    ]
  });

  console.log("结束了");
}

start();
