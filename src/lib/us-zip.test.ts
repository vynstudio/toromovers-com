import assert from "node:assert/strict";
import test from "node:test";
import {
  formatUsZip,
  isUsZip,
  quoteZipError,
  QUOTE_ZIP_ERROR,
} from "./us-zip.ts";

test("isUsZip accepts 5-digit and ZIP+4 only", () => {
  assert.equal(isUsZip("32801"), true);
  assert.equal(isUsZip("00501"), true);
  assert.equal(isUsZip("32801-1234"), true);
  assert.equal(isUsZip(" 32801 "), true);
  assert.equal(isUsZip("3280"), false);
  assert.equal(isUsZip("328011"), false);
  assert.equal(isUsZip("32801-123"), false);
  assert.equal(isUsZip("123 Main St, Orlando, FL 32801"), false);
  assert.equal(isUsZip(""), false);
});

test("formatUsZip keeps ZIP and ZIP+4 while typing", () => {
  assert.equal(formatUsZip("3280"), "3280");
  assert.equal(formatUsZip("32801"), "32801");
  assert.equal(formatUsZip("328011234"), "32801-1234");
  assert.equal(formatUsZip("32801-1234"), "32801-1234");
  assert.equal(formatUsZip("32801 1234"), "32801-1234");
});

test("formatUsZip pulls the last ZIP out of a pasted street address", () => {
  assert.equal(
    formatUsZip("123 Main St, Orlando, FL 32801"),
    "32801",
  );
  assert.equal(
    formatUsZip("12345 Oak St, Miami, FL 33101-4567"),
    "33101-4567",
  );
});

test("quoteZipError replaces the full-address suggestion requirement", () => {
  assert.equal(quoteZipError("32801", "32803"), null);
  assert.equal(quoteZipError("32801", "32803-1000"), null);
  assert.equal(quoteZipError("Main St", "32803"), "Enter a valid pickup ZIP (5 digits, or ZIP+4).");
  assert.equal(quoteZipError("32801", "Oak"), "Enter a valid drop-off ZIP (5 digits, or ZIP+4).");
  assert.equal(quoteZipError("", ""), QUOTE_ZIP_ERROR);
  assert.doesNotMatch(QUOTE_ZIP_ERROR, /suggestion/i);
  assert.doesNotMatch(QUOTE_ZIP_ERROR, /street/i);
});
