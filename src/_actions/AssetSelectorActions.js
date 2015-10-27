import * as types from '../_constants/ActionTypes';

export function updateAssetSelectorSearchQuery(assets, query) {
    return {
        type: types.UPDATE_ASSET_SELECTOR_SEARCH_QUERY,
        assets,
        query,
    };
}

export function updateAssetSelectorMarkets(assets, markets) {
    return {
        type: types.UPDATE_ASSET_SELECTOR_MARKETS,
        assets,
        markets,
    };
}

export function updateAssetSelectorSubmarket(assets, submarket) {
    return {
        type: types.UPDATE_ASSET_SELECTOR_SUBMARKET,
        assets,
        submarket,
    };
}