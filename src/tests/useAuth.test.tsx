import { useAuth } from "../hooks/useAuth";
import { test, expect } from "vitest";

test("useAuth()", () => {
  const isLogg = useAuth;

  expect(isLogg).toContain(JSON);
});
