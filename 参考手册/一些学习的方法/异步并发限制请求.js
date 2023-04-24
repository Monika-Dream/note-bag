async function sleep(n, name = "test") {                      //缺省参数，并无实际作用
  return new Promise((resolve,reject) => {                           //当前只设定为了成功
    console.log(n, name, "start");
    setTimeout(() => {
      console.log(n, name, "end", "---------------------");
      resolve({ n, name });
    }, n * 1000);
  });
}







async function asyncPool({ limit, items }) {//这里进行了 ES6 的结构赋值
  const promises = [];
  const pool = new Set();                       //这里的 pool 只是为了限制并发量而诞生的
  for (const item of items) {                   //遍历下面items的每一个函数
    const fn = async (item) => await item();    //一个异步函数，作用是内部同步执行 item 参数，
    const promise = fn(item);                   //返回的是一个成功的 Promise 或者等待中的 Promise[最终都会成功]
    promises.push(promise);                     //将 Promise 放入数组中
    pool.add(promise);                          //将等待/成功的 Promise 放入 Set 集合中
    console.log(`之前${pool.keys}`)
    const clean = () => pool.delete(promise);   //添加删除的方法
    console.log(`之后${pool.keys}`)
    promise.then(clean, clean);                 //无论成功还是失败都调用 Clean 函数
    if (pool.size >= limit) {                   //限制( 如果未超过最大并发量就选择不等待，也就是 for 会进入下一次循环, 相反则会进行等待 )
      await Promise.race(pool);                 //竞赛机制，返回最先成功/失败的结果
    }
  }
  return Promise.all(promises);                 //一错全错(一个由 Promise 组成的数组)
}



async function start() {                //异步启用start，里面调用并等待 asyncPool 返回结果,在调用结束后打印结束了
   await asyncPool({
    limit: 2,
    items: [
      () => sleep(1, "吃饭"),
      () => sleep(2, "睡觉"),
      () => sleep(3, "打游戏"),
      () => sleep(4, "这是四"),
      () => sleep(5, "这是五"),
      () => sleep(6, "这是六"),
    ],
  });
  console.log("结束了");
}







start();





// 这段代码实现了一个异步池（asyncPool）函数，用于限制同时执行的异步任务数量。
// 它使用了一个 Set 对象来维护当前正在运行的 Promise 实例，
// 并且在达到设定的限制后暂停等待最先完成的任务，并将其从 Set 中删除。

// 具体地，该函数接受一个对象作为参数，该对象包含两个属性：limit 表示并发执行的任务最大数量，
// items 是一个数组，包含了多个异步函数，每个函数代表一个需要执行的异步任务。每个异步任务通过调用 sleep 函数来模拟一个耗时操作，
// 并返回一个 Promise 实例。

// 在 asyncPool 函数内部，首先定义了一个空数组 promises 和一个空的 Set 对象 pool。
// 然后遍历 items 数组，对于每个 item，创建一个新的异步函数 fn，该函数会立即调用 item 并返回其结果。
// 同时，将该函数的返回值（即 Promise 实例）添加到 promises 数组和 pool Set 中。接着，
// 为每个 Promise 实例添加一个 then 方法，以在任务完成后自动从 pool Set 中删除该 Promise 实例。

// 如果 pool Set 的大小已经达到了限制 limit，那么程序会等待 Promise.race(pool) 的结果，
// 即等待 pool 中最先完成的 Promise 实例，然后将其从 pool Set 中删除，并继续执行下一个任务。
// 最终，asyncPool 函数返回一个 Promise 实例，使用 Promise.all() 
// 将所有的 Promise 实例聚合成一个新的 Promise 实例，以便在所有异步任务完成后进行处理。

// 最后，在 start 函数中调用了 asyncPool 函数，并传入了一个 limit 为 2 的限制和一个包含多个异步任务的 items 数组。
// 当所有任务都完成后，程序将输出“结束了”。
