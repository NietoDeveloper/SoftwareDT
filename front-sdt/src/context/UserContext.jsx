import { createContext, useState, useEffect, useCallback, useRef, useMemo, useContext } from "react";
import { setupInterceptors } from "../API/api.js";

export const UserContext = createContext(null);
