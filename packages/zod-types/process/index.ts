export const runningProcess = () => {
  console.log("process");

  const precess = process.env.NODE_ENV

  console.log({
    precess
  })

  return precess
};