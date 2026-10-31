import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate } from './contact.js';

const ok = { name: 'Priya', email: 'priya@example.com', message: 'Hi, we have an ML internship open.' };

test('accepts a normal message and trims fields', () => {
  const { value, error } = validate({ ...ok, name: '  Priya  ' });
  assert.equal(error, undefined);
  assert.equal(value.name, 'Priya');
});

test('rejects missing or multi-line names', () => {
  assert.ok(validate({ ...ok, name: '' }).error);
  assert.ok(validate({ ...ok, name: 'Priya\r\nBcc: x@y.z' }).error);
});

test('rejects bad emails', () => {
  assert.ok(validate({ ...ok, email: 'not-an-email' }).error);
  assert.ok(validate({ ...ok, email: '' }).error);
});

test('rejects too-short and too-long messages', () => {
  assert.ok(validate({ ...ok, message: 'hi' }).error);
  assert.ok(validate({ ...ok, message: 'x'.repeat(5001) }).error);
});

test('handles a missing body', () => {
  assert.ok(validate(undefined).error);
});
