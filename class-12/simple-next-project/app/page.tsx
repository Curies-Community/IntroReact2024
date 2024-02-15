import { Suspense } from 'react';

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

async function RandomComponentThatWait({ time }: { time: number }) {
  await sleep(time);
  return (
    <div>Waited for {time}ms</div>
  )
}

function Index() {
  return (
    <main>
      <h1>Simple Next.js Project</h1>
      <p>Welcome to the simple Next.js project.</p>
      <Suspense fallback={<div>Loading...</div>}>
        <RandomComponentThatWait time={1000} />
        <RandomComponentThatWait time={2000} />
      </Suspense>
    </main>
  );
}

export default Index;