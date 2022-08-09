import React from 'react';

export const AccountContext: any = React.createContext(1);

type Props = {
  children?: React.ReactNode;
};
export const AccountProvider: React.FC<Props> = ({ children }) => {
  const [number, setNumber] = React.useState(10);
  return <AccountContext.Provider value={{ number, setNumber }}>{children}</AccountContext.Provider>;
};
