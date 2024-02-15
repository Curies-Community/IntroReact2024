import { defer } from "@remix-run/node";
import { useLoaderData, Await } from "@remix-run/react";
import { Suspense } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function returnThisAfter(ms: number, value: string) {
  await sleep(ms);
  return value;
}

async function loader() {
  const value1 = returnThisAfter(1000, "Hello");
  const value2 = returnThisAfter(2000, "World");

  return defer({
    value1,
    value2,
  });
}

function Index() {
  const { value1, value2 } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <Suspense fallback="Loading...">
        <Await resolve={value1}>
          {(realValue1) => <p>{realValue1}</p>}
        </Await>
        <Await resolve={value2}>
          {(realValue2) => <p>{realValue2}</p>}
        </Await>
      </Suspense>
    </div>
  );
}

export { loader };
export default Index;