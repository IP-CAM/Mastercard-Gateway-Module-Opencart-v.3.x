<?php
/**
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

/**
 * Class ModelExtensionPaymentMpgsHostedCheckout
 */
class ModelExtensionPaymentMpgsHostedCheckout extends Model
{
    public function createTable()
    {
        $this->db->query("
            CREATE TABLE IF NOT EXISTS `" . DB_PREFIX . "mpgs_hpf_token` (
                `hpf_token_id` INT(11) unsigned NOT NULL AUTO_INCREMENT,
                `customer_id` INT(11) NOT NULL,
                `token` VARCHAR(50) NOT NULL,
                `created_at` DATETIME NOT NULL,
                PRIMARY KEY (`hpf_token_id`),
                KEY `customer_id` (`customer_id`)
            ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
        ");
    }

    public function dropTable()
    {
        $this->db->query("DROP TABLE IF EXISTS `" . DB_PREFIX . "mpgs_hpf_token`");
    }

    public function addEvents()
    {
        $this->load->model('setting/event');

        $events = [
            'catalog/controller/checkout/checkout/before' => 'extension/payment/mpgs_hosted_checkout/init',
        ];

        foreach ($events as $trigger => $action) {
            $this->model_setting_event->addEvent('payment_mpgs_hosted_checkout', $trigger, $action, 1, 0);
        }
    }

    public function removeEvents()
    {
        $this->load->model('setting/event');
        $this->model_setting_event->deleteEventByCode('payment_mpgs_hosted_checkout');
    }
}
