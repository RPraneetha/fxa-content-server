/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

define(function (require, exports, module) {
  'use strict';

  const AvatarMixin = require('../mixins/avatar-mixin');
  const Cocktail = require('cocktail');
  const DisableFormMixin = require('../mixins/disable-form-mixin');
  const FormView = require('../form');
  const SettingsPanelMixin = require('../mixins/settings-panel-mixin');
  const Template = require('templates/settings/display_name.mustache');

  const t = msg => msg;

  const View = FormView.extend({
    template: Template,
    className: 'display-name',
    viewName: 'settings.display-name',

    onProfileUpdate () {
      this.render();
    },

    setInitialContext (context) {
      context.set('displayName', this._displayName);
    },

    beforeRender () {
      var account = this.getSignedInAccount();
      return account.fetchProfile()
        .then(() => {
          this.user.setAccount(account);
          this._displayName = account.get('displayName');
        });
    },

    isValidStart () {
      // if no display name set then we still do not want to activate the change button
      var accountDisplayName = this.getSignedInAccount().get('displayName') || '';
      var displayName = this.getElementValue('input.display-name').trim();

      return accountDisplayName !== displayName;
    },

    submit () {
      const start = Date.now();
      const account = this.getSignedInAccount();
      const displayName = this.getElementValue('input.display-name').trim();

      return account.postDisplayName(displayName)
        .then(() => {
          this.logViewEvent('success');
          this.updateDisplayName(displayName);
          this.displaySuccess(t('Display name updated'));
          this.logFlowEvent(`timing.displayName.change.${Date.now() - start}`);
          this.navigate('settings');
        });
    }
  });

  Cocktail.mixin(
    View,
    AvatarMixin,
    DisableFormMixin,
    SettingsPanelMixin,
  );

  module.exports = View;
});
