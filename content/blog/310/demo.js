setTimeout(() => {
  console.log("1");
}, 0);

let p = new Promise((resolve, reject) => {
  console.log("2");
  resolve("5")
  console.log("3");
  return "4"
})


p.then(res => console.log(res))

console.log("6");