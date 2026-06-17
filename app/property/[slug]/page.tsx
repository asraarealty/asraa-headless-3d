<?php

if (!defined('ABSPATH')) {
    exit;
}

/*
|--------------------------------------------------------------------------
| Enable Property Post Type in GraphQL
|--------------------------------------------------------------------------
*/

add_filter('register_post_type_args', function ($args, $post_type) {

    if ($post_type === 'property') {
        $args['show_in_graphql'] = true;
        $args['graphql_single_name'] = 'property';
        $args['graphql_plural_name'] = 'properties';
    }

    return $args;

}, 10, 2);

/*
|--------------------------------------------------------------------------
| Register Property GraphQL Fields
|--------------------------------------------------------------------------
*/

add_action('graphql_register_types', function () {

    /*
    |--------------------------------------------------------------------------
    | Basic Property Fields
    |--------------------------------------------------------------------------
    */

    register_graphql_field('Property', 'propertyId', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_property_id',
            true
        )
    ]);

    register_graphql_field('Property', 'price', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_price',
            true
        )
    ]);

    register_graphql_field('Property', 'rooms', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_rooms',
            true
        )
    ]);

    register_graphql_field('Property', 'beds', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_beds',
            true
        )
    ]);

    register_graphql_field('Property', 'baths', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_baths',
            true
        )
    ]);

    register_graphql_field('Property', 'garages', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_garages',
            true
        )
    ]);

    register_graphql_field('Property', 'yearBuilt', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_year_built',
            true
        )
    ]);

    register_graphql_field('Property', 'homeArea', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_home_area',
            true
        )
    ]);

    /*
    |--------------------------------------------------------------------------
    | RERA
    |--------------------------------------------------------------------------
    */

    register_graphql_field('Property', 'reraNumber', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            'custom-text-44',
            true
        )
    ]);

    /*
    |--------------------------------------------------------------------------
    | Location Fields
    |--------------------------------------------------------------------------
    */

    register_graphql_field('Property', 'address', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_map_location_address',
            true
        )
    ]);

    register_graphql_field('Property', 'latitude', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_map_location_latitude',
            true
        )
    ]);

    register_graphql_field('Property', 'longitude', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_property_map_location_longitude',
            true
        )
    ]);

    /*
    |--------------------------------------------------------------------------
    | Featured Image
    |--------------------------------------------------------------------------
    */

    register_graphql_field('Property', 'featuredImageUrl', [
        'type' => 'String',
        'resolve' => function ($post) {
            $id = get_post_thumbnail_id($post->databaseId);
            return $id ? wp_get_attachment_url($id) : null;
        }
    ]);

    /*
    |--------------------------------------------------------------------------
    | Native Gallery (WordPress Media IDs)
    |--------------------------------------------------------------------------
    */

    register_graphql_field('Property', 'gallery', [
        'type' => ['list_of' => 'String'],
        'resolve' => function ($post) {

            $gallery_ids = get_post_meta(
                $post->databaseId,
                'asraa_gallery',
                true
            );

            if (empty($gallery_ids)) {
                return [];
            }

            $ids = array_map('trim', explode(',', $gallery_ids));

            $images = [];

            foreach ($ids as $id) {
                $url = wp_get_attachment_url($id);

                if ($url) {
                    $images[] = $url;
                }
            }

            return $images;
        }
    ]);

    /*
    |--------------------------------------------------------------------------
    | Developer Offer Fields
    |--------------------------------------------------------------------------
    */

    register_graphql_field('Property', 'developerName', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_developer_name',
            true
        )
    ]);

    register_graphql_field('Property', 'monthlyScheme', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_monthly_scheme',
            true
        )
    ]);

    register_graphql_field('Property', 'discountOffer', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_discount_offer',
            true
        )
    ]);

    register_graphql_field('Property', 'inventoryStatus', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_inventory_status',
            true
        )
    ]);

    register_graphql_field('Property', 'offerPopupText', [
        'type' => 'String',
        'resolve' => fn($post) => get_post_meta(
            $post->databaseId,
            '_offer_popup_text',
            true
        )
    ]);

});
