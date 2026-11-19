import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCarbonFootprint } from './carbonCalculator.js';

test('calculates the expected default daily footprint', () => {
  const result = calculateCarbonFootprint({});
  assert.equal(result.dailyTotal, 12.35);
  assert.equal(result.monthlyTotal, 370.5);
  assert.equal(result.yearlyTotal, 4507.75);
  assert.ok(result.score >= 10 && result.score <= 100);
});

test('accepts zero usage values without producing invalid numbers', () => {
  const result = calculateCarbonFootprint({
    dailyDistance: 0,
    electricityUsage: 0,
    waterConsumption: 0
  });
  assert.ok(Number.isFinite(result.dailyTotal));
  assert.equal(result.breakdown[0].value, 0);
  assert.equal(result.breakdown[1].value, 0);
  assert.equal(result.breakdown[3].value, 0);
});

test('rejects negative and non-finite usage values', () => {
  for (const field of ['dailyDistance', 'electricityUsage', 'waterConsumption']) {
    assert.throws(
      () => calculateCarbonFootprint({ [field]: -1 }),
      RangeError
    );
    assert.throws(
      () => calculateCarbonFootprint({ [field]: Number.NaN }),
      RangeError
    );
  }
});

test('rejects unsupported transport and diet categories', () => {
  assert.throws(
    () => calculateCarbonFootprint({ transportType: 'unknown_vehicle' }),
    RangeError
  );
  assert.throws(
    () => calculateCarbonFootprint({ foodPreference: 'unknown_diet' }),
    RangeError
  );
});

test('rejects non-object inputs', () => {
  assert.throws(() => calculateCarbonFootprint(null), TypeError);
  assert.throws(() => calculateCarbonFootprint([]), TypeError);
});
