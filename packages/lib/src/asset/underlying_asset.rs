use derive_builder::Builder;
use super::{
    underlying_asset_price::UnderlyingAssetPrice,
    underlying_asset_type::UnderlyingAssetType,
    underlying_asset_volatility::UnderlyingAssetVolatility
};

#[derive(Debug, Clone, Builder)]
pub struct UnderlyingAsset {
    pub price: UnderlyingAssetPrice,
    pub volatility: UnderlyingAssetVolatility,
    pub asset_type: UnderlyingAssetType,
    pub name: String,
}
