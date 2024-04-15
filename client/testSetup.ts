import { configure } from "@testing-library/react";
import "@testing-library/jest-dom";

const JEST_TIMEOUT = 30000;
const ASYNC_UTIL_TIMEOUT = 2000;

configure({
  testIdAttribute: "data-qa",
  asyncUtilTimeout: ASYNC_UTIL_TIMEOUT,
});

jest.setTimeout(JEST_TIMEOUT);

//@ts-ignore
window.PointerEvent = class PointerEvent extends Event {};
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();


