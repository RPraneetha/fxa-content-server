/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

define([
  'chai',
  'models/reliers/relier',
  '../../../mocks/window',
  '../../../lib/helpers'
], function (chai, Relier, WindowMock, TestHelpers) {
  var assert = chai.assert;

  describe('reliers/reliers/relier', function () {
    describe('fetch', function () {
      var relier, windowMock;

      beforeEach(function () {
        windowMock = new WindowMock();

        relier = new Relier({
          window: windowMock
        });
      });

      it('populates expected fields from the search parameters, unexpected search parameters are ignored', function () {
        windowMock.location.search = TestHelpers.toSearchString({
          preVerifyToken: 'abigtoken',
          ignored: 'ignored'
        });

        return relier.fetch()
            .then(function () {
              assert.equal(relier.get('preVerifyToken'), 'abigtoken');
              assert.isUndefined(relier.get('ignored'));
            });
      });
    });
  });
});

