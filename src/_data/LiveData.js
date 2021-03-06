import { LiveApi } from 'binary-live-api';
import { readNewsFeed } from './NewsData';
import { getVideosFromPlayList } from './VideoData';
import isUserVirtual from 'binary-utils/lib/isUserVirtual';
import * as actions from '../_actions';
import config from '../config';

const handlers = {
    active_symbols: 'serverDataActiveSymbols',
    asset_index: 'serverDataAssetIndex',
    authorize: 'serverDataAuthorize',
    balance: 'serverDataBalance',
    candles: 'serverDataCandles',
    cashier_password: 'serverDataCashierLock',
    change_password: 'serverDataChangePassword',
    get_limits: 'serverDataAccountLimits',
    get_self_exclusion: 'serverDataAccountSelfExclusion',
    get_settings: 'serverDataAccountSettings',
    history: 'serverDataTickHistory',
    news: 'updateNewsList',
    paymentagent_list: 'serverDataPaymentAgents',
    proposal_open_contract: 'serverDataProposalOpenContract',
    payout_currencies: 'serverDataPayoutCurrencies',
    proposal: 'serverDataProposal',
    portfolio: 'serverDataPortfolio',
    statement: 'serverDataStatement',
    time: 'serverDataTime',
    tick: 'serverDataTickStream',
    trading_times: 'serverDataTradingTimes',
    transaction: 'serverTransactionStream',
    videos: 'updateVideoList',
};

export const api = new LiveApi({ apiUrl: config.apiUrl, language: 'EN' });

const subscribeToWatchlist = store => {
    const state = store.getState();
    if (!state.watchlist) {
        return;
    }
    api.subscribeToTicks(state.watchlist.toJS());
};

const subscribeToSelectedSymbol = store => {
    const defaultSymbol = 'R_100'; // TODO: Rework on cache previous settings
    store.dispatch(actions.getTradingOptions(defaultSymbol, () => {
        api.getTickHistory(defaultSymbol, { end: 'latest', count: 60, adjust_start_time: 1 });
        api.subscribeToTick(defaultSymbol);
    }));
};

export const changeLanguage = language => {
    api.changeLanguage(language);
    api.getActiveSymbolsFull();
    api.getAssetIndex();
    api.getTradingTimes(new Date());
};

const initUnauthorized = async () => {
    api.getActiveSymbolsFull();
    api.getTradingTimes(new Date());
    api.getAssetIndex();
    api.getServerTime();

    api.getCandlesForLastNDays('R_100', 30);

    const articles = await readNewsFeed('en');
    api.events.emit('news', articles);
    const videos = await getVideosFromPlayList();
    api.events.emit('videos', videos);
};

const initAuthorized = (authData, store) => {
    api.getPortfolio();
    api.getStatement({ description: 1, limit: 20 });
    api.getAccountSettings().then(msg => {
        if (msg.get_settings.country_code) {
            api.getPaymentAgentsForCountry(msg.get_settings.country_code);
        }
    });
    api.getPayoutCurrencies();
    api.subscribeToBalance();           // some call might fail due to backend overload
    api.subscribeToAllOpenContracts();
    api.subscribeToTransactions();
    subscribeToWatchlist(store);
    subscribeToSelectedSymbol(store);

    if (!isUserVirtual(authData.authorize)) {
        api.getAccountLimits();
        api.getSelfExclusion();
        api.getCashierLockStatus();
    }
};

export const trackSymbols = symbols => {
    api.unsubscribeFromAllTicks();
    api.subscribeToTicks(symbols);
};

export const connect = async store => {
    let language = store.getState().appConfig.get('language');
    api.changeLanguage(language);

    Object.keys(handlers).forEach(key => {
        const action = actions[handlers[key]];

        api.events.on(key, data => store.dispatch(action(data)));
        api.events.on(key, () => window.console.warn);
    });

    api.events.on('authorize', response => response.error ? null : initAuthorized(response, store));

    await initUnauthorized(store);
};
