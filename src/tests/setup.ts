import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react"

afterEach(()=>{
    //Clean the dom after each test:
    cleanup();
});