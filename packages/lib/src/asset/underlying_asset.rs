use derive_builder::Builder;

use super::underlying_asset_price::UnderlyingAssetPrice;

#[derive(Debug, Clone, Builder)]
pub struct UnderlyingAsset {
    pub price: UnderlyingAssetPrice,
    pub name: String,
}
