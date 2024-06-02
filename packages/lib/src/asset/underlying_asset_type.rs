#[derive(Debug, Clone, Copy)]
pub enum UnderlyingAssetType {
    Stock,
    Bond,
    Currencies,
    Commodities,
    InterestRates,
    MarketIndexes,
}
