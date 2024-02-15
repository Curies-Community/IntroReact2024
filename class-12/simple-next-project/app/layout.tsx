import { ReactNode as Node } from 'react';
function App({ children, }: { children: Node }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default App;