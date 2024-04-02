import { describe, it, expect } from 'vitest'
import geoLibIntegration from '../../../../src/services/geoLib';

describe('Testing geoLib integration', function () {
  it('Testing getAddressFromCoordinates', async function () {
    const address = await geoLibIntegration.getAddressFromCoordinates({ lat: -5, lng: -5 });

    expect(typeof address).toBe('string');
  });
});