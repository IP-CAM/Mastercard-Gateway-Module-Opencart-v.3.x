/*
 * Copyright (c) 2020 Mastercard
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

$(function ($) {
    'use strict';
    var mpgs_admin_config = {
        init: function () {
            var liveMerchantId = $('#live-merchant-container'),
                livePassword = $('#live-password-container'),
                liveWebhookSecret = $('#live-webhook-container'),
                testMerchantId = $('#test-merchant-container'),
                testPassword = $('#test-password-container'),
                testWebhookSecret = $('#test-webhook-container'),
                gateway_url = $('#custom-url-container'),
                saved_cards = $('#saved-cards-container'),
                hc_type = $('#hc-type-container');

            $('#test-mode').on('change', function () {
                if ($(this).val() === '1') {
                    testMerchantId.show();
                    testPassword.show();
                    testWebhookSecret.show();
                    testMerchantId.addClass('required');
                    testPassword.addClass('required');

                    // Hide Live Merchant ID, Password & Webhook Secret
                    liveMerchantId.hide();
                    livePassword.hide();
                    liveWebhookSecret.hide();
                    liveMerchantId.removeClass('required');
                    livePassword.removeClass('required');
                } else {
                    liveMerchantId.show();
                    livePassword.show();
                    liveWebhookSecret.show();
                    liveMerchantId.addClass('required');
                    livePassword.addClass('required');

                    // Hide Test Merchant ID, Password & Webhook Secret
                    testMerchantId.hide();
                    testPassword.hide();
                    testWebhookSecret.hide();
                    testMerchantId.removeClass('required');
                    testPassword.removeClass('required');
                }
            }).change();

            $('#select-api-gateway').on('change', function () {
                if ($(this).val() === 'api_other') {
                    gateway_url.show();
                } else {
                    gateway_url.hide();
                }
            }).change();

            $('#integration-model').on('change', function () {
                if ($(this).val() === 'hostedcheckout') {
                    saved_cards.hide();
                    hc_type.show();
                } else {
                    hc_type.hide();
                    saved_cards.show();
                }
            }).change();
        }
    };
    mpgs_admin_config.init();
});