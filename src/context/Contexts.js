import { createContext } from 'react';

const IsLoadedContext = createContext(true);
const ErrorContext = createContext(null);
const IsMobileContext = createContext(false);

export { IsLoadedContext, ErrorContext, IsMobileContext };
